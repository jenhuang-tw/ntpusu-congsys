// 網站基本設定
export const SITE_CONFIG = {
  name: '三峽校區議事服務',
  fullName: '國立臺北大學學生自治會 三峽校區學生議會',
  englishName: 'Sanxia Campus Student Congress, NTPUSU',
  domain: 'sxcong.ntpusu.org',
  email: 'ntpusu@gm.ntpu.edu.tw',
  phone: '(02) 8674-1111 ext. 66666',
  githubRepo: 'https://github.com/ntpusu/congress-service',
  mainWebsite: 'https://ntpusu.org'
};

// 外部連結設定
export const EXTERNAL_LINKS = {
  proposalSystem: 'https://forms.gle/your-proposal-form-id',
  meetingRecords: 'https://ntpusu.org/records',
  mainWebsite: 'https://ntpusu.org',
  inquirySystem: 'https://forms.gle/your-inquiry-form-id',
  budgetSystem: 'https://forms.gle/your-budget-form-id',
  rulesWebsite: 'https://ntpusu.org/rules',
  liveStream: 'https://youtube.com/your-live-stream'
};

// 提案附件範本連結
export const TEMPLATE_LINKS = {
  priceComparison: 'https://drive.google.com/file/d/your-price-comparison-template',
  regulationAmendment: 'https://drive.google.com/file/d/your-regulation-amendment-template',
  budgetForm: 'https://drive.google.com/file/d/your-budget-form-template',
  personalResume: 'https://drive.google.com/file/d/your-personal-resume-template'
};

// 議案類型選項
export const BILL_TYPES = [
  '人事案',
  '預算案',
  '法規案',
  '質詢案',
  '臨時動議',
  '其他'
];

// 提案機關選項
export const PROPOSER_ORGANS = [
  '三峽校區學生會 會長副會長',
  '三峽校區學生議會 議長副議長',
  '三峽校區學生議會 議員',
  '三峽校區學生會 各部門',
  '其他'
];

// 分頁設定
export const PAGINATION_CONFIG = {
  itemsPerPage: 10,
  maxVisiblePages: 5
};

// 議案欄位設定
export const BILL_FIELDS = {
  id: '編號',
  timestamp: '提案時間',
  proposerOrgan: '提案機關/議員',
  proposerName: '提案機關主管/提案議員姓名',
  contactName: '提案聯絡人姓名',
  contactEmail: '提案聯絡人公務電子郵件',
  type: '提案類型',
  subject: '案由',
  description: '說明',
  method: '辦法',
  attachment1: '附件1',
  attachment2: '附件2',
  attachment3: '附件3',
  attachment4: '附件4',
  attachment5: '附件5'
};

// 隱藏欄位（在詳細頁面不顯示）
export const HIDDEN_FIELDS = [
  'contactEmail' // 提案聯絡人公務電子郵件
];

// 附件欄位
export const ATTACHMENT_FIELDS = [
  'attachment1',
  'attachment2',
  'attachment3',
  'attachment4',
  'attachment5'
];

// 篩選欄位（除了附件以外的所有欄位）
export const FILTER_FIELDS = Object.keys(BILL_FIELDS).filter(
  field => !ATTACHMENT_FIELDS.includes(field)
);

// 主視覺顏色
export const THEME_COLORS = {
  primary: '#0F2D4B',
  primaryLight: '#1A3A5C',
  primaryDark: '#0A1F35',
  secondary: '#4A90E2',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6'
};

// 響應式斷點
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// 導航選單項目
export const NAVIGATION_ITEMS = [
  {
    name: '提案系統',
    href: EXTERNAL_LINKS.proposalSystem,
    external: true,
    newTab: true
  },
  {
    name: '議案查詢',
    href: '/bill',
    external: false,
    newTab: false
  },
  {
    name: '會議紀錄',
    href: EXTERNAL_LINKS.meetingRecords,
    external: true,
    newTab: true
  },
  {
    name: '其他服務',
    href: '/more-service',
    external: false,
    newTab: false
  },
  {
    name: '回到會網',
    href: EXTERNAL_LINKS.mainWebsite,
    external: true,
    newTab: false
  }
];

