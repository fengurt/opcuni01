import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  createApplication: vi.fn().mockResolvedValue(1),
  getApplicationsByUserId: vi.fn().mockResolvedValue([
    {
      id: 1,
      userId: 1,
      companyName: "Test Company",
      industry: "Technology",
      description: "Test description",
      status: "pending",
      certificationLevel: "L1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getAllApplications: vi.fn().mockResolvedValue([
    {
      id: 1,
      userId: 1,
      companyName: "Test Company",
      industry: "Technology",
      description: "Test description",
      status: "pending",
      certificationLevel: "L1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getApplicationById: vi.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    companyName: "Test Company",
    industry: "Technology",
    description: "Test description",
    status: "pending",
    certificationLevel: "L1",
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  updateApplicationStatus: vi.fn().mockResolvedValue(undefined),
  createProject: vi.fn().mockResolvedValue(1),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
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

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
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

function createUnauthContext(): TrpcContext {
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

describe("applications.create", () => {
  it("creates an application for authenticated user", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.applications.create({
      companyName: "New Company",
      industry: "Finance",
      description: "A new fintech startup",
      certificationLevel: "L2",
    });

    expect(result).toEqual({ id: 1 });
  });

  it("throws error for unauthenticated user", async () => {
    const ctx = createUnauthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.applications.create({
        companyName: "New Company",
        certificationLevel: "L1",
      })
    ).rejects.toThrow();
  });
});

describe("applications.myApplications", () => {
  it("returns applications for authenticated user", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.applications.myApplications();

    expect(result).toHaveLength(1);
    expect(result[0].companyName).toBe("Test Company");
  });
});

describe("applications.list (admin)", () => {
  it("returns all applications for admin", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.applications.list();

    expect(result).toHaveLength(1);
  });

  it("throws error for non-admin user", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.applications.list()).rejects.toThrow();
  });
});

describe("applications.updateStatus (admin)", () => {
  it("updates application status for admin", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.applications.updateStatus({
      id: 1,
      status: "approved",
      adminNotes: "Looks good!",
    });

    expect(result).toEqual({ success: true });
  });

  it("throws error for non-admin user", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.applications.updateStatus({
        id: 1,
        status: "approved",
      })
    ).rejects.toThrow();
  });
});
