import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building2, GraduationCap, Rocket, Globe, Users, Shield, Banknote, MapPin, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";

type Language = "en" | "zh" | "fr" | "ja";

export default function Hub() {
  const { language } = useLanguage();

  const translations: Record<string, Record<Language, string>> = {
    title: {
      en: "OPC Hub",
      zh: "OPC 服务中心",
      fr: "Hub OPC",
      ja: "OPCハブ"
    },
    subtitle: {
      en: "Your Gateway to Building a Successful One-Person Company",
      zh: "构建成功一人公司的门户",
      fr: "Votre Passerelle vers la Création d'une Entreprise Unipersonnelle Réussie",
      ja: "成功する一人会社を構築するためのゲートウェイ"
    },
    backToHome: {
      en: "Back to Home",
      zh: "返回首页",
      fr: "Retour à l'accueil",
      ja: "ホームに戻る"
    },
    servicesTitle: {
      en: "Our Services",
      zh: "我们的服务",
      fr: "Nos Services",
      ja: "サービス"
    },
    consultingTitle: {
      en: "Consulting",
      zh: "咨询服务",
      fr: "Conseil",
      ja: "コンサルティング"
    },
    consultingDesc: {
      en: "Expert guidance on business strategy, market positioning, and operational optimization for one-person companies.",
      zh: "为一人公司提供商业战略、市场定位和运营优化的专家指导。",
      fr: "Conseils d'experts sur la stratégie commerciale, le positionnement sur le marché et l'optimisation opérationnelle pour les entreprises unipersonnelles.",
      ja: "一人会社のためのビジネス戦略、市場ポジショニング、運営最適化に関する専門家のガイダンス。"
    },
    consultingFeatures: {
      en: "Business Model Design|Market Analysis|Growth Strategy|AI Integration",
      zh: "商业模式设计|市场分析|增长战略|AI集成",
      fr: "Conception de Modèle Commercial|Analyse de Marché|Stratégie de Croissance|Intégration IA",
      ja: "ビジネスモデル設計|市場分析|成長戦略|AI統合"
    },
    trainingTitle: {
      en: "Training",
      zh: "培训服务",
      fr: "Formation",
      ja: "トレーニング"
    },
    trainingDesc: {
      en: "Comprehensive training programs covering AI tools, business operations, and personal development for solopreneurs.",
      zh: "涵盖AI工具、业务运营和个人发展的综合培训项目，专为独立创业者设计。",
      fr: "Programmes de formation complets couvrant les outils IA, les opérations commerciales et le développement personnel pour les solopreneurs.",
      ja: "ソロプレナー向けのAIツール、ビジネス運営、個人開発をカバーする包括的なトレーニングプログラム。"
    },
    trainingFeatures: {
      en: "AI Mastery|Business Skills|Leadership|Certification Programs",
      zh: "AI精通|商业技能|领导力|认证项目",
      fr: "Maîtrise IA|Compétences Commerciales|Leadership|Programmes de Certification",
      ja: "AIマスタリー|ビジネススキル|リーダーシップ|認定プログラム"
    },
    incubationTitle: {
      en: "Local OPC Incubation",
      zh: "本地OPC孵化",
      fr: "Incubation OPC Locale",
      ja: "ローカルOPCインキュベーション"
    },
    incubationDesc: {
      en: "End-to-end incubation services including workspace, mentorship, and resources to launch your OPC successfully.",
      zh: "端到端孵化服务，包括工作空间、导师指导和资源，助您成功启动OPC。",
      fr: "Services d'incubation de bout en bout incluant espace de travail, mentorat et ressources pour lancer votre OPC avec succès.",
      ja: "ワークスペース、メンタリング、リソースを含むエンドツーエンドのインキュベーションサービスで、OPCを成功裏に立ち上げます。"
    },
    incubationFeatures: {
      en: "Co-working Space|Mentorship|Funding Access|Network Events",
      zh: "共享办公空间|导师指导|融资渠道|社交活动",
      fr: "Espace de Coworking|Mentorat|Accès au Financement|Événements Réseau",
      ja: "コワーキングスペース|メンタリング|資金アクセス|ネットワークイベント"
    },
    partnerTitle: {
      en: "Global Regional Partner Program",
      zh: "全球地区合伙人计划",
      fr: "Programme de Partenaires Régionaux Mondiaux",
      ja: "グローバル地域パートナープログラム"
    },
    partnerSubtitle: {
      en: "Join us in building the global OPC ecosystem",
      zh: "加入我们，共建全球OPC生态系统",
      fr: "Rejoignez-nous pour construire l'écosystème OPC mondial",
      ja: "グローバルOPCエコシステムの構築に参加"
    },
    partnerDesc: {
      en: "We're actively recruiting regional partners worldwide to establish local OPC Hubs. Partners receive exclusive territory rights, comprehensive training, and ongoing support.",
      zh: "我们正在全球范围内积极招募地区合伙人，建立本地OPC服务中心。合伙人将获得独家区域权益、全面培训和持续支持。",
      fr: "Nous recrutons activement des partenaires régionaux dans le monde entier pour établir des Hubs OPC locaux. Les partenaires reçoivent des droits territoriaux exclusifs, une formation complète et un soutien continu.",
      ja: "ローカルOPCハブを設立するため、世界中で地域パートナーを積極的に募集しています。パートナーは独占的な地域権利、包括的なトレーニング、継続的なサポートを受けられます。"
    },
    complianceTitle: {
      en: "Local Compliance",
      zh: "在地合规",
      fr: "Conformité Locale",
      ja: "ローカルコンプライアンス"
    },
    complianceDesc: {
      en: "Navigate local regulations with our comprehensive compliance framework tailored to each jurisdiction.",
      zh: "通过我们针对各辖区定制的全面合规框架，轻松应对当地法规。",
      fr: "Naviguez dans les réglementations locales avec notre cadre de conformité complet adapté à chaque juridiction.",
      ja: "各管轄区域に合わせた包括的なコンプライアンスフレームワークで、現地の規制に対応。"
    },
    splitTitle: {
      en: "Automated Revenue Split",
      zh: "自动分账系统",
      fr: "Répartition Automatique des Revenus",
      ja: "自動収益分配"
    },
    splitDesc: {
      en: "Our proprietary system ensures transparent, real-time revenue distribution between headquarters and regional partners.",
      zh: "我们的专有系统确保总部与地区合伙人之间透明、实时的收入分配。",
      fr: "Notre système propriétaire assure une distribution des revenus transparente et en temps réel entre le siège et les partenaires régionaux.",
      ja: "独自のシステムにより、本部と地域パートナー間の透明でリアルタイムな収益分配を実現。"
    },
    benefitsTitle: {
      en: "Partner Benefits",
      zh: "合伙人权益",
      fr: "Avantages Partenaires",
      ja: "パートナー特典"
    },
    benefit1: {
      en: "Exclusive territory rights",
      zh: "独家区域权益",
      fr: "Droits territoriaux exclusifs",
      ja: "独占的な地域権利"
    },
    benefit2: {
      en: "Complete training & certification",
      zh: "完整培训与认证",
      fr: "Formation et certification complètes",
      ja: "完全なトレーニングと認定"
    },
    benefit3: {
      en: "Marketing & brand support",
      zh: "营销与品牌支持",
      fr: "Support marketing et marque",
      ja: "マーケティングとブランドサポート"
    },
    benefit4: {
      en: "Technology platform access",
      zh: "技术平台接入",
      fr: "Accès à la plateforme technologique",
      ja: "テクノロジープラットフォームへのアクセス"
    },
    benefit5: {
      en: "Revenue sharing model",
      zh: "收益分成模式",
      fr: "Modèle de partage des revenus",
      ja: "収益分配モデル"
    },
    benefit6: {
      en: "Global network access",
      zh: "全球网络接入",
      fr: "Accès au réseau mondial",
      ja: "グローバルネットワークへのアクセス"
    },
    applyPartner: {
      en: "Apply to Become a Partner",
      zh: "申请成为合伙人",
      fr: "Postuler pour Devenir Partenaire",
      ja: "パートナーに申請"
    },
    contactUs: {
      en: "Contact Us",
      zh: "联系我们",
      fr: "Contactez-nous",
      ja: "お問い合わせ"
    },
    getStarted: {
      en: "Get Started",
      zh: "开始",
      fr: "Commencer",
      ja: "始める"
    }
  };

  const getText = (key: string) => translations[key]?.[language as Language] || translations[key]?.en || key;

  const services = [
    {
      icon: Building2,
      title: getText("consultingTitle"),
      description: getText("consultingDesc"),
      features: getText("consultingFeatures").split("|"),
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: GraduationCap,
      title: getText("trainingTitle"),
      description: getText("trainingDesc"),
      features: getText("trainingFeatures").split("|"),
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: Rocket,
      title: getText("incubationTitle"),
      description: getText("incubationDesc"),
      features: getText("incubationFeatures").split("|"),
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/10"
    }
  ];

  const benefits = [
    getText("benefit1"),
    getText("benefit2"),
    getText("benefit3"),
    getText("benefit4"),
    getText("benefit5"),
    getText("benefit6")
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {getText("backToHome")}
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
              <Globe className="h-3 w-3 mr-1" />
              Global Service Network
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              {getText("title")}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              {getText("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              {getText("servicesTitle")}
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:border-primary/30 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-xl ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6 gap-2" variant="outline">
                    {getText("getStarted")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Local Compliance */}
            <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">{getText("complianceTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{getText("complianceDesc")}</p>
              </CardContent>
            </Card>

            {/* Automated Revenue Split */}
            <Card className="bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border-blue-500/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                  <Banknote className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{getText("splitTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{getText("splitDesc")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Regional Partner Program */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary">
                  <Users className="h-3 w-3 mr-1" />
                  {getText("partnerTitle")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                  {getText("partnerSubtitle")}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {getText("partnerDesc")}
                </p>
                <Link href="/#certification">
                  <Button size="lg" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    {getText("applyPartner")}
                  </Button>
                </Link>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-2xl p-8 border border-primary/20">
                <h3 className="font-bold text-lg mb-6">{getText("benefitsTitle")}</h3>
                <div className="grid gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Map Placeholder */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Global Presence
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our network spans across continents, bringing OPC services to entrepreneurs worldwide.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto h-[400px] rounded-2xl bg-slate-800/50 border border-white/10 overflow-hidden">
            {/* Simplified world map representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-5 gap-8">
                {["North America", "Europe", "Asia", "Middle East", "Oceania"].map((region, i) => (
                  <div key={i} className="text-center">
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse mx-auto mb-2" />
                    <span className="text-xs text-white/60">{region}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-white/40">
              <span>🌍 Active Hubs: 12</span>
              <span>🚀 Coming Soon: 8</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Ready to Start Your OPC Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Connect with our team to explore how OPC Hub can support your entrepreneurial goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#certification">
                <Button size="lg" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  {getText("getStarted")}
                </Button>
              </Link>
              <a href="mailto:contact@opc.global">
                <Button size="lg" variant="outline" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  {getText("contactUs")}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/40 bg-muted/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} OPC Global Alliance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
