import fs from 'fs';
import path from 'path';

export interface PriceReport {
  id: string;
  componentId: string;
  componentName: string;
  reportedPrice: number;
  reportedStore: string;
  tipText?: string;
  nickname: string;
  createdAt: string;
}

const FEEDBACK_FILE = path.join(process.cwd(), 'data', 'price-feedback.json');

// 기본 샘플 데이터 (초기 유저 참여 유도용)
const INITIAL_REPORTS: PriceReport[] = [
  {
    id: 'report-1',
    componentId: 'cpu-amd-7500f',
    componentName: 'AMD 라이젠5 7500F 멀티팩',
    reportedPrice: 194000,
    reportedStore: '11번가 슈팅배송',
    tipText: '장바구니 쿠폰 적용 시 19.4만원에 무배 구매 가능하네요!',
    nickname: '컴린이탈출',
    createdAt: '2026-10-21 08:30'
  },
  {
    id: 'report-2',
    componentId: 'ram-ddr5-32gb',
    componentName: '삼성전자 DDR5-5600 32GB',
    reportedPrice: 675000,
    reportedStore: 'G마켓 공식몰',
    tipText: '빅스마일데이 카드할인 받아서 67만원대 구매했습니다.',
    nickname: '하드웨어마스터',
    createdAt: '2026-10-21 09:15'
  }
];

function ensureFile() {
  const dir = path.dirname(FEEDBACK_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(FEEDBACK_FILE)) {
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(INITIAL_REPORTS, null, 2), 'utf-8');
  }
}

export function getPriceReports(): PriceReport[] {
  try {
    ensureFile();
    const data = fs.readFileSync(FEEDBACK_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return INITIAL_REPORTS;
  }
}

export function addPriceReport(report: Omit<PriceReport, 'id' | 'createdAt'>): PriceReport {
  ensureFile();
  const reports = getPriceReports();
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newReport: PriceReport = {
    ...report,
    id: `report-${Date.now()}`,
    createdAt: dateStr
  };

  reports.unshift(newReport);
  // 최근 50개 유지
  const sliced = reports.slice(0, 50);
  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(sliced, null, 2), 'utf-8');
  return newReport;
}
