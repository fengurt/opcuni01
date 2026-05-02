import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

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
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("partners router", () => {
  it("public getVisible returns array (may be empty)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.partners.getVisible();

    expect(Array.isArray(result)).toBe(true);
  });

  it("admin list returns all partners", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.partners.list();

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("partnerApplications router", () => {
  it("public can submit a partner application", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.partnerApplications.submit({
      organizationName: "Test Organization",
      organizationType: "brand",
      contactName: "John Doe",
      contactEmail: "john@example.com",
      contactPhone: "+1234567890",
      websiteUrl: "https://example.com",
      description: "We want to partner with OPC Global",
    });

    expect(result).toHaveProperty("id");
    expect(typeof result.id).toBe("number");
  });

  it("admin can list all partner applications", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.partnerApplications.list();

    expect(Array.isArray(result)).toBe(true);
  });
});
