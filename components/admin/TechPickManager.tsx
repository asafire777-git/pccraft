'use client';

import React, { useState, useEffect } from 'react';
import { PickItem, PickCategory, PickSpecItem } from '@/data/picks/types';
import {
  Sparkles,
  Send,
  ExternalLink,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Layers,
  Check,
  AlertTriangle,
  FileText,
  ClipboardPaste,
  Copy,
  ChevronDown,
  ChevronUp,
  Wand2,
  RotateCcw,
} from 'lucide-react';

interface Props {
  onSuccess?: () => void;
}

const RECOMMENDED_CHATGPT_PROMPT = `애드픽 오늘의 추천상품 중에서 PC·데스크셋업·게이밍기어·스마트가전·라이프테크 관련 인기 상품 1개를 골라줘.
아래 형식으로 URL 원문이 그대로 보이게 정리해 줘:
- 상품명:
- 판매가:
- 쇼핑몰:
- 수익링크 URL: (클릭 텍스트 말고 https:// 전체 주소 그대로)
- 이미지 URL: (있으면 https:// 주소 그대로)
- 핵심 특징 3가지:`;

const AFFILIATE_DOMAINS = [
  'adpick.co.kr',
  'podgate.com',
  'app.ac',
  'bitl.bz',
  'bit.ly',
  's.click.aliexpress.com',
  'link.coupang.com',
  'coupa.ng',
  'click.linkprice.com',
  'lrl.kr',
  'han.gl',
  'naver.me',
];

const IMAGE_EXT_REGEX = /\.(?:jpg|jpeg|png|webp|gif|avif)(?:\?.*)?$/i;
const IMAGE_HOST_REGEX = /(?:alicdn\.com|aliexpress-media\.com|coupangcdn\.com|shop-phinf\.pstatic\.net|img\.|images\.|cdn\.)/i;

