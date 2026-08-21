import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  Factory,
  FileSearch,
  Gauge,
  Layers3,
  LineChart,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  Workflow,
  Wrench,
} from 'lucide-react';
import './styles.css';

const productImages = [
  '/assets/micbot-product-t1.png',
  '/assets/micbot-product-p1.png',
  '/assets/micbot-product-p2.png',
  '/assets/micbot-product-exr.jpg',
  '/assets/business-labor-shortage.jpg',
  '/assets/business-safety-risk.png',
  '/assets/micbot-product-p1-exr-new.png',
];

const heroImage = productImages[0];

const navItems = [
  ['首页', 'overview'],
  ['行业逻辑', 'industry'],
  ['商业逻辑', 'business'],
  ['资本逻辑', 'capitalization'],
  ['资产壁垒', 'assets'],
  ['终局团队', 'endgame'],
  ['证据', 'evidence'],
];

const businessSectionNav = [
  ['用户痛点与需求', 'business-pain'],
  ['产品与解决方案', 'business-solution'],
  ['竞品分析与核心优势', 'business-competition'],
  ['核心壁垒', 'business-moat'],
  ['商业模式', 'business-model'],
  ['运营数据与落地进展', 'business-traction'],
];

const sourceRegistry = {
  officialHome: {
    id: 'S1',
    name: '具微科技官网首页',
    type: '公司官网',
    url: 'https://www.micbotics.cn/',
    note: '产品矩阵、应用场景、新闻动态、联系方式',
  },
  officialP1: {
    id: 'S2',
    name: 'MOVENEW P1 产品页',
    type: '公司产品参数',
    url: 'https://www.micbotics.cn/list_12/98.html',
    note: 'P1 标称速度、载荷、续航、温域、防护等级等',
  },
  officialP2: {
    id: 'S3',
    name: 'MOVENEW P2 产品页',
    type: '公司产品参数',
    url: 'https://www.micbotics.cn/list_12/95.html',
    note: 'P2 标称参数与行业特种机器人定位',
  },
  officialT1: {
    id: 'S4',
    name: 'MOVENEW T1 产品页',
    type: '公司产品参数',
    url: 'https://www.micbotics.cn/list_13/96.html',
    note: 'T1 旗舰级轮足机器人及智能系统、运动系统、续航与感知配置',
  },
  officialExr: {
    id: 'S5',
    name: 'P1-ExR 防爆产品发布',
    type: '公司公告',
    url: 'https://www.micbotics.cn/list_4/120.html',
    note: '防爆产品上线与资质宣传口径',
  },
  officialAPlus: {
    id: 'S6',
    name: 'A+ 轮融资公告',
    type: '公司公告',
    url: 'https://www.micbotics.cn/list_3/18.html',
    note: 'A+ 轮融资，公司官网披露',
  },
  officialA2: {
    id: 'S7',
    name: 'A++ 轮融资公告',
    type: '公司公告',
    url: 'https://www.micbotics.cn/list_3/4.html',
    note: 'A++ 轮、订单与在手订单等公司披露口径',
  },
  officialA3: {
    id: 'S8',
    name: 'A+++ 轮融资公告',
    type: '公司公告',
    url: 'https://www.micbotics.cn/list_3/113.html',
    note: 'A 系列累计融资与产业资本口径',
  },
  hubMove: {
    id: 'S9',
    name: 'MICBOT-HUB / MICBOT-MOVE 发布',
    type: '公司产品发布',
    url: 'https://www.micbotics.cn/list_4/123.html',
    note: '软件平台与控制平台上线',
  },
  micvlc: {
    id: 'S10',
    name: 'MicVLC 工业具身大脑发布',
    type: '公司技术发布',
    url: 'https://www.micbotics.cn/list_4/125.html',
    note: '工业具身大脑技术发布口径',
  },
  krA: {
    id: 'S11',
    name: '36氪：近亿元 A 轮融资',
    type: '媒体报道',
    url: 'https://www.36kr.com/p/3651740896665733',
    note: 'A 轮、创始人/CEO、团队与订单等报道口径',
  },
  krA3: {
    id: 'S12',
    name: '36氪：A+++ 轮融资',
    type: '媒体报道',
    url: 'https://www.36kr.com/p/3777491215913736',
    note: '产业资本、创始人表述、首席科学家、出货与营收预期',
  },
  ofweekB1: {
    id: 'S13',
    name: 'OFweek：B1 轮融资',
    type: '媒体转述',
    url: 'https://robot.ofweek.com/2026-06/ART-8321200-8100-30692247.html',
    note: 'B1 轮、估值与 Q2 收入口径，需低置信度处理',
  },
  qqB1: {
    id: 'S14',
    name: '腾讯新闻/观点新媒体：B1 轮融资',
    type: '媒体转述',
    url: 'https://news.qq.com/rain/a/20260626A0AC5300',
    note: 'B1 轮数亿元与估值近 40 亿元转述',
  },
  idc: {
    id: 'S15',
    name: 'IDC：全球四足机器人市场份额，2024',
    type: '第三方行业数据',
    url: 'https://www.idc.com/resource-center/press-releases/%E4%B8%AD%E5%9B%BD%E5%8E%82%E5%95%86%E9%A2%86%E8%B7%91%EF%BC%8C%E5%A4%9A%E5%85%83%E5%BA%94%E7%94%A8%E8%B5%B7%E8%88%AA-idc%E5%8F%91%E5%B8%83%E5%85%A8%E7%90%83%E5%9B%9B%E8%B6%B3/',
    note: '2024 市场规模、出货量、消费级占比',
  },
  micbotPatentT: {
    id: 'S16',
    name: 'Google Patents：杭州具微科技有限公司专利检索',
    type: '专利公开信息',
    url: 'https://patents.google.com/?assignee=%22%E6%9D%AD%E5%B7%9E%E5%85%B7%E5%BE%AE%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%22',
    note: '用于检索杭州具微科技有限公司公开专利；专利类型、权利要求和核心算法覆盖范围仍需逐项核验',
  },
  mineRobotPilot: {
    id: 'S17',
    name: '国家矿山安全监察局/工信部：矿山机器人应用验证试点通知',
    type: '政策文件',
    url: 'https://www.chinamine-safety.gov.cn/zfxxgk/fdzdgknr/tzgg/202605/t20260522_604631.shtml',
    note: '2026年5月发布，提出推动矿山机器人研发和规模化应用、推动险累苦脏岗位机器人替代',
  },
  smartMineMarket: {
    id: 'S18',
    name: '新华财经：智慧矿山千亿市场加速释放',
    type: '行业市场数据',
    url: 'https://www.cnfin.com/gs-lb/detail/20250518/4235271_1.html',
    note: '援引《2025智能矿山暨无人驾驶行业蓝皮书》，预计2025年智慧矿山市场670亿元、2035年突破1200亿元',
  },
  sinaB1: {
    id: 'S19',
    name: '新浪财经/每日经济新闻：具微科技 B1 轮融资',
    type: '媒体报道',
    url: 'https://finance.sina.com.cn/roll/2026-06-26/doc-inietspp7310957.shtml',
    note: 'B1 轮、估值近40亿元、二季度营收近两亿元、矿业/铝业/化工合作等媒体报道口径',
  },
  sinaA2: {
    id: 'S20',
    name: '新浪财经/投中网：具微科技 A++ 轮融资',
    type: '媒体转载',
    url: 'https://finance.sina.com.cn/wm/2026-02-28/doc-inhpiwhq0063667.shtml',
    note: 'A++ 轮、2025年订单1.1亿元、在手订单超5亿元、近千个高危工业场景等转述口径',
  },
  askciQuadRank: {
    id: 'S21',
    name: '中商产业研究院：2025年中国四足机器人重点企业综合竞争力排名',
    type: '第三方行业排名',
    url: 'https://www.askci.com/news/20250710/173742275214026181470060.shtml',
    note: '宇树、云深处、七腾等四足机器人企业竞争格局、定位、主打产品和部分份额口径',
  },
  askciQuadMap: {
    id: 'S22',
    name: '中商产业研究院：2026年中国四足机器人产业链图谱',
    type: '第三方行业研究',
    url: 'https://www.askci.com/news/chanye/20260701/085640278286740032052778_6.shtml',
    note: '四足机器人“一超多强”、消费级与行业级结构、特种工业细分壁垒口径',
  },
  basfSevnce: {
    id: 'S23',
    name: '巴斯夫与七腾机器人合作备忘录',
    type: '企业合作新闻',
    url: 'https://www.basf.com/cn/zh/media/news-releases/cn/2026/04/cn-26-34',
    note: '七腾机器人与巴斯夫围绕化工行业机器人解决方案合作的公开新闻',
  },
  sevnceHome: {
    id: 'S24',
    name: '七腾机器人官网',
    type: '竞品官网',
    url: 'https://sevnce.com/',
    note: '七腾防爆四足机器人、防爆轮式机器人、防爆挂轨机器人等产品矩阵',
  },
  reportCalc: {
    id: 'C1',
    name: '本地具微行研计算',
    type: '分析计算',
    url: '#evidence',
    note: '商用出货推算、载荷/重量比、估值倍数敏感性',
  },
  unitreeB2: {
    id: 'P1',
    name: '宇树 Unitree B2 产品页',
    type: '竞品官方参数',
    url: 'https://www.unitree.com/cn/b2/',
    note: 'B2 自重、速度、载荷、续航、防护等级等官方参数',
  },
  unitreeB2W: {
    id: 'P2',
    name: '宇树 Unitree B2-W 产品页',
    type: '竞品官方参数',
    url: 'https://www.unitree.com/cn/b2-w/',
    note: 'B2-W 轮足形态、速度、载荷、续航、防护等级等官方参数',
  },
  deepX30: {
    id: 'P3',
    name: '云深处 Deep Robotics X30 产品页',
    type: '竞品官方参数',
    url: 'https://www.deeprobotics.cn/robot/index/product3.html',
    note: 'X30 工业四足机器人的速度、续航、温域、防护等级等官方参数',
  },
  agilityDigit: {
    id: 'P6',
    name: 'Agility Robotics Digit 官方资料',
    type: '竞品官方资料',
    url: 'https://www.agilityrobotics.com/solutions/digit/spec-sheet',
    note: 'Digit 人形机器人规格、物流场景与企业定位；部分资料需以官方 spec sheet 为准',
  },
  weilanAlpha: {
    id: 'P7',
    name: 'WEILAN AlphaDog 官方资料',
    type: '竞品官方资料',
    url: 'https://www.weilan.com/en/en/about.html',
    note: 'WEILAN AlphaDog 产品定位、消费级/个人机器人与运动控制资料',
  },
  spot: {
    id: 'P4',
    name: 'Boston Dynamics Spot 产品页',
    type: '竞品官方参数',
    url: 'https://bostondynamics.com/products/spot/',
    note: 'Spot 工业巡检平台的载荷、速度、运行时间、防护等级等官方参数',
  },
  anymal: {
    id: 'P5',
    name: 'ANYbotics ANYmal 产品页',
    type: '竞品官方参数',
    url: 'https://www.anybotics.com/robotics/anymal/',
    note: 'ANYmal 面向能源、化工、矿业等场景的自主巡检产品资料',
  },
  unitreeIpo: {
    id: 'F1',
    name: '宇树科技 IPO/融资公开报道',
    type: '资本市场报道',
    url: 'https://paper.cnstock.com/html/2026-07/03/content_2239179.htm',
    note: '宇树拟募资、发行估值、营收等资本市场口径，需以招股文件为准',
  },
  deepIpo: {
    id: 'F2',
    name: '云深处 IPO/融资公开报道',
    type: '资本市场报道',
    url: 'https://finance.cctv.com/2026/05/19/ARTI6wqSGP1quU7Tgv6hv9yA260519.shtml',
    note: '云深处 IPO 受理、募资、营收等媒体报道口径，需以招股文件为准',
  },
  anyboticsFunding: {
    id: 'F3',
    name: 'ANYbotics 融资公开信息',
    type: '海外融资报道',
    url: 'https://www.anybotics.com/news/anybotics-raises-additional-60m/',
    note: 'ANYbotics 追加融资与累计融资口径',
  },
};

const sourceList = Object.values(sourceRegistry);

const teamCards = [
  {
    name: '王子煊',
    role: '创始人 / CEO / 法定代表人',
    source: '36氪报道、工商聚合与本地行研摘录',
    refs: ['krA', 'krA3'],
    detail:
      '公开报道称其具备投资与产业创业背景，曾参与汽车、电池相关项目；公司工商聚合信息显示其为法定代表人。',
    icon: UsersRound,
  },
  {
    name: '李秦川',
    role: '首席科学家',
    source: '36氪报道与官网口径',
    refs: ['krA3'],
    detail:
      '公开报道称其为四足机器人领域专家，享受国务院政府特殊津贴；需在面试/尽调中进一步核验全职投入、权责边界与成果归属。',
    icon: BrainCircuit,
  },
  {
    name: '研发团队',
    role: '机器人控制 + AI + 产业工程',
    source: '具微官网公司介绍',
    refs: ['officialHome'],
    detail:
      '官网披露核心成员来自斯坦福大学、浙江大学、浙江理工大学等院校，强调人工智能与机器人控制的交叉能力。',
    icon: Network,
  },
  {
    name: '产业资本网络',
    role: '供应链、场景与产能协同',
    source: '公开融资报道',
    refs: ['officialA3', 'krA3'],
    detail:
      '投资方覆盖关节与传动、电连接、国资平台、铝业、化工等产业资源；叙事里的加速器，也需要拆分关联交易与真实复购。',
    icon: Building2,
  },
];

