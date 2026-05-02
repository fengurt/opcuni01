import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const milestones = [
  {
    category: "政府官方-中国",
    sourceNameZh: "全国人民代表大会 - 新《公司法》",
    sourceNameEn: "National People's Congress - New Company Law",
    descriptionZh: "【里程碑】中国公司法30年来最重大修订，取消一人公司数量限制，标志着中国对一人公司制度的全面放开。",
    descriptionEn: "[Milestone] The most significant revision of China's Company Law in 30 years, removing the limit on the number of one-person companies, marking China's full liberalization of the one-person company system.",
    publishDate: "2023-12-29",
    sourceType: "立法机构",
    url: "http://www.npc.gov.cn/c2/c30834/202312/t20231229_433999.html",
    country: "China",
    year: 2023
  },
  {
    category: "政府官方-中国",
    sourceNameZh: "全国人民代表大会 - 公司法全文",
    sourceNameEn: "National People's Congress - Full Text of Company Law",
    descriptionZh: "【法律原文】新《公司法》完整条文，是研究中国一人公司法律框架的权威一手资料。",
    descriptionEn: "[Legal Text] The complete text of the new Company Law, an authoritative primary source for studying China's one-person company legal framework.",
    publishDate: "2023-12-29",
    sourceType: "立法机构",
    url: "http://www.npc.gov.cn/npc/c2/c30834/202312/t20231229_433993.html",
    country: "China",
    year: 2023
  },
  {
    category: "政府官方-中国",
    sourceNameZh: "深圳市市场监督管理局 - 新公司法解读",
    sourceNameEn: "Shenzhen Administration for Market Regulation - New Company Law Interpretation",
    descriptionZh: "【官方解读】深圳市监局对新公司法一人公司条款的权威解读，明确一人可设立多个一人公司。",
    descriptionEn: "[Official Interpretation] Shenzhen's authoritative interpretation of the one-person company provisions, clarifying that one person can establish multiple one-person companies.",
    publishDate: "2024-07-25",
    sourceType: "地方政府",
    url: "https://amr.sz.gov.cn/zcjzts/ssdj/content/post_11458245.html",
    country: "China",
    year: 2024
  },
  {
    category: "政府官方-中国",
    sourceNameZh: "国务院 - 大众创业万众创新政策",
    sourceNameEn: "State Council - Mass Entrepreneurship and Innovation Policy",
    descriptionZh: "【政策背景】中国双创战略的顶层设计文件，为后续一人创业政策奠定了基调。",
    descriptionEn: "[Policy Background] The top-level design document for China's dual innovation strategy, setting the tone for subsequent solo entrepreneurship policies.",
    publishDate: "2015-06-11",
    sourceType: "中央政府",
    url: "http://www.moe.gov.cn/jyb_xxgk/moe_1777/moe_1778/201512/t20151210_224314.html",
    country: "China",
    year: 2015
  },
  {
    category: "政府官方-国际",
    sourceNameZh: "欧盟法律数据库 - 第十二号公司法指令 (89/667/EEC)",
    sourceNameEn: "EU Law Database - Twelfth Company Law Directive (89/667/EEC)",
    descriptionZh: "【欧洲起源】欧盟首个统一一人公司法律框架的指令，推动欧洲各国承认一人公司制度。",
    descriptionEn: "[European Origin] The EU's first directive unifying the one-person company legal framework, promoting recognition of the one-person company system across European countries.",
    publishDate: "1989-12-21",
    sourceType: "国际组织",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:31989L0667",
    country: "EU",
    year: 1989
  },
  {
    category: "政府官方-国际",
    sourceNameZh: "欧盟法律数据库 - 指令 2009/102/EC",
    sourceNameEn: "EU Law Database - Directive 2009/102/EC",
    descriptionZh: "【制度完善】对1989年指令的更新和编纂，代表欧盟一人公司制度的成熟。",
    descriptionEn: "[System Improvement] Update and codification of the 1989 directive, representing the maturation of the EU's one-person company system.",
    publishDate: "2009-09-16",
    sourceType: "国际组织",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32009L0102",
    country: "EU",
    year: 2009
  },
  {
    category: "政府官方-国际",
    sourceNameZh: "美国国税局 - Single Member LLC",
    sourceNameEn: "IRS - Single Member LLC",
    descriptionZh: "【美国模式】美国单一成员LLC的官方税务指南，展示美国对一人公司的灵活税务处理方式。",
    descriptionEn: "[US Model] Official IRS tax guide for single-member LLCs, demonstrating the US's flexible tax treatment for one-person companies.",
    publishDate: "2025-07-26",
    sourceType: "联邦机构",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/single-member-limited-liability-companies",
    country: "USA",
    year: 2025
  },
  {
    category: "政府官方-国际",
    sourceNameZh: "日本法务省 - Companies Act",
    sourceNameEn: "Japan Ministry of Justice - Companies Act",
    descriptionZh: "【亚洲先行】日本2006年公司法改革，正式允许一人株式会社，是亚洲一人公司制度的重要参考。",
    descriptionEn: "[Asian Pioneer] Japan's 2006 Company Law reform officially allowing one-person joint-stock companies, an important reference for Asian one-person company systems.",
    publishDate: "2006-06-01",
    sourceType: "国家机构",
    url: "https://www.japaneselawtranslation.go.jp/en/laws/view/3206",
    country: "Japan",
    year: 2006
  },
  {
    category: "政府官方-国际",
    sourceNameZh: "印度公司事务部 - J.J. Irani委员会报告",
    sourceNameEn: "India Ministry of Corporate Affairs - J.J. Irani Committee Report",
    descriptionZh: "【制度设计】印度OPC制度的理论基础，该报告直接促成了印度2013年公司法引入OPC概念。",
    descriptionEn: "[System Design] The theoretical foundation of India's OPC system, this report directly led to the introduction of the OPC concept in India's 2013 Company Law.",
    publishDate: "2005-05-31",
    sourceType: "国家机构",
    url: "https://ibbi.gov.in/uploads/resources/May%202005,%20J.%20J.%20Irani%20Report%20of%20the%20Expert%20Committee%20on%20Company%20Law.pdf",
    country: "India",
    year: 2005
  },
  {
    category: "官方媒体-中央",
    sourceNameZh: "科技日报 - 深圳OPC行动计划",
    sourceNameEn: "Science and Technology Daily - Shenzhen OPC Action Plan",
    descriptionZh: "【深圳政策】深圳市打造AI OPC创业生态的官方报道，代表一线城市对一人公司的战略布局。",
    descriptionEn: "[Shenzhen Policy] Official report on Shenzhen's AI OPC entrepreneurship ecosystem, representing first-tier cities' strategic positioning for one-person companies.",
    publishDate: "2026-01-15",
    sourceType: "中央媒体",
    url: "https://www.stdaily.com/web/gdxw/2026-01/15/content_462134.html",
    country: "China",
    year: 2026
  },
  {
    category: "官方媒体-中央",
    sourceNameZh: "中新网 - 创业者支持政策",
    sourceNameEn: "China News - Entrepreneur Support Policies",
    descriptionZh: "【政策汇总】中国政府为创业者提供的贷款、税收、补贴等支持政策的权威汇总。",
    descriptionEn: "[Policy Summary] Authoritative summary of Chinese government support policies for entrepreneurs including loans, taxes, and subsidies.",
    publishDate: "2025-10-26",
    sourceType: "中央媒体",
    url: "https://www.chinanews.com.cn/cj/2025/10-26/10504709.shtml",
    country: "China",
    year: 2025
  },
  {
    category: "官方媒体-省级",
    sourceNameZh: "新华报业网 - 江苏AI+行动方案",
    sourceNameEn: "Xinhua Daily - Jiangsu AI+ Action Plan",
    descriptionZh: "【省级政策】江苏省人工智能+行动方案，明确支持AI一人公司创新创业模式。",
    descriptionEn: "[Provincial Policy] Jiangsu Province's AI+ action plan, explicitly supporting AI one-person company innovation and entrepreneurship models.",
    publishDate: "2026-01-15",
    sourceType: "省级媒体",
    url: "https://www.xhby.net/content/s69685811e4b0e65d832f2d91.html",
    country: "China",
    year: 2026
  },
  {
    category: "官方媒体-省级",
    sourceNameZh: "上观新闻 - 长三角OPC发展",
    sourceNameEn: "Shanghai Observer - Yangtze River Delta OPC Development",
    descriptionZh: "【区域联动】长三角地区OPC政策密集出台的综合报道，展示区域协同发展态势。",
    descriptionEn: "[Regional Coordination] Comprehensive report on the intensive rollout of OPC policies in the Yangtze River Delta region, demonstrating regional coordinated development.",
    publishDate: "2025-12-23",
    sourceType: "省级媒体",
    url: "https://www.shobserver.com/news/detail?id=1040358",
    country: "China",
    year: 2025
  },
  {
    category: "官方媒体-省级",
    sourceNameZh: "澎湃新闻 - 一人独角兽报道",
    sourceNameEn: "The Paper - One-Person Unicorn Report",
    descriptionZh: "【趋势分析】上海、苏州等地OPC政策的深度报道，揭示一人独角兽在中国的落地实践。",
    descriptionEn: "[Trend Analysis] In-depth report on OPC policies in Shanghai, Suzhou and other areas, revealing the implementation of one-person unicorns in China.",
    publishDate: "2026-01-14",
    sourceType: "财经媒体",
    url: "https://m.thepaper.cn/newsDetail_forward_32379474",
    country: "China",
    year: 2026
  },
  {
    category: "财经媒体",
    sourceNameZh: "21世纪经济报道 - 深圳OPC政策",
    sourceNameEn: "21st Century Business Herald - Shenzhen OPC Policy",
    descriptionZh: "【政策细节】深圳OPC行动计划的详细解读，包括百亿基金、OPC社区等具体措施。",
    descriptionEn: "[Policy Details] Detailed interpretation of Shenzhen's OPC action plan, including specific measures such as 10-billion fund and OPC communities.",
    publishDate: "2026-01-15",
    sourceType: "财经媒体",
    url: "https://www.21jingji.com/article/20260115/herald/8e037900cfdfa07385de19beea15fc49.html",
    country: "China",
    year: 2026
  },
  {
    category: "财经媒体",
    sourceNameZh: "36氪 - Sam Altman一人独角兽",
    sourceNameEn: "36Kr - Sam Altman One-Person Unicorn",
    descriptionZh: "【概念传播】Sam Altman一人独角兽观点在中国科技媒体的传播，推动概念本土化。",
    descriptionEn: "[Concept Spread] The spread of Sam Altman's one-person unicorn concept in Chinese tech media, promoting localization of the concept.",
    publishDate: "2025-08-14",
    sourceType: "财经媒体",
    url: "https://m.36kr.com/p/3422582717582977",
    country: "China",
    year: 2025
  },
  {
    category: "学术来源",
    sourceNameZh: "SSRN - 一人独角兽理论框架",
    sourceNameEn: "SSRN - One-Person Unicorn Theoretical Framework",
    descriptionZh: "【理论构建】Kevin Chen提出寂静奇点理论，为一人独角兽现象提供学术理论框架。",
    descriptionEn: "[Theory Building] Kevin Chen proposes the Silent Singularity theory, providing an academic theoretical framework for the one-person unicorn phenomenon.",
    publishDate: "2025-10-10",
    sourceType: "学术论文",
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5586250",
    country: "International",
    year: 2025
  },
  {
    category: "学术来源",
    sourceNameZh: "SSRN - Solo Ventures研究",
    sourceNameEn: "SSRN - Solo Ventures Research",
    descriptionZh: "【实证研究】Greenberg & Mollick的研究表明独立创业公司可能优于团队创业，挑战传统观点。",
    descriptionEn: "[Empirical Research] Greenberg & Mollick's research suggests solo ventures may outperform team ventures, challenging traditional views.",
    publishDate: "2018-01-23",
    sourceType: "学术论文",
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3107898",
    country: "International",
    year: 2018
  },
  {
    category: "学术来源",
    sourceNameZh: "Journal of Management & Organization - Solo Entrepreneur研究",
    sourceNameEn: "Journal of Management & Organization - Solo Entrepreneur Research",
    descriptionZh: "【学术定义】学术界对独立创业者的正式定义和研究，为概念提供学术支撑。",
    descriptionEn: "[Academic Definition] Academic formal definition and research on solo entrepreneurs, providing scholarly support for the concept.",
    publishDate: "2025-07-24",
    sourceType: "学术期刊",
    url: "https://www.cambridge.org/core/journals/journal-of-management-and-organization/article/i-am-my-business-solo-entrepreneurs-selfpresentation-on-social-media/E1542B2525B7ADF312A6DA5415FA08F9",
    country: "International",
    year: 2025
  },
  {
    category: "学术来源",
    sourceNameZh: "中国法学网 - 一人公司研究",
    sourceNameEn: "China Law Network - One-Person Company Research",
    descriptionZh: "【中国研究】中国学者对一人公司制度的早期学术研究，反映2005年公司法修订后的学术讨论。",
    descriptionEn: "[China Research] Early academic research by Chinese scholars on the one-person company system, reflecting academic discussions after the 2005 Company Law revision.",
    publishDate: "2007-08-09",
    sourceType: "学术网站",
    url: "http://iolaw.cssn.cn/xspl/200708/t20070809_4600067.shtml",
    country: "China",
    year: 2007
  },
  {
    category: "学术来源",
    sourceNameZh: "国际经济法学网 - 一人公司历史",
    sourceNameEn: "International Economic Law Network - One-Person Company History",
    descriptionZh: "【历史溯源】一人公司法律制度的全球历史演变研究，追溯至1925年列支敦士登。",
    descriptionEn: "[Historical Origins] Research on the global historical evolution of one-person company legal systems, tracing back to Liechtenstein in 1925.",
    publishDate: null,
    sourceType: "学术网站",
    url: "https://ielaw.uibe.edu.cn/fxlw/bjsfx1/bjsszzf/13508.htm",
    country: "International",
    year: null
  },
  {
    category: "KOL来源",
    sourceNameZh: "Fortune - Sam Altman一人独角兽",
    sourceNameEn: "Fortune - Sam Altman One-Person Unicorn",
    descriptionZh: "【概念起源】OpenAI CEO Sam Altman首次公开提出一人独角兽概念的原始报道，引发全球关注。",
    descriptionEn: "[Concept Origin] The original report where OpenAI CEO Sam Altman first publicly proposed the one-person unicorn concept, sparking global attention.",
    publishDate: "2024-02-04",
    sourceType: "KOL-Sam Altman",
    url: "https://fortune.com/2024/02/04/sam-altman-one-person-unicorn-silicon-valley-founder-myth/",
    country: "USA",
    year: 2024
  },
  {
    category: "KOL来源",
    sourceNameZh: "paulgraham.com - 单一创始人风险",
    sourceNameEn: "paulgraham.com - Single Founder Risk",
    descriptionZh: "【反面观点】Y Combinator联合创始人Paul Graham将单一创始人列为创业首要错误，代表传统观点。",
    descriptionEn: "[Contrarian View] Y Combinator co-founder Paul Graham lists single founders as the #1 startup mistake, representing the traditional view.",
    publishDate: "2006",
    sourceType: "KOL-Paul Graham",
    url: "https://paulgraham.com/startupmistakes.html",
    country: "USA",
    year: 2006
  },
  {
    category: "KOL来源",
    sourceNameZh: "LinkedIn - Solopreneur词源",
    sourceNameEn: "LinkedIn - Solopreneur Etymology",
    descriptionZh: "【词源考证】Terri Lonier本人确认其创造了Solopreneur一词的原始帖子。",
    descriptionEn: "[Etymology] Terri Lonier's original post confirming she coined the term 'Solopreneur'.",
    publishDate: null,
    sourceType: "KOL-Terri Lonier",
    url: "https://www.linkedin.com/posts/terrilonier_ever-wonder-where-the-word-solopreneur-activity-7074392656163864576-DY5W",
    country: "USA",
    year: null
  },
  {
    category: "KOL来源",
    sourceNameZh: "Biblio - Working Solo",
    sourceNameEn: "Biblio - Working Solo",
    descriptionZh: "【概念诞生】Terri Lonier 1993年著作《Working Solo》，首次提出Solopreneur概念的原始出处。",
    descriptionEn: "[Concept Birth] Terri Lonier's 1993 book 'Working Solo', the original source where the Solopreneur concept was first introduced.",
    publishDate: "1993",
    sourceType: "KOL-Terri Lonier",
    url: "https://www.biblio.com/book/working-solo-real-guide-freedom-financial/d/36384536",
    country: "USA",
    year: 1993
  },
  {
    category: "中国地方政策",
    sourceNameZh: "深圳 - OPC创业生态引领地行动计划（科技日报）",
    sourceNameEn: "Shenzhen - OPC Entrepreneurship Ecosystem Action Plan (Science Daily)",
    descriptionZh: "【深圳战略】深圳市打造全国AI OPC创业首选地的战略规划，目标培育千家高成长企业。",
    descriptionEn: "[Shenzhen Strategy] Shenzhen's strategic plan to become the national destination for AI OPC entrepreneurship, targeting cultivation of thousands of high-growth enterprises.",
    publishDate: "2026-01-15",
    sourceType: "深圳市工信局",
    url: "https://www.stdaily.com/web/gdxw/2026-01/15/content_462134.html",
    country: "China",
    year: 2026
  },
  {
    category: "中国地方政策",
    sourceNameZh: "深圳 - OPC创业生态引领地行动计划（21经济）",
    sourceNameEn: "Shenzhen - OPC Entrepreneurship Ecosystem Action Plan (21st Century)",
    descriptionZh: "【政策细节】深圳OPC政策的财经视角解读，包括百亿基金、人才政策等具体措施。",
    descriptionEn: "[Policy Details] Financial perspective interpretation of Shenzhen's OPC policy, including specific measures such as 10-billion fund and talent policies.",
    publishDate: "2026-01-15",
    sourceType: "深圳市工信局",
    url: "https://www.21jingji.com/article/20260115/herald/8e037900cfdfa07385de19beea15fc49.html",
    country: "China",
    year: 2026
  },
  {
    category: "中国地方政策",
    sourceNameZh: "江苏 - 人工智能+行动方案",
    sourceNameEn: "Jiangsu - AI+ Action Plan",
    descriptionZh: "【省级布局】江苏省将AI OPC纳入省级人工智能战略，代表省级政府对一人公司的认可。",
    descriptionEn: "[Provincial Layout] Jiangsu Province incorporates AI OPC into provincial AI strategy, representing provincial government recognition of one-person companies.",
    publishDate: "2026-01-13",
    sourceType: "江苏省政府",
    url: "https://www.xhby.net/content/s69685811e4b0e65d832f2d91.html",
    country: "China",
    year: 2026
  },
  {
    category: "中国地方政策",
    sourceNameZh: "上海 - 超级个体288计划",
    sourceNameEn: "Shanghai - Super Individual 288 Plan",
    descriptionZh: "【上海模式】上海临港超级个体288计划，为OPC提供免费办公住宿和全方位扶持。",
    descriptionEn: "[Shanghai Model] Shanghai Lingang Super Individual 288 Plan, providing OPCs with free office space, accommodation, and comprehensive support.",
    publishDate: "2025-08",
    sourceType: "上海临港新片区",
    url: "https://www.shobserver.com/news/detail?id=1040358",
    country: "China",
    year: 2025
  },
  {
    category: "中国地方政策",
    sourceNameZh: "苏州 - OPC创业新范式",
    sourceNameEn: "Suzhou - OPC New Entrepreneurship Paradigm",
    descriptionZh: "【首次提出】2025江苏人工智能创新发展大会首次系统性提出OPC创业新范式。",
    descriptionEn: "[First Proposal] The 2025 Jiangsu AI Innovation Development Conference first systematically proposed the OPC new entrepreneurship paradigm.",
    publishDate: "2025-11-11",
    sourceType: "江苏省政府",
    url: "https://www.shobserver.com/news/detail?id=1040358",
    country: "China",
    year: 2025
  }
];

async function seedMilestones() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    // Clear existing milestones
    await connection.execute('DELETE FROM milestones');
    console.log('Cleared existing milestones');
    
    // Insert new milestones
    for (let i = 0; i < milestones.length; i++) {
      const m = milestones[i];
      await connection.execute(
        `INSERT INTO milestones (category, sourceNameEn, sourceNameZh, descriptionEn, descriptionZh, publishDate, sourceType, url, country, year, displayOrder, isVisible) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'visible')`,
        [
          m.category,
          m.sourceNameEn,
          m.sourceNameZh,
          m.descriptionEn,
          m.descriptionZh,
          m.publishDate,
          m.sourceType,
          m.url,
          m.country,
          m.year,
          i + 1
        ]
      );
      console.log(`Inserted milestone ${i + 1}: ${m.sourceNameEn}`);
    }
    
    console.log(`\nSuccessfully inserted ${milestones.length} milestones!`);
  } catch (error) {
    console.error('Error seeding milestones:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

seedMilestones();
