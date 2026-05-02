import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Sparkles, Brain, Home, Scale, ArrowRight, User, Building2,
  Rocket, Heart, Lightbulb, Shield, Globe, BookOpen,
  RefreshCw, Layers, ScrollText
} from "lucide-react";
import { Link } from "wouter";
import { Reveal, SectionHeading } from "@/components/motion";

type Lang = "en" | "zh" | "fr" | "ja";
const tx = (t: Partial<Record<Lang, string>>, lang: string) =>
  t[lang as Lang] || t.en || "";

export default function Universe() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden" style={{ background: "linear-gradient(180deg, oklch(0.12 0.02 250) 0%, oklch(0.08 0.015 250) 100%)" }}>
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10 text-center py-24 md:py-32">
          <Reveal>
            <span className="badge-official mb-8 inline-block">
              <Sparkles className="w-3 h-3 mr-1.5 inline" />
              {tx({ zh: "终极愿景", en: "Ultimate Vision" }, language)}
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-white max-w-4xl mx-auto mb-6">OPC UNIverse</h1>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
              {tx({
                zh: "一个开放、公平、友爱、创新的超级个体生态系统。三大支柱协同运转，为每一个渴望改变的个体提供完整的成长与变现路径。",
                en: "An open, fair, fraternal, and innovative super-individual ecosystem. Three pillars in synergy, providing every individual a complete path for growth and monetization.",
              }, language)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ THREE PILLARS ═══ */}
      <section className="section-padding bg-background">
        <div className="container">
          <SectionHeading
            label={tx({ zh: "三大核心支柱", en: "The Three Pillars" }, language)}
            title={tx({ zh: "身体 \u00B7 智慧 \u00B7 灵魂", en: "Body \u00B7 Mind \u00B7 Soul" }, language)}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Home, title: "OPC HOM",
                role: { zh: "身体\u2014\u2014基础设施与栖息地", en: "The Body \u2014 Infrastructure & Habitat" },
                desc: { zh: "数字平台、心灵港湾、线下空间\u2014\u2014超级个体的全方位支持系统。", en: "Digital platform, soul harbor, physical spaces \u2014 all-round support." },
                link: "/hom",
              },
              {
                icon: Brain, title: "OPC UNI",
                role: { zh: "智慧\u2014\u2014教育与智能中台", en: "The Mind \u2014 Education & Intelligence" },
                desc: { zh: "AI校长、数字外骨骼、L1-L3认证\u2014\u2014将学习者转化为交付者。", en: "AI principal, digital exoskeleton, L1-L3 certification \u2014 learners become deliverers." },
                link: "/uni",
              },
              {
                icon: Scale, title: "OPC DAO",
                role: { zh: "灵魂\u2014\u2014治理与共识机制", en: "The Soul \u2014 Governance & Consensus" },
                desc: { zh: "真理计划、智能合约、双院制治理\u2014\u2014确保真理在贡献者手中。", en: "Project Aletheia, smart contracts, dual-chamber governance \u2014 truth in contributors\u2019 hands." },
                link: "/dao",
              },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <Link href={p.link}>
                  <div className="card-premium h-full flex flex-col items-center text-center cursor-pointer group">
                    <div className="w-14 h-14 rounded-full border border-gold/20 flex items-center justify-center mb-5 group-hover:border-gold/40 transition-colors">
                      <p.icon className="w-6 h-6 text-gold/60" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-1 group-hover:text-gold transition-colors" style={{ fontFamily: "var(--font-heading)" }}>{p.title}</h3>
                    <p className="text-xs text-gold/50 mb-3">{tx(p.role, language)}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{tx(p.desc, language)}</p>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/20 mt-5 group-hover:text-gold/60 transition-colors" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THREE LAWS ═══ */}
      <section className="section-padding bg-[oklch(0.98_0.003_250)]">
        <div className="container max-w-4xl">
          <SectionHeading
            label={tx({ zh: "OPC 三大定律", en: "The Three Laws of OPC" }, language)}
            title={tx({ zh: "生态运行的底层逻辑", en: "The Foundational Logic of the Ecosystem" }, language)}
          />

          <div className="space-y-5">
            {[
              {
                num: "I",
                title: { zh: "交付定律", en: "The Delivery Law" },
                desc: { zh: "一切以真实商业交付为唯一衡量标准。不看学历、不看履历、不看粉丝数\u2014\u2014只看你能不能把活儿交付好。", en: "Real commercial delivery is the sole measure. Not degrees, not resumes, not follower counts \u2014 only whether you can deliver." },
              },
              {
                num: "II",
                title: { zh: "液态定律", en: "The Liquid Law" },
                desc: { zh: "告别固定团队。超级个体根据项目需求实时组队，完成即解散。如同水一样，根据容器塑形。", en: "No fixed teams. Super-individuals assemble in real-time by project needs, disbanding upon completion. Like water, taking the shape of the container." },
              },
              {
                num: "III",
                title: { zh: "共生定律", en: "The Symbiosis Law" },
                desc: { zh: "生态内每一次知识贡献都被记录并转化为微版税。你帮助生态成长，生态持续回馈你。", en: "Every knowledge contribution is recorded and converted into micro-royalties. You help the ecosystem grow, the ecosystem continuously rewards you." },
              },
            ].map((law, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-premium">
                  <div className="flex items-start gap-6">
                    <span className="text-3xl font-bold text-gradient-gold shrink-0" style={{ fontFamily: "var(--font-heading)" }}>{law.num}</span>
                    <div>
                      <h3 className="text-base font-medium text-foreground mb-2">{tx(law.title, language)}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tx(law.desc, language)}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOUR-LAYER FLYWHEEL ═══ */}
      <section className="section-padding bg-background">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "四层飞轮", en: "Four-Layer Flywheel" }, language)}
            title={tx({ zh: "生态自增长引擎", en: "Ecosystem Self-Growth Engine" }, language)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: { zh: "培训获客", en: "Training Acquisition" },
                desc: { zh: "通过 OPC UNI 的认证课程吸引个体加入生态。教育即入口。", en: "Attract individuals through OPC UNI certification. Education is the entry point." },
                icon: BookOpen,
              },
              {
                step: "02",
                title: { zh: "业务升单", en: "Business Upsell" },
                desc: { zh: "认证教练带领学员接入真实商业订单。学习者变为交付者。", en: "Certified coaches lead learners into real commercial orders. Learners become deliverers." },
                icon: Rocket,
              },
              {
                step: "03",
                title: { zh: "知识沉淀", en: "Knowledge Accumulation" },
                desc: { zh: "交付经验沉淀为真理计划知识库。隐性知识变为生态资产。", en: "Delivery experience accumulates in Project Aletheia. Tacit knowledge becomes ecosystem assets." },
                icon: Layers,
              },
              {
                step: "04",
                title: { zh: "生态扩张", en: "Ecosystem Expansion" },
                desc: { zh: "知识资产吸引更多专家和企业加入。飞轮越转越快。", en: "Knowledge assets attract more experts and enterprises. The flywheel spins faster." },
                icon: Globe,
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-premium h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-gold/60" />
                    </div>
                    <div>
                      <p className="text-xs text-gold/65 font-mono">{item.step}</p>
                      <h3 className="text-base font-medium text-foreground">{tx(item.title, language)}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tx(item.desc, language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THEORETICAL FOUNDATION ═══ */}
      <section className="section-padding section-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10 max-w-4xl">
          <SectionHeading
            label={tx({ zh: "理论基础", en: "Theoretical Foundation" }, language)}
            title={tx({ zh: "站在巨人的肩膀上", en: "Standing on the Shoulders of Giants" }, language)}
            dark
          />

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="glass-card-dark p-8 h-full">
                <h3 className="text-lg font-medium text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  {tx({ zh: "科斯的逆转", en: "Coase\u2019s Inversion" }, language)}
                </h3>
                <p className="text-sm text-white/65 leading-relaxed">
                  {tx({
                    zh: "1937年科斯揭示企业存在是因为市场交易成本太高。AI将搜寻、议价、监督成本压至趋零\u2014\u2014企业存在的经济学基础正在崩塌。超级个体时代的底层逻辑由此成立。",
                    en: "Coase (1937) showed firms exist because market transaction costs are high. AI compresses search, negotiation, and monitoring costs to near-zero \u2014 the economic foundation of firms is collapsing.",
                  }, language)}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="glass-card-dark p-8 h-full">
                <h3 className="text-lg font-medium text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  {tx({ zh: "锯齿状前沿", en: "The Jagged Frontier" }, language)}
                </h3>
                <p className="text-sm text-white/65 leading-relaxed">
                  {tx({
                    zh: "哈佛/BCG研究：AI能力非均匀分布。边界内任务效率+25.1%、质量+40%；弱势领域提升+43%。关键是人+AI如何在锯齿前沿上协作\u2014\u2014这正是OPC教练体系解决的核心问题。",
                    en: "Harvard/BCG research: AI capabilities are unevenly distributed. +25.1% efficiency, +40% quality on frontier tasks. The key is Human + AI collaboration on the jagged frontier \u2014 exactly what OPC\u2019s coaching system solves.",
                  }, language)}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ TRIANGLE COLLABORATION ═══ */}
      <section className="section-padding bg-background">
        <div className="container max-w-4xl">
          <SectionHeading
            label={tx({ zh: "协作模型", en: "Collaboration Model" }, language)}
            title={tx({ zh: "三角协作体", en: "Triangle Collaboration" }, language)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: { zh: "专家导师", en: "Expert Mentor" },
                desc: { zh: "提供行业深度与实战经验。各赛道第一梯队的实战派。", en: "Industry depth & battle-tested experience. Top-tier practitioners in every vertical." },
              },
              {
                label: { zh: "OPC 教练", en: "OPC Coach" },
                desc: { zh: "方法论传递与陪伴成长。你的问责伙伴和成长催化剂。", en: "Methodology transfer & growth companionship. Your accountability partner." },
              },
              {
                label: { zh: "OPC 单元", en: "OPC Unit" },
                desc: { zh: "超级个体执行与价值创造。在真实订单中证明自己。", en: "Super-individual execution & value creation. Prove yourself through real orders." },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-premium h-full text-center">
                  <h3 className="text-base font-medium text-foreground mb-3">{tx(item.label, language)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tx(item.desc, language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ORG STRUCTURE ═══ */}
      <section className="section-padding-sm bg-[oklch(0.98_0.003_250)]">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "组织架构", en: "Organizational Structure" }, language)}
            title={tx({ zh: "全球三级网络", en: "Three-Tier Global Network" }, language)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Building2, title: "OPC HQ", sub: { zh: "全球总部 \u00B7 新加坡", en: "Global HQ \u00B7 Singapore" }, desc: { zh: "品牌管理、战略规划、技术平台、全球协调", en: "Brand, strategy, tech platform, global coordination" } },
              { icon: Globe, title: "OPC ROC", sub: { zh: "区域运营中心", en: "Regional Operations Center" }, desc: { zh: "本地化运营、教练培训、社区管理、合规对接", en: "Localized ops, coach training, community, compliance" } },
              { icon: Home, title: "OPC Home", sub: { zh: "城市级共创空间", en: "City-Level Co-Creation Space" }, desc: { zh: "物理办公、工作坊沙龙、资源对接、社区归属", en: "Physical office, workshops, resource matching, belonging" } },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-premium h-full text-center">
                  <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center mx-auto mb-4">
                    <p.icon className="w-5 h-5 text-gold/60" />
                  </div>
                  <h3 className="text-base font-medium text-foreground mb-1">{p.title}</h3>
                  <p className="text-xs text-gold/65 mb-3">{tx(p.sub, language)}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tx(p.desc, language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EVOLUTION PATH ═══ */}
      <section className="section-padding-sm bg-background">
        <div className="container text-center">
          <Reveal>
            <p className="section-label mb-12">
              {tx({ zh: "进化路径", en: "Evolution Path" }, language)}
            </p>
          </Reveal>
          <div className="flex items-center justify-center gap-8 md:gap-14">
            {[
              { icon: User, label: { zh: "OPC 超级个体", en: "OPC Super Individual" } },
              { icon: Building2, label: { zh: "OPE 一人企业家", en: "OPE One-Person Entrepreneur" } },
              { icon: Rocket, label: { zh: "OPU 个体独角兽", en: "OPU One-Person Unicorn" } },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="flex items-center gap-6 md:gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border border-gold/20 flex items-center justify-center">
                      <s.icon className="w-6 h-6 text-gold/60" />
                    </div>
                    <span className="mt-3 text-xs font-medium text-foreground/70 text-center max-w-[90px]">{tx(s.label, language)}</span>
                  </div>
                  {i < 2 && <ArrowRight className="w-4 h-4 text-muted-foreground/50 hidden md:block" />}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CORE VALUES ═══ */}
      <section className="section-padding section-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10 max-w-2xl text-center">
          <Reveal>
            <div className="flex justify-center gap-10 mb-10">
              {[
                { icon: BookOpen, label: { zh: "求真", en: "Truth" } },
                { icon: Shield, label: { zh: "自主", en: "Autonomy" } },
                { icon: Heart, label: { zh: "利他", en: "Altruism" } },
                { icon: Lightbulb, label: { zh: "共生", en: "Symbiosis" } },
              ].map((v, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <v.icon className="w-5 h-5 text-gold/60" />
                  <span className="text-xs text-white/50">{tx(v.label, language)}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="section-divider mb-8" />
            <p className="text-xl md:text-2xl font-medium text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              {tx({
                zh: "\u300C善用 AI 者得天下\u300D",
                en: "\"Those who master AI shall lead the world\"",
              }, language)}
            </p>
            <p className="text-sm text-white/55">
              {tx({
                zh: "每一个微小的个体都能通过 OPC+X 的赋能，发出属于自己的本源之音。",
                en: "Every individual can emit their own primordial sound through OPC+X empowerment.",
              }, language)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section-padding-sm bg-background">
        <div className="container max-w-2xl text-center">
          <Reveal>
            <h2 className="text-foreground mb-4">
              {tx({ zh: "加入 OPC 宇宙", en: "Join the OPC Universe" }, language)}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-muted-foreground mb-8">
              {tx({
                zh: "无论你是想学习、想赚钱、想贡献知识还是想参与治理，OPC 宇宙都有你的位置。",
                en: "Whether you want to learn, earn, contribute knowledge, or participate in governance, the OPC Universe has a place for you.",
              }, language)}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hi@opcglobal.ai">
                <button className="btn-gold">
                  <span className="flex items-center gap-2">
                    {tx({ zh: "加入宇宙", en: "Join the Universe" }, language)}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </a>
              <Link href="/alliance">
                <button className="btn-outline-gold">
                  <span>{tx({ zh: "探索联盟", en: "Explore Alliance" }, language)}</span>
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
