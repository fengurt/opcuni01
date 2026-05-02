import { describe, it, expect } from "vitest";

// Test course data structure and validation
describe("Courses Module", () => {
  const validCourse = {
    slug: "test-course",
    nameEn: "Test Course",
    nameZh: "测试课程",
    taglineEn: "A test course tagline",
    taglineZh: "测试课程标语",
    category: "coaching",
    icon: "🎯",
    themeColor: "#A88B52",
    displayOrder: 1,
    highlights: [
      { en: "Highlight 1", zh: "亮点1" },
      { en: "Highlight 2", zh: "亮点2" },
    ],
  };

  it("should have required fields for a course", () => {
    expect(validCourse.slug).toBeTruthy();
    expect(validCourse.nameEn).toBeTruthy();
    expect(validCourse.nameZh).toBeTruthy();
    expect(validCourse.category).toBeTruthy();
  });

  it("should have valid slug format", () => {
    expect(validCourse.slug).toMatch(/^[a-z0-9-]+$/);
    expect(validCourse.slug.length).toBeLessThanOrEqual(64);
  });

  it("should have valid theme color hex format", () => {
    expect(validCourse.themeColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it("should have highlights with both en and zh", () => {
    for (const h of validCourse.highlights) {
      expect(h.en).toBeTruthy();
      expect(h.zh).toBeTruthy();
    }
  });

  it("should have positive displayOrder", () => {
    expect(validCourse.displayOrder).toBeGreaterThan(0);
  });

  // Test the 7 initial courses
  describe("Initial Courses Data", () => {
    const initialCourses = [
      { slug: "coaching-partner", nameZh: "教练合伙人", category: "coaching" },
      { slug: "ip-evolution", nameZh: "IP进化论", category: "knowledge" },
      { slug: "new-media-practitioner", nameZh: "新媒体实战派", category: "media" },
      { slug: "knowledge-asset", nameZh: "知识资产化", category: "knowledge" },
      { slug: "opc-startup-101", nameZh: "OPC创业启蒙", category: "startup" },
      { slug: "champion-lobster", nameZh: "冠军龙虾课", category: "business" },
      { slug: "champion-enterprise-ai", nameZh: "冠军企业 AI 转型课", category: "enterprise" },
    ];

    it("should have exactly 7 initial courses", () => {
      expect(initialCourses).toHaveLength(7);
    });

    it("should have unique slugs", () => {
      const slugs = initialCourses.map(c => c.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    it("should have valid slug format for all courses", () => {
      for (const course of initialCourses) {
        expect(course.slug).toMatch(/^[a-z0-9-]+$/);
      }
    });

    it("should have Chinese names for all courses", () => {
      for (const course of initialCourses) {
        expect(course.nameZh).toBeTruthy();
      }
    });

    it("should cover diverse categories", () => {
      const categories = new Set(initialCourses.map(c => c.category));
      expect(categories.size).toBeGreaterThanOrEqual(5);
    });
  });

  // Test category color mapping
  describe("Category Color Mapping", () => {
    const getCategoryColor = (category: string) => {
      const colors: Record<string, string> = {
        coaching: "#A88B52",
        ai: "#3B82F6",
        business: "#059669",
        media: "#8B5CF6",
        knowledge: "#EC4899",
        startup: "#F59E0B",
        enterprise: "#0A1626",
      };
      return colors[category] || "#A88B52";
    };

    it("should return correct color for coaching", () => {
      expect(getCategoryColor("coaching")).toBe("#A88B52");
    });

    it("should return correct color for enterprise", () => {
      expect(getCategoryColor("enterprise")).toBe("#0A1626");
    });

    it("should return default gold for unknown category", () => {
      expect(getCategoryColor("unknown")).toBe("#A88B52");
    });
  });
});
