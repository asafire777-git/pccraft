export type MallKey = 'himart' | 'lotteon' | '11st' | 'gmarket' | 'auction' | 'emart' | 'coupang';

export interface CardBenefitItem {
  cardName: string;
  discountRate: string;
  condition: string;
  maxDiscount: string;
}

export interface CouponItem {
  code: string;
  name: string;
  benefit: string;
  note: string;
}

export interface MallDeal {
  id: string;
  mall: MallKey;
  mallName: string;
  mallLogo: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: 'rose' | 'red' | 'emerald' | 'amber' | 'cyan' | 'purple';
  period: string; // e.g., '2026.10.01 ~ 2026.10.31'
  isHot?: boolean;
  statusText: string;
  cardBenefits: CardBenefitItem[];
  couponItems?: CouponItem[];
  tips: string[];
  affiliateUrl: string;
  ctaText: string;
}

export const MALL_DEALS: MallDeal[] = [
  // 1. 롯데하이마트
  {
    id: 'deal-himart-card',
    mall: 'himart',
    mallName: '롯데하이마트',
    mallLogo: '🏬',
    title: '롯데하이마트 10월 게이밍PC & 대기업 완본체 카드 청구할인 대전',
    subtitle: '조립 완본체, 게이밍 노트북, 대형 모니터 결제 시 결제일 최대 15만 원 청구할인',
    badge: '최대 10% 청구할인',
    badgeColor: 'rose',
    period: '2026.10.01 ~ 2026.10.31',
    isHot: true,
    statusText: '10월 상시 운영',
    cardBenefits: [
      { cardName: '롯데카드', discountRate: '7% ~ 10%', condition: '100만 원 이상 결제 시', maxDiscount: '최대 150,000원' },
      { cardName: '현대카드', discountRate: '5% ~ 7%', condition: '50만 원 이상 결제 시', maxDiscount: '최대 100,000원' },
      { cardName: 'KB국민카드', discountRate: '5%', condition: '30만 원 이상 결제 시', maxDiscount: '최대 70,000원' },
      { cardName: '삼성카드', discountRate: '5%', condition: '50만 원 이상 결제 시', maxDiscount: '최대 80,000원' }
    ],
    tips: [
      '하이마트 앱에서 L.PAY 간편결제 등록 후 롯데카드로 결제 시 L.POINT 추가 적립 혜택',
      '카드사별 예산 소진 시 조기 종료될 수 있으므로 결제 직전 "결제 혜택" 탭 확인 필수',
      '전국 하이마트 매장 방문 A/S 접수 대행 무료 서비스 포함'
    ],
    affiliateUrl: 'https://click.linkprice.com/click.php?m=himart&a=A100708723&l=9999&l_cd1=3&l_cd2=0&tu=https%3A%2F%2Fwww.e-himart.co.kr%2Fapp%2Fsearch%2FtotalSearch%3Fquery%3D%EA%B2%8C%EC%9D%B4%EB%B0%8DPC',
    ctaText: '하이마트 카드 혜택 보러가기'
  },

  // 2. 롯데ON 온쇼페
  {
    id: 'deal-lotteon-onshope',
    mall: 'lotteon',
    mallName: '롯데ON',
    mallLogo: '🔴',
    title: '[롯데ON] 30주년 온쇼페! 디지털/가전 카테고리데이 & 메가딜',
    subtitle: '일 3회 선착순 쿠폰 오픈, 배민클럽 제휴할인 & 디지털가전 최대 30% 혜택',
    badge: '30주년 온쇼페 한정',
    badgeColor: 'red',
    period: '2026.10.12 ~ 2026.10.21',
    isHot: true,
    statusText: '기간 한정 메가딜',
    cardBenefits: [
      { cardName: '롯데카드', discountRate: '최대 7% 즉시할인', condition: '온쇼페 기획전 전 상품', maxDiscount: '최대 100,000원' },
      { cardName: '신한카드', discountRate: '5% 즉시할인', condition: '7만 원 이상 결제 시', maxDiscount: '최대 50,000원' },
      { cardName: '토스페이', discountRate: '3,000원 캐시백', condition: '5만 원 이상 생애 첫 결제', maxDiscount: '3,000원' }
    ],
    couponItems: [
      { code: 'ONSHOPE30', name: '온쇼페 30% 디지털 쿠폰', benefit: '최대 30,000원 할인', note: '일 3회 (10시, 14시, 20시) 선착순 발급' },
      { code: 'BAEMINCLUB', name: '배민클럽 회원 전용 혜택', benefit: '추가 5% 중복 쿠폰', note: '롯데ON x 배민클럽 연동 회원 대상' }
    ],
    tips: [
      '오전 10시, 오후 2시, 오후 8시 하루 3번 오픈되는 선착순 메가딜 쿠폰을 먼저 다운로드하세요.',
      '디지털 카테고리데이 상품에 적용 시 카드 할인과 쿠폰이 2중 중복 적용됩니다.',
      'L.POINT 최대 30% 페이백 이벤트와 병행 가능'
    ],
    affiliateUrl: 'https://click.linkprice.com/click.php?m=lotteon&a=A100708723&l=9999&l_cd1=3&l_cd2=0&tu=https%3A%2F%2Fwww.lotteon.com%2Fdisplay%2Fshop%2FseltDpShop%2F53749%3Fch_no%3D100995%26ch_dtl_no%3D1075172',
    ctaText: '롯데ON 온쇼페 쿠폰 받기'
  },

  // 3. 11번가 슈팅배송 & 월간 십일절
  {
    id: 'deal-11st-shooting',
    mall: '11st',
    mallName: '11번가',
    mallLogo: '⚡',
    title: '11번가 슈팅배송 & 월간 십일절 PC 부품·게이밍 메가세일',
    subtitle: '평일 24시 자정 전 주문 시 내일 도착 슈팅배송 + SK pay 카드사 최대 15% 즉시할인',
    badge: '슈팅배송 & 십일절',
    badgeColor: 'red',
    period: '2026.10.01 ~ 2026.10.31',
    isHot: true,
    statusText: '10월 상시 운영',
    cardBenefits: [
      { cardName: 'SK pay (신한/국민/삼성)', discountRate: '최대 10~15% 즉시할인', condition: '슈팅배송 디지털 행사 상품', maxDiscount: '최대 100,000원' },
      { cardName: '롯데/하나/현대카드', discountRate: '5% ~ 7% 즉시할인', condition: '7만 원 이상 결제 시', maxDiscount: '최대 50,000원' },
      { cardName: 'SK pay 포인트', discountRate: '최대 5% 적립', condition: 'T멤버십/우주패스 연동 결제', maxDiscount: '적립한도 30,000P' }
    ],
    tips: [
      '평일 밤 12시(24:00) 직전까지 주문 완료 시 다음 날 배송 보장되는 "슈팅배송" 상품을 우선 선택하세요.',
      '우주패스 회원은 매월 슈팅배송 무료 배송 쿠폰 및 장바구니 추가 5,000원 할인 쿠폰이 중복 적용됩니다.',
      '매월 1일~11일 열리는 "월간 십일절" 기간에는 타임딜 릴레이로 조립PC 주요 하드웨어를 최저가에 구매할 수 있습니다.'
    ],
    affiliateUrl: 'https://click.linkprice.com/click.php?m=11st&a=A100708723&l=9999&l_cd1=3&l_cd2=0&tu=https%3A%2F%2Fsearch.11st.co.kr%2FSearch.tmall%3Fkwd%3D%EC%A1%B0%EB%A6%BDPC%2B%EC%BB%B4%ED%93%A8%ED%84%B0%EB%B6%80%ED%92%88',
    ctaText: '11번가 슈팅배송 혜택 확인'
  },

  // 4. G마켓
  {
    id: 'deal-gmarket-digital',
    mall: 'gmarket',
    mallName: 'G마켓',
    mallLogo: '🟢',
    title: 'G마켓 디지털 가전 위크 & 컴퓨터 공식 총판 핫딜',
    subtitle: '신세계 유니버스 클럽 전용 15% 쿠폰 + 이엠텍, 대원CTS, 제이씨현 부품 직영 특가',
    badge: '유니버스 클럽 15%',
    badgeColor: 'emerald',
    period: '2026.10.01 ~ 2026.10.31',
    isHot: true,
    statusText: '10월 정기 프로모션',
    cardBenefits: [
      { cardName: '스마일카드 Edition3', discountRate: '2% 스마일캐시 적립', condition: '전 상품 무제한', maxDiscount: '적립 한도 없음' },
      { cardName: 'KB국민카드', discountRate: '5% 즉시할인', condition: '10만 원 이상 결제 시', maxDiscount: '최대 50,000원' },
      { cardName: 'NH농협카드', discountRate: '5% 즉시할인', condition: '10만 원 이상 결제 시', maxDiscount: '최대 50,000원' }
    ],
    tips: [
      '신세계 유니버스 클럽 회원은 매월 12%~15% 할인 쿠폰이 기본 지급됩니다.',
      '그래픽카드(RTX 4070 SUPER / 4070 Ti SUPER) 및 CPU 단품은 공식 수입사 직영 스토어에서 쿠폰 중복 적용이 가장 유리합니다.',
      '스마일페이 간편결제 시 무이자 할부 최대 12~24개월 지원'
    ],
    affiliateUrl: 'https://click.linkprice.com/click.php?m=gmarket&a=A100708723&l=9999&l_cd1=3&l_cd2=0&tu=https%3A%2F%2Fbrowse.gmarket.co.kr%2Fsearch%3Fkeyword%3D%EC%BB%B4%ED%93%A8%ED%84%B0%EB%B6%80%ED%92%88',
    ctaText: 'G마켓 공식 특가 확인'
  },

  // 4. 옥션
  {
    id: 'deal-auction-allkill',
    mall: 'auction',
    mallName: '옥션',
    mallLogo: '🔴',
    title: '옥션 올킬(All-Kill) PC 주요 하드웨어 특가 모음전',
    subtitle: '라이젠 CPU, NVMe SSD, 파워서플라이 올킬 타임딜 & 스마일배송 무료반품',
    badge: '올킬 타임특가',
    badgeColor: 'amber',
    period: '2026.10.01 ~ 2026.10.31',
    statusText: '상시 진행',
    cardBenefits: [
      { cardName: '스마일카드', discountRate: '최대 2% 적립 + 즉시할인', condition: '스마일페이 결제 시', maxDiscount: '무제한' },
      { cardName: '현대카드', discountRate: '5,000원 할인', condition: '5만 원 이상 결제 시', maxDiscount: '5,000원' }
    ],
    tips: [
      '스마일배송 상품은 여러 부품을 한 상자에 묶음 무료 배송해 주므로 배송비를 크게 아낄 수 있습니다.',
      'G마켓과 동일하게 신세계 유니버스 쿠폰이 연동됩니다.'
    ],
    affiliateUrl: 'https://click.linkprice.com/click.php?m=auction&a=A100708723&l=9999&l_cd1=3&l_cd2=0&tu=https%3A%2F%2Fbrowse.auction.co.kr%2Fsearch%3Fkeyword%3D%EC%A1%B0%EB%A6%BDPC',
    ctaText: '옥션 올킬 특가 보러가기'
  },

  // 5. 이마트몰
  {
    id: 'deal-emart-digital',
    mall: 'emart',
    mallName: '이마트인터넷쇼핑몰',
    mallLogo: '🛒',
    title: '이마트몰 쓱배송 전자기기 & 게이밍 기어 디지털 위크',
    subtitle: '로지텍, 레이저 정품 게이밍 기어 및 콘솔 기기 주말 쓱배송 카드 할인',
    badge: '쓱배송 카드할인',
    badgeColor: 'amber',
    period: '2026.10.01 ~ 2026.10.31',
    statusText: '주말 특별 할인',
    cardBenefits: [
      { cardName: '이마트 e카드', discountRate: '5% 청구할인', condition: '7만 원 이상 결제 시', maxDiscount: '최대 20,000원' },
      { cardName: 'SSG PAY', discountRate: '신세계포인트 3배 적립', condition: '전 상품 결제 시', maxDiscount: '무제한' }
    ],
    tips: [
      '주말(토/일) 결제 시 카드 청구할인 혜택이 강화됩니다.',
      '이마트몰 매장 픽업 선택 시 배송 대기 없이 당일 수령 가능'
    ],
    affiliateUrl: 'https://click.linkprice.com/click.php?m=emart&a=A100708723&l=9999&l_cd1=3&l_cd2=0&tu=https%3A%2F%2Femart.ssg.com%2Fsearch.ssg%3Ftarget%3Dall%26query%3D%EA%B2%8C%EC%9D%B4%EB%B0%8D',
    ctaText: '이마트몰 혜택 확인'
  },

  // 6. 쿠팡
  {
    id: 'deal-coupang-rocket',
    mall: 'coupang',
    mallName: '쿠팡',
    mallLogo: '🚀',
    title: '쿠팡 로켓배송 하드웨어 & 완본체 실시간 카드 즉시할인',
    subtitle: '와우회원 전용 결제 창 즉시할인 5~10%, 오늘 주문 시 내일 아침 7시 전 문 앞 도착',
    badge: '로켓와우 즉시할인',
    badgeColor: 'cyan',
    period: '2026.10.01 ~ 2026.10.31',
    isHot: true,
    statusText: '실시간 변동 특가',
    cardBenefits: [
      { cardName: '국민/삼성/신한', discountRate: '5% ~ 10% 즉시할인', condition: '로켓배송 행사 상품', maxDiscount: '최대 200,000원' },
      { cardName: '쿠팡 로켓와우', discountRate: '무료 반품 & 무료 배송', condition: '와우 멤버십 회원', maxDiscount: '30일 안심 환불' },
      { cardName: '쿠페이 머니', discountRate: '1% 추가 적립', condition: '계좌 충전 결제 시', maxDiscount: '무제한' }
    ],
    tips: [
      '결제 페이지 진입 시 선택 가능한 카드사 즉시할인이 실시간으로 변동됩니다.',
      '"반품-미개봉" 및 "반품-최상" 필터를 선택하면 동일한 새 제품을 10~15% 저렴하게 구매할 수 있습니다.',
      '초기 불량 발생 시 1초 만에 맞교환되는 안심 로켓반품 보증'
    ],
    affiliateUrl: 'https://link.coupang.com/a/hMDhTKsW5I',
    ctaText: '쿠팡 로켓특가 바로가기'
  }
];

