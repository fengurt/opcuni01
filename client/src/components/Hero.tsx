import { ArrowRight, ChevronRight, Globe, Database, Star, ShoppingCart, Shield, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal, Counter, SectionHeading } from "@/components/motion";
import { motion } from "motion/react";
import { Link } from "wouter";

type Lang = "en" | "zh" | "fr" | "ja";
const tx = (t: Partial<Record<Lang, string>>, lang: string) =>
  t[lang as Lang] || t.en || "";

/* ═══ Background Glow ═══ */
function GlowOrbs({ variant = "hero" }: { variant?: "hero" | "dark" | "bridge" }) {
  const configs = {
    hero: [
      { cx: "15%", cy: "25%", r: 180, color: "oklch(0.62 0.1 75 / 0.04)" },
      { cx: "80%", cy: "60%", r: 220, color: "oklch(0.35 0.08 250 / 0.06)" },
    ],
    dark: [
      { cx: "20%", cy: "40%", r: 200, color: "oklch(0.62 0.1 75 / 0.03)" },
      { cx: "75%", cy: "30%", r: 160, color: "oklch(0.30 0.06 250 / 0.05)" },
    ],
    bridge: [
      { cx: "50%", cy: "30%", r: 250, color: "oklch(0.62 0.1 75 / 0.05)" },
      { cx: "20%", cy: "70%", r: 180, color: "oklch(0.40 0.08 250 / 0.04)" },
    ],
  };
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {configs[variant].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.cx, top: orb.cy,
            width: `${orb.r * 2}px`, height: `${orb.r * 2}px`,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
        />
      ))}
    </div>
  );
}

