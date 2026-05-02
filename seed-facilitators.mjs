import mysql from 'mysql2/promise';

async function seedFacilitators() {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  
  // The 5 new facilitators with complete multi-language profiles
  const facilitators = [
    {
      nameEn: 'Yu Nan',
      nameZh: '俞楠',
      nameFr: 'Yu Nan',
      nameJa: '俞楠（ユ・ナン）',
      roleEn: 'AI Business Strategist',
      roleZh: 'AI商业战略师',
      roleFr: 'Stratège Commercial IA',
      roleJa: 'AIビジネス戦略家',
      titleEn: 'Founder of OPC Global',
      titleZh: 'OPC之家创始人',
      titleFr: 'Fondateur d\'OPC Global',
      titleJa: 'OPCグローバル創設者',
      bioEn: 'Pioneer in AI-driven business transformation with over 15 years of experience in organizational consulting. Expert in helping solopreneurs leverage AI tools to build scalable one-person companies. Former senior consultant at McKinsey & Company.',
      bioZh: '拥有超过15年组织咨询经验的AI驱动商业转型先驱。专注于帮助个人创业者利用AI工具构建可扩展的一人公司。曾任麦肯锡公司高级顾问。',
      bioFr: 'Pionnier de la transformation commerciale par l\'IA avec plus de 15 ans d\'expérience en conseil organisationnel. Expert pour aider les solopreneurs à utiliser les outils IA pour créer des entreprises individuelles évolutives.',
      bioJa: 'AI駆動のビジネス変革のパイオニア。15年以上の組織コンサルティング経験を持つ。ソロプレナーがAIツールを活用してスケーラブルな一人会社を構築する支援の専門家。',
      sortOrder: 1,
      displayOrder: 1
    },
    {
      nameEn: 'Zhang Qingzhi',
      nameZh: '张青之',
      nameFr: 'Zhang Qingzhi',
      nameJa: '張青之（チョウ・セイシ）',
      roleEn: 'Executive Coach',
      roleZh: '高管教练',
      roleFr: 'Coach Exécutif',
      roleJa: 'エグゼクティブコーチ',
      titleEn: 'ICF Master Certified Coach',
      titleZh: 'ICF大师级认证教练',
      titleFr: 'Coach Certifié Maître ICF',
      titleJa: 'ICFマスター認定コーチ',
      bioEn: 'ICF Master Certified Coach (MCC) with extensive experience coaching C-suite executives and entrepreneurs. Specializes in leadership development, emotional intelligence, and building high-performance mindsets for solopreneurs.',
      bioZh: 'ICF大师级认证教练（MCC），拥有丰富的高管和企业家教练经验。专注于领导力发展、情商培养，以及为个人创业者建立高绩效心态。',
      bioFr: 'Coach certifié maître ICF (MCC) avec une vaste expérience dans le coaching de dirigeants et d\'entrepreneurs. Spécialisé dans le développement du leadership et l\'intelligence émotionnelle.',
      bioJa: 'ICFマスター認定コーチ（MCC）。経営幹部や起業家のコーチングに豊富な経験を持つ。リーダーシップ開発、感情知性、ソロプレナー向けの高パフォーマンスマインドセット構築を専門とする。',
      sortOrder: 2,
      displayOrder: 2
    },
    {
      nameEn: 'Li Xin',
      nameZh: '李新',
      nameFr: 'Li Xin',
      nameJa: '李新（リ・シン）',
      roleEn: 'Digital Transformation Expert',
      roleZh: '数字化转型专家',
      roleFr: 'Expert en Transformation Numérique',
      roleJa: 'デジタル変革エキスパート',
      titleEn: 'Former CTO, Fortune 500',
      titleZh: '前世界500强企业CTO',
      titleFr: 'Ancien CTO, Fortune 500',
      titleJa: '元フォーチュン500 CTO',
      bioEn: 'Former CTO of a Fortune 500 technology company with deep expertise in digital transformation and AI implementation. Helps OPC entrepreneurs build robust technology stacks and automate their business operations.',
      bioZh: '前世界500强科技公司CTO，在数字化转型和AI实施方面拥有深厚专业知识。帮助OPC创业者构建稳健的技术栈并实现业务运营自动化。',
      bioFr: 'Ancien CTO d\'une entreprise technologique Fortune 500 avec une expertise approfondie en transformation numérique et implémentation de l\'IA.',
      bioJa: 'フォーチュン500テクノロジー企業の元CTO。デジタル変革とAI実装に深い専門知識を持つ。OPC起業家が堅牢な技術スタックを構築し、ビジネス運営を自動化する支援を行う。',
      sortOrder: 3,
      displayOrder: 3
    },
    {
      nameEn: 'Zhou Huilin',
      nameZh: '周惠林',
      nameFr: 'Zhou Huilin',
      nameJa: '周惠林（シュウ・ケイリン）',
      roleEn: 'Brand Strategy Consultant',
      roleZh: '品牌战略顾问',
      roleFr: 'Consultant en Stratégie de Marque',
      roleJa: 'ブランド戦略コンサルタント',
      titleEn: 'Founder, Creative Ventures',
      titleZh: '创意风投创始人',
      titleFr: 'Fondateur, Creative Ventures',
      titleJa: 'クリエイティブベンチャーズ創設者',
      bioEn: 'Award-winning brand strategist who has helped over 200 startups and solopreneurs build distinctive personal brands. Expert in content marketing, social media strategy, and building authentic brand narratives.',
      bioZh: '屡获殊荣的品牌战略师，已帮助超过200家初创企业和个人创业者建立独特的个人品牌。专注于内容营销、社交媒体策略和构建真实的品牌叙事。',
      bioFr: 'Stratège de marque primé ayant aidé plus de 200 startups et solopreneurs à construire des marques personnelles distinctives.',
      bioJa: '200以上のスタートアップとソロプレナーが独自のパーソナルブランドを構築する支援をしてきた受賞歴のあるブランド戦略家。コンテンツマーケティング、ソーシャルメディア戦略、本物のブランドナラティブ構築の専門家。',
      sortOrder: 4,
      displayOrder: 4
    },
    {
      nameEn: 'Wang Yayun',
      nameZh: '王雅赟',
      nameFr: 'Wang Yayun',
      nameJa: '王雅赟（オウ・ガウン）',
      roleEn: 'Organizational Development Specialist',
      roleZh: '组织发展专家',
      roleFr: 'Spécialiste du Développement Organisationnel',
      roleJa: '組織開発スペシャリスト',
      titleEn: 'PhD, Organizational Psychology',
      titleZh: '组织心理学博士',
      titleFr: 'Doctorat en Psychologie Organisationnelle',
      titleJa: '組織心理学博士',
      bioEn: 'PhD in Organizational Psychology with research focus on solo entrepreneurship and remote work dynamics. Helps OPC entrepreneurs design optimal work systems, maintain work-life balance, and build sustainable business practices.',
      bioZh: '组织心理学博士，研究重点为个人创业和远程工作动态。帮助OPC创业者设计最优工作系统、保持工作生活平衡，并建立可持续的商业实践。',
      bioFr: 'Docteur en psychologie organisationnelle avec une recherche axée sur l\'entrepreneuriat solo et la dynamique du travail à distance.',
      bioJa: '組織心理学博士。ソロ起業とリモートワークダイナミクスに研究の焦点を置く。OPC起業家が最適な作業システムを設計し、ワークライフバランスを維持し、持続可能なビジネス慣行を構築する支援を行う。',
      sortOrder: 5,
      displayOrder: 5
    }
  ];
  
  // Insert each facilitator
  for (const f of facilitators) {
    await conn.execute(
      `INSERT INTO experts (nameEn, nameZh, nameFr, nameJa, roleEn, roleZh, roleFr, roleJa, titleEn, titleZh, titleFr, titleJa, bioEn, bioZh, bioFr, bioJa, sortOrder, displayOrder, isVisible)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'visible')`,
      [f.nameEn, f.nameZh, f.nameFr, f.nameJa, f.roleEn, f.roleZh, f.roleFr, f.roleJa, f.titleEn, f.titleZh, f.titleFr, f.titleJa, f.bioEn, f.bioZh, f.bioFr, f.bioJa, f.sortOrder, f.displayOrder]
    );
    console.log(`Inserted facilitator: ${f.nameZh} (${f.nameEn})`);
  }
  
  console.log('\nAll 5 facilitators inserted successfully!');
  await conn.end();
}

seedFacilitators().catch(console.error);