export interface WeekDayDiscount {
  dayName: string;
  recommendedMall: string;
  bestCard: string;
  keyBenefit: string;
}

export const WEEKLY_DISCOUNT_SCHEDULE: WeekDayDiscount[] = [
  { dayName: '월요일 (Mon)', recommendedMall: '롯데ON 온쇼페', bestCard: '롯데카드 / 신한카드', keyBenefit: '카테고리데이 30% 디지털 쿠폰 오픈' },
  { dayName: '화요일 (Tue)', recommendedMall: '11번가 슈팅배송', bestCard: 'SK pay / 신한카드', keyBenefit: '슈팅배송 디지털 데이 최대 15% 할인 + SK pay 5% 적립' },
  { dayName: '수요일 (Wed)', recommendedMall: '롯데하이마트', bestCard: '현대카드 / 롯데카드', keyBenefit: '노트북 & 완본체 7% 청구할인 타임딜' },
  { dayName: '목요일 (Thu)', recommendedMall: '쿠팡 로켓배송', bestCard: '삼성카드 / 신한카드', keyBenefit: '로켓와우 게이밍 부품 카드 10% 즉시할인' },
  { dayName: '금요일 (Fri)', recommendedMall: 'G마켓 빅딜', bestCard: '스마일카드 / 농협카드', keyBenefit: '주말 맞이 부품 특가 & 무료배송 쿠폰' },
  { dayName: '주말 (Sat-Sun)', recommendedMall: '이마트몰 / 하이마트', bestCard: '이마트 e카드 / 롯데카드', keyBenefit: '주말 한정 청구할인 10% & L.POINT 5배 적립' }
];
