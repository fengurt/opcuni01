import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const coaches = [
  {
    nameEn: 'Guo Feng', nameZh: '郭峰',
    nameFr: 'Guo Feng', nameJa: '郭峰',
    roleEn: 'Co-Founder & Secretary-General', roleZh: 'OPC Global联合发起人&管委会秘书长',
    roleFr: 'Co-fondateur & Secrétaire général', roleJa: '共同創設者＆事務局長',
    titleEn: 'TableAI Co-Founder & CEO / EHL Group (China) Founding Team / Cross-disciplinary System Architect',
    titleZh: 'TableAI联合创始人&CEO / 瑞士EHL集团(中国)奠基团队成员 / 跨界系统架构师',
    titleFr: 'Co-fondateur TableAI & CEO / Équipe fondatrice EHL (Chine)',
    titleJa: 'TableAI共同創設者&CEO / EHLグループ(中国)創設チーム',
    bioEn: 'Guo Feng is an entrepreneur, researcher, educator and senior consultant with international vision. He is a partner of China Zhiyou Group, Executive Director of China National Tourism Strategy Research Center, and Nibiru/Microsoft overseas & AI business development partner. As a founding team member of Swiss EHL Group (QS No.1 globally) in China, he was fully responsible for brand, growth and talent system implementation. He leads the global certification standard architecture and drives the overall OPC ecosystem implementation.',
    bioZh: '郭峰先生是一位拥有国际视野的创业者、研究者、教育者和资深顾问。他是中智游集团合伙人、中国国家旅游战略研究中心执行主任，亦是Nibiru/微软出海与AI业务发展合伙人。作为瑞士EHL集团（QS排名全球第一）在华业务从0到1的奠基团队成员，全面负责品牌、增长及人才体系落地。主导全球认证标准架构，推动OPC生态整体落地。',
    bioFr: 'Guo Feng est un entrepreneur, chercheur, éducateur et consultant senior avec une vision internationale. Partenaire du groupe China Zhiyou et directeur exécutif du Centre national de recherche stratégique sur le tourisme.',
    bioJa: '郭峰氏は国際的な視野を持つ起業家、研究者、教育者、シニアコンサルタントです。中智游集団パートナー、中国国家観光戦略研究センター執行主任。',
    sortOrder: 0
  },
  {
    nameEn: 'Yu Yong', nameZh: '俞勇',
    nameFr: 'Yu Yong', nameJa: '俞勇',
    roleEn: 'Lighthouse Expert & Project Commander', roleZh: '灯塔专家智能体项目总指挥',
    roleFr: 'Expert Phare & Commandant de projet', roleJa: '灯台専門家プロジェクト総指揮',
    titleEn: 'Professor, Shanghai Jiao Tong University / ACM Class Founder / Father of China\'s AI Golden Generation',
    titleZh: '上海交通大学教授 / 博士生导师 / ACM班创始人 / 中国计算机教育"总教头"',
    titleFr: 'Professeur, Université Jiao Tong de Shanghai / Fondateur de la classe ACM',
    titleJa: '上海交通大学教授 / ACMクラス創設者',
    bioEn: 'Top computer education expert. Founded the ACM Class at Shanghai Jiao Tong University in 2002, leading the team to break the European-American monopoly and win three ACM-ICPC World Championships. He cultivated China\'s "AI Golden Generation" including Li Zhenhui, Dai Wenyuan, Li Mu, and Chen Tianqi.',
    bioZh: '顶尖计算机教育专家，2002年创立上海交通大学ACM班，带领团队打破欧美垄断，三夺ACM国际大学生程序设计竞赛全球总冠军。培养了包括黎珍辉、戴文渊、李沐、陈天奇等在内的"中国AI黄金一代"，获"全国师德标兵"、"上海市教学名师"及"国务院特殊津贴"。',
    bioFr: 'Expert en éducation informatique de premier plan. A fondé la classe ACM à l\'Université Jiao Tong de Shanghai en 2002.',
    bioJa: 'トップコンピュータ教育専門家。2002年に上海交通大学ACMクラスを創設。',
    sortOrder: 1
  },
  {
    nameEn: 'Zhou Jian', nameZh: '周健',
    nameFr: 'Zhou Jian', nameJa: '周健',
    roleEn: 'OPC Digital Employee Tech Lead', roleZh: 'OPC数字员工技术主理人',
    roleFr: 'Responsable tech employés numériques OPC', roleJa: 'OPCデジタル従業員技術リーダー',
    titleEn: 'Founder of LanMa Tech / ACM World Champion / Li Kaifu\'s Last Apprentice / AI Agent Pioneer',
    titleZh: '澜码科技创始人 / ACM全球总冠军 / 李开复关门弟子 / AI Agent领域领军人物',
    titleFr: 'Fondateur de LanMa Tech / Champion mondial ACM',
    titleJa: '澜码科技創設者 / ACM世界チャンピオン',
    bioEn: 'SJTU CS graduate, 2002 ACM World Champion. Former Google HQ engineer (PageRank core code access), Alibaba Cloud tech expert, YITU Technology early core member, and Hongi RPA CTO. Now focused on enterprise AI Agent platform development.',
    bioZh: '上海交通大学计算机本硕，2002年ACM世界冠军成员。曾任谷歌美国总部工程师（掌握PageRank核心代码权限）、阿里云技术专家、依图科技早期核心成员及弘玑RPA CTO。现专注于企业级AI Agent（智能体）平台研发。',
    bioFr: 'Diplômé en informatique de SJTU, champion du monde ACM 2002. Ancien ingénieur Google.',
    bioJa: '上海交通大学CS卒、2002年ACM世界チャンピオン。元Google本社エンジニア。',
    sortOrder: 2
  },
  {
    nameEn: 'Gao Wei', nameZh: '高伟',
    nameFr: 'Gao Wei', nameJa: '高伟',
    roleEn: 'OPC University-Industry Integration Connector', roleZh: 'OPC高校产教融合链接者',
    roleFr: 'Connecteur intégration université-industrie OPC', roleJa: 'OPC産学融合コネクター',
    titleEn: 'Vice Dean, School of Entrepreneurship, SUIBE / Deputy Secretary-General, New Quality Productivity Division',
    titleZh: '上海对外经贸大学创业学院副院长 / 中国创造学会新质生产力产教融合分会常务副主任秘书长',
    titleFr: 'Vice-doyen, École d\'entrepreneuriat, SUIBE',
    titleJa: '上海対外経貿大学創業学院副院長',
    bioEn: 'Deputy Secretary-General of Shanghai Higher Education Overseas Exchange Association. Long-term dedication to university innovation and entrepreneurship education. Committed to building long-term mechanisms for university employment based on mobile internet and new media thinking.',
    bioZh: '上海市高校海外交流联谊会副秘书长，长期耕耘于高校创新创业教育一线。致力于构建基于移动互联网与新媒体思维的高校创就业长效机制，是连接高校人才与社会产业需求的关键桥梁。',
    bioFr: 'Secrétaire général adjoint de l\'Association des échanges universitaires de Shanghai.',
    bioJa: '上海高等教育海外交流協会副事務局長。',
    sortOrder: 3
  },
  {
    nameEn: 'Gong Aling', nameZh: '龚阿玲',
    nameFr: 'Gong Aling', nameJa: '龚阿玲',
    roleEn: 'OPC Brand & System Engineering Expert', roleZh: 'OPC组织品牌与系统工程专家',
    roleFr: 'Experte en marque et ingénierie système OPC', roleJa: 'OPCブランド＆システムエンジニアリング専門家',
    titleEn: 'Senior Multinational Banking Executive / Brand System Engineering Expert / Editor-in-Chief of "Love Haier"',
    titleZh: '资深跨国银行高管 / brand系统工程专家 / 《爱上海尔》主编',
    titleFr: 'Cadre bancaire multinationale senior / Experte en ingénierie de marque',
    titleJa: '多国籍銀行上級幹部 / ブランドシステムエンジニアリング専門家',
    bioEn: 'In 1990, participated in creating and managing the first McDonald\'s restaurant in mainland China in Shenzhen. Former executive at ICBC, Standard Chartered Bank, Commonwealth Bank of Australia, and California Bank. Board member of Shanghai True Love Dream Public Welfare Development Center.',
    bioZh: '1990年在深圳参与创建并管理中国大陆第一家麦当劳餐厅。曾担任中国工商银行、英国渣打银行、澳洲联邦银行、美国加州银行的高管，上海真爱梦想公益发展中心理事。即将出版《爱上海尔》（2025年）、《数字经济治理研究》（2026年）。',
    bioFr: 'En 1990, a participé à la création du premier McDonald\'s en Chine continentale.',
    bioJa: '1990年、深圳で中国本土初のマクドナルドの設立・管理に参加。',
    sortOrder: 4
  },
  {
    nameEn: 'Liu Bin', nameZh: '刘斌',
    nameFr: 'Liu Bin', nameJa: '刘斌',
    roleEn: 'OPC Commercial Space Operations Standard Setter', roleZh: 'OPC商业空间运营标准制定者',
    roleFr: 'Définisseur de normes d\'exploitation d\'espaces commerciaux OPC', roleJa: 'OPC商業空間運営基準策定者',
    titleEn: 'Founder & GM, Shanghai IGS Dingchuanghui / Commercial Space Operations & Incubation Expert',
    titleZh: '上海IGS鼎创汇创始人、总经理 / 商业空间运营与孵化专家',
    titleFr: 'Fondateur de Shanghai IGS Dingchuanghui',
    titleJa: '上海IGS鼎創匯創設者・総経理',
    bioEn: 'Long-term focus on cultural-creative technology industrial park operations and incubator management. Successfully built multiple innovative industrial spaces integrating esports, technology, and culture. Expert in revitalizing existing assets and industrial content operations.',
    bioZh: '长期专注于文创科技产业园区运营与孵化器管理，成功打造了多个集电竞、科技、文化于一体的创新产业空间，是存量资产盘活与产业内容运营的实战专家。',
    bioFr: 'Spécialisé dans la gestion de parcs industriels créatifs et technologiques.',
    bioJa: '文化クリエイティブ技術産業パーク運営とインキュベーター管理に長年注力。',
    sortOrder: 5
  },
  {
    nameEn: 'Lai Junsong', nameZh: '赖俊菘',
    nameFr: 'Lai Junsong', nameJa: '赖俊菘',
    roleEn: 'OPC Model Pioneer & Tech Support', roleZh: 'OPC模式最早实践者与技术支持',
    roleFr: 'Pionnier du modèle OPC & Support technique', roleJa: 'OPCモデル先駆者＆技術サポート',
    titleEn: 'Founder of Nibiru / Nanjing CPPCC Member / Metaverse & XR Industry Expert',
    titleZh: '睿悦信息(Nibiru) 创始人 / 南京市政协委员 / 元宇宙与XR产业专家',
    titleFr: 'Fondateur de Nibiru / Membre du CCPPC de Nanjing',
    titleJa: 'Nibiru創設者 / 南京市政協委員',
    bioEn: 'Founded Nibiru, a globally leading AR/VR system and 3D digital engine provider. Long-term commitment to building the underlying technology and ecosystem for next-generation computing platforms (metaverse). Founded "Songxing OPC Study Society" to explore future forms of OPC using metaverse technology.',
    bioZh: '创立全球领先的AR/VR系统及三维数字引擎供应商Nibiru，长期致力于下一代计算平台（元宇宙）的底层技术构建与生态发展。创立"菘行OPC研习社"，利用元宇宙技术探索OPC的未来形态，为生态提供沉浸式技术支持。',
    bioFr: 'Fondateur de Nibiru, fournisseur mondial de systèmes AR/VR.',
    bioJa: 'グローバルリーディングAR/VRシステムプロバイダーNibiruを創設。',
    sortOrder: 6
  },
  {
    nameEn: 'Cheng Hao', nameZh: '程颢',
    nameFr: 'Cheng Hao', nameJa: '程颢',
    roleEn: 'OPC International Connector & Canal Industry Lead', roleZh: 'OPC国际链接与运河业态负责人',
    roleFr: 'Connecteur international OPC & Responsable canal', roleJa: 'OPC国際コネクター＆運河業態責任者',
    titleEn: 'Chairman, World Canal Cities Canal Walk Action Committee / Senior International Education & Cultural Exchange Expert',
    titleZh: '世界运河城市Canal Walk行动组委会主席 / 资深国际教育与文化交流专家 / "壮游大运河"开创者',
    titleFr: 'Président du Comité Canal Walk des villes mondiales du canal',
    titleJa: '世界運河都市Canal Walk行動委員会主席',
    bioEn: 'Pioneer of experiential education and international canal cultural exchange in China. Initiated the "Grand Tour of the Grand Canal" and "Canal Walk" global cultural exchange activities. Successfully established the "World Canal Cities Study Cloud Platform" connecting 35+ canal cities worldwide.',
    bioZh: '中国体验式教育与国际运河文化交流的领军人物。开创性地提出"壮游"教育理念，发起"父子壮游大运河"等现象级社会实践项目。在波兰世界运河大会上首倡"世界运河城市Canal Walk行动"，成功建立"世界运河城市研学云平台"，将中国大运河文化推向全球35+运河城市。',
    bioFr: 'Pionnier de l\'éducation expérientielle et des échanges culturels internationaux sur les canaux.',
    bioJa: '中国における体験型教育と国際運河文化交流のパイオニア。',
    sortOrder: 7
  },
  {
    nameEn: 'Li Zhiyong', nameZh: '李智勇',
    nameFr: 'Li Zhiyong', nameJa: '李智勇',
    roleEn: 'Multi-Agent System (MAS) Architect', roleZh: '新型多智能体系统(MAS)架构师',
    roleFr: 'Architecte système multi-agents (MAS)', roleJa: 'マルチエージェントシステム(MAS)アーキテクト',
    titleEn: 'Founder of Smart Leap / Author of "Unmanned Company" / PKU NSD Lecturer / AI Architect',
    titleZh: '智能跳越创始人 / 《无人公司》作者 / 北大国发院讲师 / AI架构师',
    titleFr: 'Fondateur de Smart Leap / Auteur de "Unmanned Company"',
    titleJa: '智能跳越創設者 / 「無人公司」著者 / 北京大学講師',
    bioEn: 'Led product-research teams for Xiaomi Xiao AI, Baidu Xiaodu, and Beijing Winter Olympics backend systems. As COO, led 200M+ financing and 200M+ annual revenue. Holds 100+ invention patents. Author of "Unmanned Company" and "Ultimate Replication", with deep insights into AI\'s disruption of organizational forms.',
    bioZh: '曾带产研团队负责小米小爱同学、百度小度在家、北京冬奥会后台等关键系统。作为COO主导过2亿以上融资并辅助完成每年2亿以上收入并盈利，拥有100+项发明专利，著有《无人公司》《终极复制》，深刻洞察AI对组织形态的颠覆。',
    bioFr: 'A dirigé des équipes pour Xiaomi Xiao AI et Baidu Xiaodu. Auteur de "Unmanned Company".',
    bioJa: 'Xiaomi小愛同学、Baidu小度のチームを率いた。「無人公司」著者。',
    sortOrder: 8
  },
  {
    nameEn: 'Wang Zhuoran', nameZh: '王卓然',
    nameFr: 'Wang Zhuoran', nameJa: '王卓然',
    roleEn: 'OPC Human-Machine Interaction & Model Advisor', roleZh: 'OPC人机交互与底层模型顾问',
    roleFr: 'Conseiller interaction homme-machine OPC', roleJa: 'OPC人機インタラクション＆モデルアドバイザー',
    titleEn: 'PhD, University College London / Former Founder & CEO of Trio.ai / Intelligent Interaction Expert',
    titleZh: '伦敦大学学院(UCL)计算机博士 / 前三角兽科技创始人兼CEO / 智能交互专家',
    titleFr: 'Doctorat UCL / Ancien fondateur de Trio.ai',
    titleJa: 'UCLコンピュータ博士 / 元Trio.ai創設者&CEO',
    bioEn: 'Former Baidu and Toshiba European Research Lab. Nearly 20 years of experience in ML, NLP, and human-machine dialogue. 30+ academic papers, 10+ patent authorizations. Forbes China Young Overseas Returnee Elite 100.',
    bioZh: '曾任职于百度、东芝欧洲研究院。在机器学习、NLP、人机对话领域拥有近20年经验，发表学术论文30余篇，获专利授权10余项。曾获北京市特聘专家、第九届吴文俊人工智能科技进步三等奖、福布斯中国青年海归菁英100人等荣誉。',
    bioFr: 'Ancien chercheur chez Baidu et Toshiba Europe. 20 ans d\'expérience en ML et NLP.',
    bioJa: '元百度、東芝欧州研究所。ML、NLP、人機対話分野で約20年の経験。',
    sortOrder: 9
  },
  {
    nameEn: 'Jiang Jun', nameZh: '蒋骏',
    nameFr: 'Jiang Jun', nameJa: '蒋骏',
    roleEn: 'OPC Smart Tourism Scene Lead', roleZh: 'OPC智慧文旅场景主理人',
    roleFr: 'Responsable scène tourisme intelligent OPC', roleJa: 'OPCスマート観光シーンリーダー',
    titleEn: 'Chairman of China Zhiyou Group / Secretary-General, China Smart Tourism Industry Alliance / Cultural Tourism Big Data Expert',
    titleZh: '中智游董事长 / 中国智慧旅游产业联盟秘书长 / 文旅大数据专家',
    titleFr: 'Président du groupe China Zhiyou / Secrétaire général de l\'Alliance du tourisme intelligent',
    titleJa: '中智游董事長 / 中国スマート観光産業連盟事務局長',
    bioEn: 'Former Yonyou Software Assistant President and Dianfeng Zhiye President. Led the top-level design of the National Smart Tourism Public Service Platform. Authoritative expert in smart cultural tourism and digital transformation.',
    bioZh: '曾任用友软件助理总裁、巅峰智业总裁。主持国家智慧旅游公共服务平台顶层设计，是国内智慧文旅与数字化转型的权威专家。',
    bioFr: 'Ancien président assistant de Yonyou Software. Expert en tourisme intelligent.',
    bioJa: '元用友ソフトウェア副社長。国家スマート観光公共サービスプラットフォームの設計を主導。',
    sortOrder: 10
  },
  {
    nameEn: 'Lu Qun', nameZh: '鹿群',
    nameFr: 'Lu Qun', nameJa: '鹿群',
    roleEn: 'OPC Mind-Body Resilience & Life Health Advisor', roleZh: 'OPC身心韧性与生命健康顾问',
    roleFr: 'Conseiller résilience et santé OPC', roleJa: 'OPC心身レジリエンス＆生命健康アドバイザー',
    titleEn: 'Director, Reproductive Medicine Center, Beijing Chaoyang Hospital / Professor / Doctoral Supervisor',
    titleZh: '北京朝阳医院生殖医学中心主任 / 教授 / 博士生导师',
    titleFr: 'Directeur du Centre de médecine reproductive, Hôpital Chaoyang de Pékin',
    titleJa: '北京朝陽病院生殖医学センター主任 / 教授',
    bioEn: 'Senior expert in assisted reproduction. Long-term clinical and research work in infertility, recurrent miscarriage, reproductive endocrine diseases and assisted reproductive technology. Holds important academic positions in Chinese Medical Association and Beijing Medical Association.',
    bioZh: '国内辅助生殖领域资深专家，长期从事不孕不育、反复流产、生殖内分泌疾病及辅助生殖技术临床与科研工作，兼任中华医学会、北京医学会生殖医学分会重要学术职务，在行业内具有极高影响力。',
    bioFr: 'Expert senior en reproduction assistée. Travaux cliniques et de recherche sur l\'infertilité.',
    bioJa: '生殖補助医療の上級専門家。不妊症、反復流産の臨床・研究に長年従事。',
    sortOrder: 11
  },
  {
    nameEn: 'Zhang Huan', nameZh: '张欢',
    nameFr: 'Zhang Huan', nameJa: '张欢',
    roleEn: 'OPC Global Competition Coordinator & Project Evaluator', roleZh: 'OPC全球大赛协调与项目评估人',
    roleFr: 'Coordinateur compétition mondiale OPC', roleJa: 'OPCグローバル大会コーディネーター',
    titleEn: 'Partner, Yongjie Investment / COO, Magibox Australia / International Venture Capital Expert',
    titleZh: '永捷投资合伙人 / 澳洲聚能国际集团(Magibox) COO / 国际创投专家',
    titleFr: 'Partenaire, Yongjie Investment / COO, Magibox Australie',
    titleJa: '永捷投資パートナー / Magiboxオーストラリア COO',
    bioEn: 'Rich international business experience. Deep cooperation partner of Zhongguancun Industrial Park and HICOOL Global Entrepreneurs Summit. Expert in cross-border project evaluation, international mineral resources and bulk trade.',
    bioZh: '拥有丰富的国际商业经验，是中关村产业园及HICOOL全球创业者峰会的深度合作伙伴，擅长跨国项目评估、国际矿产资源及大宗贸易。',
    bioFr: 'Riche expérience commerciale internationale. Partenaire de Zhongguancun.',
    bioJa: '豊富な国際ビジネス経験。中関村産業園のパートナー。',
    sortOrder: 12
  },
  {
    nameEn: 'Li Lu', nameZh: '李璐',
    nameFr: 'Li Lu', nameJa: '李璐',
    roleEn: 'OPC Global Legal Compliance Navigator', roleZh: 'OPC全球法律合规护航者',
    roleFr: 'Navigateur conformité juridique mondiale OPC', roleJa: 'OPCグローバル法務コンプライアンスナビゲーター',
    titleEn: 'Senior Partner Lawyer / Co-initiator of "Tonggentongmeng" Global Chinese Legal Service Project',
    titleZh: '资深律师合伙人 / "同根同梦"全球华人华侨法务服务工程联合发起方',
    titleFr: 'Avocate associée senior / Co-initiatrice du projet juridique mondial chinois',
    titleJa: 'シニアパートナー弁護士 / グローバル華人法務サービスプロジェクト共同発起人',
    bioEn: 'Senior legal expert focused on global Chinese diaspora legal services and rights protection. Built a cross-regional legal aid network providing solid legal compliance guarantees for OPC individuals.',
    bioZh: '资深法律专家，专注于全球华人华侨的法律服务与权益保护，构建了跨区域的法律援助网络。为OPC个体提供坚实的法律合规保障。',
    bioFr: 'Experte juridique senior spécialisée dans les services juridiques pour la diaspora chinoise.',
    bioJa: 'グローバル華人華僑の法務サービスと権益保護に注力するシニア法律専門家。',
    sortOrder: 13
  },
  {
    nameEn: 'Shi Duo', nameZh: '石多',
    nameFr: 'Shi Duo', nameJa: '石多',
    roleEn: 'OPC Mind-Body Resilience & Art Therapy System Lead', roleZh: 'OPC身心韧性与艺术疗愈体系负责人',
    roleFr: 'Responsable système art-thérapie OPC', roleJa: 'OPC心身レジリエンス＆アートセラピーシステムリーダー',
    titleEn: 'Dean, Asian Art Therapy Research Institute / Cross-disciplinary Artist / Initiator, Asia-Pacific Healing Arts Alliance',
    titleZh: '亚洲艺术疗愈研究院院长 / 跨界艺术家 / 亚太疗愈艺术联盟发起人',
    titleFr: 'Doyen, Institut asiatique de recherche en art-thérapie',
    titleJa: 'アジア芸術療癒研究院院長 / 越境アーティスト',
    bioEn: 'International education and art expert, mind-body health management specialist. Committed to promoting the professionalization and internationalization of art therapy, advocating art intervention to enhance individual psychological resilience.',
    bioZh: '国际教育与艺术专家，身心健康管理专家。致力于推动艺术疗愈的专业化与国际化发展，主张通过艺术介入提升个体的心理韧性。',
    bioFr: 'Expert international en éducation et art, spécialiste en gestion de la santé corps-esprit.',
    bioJa: '国際教育・芸術専門家、心身健康管理スペシャリスト。',
    sortOrder: 14
  },
  {
    nameEn: 'Hou Libin', nameZh: '侯立斌',
    nameFr: 'Hou Libin', nameJa: '侯立斌',
    roleEn: 'OPC Micro-Major University Promotion Lead', roleZh: 'OPC微专业高校推广负责人',
    roleFr: 'Responsable promotion universitaire micro-majeure OPC', roleJa: 'OPCマイクロ専攻大学推進責任者',
    titleEn: 'Vice Dean, Asian Art Therapy Research Institute / International Education & Art Expert',
    titleZh: '亚洲艺术疗愈研究院副院长 / 国际教育与艺术专家',
    titleFr: 'Vice-doyen, Institut asiatique de recherche en art-thérapie',
    titleJa: 'アジア芸術療癒研究院副院長 / 国際教育・芸術専門家',
    bioEn: 'Initiator of the Asia-Pacific Healing Arts Alliance. Rich experience in international education cooperation and art curriculum promotion. Responsible for OPC micro-major curriculum promotion, enrollment and implementation in domestic and international universities.',
    bioZh: '亚太疗愈艺术联盟发起人，在国际教育合作与艺术课程推广方面拥有丰富经验。负责OPC微专业课程在国内外高校的推广、招生与落地执行，推动新型教育模式的普及。',
    bioFr: 'Initiateur de l\'Alliance des arts thérapeutiques Asie-Pacifique.',
    bioJa: 'アジア太平洋ヒーリングアーツアライアンス発起人。',
    sortOrder: 15
  }
];

for (let i = 0; i < coaches.length; i++) {
  const c = coaches[i];
  await conn.execute(
    `INSERT INTO experts (nameEn, nameZh, nameFr, nameJa, roleEn, roleZh, roleFr, roleJa, titleEn, titleZh, titleFr, titleJa, bioEn, bioZh, bioFr, bioJa, sortOrder, isVisible, displayOrder) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'visible', ?)`,
    [c.nameEn, c.nameZh, c.nameFr, c.nameJa, c.roleEn, c.roleZh, c.roleFr, c.roleJa, c.titleEn, c.titleZh, c.titleFr, c.titleJa, c.bioEn, c.bioZh, c.bioFr, c.bioJa, c.sortOrder, c.sortOrder]
  );
  console.log(`Inserted: ${c.nameZh} (${c.nameEn})`);
}

console.log(`Done! Inserted ${coaches.length} co-creation coaches.`);
await conn.end();