const painPoints = [
  {
    title: '客户买的不是“替代人工”，而是安全生产确定性',
    text: '电解铝、石油石化、矿山、消防与公共安全场景里，停机、事故、人员暴露风险比单小时人工成本更贵。',
  },
  {
    title: '传统四足机器人的工业化短板在续航、载荷和运维',
    text: '高频抬腿导致能耗与磨损，长时间巡检和带上装作业需要更强的负载、供电、散热和现场服务体系。',
  },
  {
    title: '项目能做成，不等于公司能规模化复制',
    text: 'B 轮投资人真正关心的是：参数是否可复现，认证是否覆盖真实配置，交付是否标准化，回款是否能穿透。',
  },
];

const scenarioCards = [
  {
    title: '工业巡检',
    budget: '安全生产 + 连续巡检',
    text: '适合从电力、石化、园区等标准化巡检切入，关键不是“能走”，而是能否稳定挂载感知设备、沉淀巡检数据并复用交付模板。',
    refs: ['officialHome', 'officialP1', 'officialP2'],
  },
  {
    title: '消防应急',
    budget: '人员替代 + 高危进入',
    text: '官网应用模块包含消防水炮等上装，重载能力让产品不只是移动底盘，而是能承接救援物资、消防设备和现场作业工具。',
    refs: ['officialHome', 'officialP1'],
  },
  {
    title: '危化 / 石化 / 铝业',
    budget: '防爆准入 + 合规预算',
    text: 'P1-ExR 与防爆叙事把产品带入强准入场景，若能形成认证、标杆客户和复购，将比通用巡检更容易支撑 B 轮估值故事。',
    refs: ['officialExr', 'officialA3'],
  },
  {
    title: '公共安全 / 特种作业',
    budget: '复杂地形 + 装备平台',
    text: '轮足形态、宽温域、防护等级与上装生态共同构成特种作业入口，后续要验证的是项目是否能从定制走向标准包。',
    refs: ['officialHome', 'officialP2'],
  },
];

const marketNumbers = [
  { value: '1.8亿美元', label: '2024全球四足机器人市场规模', source: 'IDC', refs: ['idc'] },
  { value: '约2万台', label: '2024全球出货量', source: 'IDC', refs: ['idc'] },
  { value: '72.1%', label: '消费级出货占比', source: 'IDC', refs: ['idc'] },
  { value: '约5,580台', label: '商用级出货推算', source: '本报告计算', refs: ['idc', 'reportCalc'] },
];

const industryNumbers = [
  { value: '1200亿+', label: '2035年智慧矿山市场预测', source: '新华财经/行业蓝皮书口径', refs: ['smartMineMarket'] },
  { value: '670亿', label: '2025年智慧矿山市场预测', source: '新华财经/行业蓝皮书口径', refs: ['smartMineMarket'] },
  { value: '2026年5月', label: '矿山机器人验证试点政策发布', source: '国家矿山安监局/工信部', refs: ['mineRobotPilot'] },
  { value: '约5,580台', label: '2024商用四足机器人出货推算', source: 'IDC + 本报告计算', refs: ['idc', 'reportCalc'] },
];

const productMatrix = [
  {
    name: 'MOVENEW P1',
    role: '行业级重载本体',
    image: productImages[1],
    line: '用于工业巡检、消防应急、公共安全等高危复杂场景，是 BP 中承接订单和场景复制的核心产品。',
    tags: ['77kg', '>=200kg 行走载荷', '>=400kg 静态载荷', 'IP67/IP68'],
    refs: ['officialP1'],
  },
  {
    name: 'MOVENEW P2',
    role: '行业特种机器人',
    image: productImages[2],
    line: '官网首页将 P2 定位为行业特种机器人，强调仿生骨骼算法、动态平衡和防爆认证叙事。',
    tags: ['3m/s', '满载≤8h', '-40℃至85℃', '特种场景'],
    refs: ['officialP2', 'officialHome'],
  },
  {
    name: 'MOVENEW P1-ExR',
    role: '防爆具身轮足机器人',
    image: productImages[3],
    line: '对应防爆、危化、石化、铝业等强准入场景，是从通用巡检走向高壁垒工业预算的关键抓手。',
    tags: ['防爆产品', '四防场景', '危化/石化', '准入壁垒'],
    refs: ['officialExr'],
  },
  {
    name: 'MOVENEW T1',
    role: '旗舰级轮足机器人',
    image: productImages[0],
    line: '官网强调智策决策引擎、全身运动系统、关节模组、模块化续航和感知硬件，适合承接旗舰能力展示。',
    tags: ['智策决策', '全身运动', '模块化续航', '多传感器'],
    refs: ['officialT1'],
  },
];

const productUpgradeColumns = [
  {
    name: 'MOVENEW P1',
    stage: 'P1：重载本体',
    image: productImages[1],
    load: ['≥200kg 行走载荷', '≥400kg 静态载荷'],
    endurance: ['空载≤12h', '满载≤8h'],
    protection: ['IP67/IP68'],
    software: ['可接入平台'],
    scenario: ['工业巡检', '消防应急'],
    bp: ['重载切入'],
    refs: ['officialP1'],
  },
  {
    name: 'MOVENEW P2',
    stage: 'P2：特种强化',
    image: productImages[2],
    load: ['重载能力延续'],
    endurance: ['满载≤8h'],
    protection: ['-40℃至85℃', '特种场景'],
    software: ['可接入平台'],
    scenario: ['连续巡检', '复杂地形'],
    bp: ['场景强化'],
    refs: ['officialP2', 'officialHome'],
  },
  {
    name: 'MOVENEW P1-ExR',
    stage: 'P1-ExR：防爆准入',
    image: productImages[6],
    load: ['重载 + 防爆'],
    endurance: ['工业长班次'],
    protection: ['复合防爆', '四防场景'],
    software: ['可接入平台'],
    scenario: ['危化/石化', '铝业'],
    bp: ['准入壁垒'],
    refs: ['officialExr', 'officialA2'],
  },
  {
    name: 'MOVENEW T1',
    stage: 'T1：旗舰平台',
    image: productImages[0],
    load: ['平台承载'],
    endurance: ['模块化续航'],
    protection: ['多传感器感知'],
    software: ['智策决策', '全身运动'],
    scenario: ['复杂任务', '旗舰验证'],
    bp: ['平台升级'],
    refs: ['officialT1'],
  },
];

const productUpgradeRows = [
  ['阶段定位', 'stage', 'text'],
  ['重载能力', 'load', 'check'],
  ['续航能力', 'endurance', 'check'],
  ['特种适应', 'protection', 'check'],
  ['软件能力', 'software', 'check'],
  ['适配场景', 'scenario', 'check'],
  ['BP 含义', 'bp'],
];

const productSpecRows = [
  ['整机重量', '77kg', 'P1/P2 公开产品参数', ['officialP1', 'officialP2']],
  ['行走载荷', '>=200kg', '支撑重型上装、消防/检测设备与物资运载叙事', ['officialP1', 'officialP2']],
  ['静态载荷', '>=400kg', '将“重载”转化为差异化融资故事', ['officialP1', 'officialP2']],
  ['续航', '空载≤12h / 满载≤8h', '长班次、连续巡检、满载作业的商业化信号', ['officialP1', 'officialP2']],
  ['防护与温域', '本体IP67 / 轮部IP68 / -40℃至85℃', '面向极端工业场景和特种准入', ['officialP1', 'officialP2']],
];

const productLayers = [
  {
    title: '本体层',
    text: 'P1/P2/T1 构成不同价位和场景层级的机器人本体，P 系列承担行业级交付，T1 用于旗舰能力展示。',
    refs: ['officialP1', 'officialP2', 'officialT1'],
  },
  {
    title: '特种层',
    text: 'P1-ExR、防爆、四防和危化场景把产品从通用机器狗竞争中拉出，进入安全生产和准入预算。',
    refs: ['officialExr'],
  },
  {
    title: '上装层',
    text: '官网应用模块包括云台、机械臂、声纹相机、消防水炮、综合作业系统等，是项目客单价与行业方案的来源。',
    refs: ['officialHome'],
  },
  {
    title: '软件层',
    text: 'MICBOT-HUB、MICBOT-MOVE 与 MicVLC 让叙事从硬件销售延伸到设备管理、运动控制、数据和工业具身大脑。',
    refs: ['hubMove', 'micvlc'],
  },
];

const competitorRows = [
  {
    company: '具微科技',
    product: 'MOVENEW P1/P2',
    stage: '媒体称 B1 轮，估值近 40 亿元',
    weight: '77kg',
    payload: '行走 ≥200kg / 静态 ≥400kg',
    speed: '3m/s',
    endurance: '空载≤12h / 满载≤8h',
    protection: '本体IP67 / 轮部IP68 / 宽温域',
    angle: '特种工业重载与四防场景',
    advantage: true,
    refs: ['officialP1', 'officialP2', 'ofweekB1', 'qqB1'],
  },
  {
    company: '宇树科技',
    product: 'B2',
    stage: 'IPO/资本市场口径更成熟',
    weight: '约60kg',
    payload: '行走 >40kg / 静态 ≥120kg',
    speed: '>6m/s',
    endurance: '空载 >5h',
    protection: 'IP67',
    angle: '规模化、速度、成本与通用平台',
    refs: ['unitreeB2', 'unitreeIpo'],
  },
  {
    company: '宇树科技',
    product: 'B2-W',
    stage: '同属宇树平台',
    weight: '约85kg',
    payload: '行走 >40kg / 静态 120kg',
    speed: '15km/h',
    endurance: '40kg 负载续航约25km',
    protection: 'IP67',
    angle: '轮足高速移动与长距离巡检',
    refs: ['unitreeB2W', 'unitreeIpo'],
  },
  {
    company: '云深处',
    product: 'X30',
    stage: 'IPO 受理/巡检收入验证',
    weight: '约56-59kg',
    payload: '公开页面未突出重载',
    speed: '≥4m/s',
    endurance: '2.5-4h',
    protection: 'IP67 / -20℃至55℃',
    angle: '工业巡检、安防、应急',
    refs: ['deepX30', 'deepIpo'],
  },
  {
    company: 'Boston Dynamics',
    product: 'Spot',
    stage: '现代收购后全球标杆平台',
    weight: '约33.8kg',
    payload: '14kg',
    speed: '1.6m/s',
    endurance: '约90min',
    protection: 'IP54',
    angle: '全球品牌、生态和可靠性文档',
    refs: ['spot'],
  },
  {
    company: 'ANYbotics',
    product: 'ANYmal',
    stage: '累计融资超亿美元级别',
    weight: '公开型号口径差异较大',
    payload: '以传感器巡检套件为主',
    speed: '约0.75m/s',
    endurance: '90-120min',
    protection: 'IP67 / 工业认证路线',
    angle: '能源、化工、矿业自主巡检',
    refs: ['anymal', 'anyboticsFunding'],
  },
];

const advantageTiles = [
  {
    value: '首张',
    title: '资质先发：轮足机器人防爆认证',
    text: '公开资料称公司于2026年4月获得全球首张轮足机器人防爆认证，且为具身智能行业首个复合型防爆认证；IIC、IECEx、ATEX 等认证推进中，核心意义是提前进入强准入工业场景。',
    refs: ['officialA2', 'officialExr'],
  },
  {
    value: '千场景',
    title: '场景泛化：高危工业适配能力',
    text: '融资叙事应强调矿山、石油、化工、铝业等高危场景的共性：危险、复杂、非结构化。具微若能把场景经验沉淀为标准化作业包，就具备跨行业复制基础。',
    refs: ['officialHome', 'officialA2', 'mineRobotPilot'],
  },
  {
    value: '全栈',
    title: '技术闭环：本体 + 大脑自研',
    text: '“本体 + 大脑”全栈自研的价值，不是单点参数领先，而是把感知、决策、执行打通，让机器人在缺少先验地图和确定规则的工业现场完成路径规划与任务执行。',
    refs: ['officialP1', 'officialP2', 'officialT1', 'micvlc'],
  },
  {
    value: '开放',
    title: '生态扩展：从自有硬件走向开放平台',
    text: 'HUB/MOVE/MicVLC 的战略价值在于让能力不止服务单台机器狗，而是有机会向第三方硬件、算法开发者和多品类智能终端扩展，形成更大的工业具身生态入口。',
    refs: ['hubMove', 'micvlc'],
  },
];