function stripMarkdownBold(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .replace(/__/g, '')
    .replace(/`+/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function inferCategory(text: string): PickCategory {
  const lower = text.toLowerCase();
  if (/(마우스|키보드|헤드셋|게임패드|게이밍|장패드|마우스패드|dpi|기계식|저소음축|fps)/i.test(lower)) {
    return '게이밍기어';
  }
  if (/(모니터|거치대|모니터암|허브|도킹|스탠드|라이트바|조명|데스크|책상|의자|멀티탭|웹캠|마이크|키캡|팜레스트)/i.test(lower)) {
    return '데스크셋업';
  }
  if (/(이어폰|헤드폰|스피커|보조배터리|충전기|케이블|맥세이프|케이스|아이폰|갤럭시|블루투스|anc|dac|태블릿|스마트워치|거치)/i.test(lower)) {
    return '모바일/음향';
  }
  if (/(청소기|가습기|공기청정기|선풍기|히터|커피|믹서|드라이기|건조기|제습기|에어프라이어|로봇청소기|스마트홈|면도기|칫솔|안마기)/i.test(lower)) {
    return '스마트가전';
  }
  return '라이프테크';
}

function detectPlatform(raw: string, affiliateUrl: string): string {
  const mallMatch = raw.match(/(?:쇼핑몰|판매처|스토어|마켓|플랫폼)\s*[:：]\s*([^\n\r()[\]]+)/i);
  if (mallMatch?.[1]) {
    const mall = stripMarkdownBold(mallMatch[1]).replace(/^[-•*]\s*/, '').trim();
    if (mall && !mall.startsWith('http')) {
      return mall.includes('애드픽') ? mall : `애드픽 (${mall})`;
    }
  }

  const combined = `${raw} ${affiliateUrl}`.toLowerCase();
  if (combined.includes('aliexpress') || combined.includes('알리')) return '애드픽 (AliExpress)';
  if (combined.includes('coupang') || combined.includes('쿠팡')) return '애드픽 (쿠팡)';
  if (combined.includes('gmarket') || combined.includes('지마켓') || combined.includes('g마켓')) return '애드픽 (G마켓)';
  if (combined.includes('11st') || combined.includes('11번가')) return '애드픽 (11번가)';
  if (combined.includes('naver') || combined.includes('네이버')) return '애드픽 (네이버)';
  return '애드픽 (제휴 스토어)';
}

function generateSlug(title: string): string {
  const ascii = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 48)
    .replace(/^-|-$/g, '');

  if (ascii && ascii.length >= 4) {
    return ascii;
  }
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randPart = Math.random().toString(36).slice(2, 6);
  return `adpick-${datePart}-${randPart}`;
}

interface ParsedAdpickData {
  title: string;
  affiliateUrl: string;
  thumbnailImage: string;
  price: string;
  originalPrice: string;
  affiliatePlatform: string;
  category: PickCategory;
  features: string[];
  memo: string;
  slug: string;
}

function parseChatGptAdpickText(raw: string): ParsedAdpickData {
  const normalized = raw.replace(/\r\n/g, '\n').trim();

  // 1. 모든 URL 추출 (Markdown 이미지/링크 + 일반 URL)
  let thumbnailImage = '';
  const mdImgMatch = normalized.match(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/i);
  if (mdImgMatch?.[1]) {
    thumbnailImage = mdImgMatch[1].trim();
  }

  const allUrls: string[] = [];
  const mdLinkRegex = /(?<!!)\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = mdLinkRegex.exec(normalized)) !== null) {
    allUrls.push(match[1].replace(/[.,;)]+$/, ''));
  }

  const rawUrlRegex = /https?:\/\/[^\s<>"{}|\\^`[\]()]+/g;
  while ((match = rawUrlRegex.exec(normalized)) !== null) {
    const cleaned = match[0].replace(/[.,;)]+$/, '');
    if (!allUrls.includes(cleaned)) {
      allUrls.push(cleaned);
    }
  }

  const nonImageUrls: string[] = [];
  for (const u of allUrls) {
    const isImage = IMAGE_EXT_REGEX.test(u) || (IMAGE_HOST_REGEX.test(u) && !AFFILIATE_DOMAINS.some((d) => u.includes(d)));
    if (isImage) {
      if (!thumbnailImage) thumbnailImage = u;
    } else {
      nonImageUrls.push(u);
    }
  }

  // 제휴 도메인 우선 선택
  const affiliateUrl =
    nonImageUrls.find((u) => AFFILIATE_DOMAINS.some((d) => u.toLowerCase().includes(d))) ||
    nonImageUrls[0] ||
    '';

  // 2. 가격 추출
  const priceMatches: { raw: string; num: number }[] = [];
  const wonRegex = /(?:₩\s*)?(\d{1,3}(?:,\d{3})+|\d{4,7})\s*원?/g;
  // 숫자 뒤에 '원'이 있거나 앞에 '₩'가 있거나 '가격' 키워드 근처인 경우만 인정
  const explicitPriceRegex = /(?:₩\s*(\d{1,3}(?:,\d{3})+|\d{4,7})|(\d{1,3}(?:,\d{3})+|\d{4,7})\s*원)/g;
  while ((match = explicitPriceRegex.exec(normalized)) !== null) {
    const digits = (match[1] || match[2] || '').replace(/,/g, '');
    const num = Number(digits);
    if (num >= 500 && num <= 20_000_000) {
      const formatted = `${num.toLocaleString('ko-KR')}원`;
      if (!priceMatches.some((p) => p.num === num)) {
        priceMatches.push({ raw: formatted, num });
      }
    }
  }
  void wonRegex;

  let price = '';
  let originalPrice = '';
  if (priceMatches.length === 1) {
    price = priceMatches[0].raw;
  } else if (priceMatches.length >= 2) {
    const sorted = [...priceMatches].sort((a, b) => a.num - b.num);
    price = sorted[0].raw;
    originalPrice = sorted[sorted.length - 1].raw;
  }

  // 3. 플랫폼 추출
  const affiliatePlatform = detectPlatform(normalized, affiliateUrl);

  // 4. 상품명 추출
  let title = '';
  const explicitTitleMatch = normalized.match(/(?:상품명|제품명|모델명|추천\s*상품)\s*[:：]\s*([^\n\r]+)/i);
  if (explicitTitleMatch?.[1]) {
    title = stripMarkdownBold(explicitTitleMatch[1]);
  }

  const lines = normalized
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const boilerplateRegex =
    /^(?:\(애드픽|드디어\s*정상적으로|조회\s*기준일|오늘의\s*애드픽|애드픽\s*운영자|상품\s*보기|구매\s*링크|수익\s*링크|이미지\s*링크|이미지\s*URL|쇼핑몰|판매처|스토어|가격|판매가|정상가|할인가|핵심\s*특징|장점|요약|추천\s*이유|\d+s\s*동안\s*처리함|---+)/i;

  if (!title) {
    for (const line of lines) {
      if (boilerplateRegex.test(stripMarkdownBold(line))) continue;
      if (/^https?:\/\//i.test(line)) continue;
      if (/^\(?가격\s*확인/i.test(stripMarkdownBold(line))) continue;

      // "1. 상품명" 또는 "### 상품명" 또는 "**상품명**" 우선
      const cleanLine = stripMarkdownBold(
        line
          .replace(/^#+\s*/, '')
          .replace(/^\d+[.)]\s*/, '')
          .replace(/^[-•*▪▶✅🔥✨⚡]\s*/, '')
          .replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g, '$1')
          .replace(/https?:\/\/\S+/g, '')
          .replace(/\(\s*가격\s*확인[^)]*\)/gi, '')
      ).trim();

      if (cleanLine.length >= 2 && cleanLine.length <= 90) {
        title = cleanLine;
        break;
      }
    }
  }

  title = stripMarkdownBold(title)
    .replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .trim();

  // 5. 핵심 특징/설명 라인 추출
  const features: string[] = [];
  for (const line of lines) {
    const cleaned = stripMarkdownBold(
      line
        .replace(/^#+\s*/, '')
        .replace(/^[-•*▪▶✅🔹]\s*/, '')
        .replace(/^\d+[.)]\s*/, '')
        .replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g, '$1')
        .replace(/https?:\/\/\S+/g, '')
    ).trim();

    if (!cleaned || cleaned.length < 6) continue;
    if (cleaned === title) continue;
    if (boilerplateRegex.test(cleaned)) continue;
    if (/^\(?가격\s*확인/i.test(cleaned)) continue;
    if (/^(?:₩\s*)?\d{1,3}(?:,\d{3})+\s*원?$/.test(cleaned)) continue;

    if (!features.includes(cleaned)) {
      features.push(cleaned);
    }
    if (features.length >= 5) break;
  }

  const memo = features.slice(0, 3).join(', ');
  const category = inferCategory(`${title} ${memo} ${normalized}`);
  const slug = generateSlug(title);

  return {
    title,
    affiliateUrl,
    thumbnailImage,
    price,
    originalPrice,
    affiliatePlatform,
    category,
    features,
    memo,
    slug,
  };
}

