import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  getAllTranslations: vi.fn().mockResolvedValue([
    {
      id: 1,
      key: "hero.title",
      category: "hero",
      en: "Masters of AI Inherit the World",
      zh: "善用 AI 者得天下",
      fr: "Les Maîtres de l'IA Héritent du Monde",
      ja: "AIを制する者が世界を制す",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      key: "cta.join",
      category: "cta",
      en: "Join the Alliance",
      zh: "加入联盟",
      fr: "Rejoindre l'Alliance",
      ja: "アライアンスに参加",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  upsertTranslation: vi.fn().mockResolvedValue(undefined),
  deleteTranslation: vi.fn().mockResolvedValue(undefined),
  // Include other mocked functions that might be needed
  createApplication: vi.fn(),
  getApplicationsByUserId: vi.fn(),
  getAllApplications: vi.fn(),
  getApplicationById: vi.fn(),
  updateApplicationStatus: vi.fn(),
  getProjectsByUserId: vi.fn(),
  getAllProjects: vi.fn(),
  getProjectById: vi.fn(),
  createProject: vi.fn(),
  updateProjectProgress: vi.fn(),
  getCertificatesByUserId: vi.fn(),
  getAllCertificates: vi.fn(),
  getCertificateByNumber: vi.fn(),
  createCertificate: vi.fn(),
  getAllUsers: vi.fn(),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("translations.getAll (public)", () => {
  it("returns translations in nested format for public access", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.translations.getAll();

    // Should return nested format: { "key": { en: "...", zh: "...", ... } }
    expect(result).toHaveProperty("hero.title");
    expect(result).toHaveProperty("cta.join");
    
    expect(result["hero.title"]).toEqual({
      en: "Masters of AI Inherit the World",
      zh: "善用 AI 者得天下",
      fr: "Les Maîtres de l'IA Héritent du Monde",
      ja: "AIを制する者が世界を制す",
    });
    
    expect(result["cta.join"]).toEqual({
      en: "Join the Alliance",
      zh: "加入联盟",
      fr: "Rejoindre l'Alliance",
      ja: "アライアンスに参加",
    });
  });

  it("allows unauthenticated access to translations", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Should not throw
    const result = await caller.translations.getAll();
    expect(result).toBeDefined();
  });
});

describe("translations.list (admin)", () => {
  it("returns full translation data for admin", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.translations.list();

    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("key");
    expect(result[0]).toHaveProperty("category");
  });

  it("throws error for non-admin user", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.translations.list()).rejects.toThrow();
  });
});

describe("translations.upsert (admin)", () => {
  it("allows admin to upsert translations", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.translations.upsert({
      key: "new.key",
      category: "test",
      en: "English text",
      zh: "中文文本",
    });

    expect(result).toEqual({ success: true });
  });

  it("throws error for non-admin user", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.translations.upsert({
        key: "new.key",
        en: "English text",
      })
    ).rejects.toThrow();
  });
});

describe("translations.delete (admin)", () => {
  it("allows admin to delete translations", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.translations.delete({ key: "some.key" });

    expect(result).toEqual({ success: true });
  });

  it("throws error for non-admin user", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.translations.delete({ key: "some.key" })
    ).rejects.toThrow();
  });
});
