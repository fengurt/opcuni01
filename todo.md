# OPC Global Project TODO

## Completed Features
- [x] Basic homepage layout with Solarpunk design
- [x] Navigation menu with glassmorphism
- [x] Hero section with generated images
- [x] Value Proposition (0.5/3/2 paradigm)
- [x] Certification Ladder (L1-L3)
- [x] Expert Council section
- [x] Digital Arsenal teaser
- [x] Footer with trust signals
- [x] Basic i18n context (EN, ZH, FR, JA)
- [x] Upgrade to full-stack with database and user authentication

## Pending Features
- [x] Replace logo with provided OPC logo
- [x] Fix i18n content inconsistency - ensure all translations are complete and accurate
- [x] Database schema for applications, projects, and certificates
- [x] User Dashboard - Submit application
- [x] User Dashboard - View project progress
- [x] User Dashboard - View certification certificates
- [x] Admin Dashboard - View and manage applications
- [x] Admin Dashboard - View and edit multi-language content fields
- [x] Restore Home.tsx with original components after upgrade

## Translation Sync Feature
- [x] Create public API endpoint to fetch all translations
- [x] Update LanguageContext to fetch translations from backend on load
- [x] Merge backend translations with default translations (backend takes priority)
- [x] Seed default translations to database for admin management
- [x] Test translation sync functionality

## UI Redesign - UN/Olympics Minimalist Style
- [x] Update global CSS theme to minimalist international style (white bg, clean typography)
- [x] Redesign Navigation with clean, minimal header
- [x] Redesign Hero section with elegant simplicity
- [x] Redesign Certification section with clear visual hierarchy
- [x] Redesign Experts section with professional minimal cards
- [x] Redesign Footer with clean international layout
- [x] Update Dashboard and Admin pages with consistent minimal style
- [x] Remove excessive decorations and animations

## Complete Missing Translations
- [x] Audit all components for hardcoded/untranslated text
- [x] Add missing translation keys to LanguageContext
- [x] Seed new translations to database
- [x] Verify all text displays correctly in all 4 languages

## Translation Fixes and Expert Management
- [x] Complete all missing Chinese translations (细节文字)
- [x] Rename "泰坦理事会" to "顾问教练团" in all languages
- [x] Update experts.title and experts.subtitle translations
- [x] Create experts table in database for dynamic management
- [x] Add expert visibility toggle (show/hide) in admin panel
- [x] Update Experts component to fetch from database
- [x] Test all changes

## Arsenal Multi-language & Ecosystem Partners
- [x] Complete all Arsenal section translations (EN/ZH/FR/JA)
- [x] Create partners table in database (type: coach/brand/organization)
- [x] Add partners API routes (CRUD operations)
- [x] Create ecosystem partners section on homepage
- [x] Add JSON quick-edit feature for partners in admin panel
- [x] Create partner application form page (/partner-apply)
- [x] Create partner_applications table in database
- [x] Add partner applications management in admin panel
- [x] Test all new features (24 tests passing)

## Follow Us Section
- [x] Copy WeChat and Xiaohongshu QR code images to public folder
- [x] Add Follow Us section to Footer with QR codes
- [x] Add contact email hi@opcglobal.ai
- [x] Add translations for Follow Us section (EN/ZH/FR/JA)
- [x] Test the changes

## Follow Us Section Redesign
- [x] Redesign Follow Us section with better visual layout
- [x] Make QR codes more compact and elegant (hover to reveal)
- [x] Improve overall footer aesthetics
- [x] Test the redesign

## OPC Facilitators & Partner Organizations
- [x] Rename "Titan Council" to "OPC Facilitators" / "教练顾问团" in all languages
- [x] Update experts.title and experts.subtitle translations
- [x] Add 5 facilitators: 俞楠, 张青之, 李新, 周惠林, 王雅赟
- [x] Add 6 partner organizations: 睿悦科技, 中智游集团, 博雅问渠书院, 亚洲艺术疗愈研究院, SouSou Offer, 神店咨询
- [x] Create seed script for facilitators and partners with multi-language content
- [x] Update Experts component with expandable bio cards
- [x] Update Partners component with expandable organization descriptions
- [x] Test all changes

## Hero Section Links
- [x] Link "Join the Alliance" button to WeChat article: https://mp.weixin.qq.com/s/YpTPBcrzIHkIPHk8W2IZ-g
- [x] Make "Trusted by Global Partners" section clickable to navigate to #partners section
- [x] Verify links work in all languages