const friendComparisonRows = [
  {
    type: 'section',
    dimension: '竞争格局总览',
    unitree: '整体领跑；消费级 + 工业级双驱动',
    deep: '工业巡检与电力等垂直场景深耕',
    sevnce: '能源化工、防爆机器人场景深耕',
    micbot: '特种工业轮足：矿业 / 铝业 / 化工',
    refs: ['askciQuadRank', 'askciQuadMap', 'officialHome'],
  },
  {
    dimension: '市场定位',
    unitree: '工业 + 消费双驱动',
    deep: '工业级解决方案',
    sevnce: '能源化工场景',
    micbot: '特种工业：矿业 / 铝业 / 化工',
    refs: ['askciQuadRank', 'officialHome'],
  },
  {
    dimension: '主打产品',
    unitree: 'Unitree B2 / B2-W',
    deep: '绝影 X30',
    sevnce: '防爆四足 / 防爆轮式 / 防爆挂轨',
    micbot: 'MOVENEW P1-ExR',
    refs: ['unitreeB2', 'unitreeB2W', 'deepX30', 'sevnceHome', 'officialExr'],
  },
  {
    dimension: '竞争位置',
    unitree: '全球出货领先，品牌声量强',
    deep: '工业四足机器人头部玩家',
    sevnce: '防爆机器人垂直场景头部',
    micbot: '轮足防爆认证先发',
    refs: ['idc', 'askciQuadRank', 'officialExr'],
  },
  {
    dimension: '防爆认证',
    unitree: '—',
    deep: '—',
    sevnce: '✓ 化工级防爆口径',
    micbot: '✓ 全球首张轮足防爆：Ex db eb mb IIB T4 Gb',
    refs: ['askciQuadRank', 'sevnceHome', 'officialExr', 'officialA2'],
    highlight: true,
  },
  {
    dimension: '四防能力',
    unitree: '—',
    deep: '—',
    sevnce: '耐高温高压等化工场景口径',
    micbot: '✓ 防磁 + 防爆 + 防水 + 防冻',
    refs: ['officialExr', 'krA3'],
    highlight: true,
  },
  {
    dimension: '强磁适应',
    unitree: '—',
    deep: '—',
    sevnce: '—',
    micbot: '✓ 1000Gs 测试口径（需尽调核验）',
    refs: ['krA3', 'officialA2'],
    highlight: true,
  },
  {
    dimension: '工作温度',
    unitree: '未统一披露；按型号核验',
    deep: '-20℃ ~ 55℃',
    sevnce: '-35℃ ~ 65℃ 口径',
    micbot: '-40℃ ~ 85℃',
    refs: ['unitreeB2', 'deepX30', 'askciQuadRank', 'officialP1', 'officialP2'],
  },
  {
    dimension: '防护等级',
    unitree: 'IP54 / IP68（按型号）',
    deep: 'IP67',
    sevnce: '未统一披露',
    micbot: 'IP67 / 轮部 IP68；涉水 65cm',
    refs: ['unitreeB2', 'unitreeB2W', 'deepX30', 'officialP1', 'officialP2'],
  },
  {
    dimension: '最大负载',
    unitree: '约 120kg 静态 / 40kg 行走',
    deep: '约 56kg',
    sevnce: '约 100kg 口径',
    micbot: '200kg 行走 / 400kg 静态',
    refs: ['unitreeB2', 'deepX30', 'askciQuadRank', 'officialP1', 'officialP2'],
    highlight: true,
  },
  {
    dimension: '核心客户',
    unitree: '电力巡检等公开案例',
    deep: '国家电网、宝钢等口径',
    sevnce: '中石油、巴斯夫等口径',
    micbot: '神火、魏桥、滨化等产业客户口径',
    refs: ['askciQuadRank', 'basfSevnce', 'officialA3', 'krA3', 'sinaB1'],
  },
  {
    type: 'section',
    dimension: '具微优势总结',
    unitree: '消费与通用工业更强',
    deep: '工业巡检更成熟',
    sevnce: '化工防爆更聚焦',
    micbot: '差异化在“轮足 + 四防 + 重载 + 平台化”叠加',
    refs: ['officialP1', 'officialP2', 'officialExr', 'hubMove', 'micvlc'],
    highlight: true,
  },
  {
    dimension: '资质优势',
    unitree: '通用工业场景为主',
    deep: '通用工业巡检为主',
    sevnce: '化工防爆资质口径强',
    micbot: '轮足防爆先发，IIC / IECEx / ATEX 推进中需继续核验',
    refs: ['officialExr', 'officialA2', 'sevnceHome'],
    highlight: true,
  },
  {
    dimension: '负载与续航',
    unitree: '速度强，负载不作为主叙事',
    deep: '巡检能力强',
    sevnce: '防爆与化工场景强',
    micbot: '重载 + 长班次：200/400kg 与 8-12h 形成 BP 记忆点',
    refs: ['unitreeB2', 'deepX30', 'officialP1', 'officialP2'],
    highlight: true,
  },
  {
    dimension: '全栈自研',
    unitree: '本体与生态能力强',
    deep: '工业算法与巡检能力强',
    sevnce: '防爆产品矩阵强',
    micbot: '关节 / 本体 / 工业具身大脑 / HUB / MOVE 形成闭环',
    refs: ['officialT1', 'micvlc', 'hubMove'],
    highlight: true,
  },
  {
    dimension: '数据飞轮',
    unitree: '规模与出货带来数据潜力',
    deep: '巡检场景数据沉淀',
    sevnce: '化工客户场景数据',
    micbot: '高危场景准入越早，越可能积累仿真难替代的真实作业数据',
    refs: ['officialA2', 'sinaA2', 'micvlc'],
    highlight: true,
  },
  {
    type: 'conclusion',
    dimension: '一句话结论',
    unitree: '拿消费级与通用工业声量',
    deep: '拿工业巡检',
    sevnce: '拿化工防爆',
    micbot: '拿防爆 + 防磁 + 防水 + 防冻叠加的特种工业入口',
    refs: ['askciQuadRank', 'officialExr', 'officialP1', 'officialP2'],
    highlight: true,
  },
];

const compactCompetitorRows = [
  {
    dimension: '自研能力',
    micbot: '强',
    boston: '强',
    unitree: '强',
    agility: '中',
    deep: '中',
    weilan: '低',
    refs: ['officialT1', 'micvlc', 'spot', 'unitreeB2', 'agilityDigit', 'deepX30', 'weilanAlpha'],
  },
  {
    dimension: '运动性能',
    micbot: '高',
    boston: '高',
    unitree: '高',
    agility: '中',
    deep: '高',
    weilan: '低',
    refs: ['officialP1', 'officialP2', 'krA3', 'spot', 'unitreeB2', 'deepX30'],
  },
  {
    dimension: '价性比',
    micbot: '高',
    boston: '低',
    unitree: '中',
    agility: '低',
    deep: '中',
    weilan: '低',
    refs: ['reportCalc', 'unitreeB2', 'spot', 'agilityDigit', 'deepX30', 'weilanAlpha'],
  },
  {
    dimension: '长期研发',
    micbot: '优',
    boston: '优',
    unitree: '优',
    agility: '中',
    deep: '良',
    weilan: '中',
    refs: ['krA3', 'hubMove', 'micvlc', 'spot', 'unitreeIpo', 'agilityDigit', 'deepIpo'],
  },
  {
    dimension: '行业布局',
    micbot: 'B端',
    boston: 'B端',
    unitree: 'B+C端',
    agility: 'B端',
    deep: 'B端',
    weilan: 'C端',
    refs: ['officialHome', 'spot', 'unitreeB2', 'agilityDigit', 'deepX30', 'weilanAlpha'],
  },
  {
    dimension: '🟢 资质壁垒',
    micbot: '✅ 全球首张轮足防爆认证',
    boston: '❌ 无',
    unitree: '❌ 无',
    agility: '❌ 无',
    deep: '❌ 无',
    weilan: '❌ 无',
    refs: ['officialExr', 'officialA2'],
    highlight: true,
  },
  {
    dimension: '🟢 特殊环境',
    micbot: '✅ 1000Gs强磁 / IP67 / -40~85℃',
    boston: '❌ 无',
    unitree: '❌ 无',
    agility: '❌ 无',
    deep: '❌ 无',
    weilan: '❌ 无',
    refs: ['krA3', 'officialP1', 'officialP2'],
    highlight: true,
  },
  {
    dimension: '🟢 重载能力',
    micbot: '✅ 400kg 极限口径',
    boston: '中',
    unitree: '中',
    agility: '中低',
    deep: '56kg',
    weilan: '低',
    refs: ['officialP1', 'officialP2', 'spot', 'unitreeB2', 'deepX30'],
    highlight: true,
  },
  {
    dimension: '🟢 唯一性',
    micbot: '防爆 + 强磁 + 重载 + 四防叠加的特种工业入口',
    boston: '—',
    unitree: '—',
    agility: '—',
    deep: '—',
    weilan: '—',
    refs: ['officialExr', 'officialP1', 'officialP2', 'krA3'],
    highlight: true,
  },
];

const micbotBarrierRows = [
  {
    barrier: '🔒 资质壁垒',
    performance: '全球首张轮足机器人防爆认证（Ex db eb mb IIB T4 Gb），具身智能行业首个复合型防爆认证',
    why: '认证周期长、标准严苛，竞品短期内难以直接复制',
    refs: ['officialExr', 'officialA2'],
  },
  {
    barrier: '🧲 环境壁垒',
    performance: '1000Gs 强磁环境控制与通讯测试口径，覆盖 -40~85℃宽温域、IP67 / 轮部 IP68 防护',
    why: '电解铝、强磁干扰等场景是工业自动化禁区，普通机器人难以进入',
    refs: ['krA3', 'officialP1', 'officialP2'],
  },
  {
    barrier: '⚙️ 技术壁垒',
    performance: '扁线关节、重载骨骼设计、能量回收系统与工业具身大脑 MicVLC 形成“关节 + 本体 + 大脑”闭环',
    why: '从关节到底层控制再到大脑打通，竞品若依赖外采或只做单点能力，系统化复制难度更高',
    refs: ['officialT1', 'micvlc', 'micbotPatentT'],
  },
  {
    barrier: '📊 数据壁垒',
    performance: '公开口径显示已进入近千个高危工业场景，真实作业数据持续回流',
    why: '仿真无法替代高危现场真机数据，准入越早，场景数据积累越难被追平',
    refs: ['sinaA2', 'officialA2', 'micvlc'],
  },
];

const moatItems = [
  {
    title: '轮足融合形态',
    icon: Gauge,
    points: ['公开叙事强调轮式效率与四足越障能力结合', 'P1/P2 标称速度 3m/s，重载能力突出', '更适合长距离工业巡检和负载作业'],
  },
  {
    title: '四防与准入',
    icon: ShieldCheck,
    points: ['聚焦防磁、防爆、防水、防冻特种工况', 'P1-ExR 防爆资质为公司官网宣传口径', '矿安、IECEx、ATEX 等仍需证书原件核验'],
  },
  {
    title: '本体 + 上装 + 软件平台',
    icon: Layers3,
    points: ['官网披露 MICBOT-HUB、MICBOT-MOVE 双平台', 'MicVLC 工业具身大脑为 2026 年技术发布口径', '从单机交付走向数据闭环与多机协同'],
  },
  {
    title: '产业资本场景牵引',
    icon: Factory,
    points: ['铝业、化工、国资平台为试点和订单提供入口', '供应链投资人有利于关节、电连接等核心部件协同', '需拆分战略合作、框架订单和验收收入'],
  },
];

const industryLogic = [
  {
    group: '行业驱动',
    title: '精准卡位“刚需+高价值”的特种工业场景。',
    text: '具微科技精准卡位 “刚需+高价值” 的特种工业场景。刚需在于铝厂、化工厂等“生命禁区”人进不去、人不愿去；高价值在于大宗商品景气周期下，客户付费能力强、安全投入意愿高。全球首张防爆认证+唯一1000Gs强磁能力，构成竞品无法跨越的准入护城河。',
    refs: ['officialExr', 'krA3', 'mineRobotPilot'],
  },
  {
    group: '行业驱动',
    title: '政策推动：矿山机器人规模化应用被加速',
    text: '2026年5月，国家矿山安全监察局与工信部联合发布矿山机器人应用验证试点通知，明确推动矿山机器人研发与规模化应用，提升下游采购确定性。',
    refs: ['mineRobotPilot'],
  },
  {
    group: '行业驱动',
    title: '市场空间：智慧矿山千亿级市场打开',
    text: '公开市场预测显示，智慧矿山正在从百亿级走向千亿级。特种机器人不是单一硬件生意，而是进入工业智能化、安全生产和无人化改造预算的入口。',
    refs: ['smartMineMarket'],
  },
  {
    group: '行业驱动',
    title: '“通用性能竞争”转向“特种场景能力竞争”。',
    text: '高危工业不是参数竞赛。真正的门槛在于长期稳定运行、通过准入认证、嵌入客户流程并承担安全责任，因此市场更可能向懂场景和能交付的公司集中。',
    refs: ['mineRobotPilot', 'officialExr'],
  },
];

const industryFlow = [
  {
    step: '01',
    label: '极端场景',
    title: '人不该先进现场',
    text: '矿业、铝业、化工等特种行业具备高度共性：环境极端、人力短缺、安全风险高，机器人替代首先发生在“险、累、苦、脏”的移动作业环节。',
    refs: ['mineRobotPilot'],
    icon: AlertTriangle,
  },
  {
    step: '02',
    label: '政策推力',
    title: '机器替代被明确加速',
    text: '国家矿山安全监察局与工信部于2026年5月联合发文，明确提出加快矿山机器人研发与规模化应用，提升下游客户采购确定性。',
    refs: ['mineRobotPilot'],
    icon: ShieldCheck,
  },
  {
    step: '03',
    label: '市场空间',
    title: '千亿市场打开入口',
    text: '智慧矿山市场被公开口径测算为千亿级，特种工业机器人不是单一硬件生意，而是进入工业智能化、安全生产和无人化改造预算的入口。',
    refs: ['smartMineMarket', 'idc'],
    icon: LineChart,
  },
  {
    step: '04',
    label: '具微窗口',
    title: '负载、续航、全栈自研',
    text: 'P1/P2 的载荷与续航参数、T1 本体能力，以及 MICBOT-HUB/MOVE、MicVLC 软件平台，使具微更适合被讲成“特种工业重载作业系统”。',
    refs: ['officialP1', 'officialP2', 'officialT1', 'hubMove', 'micvlc'],
    icon: BrainCircuit,
  },
];

