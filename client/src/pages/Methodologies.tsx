import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowRight, BookOpen, Lightbulb, Target, Scale, BarChart3 } from "lucide-react";
import { useState } from "react";
import { Streamdown } from "streamdown";

const iconMap: Record<string, React.ReactNode> = {
  "052-paradigm": <Target className="w-5 h-5" />,
  "lid": <Lightbulb className="w-5 h-5" />,
  "meat": <BookOpen className="w-5 h-5" />,
  "opc-three-laws": <Scale className="w-5 h-5" />,
  "7s-assessment": <BarChart3 className="w-5 h-5" />,
};

const t: Record<string, Record<string, string>> = {
  pageTitle: { en: "OPC Methodologies", zh: "OPC 方法论", fr: "Méthodologies OPC", ja: "OPC メソドロジー" },
  pageSubtitle: { en: "Battle-tested frameworks and principles that power the OPC ecosystem", zh: "驱动 OPC 生态的实战验证框架与原则", fr: "Cadres et principes éprouvés", ja: "OPCエコシステムを支える実戦検証済みフレームワーク" },
  readMore: { en: "Read More", zh: "了解更多", fr: "En savoir plus", ja: "詳細を見る" },
  collapse: { en: "Collapse", zh: "收起", fr: "Réduire", ja: "折りたたむ" },
  loading: { en: "Loading methodologies...", zh: "加载方法论中...", fr: "Chargement...", ja: "読み込み中..." },
  noMethodologies: { en: "No methodologies available yet.", zh: "暂无方法论内容。", fr: "Aucune méthodologie disponible.", ja: "まだメソドロジーはありません。" },
};

function getLocalized(item: any, field: string, lang: string): string {
  const langKey = lang.charAt(0).toUpperCase() + lang.slice(1);
  return item[`${field}${langKey}`] || item[`${field}En`] || item[`${field}Zh`] || "";
}

export default function Methodologies() {
  const { language } = useLanguage();
  const lang = language || "en";
  const { data: methodologies, isLoading } = trpc.methodologies.visible.useQuery();
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 relative">
        <div className="absolute inset-0 pattern-overlay pointer-events-none" />
        <div className="container relative text-center">
          <span className="badge-official mb-8 inline-block">
            <BookOpen className="w-3 h-3 mr-1.5 inline" />
            {t.pageTitle[lang] || t.pageTitle.en}
          </span>
          <h1 className="max-w-3xl mx-auto mb-6 text-foreground">
            {t.pageTitle[lang] || t.pageTitle.en}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.pageSubtitle[lang] || t.pageSubtitle.en}
          </p>
        </div>
      </section>

      {/* Methodologies */}
      <section className="section-padding flex-1">
        <div className="container max-w-4xl">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : !methodologies || methodologies.length === 0 ? (
            <div className="text-center py-20 text-sm text-muted-foreground">
              {t.noMethodologies[lang] || t.noMethodologies.en}
            </div>
          ) : (
            <div className="space-y-4">
              {methodologies.map((m: any) => {
                const isExpanded = expandedSlug === m.slug;
                const name = getLocalized(m, "name", lang);
                const tagline = getLocalized(m, "tagline", lang);
                const description = getLocalized(m, "description", lang);

                return (
                  <div
                    key={m.id}
                    className="border border-border bg-card transition-all duration-300 hover:border-accent/30 hover:shadow-[0_4px_24px_oklch(0.15_0.03_250/0.06)] overflow-hidden"
                  >
                    {/* Card Header */}
                    <div
                      className="p-6 md:p-7 cursor-pointer"
                      onClick={() => setExpandedSlug(isExpanded ? null : m.slug)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                          {iconMap[m.slug] || <BookOpen className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-base font-semibold text-foreground mb-1" style={{ fontFamily: 'var(--font-sans)' }}>
                            {name}
                          </h2>
                          <p className="text-xs text-muted-foreground leading-relaxed">{tagline}</p>
                        </div>
                        <button className="shrink-0 flex items-center gap-1 text-[11px] font-medium text-accent hover:text-accent/80 transition-colors">
                          {isExpanded ? (t.collapse[lang] || t.collapse.en) : (t.readMore[lang] || t.readMore.en)}
                          <ArrowRight className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && description && (
                      <div className="px-6 md:px-7 pb-7 pt-0">
                        <div className="border-t border-border pt-6">
                          <div className="prose prose-sm max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-p:text-xs prose-p:leading-relaxed prose-strong:text-foreground prose-li:text-xs prose-li:text-muted-foreground">
                            <Streamdown>{description}</Streamdown>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
