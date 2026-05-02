// Seed script for OPC Facilitators and Partner Organizations
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const facilitators = [
  {
    nameEn: 'Yu Nan',
    nameZh: '俞楠',
    nameFr: 'Yu Nan',
    nameJa: '俞楠',
    titleEn: 'Researcher, Fudan University School of Intelligent Medicine',
    titleZh: '复旦大学智能医学院研究员',
    titleFr: 'Chercheur, École de Médecine Intelligente de l\'Université Fudan',
    titleJa: '復旦大学スマート医学院研究員',
    bioEn: 'Expert in AI emotional computing, dedicated to researching the quantification and application of emotional data. Specializes in emotional computing and organizational behavior. Through scientific data analysis methods, helps managers quantify team emotional states, optimize decision-making environments, and improve organizational emotional efficiency.',
    bioZh: '人工智能情感计算领域的专家，致力于研究情绪数据的量化与应用。专注于情感计算与组织行为学。通过科学的数据分析方法，帮助管理者量化团队情绪状态，优化决策环境，提升组织的情绪效能。',
    bioFr: 'Expert en informatique émotionnelle IA, dédié à la recherche sur la quantification et l\'application des données émotionnelles. Spécialisé dans l\'informatique émotionnelle et le comportement organisationnel.',
    bioJa: 'AI感情コンピューティングの専門家。感情データの定量化と応用の研究に専念。感情コンピューティングと組織行動学に特化。',
    avatarUrl: '/images/expert-avatar-placeholder.jpg',
    sortOrder: 1,
    isVisible: true
  },
  {
    nameEn: 'Zhang Qingzhi',
    nameZh: '张青之',
    nameFr: 'Zhang Qingzhi',
    nameJa: '張青之',
    titleEn: 'Senior Psychology Expert / Former Leader of Wenchuan Earthquake Psychological Relief Expert Group',
    titleZh: '资深心理专家 / 原汶川抗震救灾心理专家组组长',
    titleFr: 'Expert Senior en Psychologie / Ancien Chef du Groupe d\'Experts Psychologiques du Tremblement de Terre de Wenchuan',
    titleJa: '上級心理専門家 / 元汶川地震心理救援専門家グループリーダー',
    bioEn: 'Senior Colonel rank, with rich experience in psychological intervention in extreme environments. Focuses on psychological construction and stress management in high-pressure environments. Through systematic psychological training methods, helps entrepreneurs maintain calm and objective mental states when facing market uncertainty and business risks, building strong psychological defenses.',
    bioZh: '大校军衔，拥有丰富的极端环境下心理干预经验。专注于高压环境下的心理建设与压力管理。通过系统的心理训练方法，帮助创业者在面对市场不确定性和经营风险时，保持冷静客观的心理状态，构建强大的心理防线。',
    bioFr: 'Grade de colonel senior, avec une riche expérience en intervention psychologique dans des environnements extrêmes. Se concentre sur la construction psychologique et la gestion du stress dans des environnements à haute pression.',
    bioJa: '大佐階級、極限環境での心理介入の豊富な経験を持つ。高圧環境での心理構築とストレス管理に特化。',
    avatarUrl: '/images/expert-avatar-placeholder.jpg',
    sortOrder: 2,
    isVisible: true
  },
  {
    nameEn: 'Li Xin',
    nameZh: '李新',
    nameFr: 'Li Xin',
    nameJa: '李新',
    titleEn: 'Founder of "Fresh Squeeze Comedy"',
    titleZh: '"鲜榨喜剧"创始人',
    titleFr: 'Fondateur de "Fresh Squeeze Comedy"',
    titleJa: '「フレッシュスクイーズコメディ」創設者',
    bioEn: 'Pioneer in the domestic improv theater field with rich experience in improv performance and training. Focuses on agile thinking and communication skills. Through improv theater methodology, trains individuals in rapid response capabilities and high EQ communication skills in unscripted, unexpected situations.',
    bioZh: '国内即兴戏剧领域的先行者，拥有丰富的即兴表演与培训经验。专注于敏捷思维与沟通技巧。通过即兴戏剧（Improv）的方法论，训练个体在无剧本、突发情况下的快速反应能力与高情商沟通技巧。',
    bioFr: 'Pionnier dans le domaine du théâtre d\'improvisation domestique avec une riche expérience en performance et formation d\'improvisation. Se concentre sur la pensée agile et les compétences en communication.',
    bioJa: '国内即興演劇分野のパイオニア。即興パフォーマンスとトレーニングの豊富な経験を持つ。アジャイル思考とコミュニケーションスキルに特化。',
    avatarUrl: '/images/expert-avatar-placeholder.jpg',
    sortOrder: 3,
    isVisible: true
  },
  {
    nameEn: 'Zhou Huilin',
    nameZh: '周惠林',
    nameFr: 'Zhou Huilin',
    nameJa: '周恵林',
    titleEn: 'National First-Class Actor',
    titleZh: '国家一级演员',
    titleFr: 'Acteur National de Première Classe',
    titleJa: '国家一級俳優',
    bioEn: 'Famous film and television actor who has portrayed many classic tough guy images on screen. Focuses on personal image building and presence training. Teaches how to enhance personal charisma and leadership in public settings through body language and voice control, creating a trustworthy professional image.',
    bioZh: '知名影视演员，塑造了众多经典的荧幕硬汉形象。专注于个人形象塑造与气场训练。教授如何通过肢体语言、声音控制来提升个人在公开场合的感染力与领导力，打造可信赖的职业形象。',
    bioFr: 'Acteur célèbre de cinéma et de télévision qui a incarné de nombreuses images classiques de dur à cuire à l\'écran. Se concentre sur la construction de l\'image personnelle et la formation à la présence.',
    bioJa: '有名な映画・テレビ俳優。スクリーン上で多くのクラシックなタフガイイメージを演じてきた。個人イメージ構築とプレゼンストレーニングに特化。',
    avatarUrl: '/images/expert-avatar-placeholder.jpg',
    sortOrder: 4,
    isVisible: true
  },
  {
    nameEn: 'Wang Yayun',
    nameZh: '王雅赟',
    nameFr: 'Wang Yayun',
    nameJa: '王雅赟',
    titleEn: 'Senior Academic Planning Expert',
    titleZh: '资深学业规划专家',
    titleFr: 'Expert Senior en Planification Académique',
    titleJa: '上級学業計画専門家',
    bioEn: 'Relying on Tsinghua and Peking University alumni think tank resources, has been engaged in academic path planning for a long time. Focuses on educational resource matching and academic planning. Provides objective and scientific educational path design and consulting services for families with children\'s education needs.',
    bioZh: '依托清华北大校友智库资源，长期从事升学路径规划工作。专注于教育资源匹配与升学规划。为有子女教育需求的家庭提供客观、科学的教育路径设计与咨询服务。',
    bioFr: 'S\'appuyant sur les ressources du think tank des anciens élèves de Tsinghua et Peking University, engagé depuis longtemps dans la planification des parcours académiques. Se concentre sur l\'adéquation des ressources éducatives et la planification académique.',
    bioJa: '清華大学・北京大学同窓会シンクタンクリソースに基づき、長期にわたり進学経路計画に従事。教育リソースマッチングと進学計画に特化。',
    avatarUrl: '/images/expert-avatar-placeholder.jpg',
    sortOrder: 5,
    isVisible: true
  }
];

