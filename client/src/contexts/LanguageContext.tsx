import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { trpc } from '@/lib/trpc';

type Language = 'en' | 'zh' | 'fr' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Default translations (fallback when backend is unavailable)
const defaultTranslations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.mission': 'Mission',
    'nav.certification': 'Certification',
    'nav.arsenal': 'Arsenal',
    'nav.experts': 'Experts',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.language': 'Language',
    
    // Hero Section
    'hero.badge': 'Master AI, Achieve Freedom',
    'hero.title': 'Masters of AI Inherit the World',
    'hero.subtitle': 'The global accelerator for One-Person Companies (OPC). Implement the 0.5/3/2 Efficiency Paradigm and give your solo business world-class competitiveness.',
    'hero.partners': 'Trusted by Global Partners',
    
    // CTAs
    'cta.join': 'Join the Alliance',
    'cta.read': 'Read Blueprint',
    'cta.apply': 'Apply Now',
    'cta.submit': 'Submit',
    'cta.cancel': 'Cancel',
    'cta.save': 'Save',
    'cta.edit': 'Edit',
    'cta.delete': 'Delete',
    'cta.search': 'Search',
    
    // Value Proposition
    'value.time': 'Time Arbitrage',
    'value.time.desc': 'Master AI to cut execution time by half, reinvesting the surplus into strategy.',
    'value.output': 'Output Multiplier',
    'value.output.desc': 'Leverage agents to triple your creative and operational output quality.',
    'value.capture': 'Value Capture',
    'value.capture.desc': 'Double your captured value by owning the entire business loop.',
    
    // Certification
    'cert.title': 'The OPC Ascension Ladder',
    'cert.subtitle': 'A rigorous certification standard for the AI era. We verify capabilities and unlock corresponding ecosystem privileges.',
    'cert.l1.name': 'AI Coach',
    'cert.l1.desc': 'Master AI tools and coach others to unlock independent productivity.',
    'cert.l2.name': 'The Solopreneur',
    'cert.l2.desc': 'Build automated workflows to solve the "Process" problem.',
    'cert.l3.name': 'The Titan',
    'cert.l3.desc': 'Industry leaders driving the ecosystem forward.',
    'cert.requirements': 'Requirements',
    'cert.privileges': 'Privileges',
    'cert.popular': 'Popular',
    'cert.l1.req1': 'ChatGPT / Claude / Midjourney',
    'cert.l1.req2': 'Basic AI Task Completion',
    'cert.l1.req3': 'Online Assessment',
    'cert.l1.priv1': 'Micro-task Access',
    'cert.l1.priv2': 'Community Membership',
    'cert.l1.priv3': 'Learning Resources',
    'cert.l2.req1': '$5M+ Annual Revenue',
    'cert.l2.req2': 'Workflow Automation',
    'cert.l2.req3': 'Portfolio Review',
    'cert.l2.priv1': 'Enterprise Projects',
    'cert.l2.priv2': 'Verified Badge',
    'cert.l2.priv3': 'SaaS Support',
    'cert.l3.req1': '$50M+ Annual Revenue',
    'cert.l3.req2': 'Team ≤ 50 People',
    'cert.l3.req3': 'Invitation Only',
    'cert.l3.priv1': 'Ecosystem Dividends',
    'cert.l3.priv2': 'IP Licensing',
    'cert.l3.priv3': 'Global Resources',
    
    // Experts
    'experts.title': 'OPC Facilitators',
    'experts.subtitle': 'Professional coaches and advisors providing specialized support for OPC entrepreneurs worldwide.',
    'experts.viewall': 'View All Facilitators',
    
    // Arsenal
    'arsenal.title': 'The Digital Arsenal',
    'arsenal.subtitle': 'Battle-tested toolstack used by 7-figure solopreneurs.',
    'arsenal.brain.name': 'The Brain',
    'arsenal.brain.desc': 'AI Thinking Partners',
    'arsenal.builder.name': 'The Builder',
    'arsenal.builder.desc': 'Development Tools',
    'arsenal.creative.name': 'The Creative',
    'arsenal.creative.desc': 'Design & Content',
    'arsenal.system.name': 'The System',
    'arsenal.system.desc': 'Automation & Ops',
    
    // Partners
    'partners.title': 'Ecosystem Partners',
    'partners.subtitle': 'Coaches, brands, and organizations working together to empower OPC entrepreneurs worldwide.',
    'partners.coaches': 'Coaches',
    'partners.brands': 'Brands',
    'partners.organizations': 'Organizations',
    'partners.noPartners': 'Partners coming soon.',
    'partners.becomePartner': 'Become a Partner',
    
    // Partner Application
    'partnerApply.title': 'Become a Partner',
    'partnerApply.subtitle': 'Join our ecosystem and help empower OPC entrepreneurs worldwide.',
    'partnerApply.contactInfo': 'Contact Information',
    'partnerApply.contactName': 'Contact Name',
    'partnerApply.contactNamePlaceholder': 'Your full name',
    'partnerApply.contactEmail': 'Email Address',
    'partnerApply.contactEmailPlaceholder': 'your@email.com',
    'partnerApply.contactPhone': 'Phone Number',
    'partnerApply.contactPhonePlaceholder': '+1 234 567 8900',
    'partnerApply.orgInfo': 'Organization Information',
    'partnerApply.orgName': 'Organization Name',
    'partnerApply.orgNamePlaceholder': 'Your organization or brand name',
    'partnerApply.orgType': 'Organization Type',
    'partnerApply.selectType': 'Select type...',
    'partnerApply.website': 'Website',
    'partnerApply.description': 'Description',
    'partnerApply.descriptionPlaceholder': 'Tell us about your organization and how you would like to collaborate...',
    'partnerApply.submitting': 'Submitting...',
    'partnerApply.success': 'Application submitted successfully!',
    'partnerApply.error': 'Failed to submit application. Please try again.',
    'partnerApply.requiredFields': 'Please fill in all required fields.',
    'partnerApply.thankYou': 'Thank You!',
    'partnerApply.successMessage': 'Your partner application has been received. We will review it and contact you soon.',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome',
    'dashboard.back': 'Back',
    'dashboard.applications': 'My Applications',
    'dashboard.projects': 'Project Progress',
    'dashboard.certificates': 'My Certificates',
    'dashboard.submit': 'Submit Application',
    'dashboard.noApps': 'No Applications Yet',
    'dashboard.noAppsDesc': 'Start your journey by submitting your first application.',
    'dashboard.noProjects': 'No Active Projects',
    'dashboard.noProjectsDesc': 'Projects will appear here once your application is approved.',
    'dashboard.noCerts': 'No Certificates Yet',
    'dashboard.noCertsDesc': 'Complete your certification journey to earn your first certificate.',
    'dashboard.milestones': 'Milestones',
    'dashboard.certNumber': 'Certificate #',
    'dashboard.issued': 'Issued',
    'dashboard.expires': 'Expires',
    'dashboard.status': 'Status',
    'dashboard.submitted': 'Submitted',
    'dashboard.noIndustry': 'No industry specified',
    'dashboard.noDescription': 'No description provided.',
    'dashboard.accessDenied': 'Access Denied',
    'dashboard.pleaseLogin': 'Please log in to access the dashboard.',
    'dashboard.returnHome': 'Return to Home',
    
    // Dashboard Application Form
    'dashboard.app.title': 'Submit Application',
    'dashboard.app.desc': 'Apply to join the OPC Global Alliance and start your certification journey.',
    'dashboard.app.companyName': 'Company / Project Name',
    'dashboard.app.companyPlaceholder': 'Your company or project name',
    'dashboard.app.industry': 'Industry',
    'dashboard.app.industryPlaceholder': 'e.g., Technology, Education, Finance',
    'dashboard.app.certLevel': 'Certification Level',
    'dashboard.app.description': 'Description',
    'dashboard.app.descPlaceholder': 'Tell us about your business and why you want to join...',
    'dashboard.app.success': 'Application submitted successfully!',
    'dashboard.app.nameRequired': 'Company name is required',
    
    // Status
    'status.pending': 'Pending',
    'status.reviewing': 'Reviewing',
    'status.approved': 'Approved',
    'status.rejected': 'Rejected',
    'status.active': 'Active',
    'status.expired': 'Expired',
    
    // Admin
    'admin.title': 'Admin Panel',
    'admin.applications': 'Manage Applications',
    'admin.translations': 'Manage Translations',
    'admin.users': 'Manage Users',
    'admin.noApps': 'No applications found',
    'admin.updateStatus': 'Update Status',
    'admin.filterByStatus': 'Filter by status',
    'admin.allStatuses': 'All Statuses',
    'admin.translationKey': 'Translation Key',
    'admin.english': 'English',
    'admin.chinese': 'Chinese',
    'admin.french': 'French',
    'admin.japanese': 'Japanese',
    'admin.noTranslations': 'No translations found',
    'admin.accessDenied': 'Access Denied',
    'admin.adminOnly': 'This page is only accessible to administrators.',
    'admin.experts': 'Manage Coaches',
    'admin.visibility': 'Visibility',
    'admin.visible': 'Visible',
    'admin.hidden': 'Hidden',
    'admin.noExperts': 'No coaches',
    'admin.partners': 'Partner Management',
    'admin.partnerApplications': 'Partner Applications',
    'admin.noPartners': 'No partners yet',
    'admin.noPartnerApps': 'No partner applications yet',
    'admin.editPartnerJson': 'Edit Partner (JSON)',
    'admin.editPartnerJsonDesc': 'Edit partner information using JSON format for quick updates.',
    
    // Footer
    'footer.description': 'Master AI, Achieve Freedom',
    'footer.platform': 'Platform',
    'footer.alliance': 'Alliance',
    'footer.trust': 'Trust & Security',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Settings',
    'footer.copyright': '© 2026 OPC Global Alliance. All rights reserved.',
    'footer.followUs': 'Follow Us',
    'footer.wechat': 'WeChat Official Account',
    'footer.xiaohongshu': 'Xiaohongshu (RED)',
    'footer.email': 'Contact Email',
  },
  zh: {
    // 导航
    'nav.mission': '使命',
    'nav.certification': '认证体系',
    'nav.arsenal': '数字军火库',
    'nav.experts': '专家团',
    'nav.dashboard': '控制台',
    'nav.login': '登录',
    'nav.logout': '退出登录',
    'nav.language': '语言',
    
    // 首屏
    'hero.badge': '善用AI，终获自由',
    'hero.title': '善用 AI 者得天下',
    'hero.subtitle': '全球 OPC 个体商业闭环构建加速器。践行"0.5/3/2"效能范式，让只有一人的公司，也能拥有世界级的竞争力。',
    'hero.partners': '全球合作伙伴信任背书',
    
    // 行动按钮
    'cta.join': '加入联盟',
    'cta.read': '阅读蓝皮书',
    'cta.apply': '立即申请',
    'cta.submit': '提交',
    'cta.cancel': '取消',
    'cta.save': '保存',
    'cta.edit': '编辑',
    'cta.delete': '删除',
    'cta.search': '搜索',
    
    // 价值主张
    'value.time': '时间套利',
    'value.time.desc': '掌握AI将执行时间减半，将节省的时间投入战略思考。',
    'value.output': '产出乘数',
    'value.output.desc': '利用AI代理将创意和运营产出质量提升三倍。',
    'value.capture': '价值捕获',
    'value.capture.desc': '通过掌控完整商业闭环，将捕获的价值翻倍。',
    
    // 认证体系
    'cert.title': 'OPC 晋升阶梯',
    'cert.subtitle': 'AI时代的严格认证标准。我们验证能力并解锁相应的生态权益。',
    'cert.l1.name': '智能教练',
    'cert.l1.desc': '掌握AI工具，教练他人解锁独立产能。',
    'cert.l2.name': '超级个体',
    'cert.l2.desc': '构建自动化工作流，解决"流程"问题。',
    'cert.l3.name': '泰坦',
    'cert.l3.desc': '行业领袖，推动生态向前发展。',
    'cert.requirements': '准入标准',
    'cert.privileges': '专属权益',
    'cert.popular': '热门',
    'cert.l1.req1': 'ChatGPT / Claude / Midjourney',
    'cert.l1.req2': '基础AI任务完成',
    'cert.l1.req3': '在线评估',
    'cert.l1.priv1': '微任务访问权',
    'cert.l1.priv2': '社区会员资格',
    'cert.l1.priv3': '学习资源',
    'cert.l2.req1': '年收入500万+',
    'cert.l2.req2': '工作流自动化',
    'cert.l2.req3': '作品集审核',
    'cert.l2.priv1': '企业级项目',
    'cert.l2.priv2': '认证徽章',
    'cert.l2.priv3': 'SaaS支持',
    'cert.l3.req1': '年收入5000万+',
    'cert.l3.req2': '团队≤50人',
    'cert.l3.req3': '仅限邀请',
    'cert.l3.priv1': '生态分红',
    'cert.l3.priv2': 'IP授权',
    'cert.l3.priv3': '全球资源',
    
    // 专家团
    'experts.title': '教练顾问团',
    'experts.subtitle': '专业教练与顾问团队，为全球OPC创业者提供专业支持。',
    'experts.viewall': '查看所有教练',
    
    // 军火库
    'arsenal.title': '数字军火库',
    'arsenal.subtitle': '经过实战检验的工具栈，七位数收入超级个体的标配。',
    'arsenal.brain.name': '大脑',
    'arsenal.brain.desc': 'AI思维伙伴',
    'arsenal.builder.name': '建造者',
    'arsenal.builder.desc': '开发工具',
    'arsenal.creative.name': '创意者',
    'arsenal.creative.desc': '设计与内容',
    'arsenal.system.name': '系统',
    'arsenal.system.desc': '自动化与运维',
    
    // 生态伙伴
    'partners.title': '生态伙伴',
    'partners.subtitle': '教练、品牌和组织携手合作，赋能全球OPC创业者。',
    'partners.coaches': '教练',
    'partners.brands': '品牌',
    'partners.organizations': '组织',
    'partners.noPartners': '合作伙伴即将上线。',
    'partners.becomePartner': '成为合作伙伴',
    
    // 合作伙伴申请
    'partnerApply.title': '成为合作伙伴',
    'partnerApply.subtitle': '加入我们的生态系统，共同赋能全球OPC创业者。',
    'partnerApply.contactInfo': '联系信息',
    'partnerApply.contactName': '联系人姓名',
    'partnerApply.contactNamePlaceholder': '您的全名',
    'partnerApply.contactEmail': '电子邮箱',
    'partnerApply.contactEmailPlaceholder': 'your@email.com',
    'partnerApply.contactPhone': '电话号码',
    'partnerApply.contactPhonePlaceholder': '+86 138 0000 0000',
    'partnerApply.orgInfo': '组织信息',
    'partnerApply.orgName': '组织名称',
    'partnerApply.orgNamePlaceholder': '您的组织或品牌名称',
    'partnerApply.orgType': '组织类型',
    'partnerApply.selectType': '选择类型...',
    'partnerApply.website': '网站',
    'partnerApply.description': '描述',
    'partnerApply.descriptionPlaceholder': '介绍您的组织以及希望如何合作...',
    'partnerApply.submitting': '提交中...',
    'partnerApply.success': '申请提交成功！',
    'partnerApply.error': '提交申请失败，请重试。',
    'partnerApply.requiredFields': '请填写所有必填项。',
    'partnerApply.thankYou': '感谢您！',
    'partnerApply.successMessage': '您的合作伙伴申请已收到。我们将尽快审核并与您联系。',
    
    // 控制台
    'dashboard.title': '控制台',
    'dashboard.welcome': '欢迎',
    'dashboard.back': '返回',
    'dashboard.applications': '我的申请',
    'dashboard.projects': '项目进度',
    'dashboard.certificates': '我的证书',
    'dashboard.submit': '提交申请',
    'dashboard.noApps': '暂无申请',
    'dashboard.noAppsDesc': '提交您的第一份申请，开启您的旅程。',
    'dashboard.noProjects': '暂无进行中的项目',
    'dashboard.noProjectsDesc': '申请通过后，项目将显示在这里。',
    'dashboard.noCerts': '暂无证书',
    'dashboard.noCertsDesc': '完成认证旅程，获得您的第一张证书。',
    'dashboard.milestones': '里程碑',
    'dashboard.certNumber': '证书编号',
    'dashboard.issued': '签发日期',
    'dashboard.expires': '到期日期',
    'dashboard.status': '状态',
    'dashboard.submitted': '提交时间',
    'dashboard.noIndustry': '未指定行业',
    'dashboard.noDescription': '未提供描述。',
    'dashboard.accessDenied': '访问被拒绝',
    'dashboard.pleaseLogin': '请登录以访问控制台。',
    'dashboard.returnHome': '返回首页',
    
    // 申请表单
    'dashboard.app.title': '提交申请',
    'dashboard.app.desc': '申请加入OPC全球联盟，开启您的认证之旅。',
    'dashboard.app.companyName': '公司/项目名称',
    'dashboard.app.companyPlaceholder': '您的公司或项目名称',
    'dashboard.app.industry': '行业',
    'dashboard.app.industryPlaceholder': '例如：科技、教育、金融',
    'dashboard.app.certLevel': '认证级别',
    'dashboard.app.description': '描述',
    'dashboard.app.descPlaceholder': '介绍您的业务以及加入的原因...',
    'dashboard.app.success': '申请提交成功！',
    'dashboard.app.nameRequired': '公司名称为必填项',
    
    // 状态
    'status.pending': '待审核',
    'status.reviewing': '审核中',
    'status.approved': '已通过',
    'status.rejected': '已拒绝',
    'status.active': '有效',
    'status.expired': '已过期',
    
    // 管理后台
    'admin.title': '管理后台',
    'admin.applications': '申请管理',
    'admin.translations': '多语言管理',
    'admin.users': '用户管理',
    'admin.noApps': '未找到申请',
    'admin.updateStatus': '更新状态',
    'admin.filterByStatus': '按状态筛选',
    'admin.allStatuses': '所有状态',
    'admin.translationKey': '翻译键',
    'admin.english': '英语',
    'admin.chinese': '中文',
    'admin.french': '法语',
    'admin.japanese': '日语',
    'admin.noTranslations': '未找到翻译',
    'admin.accessDenied': '访问被拒绝',
    'admin.adminOnly': '此页面仅限管理员访问。',
    'admin.experts': '顾问管理',
    'admin.visibility': '可见性',
    'admin.visible': '显示',
    'admin.hidden': '隐藏',
    'admin.noExperts': '暂无顾问',
    'admin.partners': '合作伙伴管理',
    'admin.partnerApplications': '合作申请',
    'admin.noPartners': '暂无合作伙伴',
    'admin.noPartnerApps': '暂无合作申请',
    'admin.editPartnerJson': '编辑合作伙伴 (JSON)',
    'admin.editPartnerJsonDesc': '使用JSON格式快速编辑合作伙伴信息。',
    
    // 页脚
    'footer.description': '善用AI，终获自由',
    'footer.platform': '平台',
    'footer.alliance': '联盟',
    'footer.trust': '信任与安全',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
    'footer.cookies': 'Cookie设置',
    'footer.copyright': '© 2026 OPC Global Alliance. 保留所有权利。',
    'footer.followUs': '关注我们',
    'footer.wechat': '微信公众号',
    'footer.xiaohongshu': '小红书',
    'footer.email': '联系邮箱',
  },
  fr: {
    // Navigation
    'nav.mission': 'Mission',
    'nav.certification': 'Certification',
    'nav.arsenal': 'Arsenal',
    'nav.experts': 'Experts',
    'nav.dashboard': 'Tableau de bord',
    'nav.login': 'Connexion',
    'nav.logout': 'Déconnexion',
    'nav.language': 'Langue',
    
    // Section Héros
    'hero.badge': 'Ma\u00eetriser l\'IA, Atteindre la Libert\u00e9',
    'hero.title': 'Les Maîtres de l\'IA Héritent du Monde',
    'hero.subtitle': 'L\'accélérateur mondial pour les entreprises unipersonnelles. Mettez en œuvre le paradigme d\'efficacité 0.5/3/2.',
    'hero.partners': 'Approuvé par des partenaires mondiaux',
    
    // CTAs
    'cta.join': 'Rejoindre l\'Alliance',
    'cta.read': 'Lire le Plan',
    'cta.apply': 'Postuler maintenant',
    'cta.submit': 'Soumettre',
    'cta.cancel': 'Annuler',
    'cta.save': 'Enregistrer',
    'cta.edit': 'Modifier',
    'cta.delete': 'Supprimer',
    'cta.search': 'Rechercher',
    
    // Proposition de valeur
    'value.time': 'Arbitrage temporel',
    'value.time.desc': 'Maîtrisez l\'IA pour réduire de moitié le temps d\'exécution.',
    'value.output': 'Multiplicateur de production',
    'value.output.desc': 'Tirez parti des agents pour tripler la qualité de votre production.',
    'value.capture': 'Capture de valeur',
    'value.capture.desc': 'Doublez votre valeur capturée en possédant la boucle commerciale.',
    
    // Certification
    'cert.title': 'L\'Échelle d\'Ascension OPC',
    'cert.subtitle': 'Une norme de certification rigoureuse pour l\'ère de l\'IA. Nous vérifions les capacités et débloquons les privilèges.',
    'cert.l1.name': 'Coach IA',
    'cert.l1.desc': 'Maîtriser les outils IA et coacher les autres pour une productivité indépendante.',
    'cert.l2.name': 'Le Solopreneur',
    'cert.l2.desc': 'Construire des flux de travail automatisés.',
    'cert.l3.name': 'Le Titan',
    'cert.l3.desc': 'Leaders de l\'industrie faisant avancer l\'écosystème.',
    'cert.requirements': 'Exigences',
    'cert.privileges': 'Privilèges',
    'cert.popular': 'Populaire',
    'cert.l1.req1': 'ChatGPT / Claude / Midjourney',
    'cert.l1.req2': 'Complétion de tâches IA de base',
    'cert.l1.req3': 'Évaluation en ligne',
    'cert.l1.priv1': 'Accès aux micro-tâches',
    'cert.l1.priv2': 'Adhésion à la communauté',
    'cert.l1.priv3': 'Ressources d\'apprentissage',
    'cert.l2.req1': 'Revenu annuel 5M$+',
    'cert.l2.req2': 'Automatisation des flux',
    'cert.l2.req3': 'Revue du portfolio',
    'cert.l2.priv1': 'Projets d\'entreprise',
    'cert.l2.priv2': 'Badge vérifié',
    'cert.l2.priv3': 'Support SaaS',
    'cert.l3.req1': 'Revenu annuel 50M$+',
    'cert.l3.req2': 'Équipe ≤ 50 personnes',
    'cert.l3.req3': 'Sur invitation uniquement',
    'cert.l3.priv1': 'Dividendes de l\'écosystème',
    'cert.l3.priv2': 'Licences IP',
    'cert.l3.priv3': 'Ressources mondiales',
    
    // Experts
    'experts.title': 'Facilitateurs OPC',
    'experts.subtitle': 'Coachs et conseillers professionnels offrant un soutien spécialisé aux entrepreneurs OPC du monde entier.',
    'experts.viewall': 'Voir tous les facilitateurs',
    
    // Arsenal
    'arsenal.title': 'L\'Arsenal Numérique',
    'arsenal.subtitle': 'Pile d\'outils éprouvée utilisée par les solopreneurs à sept chiffres.',
    'arsenal.brain.name': 'Le Cerveau',
    'arsenal.brain.desc': 'Partenaires de réflexion IA',
    'arsenal.builder.name': 'Le Constructeur',
    'arsenal.builder.desc': 'Outils de développement',
    'arsenal.creative.name': 'Le Créatif',
    'arsenal.creative.desc': 'Design et contenu',
    'arsenal.system.name': 'Le Système',
    'arsenal.system.desc': 'Automatisation et ops',
    
    // Partenaires
    'partners.title': 'Partenaires de l\'Ecosystème',
    'partners.subtitle': 'Coachs, marques et organisations travaillant ensemble pour autonomiser les entrepreneurs OPC dans le monde entier.',
    'partners.coaches': 'Coachs',
    'partners.brands': 'Marques',
    'partners.organizations': 'Organisations',
    'partners.noPartners': 'Partenaires à venir.',
    'partners.becomePartner': 'Devenir partenaire',
    
    // Candidature partenaire
    'partnerApply.title': 'Devenir partenaire',
    'partnerApply.subtitle': 'Rejoignez notre écosystème et aidez à autonomiser les entrepreneurs OPC dans le monde entier.',
    'partnerApply.contactInfo': 'Informations de contact',
    'partnerApply.contactName': 'Nom du contact',
    'partnerApply.contactNamePlaceholder': 'Votre nom complet',
    'partnerApply.contactEmail': 'Adresse e-mail',
    'partnerApply.contactEmailPlaceholder': 'votre@email.com',
    'partnerApply.contactPhone': 'Numéro de téléphone',
    'partnerApply.contactPhonePlaceholder': '+33 1 23 45 67 89',
    'partnerApply.orgInfo': 'Informations sur l\'organisation',
    'partnerApply.orgName': 'Nom de l\'organisation',
    'partnerApply.orgNamePlaceholder': 'Nom de votre organisation ou marque',
    'partnerApply.orgType': 'Type d\'organisation',
    'partnerApply.selectType': 'Sélectionner le type...',
    'partnerApply.website': 'Site web',
    'partnerApply.description': 'Description',
    'partnerApply.descriptionPlaceholder': 'Parlez-nous de votre organisation et comment vous souhaitez collaborer...',
    'partnerApply.submitting': 'Envoi en cours...',
    'partnerApply.success': 'Candidature soumise avec succès !',
    'partnerApply.error': 'Échec de la soumission. Veuillez réessayer.',
    'partnerApply.requiredFields': 'Veuillez remplir tous les champs obligatoires.',
    'partnerApply.thankYou': 'Merci !',
    'partnerApply.successMessage': 'Votre candidature de partenaire a été reçue. Nous l\'examinerons et vous contacterons bientôt.',
    
    // Tableau de bord
    'dashboard.title': 'Tableau de bord',
    'dashboard.welcome': 'Bienvenue',
    'dashboard.back': 'Retour',
    'dashboard.applications': 'Mes candidatures',
    'dashboard.projects': 'Progression du projet',
    'dashboard.certificates': 'Mes certificats',
    'dashboard.submit': 'Soumettre une candidature',
    'dashboard.noApps': 'Aucune candidature',
    'dashboard.noAppsDesc': 'Commencez votre parcours en soumettant votre première candidature.',
    'dashboard.noProjects': 'Aucun projet actif',
    'dashboard.noProjectsDesc': 'Les projets apparaîtront ici une fois votre candidature approuvée.',
    'dashboard.noCerts': 'Aucun certificat',
    'dashboard.noCertsDesc': 'Terminez votre parcours de certification pour obtenir votre premier certificat.',
    'dashboard.milestones': 'Jalons',
    'dashboard.certNumber': 'Certificat #',
    'dashboard.issued': 'Émis',
    'dashboard.expires': 'Expire',
    'dashboard.status': 'Statut',
    'dashboard.submitted': 'Soumis',
    'dashboard.noIndustry': 'Aucune industrie spécifiée',
    'dashboard.noDescription': 'Aucune description fournie.',
    'dashboard.accessDenied': 'Accès refusé',
    'dashboard.pleaseLogin': 'Veuillez vous connecter pour accéder au tableau de bord.',
    'dashboard.returnHome': 'Retour à l\'accueil',
    
    // Formulaire de candidature
    'dashboard.app.title': 'Soumettre une candidature',
    'dashboard.app.desc': 'Postulez pour rejoindre l\'Alliance OPC Global.',
    'dashboard.app.companyName': 'Nom de l\'entreprise / projet',
    'dashboard.app.companyPlaceholder': 'Votre nom d\'entreprise ou de projet',
    'dashboard.app.industry': 'Industrie',
    'dashboard.app.industryPlaceholder': 'ex: Technologie, Éducation, Finance',
    'dashboard.app.certLevel': 'Niveau de certification',
    'dashboard.app.description': 'Description',
    'dashboard.app.descPlaceholder': 'Parlez-nous de votre entreprise...',
    'dashboard.app.success': 'Candidature soumise avec succès !',
    'dashboard.app.nameRequired': 'Le nom de l\'entreprise est requis',
    
    // Statut
    'status.pending': 'En attente',
    'status.reviewing': 'En cours d\'examen',
    'status.approved': 'Approuvé',
    'status.rejected': 'Rejeté',
    'status.active': 'Actif',
    'status.expired': 'Expiré',
    
    // Admin
    'admin.title': 'Panneau d\'administration',
    'admin.applications': 'Gérer les candidatures',
    'admin.translations': 'Gérer les traductions',
    'admin.users': 'Gérer les utilisateurs',
    'admin.noApps': 'Aucune candidature trouvée',
    'admin.updateStatus': 'Mettre à jour le statut',
    'admin.filterByStatus': 'Filtrer par statut',
    'admin.allStatuses': 'Tous les statuts',
    'admin.translationKey': 'Clé de traduction',
    'admin.english': 'Anglais',
    'admin.chinese': 'Chinois',
    'admin.french': 'Français',
    'admin.japanese': 'Japonais',
    'admin.noTranslations': 'Aucune traduction trouvée',
    'admin.accessDenied': 'Accès refusé',
    'admin.adminOnly': 'Cette page est réservée aux administrateurs.',
    'admin.experts': 'Gérer les conseillers',
    'admin.visibility': 'Visibilité',
    'admin.visible': 'Visible',
    'admin.hidden': 'Caché',
    'admin.noExperts': 'Aucun conseiller',
    'admin.partners': 'Gestion des partenaires',
    'admin.partnerApplications': 'Candidatures partenaires',
    'admin.noPartners': 'Aucun partenaire',
    'admin.noPartnerApps': 'Aucune candidature partenaire',
    'admin.editPartnerJson': 'Modifier le partenaire (JSON)',
    'admin.editPartnerJsonDesc': 'Modifier les informations du partenaire au format JSON.',
    
    // Pied de page
    'footer.description': 'Maîtriser l\'IA, Atteindre la Liberté',
    'footer.platform': 'Plateforme',
    'footer.alliance': 'Alliance',
    'footer.trust': 'Confiance et Sécurité',
    'footer.privacy': 'Politique de confidentialité',
    'footer.terms': 'Conditions d\'utilisation',
    'footer.cookies': 'Paramètres des cookies',
    'footer.copyright': '© 2026 OPC Global Alliance. Tous droits réservés.',
    'footer.followUs': 'Suivez-nous',
    'footer.wechat': 'Compte officiel WeChat',
    'footer.xiaohongshu': 'Xiaohongshu (RED)',
    'footer.email': 'Email de contact',
  },
  ja: {
    // ナビゲーション
    'nav.mission': 'ミッション',
    'nav.certification': '認定',
    'nav.arsenal': 'アーセナル',
    'nav.experts': '専門家',
    'nav.dashboard': 'ダッシュボード',
    'nav.login': 'ログイン',
    'nav.logout': 'ログアウト',
    'nav.language': '言語',
    
    // ヒーローセクション
    'hero.badge': 'AIを活用し、自由を手に入れる',
    'hero.title': 'AIを制する者が世界を制す',
    'hero.subtitle': '一人会社のためのグローバルアクセラレーター。0.5/3/2効率パラダイムを実践。',
    'hero.partners': 'グローバルパートナーからの信頼',
    
    // CTA
    'cta.join': 'アライアンスに参加',
    'cta.read': 'ブループリントを読む',
    'cta.apply': '今すぐ申請',
    'cta.submit': '送信',
    'cta.cancel': 'キャンセル',
    'cta.save': '保存',
    'cta.edit': '編集',
    'cta.delete': '削除',
    'cta.search': '検索',
    
    // 価値提案
    'value.time': '時間裁定',
    'value.time.desc': 'AIをマスターして実行時間を半分に削減。',
    'value.output': 'アウトプット乗数',
    'value.output.desc': 'エージェントを活用して品質を3倍に。',
    'value.capture': '価値獲得',
    'value.capture.desc': 'ビジネスループ全体を所有して価値を2倍に。',
    
    // 認定
    'cert.title': 'OPC昇進ラダー',
    'cert.subtitle': 'AI時代の厳格な認定基準。能力を検証し、特権を解除します。',
    'cert.l1.name': 'AIコーチ',
    'cert.l1.desc': 'AIツールをマスターし、他者の独立生産性をコーチング。',
    'cert.l2.name': 'ソロプレナー',
    'cert.l2.desc': '自動化ワークフローを構築。',
    'cert.l3.name': 'タイタン',
    'cert.l3.desc': 'エコシステムを前進させる業界リーダー。',
    'cert.requirements': '要件',
    'cert.privileges': '特権',
    'cert.popular': '人気',
    'cert.l1.req1': 'ChatGPT / Claude / Midjourney',
    'cert.l1.req2': '基本AIタスク完了',
    'cert.l1.req3': 'オンライン評価',
    'cert.l1.priv1': 'マイクロタスクアクセス',
    'cert.l1.priv2': 'コミュニティメンバーシップ',
    'cert.l1.priv3': '学習リソース',
    'cert.l2.req1': '年間収益500万ドル+',
    'cert.l2.req2': 'ワークフロー自動化',
    'cert.l2.req3': 'ポートフォリオレビュー',
    'cert.l2.priv1': 'エンタープライズプロジェクト',
    'cert.l2.priv2': '認証バッジ',
    'cert.l2.priv3': 'SaaSサポート',
    'cert.l3.req1': '年間収益5000万ドル+',
    'cert.l3.req2': 'チーム≤50人',
    'cert.l3.req3': '招待制',
    'cert.l3.priv1': 'エコシステム配当',
    'cert.l3.priv2': 'IPライセンス',
    'cert.l3.priv3': 'グローバルリソース',
    
    // 専門家
    'experts.title': 'OPCファシリテーター',
    'experts.subtitle': '世界中のOPC起業家に専門的なサポートを提供するプロのコーチとアドバイザー。',
    'experts.viewall': 'すべてのファシリテーターを見る',
    
    // アーセナル
    'arsenal.title': 'デジタルアーセナル',
    'arsenal.subtitle': '7桁収入のソロプレナーが使用する実戦済みツールスタック。',
    'arsenal.brain.name': 'ブレイン',
    'arsenal.brain.desc': 'AI思考パートナー',
    'arsenal.builder.name': 'ビルダー',
    'arsenal.builder.desc': '開発ツール',
    'arsenal.creative.name': 'クリエイティブ',
    'arsenal.creative.desc': 'デザインとコンテンツ',
    'arsenal.system.name': 'システム',
    'arsenal.system.desc': '自動化と運用',
    
    // パートナー
    'partners.title': 'エコシステムパートナー',
    'partners.subtitle': 'コーチ、ブランド、組織が協力して世界中のOPC起業家を支援。',
    'partners.coaches': 'コーチ',
    'partners.brands': 'ブランド',
    'partners.organizations': '組織',
    'partners.noPartners': 'パートナー近日公開。',
    'partners.becomePartner': 'パートナーになる',
    
    // パートナー申請
    'partnerApply.title': 'パートナーになる',
    'partnerApply.subtitle': 'エコシステムに参加し、世界中のOPC起業家を支援しましょう。',
    'partnerApply.contactInfo': '連絡先情報',
    'partnerApply.contactName': '担当者名',
    'partnerApply.contactNamePlaceholder': 'お名前',
    'partnerApply.contactEmail': 'メールアドレス',
    'partnerApply.contactEmailPlaceholder': 'your@email.com',
    'partnerApply.contactPhone': '電話番号',
    'partnerApply.contactPhonePlaceholder': '+81 3 1234 5678',
    'partnerApply.orgInfo': '組織情報',
    'partnerApply.orgName': '組織名',
    'partnerApply.orgNamePlaceholder': '組織またはブランド名',
    'partnerApply.orgType': '組織タイプ',
    'partnerApply.selectType': 'タイプを選択...',
    'partnerApply.website': 'ウェブサイト',
    'partnerApply.description': '説明',
    'partnerApply.descriptionPlaceholder': '組織について、どのように協力したいか教えてください...',
    'partnerApply.submitting': '送信中...',
    'partnerApply.success': '申請が正常に送信されました！',
    'partnerApply.error': '申請の送信に失敗しました。再度お試しください。',
    'partnerApply.requiredFields': '必須項目をすべて入力してください。',
    'partnerApply.thankYou': 'ありがとうございます！',
    'partnerApply.successMessage': 'パートナー申請を受け付けました。審査後、ご連絡いたします。',
    
    // ダッシュボード
    'dashboard.title': 'ダッシュボード',
    'dashboard.welcome': 'ようこそ',
    'dashboard.back': '戻る',
    'dashboard.applications': '私の申請',
    'dashboard.projects': 'プロジェクト進捗',
    'dashboard.certificates': '私の証明書',
    'dashboard.submit': '申請を提出',
    'dashboard.noApps': '申請がありません',
    'dashboard.noAppsDesc': '最初の申請を提出して旅を始めましょう。',
    'dashboard.noProjects': 'アクティブなプロジェクトがありません',
    'dashboard.noProjectsDesc': '申請が承認されるとプロジェクトがここに表示されます。',
    'dashboard.noCerts': '証明書がありません',
    'dashboard.noCertsDesc': '認定の旅を完了して最初の証明書を取得しましょう。',
    'dashboard.milestones': 'マイルストーン',
    'dashboard.certNumber': '証明書番号',
    'dashboard.issued': '発行日',
    'dashboard.expires': '有効期限',
    'dashboard.status': 'ステータス',
    'dashboard.submitted': '提出日',
    'dashboard.noIndustry': '業界未指定',
    'dashboard.noDescription': '説明がありません。',
    'dashboard.accessDenied': 'アクセス拒否',
    'dashboard.pleaseLogin': 'ダッシュボードにアクセスするにはログインしてください。',
    'dashboard.returnHome': 'ホームに戻る',
    
    // 申請フォーム
    'dashboard.app.title': '申請を提出',
    'dashboard.app.desc': 'OPCグローバルアライアンスへの参加を申請してください。',
    'dashboard.app.companyName': '会社/プロジェクト名',
    'dashboard.app.companyPlaceholder': '会社名またはプロジェクト名',
    'dashboard.app.industry': '業界',
    'dashboard.app.industryPlaceholder': '例：テクノロジー、教育、金融',
    'dashboard.app.certLevel': '認定レベル',
    'dashboard.app.description': '説明',
    'dashboard.app.descPlaceholder': 'ビジネスについて教えてください...',
    'dashboard.app.success': '申請が正常に提出されました！',
    'dashboard.app.nameRequired': '会社名は必須です',
    
    // ステータス
    'status.pending': '保留中',
    'status.reviewing': '審査中',
    'status.approved': '承認済み',
    'status.rejected': '却下',
    'status.active': 'アクティブ',
    'status.expired': '期限切れ',
    
    // 管理者
    'admin.title': '管理パネル',
    'admin.applications': '申請管理',
    'admin.translations': '翻訳管理',
    'admin.users': 'ユーザー管理',
    'admin.noApps': '申請が見つかりません',
    'admin.updateStatus': 'ステータスを更新',
    'admin.filterByStatus': 'ステータスでフィルター',
    'admin.allStatuses': 'すべてのステータス',
    'admin.translationKey': '翻訳キー',
    'admin.english': '英語',
    'admin.chinese': '中国語',
    'admin.french': 'フランス語',
    'admin.japanese': '日本語',
    'admin.noTranslations': '翻訳が見つかりません',
    'admin.accessDenied': 'アクセス拒否',
    'admin.adminOnly': 'このページは管理者のみアクセスできます。',
    'admin.experts': 'コーチ管理',
    'admin.visibility': '表示設定',
    'admin.visible': '表示',
    'admin.hidden': '非表示',
    'admin.noExperts': 'コーチなし',
    'admin.partners': 'パートナー管理',
    'admin.partnerApplications': 'パートナー申請',
    'admin.noPartners': 'パートナーなし',
    'admin.noPartnerApps': 'パートナー申請なし',
    'admin.editPartnerJson': 'パートナーを編集 (JSON)',
    'admin.editPartnerJsonDesc': 'JSON形式でパートナー情報を素早く編集。',
    
    // フッター
        'footer.description': 'AIを有効に活用し、自由总收入',
    'footer.platform': 'プラットフォーム',
    'footer.alliance': 'アライアンス',
    'footer.trust': '信頼とセキュリティ',
    'footer.privacy': 'プライバシーポリシー',
    'footer.terms': '利用規約',
    'footer.cookies': 'Cookie設定',
    'footer.copyright': '© 2026 OPC Global Alliance. 全著作権所有。',
    'footer.followUs': 'フォローする',
    'footer.wechat': 'WeChat公式アカウント',
    'footer.xiaohongshu': '小紅書 (RED)',
    'footer.email': 'お問い合わせメール',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage or default to 'zh'
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('opc-language');
      if (saved && ['en', 'zh', 'fr', 'ja'].includes(saved)) {
        return saved as Language;
      }
    }
    return 'zh'; // Default to Chinese
  });

  // Wrapper to persist language to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('opc-language', lang);
    }
  };
  
  // Fetch translations from backend
  const { data: backendTranslations, isLoading } = trpc.translations.getAll.useQuery(undefined, {
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  // Merge backend translations with defaults (backend takes priority)
  const mergedTranslations = useMemo(() => {
    const result: Record<Language, Record<string, string>> = {
      en: { ...defaultTranslations.en },
      zh: { ...defaultTranslations.zh },
      fr: { ...defaultTranslations.fr },
      ja: { ...defaultTranslations.ja },
    };

    if (backendTranslations) {
      // backendTranslations format: { "key": { en: "...", zh: "...", ... } }
      for (const [key, langs] of Object.entries(backendTranslations)) {
        if (langs.en) result.en[key] = langs.en;
        if (langs.zh) result.zh[key] = langs.zh;
        if (langs.fr) result.fr[key] = langs.fr;
        if (langs.ja) result.ja[key] = langs.ja;
      }
    }

    return result;
  }, [backendTranslations]);

  const t = (key: string): string => {
    return mergedTranslations[language][key] || mergedTranslations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