## Hero Partners Display
- [x] Update Hero section to display actual partner names from database instead of hardcoded list

## New Subpages
- [x] Create OPC Milestones page with vertical timeline from Excel data
- [x] Add filters for Country, Year, Publisher, Content with hyperlinks
- [x] Create OPC Alliance page with ecosystem partners
- [x] Create OPC DAO page with open knowledge base concept from WeChat article
- [x] Create OPC Hub page with service center (consulting, training, incubation, global partner recruitment)
- [x] Update navigation to include new pages

## OPC Global Strategic Blueprint Update
- [x] Update homepage with mission, values (公正/公平/友爱/创新), brand philosophy "善用AI者得天下"
- [x] Transform OPC Hub into OPC HOM with three ontologies (Platform/Home/HOM)
- [x] Add reverse charging business model to OPC HOM
- [x] Create OPC UNI page with AI Principal concept
- [x] Add OPC+X certification system (L1/L1+/L2/L3 Titan)
- [x] Update OPC DAO page with Project Aletheia and dual-chamber governance
- [x] Create OPC UNIverse page with three pillars integration
- [x] Add OPC → OPE → OPU evolution path
- [x] Update navigation structure
- [x] Test all pages in all languages

## Persistent Navigation & Seamless Language Switching
- [x] Add Navigation component to OPC HOM page
- [x] Add Navigation component to OPC UNI page
- [x] Add Navigation component to OPC DAO page
- [x] Add Navigation component to OPC UNIverse page
- [x] Add Navigation component to OPC Milestones page
- [x] Add Navigation component to OPC Alliance page
- [x] Ensure language switching works seamlessly without page refresh or redirect
- [x] Test all pages in all languages

## Critical Bug Fixes (Jan 17)
- [x] Fix language persistence - clicking links should NOT reset to English
- [x] Redesign OPC UNIverse page - current UI is unreadable and ugly
- [x] Update OPC HOM page with accurate three ontologies content
- [x] Update OPC UNI page with AI Principal and L1-L3 certification details
- [x] Update OPC DAO page with Project Aletheia and zkML governance
- [x] Ensure three pillars (HOM/UNI/DAO) are prominently featured

## Critical Bug Fixes (Jan 21)
- [x] Fix language persistence - clicking links should NOT reset to English
- [x] Redesign OPC UNIverse page - current UI is unreadable and ugly
- [x] Update OPC HOM page with accurate three ontologies content
- [x] Update OPC UNI page with AI Principal and L1-L3 certification details
- [x] Update OPC DAO page with Project Aletheia and zkML governance
- [x] Ensure three pillars (HOM/UNI/DAO) are prominently featured

## Page Flash & Navigation Bug Fix
- [x] Fix page flash (black screen) when navigating to OPC HOM
- [x] Fix navigation bar inconsistency between pages

## Brand Content Update (Latest)
- [x] Update Hero section with new brand philosophy "善用AI，终获自由" and mission "重塑生产关系，成就一人公司"
- [x] Update core values to "求真、自主、利他、共生"
- [x] Update organization description as 全球性共创组织 exploring AI-era production relations
- [x] Update global presence with actual locations (HK HQ, Macau, Australia, London, Basel, California, Vancouver, etc.)
- [x] Update goal: serve 1 million super-individuals in Phase 1
- [x] Update all translations (EN/ZH/FR/JA) with new content

## Rename to 共创教练团 & New Features
- [x] Rename 教练顾问团 to 共创教练团 (Co-Creation Coaches) in translations
- [x] Update experts database with 16 new co-creation coaches from attachment
- [x] Add 郭峰 as founder/leader profile
- [x] Add new partner organizations (Canal Walk, 伯禹教育, 澜码科技, 朝阳医院, OPC Global, Nibiru updated, 中智游 updated, 亚洲艺术疗愈研究院 updated)
- [x] Create methodologies database table with backend management
- [x] Add 0.5/3/2 Paradigm methodology
- [x] Add L.I.D methodology
- [x] Add M.E.A.T methodology
- [x] Add OPC Three Laws methodology
- [x] Add 7S City Assessment methodology7S Framework methodology
- [x] Create Methodologies frontend page
- [x] Add admin management for methodologies (backend CRUD routes created)
- [x] Update navigation with Methodologies page

