/**
 * OPC Global — Export Utilities
 * 
 * Convert structured module data to JSON, YAML, and Markdown formats.
 * These utilities ensure content consistency across:
 * - Website rendering
 * - Exported documents
 * - Auto-generated PPT slides
 * 
 * Supports layout formats:
 * - landscape (16:9) — for presentations, screen projection
 * - portrait (A4) — for printed documents, PDF reports
 */

import type { OPCModule, LocalizedText, ModuleSection, ModuleItem, ModuleStat } from "./moduleData";

type Language = "en" | "zh" | "fr" | "ja";
type LayoutFormat = "landscape" | "portrait";

interface LayoutMeta {
  format: LayoutFormat;
  ratio: string;
  width: number;
  height: number;
  orientation: string;
}

const layoutMeta: Record<LayoutFormat, LayoutMeta> = {
  landscape: { format: "landscape", ratio: "16:9", width: 1920, height: 1080, orientation: "horizontal" },
  portrait: { format: "portrait", ratio: "A4", width: 794, height: 1123, orientation: "vertical" },
};

// ============================================================
// Localization Helper
// ============================================================
function loc(text: LocalizedText, lang: Language): string {
  return text[lang] || text.en;
}

// ============================================================
// JSON Export
// ============================================================
export function moduleToJSON(module: OPCModule, lang: Language, layout: LayoutFormat = "landscape"): string {
  const localized = {
    id: module.id,
    slug: module.slug,
    name: loc(module.name, lang),
    tagline: loc(module.tagline, lang),
    description: loc(module.description, lang),
    sections: module.sections.map(s => ({
      id: s.id,
      title: loc(s.title, lang),
      subtitle: s.subtitle ? loc(s.subtitle, lang) : undefined,
      description: s.description ? loc(s.description, lang) : undefined,
      items: s.items?.map(i => ({
        id: i.id,
        title: loc(i.title, lang),
        description: loc(i.description, lang),
        icon: i.icon,
        link: i.link,
        tags: i.tags,
      })),
      stats: s.stats?.map(st => ({
        value: st.value,
        label: loc(st.label, lang),
        description: st.description ? loc(st.description, lang) : undefined,
      })),
    })),
    metadata: {
      ...module.metadata,
      language: lang,
      layout: layoutMeta[layout],
    },
  };
  return JSON.stringify(localized, null, 2);
}

