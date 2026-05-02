import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Scale, Database, Shield, Coins, Lock, Eye, FileCode,
  Users, Globe, Gavel, Cpu, BookOpen,
  MapPin, Trophy, ArrowRight, CheckCircle2
} from "lucide-react";
import { Reveal, SectionHeading, Counter } from "@/components/motion";

type Lang = "en" | "zh" | "fr" | "ja";
const tx = (t: Partial<Record<Lang, string>>, lang: string) =>
  t[lang as Lang] || t.en || "";

export default function Dao() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[70vh] flex items-center section-deep-blue overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10 text-center py-24 md:py-32">
          <Reveal>
            <span className="badge-official mb-8 inline-block">OPC DAO</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-white max-w-4xl mx-auto mb-6">
              {tx({
                zh: "灵魂 — 良知与共识治理",
                en: "The Soul \u2014 Conscience & Consensus Governance",
              }, language)}
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-4">
              {tx({
                zh: "确立从\u201C雇佣指令\u201D向\u201C按需液态协作\u201D范式转移的法理基础。确保真理掌握在贡献者手中。",
                en: "Establishing the legal foundation for the paradigm shift from employment commands to on-demand liquid collaboration.",
              }, language)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ PROJECT ALETHEIA ═══ */}
      <section className="section-padding bg-background">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "真理计划", en: "Project Aletheia" }, language)}
            title={tx({ zh: "\u201C活的\u201D实战知识库", en: "A \u201CLiving\u201D Practitioner Knowledge Base" }, language)}
            subtitle={tx({
              zh: "构建《OPC之道》\u2014\u2014将各赛道实战派的隐性知识结构化与资产化，填补通用 AI 的\u201C认知折叠区\u201D",
              en: "Building \u201CThe Way of OPC\u201D \u2014 structuring tacit knowledge from top practitioners, filling the cognitive fold zones of general AI",
            }, language)}
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Reveal>
              <div className="card-premium h-full">
                <BookOpen className="w-5 h-5 text-gold mb-4" />
                <h3 className="text-lg text-foreground mb-4">
                  {tx({ zh: "知识资产化", en: "Knowledge Assetization" }, language)}
                </h3>
                <ul className="space-y-3">
                  {[
                    { zh: "各赛道第一梯队实战派的隐性知识", en: "Tacit knowledge from top-tier practitioners" },
                    { zh: "AI 可读的结构化数据资产", en: "AI-readable structured data assets" },
                    { zh: "每次知识贡献 = 流量加权 + 微型版税", en: "Every contribution = traffic weighting + micro-royalties" },
                    { zh: "基于 Arweave 永久存储、抗审查、防篡改", en: "Arweave-based permanent, censorship-resistant storage" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-base text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-gold/50 shrink-0 mt-0.5" />
                      {tx(item, language)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="card-premium h-full">
                <Lock className="w-5 h-5 text-gold mb-4" />
                <h3 className="text-lg text-foreground mb-4">
                  {tx({ zh: "zkML 归因与微版税", en: "zkML Attribution & Micro-Royalties" }, language)}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {tx({
                    zh: "当 AI 使用你的知识生成回答时，zkML 零知识证明自动追溯来源，触发微版税支付。知识贡献者持续获益。",
                    en: "When AI uses your knowledge to generate answers, zkML zero-knowledge proofs automatically trace the source and trigger micro-royalty payments.",
                  }, language)}
                </p>
                <div className="flex items-center gap-3 text-xs text-gold/60 p-3 border border-gold/10 rounded-lg bg-gold/5">
                  <Cpu className="w-4 h-4 shrink-0" />
                  <span>{tx({ zh: "零知识证明 \u2192 自动溯源 \u2192 微版税支付", en: "ZK Proof \u2192 Auto-Attribution \u2192 Micro-Royalty" }, language)}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SMART CONTRACTS ═══ */}
      <section className="section-padding-sm bg-[oklch(0.98_0.003_250)]">
        <div className="container max-w-3xl text-center">
          <Reveal>
            <p className="section-label mb-4">
              {tx({ zh: "智能合约与秒级分账", en: "Smart Contracts & Instant Settlement" }, language)}
            </p>
            <h2 className="text-foreground mb-6">
              {tx({ zh: "项目交付即结算", en: "Delivery = Settlement" }, language)}
            </h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              {tx({
                zh: "项目交付拆解为里程碑，验收后资金瞬间、无摩擦地清分至协作者账户。告别\u201C甲方拖款\u201D时代。",
                en: "Delivery is broken into milestones. Upon acceptance, funds are instantly distributed to collaborators. No more payment delays.",
              }, language)}
            </p>
          </Reveal>
          <div className="flex justify-center gap-12 md:gap-16">
            {[
              { icon: FileCode, label: { zh: "里程碑拆解", en: "Milestone Breakdown" } },
              { icon: Shield, label: { zh: "自动验收", en: "Auto-Verification" } },
              { icon: Coins, label: { zh: "秒级清分", en: "Instant Settlement" } },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gold/60" />
                  </div>
                  <span className="text-sm text-muted-foreground">{tx(item.label, language)}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GOVERNANCE ═══ */}
      <section className="section-padding bg-background">
        <div className="container max-w-5xl">
          <SectionHeading
            label={tx({ zh: "治理机制", en: "Governance" }, language)}
            title={tx({ zh: "三元协作治理", en: "Tripartite Collaboration Governance" }, language)}
            subtitle={tx({
              zh: "共创教练、教练合伙人、OPC单元三层协同，确保生态高效运转",
              en: "Co-Creation Coaches, Coach Partners, and OPC Units work together to ensure ecosystem efficiency",
            }, language)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Users,
                title: { zh: "共创教练", en: "Co-Creation Coaches" },
                role: { zh: "领域专家与导师", en: "Domain Experts & Mentors" },
                desc: { zh: "提供专业指导、经验传承、知识贡献", en: "Provide professional guidance, experience transfer, knowledge contribution" },
              },
              {
                icon: Coins,
                title: { zh: "教练合伙人", en: "Coach Partners" },
                role: { zh: "项目最终责任人", en: "Project Final Decision Maker" },
                desc: { zh: "获取订单、管理关键关系、发展OPC生态、挖掘AI时代新岗位", en: "Secure orders, manage key relationships, develop OPC ecosystem, identify AI-era opportunities" },
              },
              {
                icon: Gavel,
                title: { zh: "OPC 单元", en: "OPC Units" },
                role: { zh: "超级个体合作单元", en: "Super-Individual Units" },
                desc: { zh: "由超级个体组成的合作单元，负责项目交付和服务", en: "Collaborative units of super-individuals responsible for delivery and service" },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-premium h-full text-center">
                  <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-5 h-5 text-gold/60" />
                  </div>
                  <h3 className="text-base font-medium text-foreground mb-2">{tx(item.title, language)}</h3>
                  <p className="text-xs text-gold/60 mb-3">{tx(item.role, language)}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tx(item.desc, language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GLOBAL EVENTS ═══ */}
      <section className="section-padding section-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10 max-w-4xl">
          <SectionHeading
            label={tx({ zh: "全球大会与比赛", en: "Global Events" }, language)}
            title={tx({ zh: "不是演讲大会，是真实交付的战场", en: "Not a Lecture \u2014 A Real Battlefield of Delivery" }, language)}
            dark
          />

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="glass-card-dark p-8 h-full">
                <Globe className="w-6 h-6 text-gold/70 mb-5" />
                <h3 className="text-lg font-medium text-white mb-2">
                  {tx({ zh: "OPC 全球峰会", en: "OPC Global Summit" }, language)}
                </h3>
                <p className="text-xs text-gold/65 mb-4">{tx({ zh: "年度 \u00B7 汇聚势能", en: "Annual \u00B7 Converging Momentum" }, language)}</p>
                <p className="text-base text-white/75 leading-relaxed">
                  {tx({
                    zh: "发布最新系统、展示年度成果、颁发泰坦荣誉。全球教练合伙人齐聚一堂，共同定义下一年的战略方向。",
                    en: "Releasing latest systems, showcasing annual achievements, awarding Titan honors. Defining next year\u2019s strategic direction.",
                  }, language)}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="glass-card-dark p-8 h-full">
                <Trophy className="w-6 h-6 text-gold/70 mb-5" />
                <h3 className="text-lg font-medium text-white mb-2">
                  {tx({ zh: "全球交付拉力赛", en: "Global Delivery Rally" }, language)}
                </h3>
                <p className="text-xs text-gold/65 mb-4">{tx({ zh: "季度 \u00B7 真刀实枪", en: "Quarterly \u00B7 Real Stakes" }, language)}</p>
                <p className="text-base text-white/75 leading-relaxed">
                  {tx({
                    zh: "以真实商业订单为考题，筛选最强悍的教练团队。不是模拟赛，是真金白银的交付竞技。",
                    en: "Using real commercial orders as the test, selecting the most formidable coaching teams. Real-money delivery competition.",
                  }, language)}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ CONSENSUS ISLANDS ═══ */}
      <section className="section-padding bg-background">
        <div className="container max-w-3xl text-center">
          <SectionHeading
            label={tx({ zh: "共识岛自治", en: "Consensus Islands" }, language)}
            title={tx({ zh: "全球标准，在地自治", en: "Global Standards, Local Autonomy" }, language)}
            subtitle={tx({
              zh: "在全球各地建立自治型社群节点，拥有独立的提案权与资源分配权",
              en: "Establishing autonomous community nodes worldwide, each with independent proposal rights and resource allocation",
            }, language)}
          />

          <div className="flex justify-center gap-8 md:gap-12 flex-wrap">
            {[
              { icon: MapPin, label: { zh: "独立提案权", en: "Independent Proposals" } },
              { icon: Coins, label: { zh: "资源分配权", en: "Resource Allocation" } },
              { icon: Globe, label: { zh: "全球标准", en: "Global Standards" } },
              { icon: Users, label: { zh: "在地自治", en: "Local Autonomy" } },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-gold/60" />
                  </div>
                  <span className="text-sm text-muted-foreground">{tx(item.label, language)}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THREE-LAYER ARCHITECTURE ═══ */}
      <section className="section-padding section-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10 max-w-4xl">
          <SectionHeading
            label={tx({ zh: "三层技术架构", en: "Three-Layer Architecture" }, language)}
            title={tx({ zh: "技术 \u00B7 治理 \u00B7 经济", en: "Technology \u00B7 Governance \u00B7 Economics" }, language)}
            dark
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Database,
                title: { zh: "技术层", en: "Technology" },
                desc: { zh: "Arweave永久存储 + WeaveDB高频逻辑 + Glacier向量索引", en: "Arweave permanent storage + WeaveDB high-freq logic + Glacier vector indexing" },
                techs: "Arweave \u00B7 Irys \u00B7 WeaveDB",
              },
              {
                icon: Shield,
                title: { zh: "治理层", en: "Governance" },
                desc: { zh: "Optimism声誉治理 + Gitcoin反女巫验证 + Kleros去中心化仲裁", en: "Optimism reputation + Gitcoin anti-Sybil + Kleros decentralized arbitration" },
                techs: "Optimism \u00B7 Gitcoin \u00B7 Kleros",
              },
              {
                icon: Coins,
                title: { zh: "经济层", en: "Economic" },
                desc: { zh: "开曼基金会公司 + 资产锁定 + RWA投资全球指数", en: "Cayman Foundation + asset lock + RWA global index investment" },
                techs: "Backed Finance \u00B7 Ondo Finance",
              },
            ].map((layer, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glass-card-dark p-6 md:p-8 h-full">
                  <layer.icon className="w-5 h-5 text-gold/70 mb-4" />
                  <h3 className="text-base font-medium text-white mb-3">{tx(layer.title, language)}</h3>
                  <p className="text-sm text-white/65 leading-relaxed mb-4">{tx(layer.desc, language)}</p>
                  <p className="text-xs text-white/50 tracking-wide">{layer.techs}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW TO CONTRIBUTE ═══ */}
      <section className="section-padding bg-background">
        <div className="container max-w-4xl">
          <SectionHeading
            label={tx({ zh: "如何参与", en: "How to Contribute" }, language)}
            title={tx({ zh: "你的贡献路径", en: "Your Contribution Path" }, language)}
          />

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                step: "01",
                title: { zh: "贡献知识", en: "Contribute Knowledge" },
                desc: { zh: "将你的行业隐性知识结构化提交到真理计划。每次被引用都会触发微版税。", en: "Submit your tacit knowledge to Project Aletheia. Every citation triggers micro-royalties." },
                icon: BookOpen,
              },
              {
                step: "02",
                title: { zh: "参与治理", en: "Participate in Governance" },
                desc: { zh: "通过公民之家提交提案、投票、策展知识。你的声誉决定你的治理权重。", en: "Submit proposals, vote, and curate knowledge through Citizen House." },
                icon: Gavel,
              },
              {
                step: "03",
                title: { zh: "建立共识岛", en: "Establish a Consensus Island" },
                desc: { zh: "在你的城市或领域建立自治社群节点。拥有独立提案权和资源分配权。", en: "Establish an autonomous community node in your city or domain." },
                icon: MapPin,
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

      {/* ═══ CORE PRINCIPLES ═══ */}
      <section className="section-padding-sm bg-[oklch(0.98_0.003_250)]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
            {[
              { icon: Lock, label: { zh: "数据主权", en: "Data Sovereignty" } },
              { icon: Eye, label: { zh: "反女巫溯源", en: "Anti-Sybil" } },
              { icon: Scale, label: { zh: "非营利驱动", en: "Non-Profit" } },
              { icon: FileCode, label: { zh: "完全透明", en: "Full Transparency" } },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center">
                    <p.icon className="w-4 h-4 text-gold/60" />
                  </div>
                  <span className="text-sm text-foreground/70">{tx(p.label, language)}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section-padding-sm bg-background">
        <div className="container max-w-2xl text-center">
          <Reveal>
            <h2 className="text-foreground mb-4">
              {tx({ zh: "加入 OPC DAO 运动", en: "Join the OPC DAO Movement" }, language)}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-muted-foreground mb-8">
              {tx({
                zh: "无论你是知识贡献者、治理参与者还是社区建设者，OPC DAO 都欢迎你的加入。",
                en: "Whether you\u2019re a knowledge contributor, governance participant, or community builder, OPC DAO welcomes you.",
              }, language)}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hi@opcglobal.ai">
                <button className="btn-gold">
                  <span className="flex items-center gap-2">
                    {tx({ zh: "了解更多", en: "Learn More" }, language)}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </a>
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