## UI Redesign - UN Style (White / Deep Blue #0A1626 / Gold #A88B52)
- [x] Global design system: color palette, typography, spacing tokens in index.css
- [x] Redesign Navigation with UN-style aesthetic
- [x] Redesign Homepage Hero section
- [x] Redesign Homepage value proposition and certification sections
- [x] Redesign OPC HOM page
- [x] Redesign OPC UNI page
- [x] Redesign OPC DAO page
- [x] Redesign OPC UNIverse page
- [x] Redesign Alliance page (facilitators + partners)
- [x] Redesign Milestones page
- [x] Redesign Methodologies page
- [x] Mobile-responsive optimization for all pages
- [x] Structured data export system (JSON/YAML/Markdown) for all key modules
- [x] PPT-consistent data structure across all modules

## L1 Label Fix & Admin/Export Check
- [x] Fix L1 certification label from "操作员/Operator" to "智能教练/AI Coach" across all files
- [x] Check admin dashboard functionality
- [x] Check export center and PDF download functionality

## Export Center Enhancements
- [x] Add export center link to admin dashboard navigation
- [x] Add language selection (Chinese / English) to export center
- [x] Add layout format selection (Landscape 16:9 / Portrait A4) to export center
- [x] Ensure exported data includes layout format metadata

## Experts Alphabetical Sorting
- [x] Add alphabetical (A-Z) sorting to experts display on frontend
- [x] Add admin toggle option to sort experts by alphabet

## Add iSoftStone Partner
- [x] Add iSoftStone (软通动力) as partner in database with multi-language support
- [x] Verify display on /alliance page

## Admin Order Management
- [x] Add move up/down order controls for experts (co-creation coaches) in admin
- [x] Add move up/down order controls for partners in admin
- [x] Add backend endpoints for updating display order
- [x] Write tests for order update endpoints

## Remote API Sync for Admin
- [x] Add remote API sync button for experts in admin panel
- [x] Add remote API sync button for partners in admin panel
- [x] Show last sync timestamp in admin panel
- [x] Keep current content unchanged (sync infrastructure only)

## Slogan Multi-language Update
- [x] Ensure "善用AI，终获自由" slogan is consistent across all languages (EN/ZH/FR/JA)

## Milestones Optimization
- [x] Optimize milestones page around coaching partners and AI application mentors

## Courses Module
- [x] Create courses database table schema
- [x] Add backend CRUD routes for courses
- [x] Create courses frontend page
- [x] Add navigation link for courses
- [x] Seed initial 7 courses: 教练合伙人, IP进化论, 新媒体实战派, 知识资产化, OPC创业启蒙, 冠军龙虾课, 冠军企业AI转型课
- [ ] Add courses management in admin panel (deferred)

## Sub-pages: ManaEndless & APHA
- [x] Create /manaendless page (无魔协会 - Swiss Art Exhibition & Cultural Exchange)
- [x] Create /apha page (亚太艺术疗愈联盟 - Asia Pacific Art Healing Alliance)
- [x] Add multi-language support for both pages (ZH/EN/FR/JA)
- [x] Add routes and navigation links for both pages
- [x] Mobile-responsive design for both pages

## Add Affiliate Partners
- [x] Add 亚洲艺术疗愈研究院 (Asia Art Healing Research Institute) as partner with description and link to /apha
- [x] Add 瑞士无魔协会 (Swiss ManaEndless Association) as partner with description and link to /manaendless

## Join Alliance Button Link
- [x] Update "加入联盟/Join Alliance" button to redirect to https://hom.opcglobal.cn/