/* ═══ Hero ═══ */
export default function Hero() {
  const { language } = useLanguage();

  return (
    <div>
      {/* ── Frame 1: Title ── */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[oklch(0.13_0.02_250)] via-[oklch(0.15_0.02_250)] to-[oklch(0.18_0.02_250)]">
        <GlowOrbs variant="hero" />
        <div className="container relative z-10 text-center">
          <Reveal delay={0.3}>
            <h1
              className="text-white tracking-[0.12em]"
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 300, lineHeight: 1.1 }}
            >
              {tx({ zh: "\u667a\u542f\u81ea\u7531", en: "Empower", ja: "\u667a\u5553\u81ea\u7531", fr: "Libert\u00e9" }, language)}
            </h1>
          </Reveal>
          <Reveal delay={0.6}>
            <p className="text-white/50 text-lg tracking-[0.15em] mt-6" style={{ fontFamily: "var(--font-body)" }}>
              {tx({ zh: "\u5584\u7528 AI\uff0c\u7ec8\u83b7\u81ea\u7531", en: "Master AI, Achieve Freedom" }, language)}
            </p>
          </Reveal>
        </div>
        <Reveal delay={1.2}>
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </Reveal>
      </section>

      {/* ── Frame 2: Marx Quote (condensed to 3 beats) ── */}
      <section className="relative bg-[oklch(0.18_0.02_250)] overflow-hidden">
        <GlowOrbs variant="dark" />
        <div className="container max-w-3xl py-20 md:py-28 relative z-10">
          {/* Beat 1: The original quote */}
          <Reveal>
            <blockquote className="relative pl-6 border-l-2 border-gold/30">
              <p className="text-gold/85 text-xl md:text-2xl leading-[1.8] italic" style={{ fontFamily: "var(--font-heading)" }}>
                {tx({
                  zh: "\u201c\u4e0a\u5348\u6253\u730e\uff0c\u4e0b\u5348\u6355\u9c7c\uff0c\u508d\u665a\u4ece\u4e8b\u755c\u7267\uff0c\u665a\u996d\u540e\u4ece\u4e8b\u6279\u5224\u3002\u201d",
                  en: "\u201cHunt in the morning, fish in the afternoon, rear cattle in the evening, criticize after dinner.\u201d",
                  fr: "\u00ab Chasser le matin, p\u00eacher l\u2019apr\u00e8s-midi, \u00e9lever du b\u00e9tail le soir, critiquer apr\u00e8s le d\u00eener. \u00bb",
                  ja: "\u300c\u5348\u524d\u306f\u72e9\u308a\u3092\u3057\u3001\u5348\u5f8c\u306f\u9b5a\u3092\u91e3\u308a\u3001\u5915\u65b9\u306f\u7267\u755c\u3092\u3057\u3001\u5915\u98df\u5f8c\u306f\u6279\u5224\u3092\u3059\u308b\u3002\u300d",
                }, language)}
              </p>
              <cite className="block mt-4 text-sm text-white/50 not-italic tracking-wide">
                {tx({
                  zh: "\u2014 \u5361\u5c14\u00b7\u9a6c\u514b\u601d\uff0c\u300a\u5fb7\u610f\u5fd7\u610f\u8bc6\u5f62\u6001\u300b\uff0c1846",
                  en: "\u2014 Karl Marx, The German Ideology, 1846",
                }, language)}
              </cite>
            </blockquote>
          </Reveal>

          {/* Beat 2: The bridge — one sentence */}
          <Reveal delay={0.3}>
            <p className="text-white/80 text-xl md:text-2xl leading-[1.8] mt-12" style={{ fontFamily: "var(--font-heading)" }}>
              {tx({
                zh: "\u5f53\u901a\u7528\u4eba\u5de5\u667a\u80fd\u5c06\u667a\u529b\u6210\u672c\u63a8\u5411\u96f6\u70b9\u2014\u2014",
                en: "As AGI pushes the cost of intelligence toward zero \u2014",
              }, language)}
            </p>
          </Reveal>

          {/* Beat 3: The modern vision — the payoff */}
          <Reveal delay={0.5}>
            <p className="text-gold text-lg md:text-xl leading-[1.8] mt-6">
              {tx({
                zh: "\u4e00\u4e2a\u4eba\u53ef\u4ee5\u5728\u4e0a\u5348\u62c5\u4efb\u67b6\u6784\u5e08\uff0c\u4e0b\u5348\u8fd0\u8425\u8de8\u6d32\u793e\u533a\uff0c\u665a\u95f4\u521b\u4f5c\u6c89\u6d78\u5f0f\u827a\u672f\u3002",
                en: "One person can architect in the morning, run a global community in the afternoon, and create immersive art in the evening.",
              }, language)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Frame 3: The Chasm ── */}
      <section className="relative bg-[oklch(0.12_0.02_250)] overflow-hidden">
        <div className="container max-w-3xl py-16 md:py-24 text-center relative z-10">
          <Reveal>
            <h2 className="text-white" style={{ fontFamily: "var(--font-heading)" }}>
              {tx({ zh: "\u7136\u800c\uff0c\u9e3f\u6c9f\u4ecd\u5728", en: "Yet the Chasm Remains" }, language)}
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex justify-center gap-10 md:gap-16 mt-12">
              {[
                { zh: "\u6709\u5de5\u5177\uff0c\u7f3a\u7cfb\u7edf", en: "Tools, no system" },
                { zh: "\u6709\u80fd\u529b\uff0c\u6ca1\u8ba2\u5355", en: "Skills, no orders" },
                { zh: "\u6709\u68a6\u60f3\uff0c\u6ca1\u57fa\u5efa", en: "Dreams, no infra" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-px h-5 bg-gold/25 mx-auto mb-3" />
                  <p className="text-sm text-white/55">{tx(item as Record<Lang, string>, language)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Frame 4: OPC Global ── */}
      <section className="relative bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.97_0.003_250)] overflow-hidden">
        <GlowOrbs variant="bridge" />
        <div className="container max-w-3xl py-20 md:py-28 text-center relative z-10">
          <Reveal>
            <h2
              className="text-white"
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 400, letterSpacing: "-0.02em" }}
            >
              OPC Global
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-gold text-lg md:text-xl tracking-wide mt-4">
              {tx({ zh: "\u94fa\u8bbe\u8de8\u8d8a\u9e3f\u6c9f\u7684\u57fa\u7840\u8bbe\u65bd", en: "Infrastructure Across the Chasm" }, language)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Section 5: 0.5 / 3 / 2 ── */}
      <section className="section-padding-lg bg-[oklch(0.98_0.003_250)]">
        <div className="container">
          <Reveal>
            <div className="text-center mb-14">
              <p className="stat-number tracking-[0.1em]">0.5 / 3 / 2</p>
              <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                {tx({
                  zh: "AI杠杆 · 效率跃升 · 收益倍增",
                  en: "AI Leverage · Efficiency · Revenue",
                }, language)}
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16 max-w-5xl mx-auto">
            {[
              {
                num: 0.5,
                label: { zh: "时间套利", en: "Time Arbitrage" },
                stat: { zh: "AI处理重复工作，专注高价值创造", en: "AI handles repetitive work, focus on high-value creation" },
                src: { zh: "AI杠杆降低70%时间成本", en: "AI leverage cuts 70% time cost" },
              },
              {
                num: 3.0,
                label: { zh: "产出乘数", en: "Output Multiplier" },
                stat: { zh: "AI放大创意质量，规模化内容生产", en: "AI amplifies creative quality, scales content production" },
                src: { zh: "AI工具使产出提升3-5倍", en: "AI tools boost output 3-5x" },
              },
              {
                num: 2.0,
                label: { zh: "价值捕获", en: "Value Capture" },
                stat: { zh: "掌握完整商业闭环，AI驱动收益增长", en: "Own full business loop, AI-driven revenue growth" },
                src: { zh: "AI杠杆实现收益指数级增长", en: "AI leverage enables exponential revenue growth" },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="text-center">
                  <div className="stat-number mb-3">
                    <Counter value={item.num} decimals={1} />
                  </div>
                  <h3 className="text-sm font-semibold tracking-wide uppercase mb-4" style={{ fontFamily: "var(--font-sans)" }}>
                    {tx(item.label as Record<Lang, string>, language)}
                  </h3>
                  <p className="text-gold font-medium">{tx(item.stat as Record<Lang, string>, language)}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">{tx(item.src as Record<Lang, string>, language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Triangle Collaboration ── */}
      <section className="section-padding section-deep-blue relative overflow-hidden">
        <GlowOrbs variant="dark" />
        <div className="container relative z-10">
          <SectionHeading
            title={tx({ zh: "\u4e09\u89d2\u534f\u4f5c\u7f51\u7edc", en: "Triangle Collaboration" }, language)}
            dark
          />

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                role: { zh: "\u5171\u521b\u6559\u7ec3", en: "Co-Creation Coaches" },
                metaphor: { zh: "\u201c\u5927\u8111\u201d", en: "The Brain" },
                desc: { zh: "\u5c06\u9690\u6027\u77e5\u8bc6\u5c01\u88c5\u4e3a AI \u7cfb\u7edf\uff0c\u5b9a\u4e49\u610f\u4e49\u4e0e\u6807\u51c6", en: "Package tacit knowledge into AI systems" },
                num: "01",
              },
              {
                role: { zh: "\u6559\u7ec3\u5408\u4f19\u4eba", en: "Coach Partners" },
                metaphor: { zh: "\u201c\u5c06\u9886\u201d", en: "The Generals" },
                desc: { zh: "\u62c6\u89e3\u4e13\u5bb6\u7cfb\u7edf\u4e3a\u6807\u51c6\u52a8\u4f5c\uff0c\u5e26\u9886\u56e2\u961f\u6253\u8d62\u5b9e\u6218", en: "Break expert systems into actions, lead teams to win" },
                num: "02",
              },
              {
                role: { zh: "OPC \u5355\u5143", en: "OPC Units" },
                metaphor: { zh: "\u201c\u7279\u79cd\u5175\u201d", en: "Special Forces" },
                desc: { zh: "\u5728\u771f\u5b9e\u8ba2\u5355\u4e2d\u64cd\u7ec3\uff0c\u8d5a\u53d6\u62a5\u916c\uff0c\u5b8c\u6210\u81ea\u6211\u8fdb\u5316", en: "Train on real orders, earn and evolve" },
                num: "03",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="glass-card-dark p-7 md:p-8 h-full">
                  <span className="text-xs text-white/40 tracking-[0.2em]">{item.num}</span>
                  <div className="flex items-baseline gap-3 mt-3 mb-2">
                    <h3 className="text-lg text-white font-medium">{tx(item.role as Record<Lang, string>, language)}</h3>
                    <span className="text-xs text-gold/60">{tx(item.metaphor as Record<Lang, string>, language)}</span>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {tx(item.desc as Record<Lang, string>, language)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: Who We Serve ── */}
      <section className="section-padding bg-background">
        <div className="container">
          <SectionHeading
            title={tx({ zh: "\u6211\u4eec\u4e3a\u8c01\u670d\u52a1", en: "Who We Serve" }, language)}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {[
              {
                audience: { zh: "\u5171\u521b\u6559\u7ec3", en: "Co-Creation Coaches" },
                value: { zh: "\u5c06\u77e5\u8bc6\u5c01\u88c5\u4e3a AI \u7cfb\u7edf\uff0c\u8d5a\u53d6\u88ab\u52a8\u6536\u76ca", en: "Package knowledge into AI systems, earn passive income" },
                cta: { zh: "\u6210\u4e3a\u5171\u521b\u6559\u7ec3", en: "Become a Coach" },
              },
              {
                audience: { zh: "\u6559\u7ec3\u5408\u4f19\u4eba", en: "Coach Partners" },
                value: { zh: "\u63a5\u5165\u4e13\u5bb6\u5185\u5bb9\u4e0e\u5168\u7403\u8ba2\u5355\uff0c\u89c4\u6a21\u5316\u4ea4\u4ed8", en: "Access expert assets and global orders, deliver at scale" },
                cta: { zh: "\u52a0\u5165\u6559\u7ec3\u56e2", en: "Join Coach Team" },
              },
              {
                audience: { zh: "\u4e2a\u4f53\u5355\u5143", en: "OPC Units" },
                value: { zh: "\u5728\u6559\u7ec3\u7763\u5bfc\u4e0b\u63a5\u5165\u771f\u5b9e\u8ba2\u5355\uff0c\u8fdb\u5316\u4e3a\u8d85\u7ea7\u4e2a\u4f53", en: "Access real orders under coach supervision, evolve" },
                cta: { zh: "\u5f00\u59cb\u5b9e\u6218", en: "Start Practicing" },
              },
              {
                audience: { zh: "\u4e2d\u5927\u578b\u4f01\u4e1a", en: "Enterprises" },
                value: { zh: "CapEx \u8f6c OpEx\uff0cOPC \u5355\u5143\u6309 SLA \u4ea4\u4ed8\u786e\u5b9a\u6210\u679c", en: "Convert CapEx to OpEx, OPC units deliver per SLA" },
                cta: { zh: "\u4f01\u4e1a\u5408\u4f5c", en: "Enterprise Solutions" },
              },
              {
                audience: { zh: "\u6295\u8d44\u65b9", en: "Investors" },
                value: { zh: "\u6295\u8d44\u8de8\u6280\u672f\u5468\u671f\u57fa\u7840\u8bbe\u65bd\uff0c\u4ece\u8ba2\u5355\u6d41\u8f6c\u4e2d\u83b7\u53d6\u5206\u7ea2", en: "Invest in cross-cycle infrastructure, earn from order flow" },
                cta: { zh: "\u6295\u8d44\u5408\u4f5c", en: "Investment Inquiry" },
              },
              {
                audience: { zh: "\u653f\u5e9c\u4e0e\u9ad8\u6821", en: "Governments & Universities" },
                value: { zh: "\u843d\u5730 OPC \u8bd5\u70b9\u533a\uff0c\u5c06\u5f85\u4e1a\u7fa4\u4f53\u8f6c\u5316\u4e3a\u5fae\u578b\u4f01\u4e1a", en: "Launch OPC pilot zones, transform unemployed into micro-enterprises" },
                cta: { zh: "\u653f\u4f01\u5408\u4f5c", en: "Public Partnership" },
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card-premium group h-full flex flex-col">
                  <h3 className="text-base font-semibold text-foreground mb-3">
                    {tx(item.audience as Record<Lang, string>, language)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                    {tx(item.value as Record<Lang, string>, language)}
                  </p>
                  <a href="mailto:hi@opcglobal.ai"
                    className="inline-flex items-center text-sm font-medium text-gold hover:text-gold-light transition-colors mt-auto">
                    {tx(item.cta as Record<Lang, string>, language)}
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 8: Three Pillars ── */}
      <section className="section-padding-sm bg-[oklch(0.98_0.003_250)]">
        <div className="container">
          <SectionHeading
            title={tx({ zh: "\u4e09\u5927\u652f\u67f1", en: "Three Pillars" }, language)}
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "OPC HOM",
                subtitle: { zh: "\u8eab\u4f53 \u00b7 \u57fa\u7840\u8bbe\u65bd", en: "Infrastructure" },
                href: "/hom",
              },
              {
                name: "OPC UNI",
                subtitle: { zh: "\u667a\u6167 \u00b7 \u6559\u80b2\u4e2d\u53f0", en: "Education Hub" },
                href: "/uni",
              },
              {
                name: "OPC DAO",
                subtitle: { zh: "\u7075\u9b42 \u00b7 \u6cbb\u7406\u4e0e\u4fe1\u4efb", en: "Governance & Trust" },
                href: "/dao",
              },
            ].map((p, i) => (
              <Reveal key={p.name} delay={i * 0.12}>
                <Link href={p.href}>
                  <div className="card-premium group text-center cursor-pointer h-full py-10">
                    <h3 className="text-2xl md:text-3xl text-foreground group-hover:text-gold transition-colors duration-500">
                      {p.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {tx(p.subtitle as Record<Lang, string>, language)}
                    </p>
                    <span className="inline-flex items-center text-sm text-gold/50 group-hover:text-gold transition-colors mt-5">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 9: Go Global ── */}
      <section id="go-global" className="section-padding relative overflow-hidden bg-gradient-to-b from-[oklch(0.13_0.02_250)] to-[oklch(0.17_0.02_250)]">
        <GlowOrbs variant="dark" />
        <div className="container relative z-10">
          <SectionHeading
            title={tx({ zh: "\u51fa\u6d77\u670d\u52a1\u751f\u6001", en: "Go Global", fr: "\u00c9cosyst\u00e8me d'Expansion", ja: "\u6d77\u5916\u5c55\u958b" }, language)}
            dark
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto mb-12">
            {[
              { icon: Database, name: { zh: "\u5927\u6570\u636e", en: "Big Data" }, stat: { zh: "4\u4ebf+", en: "400M+" } },
              { icon: Star, name: { zh: "\u660e\u661f\u8425\u9500", en: "Celebrity" }, stat: { zh: "\u54c1\u6548\u5408\u4e00", en: "Brand+ROI" } },
              { icon: Globe, name: { zh: "\u6d41\u91cf\u91c7\u4e70", en: "Traffic" }, stat: { zh: "195\u56fd", en: "195 Countries" } },
              { icon: ShoppingCart, name: { zh: "\u4e1c\u76df\u7535\u5546", en: "ASEAN EC" }, stat: { zh: "\u5e02\u573a\u843d\u5730", en: "Market Entry" } },
              { icon: Shield, name: { zh: "\u5408\u89c4\u670d\u52a1", en: "Compliance" }, stat: { zh: "\u5168\u94fe\u8def", en: "Full Chain" } },
            ].map((engine, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="glass-card-dark p-5 text-center h-full flex flex-col items-center">
                  <engine.icon className="w-5 h-5 text-gold/50 mb-3" />
                  <h3 className="text-sm font-medium text-white mb-2">
                    {tx(engine.name as Record<Lang, string>, language)}
                  </h3>
                  <p className="text-xl font-bold text-gold" style={{ fontFamily: "var(--font-heading)" }}>
                    {tx(engine.stat as Record<Lang, string>, language)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Partner Brands */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
              {['OPPO', 'Dreame', 'Pop Mart', 'CapCut', 'Anker', 'SHEIN'].map((brand) => (
                <span key={brand} className="text-sm text-white/40 tracking-wider font-medium">
                  {brand}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="text-center mt-10">
              <a href="https://oversea.opcglobal.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 btn-gold">
                <span>{tx({ zh: "\u63a2\u7d22\u51fa\u6d77\u751f\u6001", en: "Explore Go Global" }, language)}</span>
                <ExternalLink className="w-4 h-4 relative z-10" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Section 10: Mission ── */}
      <section className="section-padding bg-background">
        <div className="container max-w-3xl text-center">
          <Reveal>
            <p className="quote-block mb-10">
              {tx({
                zh: "\u57f9\u80b2 AI \u65f6\u4ee3\u65b0\u5c97\u4f4d\uff0c\u586b\u5e73\u4e13\u4e1a\u667a\u6167\u4e0e\u5b9e\u8df5\u6210\u679c\u4e4b\u95f4\u7684\u9e3f\u6c9f\u3002",
                en: "Cultivating new roles for the AI era, bridging the chasm between wisdom and outcomes.",
              }, language)}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex justify-center gap-8 md:gap-12 mb-12">
              {[
                { zh: "\u6c42\u771f", en: "Truth" },
                { zh: "\u81ea\u4e3b", en: "Autonomy" },
                { zh: "\u5229\u4ed6", en: "Altruism" },
                { zh: "\u5171\u751f", en: "Symbiosis" },
              ].map((v, i) => (
                <span key={i} className="text-sm tracking-[0.2em] text-foreground/50 uppercase font-medium">
                  {tx(v as Record<Lang, string>, language)}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hi@opcglobal.ai">
                <button className="btn-gold">
                  <span className="flex items-center gap-2">
                    {tx({ zh: "\u52a0\u5165\u8054\u76df", en: "Join the Alliance" }, language)}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </a>
              <Link href="/universe">
                <button className="btn-outline-gold">
                  <span>{tx({ zh: "\u63a2\u7d22 OPC \u5b87\u5b99", en: "Explore OPC Universe" }, language)}</span>
                </button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