const partnerOrganizations = [
  {
    nameEn: 'Nibiru (Ruiyue Technology)',
    nameZh: '睿悦科技 (Nibiru)',
    nameFr: 'Nibiru (Ruiyue Technology)',
    nameJa: 'Nibiru（睿悦科技）',
    descriptionEn: 'Microsoft overseas strategic partner, focusing on no-code 3D engine technology. As the technical foundation of the ecosystem, its no-code engine empowers non-technical OPC members to independently create 3D interactive content; while connecting its global channel network to bring overseas business orders to ecosystem partners, achieving dual empowerment of "technology + market".',
    descriptionZh: '微软出海战略合作伙伴，专注于无代码 3D 引擎技术。作为生态的技术底座，其无代码引擎赋能非技术背景的 OPC 成员独立制作 3D 互动内容；同时联动其全球渠道网络，为生态伙伴导入海外商业订单，实现"技术+市场"的双重赋能。',
    descriptionFr: 'Partenaire stratégique Microsoft à l\'étranger, spécialisé dans la technologie de moteur 3D sans code. En tant que fondation technique de l\'écosystème, son moteur sans code permet aux membres OPC non techniques de créer indépendamment du contenu interactif 3D.',
    descriptionJa: 'マイクロソフト海外戦略パートナー、ノーコード3Dエンジン技術に特化。エコシステムの技術基盤として、ノーコードエンジンが非技術系OPCメンバーに3Dインタラクティブコンテンツの独立制作を可能にする。',
    type: 'organization',
    website: '',
    logoUrl: '/images/expert-avatar-placeholder.jpg',
    sortOrder: 1,
    isVisible: true
  },
  {
    nameEn: 'Zhongzhiyou Group',
    nameZh: '中智游集团',
    nameFr: 'Groupe Zhongzhiyou',
    nameJa: '中智游グループ',
    descriptionEn: 'Cultural tourism industry investor and operator, with 12PB of industry data and experience in building national smart tourism platforms. Through 12PB of industry data, provides precise decision-making basis for cultural tourism planners in the ecosystem; opens its large B-end/G-end project resources to provide high-credit delivery channels and landing scenarios for OPC members.',
    descriptionZh: '文旅产业投资与运营商，拥有 12PB 行业数据及国家智慧旅游平台建设经验。通过 12PB 行业数据为生态内的文旅策划师提供精准决策依据；开放其大型 B 端/G 端项目资源，为 OPC 成员提供高信用的交付通道与落地场景，解决个体难以承接大项目的痛点。',
    descriptionFr: 'Investisseur et opérateur de l\'industrie du tourisme culturel, avec 12PB de données industrielles et une expérience dans la construction de plateformes nationales de tourisme intelligent.',
    descriptionJa: '文化観光産業投資・運営会社。12PBの業界データと国家スマート観光プラットフォーム構築経験を持つ。',
    type: 'organization',
    website: '',
    logoUrl: '/images/expert-avatar-placeholder.jpg',
    sortOrder: 2,
    isVisible: true
  },
  {
    nameEn: 'Boya Wenqu Academy',
    nameZh: '博雅问渠书院',
    nameFr: 'Académie Boya Wenqu',
    nameJa: '博雅問渠書院',
    descriptionEn: 'Education and cultural exchange platform built by Tsinghua and Peking University alumni team. As the "spiritual charging station" of the ecosystem, provides general education and global competency training for OPC members; through high-quality cultural exchange activities, connects thought leaders from different fields to enhance the overall cognitive dimension and cultural heritage of the ecosystem.',
    descriptionZh: '由清北校友团队打造的教育与文化交流平台。作为生态的"精神充电站"，为 OPC 成员提供通识教育与全球胜任力培养；通过高品质的文化交流活动，联动不同领域的思想领袖，提升生态整体的认知维度与文化底蕴。',
    descriptionFr: 'Plateforme d\'éducation et d\'échange culturel construite par l\'équipe des anciens élèves de Tsinghua et Peking University. En tant que "station de recharge spirituelle" de l\'écosystème.',
    descriptionJa: '清華・北京大学同窓会チームが構築した教育・文化交流プラットフォーム。エコシステムの「精神充電ステーション」として機能。',
    type: 'organization',
    website: '',
    logoUrl: '/images/expert-avatar-placeholder.jpg',
    sortOrder: 3,
    isVisible: true
  },
  {
    nameEn: 'Asian Art Therapy Research Institute',
    nameZh: '亚洲艺术疗愈研究院',
    nameFr: 'Institut de Recherche en Art-Thérapie Asiatique',
    nameJa: 'アジア芸術療法研究所',
    descriptionEn: 'Art therapy research institution combining Eastern wisdom with modern psychology. Provides scientific psychological healing solutions for OPC members under high pressure, building a "psychological defense line" against professional burnout; connects offline space resources to create a "third space" with both social and healing functions.',
    descriptionZh: '结合东方智慧与现代心理学的艺术疗愈研究机构。为高压下的 OPC 成员提供科学的心理疗愈方案，构建对抗职业倦怠的"心理防线"；联动线下空间资源，打造兼具社交与疗愈功能的"第三空间"，增强生态成员的粘性与归属感。',
    descriptionFr: 'Institution de recherche en art-thérapie combinant la sagesse orientale et la psychologie moderne. Fournit des solutions de guérison psychologique scientifiques pour les membres OPC sous haute pression.',
    descriptionJa: '東洋の知恵と現代心理学を組み合わせた芸術療法研究機関。高圧下のOPCメンバーに科学的な心理療法ソリューションを提供。',
    type: 'organization',
    website: '',
    logoUrl: '/images/expert-avatar-placeholder.jpg',
    sortOrder: 4,
    isVisible: true
  },
  {
    nameEn: 'SouSou Offer',
    nameZh: 'SouSou Offer',
    nameFr: 'SouSou Offer',
    nameJa: 'SouSou Offer',
    descriptionEn: 'AI career development and person-job matching platform based on tens of millions of data points. Uses tens of millions of employment data to provide precise career positioning and transition advice for talents in the ecosystem; connects enterprise authenticity verification system to build a safe and trustworthy docking platform for OPC coaches and job seekers.',
    descriptionZh: '基于千万级数据的 AI 职业发展与人岗匹配平台。利用千万级就业数据，为生态内的人才提供精准的职业定位与转型建议；联动企业真实性核验系统，为 OPC 教练与求职者构建安全、可信的对接平台，解决信息不对称问题。',
    descriptionFr: 'Plateforme de développement de carrière IA et d\'adéquation personne-emploi basée sur des dizaines de millions de points de données.',
    descriptionJa: '数千万のデータに基づくAIキャリア開発・人材マッチングプラットフォーム。',
    type: 'brand',
    website: '',
    logoUrl: '/images/expert-avatar-placeholder.jpg',
    sortOrder: 5,
    isVisible: true
  },
  {
    nameEn: 'Shendian Consulting',
    nameZh: '神店咨询',
    nameFr: 'Shendian Consulting',
    nameJa: '神店コンサルティング',
    descriptionEn: 'Practical consulting agency deeply rooted in catering and physical retail business. Outputs verified physical store operation methodology to empower physical entrepreneurs in the ecosystem to improve survival rates; through sharing of practical case libraries, connects ecosystem partners to jointly explore innovative models of offline business.',
    descriptionZh: '深耕餐饮与实体商业领域的实战咨询机构。输出经过验证的实体店经营方法论，赋能生态内的实体创业者提升生存率；通过实战案例库的分享，联动生态伙伴共同探索线下商业的创新模式。',
    descriptionFr: 'Agence de conseil pratique profondément enracinée dans la restauration et le commerce de détail physique.',
    descriptionJa: '飲食・実店舗ビジネス分野に深く根ざした実践コンサルティング機関。',
    type: 'brand',
    website: '',
    logoUrl: '/images/expert-avatar-placeholder.jpg',
    sortOrder: 6,
    isVisible: true
  }
];