## Full Website Restructuring (Blueprint-based, IOC/UN-level)
- [x] Redesign Homepage with blueprint content: 0.5/3/2 paradigm, executive summary, value proposition
- [x] Restructure OPC HOM page: Coase's Inversion, paradigm shift, organizational boundary collapse
- [x] Restructure OPC UNI page: Digital Exoskeleton, 4-layer tech stack matrix (Brain/Builder/Creative/Nervous System)
- [x] Restructure OPC DAO page: DAO governance, ROC model, OPC Home concept, ecosystem architecture
- [x] Restructure UNIverse page: L1-L3 certification, 2025 Golden Tech Stack, implementation path
- [x] Restructure Alliance page: Global best practices, case studies (Justin Welsh, DesignJoy, Pieter Levels, China cases)
- [x] Restructure Milestones page: Crisis & solutions, policy landscape, future tech directions
- [x] Restructure Methodologies page: Implementation guide, SOP, from L1 to L3 progression (DB-driven, structure preserved)
- [x] Update Courses page with blueprint-aligned course descriptions (DB-driven, structure preserved)
- [x] Update Navigation structure to match new site architecture (preserved existing structure)
- [x] Update Footer with blueprint-aligned content (preserved existing structure)
- [x] Update shared moduleData.ts with blueprint content for export consistency (DB-driven)
- [x] Mobile-responsive optimization across all restructured pages (responsive classes applied)
- [x] Cross-page consistency check (fonts, colors, spacing, content alignment)
- [x] Fix: Dev server crashes on startup due to missing @logto/express package - preview cannot load
- [x] Re-read Blueprint from Google Drive, extract core essence notes
- [x] Streamline Homepage Hero - concise, powerful, no redundancy
- [x] Streamline OPC HOM - keep paradigm core, remove verbose explanations
- [x] Streamline OPC UNI - clean tech stack presentation, no repetition
- [x] Streamline OPC DAO - essence of ecosystem, not walls of text
- [x] Streamline Universe - focused golden stack, clear progression
- [x] Streamline Alliance - sharp case studies, not bloated
- [x] Streamline Milestones - crisp crisis framework, not repetitive
- [x] ZERO-REDUNDANCY REWRITE: Audit all pages, assign strict content ownership
- [x] Rewrite Homepage: Marx quote → AGI gap → OPC bridge, 0.5/3/2 brief, pillar links only
- [x] Rewrite HOM: ONLY Body content (platform, space, reverse-billing), no theory
- [x] Rewrite UNI: ONLY Mind content (certification L1-L3, tech stack), no governance
- [x] Rewrite DAO: ONLY Soul content (Aletheia, smart contracts, consensus islands)
- [x] Rewrite Universe: Ecosystem vision, flywheel, evolution path, values
- [x] Rewrite Alliance: Case studies, facilitators, partners, 共创教练团
- [x] Rewrite Milestones: Pain points, policy, timeline, value-for-audiences table
- [x] V3 STORYLINE REWRITE - User-Journey Driven:
- [x] Homepage: Add "Who We Serve" value grid (6 audience cards with pain→value→CTA)
- [x] Homepage: Add Triangle Collaboration visual (Expert+Coach+Unit)
- [x] HOM: Add "How to Join" steps section, 4 core functions, global presence, reverse charging
- [x] UNI: Enrich L1-L3 with revenue thresholds (L2=5M, L2Pro=10M, L3=50M), Think Tank, How to Enroll
- [x] DAO: Add Global Summit & Delivery Rally, Consensus Islands, "How to Contribute", enriched Aletheia & governance
- [x] Universe: Add Four-Layer Flywheel, Three Laws of OPC, Org Architecture
- [x] Alliance: Add Co-Creation Coach Team, How to Become Partner path, enriched case studies
- [x] Milestones: Already has Value-for-Audiences table, crisis framework, policy landscape - preserved
- [x] AWWWARDS-LEVEL REDESIGN: Complete visual overhaul of entire website
- [x] Research top design references (Awwwards, WEF, McKinsey, Apple)
- [x] Redesign global design system: typography scale, spacing, animations, glassmorphism, gradients
- [x] Homepage: Cinematic hero with scroll-driven animations, visual storytelling
- [x] HOM page: Immersive visual design with depth and motion
- [x] UNI page: Premium visual treatment with interactive elements
- [x] DAO page: Sophisticated governance visualization
- [x] Universe page: Ecosystem diagram with visual depth
- [x] Alliance page: Case study cards with premium feel
- [x] Milestones page: Cinematic timeline with visual polish
- [x] Micro-interactions: hover effects, scroll reveals, page transitions
- [x] Responsive design polish across all breakpoints
- [x] V5: Lighten homepage opening - "智启自由" as clean hero, then trend points, then storytelling
- [x] V5: Ensure subpages preserve ecosystem, partners, map content (verified: Alliance has partners/experts DB, Hom has global map, Milestones has timeline, DAO has consensus islands)
- [x] V5: Make hero lighter/cleaner, not heavy dark block
- [x] V6: Restore HOM/UNI/DAO + 共创教练团 in top navigation menu
- [x] V6: Change "加入联盟" CTA to mailto:hi@opcglobal.ai
- [x] V6: Harmonize font sizes across all pages - unified typography scale (replaced text-[10px] with text-xs)
- [x] V6: Fix layout spacing and proportions for visual harmony (standardized section-padding)
- [x] V6: Ensure consistent section padding, card sizes, heading hierarchy + all CTAs → mailto:hi@opcglobal.ai
- [x] V7: Optimize Hero opening narrative - cinematic scroll frames: 智启自由 → Marx vision → Chasm → OPC bridge → 0.5/3/2 → Triangle → Who We Serve → Three Pillars → Mission
- [x] V8: Hero Frame 2 must faithfully quote blueprint original text about Marx's vision (not paraphrase)
- [x] V8: Add subtle transparent visual elements (geometric lines, glows, gradient orbs) across Hero frames for premium feel

