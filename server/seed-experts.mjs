import 'dotenv/config';
import mysql from 'mysql2/promise';

const experts = [
  {
    nameEn: "Guo Feng",
    nameZh: "郭峰",
    nameFr: "Guo Feng",
    nameJa: "郭峰",
    roleEn: "Ecosystem Architect",
    roleZh: "生态架构师",
    roleFr: "Architecte d'écosystème",
    roleJa: "エコシステムアーキテクト",
    titleEn: "OPC Global Founder",
    titleZh: "OPC Global 创始人",
    titleFr: "Fondateur d'OPC Global",
    titleJa: "OPC Global 創設者",
    displayOrder: 1,
  },
  {
    nameEn: "Zhou Jian",
    nameZh: "周健",
    nameFr: "Zhou Jian",
    nameJa: "周健",
    roleEn: "AI Agent Expert",
    roleZh: "AI 代理专家",
    roleFr: "Expert en agents IA",
    roleJa: "AIエージェント専門家",
    titleEn: "Founder of Lanma Tech",
    titleZh: "蓝马科技创始人",
    titleFr: "Fondateur de Lanma Tech",
    titleJa: "Lanma Tech 創設者",
    displayOrder: 2,
  },
  {
    nameEn: "Lai Junsong",
    nameZh: "赖俊松",
    nameFr: "Lai Junsong",
    nameJa: "頼俊松",
    roleEn: "XR Pioneer",
    roleZh: "XR 先驱",
    roleFr: "Pionnier XR",
    roleJa: "XRパイオニア",
    titleEn: "Founder of Nibiru",
    titleZh: "睿悦信息创始人",
    titleFr: "Fondateur de Nibiru",
    titleJa: "Nibiru 創設者",
    displayOrder: 3,
  },
  {
    nameEn: "Prof. Ma Baolong",
    nameZh: "马宝龙教授",
    nameFr: "Prof. Ma Baolong",
    nameJa: "馬宝龍教授",
    roleEn: "Strategic Scholar",
    roleZh: "战略学者",
    roleFr: "Chercheur stratégique",
    roleJa: "戦略学者",
    titleEn: "Ex-VP Hisense",
    titleZh: "海信集团前副总裁",
    titleFr: "Ex-VP Hisense",
    titleJa: "元ハイセンス副社長",
    displayOrder: 4,
  },
  {
    nameEn: "Prof. Zhang Haixia",
    nameZh: "张海霞教授",
    nameFr: "Prof. Zhang Haixia",
    nameJa: "張海霞教授",
    roleEn: "Innovation Bridge",
    roleZh: "创新桥梁",
    roleFr: "Pont d'innovation",
    roleJa: "イノベーションブリッジ",
    titleEn: "Founder of iCANX",
    titleZh: "iCANX 创始人",
    titleFr: "Fondatrice d'iCANX",
    titleJa: "iCANX 創設者",
    displayOrder: 5,
  },
  {
    nameEn: "Steve",
    nameZh: "Steve",
    nameFr: "Steve",
    nameJa: "スティーブ",
    roleEn: "Cross-Cultural Mentor",
    roleZh: "跨文化导师",
    roleFr: "Mentor interculturel",
    roleJa: "異文化メンター",
    titleEn: "AQ Expert",
    titleZh: "AQ 专家",
    titleFr: "Expert AQ",
    titleJa: "AQ専門家",
    displayOrder: 6,
  },
];

async function seedExperts() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  console.log('Seeding experts...');
  
  for (const expert of experts) {
    try {
      // Check if expert already exists
      const [existing] = await connection.execute(
        'SELECT id FROM experts WHERE nameEn = ?',
        [expert.nameEn]
      );
      
      if (existing.length > 0) {
        // Update existing
        await connection.execute(
          `UPDATE experts SET 
            nameZh = ?, nameFr = ?, nameJa = ?,
            roleEn = ?, roleZh = ?, roleFr = ?, roleJa = ?,
            titleEn = ?, titleZh = ?, titleFr = ?, titleJa = ?,
            displayOrder = ?
          WHERE nameEn = ?`,
          [
            expert.nameZh, expert.nameFr, expert.nameJa,
            expert.roleEn, expert.roleZh, expert.roleFr, expert.roleJa,
            expert.titleEn, expert.titleZh, expert.titleFr, expert.titleJa,
            expert.displayOrder,
            expert.nameEn
          ]
        );
        console.log(`  ✓ Updated: ${expert.nameEn}`);
      } else {
        // Insert new
        await connection.execute(
          `INSERT INTO experts (nameEn, nameZh, nameFr, nameJa, roleEn, roleZh, roleFr, roleJa, titleEn, titleZh, titleFr, titleJa, displayOrder, isVisible)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'visible')`,
          [
            expert.nameEn, expert.nameZh, expert.nameFr, expert.nameJa,
            expert.roleEn, expert.roleZh, expert.roleFr, expert.roleJa,
            expert.titleEn, expert.titleZh, expert.titleFr, expert.titleJa,
            expert.displayOrder
          ]
        );
        console.log(`  ✓ Created: ${expert.nameEn}`);
      }
    } catch (error) {
      console.error(`  ✗ Error with ${expert.nameEn}:`, error.message);
    }
  }
  
  await connection.end();
  console.log('Done!');
}

seedExperts().catch(console.error);