// ============================================================
// YAML Export
// ============================================================
function yamlEscape(str: string): string {
  if (/[:#{}[\],&*?|>!%@`]/.test(str) || str.includes("\n") || str.startsWith('"') || str.startsWith("'")) {
    return `"${str.replace(/"/g, '\\"')}"`;
  }
  return str;
}

function yamlIndent(depth: number): string {
  return "  ".repeat(depth);
}

export function moduleToYAML(module: OPCModule, lang: Language, layout: LayoutFormat = "landscape"): string {
  const lines: string[] = [];
  const lm = layoutMeta[layout];
  
  lines.push(`# ${loc(module.name, lang)}`);
  lines.push(`# Generated: ${new Date().toISOString()}`);
  lines.push(`# Layout: ${lm.ratio} (${lm.orientation})`);
  lines.push("");
  lines.push(`id: ${module.id}`);
  lines.push(`slug: ${module.slug}`);
  lines.push(`name: ${yamlEscape(loc(module.name, lang))}`);
  lines.push(`tagline: ${yamlEscape(loc(module.tagline, lang))}`);
  lines.push(`description: ${yamlEscape(loc(module.description, lang))}`);
  lines.push("");
  lines.push("metadata:");
  lines.push(`${yamlIndent(1)}version: ${module.metadata.version}`);
  lines.push(`${yamlIndent(1)}lastUpdated: ${module.metadata.lastUpdated}`);
  lines.push(`${yamlIndent(1)}author: ${module.metadata.author}`);
  lines.push(`${yamlIndent(1)}language: ${lang}`);
  lines.push(`${yamlIndent(1)}layout:`);
  lines.push(`${yamlIndent(2)}format: ${lm.format}`);
  lines.push(`${yamlIndent(2)}ratio: ${yamlEscape(lm.ratio)}`);
  lines.push(`${yamlIndent(2)}width: ${lm.width}`);
  lines.push(`${yamlIndent(2)}height: ${lm.height}`);
  lines.push(`${yamlIndent(2)}orientation: ${lm.orientation}`);
  lines.push("");
  lines.push("sections:");
  
  for (const section of module.sections) {
    lines.push(`${yamlIndent(1)}- id: ${section.id}`);
    lines.push(`${yamlIndent(2)}title: ${yamlEscape(loc(section.title, lang))}`);
    if (section.subtitle) {
      lines.push(`${yamlIndent(2)}subtitle: ${yamlEscape(loc(section.subtitle, lang))}`);
    }
    if (section.description) {
      lines.push(`${yamlIndent(2)}description: ${yamlEscape(loc(section.description, lang))}`);
    }
    if (section.items && section.items.length > 0) {
      lines.push(`${yamlIndent(2)}items:`);
      for (const item of section.items) {
        lines.push(`${yamlIndent(3)}- id: ${item.id}`);
        lines.push(`${yamlIndent(4)}title: ${yamlEscape(loc(item.title, lang))}`);
        lines.push(`${yamlIndent(4)}description: ${yamlEscape(loc(item.description, lang))}`);
        if (item.icon) lines.push(`${yamlIndent(4)}icon: ${item.icon}`);
        if (item.link) lines.push(`${yamlIndent(4)}link: ${item.link}`);
        if (item.tags && item.tags.length > 0) {
          lines.push(`${yamlIndent(4)}tags: [${item.tags.map(t => yamlEscape(t)).join(", ")}]`);
        }
      }
    }
    if (section.stats && section.stats.length > 0) {
      lines.push(`${yamlIndent(2)}stats:`);
      for (const stat of section.stats) {
        lines.push(`${yamlIndent(3)}- value: ${yamlEscape(stat.value)}`);
        lines.push(`${yamlIndent(4)}label: ${yamlEscape(loc(stat.label, lang))}`);
        if (stat.description) {
          lines.push(`${yamlIndent(4)}description: ${yamlEscape(loc(stat.description, lang))}`);
        }
      }
    }
    lines.push("");
  }
  
  return lines.join("\n");
}

// ============================================================
// Markdown Export
// ============================================================
export function moduleToMarkdown(module: OPCModule, lang: Language, layout: LayoutFormat = "landscape"): string {
  const lines: string[] = [];
  const lm = layoutMeta[layout];
  
  lines.push(`# ${loc(module.name, lang)}`);
  lines.push("");
  lines.push(`> ${loc(module.tagline, lang)}`);
  lines.push("");
  lines.push(loc(module.description, lang));
  lines.push("");
  lines.push(`<!-- Layout: ${lm.ratio} (${lm.format}) | ${lm.width}x${lm.height}px -->`);
  lines.push("");
  lines.push("---");
  lines.push("");
  
  for (const section of module.sections) {
    lines.push(`## ${loc(section.title, lang)}`);
    lines.push("");
    
    if (section.description) {
      lines.push(loc(section.description, lang));
      lines.push("");
    }
    
    if (section.stats && section.stats.length > 0) {
      const headers = lang === "zh"
        ? ["数值", "指标", "说明"]
        : ["Value", "Metric", "Description"];
      lines.push(`| ${headers[0]} | ${headers[1]} | ${headers[2]} |`);
      lines.push("|-------|--------|-------------|");
      for (const stat of section.stats) {
        const desc = stat.description ? loc(stat.description, lang) : "";
        lines.push(`| **${stat.value}** | ${loc(stat.label, lang)} | ${desc} |`);
      }
      lines.push("");
    }
    
    if (section.items && section.items.length > 0) {
      for (const item of section.items) {
        lines.push(`### ${loc(item.title, lang)}`);
        lines.push("");
        lines.push(loc(item.description, lang));
        lines.push("");
        if (item.tags && item.tags.length > 0) {
          const tagLabel = lang === "zh" ? "技术栈" : "Technologies";
          lines.push(`**${tagLabel}:** ${item.tags.join(", ")}`);
          lines.push("");
        }
        if (item.link) {
          const linkLabel = lang === "zh" ? "了解更多" : "Learn More";
          lines.push(`[${linkLabel}](${item.link})`);
          lines.push("");
        }
      }
    }
    
    lines.push("---");
    lines.push("");
  }
  
  lines.push(`*Version ${module.metadata.version} | Last Updated: ${module.metadata.lastUpdated} | ${module.metadata.author}*`);
  lines.push("");
  
  return lines.join("\n");
}

// ============================================================
// PPT-Ready Slide Data Export
// ============================================================
export interface SlideData {
  slideNumber: number;
  type: "title" | "section" | "content" | "stats" | "closing";
  title: string;
  subtitle?: string;
  body?: string;
  items?: Array<{ title: string; description: string; tags?: string[] }>;
  stats?: Array<{ value: string; label: string; description?: string }>;
}

export interface SlideDeck {
  meta: {
    module: string;
    language: string;
    layout: LayoutMeta;
    totalSlides: number;
    generated: string;
  };
  slides: SlideData[];
}

export function moduleToSlides(module: OPCModule, lang: Language, layout: LayoutFormat = "landscape"): SlideDeck {
  const slides: SlideData[] = [];
  let slideNum = 1;
  const lm = layoutMeta[layout];
  
  // Title slide
  slides.push({
    slideNumber: slideNum++,
    type: "title",
    title: loc(module.name, lang),
    subtitle: loc(module.tagline, lang),
    body: loc(module.description, lang),
  });
  
  // Section slides
  for (const section of module.sections) {
    if (section.stats && section.stats.length > 0) {
      slides.push({
        slideNumber: slideNum++,
        type: "stats",
        title: loc(section.title, lang),
        subtitle: section.description ? loc(section.description, lang) : undefined,
        stats: section.stats.map(s => ({
          value: s.value,
          label: loc(s.label, lang),
          description: s.description ? loc(s.description, lang) : undefined,
        })),
      });
    } else if (section.items && section.items.length > 0) {
      // Landscape: max 3 items per slide; Portrait: max 4 items per slide
      const maxPerSlide = layout === "portrait" ? 4 : 3;
      const chunks: ModuleItem[][] = [];
      for (let i = 0; i < section.items.length; i += maxPerSlide) {
        chunks.push(section.items.slice(i, i + maxPerSlide));
      }
      
      for (let ci = 0; ci < chunks.length; ci++) {
        slides.push({
          slideNumber: slideNum++,
          type: "content",
          title: loc(section.title, lang) + (chunks.length > 1 ? ` (${ci + 1}/${chunks.length})` : ""),
          subtitle: ci === 0 && section.description ? loc(section.description, lang) : undefined,
          items: chunks[ci].map(item => ({
            title: loc(item.title, lang),
            description: loc(item.description, lang),
            tags: item.tags,
          })),
        });
      }
    } else {
      slides.push({
        slideNumber: slideNum++,
        type: "section",
        title: loc(section.title, lang),
        subtitle: section.subtitle ? loc(section.subtitle, lang) : undefined,
        body: section.description ? loc(section.description, lang) : undefined,
      });
    }
  }
  
  // Closing slide
  slides.push({
    slideNumber: slideNum++,
    type: "closing",
    title: loc(module.name, lang),
    subtitle: `v${module.metadata.version} | ${module.metadata.lastUpdated}`,
    body: module.metadata.author,
  });
  
  return {
    meta: {
      module: module.id,
      language: lang,
      layout: lm,
      totalSlides: slides.length,
      generated: new Date().toISOString(),
    },
    slides,
  };
}

// ============================================================
// All-in-one export
// ============================================================
export function exportModule(module: OPCModule, lang: Language, format: "json" | "yaml" | "markdown" | "slides", layout: LayoutFormat = "landscape"): string {
  switch (format) {
    case "json":
      return moduleToJSON(module, lang, layout);
    case "yaml":
      return moduleToYAML(module, lang, layout);
    case "markdown":
      return moduleToMarkdown(module, lang, layout);
    case "slides":
      return JSON.stringify(moduleToSlides(module, lang, layout), null, 2);
    default:
      return moduleToJSON(module, lang, layout);
  }
}
