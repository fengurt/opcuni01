import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  applications, 
  InsertApplication, 
  projects, 
  InsertProject, 
  certificates, 
  InsertCertificate,
  translations,
  InsertTranslation,
  experts,
  InsertExpert,
  partners,
  InsertPartner,
  partnerApplications,
  InsertPartnerApplication
} from "../drizzle/schema";
const ownerOpenIds = (process.env.OWNER_OPEN_IDS ?? "").split(",").filter(Boolean);

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (ownerOpenIds.includes(user.openId)) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getAllUsers() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(users).orderBy(desc(users.createdAt));
}

// ============ APPLICATION QUERIES ============

export async function createApplication(data: InsertApplication) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(applications).values(data);
  return result[0].insertId;
}

export async function getApplicationsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(applications)
    .where(eq(applications.userId, userId))
    .orderBy(desc(applications.createdAt));
}

export async function getAllApplications() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(applications).orderBy(desc(applications.createdAt));
}

export async function getApplicationById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateApplicationStatus(id: number, status: "pending" | "reviewing" | "approved" | "rejected", adminNotes?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const updateData: Record<string, unknown> = { status };
  if (adminNotes !== undefined) {
    updateData.adminNotes = adminNotes;
  }
  
  await db.update(applications).set(updateData).where(eq(applications.id, id));
}

// ============ PROJECT QUERIES ============

export async function createProject(data: InsertProject) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(projects).values(data);
  return result[0].insertId;
}

export async function getProjectsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(projects)
    .where(eq(projects.userId, userId))
    .orderBy(desc(projects.createdAt));
}

export async function getAllProjects() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(projects).orderBy(desc(projects.createdAt));
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateProjectProgress(id: number, progress: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(projects).set({ progress }).where(eq(projects.id, id));
}

// ============ CERTIFICATE QUERIES ============

export async function createCertificate(data: InsertCertificate) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(certificates).values(data);
  return result[0].insertId;
}

export async function getCertificatesByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(certificates)
    .where(eq(certificates.userId, userId))
    .orderBy(desc(certificates.issuedAt));
}

export async function getAllCertificates() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(certificates).orderBy(desc(certificates.issuedAt));
}

export async function getCertificateByNumber(certificateNumber: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(certificates)
    .where(eq(certificates.certificateNumber, certificateNumber))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============ TRANSLATION QUERIES ============

export async function getAllTranslations() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(translations).orderBy(translations.category, translations.key);
}

export async function upsertTranslation(data: InsertTranslation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(translations).values(data).onDuplicateKeyUpdate({
    set: {
      en: data.en,
      zh: data.zh,
      fr: data.fr,
      ja: data.ja,
      category: data.category,
    }
  });
}

export async function deleteTranslation(key: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(translations).where(eq(translations.key, key));
}

// ============ EXPERT QUERIES ============

export async function getAllExperts() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(experts).orderBy(experts.displayOrder);
}

export async function getVisibleExperts() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(experts)
    .where(eq(experts.isVisible, "visible"))
    .orderBy(experts.displayOrder);
}

export async function createExpert(data: InsertExpert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(experts).values(data);
  return result[0].insertId;
}

export async function updateExpert(id: number, data: Partial<InsertExpert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(experts).set(data).where(eq(experts.id, id));
}

export async function updateExpertVisibility(id: number, isVisible: "visible" | "hidden") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(experts).set({ isVisible }).where(eq(experts.id, id));
}

export async function deleteExpert(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(experts).where(eq(experts.id, id));
}


// ============ PARTNER QUERIES ============

export async function getAllPartners() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(partners).orderBy(partners.displayOrder);
}

export async function getVisiblePartners() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(partners)
    .where(eq(partners.isVisible, "visible"))
    .orderBy(partners.displayOrder);
}

export async function getPartnerById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(partners).where(eq(partners.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createPartner(data: InsertPartner) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(partners).values(data);
  return result[0].insertId;
}

export async function updatePartner(id: number, data: Partial<InsertPartner>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(partners).set(data).where(eq(partners.id, id));
}

export async function updatePartnerVisibility(id: number, isVisible: "visible" | "hidden") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(partners).set({ isVisible }).where(eq(partners.id, id));
}

export async function deletePartner(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(partners).where(eq(partners.id, id));
}

// ============ PARTNER APPLICATION QUERIES ============

export async function getAllPartnerApplications() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(partnerApplications).orderBy(desc(partnerApplications.createdAt));
}

export async function getPartnerApplicationById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(partnerApplications).where(eq(partnerApplications.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createPartnerApplication(data: InsertPartnerApplication) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(partnerApplications).values(data);
  return result[0].insertId;
}

export async function updatePartnerApplicationStatus(id: number, status: "pending" | "reviewing" | "approved" | "rejected", adminNotes?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const updateData: Record<string, unknown> = { status };
  if (adminNotes !== undefined) {
    updateData.adminNotes = adminNotes;
  }
  
  await db.update(partnerApplications).set(updateData).where(eq(partnerApplications.id, id));
}


// ============ MILESTONE QUERIES ============

import { milestones, InsertMilestone } from "../drizzle/schema";

export async function getAllMilestones() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(milestones).orderBy(milestones.displayOrder);
}

export async function getVisibleMilestones() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(milestones)
    .where(eq(milestones.isVisible, "visible"))
    .orderBy(milestones.displayOrder);
}

export async function getMilestoneById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(milestones).where(eq(milestones.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createMilestone(data: InsertMilestone) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(milestones).values(data);
  return result[0].insertId;
}

export async function updateMilestone(id: number, data: Partial<InsertMilestone>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(milestones).set(data).where(eq(milestones.id, id));
}

export async function deleteMilestone(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(milestones).where(eq(milestones.id, id));
}


// ============ METHODOLOGY QUERIES ============

import { methodologies, InsertMethodology } from "../drizzle/schema";

export async function getAllMethodologies() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(methodologies).orderBy(methodologies.displayOrder);
}

export async function getVisibleMethodologies() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(methodologies)
    .where(eq(methodologies.isVisible, "visible"))
    .orderBy(methodologies.displayOrder);
}

export async function getMethodologyById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(methodologies).where(eq(methodologies.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getMethodologyBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(methodologies).where(eq(methodologies.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createMethodology(data: InsertMethodology) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(methodologies).values(data);
  return result[0].insertId;
}

export async function updateMethodology(id: number, data: Partial<InsertMethodology>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(methodologies).set(data).where(eq(methodologies.id, id));
}

export async function deleteMethodology(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(methodologies).where(eq(methodologies.id, id));
}


// ============ COURSE QUERIES ============

import { courses, InsertCourse } from "../drizzle/schema";

export async function getAllCourses() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(courses).orderBy(courses.displayOrder);
}

export async function getVisibleCourses() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(courses)
    .where(eq(courses.isVisible, "visible"))
    .orderBy(courses.displayOrder);
}

export async function getCourseById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getCourseBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(courses).where(eq(courses.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCourse(data: InsertCourse) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(courses).values(data);
  return result[0].insertId;
}

export async function updateCourse(id: number, data: Partial<InsertCourse>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(courses).set(data).where(eq(courses.id, id));
}

export async function deleteCourse(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(courses).where(eq(courses.id, id));
}
