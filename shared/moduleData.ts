/**
 * OPC Global — Structured Module Data
 * 
 * Every key module's content is defined as structured data (JSON-serializable).
 * This ensures:
 * 1. Website rendering uses the same data source
 * 2. Export to JSON / YAML / Markdown is trivially consistent
 * 3. Auto-generated PPT slides use identical content
 * 
 * All text fields are multilingual: { en, zh, fr, ja }
 */

export interface LocalizedText {
  en: string;
  zh: string;
  fr: string;
  ja: string;
}

export interface ModuleSection {
  id: string;
  title: LocalizedText;
  subtitle?: LocalizedText;
  description?: LocalizedText;
  items?: ModuleItem[];
  stats?: ModuleStat[];
}

export interface ModuleItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon?: string;
  link?: string;
  tags?: string[];
}

export interface ModuleStat {
  value: string;
  label: LocalizedText;
  description?: LocalizedText;
}

export interface OPCModule {
  id: string;
  slug: string;
  name: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  sections: ModuleSection[];
  metadata: {
    version: string;
    lastUpdated: string;
    author: string;
  };
}

// ============================================================
// OPC UNIverse — The Ecosystem Overview
// ============================================================
export const universeModule: OPCModule = {
  id: "opc-universe",
  slug: "universe",
  name: { en: "OPC UNIverse", zh: "OPC 宇宙", fr: "OPC Univers", ja: "OPC ユニバース" },
  tagline: {
    en: "An Open, Fair, Fraternal, and Innovative Ecosystem",
    zh: "一个开放、公平、友爱、创新的生态系统",
    fr: "Un Écosystème Ouvert, Équitable, Fraternel et Innovant",
    ja: "オープン、公平、友愛、革新的なエコシステム",
  },
  description: {
    en: "The OPC UNIverse is the comprehensive ecosystem that empowers super-individuals through three interconnected pillars: HOM (Body), UNI (Mind), and DAO (Soul).",
    zh: "OPC 宇宙是通过三大互联支柱赋能超级个体的综合生态系统：HOM（身体）、UNI（智慧）、DAO（灵魂）。",
    fr: "L'OPC UNIverse est l'écosystème complet qui autonomise les super-individus à travers trois piliers interconnectés.",
    ja: "OPC UNIverseは、3つの相互接続された柱を通じてスーパー個人を支援する包括的なエコシステムです。",
  },
  sections: [
    {
      id: "core-values",
      title: { en: "Core Values", zh: "核心价值观", fr: "Valeurs Fondamentales", ja: "コアバリュー" },
      items: [
        { id: "justice", title: { en: "Justice", zh: "公正", fr: "Justice", ja: "正義" }, description: { en: "Fair and equitable treatment for all participants", zh: "对所有参与者公正平等的对待", fr: "Traitement juste et équitable", ja: "すべての参加者への公正な扱い" } },
        { id: "fairness", title: { en: "Fairness", zh: "公平", fr: "Équité", ja: "公平" }, description: { en: "Equal opportunity and transparent processes", zh: "平等机会与透明流程", fr: "Égalité des chances et processus transparents", ja: "平等な機会と透明なプロセス" } },
        { id: "fraternity", title: { en: "Fraternity", zh: "友爱", fr: "Fraternité", ja: "友愛" }, description: { en: "Mutual support and community bonds", zh: "相互支持与社区纽带", fr: "Soutien mutuel et liens communautaires", ja: "相互支援とコミュニティの絆" } },
        { id: "innovation", title: { en: "Innovation", zh: "创新", fr: "Innovation", ja: "イノベーション" }, description: { en: "Continuous advancement through AI and technology", zh: "通过AI和技术持续进步", fr: "Avancement continu par l'IA et la technologie", ja: "AIとテクノロジーによる継続的な進歩" } },
      ],
    },
    {
      id: "three-pillars",
      title: { en: "The Three Pillars", zh: "三大核心支柱", fr: "Les Trois Piliers", ja: "3つの柱" },
      items: [
        {
          id: "hom",
          title: { en: "OPC HOM — The Body", zh: "OPC HOM — 身体", fr: "OPC HOM — Le Corps", ja: "OPC HOM — 体" },
          description: { en: "Habitat & Execution: The core physical and digital interface providing the 'exoskeleton' for super-individuals.", zh: "栖息地与执行力：为超级个体提供「外骨骼」的核心物理与数字接口。", fr: "Habitat et Exécution: L'interface physique et numérique centrale.", ja: "生息地と実行力：スーパー個人の「外骨格」を提供するコアインターフェース。" },
          link: "/hom",
        },
        {
          id: "uni",
          title: { en: "OPC UNI — The Mind", zh: "OPC UNI — 智慧", fr: "OPC UNI — L'Esprit", ja: "OPC UNI — 知恵" },
          description: { en: "Education & Intelligence: The world's first educational entity with an AI legal principal, ensuring '0.5/3/2' competency.", zh: "教育与智能中台：世界上第一所由AI担任法定校长的教育实体，确保「0.5/3/2」素养。", fr: "Éducation et Intelligence: Première entité éducative IA au monde.", ja: "教育とインテリジェンス：AI法定校長の世界初の教育機関。" },
          link: "/uni",
        },
        {
          id: "dao",
          title: { en: "OPC DAO — The Soul", zh: "OPC DAO — 灵魂", fr: "OPC DAO — L'Âme", ja: "OPC DAO — 魂" },
          description: { en: "Governance & Consensus: The 'conscience' layer responsible for rule-making, value distribution, and knowledge assetization.", zh: "治理与共识机制：负责规则制定、价值分配与知识资产化的「良知」层。", fr: "Gouvernance et Consensus: La couche 'conscience' de l'écosystème.", ja: "ガバナンスとコンセンサス：ルール策定と知識資産化を担う「良心」層。" },
          link: "/dao",
        },
      ],
    },
    {
      id: "evolution-path",
      title: { en: "Evolution Path", zh: "进化路径", fr: "Chemin d'Évolution", ja: "進化パス" },
      description: {
        en: "Production relations shift from employment to collaboration, organizational forms from hierarchy to network.",
        zh: "生产关系从雇佣转向协作，组织形态从科层制转向网络化。",
        fr: "Les relations de production passent de l'emploi à la collaboration.",
        ja: "生産関係は雇用から協力へ、組織形態は階層制からネットワーク化へ。",
      },
      items: [
        { id: "opc", title: { en: "OPC — Super Individual", zh: "OPC — 超级个体", fr: "OPC — Super Individu", ja: "OPC — スーパー個人" }, description: { en: "Master AI tools and achieve independent productivity", zh: "掌握AI工具，实现独立产能", fr: "Maîtriser les outils IA", ja: "AIツールをマスターし独立した生産性を実現" } },
        { id: "ope", title: { en: "OPE — One-Person Entrepreneur", zh: "OPE — 一人企业家", fr: "OPE — Entrepreneur Unipersonnel", ja: "OPE — 一人起業家" }, description: { en: "Build and scale a one-person business", zh: "构建和扩展一人企业", fr: "Construire et développer une entreprise unipersonnelle", ja: "一人ビジネスを構築・拡大" } },
        { id: "opu", title: { en: "OPU — One-Person Unicorn", zh: "OPU — 个体独角兽", fr: "OPU — Licorne Unipersonnelle", ja: "OPU — 一人ユニコーン" }, description: { en: "Achieve unicorn-level impact as a solo operator", zh: "作为个体运营者实现独角兽级别的影响力", fr: "Atteindre un impact de licorne en solo", ja: "ソロオペレーターとしてユニコーンレベルの影響力を達成" } },
      ],
    },
  ],
  metadata: { version: "1.0.0", lastUpdated: "2026-03-07", author: "OPC Global Alliance" },
};