const businessLogic = [
  {
    title: '真实需求：客户为安全、效率和无人化改造付费',
    signal: '订单与收入口径证明不是概念需求',
    text: '公开资料披露公司 2025 年订单、在手订单、近千个高危工业场景，以及二季度营收近两亿元等口径，说明需求端已经从试点兴趣进入采购验证阶段；但仍需继续拆分合同、验收、回款和复购。',
    refs: ['officialA2', 'sinaA2', 'sinaB1', 'krA'],
  },
  {
    title: '复制能力：从单点项目走向标准化场景包',
    signal: '本体 + 防爆准入 + 上装 + 软件',
    text: '官网产品矩阵显示 P1/P2/T1、P1-ExR 与 HUB/MOVE/MicVLC 形成“本体能力、特种准入、运动控制、设备管理、工业具身大脑”的组合。商业化关键是把项目交付沉淀成可跨矿山、化工、消防复用的场景包。',
    refs: ['officialP1', 'officialP2', 'officialT1', 'officialExr', 'hubMove', 'micvlc'],
  },
  {
    title: '盈利模型：硬件打入口，软件与运维拉高长期价值',
    signal: '重载能力支撑高客单价，软件决定长期价值',
    text: 'P1/P2 公开参数中的行走载荷、静态载荷和续航，有利于承接重型上装和长班次作业，支撑项目客单价；但单位经济模型能否变好，取决于量产良率、模块复用、现场交付成本以及软件/运维收入占比。',
    refs: ['officialP1', 'officialP2', 'hubMove', 'micvlc', 'reportCalc'],
  },
  {
    title: '客户粘性：流程嵌入、认证绑定、数据沉淀提高切换成本',
    signal: '从“卖设备”变成“进入客户作业体系”',
    text: '如果具微只是交付硬件，竞对仍可通过价格、品牌或参数替代；如果设备进入客户巡检流程、认证配置、运维 SLA 和数据平台，客户切换成本会提高，商业模式才有存量价值。',
    refs: ['hubMove', 'micvlc', 'officialExr'],
  },
];

const businessEvidence = [
  {
    value: '1.1亿元',
    label: '2025年订单口径',
    note: '公司公告/媒体转述，需核验合同和验收',
    refs: ['officialA2', 'sinaA2'],
  },
  {
    value: '5亿元+',
    label: '在手订单口径',
    note: '公司公告/媒体转述，需拆回款周期',
    refs: ['officialA2', 'sinaA2'],
  },
  {
    value: '近2亿元',
    label: '2026年二季度营收口径',
    note: '媒体报道口径，需以尽调材料为准',
    refs: ['sinaB1', 'ofweekB1'],
  },
  {
    value: '上千台',
    label: '2026年出货预期',
    note: '36氪报道口径，需验证产能与交付',
    refs: ['krA3'],
  },
];

const businessPainDemand = [
  {
    title: '高危现场需要“替人冒险”',
    text: '矿山、化工、消防、铝业等场景的核心痛点不是节省单个人工成本，而是降低人员暴露、事故责任、停机损失和连续巡检压力。',
    refs: ['mineRobotPilot', 'officialHome'],
  },
  {
    title: '客户买的是安全生产确定性',
    text: '工业客户采购机器人，本质是在购买可进入现场、可持续运行、可接入流程、可追责运维的作业能力，而不只是购买一个会走路的硬件。',
    refs: ['officialP1', 'officialP2', 'officialExr'],
  },
  {
    title: '需求验证要看合同、验收和回款',
    text: '公开订单和营收口径能证明需求存在，但融资岗需要继续穿透：客户是否真实采购、项目是否验收、回款周期如何、是否产生复购。',
    refs: ['officialA2', 'sinaA2', 'sinaB1'],
  },
];

const businessMoatCards = [
  {
    title: '特种准入',
    text: '防爆、四防、矿山/危化等准入如果覆盖真实交付配置，会构成竞对短期难以绕过的进入门槛。',
    refs: ['officialExr'],
  },
  {
    title: '工程交付',
    text: '高危工业不是参数竞赛，现场调试、稳定运行、售后响应和安全责任会沉淀为组织能力。',
    refs: ['officialP1', 'officialP2'],
  },
  {
    title: '软件与数据',
    text: 'HUB/MOVE/MicVLC 让业务从单机交付延伸到设备管理、运动控制和数据闭环，是提高客户粘性的入口。',
    refs: ['hubMove', 'micvlc'],
  },
  {
    title: '产业场景资源',
    text: '产业资本和高危工业客户资源能降低试点与复制成本，但要继续验证其是否转化为真实订单、复购和回款。',
    refs: ['officialA3', 'krA3', 'sinaB1'],
  },
];

const moatProductAdvantages = [
  {
    step: 'A1',
    title: '重载 + 续航',
    short: '不是能跑，而是能干活',
    text: 'P1 / P2 / T1 体现的不是单纯运动能力，而是重载、续航和稳定作业能力，决定它能不能真正在高危现场长期运行。',
    refs: ['officialP1', 'officialP2', 'officialT1'],
  },
  {
    step: 'A2',
    title: '极端环境',
    short: '进得去极端场景',
    text: '防爆、防磁、防水、防冻和宽温域，说明产品不是为展示而生，而是为矿业、铝业、化工等复杂环境准备的。',
    refs: ['officialExr', 'krA3', 'officialP1', 'officialP2'],
  },
  {
    step: 'A3',
    title: '全栈自研',
    short: '本体 + 大脑 + 平台',
    text: '关节、本体、工业具身大脑和云-边-端平台连成一体，意味着具微不是单点零部件公司，而是系统型方案商。',
    refs: ['officialT1', 'hubMove', 'micvlc'],
  },
  {
    step: 'A4',
    title: '可规模复制',
    short: '一套产品能往外铺',
    text: '同一套底座如果能连接更多上装与场景，就意味着产品不只是一个项目，而是可以持续扩张的产品族。',
    refs: ['officialHome', 'hubMove', 'micvlc'],
  },
];

const moatOrbitLayers = [
  {
    step: '01',
    title: '能力壁垒',
    short: '分水岭：进得去、卖得动、落得下',
    text: '友商可以有机器人，具微要证明的是高危工业现场真的能进入、客户真的愿意买、项目真的能交付。',
    refs: ['officialHome', 'officialP1', 'officialExr', 'hubMove', 'mineRobotPilot'],
    badge: '第一层',
    points: [
      {
        title: '特种准入能力',
        text: '防爆、强磁、宽温域、IP67/IP68，决定能不能进入别人进不去的现场。',
      },
      {
        title: '营销能力',
        text: '把安全生产、无人化改造、危险岗位替代，讲成客户能立项、能采购的预算语言。',
      },
      {
        title: '落地生产能力',
        text: '从样机到交付，从单台到批量，让产品在现场稳定跑起来。',
      },
    ],
  },
  {
    step: '02',
    title: '品牌壁垒',
    short: '分水岭：客户是否优先相信你',
    text: 'B2B 特种工业的品牌不是流量，而是客户在危险场景采购时，是否先相信具微更专业、更可靠。',
    refs: ['officialExr', 'officialA3', 'krA3'],
    badge: '第二层',
    points: [
      {
        title: '特种工业心智',
        text: '把具微和“高危场景机器人”绑定，形成窄而硬的专业认知。',
      },
      {
        title: '首张认证标签',
        text: '把防爆认证从技术资质，转化为客户能记住、能信任的品牌标签。',
      },
      {
        title: '头部客户背书',
        text: '产业客户和示范项目越多，后来者越难重新建立同等信任。',
      },
    ],
  },
  {
    step: '03',
    title: '规模壁垒',
    short: '分水岭：越部署，越难被追上',
    text: '规模不是简单卖得多，而是场景、数据、客户网络一起积累，让后来的友商复制成本越来越高。',
    refs: ['sinaA2', 'officialA2', 'officialHome', 'reportCalc'],
    badge: '第三层',
    points: [
      {
        title: '场景复制壁垒',
        text: '矿业、化工、石油石化等场景越多，产品包越容易标准化复制。',
      },
      {
        title: '数据沉淀壁垒',
        text: '真实高危现场数据持续回流，仿真和实验室很难替代。',
      },
      {
        title: '客户网络壁垒',
        text: '头部客户、复购机会和行业口碑累积后，后来者更难切入。',
      },
    ],
  },
];

const moatPillars = [
  {
    step: '01',
    title: '技术壁垒',
    tagline: '进得去极端现场',
    summary: '友商能做机器人，具微要证明的是：机器人能不能真正进入防爆、强磁、宽温域等高危工业现场。',
    points: ['防爆准入', '强磁适应', '重载续航', '全栈自研'],
    refs: ['officialP1', 'officialP2', 'officialExr', 'micvlc'],
  },
  {
    step: '02',
    title: '市场壁垒',
    tagline: '被客户优先信任',
    summary: '高危工业客户买的不是一台会走路的机器，而是安全生产确定性、责任可追溯和稳定交付。',
    points: ['特种工业心智', '头部客户背书', '政策刚需', '场景资源'],
    refs: ['officialA2', 'officialA3', 'krA3', 'mineRobotPilot'],
  },
  {
    step: '03',
    title: '规模与成本壁垒',
    tagline: '越部署越难复制',
    summary: '一旦真实场景持续落地，数据、交付经验、供应链协同和客户网络会一起积累，形成复利。',
    points: ['场景复制', '数据沉淀', '供应链协同', '交付 know-how'],
    refs: ['officialHome', 'hubMove', 'micvlc', 'reportCalc'],
  },
];

const moatPyramidLayers = [
  {
    level: '顶层',
    title: '规模与数据壁垒',
    thesis: '真实场景越多，数据、订单和产能越能形成复利。',
    points: ['近千场景真机数据', '年产2000套产能', '数亿元在手订单'],
    refs: ['officialHome', 'officialA2', 'sinaA2', 'reportCalc'],
  },
  {
    level: '中层',
    title: '市场与资质壁垒',
    thesis: '资质决定入场资格，大客户决定示范效应。',
    points: ['全球首张防爆认证', '唯一1000Gs强磁测试', '神火 / 魏桥等大客户绑定'],
    refs: ['officialExr', 'krA3', 'officialA3'],
  },
  {
    level: '底层',
    title: '产品技术壁垒',
    thesis: '底层技术决定机器人能不能在极端现场稳定作业。',
    points: ['扁线关节JW106P（效率90%）', '感控驱一体化', '400kg负载', 'MTBF 3000h'],
    refs: ['officialT1', 'officialP1', 'officialP2', 'micvlc'],
  },
];

const investorMoatChecks = [
  '是否提高客户切换成本',
  '是否带来更高议价权',
  '是否随部署规模增强',
  '是否让竞品难以低价复制',
];

const businessModelCards = [
  {
    title: '硬件本体',
    text: 'P1/P2/T1 作为进入客户现场的基础收入来源，也是后续上装、软件和运维的入口。',
    refs: ['officialP1', 'officialP2', 'officialT1'],
  },
  {
    title: '上装模块',
    text: '机械臂、云台、声纹相机、消防水炮等上装把底盘变成场景解决方案，有机会提高项目客单价。',
    refs: ['officialHome'],
  },
  {
    title: '软件平台',
    text: 'HUB/MOVE/MicVLC 对应设备管理、运动控制和工业具身大脑，长期空间在软件化与数据化。',
    refs: ['hubMove', 'micvlc'],
  },
  {
    title: '运维服务',
    text: '高危工业客户重视可用率和安全责任，运维 SLA、备件、现场服务有机会形成持续收入。',
    refs: ['officialExr', 'reportCalc'],
  },
];

const businessCanvasBlocks = [
  {
    key: 'partners',
    title: '重要伙伴',
    bullets: ['上游锁供应链伙伴（正强+壹连）','下游应用场景伙伴（魏桥+滨化+神火）','资本资源（国资+市场化）'],
  },
  {
    key: 'activities',
    title: '关键业务',
    bullets: ['特种机器狗研发与制造', '工业具身大脑开发', '极端工况数据集构建', '产品销售与方案交付'],
  },
  {
    key: 'resources',
    title: '核心资源',
    bullets: ['资质准入', '自研技术', ' 独家数据', '客户绑定','核心团队'],
  },
  {
    key: 'value',
    title: '价值主张',
    featured: true,
    bullets: ['用价性比高的机器狗，解决“人进不去、人不愿去”的极端场景作业问题','个性化工厂定制'],
    
  },
  {
    key: 'relationships',
    title: '客户关系',
    bullets: ['提供定制化服务','助手+顾问+合伙人'],
  },
  {
    key: 'channels',
    title: '渠道通路',
    bullets: ['线下体验店 ','大客户深度合作','产业生态协同'],
  },
  {
    key: 'segments',
    title: '客户细分',
    bullets: ['B端特种工业企业'],
  },
  {
    key: 'costs',
    title: '成本结构',
    bullets: ['研发与算法投入', '核心部件与整机制造', '认证、测试与场景改造', '项目交付、售后与运维'],
  },
  {
    key: 'revenue',
    title: '收入来源',
    featured: true,
    bullets: ['卖机器狗硬件', '卖解决方案与服务', '“卖算法、卖服务”的订阅制模式'],
  },
];

