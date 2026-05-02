import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { useState, useCallback } from "react";
import { Download, FileJson, FileText, FileCode, Presentation, Globe, ChevronDown, Check, Monitor, FileImage, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

type ExportFormat = "json" | "yaml" | "markdown" | "slides";
type ExportLanguage = "zh" | "en";
type LayoutFormat = "landscape" | "portrait";

const formatConfig: Record<ExportFormat, { icon: React.ReactNode; label: string; ext: string; color: string }> = {
  json: { icon: <FileJson className="w-4 h-4" />, label: "JSON", ext: ".json", color: "text-amber-600" },
  yaml: { icon: <FileCode className="w-4 h-4" />, label: "YAML", ext: ".yaml", color: "text-blue-600" },
  markdown: { icon: <FileText className="w-4 h-4" />, label: "Markdown", ext: ".md", color: "text-green-600" },
  slides: { icon: <Presentation className="w-4 h-4" />, label: "PPT Slides", ext: ".json", color: "text-purple-600" },
};

const exportLangLabels: Record<ExportLanguage, { label: string; flag: string }> = {
  zh: { label: "中文", flag: "🇨🇳" },
  en: { label: "English", flag: "🇬🇧" },
};

const layoutConfig: Record<LayoutFormat, { label: Record<string, string>; icon: React.ReactNode; ratio: string; desc: Record<string, string> }> = {
  landscape: {
    label: { zh: "横版 (16:9)", en: "Landscape (16:9)" },
    icon: <Monitor className="w-4 h-4" />,
    ratio: "16:9",
    desc: { zh: "适用于演示文稿、屏幕投影", en: "For presentations, screen projection" },
  },
  portrait: {
    label: { zh: "竖版 (A4)", en: "Portrait (A4)" },
    icon: <FileImage className="w-4 h-4" />,
    ratio: "A4",
    desc: { zh: "适用于打印文档、PDF报告", en: "For printed documents, PDF reports" },
  },
};

const t: Record<string, Record<string, string>> = {
  title: { en: "Export Center", zh: "导出中心" },
  subtitle: {
    en: "Export structured module data in multiple formats for documents, presentations, and integrations",
    zh: "以多种格式导出结构化模块数据，用于文档、演示和集成",
  },
  selectModule: { en: "Select Module", zh: "选择模块" },
  selectFormat: { en: "Export Format", zh: "导出格式" },
  selectLanguage: { en: "Content Language", zh: "内容语言" },
  selectLayout: { en: "Layout Format", zh: "版式" },
  preview: { en: "Preview", zh: "预览" },
  download: { en: "Download", zh: "下载" },
  exportAll: { en: "Export All", zh: "全部导出" },
  consistency: {
    en: "All exports use the same structured data source, ensuring consistency across website, documents, and presentations.",
    zh: "所有导出使用相同的结构化数据源，确保网站、文档和演示之间的一致性。",
  },
  backToAdmin: { en: "Back to Admin", zh: "返回后台" },
};

function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1000);
}

