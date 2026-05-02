import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import { allModules } from "@shared/moduleData";
import { exportModule } from "@shared/exportUtils";
import {
  createApplication,
  getApplicationsByUserId,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  getProjectsByUserId,
  getAllProjects,
  getProjectById,
  createProject,
  updateProjectProgress,
  getCertificatesByUserId,
  getAllCertificates,
  getCertificateByNumber,
  createCertificate,
  getAllTranslations,
  upsertTranslation,
  deleteTranslation,
  getAllUsers,
  getAllExperts,
  getVisibleExperts,
  createExpert,
  updateExpert,
  updateExpertVisibility,
  deleteExpert,
  getAllPartners,
  getVisiblePartners,
  getPartnerById,
  createPartner,
  updatePartner,
  updatePartnerVisibility,
  deletePartner,
  getAllPartnerApplications,
  getPartnerApplicationById,
  createPartnerApplication,
  updatePartnerApplicationStatus,
  getAllMilestones,
  getVisibleMilestones,
  getMilestoneById,
  createMilestone,
  updateMilestone,
  deleteMilestone,
  getAllMethodologies,
  getVisibleMethodologies,
  getMethodologyById,
  getMethodologyBySlug,
  createMethodology,
  updateMethodology,
  deleteMethodology,
  getAllCourses,
  getVisibleCourses,
  getCourseById,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ============ APPLICATION ROUTES ============
  applications: router({
    // User: Submit a new application
    create: protectedProcedure
      .input(z.object({
        companyName: z.string().min(1).max(255),
        industry: z.string().max(128).optional(),
        description: z.string().optional(),
        descriptionI18n: z.record(z.string(), z.string()).optional(),
        certificationLevel: z.enum(["L1", "L2", "L3"]).default("L1"),
      }))
      .mutation(async ({ ctx, input }) => {
        const id = await createApplication({
          userId: ctx.user.id,
          companyName: input.companyName,
          industry: input.industry,
          description: input.description,
          descriptionI18n: input.descriptionI18n,
          certificationLevel: input.certificationLevel,
        });
        return { id };
      }),

    // User: Get own applications
    myApplications: protectedProcedure.query(async ({ ctx }) => {
      return await getApplicationsByUserId(ctx.user.id);
    }),

    // Admin: Get all applications
    list: adminProcedure.query(async () => {
      return await getAllApplications();
    }),

    // Admin: Get single application
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getApplicationById(input.id);
      }),

    // Admin: Update application status
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "reviewing", "approved", "rejected"]),
        adminNotes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await updateApplicationStatus(input.id, input.status, input.adminNotes);
        
        // If approved, create a project for the user
        if (input.status === "approved") {
          const application = await getApplicationById(input.id);
          if (application) {
            await createProject({
              userId: application.userId,
              applicationId: application.id,
              title: `${application.companyName} - ${application.certificationLevel} Certification`,
              description: application.description,
              progress: 0,
              milestones: [
                { id: nanoid(), title: "Application Approved", completed: true, completedAt: new Date().toISOString() },
                { id: nanoid(), title: "Onboarding Complete", completed: false },
                { id: nanoid(), title: "Training Modules", completed: false },
                { id: nanoid(), title: "Final Assessment", completed: false },
                { id: nanoid(), title: "Certification Issued", completed: false },
              ],
            });
          }
        }
        
        return { success: true };
      }),
  }),

  // ============ PROJECT ROUTES ============
  projects: router({
    // User: Get own projects
    myProjects: protectedProcedure.query(async ({ ctx }) => {
      return await getProjectsByUserId(ctx.user.id);
    }),

    // Admin: Get all projects
    list: adminProcedure.query(async () => {
      return await getAllProjects();
    }),

    // Get single project (user can only see own, admin can see all)
    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const project = await getProjectById(input.id);
        if (!project) return null;
        
        // Check authorization
        if (ctx.user.role !== "admin" && project.userId !== ctx.user.id) {
          return null;
        }
        
        return project;
      }),

    // Admin: Update project progress
    updateProgress: adminProcedure
      .input(z.object({
        id: z.number(),
        progress: z.number().min(0).max(100),
      }))
      .mutation(async ({ input }) => {
        await updateProjectProgress(input.id, input.progress);
        return { success: true };
      }),
  }),

  // ============ CERTIFICATE ROUTES ============
  certificates: router({
    // User: Get own certificates
    myCertificates: protectedProcedure.query(async ({ ctx }) => {
      return await getCertificatesByUserId(ctx.user.id);
    }),

    // Admin: Get all certificates
    list: adminProcedure.query(async () => {
      return await getAllCertificates();
    }),

    // Public: Verify certificate by number
    verify: publicProcedure
      .input(z.object({ certificateNumber: z.string() }))
      .query(async ({ input }) => {
        const cert = await getCertificateByNumber(input.certificateNumber);
        if (!cert) return { valid: false, certificate: null };
        return { valid: cert.status === "active", certificate: cert };
      }),

    // Admin: Issue a new certificate
    issue: adminProcedure
      .input(z.object({
        userId: z.number(),
        projectId: z.number().optional(),
        level: z.enum(["L1", "L2", "L3"]),
        title: z.string().min(1).max(255),
        titleI18n: z.record(z.string(), z.string()).optional(),
        holderName: z.string().min(1).max(255),
        expiresAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const certificateNumber = `OPC-${input.level}-${nanoid(10).toUpperCase()}`;
        const id = await createCertificate({
          userId: input.userId,
          projectId: input.projectId,
          certificateNumber,
          level: input.level,
          title: input.title,
          titleI18n: input.titleI18n,
          holderName: input.holderName,
          expiresAt: input.expiresAt,
        });
        return { id, certificateNumber };
      }),
  }),

  // ============ TRANSLATION ROUTES ============
  translations: router({
    // Public: Get all translations for frontend sync
    getAll: publicProcedure.query(async () => {
      const translations = await getAllTranslations();
      // Transform to a nested object format for easy frontend consumption
      // { "hero.title": { en: "...", zh: "...", fr: "...", ja: "..." } }
      const result: Record<string, Record<string, string>> = {};
      for (const t of translations) {
        result[t.key] = {};
        if (t.en) result[t.key].en = t.en;
        if (t.zh) result[t.key].zh = t.zh;
        if (t.fr) result[t.key].fr = t.fr;
        if (t.ja) result[t.key].ja = t.ja;
      }
      return result;
    }),

    // Admin: Get all translations (full data)
    list: adminProcedure.query(async () => {
      return await getAllTranslations();
    }),

    // Admin: Upsert a translation
    upsert: adminProcedure
      .input(z.object({
        key: z.string().min(1).max(128),
        category: z.string().max(64).optional(),
        en: z.string().optional(),
        zh: z.string().optional(),
        fr: z.string().optional(),
        ja: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await upsertTranslation(input);
        return { success: true };
      }),

    // Admin: Delete a translation
    delete: adminProcedure
      .input(z.object({ key: z.string() }))
      .mutation(async ({ input }) => {
        await deleteTranslation(input.key);
        return { success: true };
      }),
  }),

  // ============ USER MANAGEMENT (Admin only) ============
  users: router({
    list: adminProcedure.query(async () => {
      return await getAllUsers();
    }),
  }),

  // ============ EXPERT ROUTES ============
  experts: router({
    // Public: Get visible experts for homepage
    visible: publicProcedure.query(async () => {
      return await getVisibleExperts();
    }),

    // Admin: Get all experts (including hidden)
    list: adminProcedure.query(async () => {
      return await getAllExperts();
    }),

    // Admin: Create a new expert
    create: adminProcedure
      .input(z.object({
        nameEn: z.string().min(1).max(128),
        nameZh: z.string().max(128).optional(),
        nameFr: z.string().max(128).optional(),
        nameJa: z.string().max(128).optional(),
        roleEn: z.string().max(128).optional(),
        roleZh: z.string().max(128).optional(),
        roleFr: z.string().max(128).optional(),
        roleJa: z.string().max(128).optional(),
        titleEn: z.string().max(255).optional(),
        titleZh: z.string().max(255).optional(),
        titleFr: z.string().max(255).optional(),
        titleJa: z.string().max(255).optional(),
        avatarUrl: z.string().max(512).optional(),
        isVisible: z.enum(["visible", "hidden"]).default("visible"),
        displayOrder: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        const id = await createExpert(input);
        return { id };
      }),

    // Admin: Update an expert
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        nameEn: z.string().min(1).max(128).optional(),
        nameZh: z.string().max(128).optional(),
        nameFr: z.string().max(128).optional(),
        nameJa: z.string().max(128).optional(),
        roleEn: z.string().max(128).optional(),
        roleZh: z.string().max(128).optional(),
        roleFr: z.string().max(128).optional(),
        roleJa: z.string().max(128).optional(),
        titleEn: z.string().max(255).optional(),
        titleZh: z.string().max(255).optional(),
        titleFr: z.string().max(255).optional(),
        titleJa: z.string().max(255).optional(),
        avatarUrl: z.string().max(512).optional(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateExpert(id, data);
        return { success: true };
      }),

    // Admin: Toggle expert visibility
    toggleVisibility: adminProcedure
      .input(z.object({
        id: z.number(),
        isVisible: z.enum(["visible", "hidden"]),
      }))
      .mutation(async ({ input }) => {
        await updateExpertVisibility(input.id, input.isVisible);
        return { success: true };
      }),

    // Admin: Update display order for an expert
    updateOrder: adminProcedure
      .input(z.object({
        id: z.number(),
        displayOrder: z.number(),
      }))
      .mutation(async ({ input }) => {
        await updateExpert(input.id, { displayOrder: input.displayOrder });
        return { success: true };
      }),

    // Admin: Batch reorder experts
    batchReorder: adminProcedure
      .input(z.object({
        items: z.array(z.object({
          id: z.number(),
          displayOrder: z.number(),
        })),
      }))
      .mutation(async ({ input }) => {
        for (const item of input.items) {
          await updateExpert(item.id, { displayOrder: item.displayOrder });
        }
        return { success: true };
      }),

    // Admin: Delete an expert
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteExpert(input.id);
        return { success: true };
      }),
  }),

  // ============ PARTNER ROUTES ============
  partners: router({
    // Public: Get visible partners for homepage
    getVisible: publicProcedure.query(async () => {
      return await getVisiblePartners();
    }),

    // Admin: Get all partners (including hidden)
    list: adminProcedure.query(async () => {
      return await getAllPartners();
    }),

    // Admin: Get single partner
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getPartnerById(input.id);
      }),

    // Admin: Create a new partner
    create: adminProcedure
      .input(z.object({
        type: z.enum(["coach", "brand", "organization"]),
        nameEn: z.string().min(1).max(255),
        nameZh: z.string().max(255).optional(),
        nameFr: z.string().max(255).optional(),
        nameJa: z.string().max(255).optional(),
        descriptionEn: z.string().optional(),
        descriptionZh: z.string().optional(),
        descriptionFr: z.string().optional(),
        descriptionJa: z.string().optional(),
        logoUrl: z.string().max(512).optional(),
        websiteUrl: z.string().max(512).optional(),
        contactEmail: z.string().max(320).optional(),
        isVisible: z.enum(["visible", "hidden"]).default("visible"),
        displayOrder: z.number().default(0),
        metadata: z.record(z.string(), z.unknown()).optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await createPartner(input);
        return { id };
      }),

    // Admin: Update a partner (supports JSON bulk update)
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        type: z.enum(["coach", "brand", "organization"]).optional(),
        nameEn: z.string().max(255).optional(),
        nameZh: z.string().max(255).optional(),
        nameFr: z.string().max(255).optional(),
        nameJa: z.string().max(255).optional(),
        descriptionEn: z.string().optional(),
        descriptionZh: z.string().optional(),
        descriptionFr: z.string().optional(),
        descriptionJa: z.string().optional(),
        logoUrl: z.string().max(512).optional(),
        websiteUrl: z.string().max(512).optional(),
        contactEmail: z.string().max(320).optional(),
        displayOrder: z.number().optional(),
        metadata: z.record(z.string(), z.unknown()).optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updatePartner(id, data);
        return { success: true };
      }),

    // Admin: Bulk update partner via JSON
    bulkUpdateJson: adminProcedure
      .input(z.object({
        id: z.number(),
        json: z.string(), // JSON string to parse and apply
      }))
      .mutation(async ({ input }) => {
        try {
          const data = JSON.parse(input.json);
          await updatePartner(input.id, data);
          return { success: true };
        } catch (e) {
          throw new Error("Invalid JSON format");
        }
      }),

    // Admin: Toggle partner visibility
    toggleVisibility: adminProcedure
      .input(z.object({
        id: z.number(),
        isVisible: z.enum(["visible", "hidden"]),
      }))
      .mutation(async ({ input }) => {
        await updatePartnerVisibility(input.id, input.isVisible);
        return { success: true };
      }),

    // Admin: Update display order for a partner
    updateOrder: adminProcedure
      .input(z.object({
        id: z.number(),
        displayOrder: z.number(),
      }))
      .mutation(async ({ input }) => {
        await updatePartner(input.id, { displayOrder: input.displayOrder });
        return { success: true };
      }),

    // Admin: Batch reorder partners
    batchReorder: adminProcedure
      .input(z.object({
        items: z.array(z.object({
          id: z.number(),
          displayOrder: z.number(),
        })),
      }))
      .mutation(async ({ input }) => {
        for (const item of input.items) {
          await updatePartner(item.id, { displayOrder: item.displayOrder });
        }
        return { success: true };
      }),

    // Admin: Delete a partner
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deletePartner(input.id);
        return { success: true };
      }),
  }),

  // ============ PARTNER APPLICATION ROUTES ============
  partnerApplications: router({
    // Public: Submit a partner application
    submit: publicProcedure
      .input(z.object({
        contactName: z.string().min(1).max(255),
        contactEmail: z.string().email().max(320),
        contactPhone: z.string().max(64).optional(),
        organizationName: z.string().min(1).max(255),
        organizationType: z.enum(["coach", "brand", "organization"]),
        description: z.string().optional(),
        websiteUrl: z.string().max(512).optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await createPartnerApplication(input);
        return { id };
      }),

    // Admin: Get all partner applications
    list: adminProcedure.query(async () => {
      return await getAllPartnerApplications();
    }),

    // Admin: Get single partner application
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getPartnerApplicationById(input.id);
      }),

    // Admin: Update partner application status
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "reviewing", "approved", "rejected"]),
        adminNotes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await updatePartnerApplicationStatus(input.id, input.status, input.adminNotes);
        return { success: true };
      }),
  }),

  // ============ MILESTONE ROUTES ============
  milestones: router({
    // Public: Get visible milestones for timeline
    visible: publicProcedure.query(async () => {
      return await getVisibleMilestones();
    }),

    // Admin: Get all milestones (including hidden)
    list: adminProcedure.query(async () => {
      return await getAllMilestones();
    }),

    // Admin: Get single milestone
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getMilestoneById(input.id);
      }),

    // Admin: Create a new milestone
    create: adminProcedure
      .input(z.object({
        category: z.string().min(1).max(128),
        sourceNameEn: z.string().min(1).max(255),
        sourceNameZh: z.string().max(255).optional(),
        sourceNameFr: z.string().max(255).optional(),
        sourceNameJa: z.string().max(255).optional(),
        descriptionEn: z.string().optional(),
        descriptionZh: z.string().optional(),
        descriptionFr: z.string().optional(),
        descriptionJa: z.string().optional(),
        publishDate: z.string().max(32).optional(),
        sourceType: z.string().max(128).optional(),
        url: z.string().max(1024).optional(),
        country: z.string().max(64).optional(),
        year: z.number().optional(),
        isVisible: z.enum(["visible", "hidden"]).default("visible"),
        displayOrder: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        const id = await createMilestone(input);
        return { id };
      }),

    // Admin: Update a milestone
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        category: z.string().max(128).optional(),
        sourceNameEn: z.string().max(255).optional(),
        sourceNameZh: z.string().max(255).optional(),
        sourceNameFr: z.string().max(255).optional(),
        sourceNameJa: z.string().max(255).optional(),
        descriptionEn: z.string().optional(),
        descriptionZh: z.string().optional(),
        descriptionFr: z.string().optional(),
        descriptionJa: z.string().optional(),
        publishDate: z.string().max(32).optional(),
        sourceType: z.string().max(128).optional(),
        url: z.string().max(1024).optional(),
        country: z.string().max(64).optional(),
        year: z.number().optional(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateMilestone(id, data);
        return { success: true };
      }),

    // Admin: Delete a milestone
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteMilestone(input.id);
        return { success: true };
      }),
  }),

  // ============ METHODOLOGY ROUTES ============
  methodologies: router({
    // Public: Get visible methodologies
    visible: publicProcedure.query(async () => {
      return await getVisibleMethodologies();
    }),

    // Public: Get single methodology by slug
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await getMethodologyBySlug(input.slug);
      }),

    // Admin: Get all methodologies (including hidden)
    list: adminProcedure.query(async () => {
      return await getAllMethodologies();
    }),

    // Admin: Get single methodology
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getMethodologyById(input.id);
      }),

    // Admin: Create a new methodology
    create: adminProcedure
      .input(z.object({
        slug: z.string().min(1).max(64),
        nameEn: z.string().min(1).max(255),
        nameZh: z.string().max(255).optional(),
        nameFr: z.string().max(255).optional(),
        nameJa: z.string().max(255).optional(),
        taglineEn: z.string().max(512).optional(),
        taglineZh: z.string().max(512).optional(),
        taglineFr: z.string().max(512).optional(),
        taglineJa: z.string().max(512).optional(),
        descriptionEn: z.string().optional(),
        descriptionZh: z.string().optional(),
        descriptionFr: z.string().optional(),
        descriptionJa: z.string().optional(),
        iconUrl: z.string().max(512).optional(),
        themeColor: z.string().max(16).optional(),
        isVisible: z.enum(["visible", "hidden"]).default("visible"),
        displayOrder: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        const id = await createMethodology(input);
        return { id };
      }),

    // Admin: Update a methodology
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        slug: z.string().max(64).optional(),
        nameEn: z.string().max(255).optional(),
        nameZh: z.string().max(255).optional(),
        nameFr: z.string().max(255).optional(),
        nameJa: z.string().max(255).optional(),
        taglineEn: z.string().max(512).optional(),
        taglineZh: z.string().max(512).optional(),
        taglineFr: z.string().max(512).optional(),
        taglineJa: z.string().max(512).optional(),
        descriptionEn: z.string().optional(),
        descriptionZh: z.string().optional(),
        descriptionFr: z.string().optional(),
        descriptionJa: z.string().optional(),
        iconUrl: z.string().max(512).optional(),
        themeColor: z.string().max(16).optional(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateMethodology(id, data);
        return { success: true };
      }),

    // Admin: Delete a methodology
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteMethodology(input.id);
        return { success: true };
      }),
  }),

  // ============ EXPORT ROUTES ============
  dataExport: router({
    // Public: List all available modules
    modules: publicProcedure.query(() => {
      return allModules.map(m => ({
        id: m.id,
        slug: m.slug,
        name: m.name,
        tagline: m.tagline,
      }));
    }),

    // Public: Export a module in specified format
    module: publicProcedure
      .input(z.object({
        slug: z.string(),
        format: z.enum(["json", "yaml", "markdown", "slides"]),
        lang: z.enum(["en", "zh", "fr", "ja"]).default("en"),
        layout: z.enum(["landscape", "portrait"]).default("landscape"),
      }))
      .query(({ input }) => {
        const mod = allModules.find(m => m.slug === input.slug);
        if (!mod) return { error: "Module not found", content: null };
        const content = exportModule(mod, input.lang, input.format, input.layout);
        return {
          error: null,
          content,
          filename: `${mod.slug}-${input.lang}.${input.format === "slides" ? "json" : input.format === "markdown" ? "md" : input.format}`,
          mimeType: input.format === "json" || input.format === "slides" ? "application/json" : input.format === "yaml" ? "text/yaml" : "text/markdown",
        };
      }),

    // Public: Export all modules as a bundle
    all: publicProcedure
      .input(z.object({
        format: z.enum(["json", "yaml", "markdown", "slides"]),
        lang: z.enum(["en", "zh", "fr", "ja"]).default("en"),
        layout: z.enum(["landscape", "portrait"]).default("landscape"),
      }))
      .query(({ input }) => {
        const results = allModules.map(mod => ({
          slug: mod.slug,
          name: mod.name[input.lang],
          content: exportModule(mod, input.lang, input.format, input.layout),
        }));
        return results;
      }),
  }),

  // ============ COURSES ROUTES ============
  courses: router({
    // Public: Get all visible courses
    visible: publicProcedure.query(async () => {
      return await getVisibleCourses();
    }),

    // Public: Get course by slug
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await getCourseBySlug(input.slug);
      }),

    // Admin: Get all courses (including hidden)
    all: adminProcedure.query(async () => {
      return await getAllCourses();
    }),

    // Admin: Create a new course
    create: adminProcedure
      .input(z.object({
        slug: z.string().min(1).max(64),
        nameEn: z.string().min(1).max(255),
        nameZh: z.string().max(255).optional(),
        nameFr: z.string().max(255).optional(),
        nameJa: z.string().max(255).optional(),
        taglineEn: z.string().max(512).optional(),
        taglineZh: z.string().max(512).optional(),
        taglineFr: z.string().max(512).optional(),
        taglineJa: z.string().max(512).optional(),
        descriptionEn: z.string().optional(),
        descriptionZh: z.string().optional(),
        descriptionFr: z.string().optional(),
        descriptionJa: z.string().optional(),
        category: z.string().max(64).optional(),
        targetAudienceEn: z.string().max(512).optional(),
        targetAudienceZh: z.string().max(512).optional(),
        duration: z.string().max(64).optional(),
        priceInfo: z.string().max(128).optional(),
        coverImageUrl: z.string().max(512).optional(),
        icon: z.string().max(16).optional(),
        themeColor: z.string().max(16).optional(),
        highlights: z.array(z.object({
          en: z.string(),
          zh: z.string(),
          fr: z.string().optional(),
          ja: z.string().optional(),
        })).optional(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await createCourse(input);
        return { id };
      }),

    // Admin: Update a course
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        slug: z.string().min(1).max(64).optional(),
        nameEn: z.string().min(1).max(255).optional(),
        nameZh: z.string().max(255).optional(),
        nameFr: z.string().max(255).optional(),
        nameJa: z.string().max(255).optional(),
        taglineEn: z.string().max(512).optional(),
        taglineZh: z.string().max(512).optional(),
        taglineFr: z.string().max(512).optional(),
        taglineJa: z.string().max(512).optional(),
        descriptionEn: z.string().optional(),
        descriptionZh: z.string().optional(),
        descriptionFr: z.string().optional(),
        descriptionJa: z.string().optional(),
        category: z.string().max(64).optional(),
        targetAudienceEn: z.string().max(512).optional(),
        targetAudienceZh: z.string().max(512).optional(),
        duration: z.string().max(64).optional(),
        priceInfo: z.string().max(128).optional(),
        coverImageUrl: z.string().max(512).optional(),
        icon: z.string().max(16).optional(),
        themeColor: z.string().max(16).optional(),
        highlights: z.array(z.object({
          en: z.string(),
          zh: z.string(),
          fr: z.string().optional(),
          ja: z.string().optional(),
        })).optional(),
        isVisible: z.enum(["visible", "hidden"]).optional(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateCourse(id, data);
        return { success: true };
      }),

    // Admin: Delete a course
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteCourse(input.id);
        return { success: true };
      }),

    // Admin: Batch reorder courses
    batchReorder: adminProcedure
      .input(z.array(z.object({ id: z.number(), displayOrder: z.number() })))
      .mutation(async ({ input }) => {
        for (const item of input) {
          await updateCourse(item.id, { displayOrder: item.displayOrder });
        }
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
