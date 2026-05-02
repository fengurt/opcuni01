import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Applications table - users submit applications to join the alliance
 */
export const applications = mysqlTable("applications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  // Application content
  companyName: varchar("companyName", { length: 255 }).notNull(),
  industry: varchar("industry", { length: 128 }),
  description: text("description"),
  
  // Multi-language fields stored as JSON { en: "", zh: "", fr: "", ja: "" }
  descriptionI18n: json("descriptionI18n").$type<Record<string, string>>(),
  
  // Application status
  status: mysqlEnum("status", ["pending", "reviewing", "approved", "rejected"]).default("pending").notNull(),
  
  // Certification level applied for
  certificationLevel: mysqlEnum("certificationLevel", ["L1", "L2", "L3"]).default("L1").notNull(),
  
  // Admin notes (internal)
  adminNotes: text("adminNotes"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;

/**
 * Projects table - track project progress for approved applications
 */
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  applicationId: int("applicationId").notNull(),
  
  // Project details
  title: varchar("title", { length: 255 }).notNull(),
  titleI18n: json("titleI18n").$type<Record<string, string>>(),
  
  description: text("description"),
  descriptionI18n: json("descriptionI18n").$type<Record<string, string>>(),
  
  // Progress tracking (0-100)
  progress: int("progress").default(0).notNull(),
  
  // Project status
  status: mysqlEnum("status", ["active", "completed", "paused", "cancelled"]).default("active").notNull(),
  
  // Milestones as JSON array
  milestones: json("milestones").$type<Array<{
    id: string;
    title: string;
    titleI18n?: Record<string, string>;
    completed: boolean;
    completedAt?: string;
  }>>(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

/**
 * Certificates table - issued certificates for completed certifications
 */
export const certificates = mysqlTable("certificates", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  projectId: int("projectId"),
  
  // Certificate details
  certificateNumber: varchar("certificateNumber", { length: 64 }).notNull().unique(),
  
  // Certification level
  level: mysqlEnum("level", ["L1", "L2", "L3"]).notNull(),
  
  // Certificate title (multi-language)
  title: varchar("title", { length: 255 }).notNull(),
  titleI18n: json("titleI18n").$type<Record<string, string>>(),
  
  // Holder name as displayed on certificate
  holderName: varchar("holderName", { length: 255 }).notNull(),
  
  // Issue and expiry dates
  issuedAt: timestamp("issuedAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt"),
  
  // Certificate status
  status: mysqlEnum("status", ["active", "expired", "revoked"]).default("active").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = typeof certificates.$inferInsert;

/**
 * Translations table - admin-managed multi-language content
 */
export const translations = mysqlTable("translations", {
  id: int("id").autoincrement().primaryKey(),
  
  // Translation key (e.g., "hero.title", "cert.l1.name")
  key: varchar("key", { length: 128 }).notNull().unique(),
  
  // Category for organization
  category: varchar("category", { length: 64 }),
  
  // Translations for each language
  en: text("en"),
  zh: text("zh"),
  fr: text("fr"),
  ja: text("ja"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Translation = typeof translations.$inferSelect;
export type InsertTranslation = typeof translations.$inferInsert;

/**
 * Experts table - advisory coaches/consultants displayed on homepage
 */
export const experts = mysqlTable("experts", {
  id: int("id").autoincrement().primaryKey(),
  
  // Name in different languages
  nameEn: varchar("nameEn", { length: 128 }).notNull(),
  nameZh: varchar("nameZh", { length: 128 }),
  nameFr: varchar("nameFr", { length: 128 }),
  nameJa: varchar("nameJa", { length: 128 }),
  
  // Role/specialty
  roleEn: varchar("roleEn", { length: 128 }),
  roleZh: varchar("roleZh", { length: 128 }),
  roleFr: varchar("roleFr", { length: 128 }),
  roleJa: varchar("roleJa", { length: 128 }),
  
  // Title/affiliation
  titleEn: varchar("titleEn", { length: 255 }),
  titleZh: varchar("titleZh", { length: 255 }),
  titleFr: varchar("titleFr", { length: 255 }),
  titleJa: varchar("titleJa", { length: 255 }),
  
  // Bio/description
  bioEn: text("bioEn"),
  bioZh: text("bioZh"),
  bioFr: text("bioFr"),
  bioJa: text("bioJa"),
  
  // Avatar URL
  avatarUrl: varchar("avatarUrl", { length: 512 }),
  
  // Sort order
  sortOrder: int("sortOrder").default(0).notNull(),
  
  // Visibility control
  isVisible: mysqlEnum("isVisible", ["visible", "hidden"]).default("visible").notNull(),
  
  // Display order
  displayOrder: int("displayOrder").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Expert = typeof experts.$inferSelect;
export type InsertExpert = typeof experts.$inferInsert;

/**
 * Partners table - ecosystem partners (coaches, brands, organizations)
 */
export const partners = mysqlTable("partners", {
  id: int("id").autoincrement().primaryKey(),
  
  // Partner type
  type: mysqlEnum("type", ["coach", "brand", "organization"]).notNull(),
  
  // Name in different languages
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  nameZh: varchar("nameZh", { length: 255 }),
  nameFr: varchar("nameFr", { length: 255 }),
  nameJa: varchar("nameJa", { length: 255 }),
  
  // Description in different languages
  descriptionEn: text("descriptionEn"),
  descriptionZh: text("descriptionZh"),
  descriptionFr: text("descriptionFr"),
  descriptionJa: text("descriptionJa"),
  
  // Logo/avatar URL
  logoUrl: varchar("logoUrl", { length: 512 }),
  
  // Website URL
  websiteUrl: varchar("websiteUrl", { length: 512 }),
  
  // Contact email
  contactEmail: varchar("contactEmail", { length: 320 }),
  
  // Visibility control
  isVisible: mysqlEnum("isVisible", ["visible", "hidden"]).default("visible").notNull(),
  
  // Display order
  displayOrder: int("displayOrder").default(0).notNull(),
  
  // JSON field for quick bulk update
  metadata: json("metadata").$type<Record<string, unknown>>(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = typeof partners.$inferInsert;

/**
 * Partner Applications table - potential partners submit applications
 */
export const partnerApplications = mysqlTable("partner_applications", {
  id: int("id").autoincrement().primaryKey(),
  
  // Applicant info
  contactName: varchar("contactName", { length: 255 }).notNull(),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
  contactPhone: varchar("contactPhone", { length: 64 }),
  
  // Organization info
  organizationName: varchar("organizationName", { length: 255 }).notNull(),
  organizationType: mysqlEnum("organizationType", ["coach", "brand", "organization"]).notNull(),
  
  // Description
  description: text("description"),
  
  // Website
  websiteUrl: varchar("websiteUrl", { length: 512 }),
  
  // Application status
  status: mysqlEnum("status", ["pending", "reviewing", "approved", "rejected"]).default("pending").notNull(),
  
  // Admin notes
  adminNotes: text("adminNotes"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PartnerApplication = typeof partnerApplications.$inferSelect;
export type InsertPartnerApplication = typeof partnerApplications.$inferInsert;


/**
 * Milestones table - OPC authoritative sources and historical events
 */
export const milestones = mysqlTable("milestones", {
  id: int("id").autoincrement().primaryKey(),
  
  // Category (e.g., "政府官方-中国", "学术来源", "KOL来源")
  category: varchar("category", { length: 128 }).notNull(),
  
  // Source name in different languages
  sourceNameEn: varchar("sourceNameEn", { length: 255 }).notNull(),
  sourceNameZh: varchar("sourceNameZh", { length: 255 }),
  sourceNameFr: varchar("sourceNameFr", { length: 255 }),
  sourceNameJa: varchar("sourceNameJa", { length: 255 }),
  
  // Description in different languages
  descriptionEn: text("descriptionEn"),
  descriptionZh: text("descriptionZh"),
  descriptionFr: text("descriptionFr"),
  descriptionJa: text("descriptionJa"),
  
  // Date (can be partial like "2023" or "2023-12" or "2023-12-29")
  publishDate: varchar("publishDate", { length: 32 }),
  
  // Type (e.g., "立法机构", "中央政府", "学术论文")
  sourceType: varchar("sourceType", { length: 128 }),
  
  // URL
  url: varchar("url", { length: 1024 }),
  
  // Country/Region for filtering
  country: varchar("country", { length: 64 }),
  
  // Year for filtering (extracted from publishDate)
  year: int("year"),
  
  // Visibility control
  isVisible: mysqlEnum("isVisible", ["visible", "hidden"]).default("visible").notNull(),
  
  // Display order
  displayOrder: int("displayOrder").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Milestone = typeof milestones.$inferSelect;
export type InsertMilestone = typeof milestones.$inferInsert;


/**
 * Methodologies table - OPC frameworks and methodologies (admin-managed)
 */
export const methodologies = mysqlTable("methodologies", {
  id: int("id").autoincrement().primaryKey(),
  
  // Slug for URL-friendly identifier
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  
  // Name in different languages
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  nameZh: varchar("nameZh", { length: 255 }),
  nameFr: varchar("nameFr", { length: 255 }),
  nameJa: varchar("nameJa", { length: 255 }),
  
  // Short description / tagline
  taglineEn: varchar("taglineEn", { length: 512 }),
  taglineZh: varchar("taglineZh", { length: 512 }),
  taglineFr: varchar("taglineFr", { length: 512 }),
  taglineJa: varchar("taglineJa", { length: 512 }),
  
  // Full description in different languages (supports markdown)
  descriptionEn: text("descriptionEn"),
  descriptionZh: text("descriptionZh"),
  descriptionFr: text("descriptionFr"),
  descriptionJa: text("descriptionJa"),
  
  // Icon or image URL
  iconUrl: varchar("iconUrl", { length: 512 }),
  
  // Color theme for the card (hex color)
  themeColor: varchar("themeColor", { length: 16 }),
  
  // Visibility control
  isVisible: mysqlEnum("isVisible", ["visible", "hidden"]).default("visible").notNull(),
  
  // Display order
  displayOrder: int("displayOrder").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Methodology = typeof methodologies.$inferSelect;
export type InsertMethodology = typeof methodologies.$inferInsert;


/**
 * Courses table - OPC training courses and programs
 */
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  
  // Slug for URL-friendly identifier
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  
  // Name in different languages
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  nameZh: varchar("nameZh", { length: 255 }),
  nameFr: varchar("nameFr", { length: 255 }),
  nameJa: varchar("nameJa", { length: 255 }),
  
  // Short description / tagline
  taglineEn: varchar("taglineEn", { length: 512 }),
  taglineZh: varchar("taglineZh", { length: 512 }),
  taglineFr: varchar("taglineFr", { length: 512 }),
  taglineJa: varchar("taglineJa", { length: 512 }),
  
  // Full description in different languages (supports markdown)
  descriptionEn: text("descriptionEn"),
  descriptionZh: text("descriptionZh"),
  descriptionFr: text("descriptionFr"),
  descriptionJa: text("descriptionJa"),
  
  // Course category (e.g., coaching, AI, business, media)
  category: varchar("category", { length: 64 }),
  
  // Target audience
  targetAudienceEn: varchar("targetAudienceEn", { length: 512 }),
  targetAudienceZh: varchar("targetAudienceZh", { length: 512 }),
  
  // Duration (e.g., "8 weeks", "3 months")
  duration: varchar("duration", { length: 64 }),
  
  // Price info (display only)
  priceInfo: varchar("priceInfo", { length: 128 }),
  
  // Cover image URL
  coverImageUrl: varchar("coverImageUrl", { length: 512 }),
  
  // Icon or emoji for the card
  icon: varchar("icon", { length: 16 }),
  
  // Color theme for the card (hex color)
  themeColor: varchar("themeColor", { length: 16 }),
  
  // Course highlights as JSON array
  highlights: json("highlights").$type<Array<{ en: string; zh: string; fr?: string; ja?: string }>>(),
  
  // Visibility control
  isVisible: mysqlEnum("isVisible", ["visible", "hidden"]).default("visible").notNull(),
  
  // Display order
  displayOrder: int("displayOrder").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;
