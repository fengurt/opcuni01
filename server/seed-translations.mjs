/**
 * Seed script to populate default translations in the database
 * Run with: node server/seed-translations.mjs
 */

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const defaultTranslations = [
  // Navigation
  { key: 'nav.mission', category: 'navigation', en: 'Mission', zh: '使命', fr: 'Mission', ja: 'ミッション' },
  { key: 'nav.certification', category: 'navigation', en: 'Certification', zh: '认证体系', fr: 'Certification', ja: '認定' },
  { key: 'nav.arsenal', category: 'navigation', en: 'Arsenal', zh: '数字军火库', fr: 'Arsenal', ja: 'アーセナル' },
  { key: 'nav.experts', category: 'navigation', en: 'Experts', zh: '专家团', fr: 'Experts', ja: '専門家' },
  { key: 'nav.dashboard', category: 'navigation', en: 'Dashboard', zh: '控制台', fr: 'Tableau de bord', ja: 'ダッシュボード' },
  { key: 'nav.login', category: 'navigation', en: 'Login', zh: '登录', fr: 'Connexion', ja: 'ログイン' },
  { key: 'nav.logout', category: 'navigation', en: 'Logout', zh: '退出登录', fr: 'Déconnexion', ja: 'ログアウト' },
  
  // Hero Section
  { key: 'hero.badge', category: 'hero', en: 'Official UN-Style Standard for AI Era', zh: 'AI时代的联合国标准', fr: "Norme officielle de style ONU pour l'ère de l'IA", ja: 'AI時代の国連スタイル公式基準' },
  { key: 'hero.title', category: 'hero', en: 'Masters of AI Inherit the World', zh: '善用 AI 者得天下', fr: "Les Maîtres de l'IA Héritent du Monde", ja: 'AIを制する者が世界を制す' },
  { key: 'hero.subtitle', category: 'hero', en: 'The global accelerator for One-Person Companies (OPC). Implement the 0.5/3/2 Efficiency Paradigm and give your solo business world-class competitiveness.', zh: '全球 OPC 个体商业闭环构建加速器。践行"0.5/3/2"效能范式，让只有一人的公司，也能拥有世界级的竞争力。', fr: "L'accélérateur mondial pour les entreprises unipersonnelles (OPC). Mettez en œuvre le paradigme d'efficacité 0.5/3/2 et donnez à votre entreprise solo une compétitivité de classe mondiale.", ja: '一人会社（OPC）のためのグローバルアクセラレーター。0.5/3/2効率パラダイムを実践し、ソロビジネスに世界クラスの競争力を。' },
  { key: 'hero.partners', category: 'hero', en: 'Trusted by Global Partners', zh: '全球合作伙伴信任背书', fr: 'Approuvé par des partenaires mondiaux', ja: 'グローバルパートナーからの信頼' },
  
  // CTAs
  { key: 'cta.join', category: 'cta', en: 'Join the Alliance', zh: '加入联盟', fr: "Rejoindre l'Alliance", ja: 'アライアンスに参加' },
  { key: 'cta.read', category: 'cta', en: 'Read Blueprint', zh: '阅读蓝皮书', fr: 'Lire le Plan', ja: 'ブループリントを読む' },
  { key: 'cta.apply', category: 'cta', en: 'Apply Now', zh: '立即申请', fr: 'Postuler maintenant', ja: '今すぐ申請' },
  { key: 'cta.submit', category: 'cta', en: 'Submit', zh: '提交', fr: 'Soumettre', ja: '送信' },
  { key: 'cta.cancel', category: 'cta', en: 'Cancel', zh: '取消', fr: 'Annuler', ja: 'キャンセル' },
  
  // Value Proposition
  { key: 'value.time', category: 'value', en: 'Time Arbitrage', zh: '时间套利', fr: 'Arbitrage temporel', ja: '時間裁定' },
  { key: 'value.time.desc', category: 'value', en: 'Master AI to cut execution time by half, reinvesting the surplus into strategy.', zh: '掌握AI将执行时间减半，将节省的时间投入战略思考。', fr: "Maîtrisez l'IA pour réduire de moitié le temps d'exécution, réinvestissant le surplus dans la stratégie.", ja: 'AIをマスターして実行時間を半分に削減し、余剰を戦略に再投資。' },
  { key: 'value.output', category: 'value', en: 'Output Multiplier', zh: '产出乘数', fr: 'Multiplicateur de production', ja: 'アウトプット乗数' },
  { key: 'value.output.desc', category: 'value', en: 'Leverage agents to triple your creative and operational output quality.', zh: '利用AI代理将创意和运营产出质量提升三倍。', fr: 'Tirez parti des agents pour tripler la qualité de votre production créative et opérationnelle.', ja: 'エージェントを活用して、クリエイティブと運用のアウトプット品質を3倍に。' },
  { key: 'value.capture', category: 'value', en: 'Value Capture', zh: '价值捕获', fr: 'Capture de valeur', ja: '価値獲得' },
  { key: 'value.capture.desc', category: 'value', en: 'Double your captured value by owning the entire business loop.', zh: '通过掌控完整商业闭环，将捕获的价值翻倍。', fr: "Doublez votre valeur capturée en possédant l'ensemble de la boucle commerciale.", ja: 'ビジネスループ全体を所有することで、獲得価値を2倍に。' },
  
  // Certification
  { key: 'cert.title', category: 'certification', en: 'The OPC Ascension Ladder', zh: 'OPC 晋升阶梯', fr: "L'Échelle d'Ascension OPC", ja: 'OPC昇進ラダー' },
  { key: 'cert.subtitle', category: 'certification', en: "A rigorous certification standard for the AI era. We don't just teach; we verify capabilities and unlock corresponding ecosystem privileges.", zh: 'AI时代的严格认证标准。我们不仅传授知识，更验证能力并解锁相应的生态权益。', fr: "Une norme de certification rigoureuse pour l'ère de l'IA. Nous ne nous contentons pas d'enseigner ; nous vérifions les capacités et débloquons les privilèges correspondants de l'écosystème.", ja: 'AI時代の厳格な認定基準。私たちは教えるだけでなく、能力を検証し、対応するエコシステム特権を解除します。' },
  { key: 'cert.l1.name', category: 'certification', en: 'The Operator', zh: '操作员', fr: "L'Opérateur", ja: 'オペレーター' },
  { key: 'cert.l1.desc', category: 'certification', en: 'Master AI tools to solve the "Hands" problem.', zh: '掌握AI工具，解决"手"的问题。', fr: 'Maîtriser les outils IA pour résoudre le problème des "Mains".', ja: 'AIツールをマスターして「手」の問題を解決。' },
  { key: 'cert.l2.name', category: 'certification', en: 'The Solopreneur', zh: '超级个体', fr: 'Le Solopreneur', ja: 'ソロプレナー' },
  { key: 'cert.l2.desc', category: 'certification', en: 'Build automated workflows to solve the "Process" problem.', zh: '构建自动化工作流，解决"流程"问题。', fr: 'Construire des flux de travail automatisés pour résoudre le problème du "Processus".', ja: '自動化ワークフローを構築して「プロセス」の問題を解決。' },
  { key: 'cert.l3.name', category: 'certification', en: 'The Titan', zh: '泰坦', fr: 'Le Titan', ja: 'タイタン' },
  { key: 'cert.l3.desc', category: 'certification', en: 'Industry leaders driving the ecosystem forward.', zh: '行业领袖，推动生态向前发展。', fr: "Leaders de l'industrie faisant avancer l'écosystème.", ja: 'エコシステムを前進させる業界リーダー。' },
  { key: 'cert.requirements', category: 'certification', en: 'Requirements', zh: '准入标准', fr: 'Exigences', ja: '要件' },
  { key: 'cert.privileges', category: 'certification', en: 'Privileges', zh: '专属权益', fr: 'Privilèges', ja: '特権' },
  
  // Experts
  { key: 'experts.title', category: 'experts', en: 'The Titan Council', zh: '泰坦理事会', fr: 'Le Conseil des Titans', ja: 'タイタン評議会' },
  { key: 'experts.subtitle', category: 'experts', en: 'Real humans, real reputation. In an age of AI anonymity, we stand on the shoulders of industry giants to build a trusted E-E-A-T ecosystem.', zh: '真人实名，真实声誉。在AI匿名时代，我们站在行业巨人的肩膀上，构建可信赖的E-E-A-T生态系统。', fr: "De vraies personnes, une vraie réputation. À l'ère de l'anonymat de l'IA, nous nous appuyons sur les épaules des géants de l'industrie pour construire un écosystème E-E-A-T de confiance.", ja: '本物の人間、本物の評判。AI匿名時代において、私たちは業界の巨人の肩に立ち、信頼できるE-E-A-Tエコシステムを構築します。' },
  { key: 'experts.viewall', category: 'experts', en: 'View All Experts', zh: '查看所有专家', fr: 'Voir tous les experts', ja: 'すべての専門家を見る' },
  
  // Arsenal
  { key: 'arsenal.title', category: 'arsenal', en: 'The Digital Arsenal', zh: '数字军火库', fr: "L'Arsenal Numérique", ja: 'デジタルアーセナル' },
  { key: 'arsenal.subtitle', category: 'arsenal', en: "We don't just talk theory. We equip you with the battle-tested toolstack used by 7-figure solopreneurs.", zh: '我们不只是纸上谈兵。我们为您配备经过实战检验的工具栈，这是七位数收入超级个体的标配。', fr: "Nous ne parlons pas que de théorie. Nous vous équipons de la pile d'outils éprouvée utilisée par les solopreneurs à sept chiffres.", ja: '理論だけではありません。7桁の収入を得るソロプレナーが使用する実戦テスト済みのツールスタックを装備します。' },
  
  // Dashboard
  { key: 'dashboard.title', category: 'dashboard', en: 'Dashboard', zh: '控制台', fr: 'Tableau de bord', ja: 'ダッシュボード' },
  { key: 'dashboard.applications', category: 'dashboard', en: 'My Applications', zh: '我的申请', fr: 'Mes candidatures', ja: '私の申請' },
  { key: 'dashboard.projects', category: 'dashboard', en: 'Project Progress', zh: '项目进度', fr: 'Progression du projet', ja: 'プロジェクト進捗' },
  { key: 'dashboard.certificates', category: 'dashboard', en: 'My Certificates', zh: '我的证书', fr: 'Mes certificats', ja: '私の証明書' },
  { key: 'dashboard.submit', category: 'dashboard', en: 'Submit Application', zh: '提交申请', fr: 'Soumettre une candidature', ja: '申請を提出' },
  
  // Admin
  { key: 'admin.title', category: 'admin', en: 'Admin Panel', zh: '管理后台', fr: "Panneau d'administration", ja: '管理パネル' },
  { key: 'admin.applications', category: 'admin', en: 'Manage Applications', zh: '申请管理', fr: 'Gérer les candidatures', ja: '申請管理' },
  { key: 'admin.translations', category: 'admin', en: 'Manage Translations', zh: '多语言管理', fr: 'Gérer les traductions', ja: '翻訳管理' },
  { key: 'admin.users', category: 'admin', en: 'Manage Users', zh: '用户管理', fr: 'Gérer les utilisateurs', ja: 'ユーザー管理' },
  
  // Footer
  { key: 'footer.description', category: 'footer', en: 'The "Digital Noah\'s Ark" for the AI era. Empowering individuals to build world-class enterprises through the 0.5/3/2 efficiency paradigm.', zh: 'AI时代的"数字诺亚方舟"。通过0.5/3/2效能范式，赋能个体建立世界级企业。', fr: "L'\"Arche de Noé Numérique\" pour l'ère de l'IA. Permettre aux individus de créer des entreprises de classe mondiale grâce au paradigme d'efficacité 0.5/3/2.", ja: 'AI時代の「デジタルノアの方舟」。0.5/3/2効率パラダイムを通じて、個人が世界クラスの企業を構築できるよう支援。' },
  { key: 'footer.platform', category: 'footer', en: 'Platform', zh: '平台', fr: 'Plateforme', ja: 'プラットフォーム' },
  { key: 'footer.alliance', category: 'footer', en: 'Alliance', zh: '联盟', fr: 'Alliance', ja: 'アライアンス' },
  { key: 'footer.trust', category: 'footer', en: 'Trust & Security', zh: '信任与安全', fr: 'Confiance et Sécurité', ja: '信頼とセキュリティ' },
  { key: 'footer.privacy', category: 'footer', en: 'Privacy Policy', zh: '隐私政策', fr: 'Politique de confidentialité', ja: 'プライバシーポリシー' },
  { key: 'footer.terms', category: 'footer', en: 'Terms of Service', zh: '服务条款', fr: "Conditions d'utilisation", ja: '利用規約' },
  { key: 'footer.cookies', category: 'footer', en: 'Cookie Settings', zh: 'Cookie设置', fr: 'Paramètres des cookies', ja: 'Cookie設定' },
  { key: 'footer.copyright', category: 'footer', en: '© 2026 OPC Global Alliance. All rights reserved.', zh: '© 2026 OPC Global Alliance. 保留所有权利。', fr: '© 2026 OPC Global Alliance. Tous droits réservés.', ja: '© 2026 OPC Global Alliance. 全著作権所有。' },
];

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection);

  console.log("Seeding translations...");
  
  for (const t of defaultTranslations) {
    try {
      await connection.execute(
        `INSERT INTO translations (\`key\`, category, en, zh, fr, ja) 
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
         category = VALUES(category),
         en = VALUES(en),
         zh = VALUES(zh),
         fr = VALUES(fr),
         ja = VALUES(ja)`,
        [t.key, t.category, t.en, t.zh, t.fr, t.ja]
      );
      console.log(`  ✓ ${t.key}`);
    } catch (error) {
      console.error(`  ✗ ${t.key}:`, error.message);
    }
  }

  console.log(`\nSeeded ${defaultTranslations.length} translations.`);
  
  await connection.end();
  process.exit(0);
}

seed().catch(console.error);
