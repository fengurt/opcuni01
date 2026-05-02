import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, MapPin, Calendar, Palette, Globe2, Heart, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const t = (lang: string, key: string): string => {
  const texts: Record<string, Record<string, string>> = {
    // Organization Identity
    'org.name': { zh: '无魔协会', en: 'ManaEndless Association', fr: 'Association ManaEndless', ja: 'マナエンドレス協会' },
    'org.tagline': { zh: '艺术无界，文化共生', en: 'Art Without Borders, Culture in Symbiosis', fr: "L'Art Sans Frontières, Culture en Symbiose", ja: '芸術に国境なし、文化の共生' },
    'org.location': { zh: '瑞士 · 日内瓦', en: 'Geneva, Switzerland', fr: 'Genève, Suisse', ja: 'スイス・ジュネーブ' },
    'org.type': { zh: '国际非营利文化组织', en: 'International Non-Profit Cultural Organization', fr: 'Organisation Culturelle Internationale à But Non Lucratif', ja: '国際非営利文化団体' },
    
    // Hero
    'hero.title': { zh: '以艺术之名\n连接世界', en: 'Connecting the World\nThrough Art', fr: "Connecter le Monde\nPar l'Art", ja: '芸術の名のもとに\n世界をつなぐ' },
    'hero.subtitle': { zh: '无魔协会是一家总部位于瑞士的国际非营利组织，致力于通过当代艺术展览与跨文化交流，促进全球文明对话与人文价值传承。', en: 'ManaEndless Association is a Swiss-based international non-profit dedicated to fostering global civilizational dialogue and humanistic values through contemporary art exhibitions and cross-cultural exchange.', fr: "L'Association ManaEndless est une organisation internationale à but non lucratif basée en Suisse, dédiée à favoriser le dialogue civilisationnel mondial et les valeurs humanistes à travers des expositions d'art contemporain et des échanges interculturels.", ja: 'マナエンドレス協会は、スイスを拠点とする国際非営利団体であり、現代美術展と異文化交流を通じて、グローバルな文明対話と人文的価値の継承を促進しています。' },
    'hero.cta.exhibitions': { zh: '浏览展览', en: 'View Exhibitions', fr: 'Voir les Expositions', ja: '展覧会を見る' },
    'hero.cta.about': { zh: '了解协会', en: 'About Us', fr: 'À Propos', ja: '協会について' },
    
    // Mission
    'mission.label': { zh: '我们的使命', en: 'Our Mission', fr: 'Notre Mission', ja: '私たちの使命' },
    'mission.title': { zh: '以艺术为桥梁，以文化为纽带', en: 'Art as Bridge, Culture as Bond', fr: "L'Art comme Pont, la Culture comme Lien", ja: '芸術を架け橋に、文化を絆に' },
    'mission.desc': { zh: '在全球化与本土化交织的时代，无魔协会坚信：真正的艺术超越语言与国界。我们通过策划高品质的国际艺术展览、文化研讨与艺术家驻留项目，搭建东西方文明对话的平台，让艺术成为促进理解、尊重与合作的力量。', en: 'In an era where globalization intertwines with localization, ManaEndless believes that true art transcends language and borders. Through curating high-quality international art exhibitions, cultural symposiums, and artist residency programs, we build platforms for East-West civilizational dialogue, making art a force for understanding, respect, and cooperation.', fr: "À une époque où la mondialisation s'entremêle avec la localisation, ManaEndless croit que l'art véritable transcende la langue et les frontières. En organisant des expositions d'art internationales de haute qualité, des symposiums culturels et des programmes de résidence d'artistes, nous construisons des plateformes de dialogue civilisationnel Est-Ouest.", ja: 'グローバル化とローカル化が交差する時代において、マナエンドレスは真の芸術が言語と国境を超えると信じています。高品質な国際美術展、文化シンポジウム、アーティスト・レジデンシー・プログラムの企画を通じて、東西文明対話のプラットフォームを構築しています。' },
    
    // Pillars
    'pillars.label': { zh: '核心领域', en: 'Core Pillars', fr: 'Piliers Fondamentaux', ja: 'コアピラー' },
    'pillar1.title': { zh: '国际艺术展览', en: 'International Art Exhibitions', fr: "Expositions d'Art Internationales", ja: '国際美術展' },
    'pillar1.desc': { zh: '在日内瓦、巴塞尔、苏黎世等瑞士文化重镇及全球合作城市，策划并举办融合东西方美学的当代艺术展览，呈现多元文化视角下的艺术表达。', en: 'Curating and hosting contemporary art exhibitions that blend Eastern and Western aesthetics in Swiss cultural capitals — Geneva, Basel, Zurich — and partner cities worldwide, presenting artistic expression through multicultural perspectives.', fr: "Organisation d'expositions d'art contemporain mêlant esthétiques orientales et occidentales dans les capitales culturelles suisses — Genève, Bâle, Zurich — et les villes partenaires du monde entier.", ja: 'ジュネーブ、バーゼル、チューリッヒなどスイスの文化都市および世界のパートナー都市で、東西の美学を融合した現代美術展を企画・開催しています。' },
    'pillar2.title': { zh: '跨文化交流', en: 'Cross-Cultural Exchange', fr: 'Échanges Interculturels', ja: '異文化交流' },
    'pillar2.desc': { zh: '组织国际文化论坛、艺术家对话、策展人交流等活动，促进不同文化背景的创作者与思想者之间的深度对话与合作。', en: 'Organizing international cultural forums, artist dialogues, and curator exchanges to foster deep conversation and collaboration among creators and thinkers from diverse cultural backgrounds.', fr: "Organisation de forums culturels internationaux, de dialogues d'artistes et d'échanges de conservateurs pour favoriser la conversation approfondie et la collaboration entre créateurs et penseurs de divers horizons culturels.", ja: '国際文化フォーラム、アーティスト対話、キュレーター交流などを組織し、多様な文化的背景を持つクリエイターと思想家の間の深い対話と協力を促進しています。' },
    'pillar3.title': { zh: '艺术家驻留计划', en: 'Artist Residency Program', fr: "Programme de Résidence d'Artistes", ja: 'アーティスト・レジデンシー' },
    'pillar3.desc': { zh: '为全球艺术家提供瑞士驻留机会，在阿尔卑斯山脉的宁静与灵感中创作，并与当地社区及国际艺术网络建立深度连接。', en: 'Offering global artists Swiss residency opportunities to create amidst the tranquility and inspiration of the Alps, while building deep connections with local communities and international art networks.', fr: "Offrir aux artistes du monde entier des opportunités de résidence en Suisse pour créer dans la tranquillité et l'inspiration des Alpes, tout en établissant des connexions profondes avec les communautés locales et les réseaux artistiques internationaux.", ja: 'グローバルなアーティストにスイスでのレジデンシーの機会を提供し、アルプスの静寂とインスピレーションの中で創作し、地域コミュニティや国際的なアートネットワークとの深いつながりを構築します。' },
    'pillar4.title': { zh: '文化遗产保护', en: 'Cultural Heritage Preservation', fr: 'Préservation du Patrimoine Culturel', ja: '文化遺産保護' },
    'pillar4.desc': { zh: '与联合国教科文组织等国际机构合作，参与非物质文化遗产的数字化保护与当代诠释，让传统艺术在新时代焕发生机。', en: 'Collaborating with UNESCO and other international bodies on digital preservation and contemporary interpretation of intangible cultural heritage, revitalizing traditional arts for the modern era.', fr: "Collaboration avec l'UNESCO et d'autres organismes internationaux pour la préservation numérique et l'interprétation contemporaine du patrimoine culturel immatériel, revitalisant les arts traditionnels pour l'ère moderne.", ja: 'ユネスコなどの国際機関と協力し、無形文化遺産のデジタル保存と現代的解釈に取り組み、伝統芸術を現代に蘇らせています。' },
    
    // Exhibitions
    'exhibitions.label': { zh: '近期展览', en: 'Recent Exhibitions', fr: 'Expositions Récentes', ja: '最近の展覧会' },
    'exhibitions.title': { zh: '跨越边界的艺术对话', en: 'Artistic Dialogues Across Boundaries', fr: 'Dialogues Artistiques Au-delà des Frontières', ja: '境界を超えるアートの対話' },
    
    'ex1.title': { zh: '山水之间 — 东方美学与瑞士自然', en: 'Between Mountains and Waters — Eastern Aesthetics & Swiss Nature', fr: 'Entre Montagnes et Eaux — Esthétique Orientale & Nature Suisse', ja: '山水の間 — 東洋美学とスイスの自然' },
    'ex1.location': { zh: '日内瓦万国宫', en: 'Palais des Nations, Geneva', fr: 'Palais des Nations, Genève', ja: 'パレ・デ・ナシオン、ジュネーブ' },
    'ex1.date': { zh: '2026年3月 — 6月', en: 'March — June 2026', fr: 'Mars — Juin 2026', ja: '2026年3月 — 6月' },
    'ex1.desc': { zh: '汇集中国水墨画与瑞士当代装置艺术，探索人与自然的永恒对话。', en: 'Bringing together Chinese ink painting and Swiss contemporary installation art, exploring the eternal dialogue between humanity and nature.', fr: "Réunissant la peinture à l'encre chinoise et l'art d'installation contemporain suisse, explorant le dialogue éternel entre l'humanité et la nature.", ja: '中国水墨画とスイスの現代インスタレーションアートを集め、人と自然の永遠の対話を探求します。' },
    
    'ex2.title': { zh: '丝路新语 — 当代丝绸之路艺术展', en: 'New Voices of the Silk Road — Contemporary Silk Road Art', fr: 'Nouvelles Voix de la Route de la Soie — Art Contemporain', ja: 'シルクロードの新しい声 — 現代シルクロードアート展' },
    'ex2.location': { zh: '巴塞尔艺术中心', en: 'Basel Art Center', fr: "Centre d'Art de Bâle", ja: 'バーゼル・アートセンター' },
    'ex2.date': { zh: '2026年7月 — 9月', en: 'July — September 2026', fr: 'Juillet — Septembre 2026', ja: '2026年7月 — 9月' },
    'ex2.desc': { zh: '沿古丝绸之路沿线国家艺术家的当代创作，重新诠释文明交汇的历史记忆。', en: 'Contemporary works by artists from nations along the ancient Silk Road, reinterpreting historical memories of civilizational convergence.', fr: "Œuvres contemporaines d'artistes des nations le long de l'ancienne Route de la Soie, réinterprétant les mémoires historiques de la convergence civilisationnelle.", ja: '古代シルクロード沿いの国々のアーティストによる現代作品、文明の交差の歴史的記憶を再解釈します。' },
    
    'ex3.title': { zh: '光与影 — 数字艺术与人文精神', en: 'Light & Shadow — Digital Art and the Human Spirit', fr: "Lumière & Ombre — Art Numérique et l'Esprit Humain", ja: '光と影 — デジタルアートと人文精神' },
    'ex3.location': { zh: '苏黎世美术馆', en: 'Kunsthaus Zürich', fr: 'Kunsthaus Zürich', ja: 'チューリッヒ美術館' },
    'ex3.date': { zh: '2026年10月 — 12月', en: 'October — December 2026', fr: 'Octobre — Décembre 2026', ja: '2026年10月 — 12月' },
    'ex3.desc': { zh: '探索AI与数字技术如何赋能艺术创作，同时保持人文精神的温度与深度。', en: 'Exploring how AI and digital technology empower artistic creation while preserving the warmth and depth of the human spirit.', fr: "Explorer comment l'IA et la technologie numérique habilitent la création artistique tout en préservant la chaleur et la profondeur de l'esprit humain.", ja: 'AIとデジタル技術がいかに芸術創作を力づけ、同時に人文精神の温かさと深さを保つかを探求します。' },
    
    // Values
    'values.label': { zh: '我们的价值观', en: 'Our Values', fr: 'Nos Valeurs', ja: '私たちの価値観' },
    'val1.title': { zh: '包容', en: 'Inclusivity', fr: 'Inclusivité', ja: '包容性' },
    'val1.desc': { zh: '尊重每一种文化表达', en: 'Respecting every cultural expression', fr: 'Respecter chaque expression culturelle', ja: 'あらゆる文化的表現を尊重' },
    'val2.title': { zh: '卓越', en: 'Excellence', fr: 'Excellence', ja: '卓越' },
    'val2.desc': { zh: '追求最高艺术标准', en: 'Pursuing the highest artistic standards', fr: 'Poursuivre les plus hauts standards artistiques', ja: '最高の芸術基準を追求' },
    'val3.title': { zh: '对话', en: 'Dialogue', fr: 'Dialogue', ja: '対話' },
    'val3.desc': { zh: '促进文明间的理解', en: 'Fostering understanding between civilizations', fr: 'Favoriser la compréhension entre civilisations', ja: '文明間の理解を促進' },
    'val4.title': { zh: '传承', en: 'Heritage', fr: 'Patrimoine', ja: '継承' },
    'val4.desc': { zh: '守护人类共同遗产', en: "Safeguarding humanity's shared heritage", fr: "Sauvegarder le patrimoine commun de l'humanité", ja: '人類共通の遺産を守る' },
    
    // Partnership
    'partnership.label': { zh: '合作机构', en: 'Institutional Partners', fr: 'Partenaires Institutionnels', ja: '提携機関' },
    'partnership.title': { zh: '全球文化网络', en: 'Global Cultural Network', fr: 'Réseau Culturel Mondial', ja: 'グローバル文化ネットワーク' },
    'partnership.desc': { zh: '无魔协会与全球顶级文化机构、美术馆、大学及国际组织建立了广泛的合作网络，共同推动艺术与文化的全球传播。', en: 'ManaEndless has established an extensive partnership network with leading global cultural institutions, museums, universities, and international organizations, jointly advancing the global dissemination of art and culture.', fr: "ManaEndless a établi un vaste réseau de partenariats avec les principales institutions culturelles mondiales, musées, universités et organisations internationales, faisant progresser conjointement la diffusion mondiale de l'art et de la culture.", ja: 'マナエンドレスは、世界をリードする文化機関、美術館、大学、国際組織との広範なパートナーシップネットワークを構築し、芸術と文化のグローバルな普及を共同で推進しています。' },
    
    // CTA
    'cta.title': { zh: '加入我们的文化使命', en: 'Join Our Cultural Mission', fr: 'Rejoignez Notre Mission Culturelle', ja: '私たちの文化的使命に参加' },
    'cta.desc': { zh: '无论您是艺术家、策展人、文化机构还是热爱艺术的个人，我们都欢迎您成为无魔协会全球文化网络的一部分。', en: 'Whether you are an artist, curator, cultural institution, or art enthusiast, we welcome you to become part of the ManaEndless global cultural network.', fr: "Que vous soyez artiste, conservateur, institution culturelle ou passionné d'art, nous vous invitons à faire partie du réseau culturel mondial ManaEndless.", ja: 'アーティスト、キュレーター、文化機関、またはアート愛好家の方、マナエンドレスのグローバル文化ネットワークの一員になることを歓迎します。' },
    'cta.contact': { zh: '联系我们', en: 'Contact Us', fr: 'Contactez-nous', ja: 'お問い合わせ' },
    'cta.back': { zh: '返回 OPC Global', en: 'Back to OPC Global', fr: 'Retour à OPC Global', ja: 'OPC Globalに戻る' },
  };
  return texts[key]?.[lang] || texts[key]?.['en'] || key;
};

