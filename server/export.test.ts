import { describe, it, expect } from "vitest";
import { moduleToJSON, moduleToYAML, moduleToMarkdown, moduleToSlides, exportModule } from "@shared/exportUtils";
import { universeModule, homModule, uniModule, daoModule, allModules } from "@shared/moduleData";
import type { OPCModule } from "@shared/moduleData";

describe("Export Utilities", () => {
  describe("moduleToJSON", () => {
    it("should export universe module as valid JSON in English", () => {
      const result = moduleToJSON(universeModule, "en");
      const parsed = JSON.parse(result);
      expect(parsed.id).toBe("opc-universe");
      expect(parsed.slug).toBe("universe");
      expect(parsed.name).toBe("OPC UNIverse");
      expect(parsed.sections).toBeInstanceOf(Array);
      expect(parsed.sections.length).toBeGreaterThan(0);
      expect(parsed.metadata.version).toBe("1.0.0");
    });

    it("should export in Chinese when lang is zh", () => {
      const result = moduleToJSON(universeModule, "zh");
      const parsed = JSON.parse(result);
      expect(parsed.name).toBe("OPC 宇宙");
      expect(parsed.tagline).toContain("开放");
    });

    it("should export HOM module correctly", () => {
      const result = moduleToJSON(homModule, "en");
      const parsed = JSON.parse(result);
      expect(parsed.slug).toBe("hom");
      expect(parsed.sections.length).toBeGreaterThan(0);
    });

    it("should export UNI module with stats", () => {
      const result = moduleToJSON(uniModule, "en");
      const parsed = JSON.parse(result);
      const statsSection = parsed.sections.find((s: any) => s.stats && s.stats.length > 0);
      expect(statsSection).toBeDefined();
      expect(statsSection.stats[0].value).toBe("0.5");
    });

    it("should export DAO module with tags", () => {
      const result = moduleToJSON(daoModule, "en");
      const parsed = JSON.parse(result);
      const archSection = parsed.sections.find((s: any) => s.id === "architecture");
      expect(archSection).toBeDefined();
      expect(archSection.items[0].tags).toContain("Arweave");
    });

    it("should include layout metadata in landscape format", () => {
      const result = moduleToJSON(universeModule, "en", "landscape");
      const parsed = JSON.parse(result);
      expect(parsed.metadata.layout.format).toBe("landscape");
      expect(parsed.metadata.layout.ratio).toBe("16:9");
      expect(parsed.metadata.layout.width).toBe(1920);
      expect(parsed.metadata.layout.height).toBe(1080);
    });

    it("should include layout metadata in portrait format", () => {
      const result = moduleToJSON(universeModule, "en", "portrait");
      const parsed = JSON.parse(result);
      expect(parsed.metadata.layout.format).toBe("portrait");
      expect(parsed.metadata.layout.ratio).toBe("A4");
      expect(parsed.metadata.layout.width).toBe(794);
      expect(parsed.metadata.layout.height).toBe(1123);
    });

    it("should include language in metadata", () => {
      const result = moduleToJSON(universeModule, "zh");
      const parsed = JSON.parse(result);
      expect(parsed.metadata.language).toBe("zh");
    });
  });

  describe("moduleToYAML", () => {
    it("should export universe module as YAML", () => {
      const result = moduleToYAML(universeModule, "en");
      expect(result).toContain("id: opc-universe");
      expect(result).toContain("slug: universe");
      expect(result).toContain("name: OPC UNIverse");
      expect(result).toContain("sections:");
    });

    it("should handle Chinese characters in YAML", () => {
      const result = moduleToYAML(universeModule, "zh");
      expect(result).toContain("OPC 宇宙");
    });

    it("should include metadata in YAML", () => {
      const result = moduleToYAML(homModule, "en");
      expect(result).toContain("version: 1.0.0");
      expect(result).toContain("author: OPC Global Alliance");
    });

    it("should include layout metadata in YAML landscape", () => {
      const result = moduleToYAML(universeModule, "en", "landscape");
      expect(result).toContain("# Layout: 16:9 (horizontal)");
      expect(result).toContain("format: landscape");
      expect(result).toContain("ratio: \"16:9\"");
      expect(result).toContain("width: 1920");
    });

    it("should include layout metadata in YAML portrait", () => {
      const result = moduleToYAML(universeModule, "en", "portrait");
      expect(result).toContain("# Layout: A4 (vertical)");
      expect(result).toContain("format: portrait");
      expect(result).toContain("width: 794");
      expect(result).toContain("height: 1123");
    });
  });

  describe("moduleToMarkdown", () => {
    it("should export universe module as Markdown", () => {
      const result = moduleToMarkdown(universeModule, "en");
      expect(result).toContain("# OPC UNIverse");
      expect(result).toContain("> An Open, Fair");
      expect(result).toContain("## Core Values");
      expect(result).toContain("### Justice");
    });

    it("should include stats table in UNI module Markdown", () => {
      const result = moduleToMarkdown(uniModule, "en");
      expect(result).toContain("| Value | Metric | Description |");
      expect(result).toContain("**0.5**");
      expect(result).toContain("**3.0**");
      expect(result).toContain("**2.0**");
    });

    it("should include technology tags in DAO module Markdown", () => {
      const result = moduleToMarkdown(daoModule, "en");
      expect(result).toContain("**Technologies:**");
      expect(result).toContain("Arweave");
    });

    it("should include links in universe module Markdown", () => {
      const result = moduleToMarkdown(universeModule, "en");
      expect(result).toContain("[Learn More](/hom)");
    });

    it("should export in French", () => {
      const result = moduleToMarkdown(universeModule, "fr");
      expect(result).toContain("OPC Univers");
    });

    it("should include layout comment in Markdown", () => {
      const result = moduleToMarkdown(universeModule, "en", "landscape");
      expect(result).toContain("<!-- Layout: 16:9 (landscape) | 1920x1080px -->");
    });

    it("should use Chinese table headers when lang is zh", () => {
      const result = moduleToMarkdown(uniModule, "zh");
      expect(result).toContain("| 数值 | 指标 | 说明 |");
    });

    it("should use Chinese link labels when lang is zh", () => {
      const result = moduleToMarkdown(universeModule, "zh");
      expect(result).toContain("[了解更多]");
    });
  });

  describe("moduleToSlides", () => {
    it("should generate SlideDeck with meta for universe module", () => {
      const deck = moduleToSlides(universeModule, "en");
      expect(deck.meta).toBeDefined();
      expect(deck.meta.module).toBe("opc-universe");
      expect(deck.meta.language).toBe("en");
      expect(deck.meta.layout.format).toBe("landscape");
      expect(deck.meta.totalSlides).toBe(deck.slides.length);
      expect(deck.slides.length).toBeGreaterThan(2);
      expect(deck.slides[0].type).toBe("title");
      expect(deck.slides[0].title).toBe("OPC UNIverse");
      expect(deck.slides[deck.slides.length - 1].type).toBe("closing");
    });

    it("should generate portrait layout metadata", () => {
      const deck = moduleToSlides(universeModule, "en", "portrait");
      expect(deck.meta.layout.format).toBe("portrait");
      expect(deck.meta.layout.ratio).toBe("A4");
      expect(deck.meta.layout.width).toBe(794);
      expect(deck.meta.layout.height).toBe(1123);
    });

    it("should generate stats slide for UNI module", () => {
      const deck = moduleToSlides(uniModule, "en");
      const statsSlide = deck.slides.find(s => s.type === "stats");
      expect(statsSlide).toBeDefined();
      expect(statsSlide!.stats).toHaveLength(3);
      expect(statsSlide!.stats![0].value).toBe("0.5");
    });

    it("should have sequential slide numbers", () => {
      const deck = moduleToSlides(daoModule, "en");
      for (let i = 0; i < deck.slides.length; i++) {
        expect(deck.slides[i].slideNumber).toBe(i + 1);
      }
    });

    it("should split large item lists into multiple slides", () => {
      const deck = moduleToSlides(daoModule, "en");
      const contentSlides = deck.slides.filter(s => s.type === "content");
      expect(contentSlides.length).toBeGreaterThan(0);
    });

    it("should allow more items per slide in portrait mode", () => {
      const landscapeDeck = moduleToSlides(daoModule, "en", "landscape");
      const portraitDeck = moduleToSlides(daoModule, "en", "portrait");
      // Portrait allows 4 items per slide vs 3 in landscape, so may have fewer content slides
      const landscapeContent = landscapeDeck.slides.filter(s => s.type === "content");
      const portraitContent = portraitDeck.slides.filter(s => s.type === "content");
      expect(portraitContent.length).toBeLessThanOrEqual(landscapeContent.length);
    });
  });

  describe("exportModule", () => {
    it("should route to correct format", () => {
      const json = exportModule(universeModule, "en", "json");
      expect(() => JSON.parse(json)).not.toThrow();

      const yaml = exportModule(universeModule, "en", "yaml");
      expect(yaml).toContain("id: opc-universe");

      const md = exportModule(universeModule, "en", "markdown");
      expect(md).toContain("# OPC UNIverse");

      const slides = exportModule(universeModule, "en", "slides");
      const parsedSlides = JSON.parse(slides);
      expect(parsedSlides.meta).toBeDefined();
      expect(parsedSlides.slides).toBeInstanceOf(Array);
    });

    it("should pass layout parameter through", () => {
      const json = exportModule(universeModule, "en", "json", "portrait");
      const parsed = JSON.parse(json);
      expect(parsed.metadata.layout.format).toBe("portrait");
    });

    it("should default to landscape layout", () => {
      const json = exportModule(universeModule, "en", "json");
      const parsed = JSON.parse(json);
      expect(parsed.metadata.layout.format).toBe("landscape");
    });
  });

  describe("allModules", () => {
    it("should contain all four modules", () => {
      expect(allModules).toHaveLength(4);
      const slugs = allModules.map(m => m.slug);
      expect(slugs).toContain("universe");
      expect(slugs).toContain("hom");
      expect(slugs).toContain("uni");
      expect(slugs).toContain("dao");
    });

    it("should have valid structure for all modules", () => {
      for (const mod of allModules) {
        expect(mod.id).toBeTruthy();
        expect(mod.slug).toBeTruthy();
        expect(mod.name.en).toBeTruthy();
        expect(mod.name.zh).toBeTruthy();
        expect(mod.tagline.en).toBeTruthy();
        expect(mod.description.en).toBeTruthy();
        expect(mod.sections.length).toBeGreaterThan(0);
        expect(mod.metadata.version).toBeTruthy();
      }
    });

    it("should export all modules in all formats and layouts without errors", () => {
      const formats = ["json", "yaml", "markdown", "slides"] as const;
      const langs = ["en", "zh", "fr", "ja"] as const;
      const layouts = ["landscape", "portrait"] as const;
      
      for (const mod of allModules) {
        for (const fmt of formats) {
          for (const lang of langs) {
            for (const layout of layouts) {
              expect(() => exportModule(mod, lang, fmt, layout)).not.toThrow();
            }
          }
        }
      }
    });
  });
});