const capitalQuestions = [
  {
    q: 'Q1',
    title: '资本化',
    status: '部分具备',
    tone: 'amber',
    scoreLabel: '资本化总分',
    score: '8/10',
    scoreParts: [
      '1. 可复制收入：3/4。具微已经不是单纯卖硬件，而是 P1/P2/ExR + HUB/MOVE + MicVLC 的组合；但公开证据仍不足以证明软件与服务收入已经稳定放大。',
      '2. 存量价值：2.5/3。设备进入特种工业场景后，天然具备持续服务、持续运维和持续数据回流的想象空间，但订阅、留存、复购和切换成本还需要继续验证。',
      '3. 关键节点议价权：2.5/3。防爆准入、1000Gs 强磁、四防和特种工业入口，让具微卡在稀缺且带排他性的节点上，这是目前最强的资本化部分。',
    ],
    summary: '结论：具微的资本化入口已经成立，但真正跑通还要看复制、存量和议价权是否持续兑现。',
    refs: ['officialP1', 'officialP2', 'officialExr', 'hubMove', 'micvlc', 'officialA3'],
  },
  {
    q: 'Q2',
    title: '资产',
    status: '部分具备',
    tone: 'amber',
    scoreLabel: '资产化总分',
    score: '6.5/10',
    scoreParts: [
      '1. 技术专利：1.5/2.5。具微有本体、关节和平台叙事，但技术专利绕不开程度仍需核验。',
      '2. 客户关系/客户资源：1.5/2.5。具微有神火、魏桥、滨化等产业入口，但复购、回款和流程绑定还要验证。',
      '3. 定价权资产：2/2.5。具微的防爆准入、强磁能力、四防和特种工业可靠性交付，有机会让客户愿意为安全生产支付溢价。',
      '4. 复利资产：1.5/2.5。HUB/MOVE/MicVLC 给了数据飞轮和网络效应入口，但订阅留存、数据回流和规模增值仍需验证。',
    ],
    summary: '结论：具微已经有资产化方向，但最像资产的是资质带来的定价权；客户、专利、数据和品牌还需要继续通过转换成本、复购和复利增长来坐实。',
    refs: ['hubMove', 'micvlc', 'officialA3', 'officialExr', 'micbotPatentT'],
  },
  {
    q: 'Q3',
    title: '产业链',
    status: '具备',
    tone: 'green',
    scoreLabel: '产业链总分',
    score: '7.5/10',
    scoreParts: [
      '1. 产业链位置：2.5/3。具微不在上游零部件，也不只是下游应用端，而是卡在“特种工业移动作业系统集成 + 场景准入交付”这个中间偏下游的位置，离客户场景更近。',
      '2. 利润池距离：2/2.5。它比普通机器人厂商更接近高价值场景的利润池，但如果仍以硬件项目制为主，利润还是会受 BOM、交付和定制化拖累。',
      '3. 核心资源距离：2/2.5。它靠近防爆准入、高危客户、极端工况数据这些核心资源，这些资源比参数更稀缺，也更难被短期复制。',
      '4. 议价权与现金流：1/2。准入型议价权已经出现雏形，但真正的现金流质量还要继续看验收、回款、复购和软件/运维收入占比。',
    ],
    summary: '结论：具微已经卡在产业链里的关键位置，离客户和核心资源都比较近；但利润分配和现金流质量，还要靠标准化、复购和服务化收入继续坐实。',
    refs: ['officialP1', 'officialP2', 'officialExr', 'krA3', 'officialA3', 'hubMove'],
  },
  {
    q: 'Q4',
    title: '壁垒',
    status: '具备',
    tone: 'green',
    scoreLabel: '结构性壁垒总分',
    score: '8/10',
    scoreParts: [
      '1. 网络效应：1.5/2。特种工业不是典型消费互联网，但具微若能把多场景、多客户、多数据接进同一平台，体验和效率会随使用提升；目前更像弱网络效应和平台效应的早期形态。',
      '2. 准入壁垒：2.5/2.5。防爆认证、1000Gs 强磁、四防和特种场景准入，是别人短期拿不到、也不容易绕过去的强壁垒。',
      '3. 数据飞轮：1.5/2。HUB / MOVE / MicVLC 提供了数据闭环入口，理论上可越用越准，但公开资料还不足以证明飞轮已经完全跑起来。',
      '4. 转换成本：1.3/1.5。产品一旦嵌入客户巡检、运维和调度流程，切换供应商就会付出时间、合规和安全成本，转换成本会逐步抬升。',
      '5. 品牌心智：1.2/1。B2B 品牌不是知名度，而是“安全、可靠、能交付”的心智；具微正在建立特种工业第一心智，但还需更多标杆案例坐实。',
    ],
    summary: '结论：具微最强的是准入壁垒，其次是转换成本和数据飞轮；网络效应和品牌心智还在形成阶段，但已经有结构性壁垒的雏形。',
    refs: ['officialExr', 'hubMove', 'micvlc', 'officialP1', 'officialP2'],
  },
  {
    q: 'Q5',
    title: '估值',
    status: '部分具备',
    tone: 'amber',
    scoreLabel: '估值总分',
    score: '6.5/10',
    scoreParts: [
      '1. 当前节点：2/2.5。具微已经不是“只有概念”的早期项目，公开订单、营收口径和产品落地，说明它站在“有人愿意付钱”的节点上。',
      '2. 这轮融资要带到哪：1.5/2.5。资金更像是把公司从“标杆项目”推到“可复制项目”，核心任务是把获客、交付、回款和软件化能力做成可重复模板。',
      '3. 下一节点的估值逻辑：1.5/2。下一轮估值不再只看单个订单，而是看获客模型是否可复制、单位经济模型是否稳定，以及毛利是否能随规模趋势性改善。',
      '4. 跨品类跨区域扩张：1.5/2。若能从巡检扩展到消防、危化、矿山、公共安全，并保持同一底盘、同一平台和同一交付体系，品牌和公司才有承载更大规模的能力。',
    ],
    summary: '结论：具微现在站在“有人愿意付钱、已有订单验证”的节点上；这轮融资的意义，是把它推到“可复制获客 + 稳定毛利 + 可扩张品牌”的下一节点。',
    refs: ['officialA2', 'sinaA2', 'reportCalc', 'officialP1', 'officialP2', 'hubMove'],
  },
  {
    q: 'Q6',
    title: '终局',
    status: '部分具备',
    tone: 'amber',
    summary: '可以特种工业平台型公司，但是否能成为终局玩家，还取决于规模、品牌和数据能否继续累积。',
    refs: ['idc', 'smartMineMarket'],
  },
  {
    q: 'Q7',
    title: '团队',
    status: '待验证',
    tone: 'slate',
    summary: '能力画像有亮点，但产品、市场、组织三场硬仗是否都能打赢，还需要更多公开材料和结果验证。',
    refs: ['krA3', 'officialA3'],
  },
];

const assetQuestions = [
  {
    q: 'Q1',
    title: '专利',
    status: '部分具备',
    tone: 'amber',
    summary: '有公开专利线索和本体/平台叙事，但核心算法、关节模组和是否绕不开，还要继续核验。',
    refs: ['micbotPatentT', 'officialT1'],
  },
  {
    q: 'Q2',
    title: '客户',
    status: '部分具备',
    tone: 'amber',
    summary: '魏桥、滨化、神火等产业客户和场景资源说明客户入口存在，但复购、回款和切换成本仍需验证。',
    refs: ['officialA3', 'krA3', 'officialA2'],
  },
  {
    q: 'Q3',
    title: '资质',
    status: '具备',
    tone: 'green',
    summary: '防爆、四防、1000Gs 强磁和特种场景准入，是最接近结构性壁垒、也最像资产的部分。',
    refs: ['officialExr', 'krA3'],
  },
  {
    q: 'Q4',
    title: '数据',
    status: '部分具备',
    tone: 'amber',
    summary: 'HUB / MOVE / MicVLC 给了数据闭环入口，但在线率、任务完成率、故障间隔和模型效果还需要更多证据。',
    refs: ['micvlc', 'hubMove'],
  },
  {
    q: 'Q5',
    title: '品牌',
    status: '待验证',
    tone: 'slate',
    summary: 'B2B 品牌不是知名度，而是安全、可靠、可交付的心智；具微正在建立，但还没到完全坐实阶段。',
    refs: ['officialP1', 'officialP2', 'officialExr'],
  },
];

const endgameLogic = [
  {
    title: '今天站在哪个节点',
    text: '具微当前最适合被定位为“特种工业重载轮足作业平台”的早期放大阶段：已有产品、融资、场景和订单口径，但仍在从项目制走向标准化复制。',
    refs: ['officialP1', 'officialP2', 'officialA2', 'ofweekB1'],
  },
  {
    title: '这一轮融资要带到哪个节点',
    text: '从“能做标杆项目”推到“能稳定复制项目”：量产良率、证书适用范围、前 20 大客户回款、运维 SLA、软件平台数据指标需要量化。',
    refs: ['officialA3', 'hubMove', 'micvlc'],
  },
  {
    title: '下一个估值逻辑是什么',
    text: '能证明场景包复用、客户锁定、数据飞轮和特种准入，估值逻辑可能从硬件公司切到工业具身平台。',
    refs: ['reportCalc', 'unitreeIpo', 'deepIpo'],
  },
];

const tractionRows = [
  ['2026-01', 'A轮', '近亿元', '36氪报道，正强股份领投等', ['krA']],
  ['2026-02', 'A+ / A++', '数千万元 / 累计口径存在冲突', '公司公告与融资稿口径需交割文件核验', ['officialAPlus', 'officialA2']],
  ['2026-04-22', 'A+++', '四轮合计数亿元', '36氪与官网公告，魏桥、滨化等产业资本', ['officialA3', 'krA3']],
  ['2026-06-26', 'B1', '媒体称数亿元，估值近40亿元', '媒体转述，未见正式公告核验', ['ofweekB1', 'qqB1']],
];

const scaleSteps = [
  { title: '产品标准化', text: '把 P1/P2/ExR 的型号、BOM、上装、软件版本和降额曲线固化，减少项目制改造。', icon: Wrench },
  { title: '认证闭环', text: '防爆、矿安、IIC、IECEx、ATEX 等证书需要覆盖真实交付配置和生产一致性。', icon: BadgeCheck },
  { title: '制造与交付', text: '验证产线、良率、交期、备件、SLA 与售后成本，避免订单增长被交付能力吞掉。', icon: Workflow },
  { title: '客户复制', text: '把电解铝、石化、消防、公安等标杆点位变成可复用方案包，而非每单重新工程化。', icon: Target },
  { title: '数据与软件', text: '设备在线率、任务完成率、故障间隔和算法迭代数据，是从硬件毛利走向平台价值的证据。', icon: LineChart },
];

const evidenceItems = [
  ['公司官网', '产品参数、发展历程、平台发布、防爆产品发布、应用场景', ['officialHome', 'officialP1', 'officialP2', 'officialExr']],
  ['36氪 / OFweek / 腾讯新闻', '融资、估值、订单、收入、创始人访谈等媒体口径', ['krA', 'krA3', 'ofweekB1', 'qqB1']],
  ['IDC', '2024 全球四足机器人市场规模、出货量和消费/商用结构', ['idc']],
  ['本地行研计算', '商用出货推算、载荷/重量比、估值收入倍数敏感性', ['reportCalc']],
];

const overviewCards = [
  {
    id: 'industry',
    eyebrow: 'Industry Logic',
    title: '行业逻辑',
    text: '先判断行业终局：四足/轮足机器人是否会在高危工业场景形成头部方案商。',
  },
  {
    id: 'business',
    eyebrow: 'Business Logic',
    title: '商业逻辑',
    text: '再判断业务是否能成立：有人付钱、获客可复制、单位经济模型不崩、客户不轻易流失。',
  },
  {
    id: 'capitalization',
    eyebrow: 'Capital Logic',
    title: '资本逻辑',
    text: '重点回答资本化七问：能不能复制、能不能锁定、能不能形成议价权，以及未来能否走向更大的资产和规模。',
  },
  {
    id: 'assets',
    eyebrow: 'Assets',
    title: '资产壁垒',
    text: '穿透专利、资质、客户、数据、品牌是否真能成为资产，而不是宣传词。',
  },
  {
    id: 'endgame',
    eyebrow: 'Endgame',
    title: '终局与团队',
    text: '解释五年后凭什么值更高：站在哪个节点、融资带到哪个节点、团队能否活到终局。',
  },
  {
    id: 'evidence',
    eyebrow: 'Evidence',
    title: '来源与信任',
    text: '把所有关键判断挂到来源索引，展示融资岗对证据口径和可信度分层的敏感度。',
  },
];

function Ref({ ids, children }) {
  const list = Array.isArray(ids) ? ids : [ids];
  return (
    <span className="ref-wrap">
      {children ? <span>{children}</span> : null}
      {list.map((id) => {
        const item = sourceRegistry[id];
        if (!item) return null;
        return (
          <a
            className={`ref-chip ${item.type.includes('媒体转述') ? 'weak' : ''}`}
            href={item.url}
            target={item.url.startsWith('#') ? undefined : '_blank'}
            rel={item.url.startsWith('#') ? undefined : 'noreferrer'}
            title={`${item.name}｜${item.note}`}
            key={id}
          >
            {item.id}
          </a>
        );
      })}
    </span>
  );
}