export default function TechPickManager({ onSuccess }: Props) {
  const [existingPicks, setExistingPicks] = useState<PickItem[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [apiMode, setApiMode] = useState<'local' | 'github' | 'readonly' | null>(null);

  // 1칸 원클릭 붙여넣기 상태
  const [rawPasteText, setRawPasteText] = useState('');
  const [showDetailedStep1, setShowDetailedStep1] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [parseBadges, setParseBadges] = useState<{
    title: boolean;
    price: boolean;
    url: boolean;
    platform: boolean;
    thumbnail: boolean;
    category: PickCategory;
  } | null>(null);

  // 폼 입력 상태
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const [affiliatePlatform, setAffiliatePlatform] = useState('애드픽 (제휴 스토어)');
  const [category, setCategory] = useState<PickCategory>('스마트가전');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [tags, setTags] = useState('테크픽, 가성비추천, 애드픽핫딜');

  // AI 자동 생성되는 필드들
  const [summary1, setSummary1] = useState('');
  const [summary2, setSummary2] = useState('');
  const [summary3, setSummary3] = useState('');

  const [pro1, setPro1] = useState('');
  const [pro2, setPro2] = useState('');
  const [pro3, setPro3] = useState('');
  const [pro4, setPro4] = useState('');

  const [con1, setCon1] = useState('');
  const [con2, setCon2] = useState('');
  const [con3, setCon3] = useState('');

  const [rec1, setRec1] = useState('');
  const [rec2, setRec2] = useState('');
  const [rec3, setRec3] = useState('');
  const [rec4, setRec4] = useState('');

  const [content, setContent] = useState('');
  const [specs, setSpecs] = useState<PickSpecItem[]>([
    { label: '핵심 성능', value: '실사용 최적화 설계', highlight: true },
    { label: '구매 혜택', value: '공식 제휴 실시간 특가', highlight: true },
    { label: '활용도', value: '일상 및 데스크 환경 최적화' },
    { label: '보증/배송', value: '판매처 정식 배송 및 교환 지원' },
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 1. 기존 발행 목록 불러오기
  const fetchPicksList = async () => {
    setIsLoadingList(true);
    try {
      const res = await fetch('/api/admin/picks');
      if (res.ok) {
        const data = await res.json();
        setExistingPicks(data.items || []);
        if (data.mode) setApiMode(data.mode);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    fetchPicksList();
  }, []);

  // 공통 클리어타입 원고 생성기 (** 기호 전면 제거)
  const applyGeneratedDraft = (params: {
    cleanTitle: string;
    cleanMemo: string;
    cleanPrice: string;
    cleanCategory: PickCategory;
    cleanPlatform: string;
    cleanSlug: string;
    extractedFeatures?: string[];
  }) => {
    const t = stripMarkdownBold(params.cleanTitle);
    const m = stripMarkdownBold(params.cleanMemo);
    const p = stripMarkdownBold(params.cleanPrice);
    const cat = params.cleanCategory;
    const plat = stripMarkdownBold(params.cleanPlatform);
    const feats = (params.extractedFeatures || []).map(stripMarkdownBold).filter(Boolean);

    setSlug(params.cleanSlug || generateSlug(t));
    setSubtitle(`${t} 핵심 스펙과 실구매 체크포인트 정밀 분석`);
    setTags(`${cat}, ${t.split(' ').slice(0, 2).join('')}, 가성비추천, 테크픽`);

    // 3줄 핵심 요약
    setSummary1(`${t}의 핵심 특장점과 실사용 활용도를 에디터 관점에서 정리한 추천 리포트`);
    setSummary2(
      feats[0]
        ? `핵심 포인트: ${feats[0]}`
        : m
          ? `주요 특징: ${m} 기반으로 일상 및 작업 효율 향상`
          : `동급 대비 합리적인 가격대와 높은 실용성을 갖춘 추천 모델`
    );
    setSummary3(`${plat} 기준 실시간 특가 ${p || '할인가'}로 확인 가능한 오늘의 큐레이션`);

    // 장점 4개
    setPro1(feats[0] || `${t}만의 직관적인 사용 편의성과 균형 잡힌 마감 완성도`);
    setPro2(feats[1] || (m ? `${m} 구성을 바탕으로 한 실사용 만족도` : `가격 대비 체감 효율이 뛰어난 가성비 포지션`));
    setPro3(feats[2] || `군더더기 없는 실용적 설계로 데스크 및 일상 공간에 자연스럽게 어울림`);
    setPro4(`${plat} 제휴 링크를 통해 실시간 프로모션 가격으로 간편하게 확인 가능`);

    // 단점 / 체크포인트 3개
    setCon1(`인기 프로모션 상품 특성상 실시간 가격과 재고 수량이 예고 없이 변동될 수 있음`);
    setCon2(`주문 전 옵션(색상, 규격, 구성품, 배송 일정)을 상세 페이지에서 반드시 재확인 권장`);
    setCon3(`초기 수령 직후 외관 및 정상 작동 여부를 먼저 점검하는 것이 안전함`);

    // 추천 대상 4개
    setRec1(`가성비와 실용성을 동시에 챙길 수 있는 ${cat} 추천템을 찾으시는 분`);
    setRec2(`복잡한 비교 대신 핵심 장점이 검증된 데일리 아이템을 빠르게 고르고 싶은 분`);
    setRec3(`책상 데스크셋업이나 일상 편의성을 부담 없는 예산으로 업그레이드하고 싶은 분`);
    setRec4(`공식 제휴 스토어의 실시간 특가 혜택을 놓치지 않고 합리적으로 구매하고 싶은 분`);

    // 스펙 테이블
    setSpecs([
      { label: '제품명', value: t, highlight: true },
      { label: '카테고리', value: cat },
      { label: '실시간 판매가', value: p || '상세 페이지 확인', highlight: true },
      { label: '판매 채널', value: plat },
      { label: '핵심 특징', value: m || '실용성 중심 설계', highlight: true },
      { label: '구매 안내', value: '옵션 및 배송 조건 상세 페이지 확인' },
    ]);

    const featureBullets =
      feats.length > 0
        ? feats.map((f, idx) => `- 핵심 포인트 ${idx + 1}: ${f}`).join('\n')
        : `- 핵심 퍼포먼스: 실사용 환경에 최적화된 안정적인 활용성 제공
- 직관적 사용성: 누구나 별도 적응 없이 바로 활용할 수 있는 편리한 구성
- 공간 친화 설계: 데스크테리어 및 생활 공간과 자연스럽게 어우러지는 디자인
- 합리적 가격대: 동급 카테고리 대비 부담을 낮춘 뛰어난 가성비`;

    // 본문 마크다운 (클리어타입: ** 기호 전면 배제)
    const autoContent = `## 1. ${t}, 오늘의 테크픽 선정 이유

매일 사용하는 제품일수록 작은 편의성과 가격 경쟁력의 차이가 체감 만족도를 크게 좌우합니다.

이번 PC-Craft 테크픽에서 소개하는 ${t}은 ${cat} 카테고리에서 실용성과 가격 메리트를 동시에 갖춘 추천 아이템입니다.

단순 나열식 홍보 문구 대신 실제 구매 전 꼭 따져봐야 할 핵심 특징과 체크포인트를 깔끔하게 정리해 드립니다.

---

## 2. 핵심 강점 및 실사용 포인트

### ① 눈에 띄는 실용성과 가성비 밸런스

${t}은 불필요한 거품을 빼고 사용자가 가장 자주 체감하는 기본기에 집중한 구성이 돋보입니다.
${m ? `특히 ${m} 특징 덕분에 일상과 작업 환경에서 활용도가 매우 높습니다.` : '입문자부터 실속파 소비자까지 부담 없이 선택하기 좋은 균형 잡힌 구성을 갖췄습니다.'}

### ② 주요 특징 한눈에 보기

${featureBullets}

---

## 3. 구매 전 필수 확인사항

판매 페이지에서 결제하기 전 아래 3가지를 꼭 확인해 주세요.

1. 상세 옵션 및 규격 확인: 원하는 색상, 사이즈, 전원 규격 또는 패키지 구성이 정확히 선택되었는지 체크하세요.
2. 실시간 가격 및 쿠폰 적용: 제휴 스토어 프로모션이나 카드·쿠폰 할인에 따라 최종 결제 금액이 변동될 수 있습니다.
3. 배송 및 교환 정책: 발송 예정일과 판매처의 교환·반품 안내를 미리 확인해 두시면 안심하고 구매할 수 있습니다.

---

## 4. 최종 총평

${t}은 ${p ? `${p}대의 합리적인 가격으로 ` : ''}일상 만족도를 높여주는 실속형 추천 아이템입니다. 아래 ${plat} 공식 제휴 링크에서 최신 가격과 상세 리뷰를 바로 확인해 보세요.
`;

    setContent(autoContent);
  };

  // 1칸 스마트 붙여넣기 파싱 + 즉시 원고 완성
  const handleSmartParseAndGenerate = () => {
    if (!rawPasteText.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'ChatGPT에서 복사한 애드픽 상품 추천 내용을 위 입력창에 먼저 붙여넣어 주세요.',
      });
      return;
    }

    setIsGenerating(true);
    setStatusMessage(null);

    const parsed = parseChatGptAdpickText(rawPasteText);

    if (!parsed.title) {
      setIsGenerating(false);
      setStatusMessage({
        type: 'error',
        text: '상품명을 자동으로 찾지 못했습니다. 상품명이 포함된 ChatGPT 답변을 붙여넣거나 아래 세부 입력창에서 직접 입력해 주세요.',
      });
      setShowDetailedStep1(true);
      return;
    }

    setTitle(parsed.title);
    setAffiliateUrl(parsed.affiliateUrl);
    setAffiliatePlatform(parsed.affiliatePlatform);
    setCategory(parsed.category);
    setPrice(parsed.price);
    setOriginalPrice(parsed.originalPrice);
    setThumbnailImage(parsed.thumbnailImage);
    setMemo(parsed.memo);

    setParseBadges({
      title: Boolean(parsed.title),
      price: Boolean(parsed.price),
      url: Boolean(parsed.affiliateUrl),
      platform: Boolean(parsed.affiliatePlatform),
      thumbnail: Boolean(parsed.thumbnailImage),
      category: parsed.category,
    });

    // 수익링크가 텍스트에 안 들어있으면(리치 텍스트 링크만 복사된 경우) Step 1을 자동으로 열어 바로 붙여넣기 편하게 안내
    if (!parsed.affiliateUrl) {
      setShowDetailedStep1(true);
    }

    applyGeneratedDraft({
      cleanTitle: parsed.title,
      cleanMemo: parsed.memo,
      cleanPrice: parsed.price,
      cleanCategory: parsed.category,
      cleanPlatform: parsed.affiliatePlatform,
      cleanSlug: parsed.slug,
      extractedFeatures: parsed.features,
    });

    setIsGenerating(false);
    setStatusMessage(
      parsed.affiliateUrl
        ? {
            type: 'success',
            text: `⚡ [${parsed.title}] 자동 분석 및 클리어타입 원고 완성이 끝났습니다! 아래 내용 확인 후 바로 발행하세요.`,
          }
        : {
            type: 'error',
            text: `상품명과 원고는 자동 완성되었으나, 붙여넣은 텍스트에 https:// 수익링크 주소가 없습니다. ChatGPT의 [상품 보기] 링크를 우클릭 → '링크 주소 복사' 후 아래 수익링크 칸에 붙여넣어 주세요.`,
          }
    );
  };

  // 수동 Step 1 기반 원고 재생성
  const handleManualAutoGenerate = () => {
    if (!title.trim()) {
      alert('상품명을 먼저 입력해 주세요! (예: 로지텍 MX Master 3S 마우스)');
      return;
    }

    setIsGenerating(true);
    setStatusMessage(null);

    setTimeout(() => {
      applyGeneratedDraft({
        cleanTitle: title,
        cleanMemo: memo,
        cleanPrice: price,
        cleanCategory: category,
        cleanPlatform: affiliatePlatform,
        cleanSlug: slug || generateSlug(title),
      });
      setIsGenerating(false);
      setStatusMessage({ type: 'success', text: '✨ 입력된 정보 기준으로 클리어타입 원고가 새로 생성되었습니다!' });
    }, 250);
  };

  // 입력 전체 초기화
  const handleResetAll = () => {
    setRawPasteText('');
    setParseBadges(null);
    setTitle('');
    setMemo('');
    setAffiliateUrl('');
    setAffiliatePlatform('애드픽 (제휴 스토어)');
    setCategory('스마트가전');
    setPrice('');
    setOriginalPrice('');
    setThumbnailImage('');
    setSlug('');
    setSubtitle('');
    setSummary1('');
    setSummary2('');
    setSummary3('');
    setContent('');
    setStatusMessage(null);
  };

  // 현재 작성 중인 PickItem 페이로드 조립
  const buildPayload = (): PickItem => ({
    slug: (slug.trim() || generateSlug(title)).trim(),
    title: stripMarkdownBold(title),
    subtitle: stripMarkdownBold(subtitle || `${title} 정밀 분석 리포트`),
    category,
    categoryLabel: `${category} 큐레이션`,
    author: 'PC-Craft 테크 에디터',
    publishedAt: new Date().toISOString().split('T')[0],
    readTimeMinutes: 4,
    tags: tags
      .split(',')
      .map((t) => stripMarkdownBold(t))
      .filter(Boolean),
    thumbnailKeywords: [stripMarkdownBold(title).slice(0, 15), '실구매분석', '에디터PICK', '가성비추천'],
    thumbnailImage:
      thumbnailImage.trim() || 'https://ae-pic-a1.aliexpress-media.com/kf/Sbf9c2f62cb5f4f8992ce5250462c1613V.jpg',
    galleryImages: thumbnailImage.trim() ? [{ url: thumbnailImage.trim(), caption: `${stripMarkdownBold(title)} 대표 이미지` }] : [],
    specs: specs.filter((s) => s.label && s.value),
    summary: [summary1, summary2, summary3].map(stripMarkdownBold).filter(Boolean),
    affiliateUrl: affiliateUrl.trim(),
    affiliatePlatform: stripMarkdownBold(affiliatePlatform) || '애드픽 (제휴 스토어)',
    price: stripMarkdownBold(price) || '특가 확인',
    originalPrice: stripMarkdownBold(originalPrice) || undefined,
    pros: [pro1, pro2, pro3, pro4].map(stripMarkdownBold).filter(Boolean),
    cons: [con1, con2, con3].map(stripMarkdownBold).filter(Boolean),
    recommendFor: [rec1, rec2, rec3, rec4].map(stripMarkdownBold).filter(Boolean),
    content: content.replace(/\*\*/g, '').trim(),
  });

  // ChatGPT 추천 질문 복사
  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(RECOMMENDED_CHATGPT_PROMPT);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch {
      alert('클립보드 복사에 실패했습니다.');
    }
  };

  // JSON 복사 (백업/수동 반영용)
  const handleCopyJson = async () => {
    if (!title.trim()) {
      alert('먼저 상품을 분석하거나 입력해 주세요.');
      return;
    }
    try {
      const payload = buildPayload();
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCopiedJson(true);
      setStatusMessage({ type: 'success', text: '📋 완성된 테크픽 JSON 데이터가 클립보드에 복사되었습니다.' });
      setTimeout(() => setCopiedJson(false), 2200);
    } catch {
      alert('클립보드 복사에 실패했습니다.');
    }
  };

  // 3. 사이트에 즉시 발행
  const handlePublish = async () => {
    if (!title.trim() || !affiliateUrl.trim()) {
      setShowDetailedStep1(true);
      setStatusMessage({
        type: 'error',
        text: '상품명과 수익링크 URL은 필수 입력값입니다. 누락된 항목을 확인해 주세요.',
      });
      return;
    }

    setIsPublishing(true);
    setStatusMessage(null);

    const payload = buildPayload();

    try {
      const res = await fetch('/api/admin/picks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMessage({
          type: 'success',
          text: `🎉 [${payload.title}] ${data.message || '컬럼이 성공적으로 발행되었습니다!'}`,
        });
        fetchPicksList();
        if (onSuccess) onSuccess();
      } else {
        setStatusMessage({ type: 'error', text: data.error || '발행 실패' });
      }
    } catch (e: unknown) {
      setStatusMessage({
        type: 'error',
        text: '네트워크 통신 오류: ' + (e instanceof Error ? e.message : String(e)),
      });
    } finally {
      setIsPublishing(false);
    }
  };

  // 4. 삭제 처리
  const handleDelete = async (targetSlug: string) => {
    if (!confirm(`'${targetSlug}' 항목을 정말 삭제하시겠습니까?`)) return;

    try {
      const res = await fetch(`/api/admin/picks?slug=${encodeURIComponent(targetSlug)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMessage({ type: 'success', text: data.message || `${targetSlug} 항목이 삭제되었습니다.` });
        fetchPicksList();
      } else {
        setStatusMessage({ type: 'error', text: data.error || '삭제 실패' });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. 상단 안내 배너 */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950 via-slate-900 to-amber-950/60 border border-cyan-500/30 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-400 text-slate-950">
              AI CMS v2
            </span>
            <h3 className="text-lg font-black text-white">테크픽(Tech Pick) 1칸 초간편 붙여넣기 발행기</h3>
            {apiMode === 'github' && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                GitHub 자동배포 연동됨
              </span>
            )}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            ChatGPT + 애드픽 플러그인 답변을 통째로 복사해 아래 <strong>1칸 입력창</strong>에 붙여넣기만 하면 상품명·가격·쇼핑몰·수익링크·클리어타입 본문까지 한 번에 완성됩니다.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchPicksList}
          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingList ? 'animate-spin' : ''}`} />
          <span>발행 목록 새로고침</span>
        </button>
      </div>

      {/* 상태 알림 */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm font-bold flex items-start gap-2.5 border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          )}
          <span className="leading-relaxed">{statusMessage.text}</span>
        </div>
      )}

      {/* 2. 메인 1칸 원클릭 붙여넣기 박스 */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-cyan-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-cyan-950/30 border-2 border-amber-400/70 dark:border-amber-500/40 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ClipboardPaste className="w-5 h-5 text-amber-500" />
              <span>⚡ 초간편 1칸 붙여넣기 (ChatGPT + 애드픽 전용)</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              ChatGPT에서 받은 추천 상품 1개 분량을 그대로 복사(Ctrl+C) → 붙여넣기(Ctrl+V) 하세요.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyPrompt}
              className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? '질문 복사 완료!' : 'ChatGPT 추천 질문 복사'}</span>
            </button>
            <button
              type="button"
              onClick={handleResetAll}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              title="입력 초기화"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>초기화</span>
            </button>
          </div>
        </div>

        <textarea
          rows={6}
          value={rawPasteText}
          onChange={(e) => setRawPasteText(e.target.value)}
          placeholder={`여기에 ChatGPT + 애드픽 답변을 통째로 붙여넣으세요! (Ctrl+V)\n\n예시:\n1. 로지텍 MX Master 3S 무선 마우스\n(가격 확인 119,000원)\n쇼핑몰: 쿠팡\n무소음 클릭과 8000DPI 센서로 데스크셋업에 최적화된 모델입니다.\nhttps://bitl.bz/xxxxxx`}
          className="w-full p-4 rounded-xl border border-amber-300/80 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={handleSmartParseAndGenerate}
            disabled={isGenerating}
            className="flex-1 py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
          >
            <Wand2 className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? '자동 분석 및 원고 생성 중...' : '⚡ 통째로 자동 분석 & 원고 즉시 완성하기'}</span>
          </button>
        </div>

        {/* 자동 추출 결과 배지 */}
        {parseBadges && (
          <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] font-bold">
            <span className="text-slate-500 dark:text-slate-400">자동 추출 결과:</span>
            <span
              className={`px-2.5 py-1 rounded-full ${
                parseBadges.title
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
              }`}
            >
              상품명 {parseBadges.title ? '✓' : '누락'}
            </span>
            <span
              className={`px-2.5 py-1 rounded-full ${
                parseBadges.url
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
              }`}
            >
              수익링크 {parseBadges.url ? '✓' : '직접 붙여넣기 필요'}
            </span>
            <span
              className={`px-2.5 py-1 rounded-full ${
                parseBadges.price
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              가격 {parseBadges.price ? '✓' : '미감지'}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
              카테고리: {parseBadges.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              플랫폼: {affiliatePlatform}
            </span>
            {parseBadges.thumbnail && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                썸네일 이미지 ✓
              </span>
            )}
          </div>
        )}
      </div>

      {/* 3. 세부 입력창 (접기/펼치기 지원) + 생성된 원고 검토 및 발행 */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Step 1 토글 헤더 */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Step 1. 자동 입력된 상품 세부 정보 (필요 시 수정)</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {title
                ? `${title} · ${price || '가격 미지정'} · ${affiliateUrl ? '수익링크 연결됨' : '⚠️ 수익링크 입력 필요'}`
                : '위 1칸 붙여넣기를 사용하면 자동으로 채워집니다. 직접 입력할 때만 펼쳐서 작성하세요.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowDetailedStep1((prev) => !prev)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>{showDetailedStep1 ? '세부 입력 접기' : '세부 입력 펼치기'}</span>
            {showDetailedStep1 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showDetailedStep1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {/* 상품명 */}
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  추천 상품명 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 로지텍 MX Master 3S 무선 마우스"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-cyan-500"
                />
              </div>

              {/* 카테고리 */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">카테고리</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PickCategory)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-cyan-500"
                >
                  <option value="스마트가전">스마트가전</option>
                  <option value="데스크셋업">데스크셋업</option>
                  <option value="모바일/음향">모바일/음향</option>
                  <option value="라이프테크">라이프테크</option>
                  <option value="게이밍기어">게이밍기어</option>
                </select>
              </div>

              {/* 제휴 수익링크 */}
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  수익링크 URL (애드픽/제휴 링크) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  value={affiliateUrl}
                  onChange={(e) => setAffiliateUrl(e.target.value)}
                  placeholder="https://bitl.bz/... 또는 애드픽 수익링크 주소"
                  className={`w-full px-3 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-cyan-500 font-mono ${
                    title && !affiliateUrl
                      ? 'border-amber-500 ring-2 ring-amber-400/40'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
              </div>

              {/* 제휴 플랫폼 라벨 */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">제휴 플랫폼 표기</label>
                <input
                  type="text"
                  value={affiliatePlatform}
                  onChange={(e) => setAffiliatePlatform(e.target.value)}
                  placeholder="예: 애드픽 (쿠팡)"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-cyan-500"
                />
              </div>

              {/* 실시간 특가 */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">실시간 특가 (판매가)</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="예: 89,000원"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-cyan-500"
                />
              </div>

              {/* 정가 */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">정상가 (취소선용, 선택)</label>
                <input
                  type="text"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="예: 139,000원"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-cyan-500"
                />
              </div>

              {/* 대표 썸네일 이미지 URL */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">대표 썸네일 이미지 URL</label>
                <input
                  type="url"
                  value={thumbnailImage}
                  onChange={(e) => setThumbnailImage(e.target.value)}
                  placeholder="https://... 이미지 링크 (없으면 기본 이미지)"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-cyan-500 font-mono text-[11px]"
                />
              </div>

              {/* 핵심 메모 / 스펙 키워드 */}
              <div className="space-y-1 sm:col-span-3">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  핵심 메모 / 특징 키워드 (원고 재생성 반영용)
                </label>
                <input
                  type="text"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="예: 무소음 클릭 스위치, 8000DPI 센서, 블루투스 3채널 멀티페어링"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-cyan-500"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleManualAutoGenerate}
              disabled={isGenerating}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>수정한 세부 정보로 아래 원고 다시 생성하기</span>
            </button>
          </div>
        )}

        {/* Step 2. 생성된 원고 검토 및 발행 */}
        <div className="space-y-4">
          <h4 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-500" />
            <span>Step 2. 완성된 클리어타입 원고 검토 및 발행</span>
          </h4>

          {/* 슬러그 & 서브타이틀 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">고유 URL 식별자 (Slug)</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="자동 생성됩니다 (예: mx-master-3s)"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">소제목 (Subtitle)</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* 3줄 요약 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-500" />
              <span>3줄 핵심 요약</span>
            </span>
            <input
              type="text"
              value={summary1}
              onChange={(e) => setSummary1(e.target.value)}
              placeholder="1번째 핵심 요약"
              className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
            <input
              type="text"
              value={summary2}
              onChange={(e) => setSummary2(e.target.value)}
              placeholder="2번째 핵심 요약"
              className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
            <input
              type="text"
              value={summary3}
              onChange={(e) => setSummary3(e.target.value)}
              placeholder="3번째 핵심 요약"
              className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          {/* 본문 마크다운 */}
          <div className="space-y-1 text-xs">
            <label className="font-bold text-slate-700 dark:text-slate-300">
              본문 상세 리뷰 (클리어타입 · ** 기호 자동 제거)
            </label>
            <textarea
              rows={11}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs leading-relaxed"
            />
          </div>

          {/* 최종 발행 + JSON 복사 버튼 */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex-1 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] cursor-pointer"
            >
              <Send className="w-5 h-5" />
              <span>{isPublishing ? '사이트에 발행 등록 중...' : '🚀 PC-Craft 테크픽 즉시 발행하기 (Publish)'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyJson}
              className="sm:w-44 py-4 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copiedJson ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiedJson ? 'JSON 복사됨' : 'JSON 복사'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. 현재 등록된 테크픽 목록 관리 */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h4 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-500" />
            <span>현재 발행된 커스텀 테크픽 ({existingPicks.length})</span>
          </h4>
          <span className="text-xs text-slate-400">관리자 추가 글 관리</span>
        </div>

        {existingPicks.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            아직 관리자가 직접 추가 발행한 글이 없습니다. 위 1칸 붙여넣기로 첫 테크픽을 발행해 보세요!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {existingPicks.map((pick) => (
              <div
                key={pick.slug}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">{pick.category}</span>
                    <span>{pick.publishedAt}</span>
                  </div>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{pick.title}</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{pick.subtitle}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <a
                    href={`/picks/${pick.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>사이트에서 보기</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDelete(pick.slug)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                    title="삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
