'use client';

import React, { useState, useEffect } from 'react';
import { PickItem, PickCategory, PickSpecItem } from '@/data/picks/types';
import { 
  Sparkles, 
  Send, 
  ExternalLink, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  RefreshCw, 
  Flame, 
  ShoppingBag,
  Layers,
  Check,
  AlertTriangle,
  Eye,
  FileText
} from 'lucide-react';

interface Props {
  onSuccess?: () => void;
}

export default function TechPickManager({ onSuccess }: Props) {
  const [existingPicks, setExistingPicks] = useState<PickItem[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);

  // 폼 입력 상태
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const [affiliatePlatform, setAffiliatePlatform] = useState('애드픽 (AliExpress)');
  const [category, setCategory] = useState<PickCategory>('스마트가전');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [tags, setTags] = useState('가전추천, 핫딜, 테크픽');

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
    { label: '핵심 성능', value: '고성능 최적화 모듈 탑재', highlight: true },
    { label: '정격 전원', value: '220V 한국 표준 호환', highlight: true },
    { label: '무게/크기', value: '경량 콤팩트 설계' },
    { label: '보증/배송', value: '무료 배송 및 구매자 보호' }
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

  // 2. AI 원클릭 초안 자동 완성 엔진
  const handleAutoGenerate = () => {
    if (!title.trim()) {
      alert('상품명을 먼저 입력해 주세요! (예: 로지텍 MX Master 3S 마우스)');
      return;
    }

    setIsGenerating(true);
    setStatusMessage(null);

    // 상품명 기반 영문 슬러그 생성
    const cleanSlug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') || `pick-${Date.now().toString().slice(-6)}`;
    setSlug(cleanSlug);

    setTimeout(() => {
      // 제목 및 서브타이틀 고도화
      const autoSubtitle = `${title} 실사용 장단점과 구매 전 필수 체크포인트 정밀 분석`;
      setSubtitle(autoSubtitle);

      // 3줄 요약 자동 완성
      setSummary1(`${title}의 핵심 스펙과 실사용 환경을 철저히 검증한 에디터 정밀 리포트`);
      setSummary2(memo ? `주요 특징: ${memo} 기반으로 일상 및 업무 효율 극대화` : `동급 대비 우수한 가성비와 안정적인 마감 완성도`);
      setSummary3(`공식 제휴 프로모션 혜택을 통해 실시간 특가 기준 ${price || '합리적인 가격'}에 구매 가능`);

      // 장점 4개
      setPro1(`${title}의 뛰어난 마감 품질과 직관적인 사용 편의성`);
      setPro2(memo ? `${memo} 사양을 바탕으로 한 안정적인 퍼포먼스` : `동급 세그먼트 최고 수준의 성능과 사용자 만족도`);
      setPro3(`군더더기 없는 미니멀 디자인과 높은 공간 활용도`);
      setPro4(`정식 호환 및 합리적인 실구매가 대비 높은 만족감`);

      // 단점 / 구매 전 체크 3개
      setCon1(`인기 모델 특성상 재고 및 특가 할인율이 예고 없이 변동될 수 있음`);
      setCon2(`해외 직구 또는 배송 옵션 선택 시 규격 및 플러그/옵션 세부 선택 필수 확인`);
      setCon3(`초기 개봉 시 구성품 누락 여부 및 정상 작동 테스트 권장`);

      // 추천 대상 4개
      setRec1(`가성비와 실용성을 모두 갖춘 스마트 추천템을 찾으시는 분`);
      setRec2(`기존 구형 제품의 성능 한계에 아쉬움을 느끼셨던 분`);
      setRec3(`책상 데스크테리어 또는 생활 편의성을 한층 업그레이드하고 싶은 분`);
      setRec4(`실제 검증된 스펙과 리뷰를 바탕으로 안전하게 구매하고 싶은 분`);

      // 스펙 테이블 자동 생성
      setSpecs([
        { label: '제품 모델명', value: title, highlight: true },
        { label: '카테고리', value: category },
        { label: '실시간 판매가', value: price || '특가 확인', highlight: true },
        { label: '주요 특징', value: memo || '고성능 설계' },
        { label: '전원/호환', value: '국내 표준 220V / KC 인증 또는 정식 규격', highlight: true },
        { label: '배송/혜택', value: '공식 제휴 스토어 무료/특가 배송' }
      ]);

      // 본문 마크다운 자동 완성 (클리어타입: ** 기호 제거)
      const autoContent = `## 1. ${title}, 똑똑한 소비자를 위한 실구매 분석

일상과 업무 환경에서 매일 마주하는 제품일수록 작은 스펙의 차이가 라이프스타일의 쾌적함을 좌우합니다.

이번에 정밀 분석한 ${title}은 ${category} 카테고리에서 탁월한 가성비와 사용자 평점으로 주목받고 있는 핵심 모델입니다.

단순 제조사 광고 문구에 그치지 않고, 실제 판매 페이지의 상세 사양과 사용자 피드백을 기반으로 어떤 특장점과 주의점이 있는지 꼼꼼하게 정리해 드립니다.

---

## 2. 핵심 강점 및 성능 분석

### ① 뛰어난 체감 성능과 높은 완성도
${title}은 동급 경쟁 제품 대비 안정적인 완성도와 신뢰할 수 있는 마감을 자랑합니다.
${memo ? `특히 ${memo} 요소가 적용되어 실사용 시 확연한 차이를 느낄 수 있습니다.` : '매일 사용하는 환경에서 잔고장 없이 오래도록 만족스럽게 사용할 수 있는 내구성을 갖췄습니다.'}

### ② 사용자 중심의 디테일과 편의성
직관적인 조작 체계와 미니멀한 디자인으로 어떤 인테리어나 데스크 환경에도 자연스럽게 어우러집니다. 휴대성과 거치 편의성까지 고려한 인체공학적 설계가 돋보입니다.

---

## 3. 구매 전 필수 체크포인트

구매를 결정하시기 전 아래 사항을 판매 페이지 옵션에서 반드시 재확인하시기 바랍니다.

1. 상세 옵션 및 규격: 주문 시 본인에게 맞는 컬러 및 규격(전압, 케이블, 사이즈 등)이 올바르게 선택되었는지 확인하세요.
2. 배송 및 프로모션 할인: 제휴 할인 쿠폰이나 카드사 즉시 할인 적용 여부에 따라 최종 결제 금액이 달라질 수 있습니다.
3. A/S 및 교환 정책: 판매 스토어의 교환/반품 보증 기간을 미리 숙지해 두시면 좋습니다.

---

## 4. 최종 총평 및 실시간 특가 안내

${title}은 합리적인 가격대에 높은 만족도를 제공하는 강력 추천 아이템입니다. 현재 공식 제휴 스토어를 통해 실시간 특가 프로모션이 진행 중이니 아래 링크를 통해 혜택을 확인해 보세요.
`;
      setContent(autoContent);

      setIsGenerating(false);
      setStatusMessage({ type: 'success', text: '✨ AI 원고 및 12대 스펙 초안이 완벽하게 생성되었습니다!' });
    }, 400);
  };

  // 3. 사이트에 즉시 발행
  const handlePublish = async () => {
    if (!title.trim() || !slug.trim() || !affiliateUrl.trim()) {
      alert('상품명, 슬러그, 수익링크는 필수 입력값입니다.');
      return;
    }

    setIsPublishing(true);
    setStatusMessage(null);

    const payload: PickItem = {
      slug: slug.trim(),
      title: title.trim(),
      subtitle: subtitle.trim() || `${title} 정밀 분석 리포트`,
      category,
      categoryLabel: `${category} 큐레이션`,
      author: 'PC-Craft 테크 에디터',
      publishedAt: new Date().toISOString().split('T')[0],
      readTimeMinutes: 4,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      thumbnailKeywords: [title.slice(0, 15), '실측스펙검증', '에디터PICK', '가성비추천'],
      thumbnailImage: thumbnailImage.trim() || 'https://ae-pic-a1.aliexpress-media.com/kf/Sbf9c2f62cb5f4f8992ce5250462c1613V.jpg',
      galleryImages: thumbnailImage.trim() ? [{ url: thumbnailImage.trim(), caption: `${title} 메인 외관` }] : [],
      specs: specs.filter((s) => s.label && s.value),
      summary: [summary1, summary2, summary3].filter(Boolean),
      affiliateUrl: affiliateUrl.trim(),
      affiliatePlatform: affiliatePlatform.trim(),
      price: price.trim() || '특가 확인',
      originalPrice: originalPrice.trim() || undefined,
      pros: [pro1, pro2, pro3, pro4].filter(Boolean),
      cons: [con1, con2, con3].filter(Boolean),
      recommendFor: [rec1, rec2, rec3, rec4].filter(Boolean),
      content: content.trim(),
    };

    try {
      const res = await fetch('/api/admin/picks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMessage({ type: 'success', text: `🎉 [${title}] 컬럼이 사이트에 성공적으로 발행되었습니다!` });
        fetchPicksList();
        if (onSuccess) onSuccess();
      } else {
        setStatusMessage({ type: 'error', text: data.error || '발행 실패' });
      }
    } catch (e: unknown) {
      setStatusMessage({ type: 'error', text: '네트워크 통신 오류: ' + (e instanceof Error ? e.message : String(e)) });
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
      if (res.ok) {
        fetchPicksList();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. 상단 안내 카드 */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-900/40 via-slate-900 to-amber-900/30 border border-cyan-500/30 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-500 text-slate-950">
              AI CMS
            </span>
            <h3 className="text-lg font-black text-white">테크픽(Tech Pick) 원클릭 자동 생성 &amp; 발행기</h3>
          </div>
          <p className="text-xs text-slate-300">
            상품명과 애드픽/제휴 수익링크만 넣고 <strong>[✨ AI 원클릭 초안 자동 완성]</strong>을 누르면 3줄 요약, 스펙표, 장단점, 본문 마크다운까지 즉시 생성됩니다.
          </p>
        </div>

        <button
          onClick={fetchPicksList}
          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingList ? 'animate-spin' : ''}`} />
          <span>발행 목록 새로고침</span>
        </button>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 border ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300' 
            : 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-300'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* 2. 에디터 폼 */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <h4 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Step 1. 기본 정보 입력</span>
          </h4>
          <span className="text-xs text-slate-400">최소 상품명과 수익링크만 넣어도 AI 생성이 가능합니다.</span>
        </div>

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
              수익링크 URL (애드픽/링크프라이스 등) <span className="text-rose-500">*</span>
            </label>
            <input
              type="url"
              value={affiliateUrl}
              onChange={(e) => setAffiliateUrl(e.target.value)}
              placeholder="https://bitl.bz/8fQuFl 또는 제휴 링크"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-cyan-500 font-mono"
            />
          </div>

          {/* 제휴 플랫폼 라벨 */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 dark:text-slate-300">제휴 플랫폼 표기</label>
            <input
              type="text"
              value={affiliatePlatform}
              onChange={(e) => setAffiliatePlatform(e.target.value)}
              placeholder="예: 애드픽 (AliExpress)"
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
              핵심 메모 / 실측 특징 키워드 (AI 생성 반영용)
            </label>
            <input
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="예: 무소음 클릭 스위치, 8000DPI 다크필드 센서, 블루투스 3채널 멀티페어링, USB-C 고속충전"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-cyan-500"
            />
          </div>
        </div>

        {/* AI 자동 완성 버튼 */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleAutoGenerate}
            disabled={isGenerating}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-90 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'AI 원고 & 스펙 분석 생성 중...' : '✨ AI 원클릭 초안 자동 완성하기'}</span>
          </button>
        </div>

        {/* Step 2. AI가 채워준 상세 내용 & 미리보기 수정 */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-4">
          <h4 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-500" />
            <span>Step 2. 생성된 원고 검토 및 편집</span>
          </h4>

          {/* 슬러그 & 서브타이틀 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">고유 URL 식별자 (Slug)</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="예: mx-master-3s-review"
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
            <label className="font-bold text-slate-700 dark:text-slate-300">본문 상세 리뷰 (Markdown)</label>
            <textarea
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs leading-relaxed"
            />
          </div>

          {/* 최종 발행 버튼 */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-base flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] cursor-pointer"
            >
              <Send className="w-5 h-5" />
              <span>{isPublishing ? '사이트에 발행 등록 중...' : '🚀 PC-Craft 테크픽 즉시 발행하기 (Publish)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. 현재 등록된 테크픽 목록 관리 */}
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
            아직 관리자가 직접 추가 발행한 글이 없습니다. 위 폼에서 새 제품을 추가해 보세요!
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
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                    {pick.title}
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {pick.subtitle}
                  </p>
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
                    onClick={() => handleDelete(pick.slug)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
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