## 出海服务 (Overseas Service) Integration
- [x] Add "出海服务" to top navigation bar (link to oversea.opcglobal.ai)
- [x] Add 出海服务 business section on homepage Hero (Five Engines grid + Partner Brands + CTA)
- [x] Multi-language support for 出海服务 content (ZH/EN/FR/JA)
- [x] Ensure consistent design with existing site style (deep blue/gold/white)

## V10: Contrast Fix & Interaction Optimization
- [x] Audit all pages for low-contrast text (text vs background)
- [x] Fix global CSS color tokens for better contrast ratios (WCAG AA minimum)
- [x] Fix Hero section text contrast (subtitles, descriptions, labels)
- [x] Fix homepage business sections text contrast
- [x] Fix 出海服务 section text contrast
- [x] Fix subpages (HOM/UNI/DAO/Alliance/Milestones) text contrast
- [x] Fix Navigation hover/active states for better visibility
- [x] Optimize micro-interactions (hover effects, transitions, focus rings)
- [x] Improve button and link hover states across site
- [x] Ensure all text meets WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text)

## V11: Layout, Font Size & Interaction Polish
- [x] Increase body text base size for better readability
- [x] Reduce excessive section padding to tighten page length
- [x] Hero Frame 1: make subtitle larger and scroll hint more visible
- [x] Hero Frame 2: improve text layout and paragraph spacing
- [x] Hero Frame 4: increase subtitle and description font size
- [x] 0.5/3/2 section: increase description and source text sizes
- [x] Triangle section: improve card readability and role labels
- [x] Who We Serve: make CTA buttons more prominent, add card differentiation
- [x] Three Pillars: increase description text size
- [x] Go Global: increase card text sizes, give partner brands more visual weight
- [x] Mission: give values visual treatment instead of plain text
- [x] Make CTA buttons site-wide more prominent and clickable-looking

## V12: Awwwards-Level Design Restructuring
- [x] Restructure global design system: dramatic type scale, refined spacing, animation utilities
- [x] Rebuild Hero Frame 1: oversized typography, cinematic entrance animation, magnetic CTA
- [x] Rebuild Hero Frame 2 (Marx): editorial layout with staggered text reveals
- [x] Rebuild Hero Frame 3-4 (Chasm/Bridge): scroll-driven narrative with parallax depth
- [x] Rebuild 0.5/3/2 section: animated counters with staggered reveals, asymmetric layout
- [x] Rebuild Triangle section: distinctive card design with hover reveals
- [x] Rebuild Who We Serve: bento grid layout with hover interactions
- [x] Rebuild Three Pillars: full-bleed cards with image reveal animations
- [x] Rebuild Go Global: refined engine cards with visual hierarchy
- [x] Rebuild Mission: cinematic closing with large typography
- [x] Polish Navigation: minimal, transforming on scroll
- [x] Polish Footer: clean, spacious, editorial feel
- [x] Add scroll-triggered staggered animations throughout
- [x] Add smooth section transitions and parallax layers

## V13: Text Elegance & Conciseness
- [x] Audit all homepage sections for verbose/redundant text
- [x] Cut section labels and subtitles that repeat the heading
- [x] Reduce paragraph-style descriptions to single-line statements
- [x] Improve whitespace rhythm between text elements
- [x] Remove decorative text that adds no information
- [x] Tighten card copy to essential phrases only
