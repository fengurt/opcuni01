import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Leaf, Heart, Brain, Users, Waves, Sun, Shield, Flower2, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const t = (lang: string, key: string): string => {
  const texts: Record<string, Record<string, string>> = {
    // Organization Identity
    'org.name': { zh: '亚太艺术疗愈联盟', en: 'Asia-Pacific Art Healing Alliance', fr: "Alliance Asie-Pacifique pour la Guérison par l'Art", ja: 'アジア太平洋アートヒーリング・アライアンス' },
    'org.abbr': { zh: 'APHA', en: 'APHA', fr: 'APHA', ja: 'APHA' },
    'org.tagline': { zh: '以艺术疗愈心灵，以美学重塑生命', en: 'Healing Minds Through Art, Reshaping Lives Through Beauty', fr: "Guérir les Esprits par l'Art, Remodeler les Vies par la Beauté", ja: '芸術で心を癒し、美学で生命を再構築する' },
    'org.type': { zh: '亚太区域非营利疗愈组织', en: 'Asia-Pacific Regional Non-Profit Healing Organization', fr: "Organisation Régionale Asie-Pacifique de Guérison à But Non Lucratif", ja: 'アジア太平洋地域非営利ヒーリング団体' },

    // Hero
    'hero.title': { zh: '让艺术成为\n疗愈的力量', en: 'Let Art Become\na Healing Force', fr: "Que l'Art Devienne\nune Force de Guérison", ja: '芸術を\n癒しの力に' },
    'hero.subtitle': { zh: '亚太艺术疗愈联盟（APHA）汇聚亚太地区艺术疗愈领域的顶尖专家、研究机构与实践者，致力于通过艺术的力量促进身心健康、社会福祉与人类潜能的全面发展。', en: 'The Asia-Pacific Art Healing Alliance (APHA) brings together leading experts, research institutions, and practitioners in art healing across the Asia-Pacific region, dedicated to promoting physical and mental health, social well-being, and the holistic development of human potential through the power of art.', fr: "L'Alliance Asie-Pacifique pour la Guérison par l'Art (APHA) rassemble les experts, institutions de recherche et praticiens de premier plan dans le domaine de la guérison par l'art à travers la région Asie-Pacifique.", ja: 'アジア太平洋アートヒーリング・アライアンス（APHA）は、アジア太平洋地域のアートヒーリング分野のトップ専門家、研究機関、実践者を結集し、芸術の力を通じて心身の健康、社会的福祉、人間の潜在能力の全面的な発展を促進しています。' },
    'hero.cta.programs': { zh: '探索项目', en: 'Explore Programs', fr: 'Explorer les Programmes', ja: 'プログラムを探索' },
    'hero.cta.research': { zh: '研究成果', en: 'Research', fr: 'Recherche', ja: '研究成果' },

    // Mission
    'mission.label': { zh: '我们的愿景', en: 'Our Vision', fr: 'Notre Vision', ja: '私たちのビジョン' },
    'mission.title': { zh: '让每一个生命都能被艺术温柔以待', en: 'May Every Life Be Gently Touched by Art', fr: "Que Chaque Vie Soit Doucement Touchée par l'Art", ja: 'すべての命が芸術に優しく触れられますように' },
    'mission.desc': { zh: '在快速变化的现代社会中，心理健康与精神福祉日益受到关注。APHA 相信，艺术不仅是审美的表达，更是一种深层的疗愈语言。通过音乐、绘画、舞蹈、戏剧、书法等多元艺术形式，我们帮助个体重建内在平衡，找到生命的意义与力量。', en: 'In our rapidly changing modern society, mental health and spiritual well-being are receiving increasing attention. APHA believes that art is not merely aesthetic expression, but a profound language of healing. Through diverse art forms — music, painting, dance, theater, calligraphy — we help individuals rebuild inner balance and discover meaning and strength in life.', fr: "Dans notre société moderne en rapide évolution, la santé mentale et le bien-être spirituel reçoivent une attention croissante. APHA croit que l'art n'est pas simplement une expression esthétique, mais un langage profond de guérison.", ja: '急速に変化する現代社会において、メンタルヘルスと精神的な幸福はますます注目されています。APHAは、芸術は単なる美的表現ではなく、深い癒しの言語であると信じています。音楽、絵画、ダンス、演劇、書道など多様な芸術形式を通じて、個人が内なるバランスを再構築し、人生の意味と力を見出す手助けをしています。' },

    // Programs
    'programs.label': { zh: '核心项目', en: 'Core Programs', fr: 'Programmes Principaux', ja: 'コアプログラム' },
    'prog1.title': { zh: '艺术疗愈师认证', en: 'Art Healing Practitioner Certification', fr: "Certification de Praticien en Guérison par l'Art", ja: 'アートヒーリング実践者認定' },
    'prog1.desc': { zh: '与亚太地区顶尖大学合作，提供国际认可的艺术疗愈师专业认证体系，涵盖音乐疗愈、绘画疗愈、舞动疗愈、戏剧疗愈四大方向。', en: 'Partnering with leading Asia-Pacific universities to offer internationally recognized professional certification in art healing, covering four specializations: music healing, visual art healing, movement healing, and drama healing.', fr: "En partenariat avec les principales universités d'Asie-Pacifique pour offrir une certification professionnelle internationalement reconnue en guérison par l'art.", ja: 'アジア太平洋地域のトップ大学と提携し、音楽ヒーリング、ビジュアルアートヒーリング、ムーブメントヒーリング、ドラマヒーリングの4つの専門分野をカバーする国際的に認められたアートヒーリングの専門認定を提供しています。' },
    'prog2.title': { zh: '社区疗愈工坊', en: 'Community Healing Workshops', fr: 'Ateliers de Guérison Communautaire', ja: 'コミュニティヒーリングワークショップ' },
    'prog2.desc': { zh: '在亚太各地社区开展免费或低成本的艺术疗愈工坊，服务对象包括青少年、老年人、残障人士、灾后心理援助群体等。', en: 'Conducting free or low-cost art healing workshops in communities across Asia-Pacific, serving youth, elderly, persons with disabilities, and post-disaster psychological support groups.', fr: "Organisation d'ateliers de guérison par l'art gratuits ou à faible coût dans les communautés d'Asie-Pacifique.", ja: 'アジア太平洋各地のコミュニティで無料または低コストのアートヒーリングワークショップを開催し、青少年、高齢者、障がい者、災害後の心理支援グループにサービスを提供しています。' },
    'prog3.title': { zh: '跨文化疗愈研究', en: 'Cross-Cultural Healing Research', fr: 'Recherche Interculturelle sur la Guérison', ja: '異文化ヒーリング研究' },
    'prog3.desc': { zh: '联合亚太地区研究机构，开展传统文化疗愈实践（如中医音乐疗法、日本森林浴、印度瑜伽艺术）的循证研究与现代化应用。', en: 'Collaborating with Asia-Pacific research institutions on evidence-based research and modern applications of traditional cultural healing practices — Chinese music therapy, Japanese forest bathing, Indian yoga art, and more.', fr: "Collaboration avec les institutions de recherche d'Asie-Pacifique sur la recherche fondée sur des preuves et les applications modernes des pratiques traditionnelles de guérison culturelle.", ja: 'アジア太平洋地域の研究機関と連携し、伝統的な文化的ヒーリング実践（中国音楽療法、日本の森林浴、インドのヨガアートなど）のエビデンスに基づく研究と現代的応用を行っています。' },
    'prog4.title': { zh: '企业身心健康计划', en: 'Corporate Wellness Program', fr: "Programme de Bien-être d'Entreprise", ja: '企業ウェルネスプログラム' },
    'prog4.desc': { zh: '为亚太地区企业提供定制化的艺术疗愈企业健康方案，帮助员工减压、提升创造力与团队凝聚力。', en: 'Providing customized art healing corporate wellness solutions for Asia-Pacific enterprises, helping employees reduce stress, enhance creativity, and strengthen team cohesion.', fr: "Fournir des solutions personnalisées de bien-être d'entreprise par la guérison par l'art pour les entreprises d'Asie-Pacifique.", ja: 'アジア太平洋地域の企業にカスタマイズされたアートヒーリング企業ウェルネスソリューションを提供し、従業員のストレス軽減、創造性の向上、チームの結束力の強化を支援しています。' },

    // Modalities
    'modalities.label': { zh: '疗愈形式', en: 'Healing Modalities', fr: 'Modalités de Guérison', ja: 'ヒーリングモダリティ' },
    'modalities.title': { zh: '多元艺术，多维疗愈', en: 'Diverse Arts, Multidimensional Healing', fr: 'Arts Divers, Guérison Multidimensionnelle', ja: '多様な芸術、多次元のヒーリング' },
    'mod1.name': { zh: '音乐疗愈', en: 'Music Healing', fr: 'Guérison par la Musique', ja: '音楽ヒーリング' },
    'mod2.name': { zh: '绘画疗愈', en: 'Visual Art Healing', fr: "Guérison par l'Art Visuel", ja: 'ビジュアルアートヒーリング' },
    'mod3.name': { zh: '舞动疗愈', en: 'Movement Healing', fr: 'Guérison par le Mouvement', ja: 'ムーブメントヒーリング' },
    'mod4.name': { zh: '书法冥想', en: 'Calligraphy Meditation', fr: 'Méditation par la Calligraphie', ja: '書道瞑想' },
    'mod5.name': { zh: '戏剧疗愈', en: 'Drama Healing', fr: 'Guérison par le Théâtre', ja: 'ドラマヒーリング' },
    'mod6.name': { zh: '自然疗愈', en: 'Nature Healing', fr: 'Guérison par la Nature', ja: 'ネイチャーヒーリング' },

    // Impact
    'impact.label': { zh: '社会影响', en: 'Social Impact', fr: 'Impact Social', ja: '社会的インパクト' },
    'impact.title': { zh: '用数据见证疗愈的力量', en: 'Witnessing the Power of Healing Through Data', fr: 'Témoigner du Pouvoir de la Guérison par les Données', ja: 'データで癒しの力を証明する' },
    'impact1.number': { zh: '15+', en: '15+', fr: '15+', ja: '15+' },
    'impact1.label': { zh: '覆盖国家与地区', en: 'Countries & Regions', fr: 'Pays et Régions', ja: '対象国・地域' },
    'impact2.number': { zh: '200+', en: '200+', fr: '200+', ja: '200+' },
    'impact2.label': { zh: '认证疗愈师', en: 'Certified Practitioners', fr: 'Praticiens Certifiés', ja: '認定プラクティショナー' },
    'impact3.number': { zh: '50,000+', en: '50,000+', fr: '50 000+', ja: '50,000+' },
    'impact3.label': { zh: '受益人群', en: 'Lives Touched', fr: 'Vies Touchées', ja: '受益者数' },
    'impact4.number': { zh: '30+', en: '30+', fr: '30+', ja: '30+' },
    'impact4.label': { zh: '合作研究机构', en: 'Research Partners', fr: 'Partenaires de Recherche', ja: '研究パートナー' },

    // Network
    'network.label': { zh: '亚太网络', en: 'Asia-Pacific Network', fr: 'Réseau Asie-Pacifique', ja: 'アジア太平洋ネットワーク' },
    'network.title': { zh: '连接亚太，疗愈世界', en: 'Connecting Asia-Pacific, Healing the World', fr: "Connecter l'Asie-Pacifique, Guérir le Monde", ja: 'アジア太平洋をつなぎ、世界を癒す' },
    'network.desc': { zh: 'APHA 的网络覆盖中国、日本、韩国、新加坡、澳大利亚、新西兰、印度、泰国等亚太主要国家和地区，与各地领先的医疗机构、大学、艺术中心及社会服务组织建立了深度合作关系。', en: "APHA's network spans major Asia-Pacific countries and regions including China, Japan, South Korea, Singapore, Australia, New Zealand, India, and Thailand, with deep partnerships with leading medical institutions, universities, art centers, and social service organizations.", fr: "Le réseau d'APHA couvre les principaux pays et régions d'Asie-Pacifique, avec des partenariats approfondis avec les principales institutions médicales, universités, centres d'art et organisations de services sociaux.", ja: 'APHAのネットワークは、中国、日本、韓国、シンガポール、オーストラリア、ニュージーランド、インド、タイなどアジア太平洋の主要国・地域をカバーし、各地の主要な医療機関、大学、アートセンター、社会サービス組織と深い提携関係を構築しています。' },

    // CTA
    'cta.title': { zh: '开启您的疗愈之旅', en: 'Begin Your Healing Journey', fr: 'Commencez Votre Voyage de Guérison', ja: 'あなたのヒーリングの旅を始めましょう' },
    'cta.desc': { zh: '无论您是专业疗愈师、医疗从业者、艺术教育者，还是希望通过艺术获得内在平静的个人，APHA 都欢迎您的加入。', en: 'Whether you are a professional healer, healthcare practitioner, art educator, or an individual seeking inner peace through art, APHA welcomes you.', fr: "Que vous soyez un guérisseur professionnel, un praticien de la santé, un éducateur artistique ou une personne cherchant la paix intérieure par l'art, APHA vous accueille.", ja: 'プロのヒーラー、医療従事者、アート教育者、または芸術を通じて内なる平和を求める個人の方、APHAはあなたの参加を歓迎します。' },
    'cta.join': { zh: '加入联盟', en: 'Join the Alliance', fr: "Rejoindre l'Alliance", ja: 'アライアンスに参加' },
    'cta.back': { zh: '返回 OPC Global', en: 'Back to OPC Global', fr: 'Retour à OPC Global', ja: 'OPC Globalに戻る' },
  };
  return texts[key]?.[lang] || texts[key]?.['en'] || key;
};

