import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  ArrowRight,
  Check,
  Home,
  ChevronRight,
  Brain,
  Wrench,
  Network,
  Shield,
  GraduationCap,
  Building2,
  Users,
  Briefcase,
  BookOpen,
  Handshake,
  Truck,
  Loader2,
  Mail,
} from "lucide-react";
import { useMemo } from "react";
import { Reveal, SectionHeading } from "@/components/motion";

type Lang = "en" | "zh" | "fr" | "ja";
const tx = (m: Partial<Record<Lang, string>>, lang: string) => m[lang as Lang] || m.en || "";

export default function Courses() {
  const { language } = useLanguage();
  const { data: courses, isLoading } = trpc.courses.visible.useQuery();

  const sortedCourses = useMemo(() => {
    if (!courses) return [];
    return [...courses].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }, [courses]);

  const loc = (en?: string | null, zh?: string | null) => {
    if (language === "zh" && zh) return zh;
    return en || zh || "";
  };

  const anchorNav = [
    { href: "#pillars", label: { zh: "三大合作支柱", en: "Three Pillars" } },
    { href: "#curriculum", label: { zh: "课程体系", en: "Curriculum System" } },
    { href: "#blueprint", label: { zh: "人才培养方案", en: "Talent Blueprint" } },
    { href: "#delivery", label: { zh: "交付方式", en: "Delivery Models" } },
    { href: "#faculty-careers", label: { zh: "师资与就业", en: "Faculty & Careers" } },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Sticky way home + in-page nav (below fixed nav) */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 border-b border-white/10 bg-[oklch(0.13_0.02_250/0.92)] backdrop-blur-xl">
        <div className="container flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3">
          <div className="flex flex-wrap items-center gap-2 text-[13px]">
            <Link href="/">
              <span className="inline-flex items-center gap-1.5 text-white/75 hover:text-white transition-colors cursor-pointer">
                <Home className="w-3.5 h-3.5" />
                {tx({ zh: "返回官网", en: "Main site" }, language)}
              </span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/35 shrink-0" />
            <span className="text-gold font-medium">{tx({ zh: "OPC UNI · 高校合作", en: "OPC UNI · Higher Ed" }, language)}</span>
          </div>
          <nav className="flex flex-wrap gap-1 sm:gap-2" aria-label="Section navigation">
            {anchorNav.map((a) => (
              <a
                key={a.href}
                href={a.href}
                className="px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium text-white/55 hover:text-white hover:bg-white/10 transition-colors"
              >
                {tx(a.label, language)}
              </a>
            ))}
            <Link href="/uni">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium text-gold/90 hover:bg-gold/10 cursor-pointer">
                {tx({ zh: "完整培养方案页", en: "Full UNI Blueprint" }, language)}
              </span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative section-deep-blue overflow-hidden pt-36 md:pt-44 pb-16 md:pb-24">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10">
          <Reveal>
            <Link href="/">
              <span className="btn-outline-gold mb-8 text-sm !py-2 !px-4 inline-flex items-center gap-2 cursor-pointer">
                <Home className="w-4 h-4" />
                {tx({ zh: "返回官网首页", en: "Main site home" }, language)}
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="badge-official mb-6 inline-block">
              {tx({ zh: "OPC UNI · 高校专区", en: "OPC UNI · University Hub" }, language)}
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="text-white max-w-4xl mb-6">
              {tx({
                zh: "课程体系 · 人才培养 · 交付方式 · 师资与就业",
                en: "Curriculum, Talent Development, Delivery, Faculty & Careers",
              }, language)}
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="text-white/85 text-base md:text-lg max-w-3xl leading-relaxed mb-4">
              {tx({
                zh: "学术共创 · 专业共建 · OPC 就业创业辅导",
                en: "Academic Co-Creation · Joint Programs · OPC Career & Entrepreneurship Support",
              }, language)}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/75 text-base md:text-lg max-w-3xl leading-relaxed mb-8">
              {tx({
                zh: "本页仅供高校校长与教务、院系决策层查阅：三大合作支柱如何落地，以及 OPC UNI 四大 AI 培养方向、学分与实训结构、入校交付形态、共建师资与订单/就业衔接。官网其他栏目介绍「组织与生态」，此处不重复。",
                en: "For presidents and academic leadership: how the three pillars land on campus, plus OPC UNI\u2019s four AI tracks, credit & practicum structure, delivery models, faculty co-development, and order-to-employment pathways. (Organizational storytelling lives on the main site—not repeated here.)",
              }, language)}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:hi@opcglobal.ai">
                <button className="btn-gold inline-flex items-center gap-2">
                  {tx({ zh: "预约院校洽谈", en: "Schedule Institutional Call" }, language)}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </a>
              <a href="#pillars">
                <button className="btn-outline-gold">{tx({ zh: "三大合作支柱", en: "Three Pillars" }, language)}</button>
              </a>
              <a href="#delivery">
                <button className="btn-outline-gold">{tx({ zh: "查看交付方式", en: "View Delivery Models" }, language)}</button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 三大合作支柱（与 OPC UNI 专页一致）═══ */}
      <section id="pillars" className="section-padding bg-background scroll-mt-32">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "高校合作", en: "University Partnership" }, language)}
            title={tx({ zh: "面向高校的三大合作支柱", en: "Three Pillars for Higher Education" }, language)}
            subtitle={tx({
              zh: "学术侧共创、培养方案共建、就业与创业侧辅导一体设计，与下方课程体系、方案、交付、师资就业章节一一对应。",
              en: "Scholarship co-creation, joint programs, and career/venture support—mapped to curriculum, blueprint, delivery, and faculty sections below.",
            }, language)}
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: { zh: "学术共创", en: "Academic Co-Creation" },
                desc: {
                  zh: "联合工作坊、课题与课程大纲共建评审；智库方法论文稿与产业案例入校；双师教研与讲义/PPT/数据集协同迭代。",
                  en: "Joint workshops, research themes, syllabus co-review; methodology briefs and industry cases; co-developed teaching assets.",
                },
              },
              {
                icon: Handshake,
                title: { zh: "专业共建", en: "Joint Program Building" },
                desc: {
                  zh: "微专业、核心课替换或联合培养；四类 AI 学分路径与中英欧学分对照；理实一体实训与验收量规，与贵校教务规则对齐。",
                  en: "Micro-majors, swaps, or joint programs; four AI tracks with credit mapping; practicum rubrics aligned to your registrar.",
                },
              },
              {
                icon: Briefcase,
                title: { zh: "OPC 就业创业辅导", en: "OPC Career & Entrepreneurship Coaching" },
                desc: {
                  zh: "对接 OPC 订单与项目实训、实习与雇主图谱；作品集与面试辅导；创业项目进入独角兽孵化与投融资协同。",
                  en: "OPC orders & practicum; internships & employers; portfolio coaching; ventures into incubation & investors.",
                },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card-premium p-6 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{tx(item.title, language)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{tx(item.desc, language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.28}>
            <div className="mt-8 text-center">
              <Link href="/uni#three-pillars">
                <span className="btn-outline-gold inline-flex items-center gap-2 cursor-pointer text-sm">
                  {tx({ zh: "在 OPC UNI 专页查看同一叙事全文", en: "Full narrative on OPC UNI" }, language)}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 课程体系 ═══ */}
      <section id="curriculum" className="section-padding bg-background scroll-mt-32">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "课程体系", en: "Curriculum System" }, language)}
            title={tx({ zh: "四类 AI 人才培养方向（学分型培养路径）", en: "Four AI Talent Tracks (Credit-Based Paths)" }, language)}
            subtitle={tx({
              zh: "与《UNI AI 人才培养方案》一致，支持中国学分 / ECTS / 美英学分对照；完整课表与实训标准见 OPC UNI 专页。",
              en: "Aligned with the UNI AI Talent Blueprint; CN / ECTS / US-UK credit mapping. Full syllabi and labs on the OPC UNI page.",
            }, language)}
          />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Brain,
                title: { zh: "大模型核心研发类", en: "Large Model Core R&D" },
                credits: { zh: "40 / 60 ECTS / 20 US", en: "40 CN · 60 ECTS · 20 US" },
                desc: {
                  zh: "预训练、对齐、分布式训练、多模态与 MoE；面向博士与高阶算法人才。",
                  en: "Pre-training, alignment, distributed training, multimodal & MoE—for doctoral-level R&D talent.",
                },
              },
              {
                icon: Wrench,
                title: { zh: "AI 工程落地类", en: "AI Engineering & Deployment" },
                credits: { zh: "37 / 55.5 / 18.5", en: "37 · 55.5 ECTS · 18.5 US" },
                desc: {
                  zh: "MLOps、RAG、高并发推理、Agent、边缘部署与安全。",
                  en: "MLOps, RAG, scalable inference, agents, edge & security.",
                },
              },
              {
                icon: Network,
                title: { zh: "AI 行业应用类", en: "AI Industry Applications" },
                credits: { zh: "34 / 51 / 17", en: "34 · 51 ECTS · 17 US" },
                desc: {
                  zh: "金融科技、医疗、制造、创意；解决方案设计与 ROI。",
                  en: "FinTech, healthcare, manufacturing, creative; solutions & ROI.",
                },
              },
              {
                icon: Shield,
                title: { zh: "AI 支撑与治理类", en: "AI Governance & Enablement" },
                credits: { zh: "34 / 51 / 17", en: "34 · 51 ECTS · 17 US" },
                desc: {
                  zh: "欧盟 AI 法案、风险评估、公平性、红队与合规体系。",
                  en: "EU AI Act, risk, fairness, red teaming, compliance programs.",
                },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="card-premium p-6 h-full flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{tx(item.title, language)}</h3>
                    <p className="text-xs text-gold/80 font-medium mb-2">{tx(item.credits, language)}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tx(item.desc, language)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-10 text-center">
              <Link href="/uni#four-tracks">
                <span className="btn-outline-gold inline-flex items-center gap-2 cursor-pointer">
                  {tx({ zh: "在 OPC UNI 查看完整课程表与实训", en: "Full course tables & labs on OPC UNI" }, language)}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 人才培养方案 ═══ */}
      <section id="blueprint" className="section-padding section-deep-blue relative overflow-hidden scroll-mt-32">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10 max-w-5xl">
          <SectionHeading
            label={tx({ zh: "人才培养方案", en: "Talent Development Blueprint" }, language)}
            title={tx({ zh: "设计原则与培养结构", en: "Design Principles & Structure" }, language)}
            subtitle={tx({
              zh: "由行业专家与学术专家共同研发；理实一体化，全球学分可对接。",
              en: "Co-developed by industry and academic experts; integrated theory-practice; global credit alignment.",
            }, language)}
            dark
          />
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="glass-card-dark p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gold" />
                  {tx({ zh: "核心原则", en: "Core Principles" }, language)}
                </h3>
                <ul className="space-y-3 text-sm text-white/75">
                  {[
                    {
                      zh: "金字塔式进阶：从基础层到顶层研发能力的贯通路径。",
                      en: "Pyramid progression from foundation to top-tier R&D.",
                    },
                    {
                      zh: "理实一体化：理论学习与项目实训比例不低于 1:1。",
                      en: "Theory and practicum at least 1:1.",
                    },
                    {
                      zh: "动态更新：核心技能快速迭代，主干课程按季度滚动更新。",
                      en: "Rapid skill refresh; backbone courses updated quarterly.",
                    },
                  ].map((line, i) => (
                    <li key={i} className="flex gap-2">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>{tx(line, language)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass-card-dark p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-gold" />
                  {tx({ zh: "学分与验收", en: "Credits & Acceptance" }, language)}
                </h3>
                <ul className="space-y-3 text-sm text-white/75">
                  {[
                    {
                      zh: "毕业总学分示例：48（中国）/ 72 ECTS / 24（美英）— 可按院校拆分嵌入。",
                      en: "Illustrative totals: 48 CN / 72 ECTS / 24 US-UK—modular for your institution.",
                    },
                    {
                      zh: "实训须提交作品集与技术/验收报告，作为学分认定与就业推荐依据之一。",
                      en: "Practicum portfolios & acceptance reports support credit recognition and career referrals.",
                    },
                    {
                      zh: "可与 UNI 师资发展路径衔接（含 OPC+X 可选认证），支撑双师型教学团队。",
                      en: "Tie-in to UNI faculty development (optional OPC+X) for co-teaching teams.",
                    },
                  ].map((line, i) => (
                    <li key={i} className="flex gap-2">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>{tx(line, language)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 交付方式 ═══ */}
      <section id="delivery" className="section-padding bg-background scroll-mt-32">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "交付方式", en: "Delivery Models" }, language)}
            title={tx({ zh: "院校嵌入与落地形态", en: "How We Embed on Campus" }, language)}
            subtitle={tx({
              zh: "从最小改动到深度合作，匹配教务处与二级学院的不同诉求。",
              en: "From light-touch to deep partnership—fits registrars and schools alike.",
            }, language)}
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                badge: { zh: "推荐", en: "Recommended" },
                title: { zh: "微专业认证", en: "Micro-Major Certificate" },
                meta: { zh: "18–24 学分 · 2–3 学期", en: "18–24 credits · 2–3 terms" },
                desc: {
                  zh: "在现有专业上叠加能力模块，学生可获院校学分 + UNI 能力认证背书，改动最小、上线最快。",
                  en: "Stack on existing majors; institutional credits plus UNI credentialing—fastest path.",
                },
              },
              {
                icon: Building2,
                title: { zh: "核心课程替换", en: "Core Course Replacement" },
                meta: { zh: "6–12 学分 · 约 1 学期起", en: "6–12 credits · from ~1 term" },
                desc: {
                  zh: "计算机、软件等相关专业可用新课程替换部分传统课，提升前沿性与就业对口度。",
                  en: "Replace select legacy CS/SE credits with AI-era core courses.",
                },
              },
              {
                icon: GraduationCap,
                title: { zh: "联合培养项目", en: "Joint Degree / Program" },
                meta: { zh: "完整 48 学分路径 · 2 年+", en: "Full ~48-credit path · 2+ years" },
                desc: {
                  zh: "品牌共建、联合实验室、教学大纲与数据集成套交付；可对接产业学院与就业直通。",
                  en: "Co-branding, joint labs, full syllabi & datasets; industry-school bridges.",
                },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card-premium p-6 h-full flex flex-col relative">
                  {"badge" in item && item.badge && (
                    <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider text-gold bg-gold/10 px-2 py-0.5 rounded">
                      {tx(item.badge, language)}
                    </span>
                  )}
                  <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{tx(item.title, language)}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{tx(item.meta, language)}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{tx(item.desc, language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.25}>
            <div className="mt-10 card-premium p-6 border-gold/20">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{tx({ zh: "交付资产包（典型）", en: "Typical Delivery Kit" }, language)}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tx({
                      zh: "课程大纲与教学课件、实验手册与数据集、考核量规、师资培训与认证路径、以及学期级实施排期建议 — 均可按院系定制。",
                      en: "Syllabi & slides, lab manuals & datasets, rubrics, faculty train-the-trainer and certification paths, plus term-by-term rollout plans—all customizable per school.",
                    }, language)}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 师资与就业资源 ═══ */}
      <section id="faculty-careers" className="section-padding bg-[oklch(0.98_0.003_250)] border-y border-border/30 scroll-mt-32">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "师资与就业", en: "Faculty & Careers" }, language)}
            title={tx({ zh: "教学力量与全球就业网络", en: "Teaching Capacity & Global Career Network" }, language)}
            subtitle={tx({
              zh: "UNI 侧连接共建教练与产业导师；同时衔接实训订单与雇主图谱，缩短「培养—就业」链条。",
              en: "UNI connects co-teaching coaches and industry mentors with practicum orders and employer maps—shortening hire-ready pathways.",
            }, language)}
          />
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <div className="card-premium p-8 h-full">
                <Users className="w-10 h-10 text-gold mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{tx({ zh: "师资与教研支持", en: "Faculty & Academic Support" }, language)}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    {
                      zh: "UNI 共建教练与领域专家参与授课、工作坊与课程大纲评审。",
                      en: "UNI co-teaching coaches and domain experts for instruction, workshops, and syllabus review.",
                    },
                    {
                      zh: "行业专家与学术专家共同研发主干大纲，保障产业对齐与学术严谨。",
                      en: "Industry + academic co-design of backbone syllabi.",
                    },
                    {
                      zh: "教师发展：工具链实训、双师课堂；可选接入 UNI 师资发展路径（含 OPC+X 衔接）。",
                      en: "Faculty upskilling: toolchain labs, co-teaching; optional UNI faculty track (incl. OPC+X bridge).",
                    },
                  ].map((line, i) => (
                    <li key={i} className="flex gap-2">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>{tx(line, language)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link href="/alliance">
                    <span className="text-sm font-medium text-gold hover:underline cursor-pointer inline-flex items-center gap-1">
                      {tx({ zh: "查看共建教练与合作伙伴网络", en: "Coach & partner network" }, language)}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-premium p-8 h-full">
                <Briefcase className="w-10 h-10 text-gold mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{tx({ zh: "就业与产业资源", en: "Employment & Industry" }, language)}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    {
                      zh: "UNI 订单与项目实训网络：优秀学员可进入真实交付与实习推荐通道。",
                      en: "UNI order & practicum network: real delivery and internship referrals for strong learners.",
                    },
                    {
                      zh: "培养方向与岗位图谱对齐（研发 / 工程 / 行业应用 / 治理），便于就业指导与校友跟踪。",
                      en: "Tracks mapped to role families—supports placement advising and alumni outcomes.",
                    },
                    {
                      zh: "UNI 独角兽孵化服务与创投资源协同，服务师生创业项目。",
                      en: "UNI unicorn incubation and investor ties for campus ventures.",
                    },
                  ].map((line, i) => (
                    <li key={i} className="flex gap-2">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>{tx(line, language)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link href="/uni">
                    <span className="text-sm font-medium text-gold hover:underline cursor-pointer inline-flex items-center gap-1">
                      {tx({ zh: "查看各方向全球就业对接示例", en: "See sample global career tables" }, language)}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 延展课程（数据库，次要） ═══ */}
      <section className="section-padding bg-background border-t border-border/30">
        <div className="container max-w-6xl">
          <SectionHeading
            label={tx({ zh: "延展模块", en: "Extended Modules" }, language)}
            title={tx({ zh: "UNI 补充选修目录", en: "UNI Supplementary Modules" }, language)}
            subtitle={tx({
              zh: "下列模块可与上述四类主培养路径组合，用于第二课堂或继续教育（详情以校方选课为准）。",
              en: "Optional modules to combine with the four tracks—for electives or continuing education (subject to your registrar).",
            }, language)}
          />
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : sortedCourses.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              {tx({ zh: "延展课程目录更新中，请联系获取最新清单。", en: "Extended catalog updating—contact us for the latest list." }, language)}
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedCourses.map((course, i) => (
                <Reveal key={course.id} delay={Math.min(i * 0.05, 0.35)}>
                  <div className="card-premium p-5 h-full flex flex-col border-border/50">
                    <h4 className="font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      {loc(course.nameEn, course.nameZh)}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                      {loc(course.taglineEn, course.taglineZh)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding section-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10 max-w-3xl text-center">
          <Reveal>
            <h2 className="text-white mb-4">{tx({ zh: "获取 UNI 院校定制方案包", en: "Request a UNI Institutional Pack" }, language)}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/70 mb-8 text-sm md:text-base leading-relaxed">
              {tx({
                zh: "UNI 工作组将根据贵校学制与学院特色，提供学分嵌入建议、课表样例与师资落地排期。",
                en: "The UNI team tailors credit embedding, sample schedules, and faculty rollout to your calendar and schools.",
              }, language)}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="mailto:hi@opcglobal.ai" className="btn-gold inline-flex items-center gap-2">
                <Mail className="w-4 h-4" />
                hi@opcglobal.ai
              </a>
              <Link href="/">
                <span className="btn-outline-gold inline-flex items-center gap-2 cursor-pointer">
                  <Home className="w-4 h-4" />
                  {tx({ zh: "返回官网", en: "Main site" }, language)}
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* UNI-only slim footer — avoids repeating OPC Global narrative from site Footer */}
      <footer className="section-deep-blue border-t border-white/10">
        <div className="container py-12 md:py-14 text-center max-w-2xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold/80 mb-2">OPC UNI</p>
          <p className="text-sm text-white/65 leading-relaxed mb-6">
            {tx({
              zh: "高等教育 AI 人才培养与入校交付 · 本页为高校决策专用，不含 OPC Global 组织与生态介绍。",
              en: "Higher-ed AI talent programs and on-campus delivery. This hub is for institutional decisions—no duplicate OPC Global organizational storytelling.",
            }, language)}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="mailto:hi@opcglobal.ai" className="text-white/70 hover:text-white inline-flex items-center gap-2">
              <Mail className="w-4 h-4" />
              hi@opcglobal.ai
            </a>
            <Link href="/uni">
              <span className="text-gold/90 hover:text-gold cursor-pointer inline-flex items-center gap-1">
                {tx({ zh: "UNI 培养方案全文", en: "Full UNI blueprint" }, language)}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link href="/">
              <span className="text-white/50 hover:text-white/80 cursor-pointer">{tx({ zh: "进入官网", en: "Main website" }, language)}</span>
            </Link>
          </div>
          <p className="text-[11px] text-white/35 mt-8">© {new Date().getFullYear()} OPC UNI</p>
        </div>
      </footer>
    </div>
  );
}