// ============================================================
// OPC HOM — The Body
// ============================================================
export const homModule: OPCModule = {
  id: "opc-hom",
  slug: "hom",
  name: { en: "OPC HOM", zh: "OPC HOM", fr: "OPC HOM", ja: "OPC HOM" },
  tagline: {
    en: "The Body: Habitat & Execution",
    zh: "身体：栖息地与执行力",
    fr: "Le Corps: Habitat et Exécution",
    ja: "体：生息地と実行力",
  },
  description: {
    en: "The core physical and digital interface of the OPC Universe ecosystem. Through our proprietary global order distribution and compliant revenue-sharing system, we automate administrative affairs, ensuring 'Learn = Earn'.",
    zh: "OPC 宇宙生态下的核心物理与数字接口。通过自研的全球订单分发与合规分账系统，将税务、法务等行政事务自动化，确保「所学即所赚」。",
    fr: "L'interface physique et numérique centrale de l'écosystème OPC Universe.",
    ja: "OPCユニバースエコシステムの中核となる物理的・デジタルインターフェース。",
  },
  sections: [
    {
      id: "three-meanings",
      title: { en: "Three Meanings of HOM", zh: "HOM 的三重含义", fr: "Les Trois Significations de HOM", ja: "HOMの3つの意味" },
      items: [
        { id: "platform", title: { en: "Platform / Interface", zh: "平台/接口", fr: "Plateforme / Interface", ja: "プラットフォーム/インターフェース" }, description: { en: "The 'exoskeleton' for super-individuals — global order distribution and compliant revenue-sharing", zh: "超级个体的「外骨骼」— 全球订单分发与合规分账", fr: "L'exosquelette pour les super-individus", ja: "スーパー個人の「外骨格」" }, icon: "Building2" },
        { id: "home", title: { en: "Home / Harbor", zh: "家/港湾", fr: "Maison / Port", ja: "ホーム/港" }, description: { en: "Psychological safety community for digital nomads — co-living, co-working, co-creating", zh: "数字游民的心理安全感社区 — 共居、共创、共生", fr: "Communauté de sécurité psychologique pour les nomades numériques", ja: "デジタルノマドのための心理的安全コミュニティ" }, icon: "Heart" },
        { id: "primordial", title: { en: "HOM / Primordial Sound", zh: "HOM/本源之音", fr: "HOM / Son Primordial", ja: "HOM/原初の音" }, description: { en: "Activating real estate and cultural tourism assets through the OPC ecosystem", zh: "通过OPC生态激活存量地产与乡村文旅资产", fr: "Activation des actifs immobiliers et touristiques culturels", ja: "OPCエコシステムを通じた不動産・文化観光資産の活性化" }, icon: "Sparkles" },
      ],
    },
    {
      id: "business-model",
      title: { en: "Business Model", zh: "商业模式", fr: "Modèle d'Affaires", ja: "ビジネスモデル" },
      items: [
        { id: "order-distribution", title: { en: "Global Order Distribution", zh: "全球订单分发", fr: "Distribution Mondiale des Commandes", ja: "グローバル受注配信" }, description: { en: "Automated matching of projects to qualified OPC practitioners worldwide", zh: "将项目自动匹配给全球合格的OPC从业者", fr: "Mise en correspondance automatique des projets", ja: "プロジェクトの自動マッチング" } },
        { id: "revenue-sharing", title: { en: "Compliant Revenue Sharing", zh: "合规分账", fr: "Partage des Revenus Conforme", ja: "コンプライアンス収益分配" }, description: { en: "Automated tax, legal, and financial compliance across jurisdictions", zh: "跨司法管辖区的自动化税务、法务和财务合规", fr: "Conformité automatisée des taxes et finances", ja: "管轄区域を超えた自動化された税務・法務コンプライアンス" } },
        { id: "space-activation", title: { en: "Space Activation", zh: "空间激活", fr: "Activation des Espaces", ja: "スペース活性化" }, description: { en: "Transforming underutilized real estate into vibrant OPC hubs", zh: "将闲置不动产转化为活力OPC枢纽", fr: "Transformation des biens immobiliers sous-utilisés", ja: "未活用不動産をOPCハブに変換" } },
      ],
    },
  ],
  metadata: { version: "1.0.0", lastUpdated: "2026-03-07", author: "OPC Global Alliance" },
};