async function seedData() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    console.log('Seeding facilitators...');
    
    // Insert facilitators into experts table
    for (const facilitator of facilitators) {
      await connection.execute(
        `INSERT INTO experts (nameEn, nameZh, nameFr, nameJa, titleEn, titleZh, titleFr, titleJa, bioEn, bioZh, bioFr, bioJa, avatarUrl, sortOrder, isVisible)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'visible')
         ON DUPLICATE KEY UPDATE
         nameEn = VALUES(nameEn), nameZh = VALUES(nameZh), nameFr = VALUES(nameFr), nameJa = VALUES(nameJa),
         titleEn = VALUES(titleEn), titleZh = VALUES(titleZh), titleFr = VALUES(titleFr), titleJa = VALUES(titleJa),
         bioEn = VALUES(bioEn), bioZh = VALUES(bioZh), bioFr = VALUES(bioFr), bioJa = VALUES(bioJa),
         avatarUrl = VALUES(avatarUrl), sortOrder = VALUES(sortOrder), isVisible = VALUES(isVisible)`,
        [
          facilitator.nameEn, facilitator.nameZh, facilitator.nameFr, facilitator.nameJa,
          facilitator.titleEn, facilitator.titleZh, facilitator.titleFr, facilitator.titleJa,
          facilitator.bioEn, facilitator.bioZh, facilitator.bioFr, facilitator.bioJa,
          facilitator.avatarUrl, facilitator.sortOrder
        ]
      );
      console.log(`  Added facilitator: ${facilitator.nameZh}`);
    }
    
    console.log('\nSeeding partner organizations...');
    
    // Insert partner organizations into partners table
    for (const partner of partnerOrganizations) {
      await connection.execute(
        `INSERT INTO partners (nameEn, nameZh, nameFr, nameJa, descriptionEn, descriptionZh, descriptionFr, descriptionJa, type, websiteUrl, logoUrl, displayOrder, isVisible)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'visible')
         ON DUPLICATE KEY UPDATE
         nameEn = VALUES(nameEn), nameZh = VALUES(nameZh), nameFr = VALUES(nameFr), nameJa = VALUES(nameJa),
         descriptionEn = VALUES(descriptionEn), descriptionZh = VALUES(descriptionZh), descriptionFr = VALUES(descriptionFr), descriptionJa = VALUES(descriptionJa),
         type = VALUES(type), websiteUrl = VALUES(websiteUrl), logoUrl = VALUES(logoUrl), displayOrder = VALUES(displayOrder), isVisible = VALUES(isVisible)`,
        [
          partner.nameEn, partner.nameZh, partner.nameFr, partner.nameJa,
          partner.descriptionEn, partner.descriptionZh, partner.descriptionFr, partner.descriptionJa,
          partner.type, partner.website, partner.logoUrl, partner.sortOrder
        ]
      );
      console.log(`  Added partner: ${partner.nameZh}`);
    }
    
    console.log('\n✅ Seeding completed successfully!');
    console.log(`   - ${facilitators.length} facilitators added`);
    console.log(`   - ${partnerOrganizations.length} partner organizations added`);
    
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

seedData().catch(console.error);
