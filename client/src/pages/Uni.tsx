import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import UniPageFooter from "@/components/UniPageFooter";
import {
  ArrowRight,
  Check,
  Brain,
  Wrench,
  Network,
  Award,
  GraduationCap,
  Building2,
  Calendar,
  FileCheck,
  Shield,
  BookOpen,
  Handshake,
  Briefcase,
  Rocket,
  Sparkles,
} from "lucide-react";
import { Reveal, SectionHeading, ScrollIndicator } from "@/components/motion";

type Lang = "en" | "zh" | "fr" | "ja";
const tx = (m: Partial<Record<Lang, string>>, lang: string) => m[lang as Lang] || m.en || "";

function CourseTable({
  rows,
  language,
}: {
  rows: { phase: Partial<Record<Lang, string>>; name: Partial<Record<Lang, string>>; cn: string; ects: string; us: string }[];
  language: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/50 shadow-[0_12px_40px_oklch(0.15_0.03_250/0.04)]">
      <table className="w-full text-sm">
        <thead className="bg-gradient-to-r from-muted/80 to-muted/40">
          <tr className="text-left border-b border-border/50">
            <th className="p-3 font-semibold text-foreground">{tx({ zh: "阶段", en: "Phase" }, language)}</th>
            <th className="p-3 font-semibold text-foreground">{tx({ zh: "课程名称", en: "Course" }, language)}</th>
            <th className="p-3 font-semibold text-foreground whitespace-nowrap">{tx({ zh: "中国学分", en: "CN Cr." }, language)}</th>
            <th className="p-3 font-semibold text-foreground whitespace-nowrap">ECTS</th>
            <th className="p-3 font-semibold text-foreground whitespace-nowrap">{tx({ zh: "美英学分", en: "US/UK Cr." }, language)}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/30 last:border-0">
              <td className="p-3 text-muted-foreground whitespace-nowrap">{tx(r.phase, language)}</td>
              <td className="p-3 text-foreground">{tx(r.name, language)}</td>
              <td className="p-3 text-muted-foreground">{r.cn}</td>
              <td className="p-3 text-muted-foreground">{r.ects}</td>
              <td className="p-3 text-muted-foreground">{r.us}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Uni() {
  const { language } = useLanguage();

  const phaseBasic = { zh: "基础阶段", en: "Foundation" };
  const phaseAdv = { zh: "进阶阶段", en: "Advanced" };
  const phasePrac = { zh: "实战阶段", en: "Capstone & Practice" };

  const quickNav = [
    { href: "#pyramid", zh: "人才金字塔", en: "Talent Pyramid" },
    { href: "#three-pillars", zh: "三大支柱", en: "Pillars" },
    { href: "#four-tracks", zh: "培养体系", en: "Programs" },
    { href: "#unicorn", zh: "独角兽", en: "Ventures" },
    { href: "#cooperation", zh: "合作流程", en: "Process" },
  ] as const;

  return (
    <div className="uni-page min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* ═══ HERO ═══ */}
      <section className="uni-page-hero-shell section-deep-blue relative">
        <div className="container relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <Reveal>
              <span className="badge-official mb-6 lg:mb-8 inline-block border-white/20 text-gold">
                OPC UNI · {tx({ zh: "高校与创投", en: "Higher Ed & Ventures" }, language)}
              </span>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="text-white text-balance max-w-[22ch] mx-auto lg:mx-0 mb-6">
                {tx({
                  zh: "面向高校的 AI 人才培养与独角兽孵化",
                  en: "AI Talent Programs for Universities — and Paths to Unicorn Caliber Ventures",
                }, language)}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-4 leading-snug font-medium tracking-tight">
                {tx({
                  zh: "学术共创 · 专业共建 · OPC 就业创业辅导",
                  en: "Academic Co-Creation · Joint Programs · OPC Career & Entrepreneurship Support",
                }, language)}
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                {tx({
                  zh: "一套页面讲清两件事：高校侧可嵌入学分的人才培养方案，以及师生创业项目进入 OPC 生态与独角兽加速的全链路。全球学分对照 · 理实一体实训 · 订单与资本协同。",
                  en: "One narrative, two outcomes: credit-bearing AI talent tracks you can embed on campus, and venture pathways into OPC\u2019s order network, incubation, and investor fabric—credits, labs, and capital aligned.",
                }, language)}
              </p>
            </Reveal>
            <Reveal delay={0.36}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="mailto:hi@opcglobal.ai">
                  <button type="button" className="btn-gold w-full sm:w-auto justify-center">
                    <span className="flex items-center justify-center gap-2">
                      {tx({ zh: "预约院校方案会谈", en: "Book an Institutional Session" }, language)}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                </a>
                <a href="#unicorn">
                  <button type="button" className="btn-outline-gold w-full sm:w-auto justify-center border-white/35 text-white hover:bg-white/10">
                    {tx({ zh: "独角兽孵化路径", en: "Venture & Incubation" }, language)}
                  </button>
                </a>
              </div>
            </Reveal>
          </div>

          <div id="offerings" className="lg:col-span-5 flex flex-col gap-4 scroll-mt-36">
            <Reveal delay={0.18}>
              <div className="uni-glass-tile text-left">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold/90 mb-1">
                      {tx({ zh: "高校解决方案", en: "For Universities" }, language)}
                    </p>
                    <h3 className="text-white text-lg font-medium mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      {tx({ zh: "AI 学分型培养与入校交付", en: "Credit-Based AI Tracks & Campus Delivery" }, language)}
                    </h3>
                    <p className="text-white/55 text-sm leading-relaxed">
                      {tx({
                        zh: "四类研发 / 工程 / 应用 / 治理方向；微专业、课替与联合培养；双师、实训验收与全球学分矩阵。",
                        en: "Four tracks—R&D, engineering, applications, governance—with micro-majors, swaps, joint degrees, co-teaching, and credit mapping.",
                      }, language)}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="uni-glass-tile text-left">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <Rocket className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold/90 mb-1">
                      {tx({ zh: "独角兽与创投", en: "Ventures" }, language)}
                    </p>
                    <h3 className="text-white text-lg font-medium mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      {tx({ zh: "从实验室到订单与资本", en: "From Lab to Orders & Capital" }, language)}
                    </h3>
                    <p className="text-white/55 text-sm leading-relaxed">
                      {tx({
                        zh: "战略定位、液态团队、全球订单与早期投资协同；师生创业项目进入 OPC 独角兽孵化管线。",
                        en: "Positioning, liquid teams, global demand, and investor syndication—campus spinouts plug into OPC\u2019s unicorn acceleration stack.",
                      }, language)}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.34}>
              <a
                href="#three-pillars"
                className="flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/45 hover:text-gold/90 transition-colors py-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {tx({ zh: "了解合作支柱", en: "Explore the pillars" }, language)}
              </a>
            </Reveal>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <nav className="uni-subnav" aria-label={tx({ zh: "本页章节", en: "On this page" }, language)}>
        <div className="container flex flex-wrap gap-2 py-3.5 justify-center md:justify-start">
          {quickNav.map((item) => (
            <a key={item.href} href={item.href}>
              {tx({ zh: item.zh, en: item.en }, language)}
            </a>
          ))}
        </div>
      </nav>

      {/* ═══ THREE PILLARS FOR UNIVERSITIES ═══ */}
      <section id="three-pillars" className="section-padding bg-background scroll-mt-32">
        <div className="container">
          <SectionHeading
            label={tx({ zh: "高校合作", en: "University Partnership" }, language)}
            title={tx({ zh: "面向高校的三大合作支柱", en: "Three Pillars for Higher Education" }, language)}
            subtitle={tx({
              zh: "学术侧共创、培养方案共建、就业与创业侧辅导一体设计，避免「只卖课」或「只讲概念」。",
              en: "Co-created scholarship, joint program design, and career/venture support—integrated, not course-only or slides-only.",
            }, language)}
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: BookOpen,
                title: { zh: "学术共创", en: "Academic Co-Creation" },
                desc: {
                  zh: "联合工作坊、课题与课程大纲共建评审；智库方法论文稿与产业案例入校；双师教研与高质量讲义/PPT/数据集协同迭代。",
                  en: "Joint workshops, research themes, and syllabus co-review; methodology briefs and industry cases on campus; co-developed teaching assets and datasets.",
                },
              },
              {
                icon: Handshake,
                title: { zh: "专业共建", en: "Joint Program Building" },
                desc: {
                  zh: "微专业、核心课替换或联合培养；四类 AI 学分路径与中英欧学分对照；理实一体实训与验收量规，与贵校教务规则对齐落地。",
                  en: "Micro-majors, course swaps, or joint programs; four AI tracks with credit mapping; practicum rubrics aligned to your registrar.",
                },
              },
              {
                icon: Briefcase,
                title: { zh: "OPC 就业创业辅导", en: "OPC Career & Entrepreneurship Coaching" },
                desc: {
                  zh: "对接 OPC 订单与项目实训、实习与雇主图谱；简历/作品集与模拟面试辅导；师生创业项目进入独角兽孵化与投融资协同通道。",
                  en: "OPC order network and practicum projects; internships and employer maps; portfolio coaching; campus ventures into incubation and investor pathways.",
                },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="uni-pillar-card h-full text-center">
                  <div className="uni-icon-ring">
                    <item.icon className="w-8 h-8 text-gold" strokeWidth={1.35} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    {tx(item.title, language)}
                  </h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed">{tx(item.desc, language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="section-padding-sm uni-stat-board">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 md:gap-12 max-w-5xl mx-auto items-start">
            {[
              { n: "50+", l: { zh: "合作高校", en: "Partner Universities" } },
              { n: "20+", l: { zh: "国家/地区", en: "Countries" } },
              { n: "10K+", l: { zh: "培养学员", en: "Learners" } },
              { n: "4", l: { zh: "AI 培养方向", en: "AI Tracks" } },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="text-center md:text-left relative">
                  {i > 0 ? (
                    <span
                      className="hidden md:block absolute -left-6 top-3 h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"
                      aria-hidden
                    />
                  ) : null}
                  <div className="uni-stat-num mb-2">{s.n}</div>
                  <p className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">{tx(s.l, language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TALENT PYRAMID ═══ */}
      <section id="pyramid" className="section-padding-sm uni-pyramid-bg border-b border-border/20 scroll-mt-32">
        <div className="container max-w-6xl">
          <SectionHeading
            label={tx({ zh: "人才金字塔", en: "Global AI Talent Pyramid" }, language)}
            title={tx({ zh: "四层人才结构与全球供需缺口", en: "Four-Tier Talent Structure & Global Supply-Demand Gap" }, language)}
            subtitle={tx({
              zh: "依据《UNI AI 人才培养方案》§2 — 全球 AI 核心人才缺口达 140 万，较 2023 年增长 67%；大模型架构师供需比高达 1:9。",
              en: "From UNI Blueprint §2 — global AI talent gap reaches 1.4 M, up 67% vs 2023; LLM architects face a 1:9 supply-demand ratio.",
            }, language)}
          />
          {/* Layer breakdown cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                pct: "5%",
                layer: { zh: "顶层人才", en: "Top Tier" },
                type: { zh: "大模型核心研发类", en: "Large Model Core R&D" },
                demand: "12%",
                gap: { zh: "28 万人", en: "280 K jobs" },
                ratio: "1 : 9",
                color: "from-gold/30 to-gold/5",
              },
              {
                pct: "15%",
                layer: { zh: "上层人才", en: "Upper Tier" },
                type: { zh: "AI 工程落地类", en: "AI Engineering & Deployment" },
                demand: "40%",
                gap: { zh: "56 万人", en: "560 K jobs" },
                ratio: "1 : 7",
                color: "from-blue-400/25 to-blue-400/5",
              },
              {
                pct: "40%",
                layer: { zh: "中层人才", en: "Mid Tier" },
                type: { zh: "AI 行业应用类", en: "AI Industry Applications" },
                demand: "33%",
                gap: { zh: "42 万人", en: "420 K jobs" },
                ratio: "1 : 5",
                color: "from-emerald-400/25 to-emerald-400/5",
              },
              {
                pct: "40%",
                layer: { zh: "基础层人才", en: "Foundation Tier" },
                type: { zh: "AI 支撑与治理类", en: "AI Governance & Enablement" },
                demand: "15%",
                gap: { zh: "14 万人", en: "140 K jobs" },
                ratio: "1 : 3",
                color: "from-slate-400/20 to-slate-400/5",
              },
            ].map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`relative rounded-xl p-4 h-full bg-gradient-to-br ${tier.color} border border-border/60 overflow-hidden`}>
                  <div className="absolute top-3 right-3 text-5xl font-light text-foreground/6 select-none" style={{ fontFamily: "var(--font-heading)" }}>{tier.pct}</div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">{tier.layer.en}</p>
                    <h3 className="text-base font-semibold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>{tx(tier.type, language)}</h3>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-muted-foreground">{tx({ zh: "全球需求占比", en: "Global demand share" }, language)}</span>
                        <span className="text-sm font-semibold text-foreground">{tier.demand}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-muted-foreground">{tx({ zh: "人才缺口", en: "Talent gap" }, language)}</span>
                        <span className="text-sm font-semibold text-foreground">{tier.gap.zh}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-muted-foreground">{tx({ zh: "供需比", en: "Supply-demand" }, language)}</span>
                        <span className="text-sm font-bold text-gold">{tier.ratio}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          {/* Global credit system reference table */}
          <div className="rounded-xl border border-border/60 bg-background overflow-hidden shadow-[0_8px_32px_oklch(0.15_0.03_250/0.04)]">
            <div className="bg-muted/40 px-5 py-3 border-b border-border/50">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted-foreground">
                {tx({ zh: "学分换算参考 · 全球三大教育体系", en: "Credit Conversion Reference · Three Global Systems" }, language)}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-muted/60 to-muted/30">
                  <tr className="text-left border-b border-border/50">
                    <th className="p-3.5 font-semibold text-foreground">{tx({ zh: "课程模块", en: "Module Type" }, language)}</th>
                    <th className="p-3.5 font-semibold text-foreground whitespace-nowrap">{tx({ zh: "中国学分", en: "CN Credits" }, language)}</th>
                    <th className="p-3.5 font-semibold text-foreground whitespace-nowrap">ECTS</th>
                    <th className="p-3.5 font-semibold text-foreground whitespace-nowrap">{tx({ zh: "美英学分", en: "US/UK Credits" }, language)}</th>
                    <th className="p-3.5 font-semibold text-foreground whitespace-nowrap">{tx({ zh: "学习时数", en: "Study Hours" }, language)}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { m: { zh: "基础阶段课程（每门）", en: "Foundation courses (each)" }, cn: "2", ects: "3", us: "1", h: "75–90" },
                    { m: { zh: "进阶阶段课程（每门）", en: "Advanced courses (each)" }, cn: "3", ects: "4.5", us: "1.5", h: "112–135" },
                    { m: { zh: "实战阶段课程（每门）", en: "Capstone courses (each)" }, cn: "4", ects: "6", us: "2", h: "150–180" },
                    { m: { zh: "实训项目", en: "Practicum project" }, cn: "6", ects: "9", us: "3", h: "225–270" },
                    { m: { zh: "毕业总学分（参考值）", en: "Reference graduation total" }, cn: "48", ects: "72", us: "24", h: "1800–2160" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-0">
                      <td className={`p-3.5 font-medium ${i === 4 ? "text-foreground" : "text-muted-foreground"}`}>{tx(row.m, language)}</td>
                      <td className={`p-3.5 ${i === 4 ? "text-foreground font-semibold" : "text-muted-foreground"}`}>{row.cn}</td>
                      <td className={`p-3.5 ${i === 4 ? "text-foreground font-semibold" : "text-muted-foreground"}`}>{row.ects}</td>
                      <td className={`p-3.5 ${i === 4 ? "text-foreground font-semibold" : "text-muted-foreground"}`}>{row.us}</td>
                      <td className={`p-3.5 ${i === 4 ? "text-foreground font-semibold" : "text-muted-foreground"}`}>{row.h}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-muted/20 border-t border-border/40">
              <p className="text-xs text-muted-foreground">
                {tx({
                  zh: "换算系数：1 中国学分 ≈ 1.5 ECTS ≈ 0.5 美英学分 · 核心技能保质期 11 个月 · 课程每季度迭代",
                  en: "Conversion: 1 CN ≈ 1.5 ECTS ≈ 0.5 US · Core skill shelf-life: 11 months · Curriculum refreshes quarterly",
                }, language)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOUR TRACKS OVERVIEW ═══ */}
      <section id="four-tracks" className="section-padding bg-background scroll-mt-32">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "培养体系总览", en: "Program Overview" }, language)}
            title={tx({ zh: "四类 AI 人才培养方向", en: "Four AI Talent Development Tracks" }, language)}
            subtitle={tx({
              zh: "「技术深度 + 行业属性 + 支撑价值」四维金字塔；院校可按微专业、课程替换或联合培养嵌入。",
              en: "Four-dimensional pyramid: technical depth, industry fit, and enabling value—embeddable as micro-majors, course swaps, or joint programs.",
            }, language)}
          />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                id: "track-rnd",
                icon: Brain,
                title: { zh: "大模型核心研发类", en: "Large Model Core R&D" },
                credits: { zh: "总学分 40 · CN / 60 ECTS / 20 US", en: "40 CN credits · 60 ECTS · 20 US credits" },
                core: {
                  zh: "模型架构创新、算法突破；千亿参数训练优化、多模态融合。",
                  en: "Architecture & algorithms; billion-parameter training; multimodal fusion.",
                },
              },
              {
                id: "track-eng",
                icon: Wrench,
                title: { zh: "AI 工程落地类", en: "AI Engineering & Deployment" },
                credits: { zh: "总学分 37 · CN / 55.5 ECTS / 18.5 US", en: "37 CN · 55.5 ECTS · 18.5 US" },
                core: {
                  zh: "模型到生产的全链路：MLOps、RAG、推理与高并发、Agent 与边缘部署。",
                  en: "Model-to-production: MLOps, RAG, inference at scale, agents, edge AI.",
                },
              },
              {
                id: "track-app",
                icon: Network,
                title: { zh: "AI 行业应用类", en: "AI Industry Applications" },
                credits: { zh: "总学分 34 · CN / 51 ECTS / 17 US", en: "34 CN · 51 ECTS · 17 US" },
                core: {
                  zh: "「AI + 行业」复合能力：金融科技、医疗、制造、创意内容与 ROI。",
                  en: "AI + verticals: fintech, healthcare, manufacturing, creative, ROI.",
                },
              },
              {
                id: "track-gov",
                icon: Shield,
                title: { zh: "AI 支撑与治理类", en: "AI Governance & Enablement" },
                credits: { zh: "总学分 34 · CN / 51 ECTS / 17 US", en: "34 CN · 51 ECTS · 17 US" },
                core: {
                  zh: "合规、伦理、审计与安全：欧盟 AI 法案、公平性、红队与合规体系。",
                  en: "Compliance, ethics, audit & safety: EU AI Act, fairness, red teaming.",
                },
              },
            ].map((t, i) => (
              <Reveal key={t.id} delay={i * 0.08}>
                <a href={`#${t.id}`} className="group block h-full">
                  <div className="uni-track-card h-full pl-5 border-l-[3px] border-l-gold/35 group-hover:border-l-gold/70">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 border border-gold/20 flex items-center justify-center shrink-0 shadow-sm">
                        <t.icon className="w-6 h-6 text-gold" strokeWidth={1.35} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold text-gold/70 tracking-widest uppercase mb-1">
                          {tx({ zh: "培养方向", en: "Track" }, language)} · {String(i + 1).padStart(2, "0")}
                        </p>
                        <h3 className="text-lg font-semibold text-foreground mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                          {tx(t.title, language)}
                        </h3>
                        <p className="text-xs text-gold/85 font-medium mb-2">{tx(t.credits, language)}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{tx(t.core, language)}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gold/40 group-hover:text-gold shrink-0 mt-2 transition-colors" />
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRACK 1: R&D ═══ */}
      <section id="track-rnd" className="section-padding section-deep-blue relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10 max-w-5xl">
          <SectionHeading
            label={tx({ zh: "方向一", en: "Track 1" }, language)}
            title={tx({ zh: "大模型核心研发类人才培养", en: "Large Model Core R&D Talent" }, language)}
            subtitle={tx({
              zh: "培养具备大模型架构设计与算法创新能力的人才；可独立完成千亿参数级训练优化与多模态技术突破。",
              en: "Train architects and researchers for billion-scale training and multimodal breakthroughs.",
            }, language)}
            dark
          />
          <Reveal>
            <div className="glass-card-dark p-6 mb-8">
              <h4 className="text-white font-semibold mb-3">{tx({ zh: "培养目标与适配人群", en: "Objectives & Audience" }, language)}</h4>
              <ul className="text-sm text-white/70 space-y-2 list-disc list-inside">
                <li>{tx({ zh: "学历：硕士及以上，博士优先；计算机、应用数学、统计、物理等相关专业。", en: "Education: Master's+ (PhD preferred); CS, applied math, statistics, physics." }, language)}</li>
                <li>{tx({ zh: "前置：精通 Python/C++，PyTorch/TensorFlow；顶会论文发表经验优先。", en: "Prereqs: Python/C++, PyTorch/TensorFlow; top-tier publications preferred." }, language)}</li>
                <li>{tx({ zh: "对象：高校博士生、资深算法工程师、研究院科学家。", en: "Audience: doctoral researchers, senior ML engineers, lab scientists." }, language)}</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h4 className="text-white font-semibold mb-4">{tx({ zh: "核心课程体系", en: "Core Curriculum" }, language)}</h4>
            <CourseTable
              language={language}
              rows={[
                { phase: phaseBasic, name: { zh: "深度学习理论进阶", en: "Advanced Deep Learning Theory" }, cn: "3", ects: "4.5", us: "1.5" },
                { phase: phaseBasic, name: { zh: "Transformer 架构深度解析", en: "Transformer Architecture in Depth" }, cn: "3", ects: "4.5", us: "1.5" },
                { phase: phaseBasic, name: { zh: "概率统计与信息论", en: "Probability, Statistics & Information Theory" }, cn: "2", ects: "3", us: "1" },
                { phase: phaseAdv, name: { zh: "大模型预训练技术", en: "Large Model Pre-training" }, cn: "4", ects: "6", us: "2" },
                { phase: phaseAdv, name: { zh: "高效微调与对齐技术", en: "Efficient Fine-tuning & Alignment" }, cn: "4", ects: "6", us: "2" },
                { phase: phaseAdv, name: { zh: "多模态大模型技术", en: "Multimodal Large Models" }, cn: "4", ects: "6", us: "2" },
                { phase: phaseAdv, name: { zh: "分布式训练与并行优化", en: "Distributed Training & Parallelism" }, cn: "3", ects: "4.5", us: "1.5" },
                { phase: phasePrac, name: { zh: "MoE 混合专家模型实战", en: "MoE Models in Practice" }, cn: "4", ects: "6", us: "2" },
                { phase: phasePrac, name: { zh: "推理优化与量化技术", en: "Inference Optimization & Quantization" }, cn: "3", ects: "4.5", us: "1.5" },
                { phase: phasePrac, name: { zh: "前沿算法研究与复现", en: "Frontier Algorithms & Reproduction" }, cn: "4", ects: "6", us: "2" },
                { phase: phasePrac, name: { zh: "大模型研发综合实训", en: "Capstone: Large Model R&D" }, cn: "6", ects: "9", us: "3" },
              ]}
            />
            <p className="text-white/50 text-xs mt-3">{tx({ zh: "合计：中国学分 40 · 60 ECTS · 20 美英学分", en: "Totals: 40 CN · 60 ECTS · 20 US credits" }, language)}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <h4 className="text-white font-semibold mt-10 mb-4">{tx({ zh: "理实一体化实训", en: "Integrated Practice Labs" }, language)}</h4>
            <div className="space-y-3 text-sm text-white/75">
              {[
                {
                  zh: "7B 参数大模型从零训练 — NVIDIA A100×8 集群、Megatron-LM、DeepSpeed；验收：Perplexity≤2.5，MMLU≥60%。",
                  en: "7B model from scratch — NVIDIA A100×8, Megatron-LM, DeepSpeed; Acceptance: Perplexity ≤2.5, MMLU ≥60%.",
                },
                {
                  zh: "多模态融合模型开发 — CLIP/Flava、LAION 数据集；图文检索 Recall@1≥70%。",
                  en: "Multimodal fusion — CLIP/Flava, LAION dataset; Image-text retrieval Recall@1 ≥70%.",
                },
                {
                  zh: "MoE 专家模型优化 — Mixtral / Switch Transformer；训练效率提升≥30%，参数量≥56B。",
                  en: "MoE optimization — Mixtral/Switch Transformer; Training efficiency ≥30%, parameter scale ≥56B.",
                },
              ].map((line, i) => (
                <div key={i} className="flex gap-2 glass-card-dark p-4 rounded-lg">
                  <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>{tx(line, language)}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h4 className="text-white font-semibold mt-10 mb-4">{tx({ zh: "全球就业对接方向（示意薪酬）", en: "Global Career Paths (Indicative)" }, language)}</h4>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-xs md:text-sm text-white/80">
                <thead className="bg-white/5">
                  <tr className="text-left border-b border-white/10">
                    <th className="p-3">{tx({ zh: "岗位", en: "Role" }, language)}</th>
                    <th className="p-3">{tx({ zh: "中国（万元/年）", en: "China (CNY k)" }, language)}</th>
                    <th className="p-3">{tx({ zh: "欧盟（万欧元）", en: "EU (\u20AC k)" }, language)}</th>
                    <th className="p-3">{tx({ zh: "美英（万美元）", en: "US/UK ($ k)" }, language)}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { r: { zh: "大模型算法工程师", en: "Large Model Algorithm Engineer" }, c: "80–150", e: "8–15", u: "18–35" },
                    { r: { zh: "研究科学家", en: "Research Scientist" }, c: "120–300", e: "10–20", u: "25–50" },
                    { r: { zh: "大模型架构师", en: "Large Model Architect" }, c: "150–500", e: "12–25", u: "30–70" },
                    { r: { zh: "AI 实验室负责人", en: "AI Lab Lead" }, c: "200–800", e: "15–35", u: "40–100" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="p-3">{tx(row.r, language)}</td>
                      <td className="p-3">{row.c}</td>
                      <td className="p-3">{row.e}</td>
                      <td className="p-3">{row.u}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ TRACK 2: ENGINEERING ═══ */}
      <section id="track-eng" className="section-padding bg-background scroll-mt-24">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "方向二", en: "Track 2" }, language)}
            title={tx({ zh: "AI 工程落地类人才培养", en: "AI Engineering & Deployment Talent" }, language)}
            subtitle={tx({
              zh: "系统工程与大规模部署：从模型到生产环境全链路落地。",
              en: "Systems engineering and production deployment end-to-end.",
            }, language)}
          />
          <Reveal>
            <div className="card-premium p-6 mb-8">
              <h4 className="font-semibold mb-3">{tx({ zh: "培养目标与适配人群", en: "Objectives & Audience" }, language)}</h4>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>{tx({ zh: "学历：本科及以上；计算机、软件工程、电子工程。", en: "Bachelor's+; CS, software engineering, EE." }, language)}</li>
                <li>{tx({ zh: "前置：Python/Go，Docker/K8s，后端开发经验。", en: "Python/Go, Docker/K8s, backend experience." }, language)}</li>
                <li>{tx({ zh: "对象：软件 / 运维 / 数据工程师转型。", en: "Software, DevOps, and data engineers upskilling." }, language)}</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h4 className="font-semibold mb-4">{tx({ zh: "核心课程体系", en: "Core Curriculum" }, language)}</h4>
            <CourseTable
              language={language}
              rows={[
                { phase: phaseBasic, name: { zh: "MLOps 工程基础", en: "MLOps Foundations" }, cn: "2", ects: "3", us: "1" },
                { phase: phaseBasic, name: { zh: "云原生技术栈", en: "Cloud-Native Stack" }, cn: "3", ects: "4.5", us: "1.5" },
                { phase: phaseBasic, name: { zh: "模型服务化架构", en: "Model Serving Architecture" }, cn: "2", ects: "3", us: "1" },
                { phase: phaseAdv, name: { zh: "向量数据库与检索增强", en: "Vector DB & RAG" }, cn: "3", ects: "4.5", us: "1.5" },
                { phase: phaseAdv, name: { zh: "AI 应用开发框架", en: "AI Application Frameworks" }, cn: "4", ects: "6", us: "2" },
                { phase: phaseAdv, name: { zh: "高并发推理系统设计", en: "High-Concurrency Inference" }, cn: "4", ects: "6", us: "2" },
                { phase: phaseAdv, name: { zh: "AI 监控与可观测性", en: "AI Observability" }, cn: "3", ects: "4.5", us: "1.5" },
                { phase: phasePrac, name: { zh: "Agent 智能体开发", en: "Agent Development" }, cn: "4", ects: "6", us: "2" },
                { phase: phasePrac, name: { zh: "边缘 AI 部署技术", en: "Edge AI Deployment" }, cn: "3", ects: "4.5", us: "1.5" },
                { phase: phasePrac, name: { zh: "大模型应用安全", en: "LLM Application Security" }, cn: "3", ects: "4.5", us: "1.5" },
                { phase: phasePrac, name: { zh: "AI 工程化综合实训", en: "Capstone: AI Engineering" }, cn: "6", ects: "9", us: "3" },
              ]}
            />
            <p className="text-muted-foreground text-xs mt-3">{tx({ zh: "合计：中国学分 37 · 55.5 ECTS · 18.5 美英学分", en: "Totals: 37 CN · 55.5 ECTS · 18.5 US" }, language)}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <h4 className="font-semibold mt-10 mb-4">{tx({ zh: "理实一体化实训", en: "Integrated Practice Labs" }, language)}</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              {[
                {
                  zh: "企业级 RAG 系统构建 — LangChain、Pinecone/Weaviate、OpenAI API；问答准确率≥85%，响应时间≤2s。",
                  en: "Enterprise RAG system — LangChain, Pinecone/Weaviate, OpenAI API; Q&A accuracy ≥85%, response ≤2s.",
                },
                {
                  zh: "高并发推理服务 — vLLM/TGI、Kubernetes、Prometheus；QPS≥1000，可用性≥99.9%。",
                  en: "High-QPS inference — vLLM/TGI, Kubernetes, Prometheus; QPS ≥1000, uptime ≥99.9%.",
                },
                {
                  zh: "多 Agent 协作平台 — AutoGPT、CrewAI、LangGraph；任务完成率≥90%，人工干预率≤10%。",
                  en: "Multi-agent platform — AutoGPT, CrewAI, LangGraph; task completion ≥90%, human intervention ≤10%.",
                },
              ].map((line, i) => (
                <div key={i} className="flex gap-2 card-premium p-4">
                  <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>{tx(line, language)}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h4 className="font-semibold mt-10 mb-4">{tx({ zh: "全球就业对接方向（示意薪酬）", en: "Global Career Paths (Indicative)" }, language)}</h4>
            <div className="overflow-x-auto rounded-xl border border-border/40">
              <table className="w-full text-xs md:text-sm">
                <thead className="bg-muted/50">
                  <tr className="text-left border-b border-border/40">
                    <th className="p-3">{tx({ zh: "岗位", en: "Role" }, language)}</th>
                    <th className="p-3">CN</th>
                    <th className="p-3">EU</th>
                    <th className="p-3">US/UK</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    { r: { zh: "MLOps 工程师", en: "MLOps Engineer" }, c: "50–120", e: "6–12", u: "15–28" },
                    { r: { zh: "推理优化工程师", en: "Inference Optimization Engineer" }, c: "60–150", e: "7–14", u: "18–32" },
                    { r: { zh: "AI 基础设施工程师", en: "AI Infrastructure Engineer" }, c: "70–180", e: "8–16", u: "20–38" },
                    { r: { zh: "AI 应用架构师", en: "AI Application Architect" }, c: "80–200", e: "9–18", u: "22–45" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/30">
                      <td className="p-3 text-foreground">{tx(row.r, language)}</td>
                      <td className="p-3">{row.c}</td>
                      <td className="p-3">{row.e}</td>
                      <td className="p-3">{row.u}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ TRACK 3: INDUSTRY APP ═══ */}
      <section id="track-app" className="section-padding section-deep-blue relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10 max-w-5xl">
          <SectionHeading
            label={tx({ zh: "方向三", en: "Track 3" }, language)}
            title={tx({ zh: "AI 行业应用类人才培养", en: "AI Industry Application Talent" }, language)}
            subtitle={tx({
              zh: "「AI + 垂直行业」复合型人才：场景适配与商业价值转化。",
              en: "AI + vertical industry talent: scenario fit and business value.",
            }, language)}
            dark
          />
          <Reveal>
            <div className="glass-card-dark p-6 mb-8">
              <h4 className="text-white font-semibold mb-3">{tx({ zh: "培养目标与适配人群", en: "Objectives & Audience" }, language)}</h4>
              <ul className="text-sm text-white/70 space-y-2 list-disc list-inside">
                <li>{tx({ zh: "学历：本科及以上；行业专业 + 计算机基础。", en: "Bachelor's+; domain major + CS fundamentals." }, language)}</li>
                <li>{tx({ zh: "前置：了解业务流程，具备数据分析能力。", en: "Business process literacy and data analysis." }, language)}</li>
                <li>{tx({ zh: "对象：行业专家、产品经理、业务分析师。", en: "Domain experts, PMs, business analysts." }, language)}</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h4 className="text-white font-semibold mb-4">{tx({ zh: "核心课程体系", en: "Core Curriculum" }, language)}</h4>
            <div className="rounded-xl border border-white/10 overflow-hidden bg-[oklch(0.18_0.02_250)]">
              <CourseTable
                language={language}
                rows={[
                  { phase: phaseBasic, name: { zh: "AI 产品思维与方法论", en: "AI Product Thinking" }, cn: "2", ects: "3", us: "1" },
                  { phase: phaseBasic, name: { zh: "行业数据分析实战", en: "Industry Data Analytics Lab" }, cn: "2", ects: "3", us: "1" },
                  { phase: phaseBasic, name: { zh: "提示词工程与 AIGC 应用", en: "Prompt Engineering & AIGC" }, cn: "2", ects: "3", us: "1" },
                  { phase: phaseAdv, name: { zh: "AI + 金融科技应用", en: "AI + FinTech" }, cn: "3", ects: "4.5", us: "1.5" },
                  { phase: phaseAdv, name: { zh: "AI + 医疗健康应用", en: "AI + Healthcare" }, cn: "3", ects: "4.5", us: "1.5" },
                  { phase: phaseAdv, name: { zh: "AI + 智能制造应用", en: "AI + Smart Manufacturing" }, cn: "3", ects: "4.5", us: "1.5" },
                  { phase: phaseAdv, name: { zh: "AI + 创意内容产业", en: "AI + Creative Industries" }, cn: "3", ects: "4.5", us: "1.5" },
                  { phase: phasePrac, name: { zh: "行业解决方案设计", en: "Industry Solution Design" }, cn: "4", ects: "6", us: "2" },
                  { phase: phasePrac, name: { zh: "ROI 测算与商业论证", en: "ROI & Business Case" }, cn: "3", ects: "4.5", us: "1.5" },
                  { phase: phasePrac, name: { zh: "变革管理与组织适配", en: "Change Management" }, cn: "3", ects: "4.5", us: "1.5" },
                  { phase: phasePrac, name: { zh: "行业 AI 应用综合实训", en: "Capstone: Industry AI" }, cn: "6", ects: "9", us: "3" },
                ]}
              />
            </div>
            <p className="text-white/50 text-xs mt-3">{tx({ zh: "合计：中国学分 34 · 51 ECTS · 17 美英学分", en: "Totals: 34 CN · 51 ECTS · 17 US credits" }, language)}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <h4 className="text-white font-semibold mt-10 mb-4">{tx({ zh: "理实一体化实训", en: "Integrated Practice Labs" }, language)}</h4>
            <div className="space-y-3 text-sm text-white/75">
              {[
                {
                  zh: "智能客服系统 — 企业知识库与微调数据；问题解决率≥80%，人工转接率≤20%。",
                  en: "Intelligent customer service — enterprise KB & fine-tuning data; resolution ≥80%, transfer ≤20%.",
                },
                {
                  zh: "工业质检 AI 系统 — 工业相机数据集、YOLO/Detr；检测准确率≥99%，漏检率≤0.1%。",
                  en: "Industrial QA AI — industrial camera dataset, YOLO/Detr; accuracy ≥99%, miss rate ≤0.1%.",
                },
                {
                  zh: "个性化推荐系统 — 用户行为日志、协同过滤 + LLM；CTR 提升≥20%，转化率提升≥15%。",
                  en: "Recommendation system — user behavior logs, CF + LLM; CTR +20%, conversion +15%.",
                },
              ].map((line, i) => (
                <div key={i} className="flex gap-2 glass-card-dark p-4 rounded-lg">
                  <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>{tx(line, language)}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h4 className="text-white font-semibold mt-10 mb-4">{tx({ zh: "全球就业对接方向（示意薪酬）", en: "Global Career Paths (Indicative)" }, language)}</h4>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-xs md:text-sm text-white/80">
                <thead className="bg-white/5">
                  <tr className="text-left border-b border-white/10">
                    <th className="p-3">{tx({ zh: "岗位", en: "Role" }, language)}</th>
                    <th className="p-3">CN</th>
                    <th className="p-3">EU</th>
                    <th className="p-3">US/UK</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { r: { zh: "AI 产品经理", en: "AI Product Manager" }, c: "40–100", e: "5–10", u: "12–25" },
                    { r: { zh: "行业解决方案专家", en: "Industry Solution Expert" }, c: "50–150", e: "6–13", u: "15–30" },
                    { r: { zh: "AI 转型顾问", en: "AI Transformation Consultant" }, c: "60–180", e: "7–15", u: "18–38" },
                    { r: { zh: "垂直领域 AI 专家", en: "Vertical AI Specialist" }, c: "70–200", e: "8–18", u: "20–42" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="p-3">{tx(row.r, language)}</td>
                      <td className="p-3">{row.c}</td>
                      <td className="p-3">{row.e}</td>
                      <td className="p-3">{row.u}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ TRACK 4: GOVERNANCE ═══ */}
      <section id="track-gov" className="section-padding bg-background scroll-mt-24">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "方向四", en: "Track 4" }, language)}
            title={tx({ zh: "AI 支撑与治理类人才培养", en: "AI Governance & Enablement Talent" }, language)}
            subtitle={tx({
              zh: "合规、伦理与安全：负责任 AI 与组织级治理能力建设。",
              en: "Compliance, ethics, and safety for responsible AI at organizational scale.",
            }, language)}
          />
          <Reveal>
            <div className="card-premium p-6 mb-8">
              <h4 className="font-semibold mb-3">{tx({ zh: "培养目标与适配人群", en: "Objectives & Audience" }, language)}</h4>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>{tx({ zh: "学历：本科及以上；法学、社会学、伦理、公共政策、计算机等。", en: "Bachelor's+; law, sociology, ethics, policy, CS." }, language)}</li>
                <li>{tx({ zh: "前置：了解法律法规与政策分析能力。", en: "Regulatory literacy and policy analysis." }, language)}</li>
                <li>{tx({ zh: "对象：法务、合规、风控、公共事务人员。", en: "Legal, compliance, risk, and public affairs." }, language)}</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h4 className="font-semibold mb-4">{tx({ zh: "核心课程体系", en: "Core Curriculum" }, language)}</h4>
            <CourseTable
              language={language}
              rows={[
                { phase: phaseBasic, name: { zh: "AI 伦理与哲学基础", en: "AI Ethics & Philosophy" }, cn: "2", ects: "3", us: "1" },
                { phase: phaseBasic, name: { zh: "全球 AI 监管框架概览", en: "Global AI Regulatory Landscape" }, cn: "2", ects: "3", us: "1" },
                { phase: phaseBasic, name: { zh: "数据隐私与保护", en: "Data Privacy & Protection" }, cn: "2", ects: "3", us: "1" },
                { phase: phaseAdv, name: { zh: "欧盟 AI 法案深度解析", en: "EU AI Act in Depth" }, cn: "3", ects: "4.5", us: "1.5" },
                { phase: phaseAdv, name: { zh: "AI 风险评估与审计", en: "AI Risk Assessment & Audit" }, cn: "3", ects: "4.5", us: "1.5" },
                { phase: phaseAdv, name: { zh: "算法公平性与可解释性", en: "Algorithmic Fairness & XAI" }, cn: "3", ects: "4.5", us: "1.5" },
                { phase: phaseAdv, name: { zh: "AI 安全与红队测试", en: "AI Security & Red Teaming" }, cn: "3", ects: "4.5", us: "1.5" },
                { phase: phasePrac, name: { zh: "AI 合规体系建设", en: "Building AI Compliance Programs" }, cn: "4", ects: "6", us: "2" },
                { phase: phasePrac, name: { zh: "生成式 AI 版权治理", en: "GenAI Copyright Governance" }, cn: "3", ects: "4.5", us: "1.5" },
                { phase: phasePrac, name: { zh: "AI 治理组织与流程", en: "AI Governance Org & Process" }, cn: "3", ects: "4.5", us: "1.5" },
                { phase: phasePrac, name: { zh: "AI 治理综合实训", en: "Capstone: AI Governance" }, cn: "6", ects: "9", us: "3" },
              ]}
            />
            <p className="text-muted-foreground text-xs mt-3">{tx({ zh: "合计：中国学分 34 · 51 ECTS · 17 美英学分", en: "Totals: 34 CN · 51 ECTS · 17 US credits" }, language)}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <h4 className="font-semibold mt-10 mb-4">{tx({ zh: "理实一体化实训", en: "Integrated Practice Labs" }, language)}</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              {[
                {
                  zh: "AI 合规风险评估 — EU AI Act 分类工具、风险矩阵；风险识别覆盖率≥95%。",
                  en: "AI compliance risk assessment — EU AI Act tooling, risk matrix; risk identification coverage ≥95%.",
                },
                {
                  zh: "算法偏见检测与修正 — Fairlearn、AIF360 工具包；偏见指标降低≥50%，性能下降≤5%。",
                  en: "Bias detection & mitigation — Fairlearn, AIF360 toolkit; bias metrics reduced ≥50%, performance drop ≤5%.",
                },
                {
                  zh: "AI 红队攻击演练 — Prompt Injection 数据集、越狱测试；发现≥10 个安全漏洞，修复率≥80%。",
                  en: "AI red team exercise — prompt injection dataset, jailbreak testing; ≥10 findings, fix rate ≥80%.",
                },
              ].map((line, i) => (
                <div key={i} className="flex gap-2 card-premium p-4">
                  <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>{tx(line, language)}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h4 className="font-semibold mt-10 mb-4">{tx({ zh: "全球就业对接方向（示意薪酬）", en: "Global Career Paths (Indicative)" }, language)}</h4>
            <div className="overflow-x-auto rounded-xl border border-border/40">
              <table className="w-full text-xs md:text-sm">
                <thead className="bg-muted/50">
                  <tr className="text-left border-b border-border/40">
                    <th className="p-3">{tx({ zh: "岗位", en: "Role" }, language)}</th>
                    <th className="p-3">CN</th>
                    <th className="p-3">EU</th>
                    <th className="p-3">US/UK</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    { r: { zh: "AI 合规专员", en: "AI Compliance Specialist" }, c: "30–80", e: "4–8", u: "10–20" },
                    { r: { zh: "AI 伦理专家", en: "AI Ethics Specialist" }, c: "40–100", e: "5–10", u: "12–25" },
                    { r: { zh: "AI 审计师", en: "AI Auditor" }, c: "50–120", e: "6–12", u: "15–28" },
                    { r: { zh: "首席 AI 治理官", en: "Chief AI Governance Officer" }, c: "80–200", e: "8–16", u: "20–45" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/30">
                      <td className="p-3 text-foreground">{tx(row.r, language)}</td>
                      <td className="p-3">{row.c}</td>
                      <td className="p-3">{row.e}</td>
                      <td className="p-3">{row.u}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ STANDARDIZED COURSE INTROS (DOC §8) ═══ */}
      <section id="standard-courses" className="section-padding bg-[oklch(0.98_0.003_250)] border-y border-border/30">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "核心课程标准化简介", en: "Standardized Core Courses" }, language)}
            title={tx({ zh: "代表性课程目标与产出", en: "Representative Course Goals & Outcomes" }, language)}
            subtitle={tx({
              zh: "选自方案第 8 章；完整大纲与讲义可向院校工作组索取。",
              en: "From Blueprint Section 8; full syllabi available to partner institutions.",
            }, language)}
          />
          <div className="grid gap-6">
            {[
              {
                tag: { zh: "研发类", en: "R&D" },
                title: { zh: "Transformer 架构深度解析", en: "Transformer Architecture in Depth" },
                goal: {
                  zh: "掌握设计原理与演进路径，理解自注意力数学本质与优化方向。",
                  en: "Master design principles and evolution; attention mathematics and optimization.",
                },
                out: {
                  zh: "从零实现 Transformer；设计高效注意力；分析主流大模型架构取舍。",
                  en: "Implement Transformer; design attention mechanisms; analyze trade-offs in LLMs.",
                },
              },
              {
                tag: { zh: "研发类", en: "R&D" },
                title: { zh: "大模型预训练技术", en: "Large Model Pre-training" },
                goal: {
                  zh: "掌握千亿参数预训练全流程：数据管道、训练策略、稳定性控制。",
                  en: "End-to-end pre-training: data pipelines, training strategy, stability.",
                },
                out: {
                  zh: "设计数据处理流程；配置分布式并行；诊断训练故障。",
                  en: "Design data pipelines; configure distributed training; diagnose failures.",
                },
              },
              {
                tag: { zh: "研发类", en: "R&D" },
                title: { zh: "高效微调与对齐技术", en: "Efficient Fine-tuning & Alignment" },
                goal: {
                  zh: "LoRA/QLoRA、指令微调、RLHF/DPO 与评估基准。",
                  en: "LoRA/QLoRA, instruction tuning, RLHF/DPO, evaluation benchmarks.",
                },
                out: {
                  zh: "垂直领域高效微调；人类对齐流水线；科学评估体系。",
                  en: "Domain fine-tuning; alignment pipelines; rigorous evaluation.",
                },
              },
              {
                tag: { zh: "工程类", en: "Engineering" },
                title: { zh: "MLOps 工程基础", en: "MLOps Foundations" },
                goal: {
                  zh: "ML 全生命周期自动化：实验追踪、数据版本、CI/CD for ML。",
                  en: "Automate ML lifecycle: tracking, data versioning, CI/CD for ML.",
                },
                out: {
                  zh: "企业级 MLOps 架构；实验追踪体系；训练部署自动化。",
                  en: "Enterprise MLOps architecture; experiment tracking; train/deploy automation.",
                },
              },
              {
                tag: { zh: "工程类", en: "Engineering" },
                title: { zh: "向量数据库与检索增强", en: "Vector DB & RAG" },
                goal: {
                  zh: "嵌入、索引、Hybrid Search、分块与 RAG 评估优化。",
                  en: "Embeddings, indexing, hybrid search, chunking, RAG evaluation.",
                },
                out: {
                  zh: "选型部署向量库；优化检索策略；持续改进 RAG 效果。",
                  en: "Deploy vector stores; optimize retrieval; improve RAG continuously.",
                },
              },
              {
                tag: { zh: "工程类", en: "Engineering" },
                title: { zh: "Agent 智能体开发", en: "Agent Development" },
                goal: {
                  zh: "ReAct/Reflexion、工具调用、规划记忆、多 Agent 与安全。",
                  en: "ReAct/Reflexion, tools, planning & memory, multi-agent, safety.",
                },
                out: {
                  zh: "单 Agent 应用；多 Agent 工作流；安全防护机制。",
                  en: "Single-agent apps; multi-agent workflows; guardrails.",
                },
              },
              {
                tag: { zh: "应用类", en: "Applications" },
                title: { zh: "AI 产品思维与方法论", en: "AI Product Thinking" },
                goal: {
                  zh: "从 0 到 1 的 AI 产品设计：可行性、交互、边界、审核与商业模式。",
                  en: "0→1 AI products: feasibility, UX, boundaries, moderation, monetization.",
                },
                out: {
                  zh: "PRD、交互流程、商业化策略。",
                  en: "PRDs, UX flows, go-to-market strategy.",
                },
              },
              {
                tag: { zh: "应用类", en: "Applications" },
                title: { zh: "AI + 金融科技应用", en: "AI + FinTech" },
                goal: {
                  zh: "风控、量化、投顾、RegTech 与金融 AI 合规解释性。",
                  en: "Risk, quant, wealth, RegTech, explainability in finance.",
                },
                out: {
                  zh: "金融风控 AI 方案；合规风险评估；商业计划书。",
                  en: "FinRisk solutions; compliance assessment; business plans.",
                },
              },
              {
                tag: { zh: "治理类", en: "Governance" },
                title: { zh: "欧盟 AI 法案深度解析", en: "EU AI Act in Depth" },
                goal: {
                  zh: "风险分类、高风险系统合规、技术文档与执法机制。",
                  en: "Risk classes, high-risk obligations, documentation, enforcement.",
                },
                out: {
                  zh: "风险分级；技术文档；企业合规路线图。",
                  en: "Risk tiering; technical files; compliance roadmaps.",
                },
              },
              {
                tag: { zh: "治理类", en: "Governance" },
                title: { zh: "算法公平性与可解释性", en: "Fairness & Explainability" },
                goal: {
                  zh: "偏见类型、公平性指标、缓解技术与 LIME/SHAP。",
                  en: "Bias types, fairness metrics, mitigation, LIME/SHAP.",
                },
                out: {
                  zh: "检测量化偏见；缓解方案；可解释性报告。",
                  en: "Measure bias; mitigate; explainability reporting.",
                },
              },
            ].map((c, i) => (
              <Reveal key={i} delay={Math.min(i * 0.04, 0.4)}>
                <div className="card-premium p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gold/15 text-gold">{tx(c.tag, language)}</span>
                    <h3 className="text-lg font-semibold text-foreground">{tx(c.title, language)}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    <span className="font-medium text-foreground">{tx({ zh: "课程目标：", en: "Goals: " }, language)}</span>
                    {tx(c.goal, language)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{tx({ zh: "学习产出：", en: "Outcomes: " }, language)}</span>
                    {tx(c.out, language)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OPC+X NOTE (COMPACT) ═══ */}
      <section className="section-padding-sm bg-background border-b border-border/30">
        <div className="container max-w-3xl text-center">
          <p className="text-sm text-muted-foreground">
            {tx({
              zh: "产业侧 OPC+X 教练认证仍可作为师资与合作伙伴的成长路径（五级认证 · 以真实商业交付流水为考核标准之一）。院校培养方案以学分与实训验收为主。",
              en: "OPC+X coach certification remains available for faculty & partners (five tiers; commercial delivery is one assessment dimension). University programs emphasize credits and practicum acceptance.",
            }, language)}
          </p>
        </div>
      </section>

      {/* ═══ UNIVERSITY PARTNERSHIP ═══ */}
      <section className="section-padding bg-background">
        <div className="container">
          <SectionHeading
            label={tx({ zh: "落地形态", en: "Delivery Focus" }, language)}
            title={tx({ zh: "课程、师资与孵化如何落地", en: "How Programs, Faculty & Incubation Land" }, language)}
            subtitle={tx({
              zh: "在「学术共创、专业共建、就业创业辅导」之下，入校侧通常以以下三类交付组合出现。",
              en: "Under the three pillars, campus rollout typically bundles these three delivery threads.",
            }, language)}
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: { zh: "课程共建", en: "Curriculum Co-Development" },
                desc: {
                  zh: "微专业（18–24 学分）、核心课替换或 48 学分联合培养；大纲、PPT、数据集与考核标准成套交付。",
                  en: "Micro-major (18–24 cr), course swaps, or 48-cr joint programs—with syllabi, slides, datasets, and rubrics.",
                },
              },
              {
                title: { zh: "师资培训", en: "Faculty Training" },
                desc: {
                  zh: "OPC 方法论与 AI 工具实训；双师课堂与认证讲师体系。",
                  en: "OPC methodology & AI tooling labs; co-teaching and certified instructors.",
                },
              },
              {
                title: { zh: "创业孵化", en: "Startup Incubation" },
                desc: {
                  zh: "科研成果对接 OPC 生态与独角兽孵化全链路服务。",
                  en: "Research commercialization via OPC ecosystem and unicorn incubation.",
                },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-premium h-full">
                  <h3 className="text-base font-medium text-foreground mb-3">{tx(item.title, language)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tx(item.desc, language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COOPERATION ═══ */}
      <section id="cooperation" className="section-padding section-deep-blue relative overflow-hidden scroll-mt-32">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10">
          <SectionHeading
            label={tx({ zh: "合作模式", en: "Cooperation Model" }, language)}
            title={tx({ zh: "高校合作流程", en: "University Partnership Process" }, language)}
            subtitle={tx({
              zh: "从对接到落地的一站式支持",
              en: "End-to-end support from discovery to rollout",
            }, language)}
            dark
          />
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-8">
            {[
              {
                step: "01",
                icon: Calendar,
                title: { zh: "需求对接", en: "Needs Assessment" },
                desc: { zh: "院校特色与 AI 转型目标对齐", en: "Align institutional goals with AI transformation" },
              },
              {
                step: "02",
                icon: FileCheck,
                title: { zh: "方案设计", en: "Program Design" },
                desc: { zh: "选定培养方向与学分嵌入模式", en: "Select tracks & credit embedding model" },
              },
              {
                step: "03",
                icon: GraduationCap,
                title: { zh: "师资培训", en: "Faculty Enablement" },
                desc: { zh: "方法论、工具链与实训环境", en: "Methodology, toolchain, lab environments" },
              },
              {
                step: "04",
                icon: Award,
                title: { zh: "认证与评估", en: "Certification & Assessment" },
                desc: { zh: "作品集、验收报告与 OPC+X 衔接", en: "Portfolios, acceptance reports, OPC+X bridge" },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glass-card-dark p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-gold" style={{ fontFamily: "var(--font-heading)" }}>
                      {item.step}
                    </span>
                    <item.icon className="w-6 h-6 text-white/60" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{tx(item.title, language)}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{tx(item.desc, language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ UNICORN ═══ */}
      <section id="unicorn" className="section-padding uni-aurora relative scroll-mt-32">
        <div className="pattern-overlay absolute inset-0 opacity-[0.12] pointer-events-none z-[1]" aria-hidden />
        <div className="container relative z-10 max-w-5xl">
          <SectionHeading
            label={tx({ zh: "独角兽孵化", en: "Unicorn Incubation" }, language)}
            title={tx({ zh: "从校园创新到独角兽管线", en: "From Campus Innovation to Unicorn-Scale Pipelines" }, language)}
            subtitle={tx({
              zh: "与高校人才培养并行：筛选高潜力课题与团队，对接 OPC 全球订单、产业导师与资本网络，形成可验证的增长飞轮。",
              en: "Parallel to degree programs: we surface high-conviction labs and teams, then plug them into OPC demand, operator mentors, and capital—designed as a measurable growth loop.",
            }, language)}
            dark
          />
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {[
              {
                icon: Sparkles,
                title: { zh: "战略定位", en: "Strategic Positioning" },
                desc: { zh: "商业模式、差异化赛道与里程碑拆解，对齐真实市场需求。", en: "Business model, wedge, and milestones anchored to live market pull." },
              },
              {
                icon: Building2,
                title: { zh: "资源对接", en: "Resource Matching" },
                desc: { zh: "全球订单、标杆客户 PoC、产业专家与合规背书。", en: "Global orders, lighthouse PoCs, domain experts, and compliance scaffolding." },
              },
              {
                icon: Network,
                title: { zh: "液态团队", en: "Liquid Teams" },
                desc: { zh: "OPC 协作单元按需嵌入研发、增长与交付。", en: "OPC units embed on-demand across R&D, growth, and delivery." },
              },
              {
                icon: Rocket,
                title: { zh: "资本加速", en: "Capital Acceleration" },
                desc: { zh: "早期投资、战略 LP 与 RWA 等结构化融资路径。", en: "Seed rounds, strategic LPs, and structured paths including RWA where relevant." },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="uni-aurora-card h-full flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/15 border border-gold/25 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-gold" strokeWidth={1.35} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                      {tx(item.title, language)}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">{tx(item.desc, language)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section-padding uni-cta-panel relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-25" aria-hidden />
        <div className="container relative z-10 max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 border border-gold/25 mx-auto mb-8 shadow-[0_0_40px_oklch(0.62_0.1_75/0.15)]">
              <Building2 className="w-8 h-8 text-gold" strokeWidth={1.25} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-white mb-4 text-balance">
              {tx({ zh: "高校方案与创投管线，一并洽谈", en: "Institutional Programs & Venture Pipeline—One Conversation" }, language)}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/65 mb-10 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              {tx({
                zh: "索取完整人才培养方案、学分矩阵、示范大纲与独角兽加速清单：hi@opcglobal.ai",
                en: "Request the talent blueprint, credit matrix, sample syllabi, and venture acceleration overview: hi@opcglobal.ai",
              }, language)}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
              <a href="mailto:hi@opcglobal.ai" className="inline-flex justify-center">
                <button type="button" className="btn-gold min-h-[48px] px-10">
                  <span className="flex items-center gap-2">
                    {tx({ zh: "预约 OPC UNI 会谈", en: "Schedule OPC UNI Session" }, language)}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </a>
              <a href="#standard-courses" className="inline-flex justify-center">
                <button type="button" className="btn-outline-gold border-white/35 text-white hover:bg-white/10 min-h-[48px] px-8">
                  {tx({ zh: "核心课程简介", en: "Core Course Catalog" }, language)}
                </button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <UniPageFooter />
    </div>
  );
}
