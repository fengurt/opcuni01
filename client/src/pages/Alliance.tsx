import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import {
  Users, Building2, Briefcase, Globe, Mail, ExternalLink, Sparkles,
  Loader2, TrendingUp, Award, MapPin, ArrowRight, DollarSign, Handshake,
  Target, Lightbulb, GraduationCap, Shield
} from "lucide-react";
import { Link } from "wouter";
import { Reveal, SectionHeading } from "@/components/motion";

type Lang = "en" | "zh" | "fr" | "ja";
const tx = (m: Partial<Record<Lang, string>>, lang: string) => m[lang as Lang] || m.en || "";

// Static fallback data for static deployment
const STATIC_EXPERTS = [
  {
    id: 1,
    nameEn: "Sarah Chen",
    nameZh: "陈莎",
    titleEn: "AI Strategy Coach",
    titleZh: "AI战略教练",
    roleEn: "L3 Titan",
    roleZh: "L3泰坦",
    bioEn: "Former McKinsey partner, 15+ years in AI transformation. Helped 50+ enterprises achieve productivity gains.",
    bioZh: "前麦肯锡合伙人，15年AI转型经验。帮助50多家企业实现生产力提升。",
  },
  {
    id: 2,
    nameEn: "Michael Zhang",
    nameZh: "张明远",
    titleEn: "Blockchain Architect",
    titleZh: "区块链架构师",
    roleEn: "L2 Pro",
    roleZh: "L2 Pro",
    bioEn: "Web3 pioneer, led development of 3 major DeFi protocols. Specializes in decentralized governance.",
    bioZh: "Web3先驱，主导开发3个主要DeFi协议。专注去中心化治理。",
  },
  {
    id: 3,
    nameEn: "Lisa Wang",
    nameZh: "王丽萨",
    titleEn: "Growth Marketing Expert",
    titleZh: "增长营销专家",
    roleEn: "L2 Principal",
    roleZh: "L2首席",
    bioEn: "Scaled 3 startups from 0 to $10M ARR. Expert in cross-border e-commerce.",
    bioZh: "从零到千万ARR成功打造3家创业公司。跨境电商专家。",
  },
];

const STATIC_PARTNERS = [
  {
    id: 1,
    type: "coach" as const,
    nameEn: "OPC Global Coach Network",
    nameZh: "OPC全球教练网络",
    descriptionEn: "Connecting aspiring OPC members with certified coaches worldwide.",
    descriptionZh: "连接全球认证教练与有抱负的OPC成员。",
    websiteUrl: null,
    contactEmail: "coaches@opcglobal.ai",
  },
  {
    id: 2,
    type: "organization" as const,
    nameEn: "Global Tech Alliance",
    nameZh: "全球科技联盟",
    descriptionEn: "Technology ecosystem partnership for OPC infrastructure.",
    descriptionZh: "OPC基础设施技术生态合作。",
    websiteUrl: "https://example.com",
    contactEmail: null,
  },
];