function SourcePill({ children, tone = 'neutral' }) {
  return <span className={`source-pill ${tone}`}>{children}</span>;
}

function PageShell({ eyebrow, title, intro, children, featuredTitle = false, className = '', beforeHead = null }) {
  return (
    <div className={`page-shell page-only ${className}`}>
      <section className="section page-section">
        <div className={`section-head ${eyebrow ? '' : 'no-eyebrow'} ${featuredTitle ? 'feature-head' : ''}`}>
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h2>{title}</h2>
          {intro ? (typeof intro === 'string' ? <p>{intro}</p> : intro) : null}
        </div>
        {beforeHead}
        {children}
      </section>
      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  return (
    <footer>
      <span>MICBOT BP Site / Public-information financing narrative</span>
      <a href="#overview">
        回到首页
        <ArrowUpRight size={16} />
      </a>
    </footer>
  );
}

function OverviewPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <img src={heroImage} alt="" />
          <div className="hero-scanline" />
        </div>
        <div className="hero-content">
          <div className="hero-copy">
            <SourcePill tone="glass">一些研究</SourcePill>
            <h1>具微科技 MICBOT</h1>
            <p className="hero-subtitle">
              特种工业场景，以钢铁之躯“替人冒险”。
            </p>
          </div>
        </div>
      </section>

      <div className="page-shell">
        <section className="section overview-section">
          <div className="overview-grid">
            {overviewCards.map((card) => (
              <a className="overview-card" href={`#${card.id}`} key={card.id}>
                <small>{card.eyebrow}</small>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <span>
                  查看页面
                  <ArrowRight size={16} />
                </span>
              </a>
            ))}
          </div>
        </section>
        <SiteFooter />
      </div>
    </>
  );
}

function IndustryPage() {
  return (
    <PageShell
      eyebrow={null}
      featuredTitle
      title="1.1 特种机器人市场空间正加速打开"
      intro="高危工业正在从“人进现场”转向“机器先进现场”"
      className="industry-dark-page"
    >
      <div className="logic-grid industry-accordion-grid">
        {industryLogic.map((item) => (
          <article key={item.title} tabIndex="0">
            <small>{item.group}</small>
            <h3>{item.title}</h3>
            <p>
              {item.text}
              <Ref ids={item.refs} />
            </p>
          </article>
        ))}
      </div>
      <section className="market-tree">
        <div className="market-tree-head">
          <small>MARKET FORECAST</small>
          <h3>行业即将进入爆发期，头部企业推动产业创新，将引领千亿市场。</h3>
        </div>
        <div className="market-tree-map">
          <div className="market-tree-root">
            <span>智慧矿山市场预测</span>
            <strong>千亿级空间正在打开</strong>
            <small>
              新华财经 / 行业蓝皮书口径
              <Ref ids={['smartMineMarket']} />
            </small>
          </div>
          <div className="market-tree-branches">
            <article>
              <span>2025E</span>
              <strong>670亿</strong>
              <small>
                智慧矿山市场预测
                <Ref ids={['smartMineMarket']} />
              </small>
            </article>
            <article className="market-tree-emphasis">
              <span>2035E</span>
              <strong>1200亿+</strong>
              <small>
                智慧矿山市场预测
                <Ref ids={['smartMineMarket']} />
              </small>
            </article>
            <article>
              <span>政策催化</span>
              <strong>2026年5月</strong>
              <small>
                矿山机器人验证试点政策发布
                <Ref ids={['mineRobotPilot']} />
              </small>
            </article>
            <article>
              <span>岗位替代</span>
              <strong>险累苦脏</strong>
              <small>
                高危岗位机器替代方向明确
                <Ref ids={['mineRobotPilot']} />
              </small>
            </article>
          </div>
        </div>
      </section>
      <div className="industry-verdict">
        <Sparkles size={24} />
        <div className="industry-verdict-copy">
          <h3>行业逻辑结论：机会成立，下一步验证具微能否占住入口</h3>
          <p>
            这一页只证明赛道机会：高危工业正在从“人进现场”转向“机器先进现场”。接下来要判断的不是机器狗参数是否漂亮，而是具微能否用产品、客户、准入、数据和交付能力占住“高危工业移动作业入口”。
            <Ref ids={['mineRobotPilot', 'smartMineMarket', 'officialP1', 'officialP2']} />
          </p>
        </div>
      </div>
    </PageShell>
  );
}

function BusinessNavTabs() {
  const currentPage = getPageFromHash();

  return (
    <div className="business-anchor-nav" aria-label="商业逻辑子栏目">
      {businessSectionNav.map(([label, id]) => (
        <a className={currentPage === id ? 'active' : ''} href={`#${id}`} key={id}>
          {label}
        </a>
      ))}
    </div>
  );
}

function BusinessShell({ title, intro, children }) {
  return (
    <PageShell
      eyebrow={null}
      featuredTitle
      title={title}
      intro={intro}
      className="industry-dark-page business-dark-page"
      beforeHead={<BusinessNavTabs />}
    >
      {children}
    </PageShell>
  );
}