// ============================================================
// OPC UNI — The Mind
// ============================================================
export const uniModule: OPCModule = {
  id: "opc-uni",
  slug: "uni",
  name: { en: "OPC UNI", zh: "OPC UNI", fr: "OPC UNI", ja: "OPC UNI" },
  tagline: {
    en: "The Mind: Education & Intelligence",
    zh: "智慧：教育与智能中台",
    fr: "L'Esprit: Éducation et Intelligence",
    ja: "知恵：教育とインテリジェンス",
  },
  description: {
    en: "The world's first educational entity with an AI as its legal principal. We ensure individuals possess the '0.5/3/2' high-efficiency competency.",
    zh: "世界上第一所由 AI 担任法定校长的教育实体。确保个体具备「0.5/3/2」的高效能素养。",
    fr: "La première entité éducative au monde avec une IA comme directeur légal.",
    ja: "AIを法定校長とする世界初の教育機関。",
  },
  sections: [
    {
      id: "certification-levels",
      title: { en: "Certification Levels", zh: "认证等级", fr: "Niveaux de Certification", ja: "認定レベル" },
      items: [
        { id: "l1", title: { en: "L1 — AI Coach", zh: "L1 — 智能教练", fr: "L1 — Coach IA", ja: "L1 — AIコーチ" }, description: { en: "AI basics and independent productivity. Master fundamental AI tools and coach others.", zh: "掌握AI工具，教练他人解锁独立产能。", fr: "Bases IA et productivité indépendante. Coacher les autres.", ja: "AI基礎と独立した生産性。他者をコーチング。" } },
        { id: "l2", title: { en: "L2 — Principal Coach", zh: "L2 — 首席教练", fr: "L2 — Coach Principal", ja: "L2 — プリンシパルコーチ" }, description: { en: "¥5M+ annual revenue, third-party audited. Proven business results.", zh: "年营业额达500万，需通过第三方审计。经过验证的商业成果。", fr: "5M+ de revenus annuels, audité par un tiers.", ja: "年商500万以上、第三者監査済み。" } },
        { id: "l3", title: { en: "L3 — Titan Club", zh: "L3 — 泰坦俱乐部", fr: "L3 — Club Titan", ja: "L3 — タイタンクラブ" }, description: { en: "¥50M+ revenue, team ≤50, invitation only. Elite practitioners.", zh: "年营收5000万+，团队≤50人，仅限邀请。精英实战派。", fr: "50M+ de revenus, équipe ≤50, sur invitation.", ja: "年商5000万以上、チーム50人以下、招待制。" } },
      ],
    },
    {
      id: "efficiency-model",
      title: { en: "The 0.5/3/2 Model", zh: "0.5/3/2 模型", fr: "Le Modèle 0.5/3/2", ja: "0.5/3/2モデル" },
      stats: [
        { value: "0.5", label: { en: "Time Arbitrage", zh: "时间套利", fr: "Arbitrage Temporel", ja: "タイムアービトラージ" }, description: { en: "Cut execution time by half", zh: "执行时间减半", fr: "Réduire le temps d'exécution de moitié", ja: "実行時間を半分に" } },
        { value: "3.0", label: { en: "Output Multiplier", zh: "产出倍增", fr: "Multiplicateur de Sortie", ja: "アウトプット倍増" }, description: { en: "Triple your creative output", zh: "创意产出三倍增长", fr: "Tripler votre production créative", ja: "クリエイティブアウトプットを3倍に" } },
        { value: "2.0", label: { en: "Value Capture", zh: "价值捕获", fr: "Capture de Valeur", ja: "バリューキャプチャ" }, description: { en: "Double your captured value", zh: "价值捕获翻倍", fr: "Doubler votre valeur capturée", ja: "獲得価値を2倍に" } },
      ],
    },
  ],
  metadata: { version: "1.0.0", lastUpdated: "2026-03-07", author: "OPC Global Alliance" },
};

