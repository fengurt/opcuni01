import mysql from 'mysql2/promise';

async function seedPartners() {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  
  // The 6 core partner organizations with complete multi-language profiles
  const partners = [
    {
      type: 'organization',
      nameEn: 'Nibiru (Ruiyue Technology)',
      nameZh: '睿悦科技（Nibiru）',
      nameFr: 'Nibiru (Ruiyue Technology)',
      nameJa: 'Nibiru（睿悦科技）',
      descriptionEn: 'Leading XR (Extended Reality) technology company specializing in VR/AR operating systems and development platforms. Provides OPC entrepreneurs with cutting-edge immersive technology solutions for creating next-generation digital experiences and virtual collaboration environments.',
      descriptionZh: '领先的XR（扩展现实）技术公司，专注于VR/AR操作系统和开发平台。为OPC创业者提供前沿的沉浸式技术解决方案，用于创建下一代数字体验和虚拟协作环境。',
      descriptionFr: 'Entreprise technologique XR (Réalité Étendue) de premier plan spécialisée dans les systèmes d\'exploitation et plateformes de développement VR/AR. Fournit aux entrepreneurs OPC des solutions technologiques immersives de pointe.',
      descriptionJa: 'VR/ARオペレーティングシステムと開発プラットフォームを専門とする先進的なXR（拡張現実）テクノロジー企業。OPC起業家に最先端の没入型テクノロジーソリューションを提供。',
      displayOrder: 1
    },
    {
      type: 'organization',
      nameEn: 'China Zhiyou Group',
      nameZh: '中智游集团',
      nameFr: 'China Zhiyou Group',
      nameJa: '中智游グループ',
      descriptionEn: 'Premier smart tourism and cultural technology enterprise integrating AI, big data, and IoT for tourism innovation. Empowers OPC entrepreneurs in the travel and hospitality sector with intelligent destination management and personalized tourism experience solutions.',
      descriptionZh: '领先的智慧旅游和文化科技企业，整合AI、大数据和物联网进行旅游创新。为旅游和酒店行业的OPC创业者提供智能目的地管理和个性化旅游体验解决方案。',
      descriptionFr: 'Entreprise de premier plan en tourisme intelligent et technologie culturelle intégrant l\'IA, le big data et l\'IoT pour l\'innovation touristique.',
      descriptionJa: 'AI、ビッグデータ、IoTを統合した観光イノベーションのための先進的なスマートツーリズム・文化テクノロジー企業。旅行・ホスピタリティ分野のOPC起業家を支援。',
      displayOrder: 2
    },
    {
      type: 'organization',
      nameEn: 'Boya Wenqu Academy',
      nameZh: '博雅问渠书院',
      nameFr: 'Académie Boya Wenqu',
      nameJa: '博雅問渠書院',
      descriptionEn: 'Distinguished academy dedicated to traditional Chinese wisdom and modern leadership development. Offers OPC entrepreneurs profound insights from classical philosophy, strategic thinking frameworks, and holistic personal development programs rooted in Eastern wisdom traditions.',
      descriptionZh: '致力于中国传统智慧与现代领导力发展的杰出书院。为OPC创业者提供来自经典哲学的深刻洞见、战略思维框架，以及根植于东方智慧传统的整体个人发展项目。',
      descriptionFr: 'Académie distinguée dédiée à la sagesse traditionnelle chinoise et au développement du leadership moderne. Offre aux entrepreneurs OPC des perspectives profondes de la philosophie classique.',
      descriptionJa: '中国の伝統的な知恵と現代のリーダーシップ開発に特化した著名なアカデミー。OPC起業家に古典哲学からの深い洞察、戦略的思考フレームワーク、東洋の知恵の伝統に根ざした全人的な個人開発プログラムを提供。',
      displayOrder: 3
    },
    {
      type: 'organization',
      nameEn: 'Asian Art Therapy Research Institute',
      nameZh: '亚洲艺术疗愈研究院',
      nameFr: 'Institut de Recherche en Art-Thérapie Asiatique',
      nameJa: 'アジア芸術療法研究所',
      descriptionEn: 'Leading research institution in art therapy and creative healing practices across Asia. Supports OPC entrepreneurs with evidence-based wellness solutions, creative expression methodologies, and mental health resources essential for sustainable solopreneurship.',
      descriptionZh: '亚洲领先的艺术疗愈和创意治疗实践研究机构。为OPC创业者提供循证健康解决方案、创意表达方法论，以及可持续个人创业所必需的心理健康资源。',
      descriptionFr: 'Institution de recherche de premier plan en art-thérapie et pratiques de guérison créative en Asie. Soutient les entrepreneurs OPC avec des solutions de bien-être basées sur des preuves.',
      descriptionJa: 'アジアにおけるアートセラピーと創造的ヒーリング実践の主要研究機関。OPC起業家にエビデンスに基づくウェルネスソリューション、創造的表現方法論、持続可能なソロプレナーシップに不可欠なメンタルヘルスリソースを提供。',
      displayOrder: 4
    },
    {
      type: 'organization',
      nameEn: 'SouSou Offer',
      nameZh: 'SouSou Offer',
      nameFr: 'SouSou Offer',
      nameJa: 'SouSou Offer',
      descriptionEn: 'Innovative career development and talent matching platform connecting professionals with global opportunities. Provides OPC entrepreneurs with talent acquisition tools, freelancer networks, and strategic hiring solutions for building virtual teams and scaling operations.',
      descriptionZh: '创新的职业发展和人才匹配平台，连接专业人士与全球机会。为OPC创业者提供人才获取工具、自由职业者网络，以及用于建立虚拟团队和扩展运营的战略招聘解决方案。',
      descriptionFr: 'Plateforme innovante de développement de carrière et de mise en relation de talents connectant les professionnels aux opportunités mondiales.',
      descriptionJa: 'プロフェッショナルをグローバルな機会につなぐ革新的なキャリア開発・人材マッチングプラットフォーム。OPC起業家に人材獲得ツール、フリーランサーネットワーク、バーチャルチーム構築と事業拡大のための戦略的採用ソリューションを提供。',
      displayOrder: 5
    },
    {
      type: 'organization',
      nameEn: 'Shendian Consulting',
      nameZh: '神店咨询',
      nameFr: 'Shendian Consulting',
      nameJa: '神店コンサルティング',
      descriptionEn: 'Boutique consulting firm specializing in retail innovation and e-commerce excellence. Equips OPC entrepreneurs with proven strategies for building successful online stores, optimizing customer experience, and leveraging digital commerce platforms for sustainable growth.',
      descriptionZh: '专注于零售创新和电商卓越的精品咨询公司。为OPC创业者提供经过验证的策略，用于建立成功的在线商店、优化客户体验，以及利用数字商务平台实现可持续增长。',
      descriptionFr: 'Cabinet de conseil boutique spécialisé dans l\'innovation retail et l\'excellence e-commerce. Équipe les entrepreneurs OPC de stratégies éprouvées pour créer des boutiques en ligne réussies.',
      descriptionJa: 'リテールイノベーションとEコマースエクセレンスを専門とするブティックコンサルティングファーム。OPC起業家に成功するオンラインストアの構築、カスタマーエクスペリエンスの最適化、持続可能な成長のためのデジタルコマースプラットフォームの活用に関する実証済みの戦略を提供。',
      displayOrder: 6
    }
  ];
  
  // Insert each partner
  for (const p of partners) {
    await conn.execute(
      `INSERT INTO partners (type, nameEn, nameZh, nameFr, nameJa, descriptionEn, descriptionZh, descriptionFr, descriptionJa, displayOrder, isVisible)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'visible')`,
      [p.type, p.nameEn, p.nameZh, p.nameFr, p.nameJa, p.descriptionEn, p.descriptionZh, p.descriptionFr, p.descriptionJa, p.displayOrder]
    );
    console.log(`Inserted partner: ${p.nameZh} (${p.nameEn})`);
  }
  
  console.log('\nAll 6 partner organizations inserted successfully!');
  await conn.end();
}

seedPartners().catch(console.error);
