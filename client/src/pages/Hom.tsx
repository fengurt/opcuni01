import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeading, Counter } from "@/components/motion";
import { Link } from "wouter";

type Lang = "en" | "zh" | "fr" | "ja";
const tx = (t: Partial<Record<Lang, string>>, lang: string) =>
  t[lang as Lang] || t.en || "";

export default function Hom() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[70vh] flex items-center section-deep-blue overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        <div className="container relative z-10 text-center py-24 md:py-32">
          <Reveal>
            <span className="badge-official mb-8 inline-block">OPC HOM</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-white max-w-4xl mx-auto mb-6">
              {tx({
                zh: "生态的核心物理与数字接口",
                en: "The Core Physical & Digital Interface",
              }, language)}
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-4">
              {tx({
                zh: "让一切不停留在线上，为超级个体提供全方位的支持",
                en: "Bringing everything beyond the screen, providing all-round support for super-individuals",
              }, language)}
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="text-white/55 text-sm max-w-md mx-auto">
              {tx({
                zh: "HOM \u2014\u2014 取自宇宙本源之音 Om，象征同频共振",
                en: "HOM \u2014 from the cosmic sound \u2018Om\u2019, symbolizing resonance",
              }, language)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOUR CORE FUNCTIONS ═══ */}
      <section className="section-padding bg-background">
        <div className="container">
          <SectionHeading
            label={tx({ zh: "四大核心功能", en: "Four Core Functions" }, language)}
            title={tx({ zh: "你在 OPC HOM 能获得什么", en: "What You Get at OPC HOM" }, language)}
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                num: "01",
                title: { zh: "数字平台", en: "Digital Platform" },
                tagline: { zh: "超级个体的\u201C外骨骼\u201D", en: "The \u201CExoskeleton\u201D for Super-Individuals" },
                desc: {
                  zh: "通过自研的全球订单分发与合规分账系统，将税务、法务等行政事务自动化，确保\u201C所学即所赚\u201D。",
                  en: "Through our proprietary global order distribution and compliant settlement system, automating tax, legal, and administrative affairs.",
                },
                features: [
                  { zh: "全球订单分发引擎", en: "Global order distribution engine" },
                  { zh: "合规分账与自动税务", en: "Compliant settlement & auto-tax" },
                  { zh: "AI 驱动的项目匹配", en: "AI-driven project matching" },
                ],
              },
              {
                num: "02",
                title: { zh: "心灵港湾", en: "Soul Harbor" },
                tagline: { zh: "对抗数字游民的原子化孤独", en: "Combating Atomized Loneliness" },
                desc: {
                  zh: "提供心理安全感社区与身心韧性护航，重建真实的\u201C友爱\u201D连接。不只是工作平台，更是你的精神家园。",
                  en: "Providing a psychologically safe community and mind-body resilience support, rebuilding genuine connections.",
                },
                features: [
                  { zh: "心理疗愈与身心韧性", en: "Mental wellness & resilience" },
                  { zh: "Mastermind 智囊团", en: "Mastermind peer groups" },
                  { zh: "跨文化社群连接", en: "Cross-cultural community bonds" },
                ],
              },
              {
                num: "03",
                title: { zh: "线下空间赋能", en: "Physical Space Empowerment" },
                tagline: { zh: "OPC 区域服务中心", en: "OPC Regional Service Centers" },
                desc: {
                  zh: "联合全球存量地产与文旅资产，挂牌成立\u201COPC 区域服务中心\u201D。引入动态分账机制与 AI 空间主理人驻场。",
                  en: "Partnering with global real estate to establish OPC Regional Service Centers with dynamic revenue sharing and AI space managers.",
                },
                features: [
                  { zh: "高算力PC、绿幕直播间、动捕设备", en: "High-compute PCs, studios, motion capture" },
                  { zh: "定期 Demo Day 路演日", en: "Regular Demo Day showcases" },
                  { zh: "动态分账替代固定租金", en: "Dynamic revenue share replaces rent" },
                ],
              },
              {
                num: "04",
                title: { zh: "逆向收费模式", en: "Reverse Charging Model" },
                tagline: { zh: "颠覆性商业模式", en: "Disruptive Business Model" },
                desc: {
                  zh: "B端/G端先行付费，C端个体零门槛入驻，仅在成功接单并获利后，系统自动划扣小比例佣金。",
                  en: "B-side/G-side pays first, individuals join at zero cost. Commission only after successful earnings.",
                },
                features: [
                  { zh: "C端零门槛入驻", en: "Zero-cost entry for individuals" },
                  { zh: "成功后才分佣", en: "Commission only on success" },
                  { zh: "人人可参与的超级个体运动", en: "A movement everyone can join" },
                ],
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-premium h-full">
                  <span className="text-xs text-muted-foreground/70 tracking-[0.25em] font-medium">{item.num}</span>
                  <h3 className="text-xl text-foreground mt-3 mb-1">
                    {tx(item.title, language)}
                  </h3>
                  <p className="text-sm text-gold mb-4">
                    {tx(item.tagline, language)}
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed mb-5">
                    {tx(item.desc, language)}
                  </p>
                  <ul className="space-y-2">
                    {item.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-foreground/85">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold/50 shrink-0" />
                        {tx(f, language)}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OFFLINE LOCATIONS ═══ */}
      <section className="section-padding section-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay pointer-events-none opacity-30" />
        <div className="container relative z-10">
          <SectionHeading
            label={tx({ zh: "线下体验", en: "Offline Experience" }, language)}
            title={tx({ zh: "OPC HOM 第一期线下体验点", en: "OPC HOM Phase 1 Locations" }, language)}
            dark
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                city: { zh: "上海长宁区", en: "Shanghai Changning" },
                name: { zh: "IGS", en: "IGS" },
                address: { zh: "上海长宁区", en: "Changning District, Shanghai" },
                desc: { zh: "智能科技与创新创业体验中心", en: "Smart Tech & Innovation Hub" },
              },
              {
                city: { zh: "北京", en: "Beijing" },
                name: { zh: "北大博雅国际酒店", en: "PKU Boya International Hotel" },
                address: { zh: "北京中关村", en: "Zhongguancun, Beijing" },
                desc: { zh: "高端商务与科创交流空间", en: "Premium Business & Tech Space" },
              },
              {
                city: { zh: "澳门", en: "Macau" },
                name: { zh: "文化创新中心", en: "Cultural Innovation Center" },
                address: { zh: "澳门", en: "Macau" },
                desc: { zh: "文化创意与跨境合作平台", en: "Cultural Creative & Cross-border Hub" },
              },
            ].map((loc, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glass-card-dark p-6 md:p-8 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-gold/60 shrink-0" />
                    <span className="text-xs text-gold/60 tracking-wider uppercase">{tx(loc.city, language)}</span>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    {tx(loc.name, language)}
                  </h3>
                  <p className="text-sm text-white/60 mb-3">
                    {tx(loc.address, language)}
                  </p>
                  <p className="text-sm text-white/50">
                    {tx(loc.desc, language)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW TO JOIN ═══ */}
      <section className="section-padding bg-background">
        <div className="container max-w-4xl">
          <SectionHeading
            label={tx({ zh: "如何开始", en: "How to Get Started" }, language)}
            title={tx({ zh: "三步加入 OPC HOM", en: "Join OPC HOM in Three Steps" }, language)}
          />

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                step: "01",
                title: { zh: "申请入驻", en: "Apply" },
                desc: {
                  zh: "通过官网或教练推荐提交申请。我们采用\u201C天鹅绒绳索\u201D申请制，寻找真正渴望改变的实干家。",
                  en: "Submit via our website or coach referral. We use a \u201Cvelvet rope\u201D process, seeking doers who truly want change.",
                },
              },
              {
                step: "02",
                title: { zh: "匹配教练", en: "Match with Coach" },
                desc: {
                  zh: "根据你的行业背景和目标，系统匹配最适合的教练合伙人。教练将成为你的问责伙伴。",
                  en: "Based on your industry and goals, the system matches you with the ideal Coach Partner.",
                },
              },
              {
                step: "03",
                title: { zh: "接单实战", en: "Start Earning" },
                desc: {
                  zh: "在教练督导下接入真实商业订单。真刀实枪赚钱，用交付结果证明自己。",
                  en: "Access real commercial orders under coach supervision. Earn real money, prove yourself.",
                },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="text-center">
                  <div className="stat-number mb-4">{item.step}</div>
                  <h3 className="text-base font-medium text-foreground mb-3">
                    {tx(item.title, language)}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {tx(item.desc, language)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section-padding-sm bg-[oklch(0.98_0.003_250)]">
        <div className="container max-w-2xl text-center">
          <Reveal>
            <h2 className="text-foreground mb-4">
              {tx({ zh: "加入 OPC HOM 生态", en: "Join the OPC HOM Ecosystem" }, language)}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-muted-foreground mb-8">
              {tx({
                zh: "无论你是行业专家、教练合伙人还是渴望进化的个体，OPC HOM 都是你的起点。",
                en: "Whether you\u2019re an industry expert, coach partner, or an individual eager to evolve, OPC HOM is your starting point.",
              }, language)}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hi@opcglobal.ai">
                <button className="btn-gold">
                  <span className="flex items-center gap-2">
                    {tx({ zh: "立即申请", en: "Apply Now" }, language)}
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
