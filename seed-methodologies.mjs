import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const methodologies = [
  {
    slug: '052-paradigm',
    nameEn: 'The 0.5 / 3.0 / 2.0 Paradigm',
    nameZh: '0.5 / 3.0 / 2.0 范式',
    nameFr: 'Le Paradigme 0.5 / 3.0 / 2.0',
    nameJa: '0.5 / 3.0 / 2.0 パラダイム',
    taglineEn: 'Time Arbitrage x Output Multiplier x Value Capture',
    taglineZh: '时间套利 x 产出倍增 x 价值捕获',
    taglineFr: 'Arbitrage Temporel x Multiplicateur de Production x Capture de Valeur',
    taglineJa: '時間アービトラージ x アウトプット倍増 x 価値獲得',
    descriptionEn: '**0.5 Time Arbitrage**: Master AI to cut execution time by half, reinvesting the surplus into strategy and creative work.\n\n**3.0 Output Multiplier**: Leverage AI agents to triple your creative and operational output quality without proportional effort increase.\n\n**2.0 Value Capture**: Double your captured value by owning the entire business loop — from ideation to delivery — as a one-person company.\n\nThis paradigm represents the fundamental economic equation of the OPC model: by compressing time (0.5x), amplifying output (3.0x), and maximizing value retention (2.0x), a single individual can achieve what previously required an entire team.',
    descriptionZh: '**0.5 时间套利**：善用 AI 将执行时间压缩一半，将节省的时间重新投入战略与创造性工作。\n\n**3.0 产出倍增**：借助 AI 智能体，在不成比例增加投入的情况下，将创造性和运营产出质量提升三倍。\n\n**2.0 价值捕获**：通过掌控从构思到交付的完整商业闭环，将捕获的价值翻倍。\n\n这一范式代表了 OPC 模式的基本经济方程：通过压缩时间（0.5x）、放大产出（3.0x）、最大化价值留存（2.0x），单个个体可以实现过去需要整个团队才能完成的成果。',
    descriptionFr: '**0.5 Arbitrage Temporel**: Utilisez l\'IA pour reduire le temps d\'execution de moitie.\n\n**3.0 Multiplicateur**: Triplez la qualite de votre production creative et operationnelle.\n\n**2.0 Capture de Valeur**: Doublez la valeur capturee en maitrisant la boucle commerciale complete.',
    descriptionJa: '**0.5 時間アービトラージ**: AIを活用して実行時間を半分に圧縮。\n\n**3.0 アウトプット倍増**: AIエージェントで創造的・運営的アウトプットの質を3倍に。\n\n**2.0 価値獲得**: ビジネスループ全体を所有し、獲得価値を2倍に。',
    themeColor: '#2563eb',
    displayOrder: 0
  },
  {
    slug: 'lid',
    nameEn: 'L.I.D Framework',
    nameZh: 'L.I.D 框架',
    nameFr: 'Cadre L.I.D',
    nameJa: 'L.I.D フレームワーク',
    taglineEn: 'Learn - Implement - Deliver',
    taglineZh: '学习 - 实施 - 交付',
    taglineFr: 'Apprendre - Implementer - Livrer',
    taglineJa: '学習 - 実装 - 提供',
    descriptionEn: '**L - Learn**: Acquire domain knowledge and AI tool proficiency through structured OPC+X coaching programs. Focus on practical, immediately applicable skills rather than theoretical knowledge.\n\n**I - Implement**: Apply learned skills to real-world projects within the OPC ecosystem. Build your portfolio, test your value proposition, and refine your unique offering through hands-on practice.\n\n**D - Deliver**: Complete the value chain by delivering professional-grade results to clients. Establish your reputation, build recurring revenue streams, and scale your one-person operation.\n\nThe L.I.D framework ensures that every OPC member follows a clear path from learning to earning, with each stage building upon the previous one.',
    descriptionZh: '**L - 学习 (Learn)**：通过结构化的 OPC+X 教练课程获取领域知识和 AI 工具能力。专注于实用、可立即应用的技能，而非理论知识。\n\n**I - 实施 (Implement)**：将所学技能应用于 OPC 生态内的真实项目。通过实践构建作品集、测试价值主张、打磨独特服务。\n\n**D - 交付 (Deliver)**：通过向客户交付专业级成果完成价值链。建立声誉、构建持续收入流、扩展一人公司运营。\n\nL.I.D 框架确保每位 OPC 成员都有一条从学习到变现的清晰路径，每个阶段都建立在前一个阶段的基础之上。',
    descriptionFr: '**L - Apprendre**: Acquerir des connaissances et la maitrise des outils IA.\n\n**I - Implementer**: Appliquer les competences a des projets reels.\n\n**D - Livrer**: Completer la chaine de valeur avec des resultats professionnels.',
    descriptionJa: '**L - 学習**: OPC+Xコーチングで実践的スキルを習得。\n\n**I - 実装**: 実プロジェクトでスキルを適用。\n\n**D - 提供**: プロフェッショナルな成果を顧客に提供。',
    themeColor: '#059669',
    displayOrder: 1
  },
  {
    slug: 'meat',
    nameEn: 'M.E.A.T Framework',
    nameZh: 'M.E.A.T 框架',
    nameFr: 'Cadre M.E.A.T',
    nameJa: 'M.E.A.T フレームワーク',
    taglineEn: 'Mindset - Execution - Amplification - Transformation',
    taglineZh: '心态 - 执行 - 放大 - 转化',
    taglineFr: 'Mentalite - Execution - Amplification - Transformation',
    taglineJa: 'マインドセット - 実行 - 増幅 - 変革',
    descriptionEn: '**M - Mindset**: Cultivate the entrepreneurial mindset required for independent operation. Embrace uncertainty, develop resilience, and adopt a growth-oriented perspective that sees AI as an enabler rather than a threat.\n\n**E - Execution**: Master the art of rapid, high-quality execution using AI-augmented workflows. Build systems that allow you to deliver consistently at scale without burning out.\n\n**A - Amplification**: Leverage AI and the OPC ecosystem to amplify your reach and impact beyond what any individual could achieve alone. Use network effects, shared resources, and collaborative partnerships.\n\n**T - Transformation**: Achieve the ultimate transformation from employee to entrepreneur, from service provider to value creator. Transform not just your career, but your relationship with work itself.',
    descriptionZh: '**M - 心态 (Mindset)**：培养独立运营所需的创业心态。拥抱不确定性，培养韧性，采用将 AI 视为赋能者而非威胁的成长导向视角。\n\n**E - 执行 (Execution)**：掌握使用 AI 增强工作流进行快速、高质量执行的艺术。构建让你能够持续大规模交付而不会倦怠的系统。\n\n**A - 放大 (Amplification)**：利用 AI 和 OPC 生态放大你的触达范围和影响力，超越任何个体单独能达到的水平。利用网络效应、共享资源和协作伙伴关系。\n\n**T - 转化 (Transformation)**：实现从雇员到创业者、从服务提供者到价值创造者的终极转变。不仅转变你的职业，更转变你与工作本身的关系。',
    descriptionFr: '**M - Mentalite**: Cultiver l\'esprit entrepreneurial.\n\n**E - Execution**: Maitriser l\'execution rapide avec l\'IA.\n\n**A - Amplification**: Amplifier votre impact via l\'ecosysteme.\n\n**T - Transformation**: Transformation de salarie a createur de valeur.',
    descriptionJa: '**M - マインドセット**: 起業家精神の醸成。\n\n**E - 実行**: AI活用の高品質な実行力。\n\n**A - 増幅**: エコシステムによるインパクト拡大。\n\n**T - 変革**: 価値創造者への究極の変革。',
    themeColor: '#dc2626',
    displayOrder: 2
  },
  {
    slug: 'opc-three-laws',
    nameEn: 'The Three Laws of OPC',
    nameZh: 'OPC 三定律',
    nameFr: 'Les Trois Lois de l\'OPC',
    nameJa: 'OPC三原則',
    taglineEn: 'The fundamental principles governing one-person companies',
    taglineZh: '治理一人公司的基本原则',
    taglineFr: 'Les principes fondamentaux regissant les entreprises unipersonnelles',
    taglineJa: '一人会社を統治する基本原則',
    descriptionEn: '**First Law: Autonomy Principle**\nAn OPC must maintain complete operational autonomy. No single client, platform, or partner should account for more than 30% of revenue. Independence is the foundation of sustainable one-person operations.\n\n**Second Law: Leverage Principle**\nAn OPC must maximize leverage through technology, systems, and networks rather than headcount. AI agents, automation, and ecosystem partnerships replace the need for employees.\n\n**Third Law: Value Integrity Principle**\nAn OPC must create genuine value that can be measured and verified. Revenue must come from solving real problems, not from arbitrage, speculation, or exploitation of information asymmetry.',
    descriptionZh: '**第一定律：自主原则**\nOPC 必须保持完全的运营自主权。任何单一客户、平台或合作伙伴的收入占比不应超过 30%。独立性是可持续一人公司运营的基础。\n\n**第二定律：杠杆原则**\nOPC 必须通过技术、系统和网络而非人数来最大化杠杆效应。AI 智能体、自动化和生态伙伴关系取代了对员工的需求。\n\n**第三定律：价值诚信原则**\nOPC 必须创造可衡量和可验证的真实价值。收入必须来自解决真实问题，而非套利、投机或利用信息不对称。',
    descriptionFr: '**Premiere Loi: Autonomie** - Maintenir l\'independance operationnelle complete.\n\n**Deuxieme Loi: Levier** - Maximiser l\'effet de levier par la technologie.\n\n**Troisieme Loi: Integrite de Valeur** - Creer une valeur veritable et mesurable.',
    descriptionJa: '**第一法則：自律原則** - 完全な運営自律性の維持。\n\n**第二法則：レバレッジ原則** - テクノロジーによるレバレッジの最大化。\n\n**第三法則：価値誠実原則** - 測定可能な真の価値の創造。',
    themeColor: '#7c3aed',
    displayOrder: 3
  },
  {
    slug: '7s-assessment',
    nameEn: 'City OPC Potential Assessment: 7S Framework',
    nameZh: '城市 OPC 潜力评估 7S 体系',
    nameFr: 'Evaluation du Potentiel OPC Urbain: Cadre 7S',
    nameJa: '都市OPCポテンシャル評価：7Sフレームワーク',
    taglineEn: 'A systematic framework for evaluating city readiness for OPC ecosystems',
    taglineZh: '系统性评估城市 OPC 生态就绪度的框架',
    taglineFr: 'Un cadre systematique pour evaluer la preparation des villes aux ecosystemes OPC',
    taglineJa: 'OPCエコシステムに対する都市の準備状況を評価する体系的フレームワーク',
    descriptionEn: '**S1 - Scale (规模)**: Population density, economic output, and market size of the target city. Measures the potential demand pool for OPC services.\n\n**S2 - Skills (技能)**: Existing talent pool, educational institutions, and digital literacy levels. Assesses the supply side of potential OPC practitioners.\n\n**S3 - Structure (结构)**: Industry composition, SME density, and freelancer ecosystem maturity. Evaluates the economic structure\'s compatibility with OPC models.\n\n**S4 - Support (支持)**: Government policies, incubation programs, and regulatory environment for independent workers and micro-enterprises.\n\n**S5 - Systems (系统)**: Digital infrastructure, payment systems, and platform availability. Technical readiness for remote and AI-augmented work.\n\n**S6 - Social (社交)**: Community networks, co-working spaces, and cultural attitudes toward entrepreneurship and independent work.\n\n**S7 - Sustainability (可持续)**: Cost of living, quality of life, and long-term viability for independent professionals to thrive.',
    descriptionZh: '**S1 - 规模 (Scale)**：目标城市的人口密度、经济产出和市场规模。衡量 OPC 服务的潜在需求池。\n\n**S2 - 技能 (Skills)**：现有人才池、教育机构和数字素养水平。评估潜在 OPC 从业者的供给侧。\n\n**S3 - 结构 (Structure)**：产业构成、中小企业密度和自由职业者生态成熟度。评估经济结构与 OPC 模式的兼容性。\n\n**S4 - 支持 (Support)**：政府政策、孵化计划和对独立工作者及微型企业的监管环境。\n\n**S5 - 系统 (Systems)**：数字基础设施、支付系统和平台可用性。远程和 AI 增强工作的技术就绪度。\n\n**S6 - 社交 (Social)**：社区网络、共享办公空间以及对创业和独立工作的文化态度。\n\n**S7 - 可持续 (Sustainability)**：生活成本、生活质量以及独立专业人士长期发展的可行性。',
    descriptionFr: 'Un cadre en 7 dimensions pour evaluer le potentiel OPC d\'une ville: Echelle, Competences, Structure, Soutien, Systemes, Social, Durabilite.',
    descriptionJa: '都市のOPCポテンシャルを7つの次元で評価：規模、スキル、構造、支援、システム、社会、持続可能性。',
    themeColor: '#0891b2',
    displayOrder: 4
  }
];

for (let i = 0; i < methodologies.length; i++) {
  const m = methodologies[i];
  await conn.execute(
    `INSERT INTO methodologies (slug, nameEn, nameZh, nameFr, nameJa, taglineEn, taglineZh, taglineFr, taglineJa, descriptionEn, descriptionZh, descriptionFr, descriptionJa, themeColor, isVisible, displayOrder) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'visible', ?)`,
    [m.slug, m.nameEn, m.nameZh, m.nameFr, m.nameJa, m.taglineEn, m.taglineZh, m.taglineFr, m.taglineJa, m.descriptionEn, m.descriptionZh, m.descriptionFr, m.descriptionJa, m.themeColor, m.displayOrder]
  );
  console.log(`Inserted: ${m.nameZh} (${m.nameEn})`);
}

console.log(`Done! Inserted ${methodologies.length} methodologies.`);
await conn.end();
