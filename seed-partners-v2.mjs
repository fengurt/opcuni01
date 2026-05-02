import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const partners = [
  {
    type: 'organization',
    nameEn: 'World Canal Cities Canal Walk Action',
    nameZh: '世界运河城市Canal Walk行动',
    nameFr: 'Action Canal Walk des Villes Mondiales du Canal',
    nameJa: '世界運河都市Canal Walkアクション',
    descriptionEn: 'An international cultural exchange initiative launched by the World Canal Cities Canal Walk Action Committee (est. September 2024), chaired by Cheng Hao. Using canal culture as a bond, it advocates the "Canal Walk" lifestyle and promotes interconnection among global canal cities. An overseas center has been established in Belgium, and a Suzhou Center has been set up in China.',
    descriptionZh: '由「世界运河城市Canal Walk行动组委会」（成立于2024年9月）发起的一项国际文化交流倡议，主席为程颢。该行动以运河文化为纽带，倡导「运河漫步」的生活方式，推动全球运河城市间的互联互通。目前已在比利时设立海外中心，并在苏州成立了行动苏州中心。',
    descriptionFr: 'Une initiative d\'echange culturel international lancee par le Comite d\'action Canal Walk des villes mondiales du canal, presidee par Cheng Hao.',
    descriptionJa: '程颢を主席とする世界運河都市Canal Walk行動委員会が発足した国際文化交流イニシアチブ。運河文化を絆に「運河散歩」のライフスタイルを提唱。',
    displayOrder: 0
  },
  {
    type: 'organization',
    nameEn: 'Boyu Education',
    nameZh: '伯禹教育',
    nameFr: 'Boyu Education',
    nameJa: '伯禹教育',
    descriptionEn: 'An institution focused on AI education, dedicated to cultivating outstanding AI algorithm engineers and researchers. Its curriculum is innovated based on Shanghai Jiao Tong University ACM Class AI courses, covering math foundations, programming, ML, DL and applications. Founder Prof. Yu Yong is a National Teaching Master who led students to 3 ACM-ICPC World Championships, known as the "Golden Coach".',
    descriptionZh: '伯禹教育是一家专注于人工智能（AI）教育的机构，致力于培养卓越的人工智能算法工程师和研究员。其课程体系基于上海交通大学ACM班的人工智能专业课程进行创新，涵盖数学基础、编程能力、机器学习、深度学习及应用实践。创始人俞勇教授是国家级教学名师，曾带领学生在ACM国际大学生程序设计竞赛中3次获得世界冠军，被誉为「金牌教头」。',
    descriptionFr: 'Institution specialisee dans l\'education IA, fondee par le Prof. Yu Yong, triple champion du monde ACM.',
    descriptionJa: 'AI教育に特化した機関。創設者の俞勇教授はACM世界大会で3度の優勝を導いた「金メダルコーチ」。',
    displayOrder: 1
  },
  {
    type: 'organization',
    nameEn: 'LanMa Tech',
    nameZh: '澜码科技',
    nameFr: 'LanMa Tech',
    nameJa: '澜码科技',
    descriptionEn: 'An enterprise-level AI Agent platform company based on Large Language Models (LLM). Its core philosophy is "Expert Knowledge Empowering Grassroots Business Units". The core product AskXBOT platform abstracts LLM capabilities into document retrieval, AI invocation, and data querying, helping enterprises rapidly build automated, intelligent workflows for human-machine collaboration.',
    descriptionZh: '澜码科技是一家基于大语言模型（LLM）的企业级AI Agent（智能体）平台公司。其核心理念是「专家知识赋能基层业务单元」。核心产品AskXBOT平台能够将大语言模型的能力抽象为文档检索、AI调用、数据查询等功能，帮助企业快速构建自动化、智能化的工作流，实现人机协同与业务重塑。',
    descriptionFr: 'Plateforme d\'agents IA d\'entreprise basee sur les LLM. Produit principal: AskXBOT.',
    descriptionJa: 'LLMベースの企業向けAIエージェントプラットフォーム企業。コア製品AskXBOTで業務自動化を実現。',
    displayOrder: 2
  },
  {
    type: 'organization',
    nameEn: 'Beijing Chaoyang Hospital, Capital Medical University',
    nameZh: '首都医科大学附属北京朝阳医院',
    nameFr: 'Hopital Chaoyang de Pekin, Universite Medicale Capitale',
    nameJa: '首都医科大学附属北京朝陽病院',
    descriptionEn: 'A large comprehensive Grade-A tertiary hospital and one of Beijing\'s key medical institutions. Its Reproductive Medicine Center, led by Prof. Lu Qun, is a leader in assisted reproductive technology, providing professional medical support for the OPC ecosystem\'s life health dimension.',
    descriptionZh: '首都医科大学附属北京朝阳医院是一所大型综合性三甲医院，也是北京市重点医疗机构之一。其生殖医学中心由鹿群教授领衔，是国内辅助生殖技术领域的领先力量，为OPC生态的生命健康维度提供专业医学支持。',
    descriptionFr: 'Grand hopital general de grade A a Pekin, leader en technologie de reproduction assistee.',
    descriptionJa: '北京の大型総合三甲病院。生殖医学センターは鹿群教授が率い、OPCエコシステムの健康面を支援。',
    displayOrder: 3
  },
  {
    type: 'organization',
    nameEn: 'SouSou Offer',
    nameZh: 'SouSou Offer',
    nameFr: 'SouSou Offer',
    nameJa: 'SouSou Offer',
    descriptionEn: 'An AI career development and person-job matching platform based on tens of millions of data points. Provides precise career positioning and transition advice for talents in the ecosystem, and builds a safe, trustworthy matching platform for OPC coaches and job seekers through enterprise verification systems.',
    descriptionZh: '基于千万级数据的AI职业发展与人岗匹配平台。利用千万级就业数据，为生态内的人才提供精准的职业定位与转型建议；联动企业真实性核验系统，为OPC教练与求职者构建安全、可信的对接平台，解决信息不对称问题。',
    descriptionFr: 'Plateforme IA de developpement de carriere basee sur des millions de donnees.',
    descriptionJa: '数千万件のデータに基づくAIキャリア開発・人材マッチングプラットフォーム。',
    displayOrder: 4
  },
  {
    type: 'organization',
    nameEn: 'Shendian Consulting',
    nameZh: '神店咨询',
    nameFr: 'Shendian Consulting',
    nameJa: '神店コンサルティング',
    descriptionEn: 'A practical consulting firm deeply rooted in the food & beverage and physical retail sectors. Outputs verified physical store management methodologies to empower physical entrepreneurs in the ecosystem, improving survival rates through shared case studies and innovative offline business models.',
    descriptionZh: '深耕餐饮与实体商业领域的实战咨询机构。输出经过验证的实体店经营方法论，赋能生态内的实体创业者提升生存率；通过实战案例库的分享，联动生态伙伴共同探索线下商业的创新模式。',
    descriptionFr: 'Cabinet de conseil pratique specialise dans la restauration et le commerce physique.',
    descriptionJa: '飲食業・実店舗ビジネスに特化した実践コンサルティング機関。',
    displayOrder: 5
  },
  {
    type: 'organization',
    nameEn: 'OPC Global',
    nameZh: 'OPC Global (OPC之家)',
    nameFr: 'OPC Global',
    nameJa: 'OPC Global',
    descriptionEn: 'OPC Global (One Person Company Global Alliance) is a global co-creation organization exploring new production relations in the AI era. It advocates "Master AI, Achieve Freedom" and is committed to building the most vibrant zero-trust, cross-cultural global OPC collaboration network. The platform provides L1-L3 certification system and expert team support, aiming to create a "Digital Noah\'s Ark" for the AI era.',
    descriptionZh: 'OPC Global（一人公司全球联盟）是一个探索AI时代新型生产关系的全球性共创组织。倡导"善用AI，终获自由"，致力于构建最具生命力的零信任、跨文化全球OPC协作网络。平台提供从L1到L3的认证体系，以及专家团支持，旨在打造AI时代的「数字诺亚方舟」，让个体也能建立世界级的企业。',
    descriptionFr: 'OPC Global est une organisation mondiale de co-creation explorant les nouvelles relations de production a l\'ere de l\'IA.',
    descriptionJa: 'OPC Global（一人会社グローバルアライアンス）はAI時代の新しい生産関係を探求するグローバル共創組織。',
    displayOrder: 6
  },
  {
    type: 'organization',
    nameEn: 'Nibiru (Ruiyue Information)',
    nameZh: '睿悦信息（Nibiru）',
    nameFr: 'Nibiru (Ruiyue Information)',
    nameJa: 'Nibiru（睿悦信息）',
    descriptionEn: 'A globally leading AR/VR system, 3D digital engine and interactive content tool provider. Main products include Nibiru OS for global XR device manufacturers, Nibiru Studio (3D interaction engine), and Nibiru Creator (no-code creation tool). Technology widely applied in education, healthcare, industry, and retail.',
    descriptionZh: '睿悦信息（Nibiru）是全球领先的AR/VR系统、三维数字引擎及互动式内容工具供应商。公司主营业务包括为全球XR设备制造商提供Nibiru OS操作系统，以及Nibiru Studio（三维交互引擎）、Nibiru Creator（无代码创作工具）等。其技术广泛应用于教育、医疗、工业、零售等领域。',
    descriptionFr: 'Fournisseur mondial de systemes AR/VR, moteurs 3D et outils de creation de contenu interactif.',
    descriptionJa: 'グローバルリーディングAR/VRシステム、3Dデジタルエンジン、インタラクティブコンテンツツールプロバイダー。',
    displayOrder: 7
  },
  {
    type: 'organization',
    nameEn: 'China Zhiyou Group',
    nameZh: '中智游集团',
    nameFr: 'Groupe China Zhiyou',
    nameJa: '中智游集団',
    descriptionEn: 'A smart tourism information technology service provider. Main business covers smart marketing, planning consulting, software development (ticketing systems, big data centers), and tourism project investment & operations for tourism destinations. Committed to using big data and "Internet+" technology to improve management and service levels in the cultural tourism industry.',
    descriptionZh: '中智游集团是一家专注于智慧旅游的信息化技术服务商。主要业务涵盖旅游目的地的智慧营销、规划顾问、软件研发与建设（如票务系统、大数据中心）、以及旅游项目的投资与运营。致力于利用大数据和「互联网+」技术提升文旅行业的管理与服务水平。',
    descriptionFr: 'Fournisseur de services technologiques pour le tourisme intelligent.',
    descriptionJa: 'スマート観光情報技術サービスプロバイダー。ビッグデータとインターネット+技術で文化観光業界を向上。',
    displayOrder: 8
  },
  {
    type: 'organization',
    nameEn: 'Asian Art Therapy Research Institute',
    nameZh: '亚洲艺术疗愈研究院',
    nameFr: 'Institut Asiatique de Recherche en Art-Therapie',
    nameJa: 'アジア芸術療癒研究院',
    descriptionEn: 'Officially established at Krirk University, Thailand in late 2024. The institute aims to deepen cooperation among Asian countries in mental health and art therapy, exploring a unique "Eastern Healing Paradigm". Through interdisciplinary research and practice, it uses art as a universal human language to promote mental health services.',
    descriptionZh: '亚洲艺术疗愈研究院于2024年底在泰国格乐大学（Krirk University）正式成立。该研究院旨在深化亚洲国家在精神健康与艺术疗愈领域的合作，探索独特的「东方疗愈范式」。通过跨学科的研究与实践，将艺术作为人类共通的语言，推动心理健康服务的发展。',
    descriptionFr: 'Institut fonde a l\'Universite Krirk en Thailande, explorant le paradigme de guerison orientale.',
    descriptionJa: '2024年末にタイのクリルク大学に正式設立。「東洋のヒーリングパラダイム」を探求する研究機関。',
    displayOrder: 9
  },
  {
    type: 'organization',
    nameEn: 'Boya Wenqu Academy',
    nameZh: '博雅问渠书院',
    nameFr: 'Academie Boya Wenqu',
    nameJa: '博雅問渠書院',
    descriptionEn: 'An education and cultural exchange platform created by Tsinghua and Peking University alumni teams. Serves as the ecosystem\'s "spiritual charging station", providing general education and global competency cultivation for OPC members. Through high-quality cultural exchange activities, it connects thought leaders across different fields.',
    descriptionZh: '由清北校友团队打造的教育与文化交流平台。作为生态的"精神充电站"，为OPC成员提供通识教育与全球胜任力培养；通过高品质的文化交流活动，联动不同领域的思想领袖，提升生态整体的认知维度与文化底蕴。',
    descriptionFr: 'Plateforme d\'education et d\'echange culturel creee par des anciens de Tsinghua et Pekin.',
    descriptionJa: '清華大学・北京大学の卒業生チームが創設した教育・文化交流プラットフォーム。',
    displayOrder: 10
  }
];

for (let i = 0; i < partners.length; i++) {
  const p = partners[i];
  await conn.execute(
    `INSERT INTO partners (type, nameEn, nameZh, nameFr, nameJa, descriptionEn, descriptionZh, descriptionFr, descriptionJa, isVisible, displayOrder) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'visible', ?)`,
    [p.type, p.nameEn, p.nameZh, p.nameFr, p.nameJa, p.descriptionEn, p.descriptionZh, p.descriptionFr, p.descriptionJa, p.displayOrder]
  );
  console.log(`Inserted: ${p.nameZh} (${p.nameEn})`);
}

console.log(`Done! Inserted ${partners.length} partner organizations.`);
await conn.end();
