import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ExternalLink, Calendar, Building2, Globe, FileText, Filter, Loader2,
  AlertTriangle, Shield, TrendingUp, ArrowRight, Users
} from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Reveal, SectionHeading } from "@/components/motion";

type Lang = "en" | "zh" | "fr" | "ja";
const tx = (t: Partial<Record<Lang, string>>, lang: string) =>
  t[lang as Lang] || t.en || "";

export default function Milestones() {
  const { language } = useLanguage();
  const { data: milestones, isLoading } = trpc.milestones.visible.useQuery();

  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filterOptions = useMemo(() => {
    if (!milestones) return { countries: [], years: [], categories: [] };
    const countries = Array.from(new Set(milestones.map(m => m.country).filter(Boolean))) as string[];
    const years = Array.from(new Set(milestones.map(m => m.year).filter(Boolean))).sort((a, b) => (b ?? 0) - (a ?? 0)) as number[];
    const categories = Array.from(new Set(milestones.map(m => m.category).filter(Boolean))) as string[];
    return { countries, years, categories };
  }, [milestones]);

  const filteredMilestones = useMemo(() => {
    if (!milestones) return [];
    return milestones.filter(m => {
      if (selectedCountry !== "all" && m.country !== selectedCountry) return false;
      if (selectedYear !== "all" && m.year !== parseInt(selectedYear)) return false;
      if (selectedCategory !== "all" && m.category !== selectedCategory) return false;
      return true;
    });
  }, [milestones, selectedCountry, selectedYear, selectedCategory]);

  const groupedByYear = useMemo(() => {
    const groups: Record<string, typeof filteredMilestones> = {};
    filteredMilestones.forEach(m => {
      const year = m.year?.toString() || "Unknown";
      if (!groups[year]) groups[year] = [];
      groups[year].push(m);
    });
    return Object.entries(groups).sort((a, b) => {
      if (a[0] === "Unknown") return 1;
      if (b[0] === "Unknown") return -1;
      return parseInt(b[0]) - parseInt(a[0]);
    });
  }, [filteredMilestones]);

  const loc = (en?: string | null, zh?: string | null, fr?: string | null, ja?: string | null) => {
    const texts: Record<Lang, string | null | undefined> = { en, zh, fr, ja };
    return texts[language as Lang] || en || "";
  };

  const getCountryFlag = (country: string | null) => {
    const flags: Record<string, string> = { China: "\u{1F1E8}\u{1F1F3}", USA: "\u{1F1FA}\u{1F1F8}", EU: "\u{1F1EA}\u{1F1FA}", Japan: "\u{1F1EF}\u{1F1F5}", India: "\u{1F1EE}\u{1F1F3}", International: "\u{1F310}" };
    return flags[country || ""] || "\u{1F310}";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[70vh] flex items-center section-deep-blue overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10 text-center py-24 md:py-32">
          <Reveal>
            <span className="badge-official mb-8 inline-block">
              {tx({ zh: "善用AI，终获自由", en: "Master AI, Achieve Freedom" }, language)}
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-white max-w-3xl mx-auto mb-6">
              {tx({ zh: "发展里程碑", en: "Development Milestones" }, language)}
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
              {tx({
                zh: "教练合伙人生态与AI应用导师网络建设的关键里程碑",
                en: "Key milestones in building the coaching partner ecosystem and AI mentor network",
              }, language)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ CRISIS & SOLUTIONS ═══ */}
      <section className="section-padding bg-background">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "为什么需要 OPC", en: "Why OPC Is Needed" }, language)}
            title={tx({ zh: "三重危机，一个解法", en: "Three Crises, One Solution" }, language)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: AlertTriangle,
                crisis: { zh: "就业结构性危机", en: "Employment Crisis" },
                stat: { zh: "2.8亿", en: "280M" },
                statLabel: { zh: "受影响岗位", en: "jobs affected" },
                solution: { zh: "OPC: 从「被雇佣」到「自主」", en: "OPC: from 'employed' to 'autonomous'" },
              },
              {
                icon: Shield,
                crisis: { zh: "教育就业脱节", en: "Education Disconnect" },
                stat: "47%",
                statLabel: { zh: "毕业生岗位不匹配", en: "graduate mismatch" },
                solution: { zh: "OPC UNI: 学即赚", en: "OPC UNI: Learn = Earn" },
              },
              {
                icon: TrendingUp,
                crisis: { zh: "中小企业生存压力", en: "SME Survival Pressure" },
                stat: "60%",
                statLabel: { zh: "五年内失败率", en: "5-year failure rate" },
                solution: { zh: "OPC: 固定成本趋近于零", en: "OPC: near-zero fixed costs" },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-premium h-full">
                  <item.icon className="w-5 h-5 text-red-500/60 mb-4" />
                  <h3 className="text-base font-medium text-foreground mb-3">{tx(item.crisis, language)}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="stat-number text-3xl">
                      {typeof item.stat === "string" ? item.stat : tx(item.stat, language)}
                    </span>
                    <span className="text-sm text-muted-foreground">{tx(item.statLabel, language)}</span>
                  </div>
                  <div className="pt-3 border-t border-border/40 flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-gold shrink-0" />
                    <p className="text-sm text-gold font-medium">{tx(item.solution, language)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VALUE FOR AUDIENCES ═══ */}
      <section className="section-padding bg-[oklch(0.98_0.003_250)]">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "多方价值主张", en: "Value Proposition by Audience" }, language)}
            title={tx({ zh: "每个人都能找到自己的位置", en: "Everyone Finds Their Place" }, language)}
          />

          <Reveal>
            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gold/20">
                    <th className="text-left py-4 pr-6 font-medium text-foreground">{tx({ zh: "受众", en: "Audience" }, language)}</th>
                    <th className="text-left py-4 pr-6 font-medium text-foreground">{tx({ zh: "痛点", en: "Pain Point" }, language)}</th>
                    <th className="text-left py-4 font-medium text-foreground">{tx({ zh: "OPC 解决方案", en: "OPC Solution" }, language)}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { who: { zh: "自由职业者", en: "Freelancers" }, pain: { zh: "收入不稳定、缺乏归属感", en: "Unstable income, lack of belonging" }, sol: { zh: "平台订单 + 社区港湾", en: "Platform orders + community harbor" } },
                    { who: { zh: "传统企业主", en: "SME Owners" }, pain: { zh: "固定成本高、转型难", en: "High fixed costs, hard to transform" }, sol: { zh: "AI赋能降本 + 液态组队", en: "AI-powered cost reduction + liquid teaming" } },
                    { who: { zh: "应届毕业生", en: "Graduates" }, pain: { zh: "岗位不匹配、缺乏实战", en: "Job mismatch, no practical skills" }, sol: { zh: "L1认证 + 实战项目启动", en: "L1 certification + real project launch" } },
                    { who: { zh: "教育机构", en: "Educators" }, pain: { zh: "课程过时、就业率低", en: "Outdated curriculum, low employment" }, sol: { zh: "OPC+X认证体系嵌入", en: "OPC+X certification integration" } },
                    { who: { zh: "政府决策者", en: "Policymakers" }, pain: { zh: "就业压力、创新需求", en: "Employment pressure, innovation needs" }, sol: { zh: "新岗位创造 + 税收基础", en: "New job creation + tax base" } },
                    { who: { zh: "品牌/企业", en: "Brands" }, pain: { zh: "人才获取成本高", en: "High talent acquisition cost" }, sol: { zh: "精准触达超级个体网络", en: "Precision reach to super-individual network" } },
                    { who: { zh: "投资者", en: "Investors" }, pain: { zh: "寻找新赛道", en: "Seeking new tracks" }, sol: { zh: "全球超级个体基础设施", en: "Global super-individual infrastructure" } },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/30 hover:bg-gold/[0.02] transition-colors">
                      <td className="py-4 pr-6 font-medium text-foreground/80">{tx(row.who, language)}</td>
                      <td className="py-4 pr-6 text-muted-foreground">{tx(row.pain, language)}</td>
                      <td className="py-4 text-gold font-medium">{tx(row.sol, language)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ POLICY LANDSCAPE ═══ */}
      <section className="section-padding bg-background">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "全球政策环境", en: "Global Policy Landscape" }, language)}
            title={tx({ zh: "政策东风已至", en: "The Policy Tailwind Is Here" }, language)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                flag: "\u{1F1E8}\u{1F1F3}", region: { zh: "中国", en: "China" },
                policies: [
                  { zh: "促进个体工商户发展条例 (2022)", en: "Individual Business Promotion Regulation (2022)" },
                  { zh: "新就业形态劳动者权益保障", en: "New Employment Form Worker Protection" },
                  { zh: "数字经济促进政策体系", en: "Digital Economy Promotion Framework" },
                ],
              },
              {
                flag: "\u{1F1EA}\u{1F1FA}", region: { zh: "欧盟", en: "EU" },
                policies: [
                  { zh: "平台工作指令 (2024)", en: "Platform Work Directive (2024)" },
                  { zh: "数字市场法案 (DMA)", en: "Digital Markets Act (DMA)" },
                  { zh: "AI 法案监管框架", en: "AI Act Regulatory Framework" },
                ],
              },
              {
                flag: "\u{1F1FA}\u{1F1F8}", region: { zh: "美国", en: "USA" },
                policies: [
                  { zh: "自由职业者保护法案讨论", en: "Freelance Worker Protection Act" },
                  { zh: "SEC 数字资产监管框架", en: "SEC Digital Asset Framework" },
                  { zh: "各州独立承包商法规", en: "State Independent Contractor Laws" },
                ],
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-premium h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{item.flag}</span>
                    <span className="text-base font-medium text-foreground">{tx(item.region, language)}</span>
                  </div>
                  <ul className="space-y-3">
                    {item.policies.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <FileText className="w-3.5 h-3.5 text-gold/50 shrink-0 mt-0.5" />
                        <span className="text-foreground/70">{tx(p, language)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE FILTERS ═══ */}
      <section className="py-5 border-b border-border bg-background/80 backdrop-blur-sm sticky top-[57px] z-40">
        <div className="container">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="h-3.5 w-3.5" />
              <span className="text-xs font-medium uppercase tracking-wider">{tx({ zh: "筛选", en: "Filters" }, language)}</span>
            </div>

            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-[140px] h-9 text-xs border-border">
                <Globe className="h-3 w-3 mr-1.5" />
                <SelectValue placeholder={tx({ zh: "国家/地区", en: "Country" }, language)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{tx({ zh: "全部", en: "All" }, language)}</SelectItem>
                {filterOptions.countries.map(c => (
                  <SelectItem key={c} value={c}>{getCountryFlag(c)} {c}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[110px] h-9 text-xs border-border">
                <Calendar className="h-3 w-3 mr-1.5" />
                <SelectValue placeholder={tx({ zh: "年份", en: "Year" }, language)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{tx({ zh: "全部", en: "All" }, language)}</SelectItem>
                {filterOptions.years.map(y => (
                  <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px] h-9 text-xs border-border">
                <FileText className="h-3 w-3 mr-1.5" />
                <SelectValue placeholder={tx({ zh: "类别", en: "Category" }, language)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{tx({ zh: "全部", en: "All" }, language)}</SelectItem>
                {filterOptions.categories.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <span className="ml-auto text-xs text-muted-foreground/75">
              {filteredMilestones.length} {tx({ zh: "条结果", en: "results" }, language)}
            </span>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="section-padding flex-1">
        <div className="container max-w-4xl">
          {filteredMilestones.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sm text-muted-foreground">
                {tx({ zh: "没有找到符合筛选条件的里程碑。", en: "No milestones found matching your filters." }, language)}
              </p>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-border to-transparent" />
              {groupedByYear.map(([year, items], yi) => (
                <Reveal key={year} delay={yi * 0.05}>
                  <div className="mb-12">
                    <div className="relative flex items-center mb-8 pl-12 md:pl-20">
                      <div className="absolute left-2.5 md:left-6.5 w-3 h-3 rounded-full bg-gold border-2 border-background" />
                      <span className="text-2xl font-medium text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{year}</span>
                    </div>
                    <div className="space-y-4">
                      {items.map((milestone) => (
                        <div key={milestone.id} className="relative pl-12 md:pl-20">
                          <div className="absolute left-3.5 md:left-7.5 w-1.5 h-1.5 rounded-full bg-border mt-4" />
                          <div className="card-premium">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className="text-xs font-medium tracking-wider uppercase px-2 py-0.5 bg-gold/10 text-gold rounded">
                                {milestone.category}
                              </span>
                              {milestone.country && (
                                <span className="text-xs text-muted-foreground/75">
                                  {getCountryFlag(milestone.country)} {milestone.country}
                                </span>
                              )}
                              {milestone.sourceType && (
                                <span className="text-xs text-muted-foreground/75 flex items-center gap-1">
                                  <Building2 className="w-3 h-3" />
                                  {milestone.sourceType}
                                </span>
                              )}
                            </div>
                            <h3 className="text-base font-medium text-foreground mb-2">
                              {loc(milestone.sourceNameEn, milestone.sourceNameZh, milestone.sourceNameFr, milestone.sourceNameJa)}
                            </h3>
                            {milestone.publishDate && (
                              <p className="text-xs text-muted-foreground/70 mb-3 flex items-center gap-1.5">
                                <Calendar className="w-3 h-3" />
                                {milestone.publishDate}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                              {loc(milestone.descriptionEn, milestone.descriptionZh, milestone.descriptionFr, milestone.descriptionJa)}
                            </p>
                            {milestone.url && (
                              <a href={milestone.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 transition-colors">
                                {tx({ zh: "查看来源", en: "View Source" }, language)}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section-padding section-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10 text-center max-w-2xl">
          <Reveal>
            <h2 className="text-white mb-4">
              {tx({ zh: "成为教练合伙人", en: "Become a Coaching Partner" }, language)}
            </h2>
            <p className="text-white/65 text-sm mb-10">
              {tx({ zh: "善用AI，终获自由。", en: "Master AI, Achieve Freedom." }, language)}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:hi@opcglobal.ai">
                <button className="btn-gold">
                  <span className="flex items-center gap-2">
                    {tx({ zh: "立即申请", en: "Apply Now" }, language)}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </a>
              <Link href="/alliance">
                <button className="btn-outline-gold">
                  <span>{tx({ zh: "查看联盟", en: "View Alliance" }, language)}</span>
                </button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