// 首頁服務區塊
export const HOME_SERVICES = [
  {
    id: 'proposal-system',
    title: '提案系統',
    description: '提交議案到學生議會',
    icon: '📝',
    href: EXTERNAL_LINKS.proposalSystem,
    external: true,
    newTab: true,
    color: 'blue'
  },
  {
    id: 'bill-query',
    title: '議案查詢',
    description: '查詢歷屆議案資料',
    icon: '🔍',
    href: '/bill',
    external: false,
    newTab: false,
    color: 'green'
  },
  {
    id: 'meeting-records',
    title: '會議紀錄',
    description: '查看議會會議記錄',
    icon: '📋',
    href: EXTERNAL_LINKS.meetingRecords,
    external: true,
    newTab: true,
    color: 'purple'
  },
  {
    id: 'more-services',
    title: '其他服務',
    description: '更多議事相關服務',
    icon: '⚙️',
    href: '/more-service',
    external: false,
    newTab: false,
    color: 'orange'
  }
];

// 錯誤訊息
export const ERROR_MESSAGES = {
  networkError: '網路連線錯誤，請檢查您的網路連線',
  serverError: '伺服器錯誤，請稍後再試',
  notFound: '找不到資料',
  invalidData: '資料格式錯誤',
  unauthorized: '未授權存取',
  forbidden: '禁止存取',
  timeout: '請求逾時',
  unknown: '未知錯誤'
};

// 成功訊息
export const SUCCESS_MESSAGES = {
  dataLoaded: '資料載入成功',
  searchCompleted: '搜尋完成',
  filterApplied: '篩選條件已套用'
};

// 載入狀態文字
export const LOADING_MESSAGES = {
  bills: '正在載入議案資料...',
  search: '正在搜尋...',
  filter: '正在篩選...',
  page: '正在載入頁面...'
};

// 空資料訊息
export const EMPTY_MESSAGES = {
  noBills: '目前沒有議案資料',
  noResults: '沒有符合條件的議案',
  noAttachments: '無附件'
};

// 議案編號正規表達式
export const BILL_NUMBER_REGEX = /^(\d+)屆北大峽議字第(\d+)號$/;

// 解析議案編號
export const parseBillNumber = (billNumber) => {
  const match = billNumber.match(BILL_NUMBER_REGEX);
  if (match) {
    return {
      term: parseInt(match[1]),
      number: parseInt(match[2])
    };
  }
  return null;
};

// 格式化議案編號
export const formatBillNumber = (term, number) => {
  return `${term}屆北大峽議字第${number}號`;
};

// 時間格式化
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 檢查是否為有效的 Google Drive 連結
export const isValidGoogleDriveLink = (url) => {
  if (!url) return false;
  return url.includes('drive.google.com') || url.includes('docs.google.com');
};

// 將 Google Drive 分享連結轉換為直接檢視連結
export const convertGoogleDriveLink = (url) => {
  if (!url) return '';
  
  // 處理 /open?id= 格式
  const openIdMatch = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
  if (openIdMatch) {
    return `https://drive.google.com/file/d/${openIdMatch[1]}/view`;
  }
  
  // 處理 /file/d/ 格式
  const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/view`;
  }
  
  return url;
};

// 驗證表單欄位
export const validateField = (field, value) => {
  if (!value || value.trim() === '') {
    return `${BILL_FIELDS[field]} 不能為空`;
  }
  
  if (field === 'contactEmail') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return '請輸入有效的電子郵件地址';
    }
  }
  
  return null;
};

// 預設匯出
export default {
  SITE_CONFIG,
  EXTERNAL_LINKS,
  TEMPLATE_LINKS,
  BILL_TYPES,
  PROPOSER_ORGANS,
  PAGINATION_CONFIG,
  BILL_FIELDS,
  HIDDEN_FIELDS,
  ATTACHMENT_FIELDS,
  FILTER_FIELDS,
  THEME_COLORS,
  BREAKPOINTS,
  NAVIGATION_ITEMS,
  HOME_SERVICES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  LOADING_MESSAGES,
  EMPTY_MESSAGES,
  BILL_NUMBER_REGEX,
  parseBillNumber,
  formatBillNumber,
  formatDate,
  isValidGoogleDriveLink,
  convertGoogleDriveLink,
  validateField
};