export default function ExportCenter() {
  const { language } = useLanguage();
  const lang = (language === "zh" || language === "en") ? language : "zh";
  const [selectedSlug, setSelectedSlug] = useState<string>("universe");
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("json");
  const [exportLang, setExportLang] = useState<ExportLanguage>("zh");
  const [layoutFormat, setLayoutFormat] = useState<LayoutFormat>("landscape");

  const { data: modules } = trpc.dataExport.modules.useQuery();
  const { data: exportData } = trpc.dataExport.module.useQuery(
    { slug: selectedSlug, format: selectedFormat, lang: exportLang, layout: layoutFormat },
    { enabled: !!selectedSlug }
  );

  const getFilename = useCallback(() => {
    if (!exportData?.filename) return "";
    // Inject layout suffix into filename
    const base = exportData.filename;
    const dotIdx = base.lastIndexOf(".");
    if (dotIdx === -1) return `${base}-${layoutFormat}`;
    return `${base.slice(0, dotIdx)}-${layoutFormat}${base.slice(dotIdx)}`;
  }, [exportData, layoutFormat]);

  const handleDownload = useCallback(() => {
    if (!exportData?.content) return;
    const filename = getFilename();
    downloadBlob(exportData.content, filename, exportData.mimeType || "text/plain");
  }, [exportData, getFilename]);

  const handleDownloadAll = useCallback(async () => {
    if (!modules) return;
    for (const mod of modules) {
      const slug = mod.slug;
      const response = await fetch(`/api/trpc/dataExport.module?input=${encodeURIComponent(JSON.stringify({ slug, format: selectedFormat, lang: exportLang, layout: layoutFormat }))}`);
      const result = await response.json();
      const data = result?.result?.data;
      if (data?.content && data?.filename) {
        const dotIdx = data.filename.lastIndexOf(".");
        const fn = dotIdx === -1
          ? `${data.filename}-${layoutFormat}`
          : `${data.filename.slice(0, dotIdx)}-${layoutFormat}${data.filename.slice(dotIdx)}`;
        downloadBlob(data.content, fn, data.mimeType || "text/plain");
        await new Promise(r => setTimeout(r, 300));
      }
    }
  }, [modules, selectedFormat, exportLang, layoutFormat]);

  const selectedModule = modules?.find(m => m.slug === selectedSlug);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-8 md:pt-36 md:pb-12 relative">
        <div className="absolute inset-0 pattern-overlay pointer-events-none" />
        <div className="container relative text-center">
          <span className="badge-official mb-6 inline-block">
            <Download className="w-3 h-3 mr-1.5 inline" />
            {t.title[lang]}
          </span>
          <h1 className="max-w-3xl mx-auto mb-4 text-foreground">
            {t.title[lang]}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
            {t.subtitle[lang]}
          </p>
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-3.5 h-3.5" />
              {t.backToAdmin[lang]}
            </Button>
          </Link>
        </div>
      </section>

      {/* Consistency Note */}
      <section className="pb-6">
        <div className="container max-w-5xl">
          <div className="bg-accent/5 border border-accent/20 p-4 text-center">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t.consistency[lang]}
            </p>
          </div>
        </div>
      </section>

      {/* Export Controls */}
      <section className="section-padding-sm flex-1">
        <div className="container max-w-5xl">
          {/* Row 1: Module + Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Module Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                {t.selectModule[lang]}
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between h-11 bg-white text-left">
                    <span className="truncate text-sm">
                      {selectedModule ? (selectedModule.name as any)[exportLang] || (selectedModule.name as any).en : "Select..."}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-50 shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-white">
                  {modules?.map(m => (
                    <DropdownMenuItem
                      key={m.slug}
                      onClick={() => setSelectedSlug(m.slug)}
                      className="text-sm"
                    >
                      {selectedSlug === m.slug && <Check className="w-3.5 h-3.5 mr-2 text-accent" />}
                      <span className={selectedSlug === m.slug ? "font-medium" : ""}>
                        {(m.name as any)[exportLang] || (m.name as any).en}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Language Selector - zh / en only */}
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                {t.selectLanguage[lang]}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["zh", "en"] as ExportLanguage[]).map(l => (
                  <button
                    key={l}
                    onClick={() => setExportLang(l)}
                    className={cn(
                      "h-11 flex items-center justify-center gap-2 border text-sm font-medium transition-all duration-200",
                      exportLang === l
                        ? "border-accent bg-accent/5 text-accent shadow-sm"
                        : "border-border bg-white text-foreground/70 hover:border-accent/30"
                    )}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    {exportLangLabels[l].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Format + Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Format Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                {t.selectFormat[lang]}
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between h-11 bg-white text-left">
                    <span className="flex items-center gap-2 text-sm">
                      {formatConfig[selectedFormat].icon}
                      {formatConfig[selectedFormat].label}
                      <span className="text-xs text-muted-foreground">{formatConfig[selectedFormat].ext}</span>
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-50 shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white">
                  {(Object.keys(formatConfig) as ExportFormat[]).map(fmt => (
                    <DropdownMenuItem
                      key={fmt}
                      onClick={() => setSelectedFormat(fmt)}
                      className="text-sm"
                    >
                      <span className={cn("flex items-center gap-2", formatConfig[fmt].color)}>
                        {formatConfig[fmt].icon}
                        {formatConfig[fmt].label}
                        <span className="text-xs opacity-60">{formatConfig[fmt].ext}</span>
                      </span>
                      {selectedFormat === fmt && <Check className="w-3.5 h-3.5 ml-auto text-accent" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Layout Format Selector - 16:9 / A4 */}
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                {t.selectLayout[lang]}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["landscape", "portrait"] as LayoutFormat[]).map(lf => (
                  <button
                    key={lf}
                    onClick={() => setLayoutFormat(lf)}
                    className={cn(
                      "h-11 flex items-center justify-center gap-2 border text-sm font-medium transition-all duration-200",
                      layoutFormat === lf
                        ? "border-accent bg-accent/5 text-accent shadow-sm"
                        : "border-border bg-white text-foreground/70 hover:border-accent/30"
                    )}
                  >
                    {layoutConfig[lf].icon}
                    <span>{layoutConfig[lf].label[lang]}</span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
                {layoutConfig[layoutFormat].desc[lang]}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button
              onClick={handleDownload}
              disabled={!exportData?.content}
              className="flex-1 h-12 bg-foreground text-background hover:bg-foreground/90 gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              {t.download[lang]}
              {exportData?.filename && (
                <span className="text-xs opacity-60 ml-1">({getFilename()})</span>
              )}
            </Button>
            <Button
              onClick={handleDownloadAll}
              variant="outline"
              className="h-12 gap-2 border-accent/30 text-accent hover:bg-accent/5 px-6"
            >
              <Download className="w-4 h-4" />
              {t.exportAll[lang]}
            </Button>
          </div>

          {/* Preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                {t.preview[lang]}
              </label>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="px-2 py-0.5 bg-muted/50 border border-border">{exportLangLabels[exportLang].label}</span>
                <span className="px-2 py-0.5 bg-muted/50 border border-border">{layoutConfig[layoutFormat].ratio}</span>
              </div>
            </div>
            <div className="border border-border bg-white overflow-hidden">
              <div className="bg-muted/30 px-4 py-2 border-b border-border flex items-center justify-between">
                <span className={cn("flex items-center gap-1.5 text-xs font-medium", formatConfig[selectedFormat].color)}>
                  {formatConfig[selectedFormat].icon}
                  {getFilename() || `${selectedSlug}.${formatConfig[selectedFormat].ext}`}
                </span>
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span>{layoutConfig[layoutFormat].ratio}</span>
                  <span className="text-border">|</span>
                  <span>{exportLangLabels[exportLang].label}</span>
                </div>
              </div>
              <pre className="p-4 md:p-6 text-xs leading-relaxed overflow-auto max-h-[500px] text-foreground/80 font-mono whitespace-pre-wrap break-words">
                {exportData?.content || "Loading..."}
              </pre>
            </div>
          </div>

          {/* Quick Format Cards */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            {(Object.entries(formatConfig) as [ExportFormat, typeof formatConfig[ExportFormat]][]).map(([fmt, cfg]) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={cn(
                  "p-4 border text-left transition-all duration-200",
                  selectedFormat === fmt
                    ? "border-accent/40 bg-accent/5 shadow-sm"
                    : "border-border bg-white hover:border-accent/20"
                )}
              >
                <div className={cn("mb-2", cfg.color)}>{cfg.icon}</div>
                <div className="text-xs font-semibold text-foreground">{cfg.label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{cfg.ext}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
