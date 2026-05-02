# Deploying OPC Global to Cloudflare

## Architecture Overview

The hybrid deployment uses:
- **Cloudflare Pages**: Static frontend (React/Vite build)
- **Cloudflare Workers**: API endpoints (Express.js with nodejs_compat)
- **Cloudflare D1/Hyperdrive**: Database layer (migrate from MySQL)

## Prerequisites

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login
```

## Step 1: Create Cloudflare Resources

### 1.1 Create D1 Database (if using SQLite instead of Hyperdrive)
```bash
wrangler d1 create opcglobal
# Save the database_id for wrangler.toml
```

### 1.2 Create R2 Bucket for Assets
```bash
wrangler r2 bucket create opcglobal-assets
```

### 1.3 Create Hyperdrive (for existing MySQL)
```bash
# Create Hyperdrive for your existing MySQL database
wrangler hyperdrive create opcglobal-mysql --database=YOUR_MYSQL_CONNECTION_STRING
```

## Step 2: Update Configuration

Update `wrangler.toml` with your resource IDs:

```toml
[[d1_databases]]
binding = "DB"
database_name = "opcglobal"
database_id = "YOUR_D1_DATABASE_ID"  # Replace with actual ID

[[hyperdrive]]
binding = "HYPERDRIVE"
id = "YOUR_HYPERDRIDE_ID"  # Replace with actual ID

[[r2_buckets]]
binding = "ASSETS"
bucket_name = "opcglobal-assets"
```

## Step 3: Deploy to Cloudflare

### Option A: Deploy Frontend + API Worker

```bash
# Build the frontend
pnpm run build

# Deploy to Cloudflare Pages
wrangler pages project create opcglobal01 --production
wrangler pages deploy dist/public --project=opcglobal01

# Deploy API Worker separately
wrangler deploy api-worker.ts --env production
```

### Option B: Use Cloudflare Pages Functions (Simpler)

Copy your built files and deploy:
```bash
wrangler pages deploy dist/public
```

## Step 4: Configure Environment Variables

In Cloudflare Dashboard → Workers & Pages → opcglobal01 → Settings → Variables:

```
NODE_ENV=production
DATABASE_URL=your-mysql-connection-string
```

## Step 5: Custom Domain Setup

1. Go to Cloudflare Dashboard → Websites
2. Add your domain (e.g., opcglobal.ai)
3. Update nameservers if needed
4. Configure SSL/TLS settings (Full recommended)

## Database Migration (MySQL → D1)

If migrating from MySQL to D1:

```bash
# Export your MySQL schema
mysqldump -u root -p --no-data opcglobal > schema.sql

# Convert to D1-compatible format (use drizzle-kit)
npx drizzle-kit generate --dialect sqlite

# Push to D1
wrangler d1 execute opcglobal --file=./drizzle/migrations/*.sql
```

## Local Development

```bash
# Start frontend
pnpm dev

# Test Workers locally
wrangler dev api-worker.ts

# Full local emulation
wrangler dev --local
```

## Known Limitations

1. **Node.js Compatibility**: Using `nodejs_compat` flag enables most Node.js APIs but some Express middleware may not work
2. **Sessions**: Express-session needs alternative (use Cloudflare Workers sessions or KV)
3. **File System**: No persistent local filesystem in Workers; use R2/KV/D1
4. **WebSockets**: Workers don't support WebSockets; use Durable Objects for real-time

## Alternative: Vercel Hybrid

If Cloudflare doesn't work well, consider Vercel:
- Static output: `output: "export"` in next.config.js
- Serverless functions for API

## Troubleshooting

### CORS Issues
Check that your origin is in the allowed list in `functions/[[worker]].ts`

### Worker Not Found (404)
Ensure your worker is properly bound in wrangler.toml

### Database Connection Failed
Verify Hyperdrive ID and that your MySQL allows external connections

## Performance Tips

1. Enable Cloudflare caching for static assets
2. Use R2 for user uploads
3. Deploy to multiple regions for global latency
4. Monitor with Cloudflare Analytics