const exhibitions = [
  { key: 'ex1', icon: Palette, accent: 'from-amber-600/20 to-amber-500/5' },
  { key: 'ex2', icon: Globe2, accent: 'from-blue-600/20 to-blue-500/5' },
  { key: 'ex3', icon: Sparkles, accent: 'from-violet-600/20 to-violet-500/5' },
];

const values = [
  { key: 'val1', icon: Heart },
  { key: 'val2', icon: Sparkles },
  { key: 'val3', icon: Globe2 },
  { key: 'val4', icon: Palette },
];

const partners = [
  'UNESCO', 'Swiss Arts Council Pro Helvetia', 'Art Basel', 'Fondation de France',
  'Asia Society', 'British Council', 'Goethe-Institut', 'Japan Foundation',
];

export default function ManaEndless() {
  const { language } = useLanguage();
  const l = (key: string) => t(language, key);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navigation />

      {/* Hero — Immersive, Gallery-like */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Subtle Swiss cross pattern background */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0h10v25H60v10H35v25H25V35H0V25h25z' fill='%230A1626' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }} />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-[oklch(0.97_0.005_90)]" />
        
        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          {/* Swiss badge */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="badge-official">
              <MapPin className="w-3 h-3 mr-1.5" />
              {l('org.location')}
            </span>
          </div>

          {/* Organization type */}
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6 font-medium">
            {l('org.type')}
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
            <a href="#exhibitions">
              <Button className="h-12 px-8 text-sm tracking-wide bg-foreground text-background hover:bg-foreground/90 gap-2">
                {l('hero.cta.exhibitions')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="#mission">
              <Button variant="outline" className="h-12 px-8 text-sm tracking-wide border-border hover:border-gold/40 gap-2">
                {l('hero.cta.about')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="section-padding bg-white">
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

      {/* Core Pillars */}
      <section className="section-padding bg-[oklch(0.97_0.005_90)]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4 font-medium">
              {l('pillars.label')}
            </p>
            <div className="section-divider" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => {
              const icons = [Palette, Globe2, Heart, Sparkles];
              const Icon = icons[i - 1];
              return (
                <div key={i} className="pillar-card group">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-sm flex items-center justify-center bg-[oklch(0.62_0.1_75/0.08)] shrink-0">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-3 text-lg md:text-xl">
                        {l(`pillar${i}.title`)}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {l(`pillar${i}.desc`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Exhibitions */}
      <section id="exhibitions" className="section-padding bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4 font-medium">
              {l('exhibitions.label')}
            </p>
            <h2 className="font-heading font-bold text-foreground mb-4">
              {l('exhibitions.title')}
            </h2>
            <div className="section-divider" />
          </div>

          <div className="space-y-8">
            {exhibitions.map(({ key, icon: Icon, accent }, idx) => (
              <div key={key} className="group relative border border-border hover:border-gold/30 transition-all duration-300 bg-white overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundImage: `linear-gradient(90deg, oklch(0.62 0.1 75), oklch(0.78 0.08 75))` }}
                />
                
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Number & Icon */}
                    <div className="flex items-center gap-4 md:flex-col md:items-center md:w-20 shrink-0">
                      <span className="text-4xl md:text-5xl font-heading font-bold text-border/60 group-hover:text-gold/30 transition-colors">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="w-10 h-10 rounded-sm flex items-center justify-center bg-[oklch(0.62_0.1_75/0.06)]">
                        <Icon className="w-4 h-4 text-gold" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-foreground text-lg md:text-xl mb-3">
                        {l(`${key}.title`)}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {l(`${key}.desc`)}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-gold/60" />
                          {l(`${key}.location`)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-gold/60" />
                          {l(`${key}.date`)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-deep-blue section-padding pattern-overlay">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold-light mb-4 font-medium" style={{ color: 'oklch(0.78 0.08 75)' }}>
              {l('values.label')}
            </p>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {values.map(({ key, icon: Icon }, idx) => (
              <div key={key} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-5 rounded-sm border border-white/10 flex items-center justify-center group-hover:border-gold/30 transition-colors">
                  <Icon className="w-5 h-5" style={{ color: 'oklch(0.78 0.08 75)' }} />
                </div>
                <h4 className="font-heading text-lg font-semibold text-white mb-2">
                  {l(`${key}.title`)}
                </h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  {l(`${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-white">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4 font-medium">
            {l('partnership.label')}
          </p>
          <h2 className="font-heading font-bold text-foreground mb-4">
            {l('partnership.title')}
          </h2>
          <div className="section-divider mb-8" />
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-12">
            {l('partnership.desc')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {partners.map((partner) => (
              <div key={partner} className="py-5 px-4 border border-border/60 hover:border-gold/30 transition-colors text-center">
                <span className="text-xs md:text-sm font-medium text-muted-foreground tracking-wide">
                  {partner}
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
              {l('cta.contact')}
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
