export interface Question {
  type: 'journal' | 'posting' | 'pnl_balance' | 'multiple-choice' | 'essay';
  points: number;
  rows?: number;
  allowedAccounts?: string[];
  answer: any;
  text?: string;
  options?: string[];
  correctAnswer?: number;
  materials?: {
    beginInv?: number;
    purchaseBalance?: number;
    endingInv?: number;
  };
}

export interface Exam {
  timeLimitMinutes: number;
  questions: Question[];
}

export interface Chapter {
  id: string;
  title: string;
  time: string; // Format "MM:SS" or "HH:MM:SS"
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  isFree?: boolean;
  exam: Exam;
  chapters?: Chapter[];
  documents?: { title: string; url: string; }[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  lessons: Lesson[];
  isPublished: boolean;
  category?: string;
  thumbnail?: string;
  instructor?: string;
  duration?: string;
  students?: number;
  rating?: number;
  freeContentCount?: number;
  paidContentCount?: number;
}

const allowedAccounts = [
  "Tiền mặt (Cash)",
  "Tiền gửi ngân hàng (Bank)",
  "Phải thu khách hàng (Accounts Receivable)",
  "Phải trả người bán (Accounts Payable)",
  "Doanh thu (Sales)",
  "Giá vốn hàng bán (COGS)",
  "Hàng tồn kho (Inventory)",
  "Chi phí lương (Salary Expense)",
  "Chi phí thuê (Rent Expense)",
  "Thuế GTGT (VAT)",
  "Vốn chủ sở hữu (Owner's Equity)",
  "Tài sản cố định (Fixed Assets)",
  "Khấu hao (Depreciation)",
  "Chi phí lãi vay (Interest Expense)",
  "Vay ngắn hạn (Short-term Loan)",
];

export interface CourseCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const courseCategories: CourseCategory[] = [
  { id: 'boki', name: 'Kế toán Nissho Boki', description: 'Chứng chỉ kế toán Nhật Bản', icon: '📊' },
  { id: 'tax', name: 'Thuế', description: 'Thuế và quy định pháp luật', icon: '📋' },
  { id: 'office', name: 'Tin học văn phòng', description: 'Microsoft Office Specialist', icon: '💻' },
  { id: 'hr', name: 'Nhân sự', description: 'Quản lý nhân sự và tiền lương', icon: '👥' },
  { id: 'trade', name: 'Xuất nhập khẩu', description: 'Thương mại quốc tế', icon: '🚢' },
  { id: 'finance', name: 'Tài chính', description: 'Tư vấn và quản lý tài chính', icon: '💰' },
];

export const allCourses: Course[] = [
  {
    id: 1,
    title: "Boki 1 - Kế toán Nissho Boki Level 3",
    description: "Khóa học đào tạo kế toán theo chuẩn Nissho Boki của Nhật Bản. Học từ cơ bản đến nâng cao, luyện thi Level 3 với đề mô phỏng thực tế.",
    price: 1500000,
    isPublished: true,
    category: 'boki',
    thumbnail: '📊',
    instructor: 'Nguyễn Quỳnh',
    duration: '20 giờ',
    students: 1250,
    rating: 4.8,
    freeContentCount: 3,
    paidContentCount: 7,
    lessons: [
      {
        id: 1,
        title: "Bài 1: Giới thiệu & Định khoản cơ bản",
        duration: "25 phút",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isFree: true,
        exam: {
          timeLimitMinutes: 60,
          questions: [
            { type: "journal", points: 45, rows: 4, allowedAccounts, answer: [{ debit: "Tiền mặt (Cash)", debitAmount: 1000000, credit: "Doanh thu (Sales)", creditAmount: 1000000 }] },
            { type: "posting", points: 20, answer: { summary: "Ghi sổ doanh thu tháng 1", amounts: [1000000] } },
            { type: "pnl_balance", points: 35, materials: { beginInv: 0, purchaseBalance: 800000, endingInv: 200000 }, answer: { cogs: 600000, grossProfit: 900000 } }
          ]
        },
        documents: [
          { title: "Slide bài giảng (PDF)", url: "#" },
          { title: "Bài tập thực hành (PDF)", url: "#" },
          { title: "Bảng danh sách tài khoản (PDF)", url: "#" }
        ],
        chapters: [
          { id: "c1", time: "00:00", title: "Giới thiệu tổng quan" },
          { id: "c2", time: "02:30", title: "Khái niệm Nợ và Có" },
          { id: "c3", time: "08:15", title: "Quy tắc định khoản" },
          { id: "c4", time: "15:45", title: "Ví dụ thực tế 1" },
          { id: "c5", time: "20:10", title: "Tổng kết bài học" },
        ]
      },
      {
        id: 2,
        title: "Bài 2: Hóa đơn và thuế tiêu thụ (消費税)",
        duration: "30 phút",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isFree: true,
        exam: {
          timeLimitMinutes: 60,
          questions: [
            { type: "journal", points: 45, rows: 4, allowedAccounts, answer: [{ debit: "Tiền mặt (Cash)", debitAmount: 1100000, credit: "Doanh thu (Sales)", creditAmount: 1000000 }] },
            { type: "posting", points: 20, answer: { summary: "Ghi sổ thuế GTGT", amounts: [100000] } },
            { type: "pnl_balance", points: 35, materials: { beginInv: 200000, purchaseBalance: 1000000, endingInv: 300000 }, answer: { cogs: 900000, grossProfit: 100000 } }
          ]
        }
      },
      {
        id: 3,
        title: "Bài 3: Tiền gửi & ngân hàng (当座預金)",
        duration: "28 phút",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isFree: true,
        exam: {
          timeLimitMinutes: 60,
          questions: [
            { type: "journal", points: 45, rows: 4, allowedAccounts, answer: [{ debit: "Tiền gửi ngân hàng (Bank)", debitAmount: 5000000, credit: "Tiền mặt (Cash)", creditAmount: 5000000 }] },
            { type: "posting", points: 20, answer: { summary: "Chuyển tiền vào ngân hàng", amounts: [5000000] } },
            { type: "pnl_balance", points: 35, materials: { beginInv: 500000, purchaseBalance: 2000000, endingInv: 700000 }, answer: { cogs: 1800000, grossProfit: 1200000 } }
          ]
        }
      },
      {
        id: 4,
        title: "Bài 4: Mua hàng & Hàng tồn kho",
        duration: "35 phút",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isFree: false,
        exam: {
          timeLimitMinutes: 60,
          questions: [
            { type: "journal", points: 45, rows: 4, allowedAccounts, answer: [{ debit: "Hàng tồn kho (Inventory)", debitAmount: 3000000, credit: "Phải trả người bán (Accounts Payable)", creditAmount: 3000000 }] },
            { type: "posting", points: 20, answer: { summary: "Nhập kho hàng hóa", amounts: [3000000] } },
            { type: "pnl_balance", points: 35, materials: { beginInv: 1000000, purchaseBalance: 3000000, endingInv: 1500000 }, answer: { cogs: 2500000, grossProfit: 500000 } }
          ]
        }
      },
      {
        id: 5,
        title: "Bài 5: Bảng cân đối thử và điều chỉnh",
        duration: "40 phút",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isFree: false,
        exam: {
          timeLimitMinutes: 60,
          questions: [
            { type: "journal", points: 45, rows: 4, allowedAccounts, answer: [{ debit: "Chi phí lương (Salary Expense)", debitAmount: 2000000, credit: "Tiền mặt (Cash)", creditAmount: 2000000 }] },
            { type: "posting", points: 20, answer: { summary: "Điều chỉnh chi phí lương", amounts: [2000000] } },
            { type: "pnl_balance", points: 35, materials: { beginInv: 800000, purchaseBalance: 4000000, endingInv: 1200000 }, answer: { cogs: 3600000, grossProfit: 400000 } }
          ]
        }
      },
      {
        id: 6,
        title: "Bài 6: Chi phí lương & các khoản phải trả",
        duration: "32 phút",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isFree: false,
        exam: {
          timeLimitMinutes: 60,
          questions: [
            { type: "journal", points: 45, rows: 4, allowedAccounts, answer: [{ debit: "Chi phí lương (Salary Expense)", debitAmount: 5000000, credit: "Tiền gửi ngân hàng (Bank)", creditAmount: 5000000 }] },
            { type: "posting", points: 20, answer: { summary: "Chi trả lương nhân viên", amounts: [5000000] } },
            { type: "pnl_balance", points: 35, materials: { beginInv: 600000, purchaseBalance: 2500000, endingInv: 400000 }, answer: { cogs: 2700000, grossProfit: 300000 } }
          ]
        }
      },
      {
        id: 7,
        title: "Bài 7: Doanh thu chưa thực hiện & phân bổ",
        duration: "28 phút",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isFree: false,
        exam: {
          timeLimitMinutes: 60,
          questions: [
            { type: "journal", points: 45, rows: 4, allowedAccounts, answer: [{ debit: "Tiền mặt (Cash)", debitAmount: 2000000, credit: "Doanh thu (Sales)", creditAmount: 2000000 }] },
            { type: "posting", points: 20, answer: { summary: "Ghi nhận doanh thu phân bổ", amounts: [2000000] } },
            { type: "pnl_balance", points: 35, materials: { beginInv: 400000, purchaseBalance: 1800000, endingInv: 500000 }, answer: { cogs: 1700000, grossProfit: 300000 } }
          ]
        }
      },
      {
        id: 8,
        title: "Bài 8: Tài sản cố định & khấu hao",
        duration: "38 phút",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isFree: false,
        exam: {
          timeLimitMinutes: 60,
          questions: [
            { type: "journal", points: 45, rows: 4, allowedAccounts, answer: [{ debit: "Khấu hao (Depreciation)", debitAmount: 500000, credit: "Tài sản cố định (Fixed Assets)", creditAmount: 500000 }] },
            { type: "posting", points: 20, answer: { summary: "Ghi nhận khấu hao TSCĐ", amounts: [500000] } },
            { type: "pnl_balance", points: 35, materials: { beginInv: 300000, purchaseBalance: 1500000, endingInv: 350000 }, answer: { cogs: 1450000, grossProfit: 550000 } }
          ]
        }
      },
      {
        id: 9,
        title: "Bài 9: Vay nợ và lãi vay",
        duration: "30 phút",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isFree: false,
        exam: {
          timeLimitMinutes: 60,
          questions: [
            { type: "journal", points: 45, rows: 4, allowedAccounts, answer: [{ debit: "Chi phí lãi vay (Interest Expense)", debitAmount: 100000, credit: "Tiền gửi ngân hàng (Bank)", creditAmount: 100000 }] },
            { type: "posting", points: 20, answer: { summary: "Trả nợ và lãi vay", amounts: [100000, 1000000] } },
            { type: "pnl_balance", points: 35, materials: { beginInv: 700000, purchaseBalance: 3500000, endingInv: 900000 }, answer: { cogs: 3300000, grossProfit: 700000 } }
          ]
        }
      },
      {
        id: 10,
        title: "Bài 10: Thi mô phỏng - Tổng hợp",
        duration: "60 phút",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isFree: false,
        exam: {
          timeLimitMinutes: 90,
          questions: [
            { type: "journal", points: 45, rows: 4, allowedAccounts, answer: [{ debit: "Tiền mặt (Cash)", debitAmount: 3000000, credit: "Doanh thu (Sales)", creditAmount: 3000000 }] },
            { type: "posting", points: 20, answer: { summary: "Tổng hợp nghiệp vụ tháng", amounts: [3000000] } },
            { type: "pnl_balance", points: 35, materials: { beginInv: 1200000, purchaseBalance: 10800000, endingInv: 1500000 }, answer: { cogs: 10500000, grossProfit: 2500000 } }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: "Boki 2 - Kế toán Nissho Boki Level 2",
    description: "Nâng cao kỹ năng kế toán với chứng chỉ Level 2. Bao gồm các nghiệp vụ phức tạp, báo cáo tài chính nâng cao và phân tích.",
    price: 2500000,
    isPublished: true,
    category: 'boki',
    thumbnail: '📈',
    instructor: 'Nguyễn Quỳnh',
    duration: '30 giờ',
    students: 850,
    rating: 4.9,
    freeContentCount: 2,
    paidContentCount: 12,
    lessons: [
      { id: 1, title: "Bài 1: Tổng quan Level 2", duration: "30 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 2, title: "Bài 2: Kế toán công ty cổ phần", duration: "45 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 3, title: "Bài 3: Báo cáo tài chính hợp nhất", duration: "50 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: false, exam: { timeLimitMinutes: 60, questions: [] } },
    ]
  },
  {
    id: 3,
    title: "Boki 3 - Kế toán Nissho Boki Level 1",
    description: "Trình độ cao nhất của chứng chỉ Nissho Boki. Dành cho những ai muốn trở thành chuyên gia kế toán Nhật Bản.",
    price: 3500000,
    isPublished: true,
    category: 'boki',
    thumbnail: '🏆',
    instructor: 'Nguyễn Quỳnh',
    duration: '50 giờ',
    students: 420,
    rating: 4.9,
    freeContentCount: 2,
    paidContentCount: 18,
    lessons: [
      { id: 1, title: "Bài 1: Giới thiệu Level 1", duration: "35 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 2, title: "Bài 2: Kế toán quản trị nâng cao", duration: "55 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
    ]
  },
  {
    id: 4,
    title: "Thuế doanh nghiệp Việt Nam",
    description: "Tổng quan về hệ thống thuế doanh nghiệp tại Việt Nam. Bao gồm thuế GTGT, thuế TNDN, thuế TNCN và các quy định mới nhất.",
    price: 1800000,
    isPublished: true,
    category: 'tax',
    thumbnail: '📋',
    instructor: 'Trần Minh Anh',
    duration: '25 giờ',
    students: 980,
    rating: 4.7,
    freeContentCount: 4,
    paidContentCount: 10,
    lessons: [
      { id: 1, title: "Bài 1: Tổng quan hệ thống thuế VN", duration: "40 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 2, title: "Bài 2: Thuế GTGT - Căn bản", duration: "45 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 3, title: "Bài 3: Thuế GTGT - Kê khai và hoàn thuế", duration: "50 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 4, title: "Bài 4: Thuế TNDN", duration: "55 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 5, title: "Bài 5: Thuế TNCN", duration: "45 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: false, exam: { timeLimitMinutes: 60, questions: [] } },
    ]
  },
  {
    id: 5,
    title: "MOS Excel - Microsoft Office Specialist",
    description: "Lấy chứng chỉ MOS Excel quốc tế. Từ cơ bản đến nâng cao với các hàm, pivot table, macro và VBA.",
    price: 1200000,
    isPublished: true,
    category: 'office',
    thumbnail: '💻',
    instructor: 'Lê Thị Hương',
    duration: '18 giờ',
    students: 2100,
    rating: 4.8,
    freeContentCount: 5,
    paidContentCount: 10,
    lessons: [
      { id: 1, title: "Bài 1: Giới thiệu Excel & MOS", duration: "25 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 2, title: "Bài 2: Các thao tác cơ bản", duration: "30 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 3, title: "Bài 3: Hàm cơ bản (SUM, AVERAGE, IF)", duration: "40 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 4, title: "Bài 4: Hàm VLOOKUP & HLOOKUP", duration: "45 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 5, title: "Bài 5: Định dạng có điều kiện", duration: "35 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 6, title: "Bài 6: Pivot Table nâng cao", duration: "50 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: false, exam: { timeLimitMinutes: 60, questions: [] } },
    ]
  },
  {
    id: 6,
    title: "Tính lương & Nhân sự",
    description: "Hướng dẫn chi tiết về tính lương, bảo hiểm, thuế TNCN và quản lý nhân sự. Thực hành với bảng lương thực tế.",
    price: 1600000,
    isPublished: true,
    category: 'hr',
    thumbnail: '👥',
    instructor: 'Phạm Văn Đức',
    duration: '22 giờ',
    students: 1450,
    rating: 4.6,
    freeContentCount: 3,
    paidContentCount: 9,
    lessons: [
      { id: 1, title: "Bài 1: Tổng quan về lương và nhân sự", duration: "30 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 2, title: "Bài 2: Cấu trúc bảng lương", duration: "40 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 3, title: "Bài 3: Bảo hiểm xã hội, y tế, thất nghiệp", duration: "45 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 4, title: "Bài 4: Thuế TNCN từ tiền lương", duration: "50 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: false, exam: { timeLimitMinutes: 60, questions: [] } },
    ]
  },
  {
    id: 7,
    title: "Xuất nhập khẩu thực hành",
    description: "Quy trình xuất nhập khẩu từ A-Z. Bao gồm thủ tục hải quan, chứng từ, Incoterms và thanh toán quốc tế.",
    price: 2200000,
    isPublished: true,
    category: 'trade',
    thumbnail: '🚢',
    instructor: 'Hoàng Thị Lan',
    duration: '28 giờ',
    students: 780,
    rating: 4.8,
    freeContentCount: 3,
    paidContentCount: 12,
    lessons: [
      { id: 1, title: "Bài 1: Tổng quan xuất nhập khẩu", duration: "35 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 2, title: "Bài 2: Incoterms 2020", duration: "50 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 3, title: "Bài 3: Chứng từ xuất nhập khẩu", duration: "55 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 4, title: "Bài 4: Thủ tục hải quan", duration: "60 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: false, exam: { timeLimitMinutes: 60, questions: [] } },
    ]
  },
  {
    id: 8,
    title: "Cố vấn tài chính cá nhân",
    description: "Trở thành chuyên gia tư vấn tài chính. Học cách lập kế hoạch tài chính, đầu tư và quản lý rủi ro cho khách hàng.",
    price: 2800000,
    isPublished: true,
    category: 'finance',
    thumbnail: '💰',
    instructor: 'Nguyễn Quỳnh',
    duration: '35 giờ',
    students: 620,
    rating: 4.9,
    freeContentCount: 2,
    paidContentCount: 14,
    lessons: [
      { id: 1, title: "Bài 1: Giới thiệu nghề cố vấn tài chính", duration: "40 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 2, title: "Bài 2: Lập kế hoạch tài chính cá nhân", duration: "55 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: true, exam: { timeLimitMinutes: 60, questions: [] } },
      { id: 3, title: "Bài 3: Đầu tư cơ bản", duration: "50 phút", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isFree: false, exam: { timeLimitMinutes: 60, questions: [] } },
    ]
  }
];

// Keep demoCourse for backward compatibility
export const demoCourse: Course = allCourses[0];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};