const programs = [
  { key: 'prog1', icon: Star, color: 'oklch(0.62 0.1 75)' },
  { key: 'prog2', icon: Users, color: 'oklch(0.55 0.15 160)' },
  { key: 'prog3', icon: Brain, color: 'oklch(0.55 0.15 280)' },
  { key: 'prog4', icon: Shield, color: 'oklch(0.55 0.15 220)' },
];

const modalities = [
  { key: 'mod1', icon: Waves },
  { key: 'mod2', icon: Flower2 },
  { key: 'mod3', icon: Sun },
  { key: 'mod4', icon: Heart },
  { key: 'mod5', icon: Users },
  { key: 'mod6', icon: Leaf },
];

const regions = [
  { zh: '中国', en: 'China' },
  { zh: '日本', en: 'Japan' },
  { zh: '韩国', en: 'South Korea' },
  { zh: '新加坡', en: 'Singapore' },
  { zh: '澳大利亚', en: 'Australia' },
  { zh: '新西兰', en: 'New Zealand' },
  { zh: '印度', en: 'India' },
  { zh: '泰国', en: 'Thailand' },
  { zh: '马来西亚', en: 'Malaysia' },
  { zh: '印度尼西亚', en: 'Indonesia' },
];

export default function Apha() {
  const { language } = useLanguage();
  const l = (key: string) => t(language, key);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navigation />

      {/* Hero — Serene, Healing Atmosphere */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Soft organic pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='40' r='20' fill='none' stroke='%230A1626' stroke-width='0.5'/%3E%3Ccircle cx='40' cy='40' r='35' fill='none' stroke='%230A1626' stroke-width='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }} />

        {/* Soft gradient — warm, healing tones */}
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.97_0.01_160/0.3)] via-white to-white" />

        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          {/* Organization badge */}
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="badge-official">
              <Leaf className="w-3 h-3 mr-1.5" />
              {l('org.type')}
            </span>
          </div>

          {/* APHA abbreviation */}
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 font-semibold">
            {l('org.abbr')}
          </p>

          {/* Main title */}
          <h1 className="font-heading font-bold text-foreground mb-6 whitespace-pre-line leading-[1.1]">
            {l('hero.title')}
          </h1>

          {/* Tagline */}
          <p className="text-gold font-heading text-xl md:text-2xl italic mb-8 tracking-wide">
            {l('org.tagline')}
          </p>

          {/* Gold divider */}
          <div className="section-divider mb-8" />

          {/* Description */}
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-12">
            {l('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#programs">
              <Button className="h-12 px-8 text-sm tracking-wide bg-foreground text-background hover:bg-foreground/90 gap-2">
                {l('hero.cta.programs')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="#impact">
              <Button variant="outline" className="h-12 px-8 text-sm tracking-wide border-border hover:border-gold/40 gap-2">
                {l('hero.cta.research')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4 font-medium">
            {l('mission.label')}
          </p>
          <h2 className="font-heading font-bold text-foreground mb-6">
            {l('mission.title')}
          </h2>
          <div className="section-divider mb-8" />
          <p className="text-muted-foreground text-base md:text-lg leading-[1.8] max-w-3xl mx-auto">
            {l('mission.desc')}
          </p>
        </div>
      </section>

      {/* Healing Modalities — Visual Grid */}
      <section className="section-padding-sm bg-[oklch(0.97_0.005_90)]">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4 font-medium">
              {l('modalities.label')}
            </p>
            <h2 className="font-heading font-bold text-foreground mb-4">
              {l('modalities.title')}
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {modalities.map(({ key, icon: Icon }) => (
              <div key={key} className="group text-center py-8 px-4 bg-white border border-border/60 hover:border-gold/30 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center bg-[oklch(0.62_0.1_75/0.06)] group-hover:bg-[oklch(0.62_0.1_75/0.12)] transition-colors">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <h4 className="font-heading font-semibold text-foreground text-base">
                  {l(`${key}.name`)}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Programs */}
      <section id="programs" className="section-padding bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4 font-medium">
              {l('programs.label')}
            </p>
            <div className="section-divider" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {programs.map(({ key, icon: Icon, color }) => (
              <div key={key} className="pillar-card group">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border border-border/60 group-hover:border-gold/30 transition-colors"
                    style={{ backgroundColor: `${color}08` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-3 text-lg md:text-xl">
                      {l(`${key}.title`)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {l(`${key}.desc`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section id="impact" className="section-deep-blue section-padding pattern-overlay">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: 'oklch(0.78 0.08 75)' }}>
              {l('impact.label')}
            </p>
            <h2 className="font-heading font-bold text-white mb-4">
              {l('impact.title')}
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'oklch(0.78 0.08 75)' }}>
                  {l(`impact${i}.number`)}
                </div>
                <div className="text-sm text-white/60 font-medium">
                  {l(`impact${i}.label`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network */}
      <section className="section-padding bg-white">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4 font-medium">
            {l('network.label')}
          </p>
          <h2 className="font-heading font-bold text-foreground mb-4">
            {l('network.title')}
          </h2>
          <div className="section-divider mb-8" />
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-12">
            {l('network.desc')}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {regions.map((region) => (
              <div key={region.en} className="py-4 px-3 border border-border/60 hover:border-gold/30 transition-colors text-center">
                <span className="text-sm font-medium text-foreground/80">
                  {language === 'zh' ? region.zh : region.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-[oklch(0.97_0.005_90)]">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-foreground mb-4">
            {l('cta.title')}
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
            {l('cta.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="h-11 px-8 text-sm tracking-wide bg-foreground text-background hover:bg-foreground/90 gap-2">
              {l('cta.join')}
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
            <Link href="/">
              <Button variant="outline" className="h-11 px-8 text-sm tracking-wide border-border hover:border-gold/40">
                {l('cta.back')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