export default function Alliance() {
  const { language } = useLanguage();
  const { data: apiPartners, isLoading: partnersLoading } = trpc.partners.getVisible.useQuery();
  const { data: apiExperts, isLoading: expertsLoading } = trpc.experts.visible.useQuery();

  // Use static fallback when API is unavailable (static deployment)
  const partners = apiPartners && apiPartners.length > 0 ? apiPartners : STATIC_PARTNERS;
  const experts = apiExperts && apiExperts.length > 0 ? apiExperts : STATIC_EXPERTS;
  const isLoading = partnersLoading && expertsLoading;

  const loc = (en?: string | null, zh?: string | null, fr?: string | null, ja?: string | null) => {
    const texts: Record<Lang, string | null | undefined> = { en, zh, fr, ja };
    return texts[language as Lang] || en || "";
  };

  const partnerTypeIcon = (type: string) => {
    switch (type) {
      case "coach": return <Users className="w-3.5 h-3.5" />;
      case "brand": return <Briefcase className="w-3.5 h-3.5" />;
      case "organization": return <Building2 className="w-3.5 h-3.5" />;
      default: return <Globe className="w-3.5 h-3.5" />;
    }
  };

  const partnerTypeBadge = (type: string) => {
    const labels: Record<string, Partial<Record<Lang, string>>> = {
      coach: { en: "Coach", zh: "\u6559\u7EC3" },
      brand: { en: "Brand", zh: "\u54C1\u724C" },
      organization: { en: "Organization", zh: "\u673A\u6784" },
    };
    return tx(labels[type] || { en: type }, language);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Use static data when API data is empty (static deployment)
  const displayPartners = partners && partners.length > 0 ? partners : STATIC_PARTNERS;
  const displayExperts = experts && experts.length > 0 ? experts : STATIC_EXPERTS;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[70vh] flex items-center section-deep-blue overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10 text-center py-24 md:py-32">
          <Reveal>
            <span className="badge-official mb-8 inline-block">
              <Handshake className="w-3 h-3 mr-1.5 inline" />
              OPC Alliance
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-white max-w-4xl mx-auto mb-6">
              {tx({
                zh: "全球标杆与生态伙伴",
                en: "Global Benchmarks & Ecosystem Partners",
              }, language)}
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
              {tx({
                zh: "一人公司不是孤军奋战。OPC 联盟汇聚全球最成功的超级个体案例、顶级教练团队和生态合作伙伴。",
                en: "One-person companies are not alone. OPC Alliance brings together the world\u2019s most successful super-individual cases, top coaching teams, and ecosystem partners.",
              }, language)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ CO-CREATION COACH TEAM ═══ */}
      <section className="section-padding bg-background">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "共创教练团", en: "Co-Creation Coach Team" }, language)}
            title={tx({ zh: "你的问责伙伴与成长催化剂", en: "Your Accountability Partner & Growth Catalyst" }, language)}
            subtitle={tx({
              zh: "OPC 教练不是传统讲师。他们是经过 L1-L3 认证的实战派，通过三角协作体模式，陪伴你从学习者成长为交付者。",
              en: "OPC coaches are not traditional lecturers. They are battle-tested practitioners certified through L1-L3, accompanying you from learner to deliverer.",
            }, language)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Target,
                title: { zh: "方法论传递", en: "Methodology Transfer" },
                desc: { zh: "将 0.5/3/2 范式和 LID 框架转化为你的日常工作流。不是理论课，是手把手带你做。", en: "Transform the 0.5/3/2 paradigm and LID framework into your daily workflow. Not theory \u2014 hands-on guidance." },
              },
              {
                icon: Shield,
                title: { zh: "陪伴式问责", en: "Accountability Companionship" },
                desc: { zh: "定期复盘、目标追踪、瓶颈突破。教练是你的镜子，帮你看到盲区。", en: "Regular reviews, goal tracking, bottleneck breakthroughs. Your coach is your mirror, revealing blind spots." },
              },
              {
                icon: Lightbulb,
                title: { zh: "资源对接", en: "Resource Matching" },
                desc: { zh: "连接生态内的专家导师、商业订单和协作伙伴。教练是你进入 OPC 宇宙的钥匙。", en: "Connecting you with expert mentors, commercial orders, and collaboration partners." },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-premium h-full">
                  <item.icon className="w-5 h-5 text-gold mb-4" />
                  <h3 className="text-base font-medium text-foreground mb-3">{tx(item.title, language)}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{tx(item.desc, language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GLOBAL BENCHMARKS ═══ */}
      <section className="section-padding bg-[oklch(0.98_0.003_250)]">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "全球标杆案例", en: "Global Benchmarks" }, language)}
            title={tx({ zh: "他们证明了这条路可行", en: "They Prove This Path Works" }, language)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Justin Welsh",
                region: { zh: "美国", en: "USA" },
                revenue: "$6.7M",
                desc: { zh: "LinkedIn个人品牌典范。系统化内容营销+数字产品矩阵，零员工。", en: "LinkedIn personal brand exemplar. Systematic content marketing + digital product matrix, zero employees." },
                insight: { zh: "证明知识型超级个体的收入天花板远超传统认知", en: "Proves knowledge super-individuals can far exceed traditional income ceilings" },
                tags: ["Content Marketing", "Digital Products"],
              },
              {
                name: "DesignJoy",
                region: { zh: "美国", en: "USA" },
                revenue: "$1.5M+",
                desc: { zh: "订阅制设计服务先驱。一人运营，异步工作流+订阅定价。", en: "Subscription design pioneer. One-person studio, async workflow + subscription pricing." },
                insight: { zh: "订阅制将不稳定的项目收入转化为可预测的现金流", en: "Subscription model converts unstable project income into predictable cash flow" },
                tags: ["Subscription", "Async Workflow"],
              },
              {
                name: "Pieter Levels",
                region: { zh: "荷兰", en: "Netherlands" },
                revenue: "$2.4M+",
                desc: { zh: "独立开发者标杆。NomadList、RemoteOK等多个百万级产品，全部一人运营。", en: "Indie dev benchmark. NomadList, RemoteOK \u2014 multiple million-dollar products, all solo." },
                insight: { zh: "快速验证 + 极致精简 = 一人帝国", en: "Rapid validation + extreme lean = one-person empire" },
                tags: ["Indie Dev", "SaaS"],
              },
              {
                name: tx({ zh: "中国案例群", en: "China Case Cluster" }, language),
                region: { zh: "中国", en: "China" },
                revenue: tx({ zh: "百万级", en: "\u00A51M+" }, language),
                desc: { zh: "知识付费、私域流量、AI内容创作、跨境电商\u2014\u2014微信生态+短视频平台的独特路径。", en: "Knowledge economy, private traffic, AI content, cross-border e-commerce \u2014 unique WeChat + short video path." },
                insight: { zh: "中国市场规模 + AI工具普及 = 最大的OPC增长极", en: "China market scale + AI tool adoption = largest OPC growth pole" },
                tags: ["Knowledge Economy", "AI Creation"],
              },
            ].map((cs, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-premium h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-base font-medium text-foreground">{cs.name}</h3>
                      <span className="text-xs text-muted-foreground/75 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {tx(cs.region, language)}
                      </span>
                    </div>
                    <span className="text-xl font-medium text-gold" style={{ fontFamily: "var(--font-heading)" }}>
                      {cs.revenue}
                    </span>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed mb-4">{tx(cs.desc, language)}</p>
                  <div className="pt-3 border-t border-border/40 flex items-start gap-2 mb-4">
                    <Lightbulb className="w-3.5 h-3.5 text-gold/60 shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/75 italic">{tx(cs.insight, language)}</p>
                  </div>
                  <div className="flex gap-2">
                    {cs.tags.map((tag, j) => (
                      <span key={j} className="text-xs px-2.5 py-1 border border-border rounded text-muted-foreground/75">{tag}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FACILITATORS — DB-driven ═══ */}
      {displayExperts && displayExperts.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container max-w-5xl">
            <SectionHeading
              label={tx({ zh: "共创教练团", en: "Co-Creation Coach Team" }, language)}
              title={tx({ zh: "你的成长伙伴", en: "Your Growth Partners" }, language)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayExperts.map((expert, i) => (
                <Reveal key={expert.id} delay={i * 0.08}>
                  <div className="card-premium h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-sm font-medium text-gold shrink-0" style={{ fontFamily: "var(--font-heading)" }}>
                        {(loc(expert.nameEn, expert.nameZh, expert.nameFr, expert.nameJa) || "?").charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-medium text-foreground truncate">
                          {loc(expert.nameEn, expert.nameZh, expert.nameFr, expert.nameJa)}
                        </h3>
                        <p className="text-xs text-muted-foreground/75 truncate">
                          {loc(expert.titleEn, expert.titleZh, expert.titleFr, expert.titleJa)}
                        </p>
                      </div>
                    </div>
                    {expert.roleEn && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium tracking-wider uppercase px-2 py-0.5 bg-gold/10 text-gold rounded mb-3">
                        <Sparkles className="w-2 h-2" />
                        {loc(expert.roleEn, expert.roleZh, expert.roleFr, expert.roleJa)}
                      </span>
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {loc(expert.bioEn, expert.bioZh, expert.bioFr, expert.bioJa)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ PARTNERS — DB-driven ═══ */}
      {displayPartners && displayPartners.length > 0 && (
        <section className="section-padding bg-[oklch(0.98_0.003_250)]">
          <div className="container max-w-5xl">
            <SectionHeading
              label={tx({ zh: "生态伙伴", en: "Ecosystem Partners" }, language)}
              title={tx({ zh: "共建超级个体生态", en: "Co-Building the Super-Individual Ecosystem" }, language)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayPartners.map((partner, i) => (
                <Reveal key={partner.id} delay={i * 0.08}>
                  <div className="card-premium h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg border border-gold/20 flex items-center justify-center shrink-0 text-gold/60">
                        {partnerTypeIcon(partner.type)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-medium text-foreground">
                          {loc(partner.nameEn, partner.nameZh, partner.nameFr, partner.nameJa)}
                        </h3>
                        <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground/75">
                          {partnerTypeBadge(partner.type)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {loc(partner.descriptionEn, partner.descriptionZh, partner.descriptionFr, partner.descriptionJa)}
                    </p>
                    <div className="flex gap-4">
                      {partner.websiteUrl && (
                        <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 transition-colors">
                          <ExternalLink className="w-3 h-3" />
                          {tx({ zh: "网站", en: "Website" }, language)}
                        </a>
                      )}
                      {partner.contactEmail && (
                        <a href={`mailto:${partner.contactEmail}`} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                          <Mail className="w-3 h-3" />
                          {tx({ zh: "联系", en: "Contact" }, language)}
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ HOW TO BECOME A PARTNER ═══ */}
      <section className="section-padding bg-background">
        <div className="container max-w-4xl">
          <SectionHeading
            label={tx({ zh: "合作路径", en: "Partnership Path" }, language)}
            title={tx({ zh: "如何成为 OPC 合伙人", en: "How to Become an OPC Partner" }, language)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                step: "01",
                title: { zh: "申请加入", en: "Apply" },
                desc: { zh: "提交申请，说明你的行业背景、资源优势和合作意向。", en: "Submit your application with industry background, resource strengths, and collaboration intent." },
              },
              {
                step: "02",
                title: { zh: "认证评估", en: "Assessment" },
                desc: { zh: "通过 OPC UNI 的教练认证评估，确保方法论对齐。", en: "Pass OPC UNI\u2019s coach certification assessment to ensure methodology alignment." },
              },
              {
                step: "03",
                title: { zh: "启动运营", en: "Launch" },
                desc: { zh: "获得独家区域权益，接入全球网络，开始培训+业务+分发复合收益。", en: "Receive exclusive territory rights, connect to the global network, and start composite revenue." },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="text-center">
                  <div className="stat-number mb-4">{item.step}</div>
                  <h3 className="text-base font-medium text-foreground mb-3">{tx(item.title, language)}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{tx(item.desc, language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REGIONAL PARTNER CTA ═══ */}
      <section className="section-padding section-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10 max-w-3xl text-center">
          <Reveal>
            <p className="section-label mb-4">
              {tx({ zh: "全球招募", en: "Global Recruitment" }, language)}
            </p>
            <h2 className="text-white mb-4">
              {tx({ zh: "地区合伙人计划", en: "Regional Partner Program" }, language)}
            </h2>
            <p className="text-sm text-white/65 mb-10 max-w-lg mx-auto">
              {tx({
                zh: "独家区域权益 \u00B7 培训+制作+分发复合收益 \u00B7 政策红利对接",
                en: "Exclusive territory rights \u00B7 Training + Production + Distribution revenue \u00B7 Policy incentive alignment",
              }, language)}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex justify-center gap-10 mb-12">
              {[
                { icon: Globe, label: { zh: "独家区域权益", en: "Exclusive Territory" } },
                { icon: DollarSign, label: { zh: "复合收益模式", en: "Composite Revenue" } },
                { icon: Handshake, label: { zh: "全球网络接入", en: "Global Network" } },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center">
                    <b.icon className="w-4 h-4 text-gold/60" />
                  </div>
                  <span className="text-xs text-white/70">{tx(b.label, language)}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/partner-apply">
                <button className="btn-gold">
                  <span className="flex items-center gap-2">
                    {tx({ zh: "申请成为合伙人", en: "Apply to Become a Partner" }, language)}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </Link>
              <a href="mailto:hi@opcglobal.ai">
                <button className="btn-outline-gold">
                  <span>{tx({ zh: "联系我们", en: "Contact Us" }, language)}</span>
                </button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