// ============================================================
// OPC DAO — The Soul
// ============================================================
export const daoModule: OPCModule = {
  id: "opc-dao",
  slug: "dao",
  name: { en: "OPC DAO", zh: "OPC DAO", fr: "OPC DAO", ja: "OPC DAO" },
  tagline: {
    en: "The Soul: Governance & Consensus",
    zh: "灵魂：治理与共识机制",
    fr: "L'Âme: Gouvernance et Consensus",
    ja: "魂：ガバナンスとコンセンサス",
  },
  description: {
    en: "The 'conscience' and governance layer of the ecosystem, responsible for rule-making, value distribution, and knowledge assetization.",
    zh: "生态的「良知」与治理层，负责规则制定、价值分配与知识资产化。",
    fr: "La 'conscience' et la couche de gouvernance de l'écosystème.",
    ja: "エコシステムの「良心」とガバナンス層。",
  },
  sections: [
    {
      id: "governance",
      title: { en: "Dual-Chamber Governance", zh: "双院制治理", fr: "Gouvernance Bicamérale", ja: "二院制ガバナンス" },
      items: [
        { id: "token-house", title: { en: "Token House", zh: "代币之家", fr: "Maison des Tokens", ja: "トークンハウス" }, description: { en: "Economic governance through token-weighted voting for treasury management and protocol upgrades.", zh: "通过代币加权投票进行经济治理，管理国库和协议升级。", fr: "Gouvernance économique par vote pondéré par tokens.", ja: "トークン加重投票による経済ガバナンス。" } },
        { id: "citizen-house", title: { en: "Citizen House", zh: "公民之家", fr: "Maison des Citoyens", ja: "市民ハウス" }, description: { en: "Reputation-based governance ensuring one-person-one-vote for knowledge curation.", zh: "基于声誉的治理，确保知识策展的一人一票。", fr: "Gouvernance basée sur la réputation.", ja: "評判ベースのガバナンス。" } },
      ],
    },
    {
      id: "architecture",
      title: { en: "Three-Layer Architecture", zh: "三层架构", fr: "Architecture à Trois Couches", ja: "三層アーキテクチャ" },
      items: [
        { id: "tech", title: { en: "Technology Layer", zh: "技术层", fr: "Couche Technologique", ja: "技術層" }, description: { en: "Built on Arweave + Irys for permanent data storage, WeaveDB for high-frequency logic.", zh: "基于Arweave + Irys实现永久数据存储，WeaveDB处理高频逻辑。", fr: "Construit sur Arweave + Irys.", ja: "永続的なデータストレージのためのArweave + Irys。" }, tags: ["Arweave", "Irys", "WeaveDB", "Glacier Network"] },
        { id: "gov", title: { en: "Governance Layer", zh: "治理层", fr: "Couche de Gouvernance", ja: "ガバナンス層" }, description: { en: "Leveraging Optimism Citizens' House, Gitcoin Passport, and Kleros.", zh: "利用Optimism Citizens' House、Gitcoin Passport和Kleros。", fr: "Optimism Citizens' House, Gitcoin Passport, Kleros.", ja: "Optimism Citizens' House、Gitcoin Passport、Kleros。" }, tags: ["Optimism", "Gitcoin", "Kleros"] },
        { id: "econ", title: { en: "Economic Layer", zh: "经济层", fr: "Couche Économique", ja: "経済層" }, description: { en: "Cayman Foundation Company with asset lock, investing through Backed Finance and Ondo Finance.", zh: "开曼基金会公司，资产锁定，通过Backed Finance和Ondo Finance投资。", fr: "Cayman Foundation Company avec investissements.", ja: "ケイマン財団法人。" }, tags: ["Cayman Foundation", "Backed Finance", "Ondo Finance"] },
      ],
    },
    {
      id: "principles",
      title: { en: "Core Principles", zh: "核心原则", fr: "Principes Fondamentaux", ja: "コア原則" },
      items: [
        { id: "sovereignty", title: { en: "Data Sovereignty", zh: "数据主权", fr: "Souveraineté des Données", ja: "データ主権" }, description: { en: "Complete censorship resistance ensuring knowledge remains accessible.", zh: "完全抗审查，确保知识始终可访问。", fr: "Résistance complète à la censure.", ja: "完全な検閲耐性。" } },
        { id: "anti-sybil", title: { en: "Anti-Sybil & Traceability", zh: "反女巫与溯源", fr: "Anti-Sybil et Traçabilité", ja: "アンチシビル＆トレーサビリティ" }, description: { en: "Every contribution is verified and traceable.", zh: "每项贡献都经过验证且可追溯。", fr: "Chaque contribution est vérifiée et traçable.", ja: "すべての貢献は検証され追跡可能。" } },
        { id: "non-profit", title: { en: "Non-Profit Motivation", zh: "非营利动机", fr: "Motivation Non Lucrative", ja: "非営利動機" }, description: { en: "Pure mission-driven operation with no profit extraction.", zh: "纯粹使命驱动运营，无利润提取。", fr: "Opération purement axée sur la mission.", ja: "純粋なミッション駆動型運営。" } },
        { id: "transparency", title: { en: "Full Transparency", zh: "完全透明", fr: "Transparence Totale", ja: "完全な透明性" }, description: { en: "Open source code, governance processes, and algorithms.", zh: "开源代码、治理流程和算法。", fr: "Code open source, processus de gouvernance.", ja: "オープンソースコード、ガバナンスプロセス。" } },
      ],
    },
  ],
  metadata: { version: "1.0.0", lastUpdated: "2026-03-07", author: "OPC Global Alliance" },
};

// ============================================================
// All modules collection
// ============================================================
export const allModules: OPCModule[] = [universeModule, homModule, uniModule, daoModule];