function BusinessPage() {
  return (
    <BusinessShell
      title="商业逻辑：从“能卖产品”到“能复制交付”"
      intro="需求、交付、盈利和客户粘性形成可规模化的业务闭环"
    >
      <section className="business-section">
        <div className="business-section-head">
          <span>BUSINESS MODULES</span>
          <h3>把商业逻辑拆成六个独立判断页</h3>
        </div>
        <div className="business-module-grid">
          {businessSectionNav.map(([label, id], index) => (
            <a href={`#${id}`} key={id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h4>{label}</h4>
              <p>
                {[
                  '先证明客户为什么买，以及采购背后的安全生产与无人化改造需求。',
                  '再说明具微用什么产品组合解决问题，而不是只展示单台机器。',
                  '用竞品对照说明具微的差异化切口到底在哪里。',
                  '判断哪些能力能沉淀为客户切换成本和结构性壁垒。',
                  '拆清收入来源：硬件、上装、软件和运维如何共同组成生意。',
                  '用公开数据承接订单、营收、出货预期和落地进展。',
                ][index]}
              </p>
            </a>
          ))}
        </div>
      </section>
    </BusinessShell>
  );
}

function BusinessPainPage() {
  return (
    <BusinessShell
      title="2.1 用户痛点与需求"
      intro={
        <details className="section-intro-details">
          <summary>矿业、铝业、化工等特种行业需要机器替人进入危险现场。</summary>
          <p>
            矿业、铝业、化工等行业有高度共性：环境极端、人力短缺、安全风险高。国家矿山安全监察局与工信部于2026年5月联合发文，明确提出加快矿山机器人研发与规模化应用，推动“险、累、苦、脏”岗位实施机器替代。
            <Ref ids={['mineRobotPilot']} />
          </p>
        </details>
      }
    >
      <section className="business-section">
        <div className="demand-analysis-grid">
          {[
            {
              k: '01',
              title: '环境极端',
              text: '矿山、铝业、化工现场通常伴随高温、粉尘、易燃易爆、复杂地形等问题，人进去成本高、风险高。',
              refs: ['mineRobotPilot', 'officialHome'],
              image: productImages[3],
            },
            {
              k: '02',
              title: '人力短缺',
              text: '高危、脏累岗位招人难、留人难。机器替代不是单纯省人工，而是让现场作业更稳定、更可持续。',
              refs: ['mineRobotPilot'],
              image: productImages[4],
            },
            {
              k: '03',
              title: '安全风险高',
              text: '客户真正买的是安全生产确定性：少让人暴露在危险现场，降低事故责任、停机损失和应急压力。',
              refs: ['officialP1', 'officialP2', 'officialExr'],
              image: productImages[5],
            },
          ].map((item) => (
            <article key={item.title}>
              <div className="demand-card-image">
                <img src={item.image} alt={item.title} />
              </div>
              <span>{item.k}</span>
              <h4>{item.title}</h4>
              <p>
                {item.text}
                <Ref ids={item.refs} />
              </p>
            </article>
          ))}
        </div>
        <div className="demand-analysis-conclusion">
          <strong>需求结论</strong>
          <p>
            政策推动解决“能不能用”的问题，刚性痛点解决“为什么买”的问题。两者叠加，使特种机器人从概念展示进入高危工业的真实采购与规模化应用窗口。
          </p>
        </div>
      </section>
    </BusinessShell>
  );
}

function BusinessSolutionPage() {
  return (
    <BusinessShell
      title="2.2 产品与解决方案"
      intro="从单机本体走向“终端硬件 + 现场操控 + 云端管理”的高危工业无人作业系统。"
    >
      <section className="business-section">
        <div className="product-upgrade-table" aria-label="具微科技机器人产品升级表">
          <div className="product-upgrade-row product-upgrade-head">
            <span>产品图</span>
            {productUpgradeColumns.map((item) => (
              <article key={item.name}>
                <div className="product-upgrade-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <strong>{item.name}</strong>
              </article>
            ))}
          </div>

          {productUpgradeRows.map(([label, key, type]) => (
            <div className="product-upgrade-row" key={label}>
              <span>{label}</span>
              {productUpgradeColumns.map((item) => (
                <div className={`product-upgrade-cell ${type === 'text' ? 'text-cell' : ''}`} key={`${item.name}-${key}`}>
                  {type === 'text' ? (
                    <strong>
                      {item[key]}
                      <Ref ids={item.refs} />
                    </strong>
                  ) : (
                    item[key].map((value) => (
                      <em key={value}>
                        <CheckCircle2 size={15} />
                        {value}
                      </em>
                    ))
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </BusinessShell>
  );
}

function BusinessCompetitionPage() {
  return (
    <BusinessShell
      title="2.3 竞品分析与核心优势"
      intro="特种行业准入与极端环境作业"
    >
      <section className="business-section">
        <div className="compact-competition-table" aria-label="竞品对比精简版">
          <div className="compact-table-title">
            <strong>竞品对比</strong>
          </div>
          <div className="compact-competition-row compact-competition-head">
            <span>对比维度</span>
            <span>具微科技</span>
            <span>Boston Dynamics</span>
            <span>宇树科技</span>
            <span>Agility Robotics</span>
            <span>云深处科技</span>
            <span>WEILAN</span>
          </div>
          {compactCompetitorRows.map((row) => (
            <div className={`compact-competition-row ${row.highlight ? 'highlight' : ''}`} key={row.dimension}>
              <span>{row.dimension}</span>
              <span>{row.micbot}</span>
              <span>{row.boston}</span>
              <span>{row.unitree}</span>
              <span>{row.agility}</span>
              <span>{row.deep}</span>
              <span>{row.weilan}</span>
            </div>
          ))}
        </div>

        <div className="barrier-table" aria-label="具微科技不可替代的四大核心壁垒">
          <div className="compact-table-title">
            <strong>具微科技不可替代的四大核心壁垒</strong>
            <span>把优势从宣传点翻译成投资人关心的“短期难复制”</span>
          </div>
          <div className="barrier-row barrier-head">
            <span>壁垒</span>
            <span>具体表现</span>
            <span>竞品为何无法复制</span>
          </div>
          {micbotBarrierRows.map((row) => (
            <div className="barrier-row" key={row.barrier}>
              <span>{row.barrier}</span>
              <span>
                {row.performance}
                <Ref ids={row.refs} />
              </span>
              <span>{row.why}</span>
            </div>
          ))}
        </div>

      </section>
    </BusinessShell>
  );
}

function BusinessMoatPage() {
  return (
    <BusinessShell
      title="2.4 核心壁垒"
      intro="生于极端场景，长在产业一线"
      >
          <section className="business-section">
            <div className="moat-simple-system">
              <div className="moat-simple-kicker">核心壁垒体系</div>
              <div className="moat-simple-map" aria-label="具微科技核心壁垒简化分水岭">
                <div className="moat-simple-source">
                  <strong>MICBOT</strong>
                  <span>具微科技</span>
                </div>

                <div className="moat-simple-ellipse ellipse-tech">
                  <b>技术壁垒</b>
                </div>
                <div className="moat-simple-ellipse ellipse-market">
                  <b>市场壁垒</b>
                </div>
                <div className="moat-simple-ellipse ellipse-scale">
                  <b>规模壁垒 </b>
                </div>

                <div className="moat-simple-bubble simple-joint">准入资质</div>
                <div className="moat-simple-bubble simple-load">算法架构</div>
                <div className="moat-simple-bubble simple-control">核心硬件</div>

                <div className="moat-simple-bubble simple-ex">大客户深度绑定</div>
                <div className="moat-simple-bubble simple-magnet">全球首张防爆认证</div>
                <div className="moat-simple-bubble simple-client">近千场景真机数据</div>

                <div className="moat-simple-bubble simple-data">量产爬坡</div>
                <div className="moat-simple-bubble simple-capacity">组织扩容</div>
                <div className="moat-simple-bubble simple-order">全球资质</div>
              </div>

              <div className="moat-simple-caption">
                <span>产品技术打底</span>
                <ArrowRight size={18} />
                <span>市场资质放大</span>
                <ArrowRight size={18} />
                <span>规模数据形成复利</span>
                <Ref ids={['officialP1', 'officialP2', 'officialExr', 'krA3', 'officialA2', 'reportCalc']} />
              </div>
            </div>
          </section>
      </BusinessShell>
    );
  }

function BusinessModelPage() {
  return (
    <BusinessShell
      title="2.5 商业模式"
      intro="硬件打入口，软件、上装和运维决定长期价值。"
    >
      <section className="business-section">
        <div className="business-section-head">
          <span>05 / MODEL</span>
          <h3>具微科技商业模式：从硬件销售走向场景方案与持续服务</h3>
        </div>
        <div className="business-canvas">
          {businessCanvasBlocks.map((item) => (
            <article className={`business-canvas-item canvas-${item.key} ${item.featured ? 'featured' : ''}`} key={item.key}>
              <h4>{item.title}</h4>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <Ref ids={item.refs} />
            </article>
          ))}
        </div>
      </section>
    </BusinessShell>
  );
}

function BusinessTractionPage() {
  return (
    <BusinessShell
      title="运营数据与落地进展"
      intro="公开数据能证明需求存在，但要主动提示尽调边界。"
    >
      <section className="business-section">
        <div className="business-section-head">
          <span>06 / OPERATING PROGRESS</span>
          <h3>运营数据与落地进展：公开资料能支撑的商业化信号</h3>
        </div>
        <section className="business-proof-strip">
          <div className="business-proof-head">
            <span>PUBLIC BUSINESS SIGNALS</span>
            <h3>订单、营收、出货预期需要穿透验证</h3>
            <p>这些数据足以证明需求存在，：订单、营收、出货预期均需继续穿透合同、验收、回款、复购与关联交易。</p>
          </div>
          <div className="business-proof-grid">
            {businessEvidence.map((item) => (
              <article key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <small>
                  {item.note}
                  <Ref ids={item.refs} />
                </small>
              </article>
            ))}
          </div>
        </section>
      </section>
    </BusinessShell>
  );
}

function CapitalizationPage() {
  return (
    <PageShell
      title="3.1 资本逻辑：七大核心观察点"
      intro="按照资本化、资产、产业链、壁垒、估值、终局、团队这七问来拆解，判断具微科技哪些能力已经具备，哪些还在验证中。"
      featuredTitle
      className="industry-dark-page business-dark-page"
    >
      <div className="capital-hero">
        <div className="capital-hero-main">
          <span className="eyebrow">Capital Logic</span>
          <h3>能不能复制，能不能锁定，能不能越做越值钱</h3>
          <p>
            对具微来说，最强的是 Q3 产业链位置和 Q4 壁垒；Q1、Q2、Q5、Q6、Q7 目前更多是“有方向、在验证”。
          </p>
        </div>
        <div className="capital-hero-side">
          <span>Q3 / Q4 最强</span>
          <strong>产业链 + 壁垒</strong>
          <p>Q1、Q2、Q5、Q6、Q7：部分具备或待验证。</p>
        </div>
      </div>
      <div className="capital-question-list">
        {capitalQuestions.map((item) => (
          <article key={item.q} className={`capital-question-row tone-${item.tone}`}>
            <div className="capital-question-label">
              <strong>{item.q}</strong>
              <span>{item.title}</span>
            </div>
            <div className="capital-question-body">
              <div className="capital-question-head">
                <span className={`status-pill ${item.tone}`}>{item.status}</span>
                {item.score ? (
                  <span className="capital-score-pill">
                    <strong>{item.score}</strong>
                    <em>{item.scoreLabel || '评分'}</em>
                  </span>
                ) : null}
              </div>
              {item.scoreParts ? (
                <ul className="capital-score-parts">
                  {item.scoreParts.map((part) => (
                    <li key={part}>{part}</li>
                  ))}
                </ul>
              ) : null}
              <p>
                {item.summary}
                <Ref ids={item.refs} />
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="callout capital-conclusion">
        <ClipboardCheck size={24} />
        <p>整体判断：具微不是“所有项都满分”，但在 Q3 产业链位置和 Q4 壁垒上最强；资本化、资产化、估值跃迁、终局和团队这几项还需要继续用订单、回款、复购和组织能力去验证。</p>
      </div>
    </PageShell>
  );
}

function AssetsPage() {
  return (
    <PageShell
      title="4.1 资产壁垒：专利、客户、资质、数据、品牌"
      intro="按专利、客户、资质、数据、品牌五项逐一判断"
      featuredTitle
      className="industry-dark-page business-dark-page"
    >
      <div className="capital-hero">
        <div className="capital-hero-main">
          <span className="eyebrow">Asset Barrier</span>
          <h3>专利、客户、资质、数据、品牌。</h3>
          <p>
            对具微来说，最强的是资质；客户和数据有资产化方向；专利和品牌还要继续补证据。
          </p>
        </div>
        <div className="capital-hero-side">
          <span>判断方式</span>
          <strong>不是“有没有”，而是“能不能变成资产”</strong>
          <p>关键看是否能提高转化成本、形成定价权，并随着规模扩大产生复利。</p>
        </div>
      </div>
      <div className="capital-question-list">
        {assetQuestions.map((item) => (
          <article key={item.q} className={`capital-question-row tone-${item.tone}`}>
            <div className="capital-question-label">
              <strong>{item.q}</strong>
              <span>{item.title}</span>
            </div>
            <div className="capital-question-body">
              <div className="capital-question-head">
                <span className={`status-pill ${item.tone}`}>{item.status}</span>
              </div>
              <p>
                {item.summary}
                <Ref ids={item.refs} />
              </p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function EndgamePage() {
  return (
    <PageShell
      title="5.1 终局与团队"
      featuredTitle
      className="industry-dark-page business-dark-page"
    >
      <div className="endgame-summary-grid">
        {endgameLogic.map((item) => (
          <article key={item.title}>
            <small>Next Node</small>
            <h3>{item.title}</h3>
            <p>
              {item.text}
              <Ref ids={item.refs} />
            </p>
          </article>
        ))}
      </div>
      <div className="business-section-head no-section-label">
        <h3>具微科技团队</h3>
      </div>
      <div className="team-grid">
        {teamCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="team-card" key={card.name}>
              <Icon size={26} />
              <div>
                <h3>{card.name}</h3>
                <strong>{card.role}</strong>
                <p>{card.detail}</p>
                <SourcePill>
                  {card.source}
                  <Ref ids={card.refs} />
                </SourcePill>
              </div>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}

function TeamPage() {
  return (
    <PageShell
      eyebrow="04 / Team"
      title="团队：谁能把产品、场景、交付和产业资源拧成一股绳"
      intro="现有公开资料没有完整管理层名单，因此仅展示能从官网、36氪报道和行研中对应到的人与团队口径。"
    >
      <div className="team-grid">
        {teamCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="team-card" key={card.name}>
              <Icon size={26} />
              <div>
                <h3>{card.name}</h3>
                <strong>{card.role}</strong>
                <p>{card.detail}</p>
                <SourcePill>
                  {card.source}
                  <Ref ids={card.refs} />
                </SourcePill>
              </div>
            </article>
          );
        })}
      </div>
      <div className="callout">
        <ClipboardCheck size={24} />
        <p>
         
          <Ref ids={['krA3', 'officialA3']} />
        </p>
      </div>
    </PageShell>
  );
}

function WhyNowPage() {
  return (
    <PageShell
      eyebrow="01 / Pain"
      title="痛点：客户买的不是机器狗，而是安全生产和连续作业"
      intro="BP 的第一步不是讲资本，也不是堆参数，而是证明需求真实存在：高危、停机、合规、事故责任和人员暴露，是比单纯替代人工更强的购买理由。"
    >
      <div className="split-layout">
        <div className="quote-block">
          <Sparkles size={26} />
          <h3>Opening Thesis</h3>
          <p>
            具微押注的是特种工业里的“移动作业入口”：先用硬件进入高危现场，再用上装、软件和运行数据沉淀为行业方案。
            <Ref ids={['officialHome', 'hubMove', 'micvlc']} />
          </p>
        </div>
        <div className="pain-list">
          {painPoints.map((item) => (
            <article key={item.title}>
              <AlertTriangle size={20} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="metric-grid">
        {marketNumbers.map((item) => (
          <article key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
            <small>
              {item.source}
              <Ref ids={item.refs} />
            </small>
          </article>
        ))}
      </div>
      <div className="asset-row">
        <figure>
          <img src="/assets/market_structure.png" alt="2024年全球四足机器人出货结构图" />
          <figcaption>市场结构图，来源为本地行研根据 IDC 口径整理。</figcaption>
        </figure>
        <div className="market-text">
          <h3>B轮场景判断</h3>
          <p>
            具微切入的不是消费级放量，而是工业巡检、消防、公安、石化、矿山等商用场景。这里的核心问题不是“市场够不够大”，而是单个场景能否完成标准化产品包、运维服务和软件续费的复用。
            <Ref ids={['idc', 'officialHome']} />
          </p>
          <ul>
            <li>商用级出货仅约 27.9%，说明行业仍早，标杆客户的含金量高。</li>
            <li>公开订单口径若成立，需解释其与全球市场规模之间的关系。</li>
            <li>融资岗需要把“订单、收入、回款、场景、台数”拆成可核验漏斗。</li>
          </ul>
        </div>
      </div>
    </PageShell>
  );
}

function ScenarioPage() {
  return (
    <PageShell
      eyebrow="03 / Validation"
      title="验证：从“能演示”到“能采购、能交付、能复购”"
      intro="这一页把场景、竞品、护城河和商业口径放在一起看：不是全部都已被证明，而是区分哪些已有公开证据，哪些需要尽调继续核验。"
    >
      <div className="scenario-grid">
        {scenarioCards.map((item) => (
          <article key={item.title}>
            <small>{item.budget}</small>
            <h3>{item.title}</h3>
            <p>
              {item.text}
              <Ref ids={item.refs} />
            </p>
          </article>
        ))}
      </div>
      <div className="callout">
        <ClipboardCheck size={24} />
        <p>
          面试表达可以这样收束：场景验证不是列客户 Logo，而是把每个项目拆成“需求强度、准入门槛、标准化程度、交付周期、回款质量、复购可能性”。如果这六项能被证明，资本逻辑就自然成立。
          <Ref ids={['officialHome', 'officialA2', 'krA']} />
        </p>
      </div>
      <div className="advantage-grid">
        {advantageTiles.map((item) => (
          <article key={item.title}>
            <strong>{item.value}</strong>
            <h3>{item.title}</h3>
            <p>
              {item.text}
              <Ref ids={item.refs} />
            </p>
          </article>
        ))}
      </div>
      <div className="competition-conclusion">
        <article>
          <CheckCircle2 size={22} />
          <h3>已经可以形成的验证判断</h3>
          <p>
            具微适合被讲成特种工业里的重载作业平台，而不是普通巡检机器狗。公开产品参数、P1-ExR 防爆叙事、上装与软件平台，让“高危场景解决方案”比单纯硬件展示更有 BP 说服力。
          </p>
        </article>
        <article>
          <AlertTriangle size={22} />
          <h3>仍需尽调穿透的反证风险</h3>
          <p>
            订单、收入、估值、认证范围和组合工况不能只看宣传口径；需要进一步核验客户验收、回款、复购、真实配置证书和连续运行数据。
          </p>
        </article>
      </div>
    </PageShell>
  );
}

function MarketPage() {
  return (
    <PageShell
      eyebrow="03 / Market"
      title="市场机会：数量在消费级，价值密度在商用级"
      intro="IDC 2024 口径显示四足机器人仍是早期市场。B轮投资判断不应只看 TAM 大词，而要看商用级客户是否能形成高客单价、复购和运维收入。"
    >
      <div className="metric-grid">
        {marketNumbers.map((item) => (
          <article key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
            <small>
              {item.source}
              <Ref ids={item.refs} />
            </small>
          </article>
        ))}
      </div>
      <div className="asset-row">
        <figure>
          <img src="/assets/market_structure.png" alt="2024年全球四足机器人出货结构图" />
          <figcaption>市场结构图，来源为本地行研根据 IDC 口径整理。</figcaption>
        </figure>
        <div className="market-text">
          <h3>B轮市场判断</h3>
          <p>
            具微切入的不是消费级放量，而是工业巡检、消防、公安、石化、矿山等商用场景。这里的核心问题不是“市场够不够大”，而是单个场景能否完成标准化产品包、运维服务和软件续费的复用。
            <Ref ids={['idc', 'officialHome']} />
          </p>
          <ul>
            <li>商用级出货仅约 27.9%，说明行业仍早，标杆客户的含金量高。</li>
            <li>公开订单口径若成立，需解释其与全球市场规模之间的关系。</li>
            <li>融资岗需要把“订单、收入、回款、场景、台数”拆成可核验漏斗。</li>
          </ul>
        </div>
      </div>
    </PageShell>
  );
}

function ProductPage() {
  return (
    <PageShell
      eyebrow="02 / Solution"
      title="方案：从单机本体走向“本体 + 上装 + 软件 + 数据”的工业作业系统"
      intro="融资 BP 里的方案页不是官网橱窗，而是回答一个问题：具微的工程产品凭什么承接前面的高危工业痛点，并转化为可复制订单、持续服务和更高估值。"
    >
      <div className="product-lead">
        <div>
          <span className="eyebrow">Product Thesis</span>
          <h3>具微的产品线应该被讲成一套工业作业系统</h3>
          <p>
            P1/P2/T1 提供本体能力，P1-ExR 承接防爆准入，上装模块提升项目客单价，HUB/MOVE/MicVLC 则把硬件部署延伸为设备管理、运动控制和数据闭环。
            <Ref ids={['officialP1', 'officialP2', 'officialT1', 'officialExr', 'hubMove', 'micvlc']} />
          </p>
        </div>
        <div className="product-thesis-metric">
          <strong>四层产品栈</strong>
          <span>本体 / 特种 / 上装 / 软件</span>
        </div>
      </div>

      <div className="product-matrix">
        {productMatrix.map((item) => (
          <article key={item.name}>
            <div className="product-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="product-copy">
              <small>{item.role}</small>
              <h3>{item.name}</h3>
              <p>
                {item.line}
                <Ref ids={item.refs} />
              </p>
              <div className="product-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="product-body">
        <div className="product-spec-table">
          <div className="product-spec-row product-spec-head">
            <span>指标</span>
            <span>公开口径</span>
            <span>BP 解读</span>
            <span>来源</span>
          </div>
          {productSpecRows.map(([label, value, note, refs]) => (
            <div className="product-spec-row" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <span>{note}</span>
              <span className="table-ref-cell">
                <Ref ids={refs} />
              </span>
            </div>
          ))}
        </div>

        <div className="product-layer-list">
          {productLayers.map((layer) => (
            <article key={layer.title}>
              <h3>{layer.title}</h3>
              <p>
                {layer.text}
                <Ref ids={layer.refs} />
              </p>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function CompetitionPage() {
  return (
    <PageShell
      title="竞争分析：具微不和通用机器狗拼热闹，而是拼重载和特种工况"
      intro="融资视角下，竞品比较不只是参数高低，而是产品能力能否支撑客户预算、订单质量、场景复制和估值解释。"
    >
      <div className="advantage-hero">
        <div>
          <span className="eyebrow">MICBOT Advantage</span>
          <h3>具微的核心差异化是“重载轮足 + 极端工况 + 场景资本”</h3>
          <p>
            宇树更强在规模与速度，云深处更强在巡检落地与 IPO 信息透明度，Spot/ANYmal 更强在全球标杆和成熟生态。具微适合被讲成特种工业里的重载作业平台，而不是普通巡检机器狗。
            <Ref ids={['officialP1', 'officialP2', 'unitreeB2', 'deepX30', 'spot', 'anymal']} />
          </p>
        </div>
        <div className="advantage-score">
          <strong>200kg+</strong>
          <span>公开行走载荷口径</span>
          <small>相对主流竞品 14-40kg 级载荷更突出</small>
        </div>
      </div>

      <div className="advantage-grid">
        {advantageTiles.map((item) => (
          <article key={item.title}>
            <strong>{item.value}</strong>
            <h3>{item.title}</h3>
            <p>
              {item.text}
              <Ref ids={item.refs} />
            </p>
          </article>
        ))}
      </div>

      <div className="comparison-table">
        <div className="comparison-row comparison-head">
          <span>公司/产品</span>
          <span>融资阶段</span>
          <span>重量</span>
          <span>载荷</span>
          <span>速度/续航</span>
          <span>防护与场景</span>
          <span>来源</span>
        </div>
        {competitorRows.map((row) => (
          <div className={`comparison-row ${row.advantage ? 'highlight' : ''}`} key={`${row.company}-${row.product}`}>
            <span>
              <strong>{row.company}</strong>
              <small>{row.product}</small>
            </span>
            <span>{row.stage}</span>
            <span>{row.weight}</span>
            <span>{row.payload}</span>
            <span>
              {row.speed}
              <small>{row.endurance}</small>
            </span>
            <span>
              {row.protection}
              <small>{row.angle}</small>
            </span>
            <span className="table-ref-cell">
              <Ref ids={row.refs} />
            </span>
          </div>
        ))}
      </div>

      <div className="competition-conclusion">
        <article>
          <CheckCircle2 size={22} />
          <h3>融资材料里应该怎么讲优势</h3>
          <p>
            不讲“机器狗参数全面领先”，而讲“在需要带重型上装、进入危险环境、连续作业的工业现场，具微的产品定义更贴近高客单价预算”。优势来自定位选择，而不是泛化性能。
          </p>
        </article>
        <article>
          <AlertTriangle size={22} />
          <h3>同时要主动承认的反证风险</h3>
          <p>
            宇树、云深处已有更强资本市场披露或收入验证；具微的订单、估值、认证范围和组合工况仍需穿透。优势要落到证书、客户验收、回款、复购和连续运行数据。
          </p>
        </article>
      </div>
    </PageShell>
  );
}

function MoatPage() {
  return (
    <PageShell
      eyebrow="06 / Moat"
      title="护城河：不是单点参数，而是“极端工况入口 + 工业数据闭环”"
      intro="公开参数让具微有辨识度，但真正的壁垒需要在组合工况、认证范围、客户运行数据和交付体系里被验证。"
    >
      <div className="moat-grid">
        {moatItems.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title}>
              <div className="moat-title">
                <Icon size={24} />
                <h3>{item.title}</h3>
              </div>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <div className="asset-row reverse">
        <figure>
          <img src="/assets/speed_payload_scatter.png" alt="速度与载荷对比散点图" />
          <figcaption>P1/P2 的载荷位置来自公司标称参数，竞品来自公开产品页。</figcaption>
        </figure>
        <div className="spec-panel">
          <h3>P1/P2 公开参数信号</h3>
          <div className="spec-grid">
            <span>行走载荷</span>
            <strong>&gt;=200kg</strong>
            <span>静态载荷</span>
            <strong>&gt;=400kg</strong>
            <span>续航</span>
            <strong>空载≤12h / 满载≤8h</strong>
            <span>防护</span>
            <strong>本体IP67 / 轮部IP68</strong>
            <span>温域</span>
            <strong>-40℃ 至 85℃</strong>
          </div>
          <p>
            以上均为公司产品页或融资稿口径，不能替代第三方组合工况测试。
            <Ref ids={['officialP1', 'officialP2', 'officialA2']} />
          </p>
        </div>
      </div>
    </PageShell>
  );
}

function CapitalPage() {
  return (
    <PageShell
      eyebrow="05 / Finance & Capital"
      title="财务资本：融资节奏、订单口径与 B 轮资金用途"
      intro="在痛点、方案、验证和团队之后，再进入财务资本会更自然：公开信息显示具微在 2026 年经历密集融资，订单与收入相关表述也非常激进，因此需要拆解产业资本、估值、收入确认、回款和 1 到 N 里程碑。"
    >
      <div className="traction-layout">
        <div className="traction-table">
          <div className="table-row table-head">
            <span>时间</span>
            <span>轮次</span>
            <span>金额口径</span>
            <span>备注</span>
            <span>来源</span>
          </div>
          {tractionRows.map((row) => (
            <div className="table-row" key={`${row[0]}-${row[1]}`}>
              {row.slice(0, 4).map((cell) => (
                <span key={cell}>{cell}</span>
              ))}
              <span className="table-ref-cell">
                <Ref ids={row[4]} />
              </span>
            </div>
          ))}
        </div>
        <figure>
          <img src="/assets/funding_timeline.png" alt="具微科技公开融资时间线" />
          <figcaption>B1 轮为媒体转述，图中已用低核验状态处理。</figcaption>
        </figure>
      </div>
      <div className="signal-grid">
        <article>
          <CircleDollarSign size={22} />
          <strong>1.1亿元</strong>
          <span>
            2025 年订单口径，公司/媒体披露
            <Ref ids={['officialA2', 'krA']} />
          </span>
        </article>
        <article>
          <Activity size={22} />
          <strong>近千场景</strong>
          <span>
            公司融资稿口径，需定义为点位、项目或客户
            <Ref ids={['officialA2', 'krA']} />
          </span>
        </article>
        <article>
          <LineChart size={22} />
          <strong>Q2近2亿元</strong>
          <span>
            媒体行业消息，需区分收入确认与回款
            <Ref ids={['ofweekB1']} />
          </span>
        </article>
      </div>
      <div className="scale-timeline">
        {scaleSteps.map((step) => {
          const Icon = step.icon;
          return (
            <article key={step.title}>
              <Icon size={24} />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          );
        })}
      </div>
      <div className="milestone-panel">
        <h3>B轮资金用途应落到这些里程碑</h3>
        <div>
          <span><CheckCircle2 size={18} />量产良率与交付周期</span>
          <span><CheckCircle2 size={18} />6-9个月真实工况运行数据</span>
          <span><CheckCircle2 size={18} />前20大订单穿透</span>
          <span><CheckCircle2 size={18} />证书原件与适用配置</span>
          <span><CheckCircle2 size={18} />服务毛利与现金转换</span>
          <span><CheckCircle2 size={18} />设备在线率与数据闭环</span>
        </div>
      </div>
    </PageShell>
  );
}

function ScalePage() {
  return (
    <PageShell
      eyebrow="07 / 1 to N"
      title="为什么可以讲“进入 1 到 N”：不是结论，是 B 轮待验证命题"
      intro="1 到 N 的真正含义，是公司能否把一个个高危现场项目沉淀成标准化方案、可预测交付和可复用数据资产。"
    >
      <div className="scale-timeline">
        {scaleSteps.map((step) => {
          const Icon = step.icon;
          return (
            <article key={step.title}>
              <Icon size={24} />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          );
        })}
      </div>
      <div className="milestone-panel">
        <h3>B轮资金用途应落到这些里程碑</h3>
        <div>
          <span><CheckCircle2 size={18} />量产良率与交付周期</span>
          <span><CheckCircle2 size={18} />6-9个月真实工况运行数据</span>
          <span><CheckCircle2 size={18} />前20大订单穿透</span>
          <span><CheckCircle2 size={18} />证书原件与适用配置</span>
          <span><CheckCircle2 size={18} />服务毛利与现金转换</span>
          <span><CheckCircle2 size={18} />设备在线率与数据闭环</span>
        </div>
      </div>
    </PageShell>
  );
}

function EvidencePage() {
  return (
    <PageShell
      title="6.1 数据来源：把判断挂到可核验出处上"
      intro="公开资料、媒体口径和行研数据"
      featuredTitle
      className="industry-dark-page business-dark-page"
    >
      <div className="evidence-layout">
        <figure>
          <img src="/assets/evidence_score.png" alt="证据强度图" />
          <figcaption>证据强度按来源类型、可核验性和结论稳健度分层。</figcaption>
        </figure>
        <div className="evidence-list">
          {evidenceItems.map(([source, use, refs]) => (
            <article key={source}>
              <FileSearch size={20} />
              <div>
                <h3>{source}</h3>
                <p>
                  {use}
                  <Ref ids={refs} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="source-index">
        <h3>来源索引</h3>
        <div className="source-index-grid">
          {sourceList.map((item) => (
            <a
              className={`source-index-item ${item.type.includes('媒体转述') ? 'weak' : ''}`}
              href={item.url}
              target={item.url.startsWith('#') ? undefined : '_blank'}
              rel={item.url.startsWith('#') ? undefined : 'noreferrer'}
              key={item.id}
            >
              <span>{item.id}</span>
              <strong>{item.name}</strong>
              <small>{item.type}</small>
              <p>{item.note}</p>
            </a>
          ))}
        </div>
      </div>
      <div className="risk-band">
        <AlertTriangle size={22} />
        <p>
          免责声明：本网页仅基于公开资料与本地行研整理，不构成证券、股权、信贷、采购或法律意见。订单、收入、估值、认证与极限性能必须以公司非公开材料、第三方测试、客户验收和审计文件为准。
        </p>
      </div>
    </PageShell>
  );
}

const pageComponents = {
  overview: OverviewPage,
  industry: IndustryPage,
  business: BusinessPage,
  'business-pain': BusinessPainPage,
  'business-solution': BusinessSolutionPage,
  'business-competition': BusinessCompetitionPage,
  'business-moat': BusinessMoatPage,
  'business-model': BusinessModelPage,
  'business-traction': BusinessTractionPage,
  capitalization: CapitalizationPage,
  assets: AssetsPage,
  endgame: EndgamePage,
  pain: WhyNowPage,
  solution: ProductPage,
  validation: ScenarioPage,
  team: TeamPage,
  finance: CapitalPage,
  evidence: EvidencePage,
  why: WhyNowPage,
  product: ProductPage,
  scenario: ScenarioPage,
  capital: CapitalPage,
  competition: ScenarioPage,
  moat: ScenarioPage,
  scale: CapitalPage,
  narrative: WhyNowPage,
  market: WhyNowPage,
  traction: CapitalPage,
};

function getPageFromHash() {
  const page = window.location.hash.replace('#', '') || 'overview';
  return pageComponents[page] ? page : 'overview';
}

function App() {
  const [activePage, setActivePage] = useState(getPageFromHash);

  const isBusinessActive =
    activePage === 'business' || businessSectionNav.some(([, sectionId]) => sectionId === activePage);

  useEffect(() => {
    const handleHashChange = () => setActivePage(getPageFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activePage]);

  const ActivePage = useMemo(() => pageComponents[activePage] || OverviewPage, [activePage]);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#overview" aria-label="MICBOT BP site">
          <span className="brand-mark">M</span>
          <span>
            <strong>MICBOT</strong>
            <small>公开信息融资叙事</small>
          </span>
        </a>
        <nav>
          {navItems.map(([label, id]) => (
            id === 'business' ? (
              <div className="nav-group" key={id}>
                <a className={isBusinessActive ? 'active' : ''} href="#business-pain">
                  {label}
                </a>
              </div>
            ) : (
              <a className={activePage === id ? 'active' : ''} key={id} href={`#${id}`}>
                {label}
              </a>
            )
          ))}
        </nav>
      </header>
      <ActivePage />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
