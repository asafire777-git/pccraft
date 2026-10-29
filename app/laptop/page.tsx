'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import AdBanner from '@/components/AdBanner';
import { CURATED_LAPTOPS, LaptopCategory, LaptopProduct, AvailableMall } from '@/data/laptops';
import { 
  getHimartSearchUrl, 
  getLotteonSearchUrl, 
  getGmarketSearchUrl, 
  get11stSearchUrl,
  getCoupangSearchDirectUrl,
  getDanawaSearchUrl
} from '@/lib/affiliate';
import Link from 'next/link';
import { 
  Laptop, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles, 
  Check, 
  ArrowLeft, 
  Tag, 
  Clock, 
  CreditCard,
  Building2,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

const MALL_CONFIG: Record<AvailableMall, {
  label: string;
  bgColor: string;
  title: string;
  getUrl: (keyword: string) => string;
}> = {
  danawa: {
    label: '다나와 최저가',
    bgColor: 'bg-sky-600 hover:bg-sky-500 text-white',
    title: '다나와 실시간 최저가 및 전 판매처 가격비교 확인',
    getUrl: (kw: string) => getDanawaSearchUrl(kw),
  },
  coupang: {
    label: '쿠팡 로켓특가',
    bgColor: 'bg-cyan-600 hover:bg-cyan-500 text-white',
    title: '쿠팡 로켓배송 실시간 특가 및 내일 도착 확인',
    getUrl: (kw: string) => getCoupangSearchDirectUrl(kw),
  },
  gmarket: {
    label: 'G마켓 공식관',
    bgColor: 'bg-orange-600 hover:bg-orange-500 text-white',
    title: 'G마켓 공식 총판 실시간 최저가 확인',
    getUrl: (kw: string) => getGmarketSearchUrl(kw),
  },
  '11st': {
    label: '11번가 특가',
    bgColor: 'bg-red-600 hover:bg-red-500 text-white',
    title: '11번가 슈팅배송 및 즉시할인 확인',
    getUrl: (kw: string) => get11stSearchUrl(kw),
  },
  himart: {
    label: '하이마트 특가',
    bgColor: 'bg-rose-600 hover:bg-rose-500 text-white',
    title: '롯데하이마트 롯데/현대카드 7% 청구할인 확인',
    getUrl: (kw: string) => getHimartSearchUrl(kw),
  },
  lotteon: {
    label: '롯데ON 메가딜',
    bgColor: 'bg-red-700 hover:bg-red-600 text-white',
    title: '롯데ON 온쇼페 디지털 메가딜 확인',
    getUrl: (kw: string) => getLotteonSearchUrl(kw),
  },
};

export default function LaptopCurationPage() {
  const [selectedCategory, setSelectedCategory] = useState<LaptopCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs: { key: LaptopCategory | 'all'; label: string; icon: string }[] = [
    { key: 'all', label: '전체 보기', icon: '🔥' },
    { key: 'budget-gaming', label: '가성비 게이밍 (100만~130만)', icon: '⚡' },
    { key: 'flagship-gaming', label: '플래그십 게이밍 (QHD 종결)', icon: '👑' },
    { key: 'brand-desktop', label: '완본체 데스크톱 (삼성·한성)', icon: '🏢' },
  ];

  const filteredProducts = CURATED_LAPTOPS.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.cpu.toLowerCase().includes(q) ||
        p.gpu.toLowerCase().includes(q) ||
        p.modelName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl 2xl:max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 상단 빵부스러기 및 견적기 바로가기 */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> 맞춤 견적기로 돌아가기
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>다나와·쿠팡·G마켓·11번가·하이마트·롯데ON 실매물 연동</span>
          </div>
        </div>

        <DisclaimerBanner />

        {/* 히어로 헤더 */}
        <section className="text-center py-8 sm:py-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/40 text-rose-800 dark:text-rose-300 text-xs font-semibold mb-4">
            <Laptop className="w-3.5 h-3.5 text-rose-600" />
            <span>2026 브랜드 PC &amp; 게이밍 노트북 공식 큐레이션관</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            직접 조립이 망설여진다면?
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-orange-500 to-amber-600 dark:from-rose-400 dark:via-orange-300 dark:to-amber-400">
              100% 실존 매물 검증 완제품 &amp; 랩탑
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            가짜 매물이나 없는 재고가 아닌, <strong>다나와 실시간 최저가 및 주요 마켓에 실제 존재하는 베스트셀러 모델만 엄선</strong>했습니다.
            <br className="hidden sm:inline" />
            복잡한 부품 조립과 윈도우 설치 걱정 없이, 박스 뜯고 전원만 꽂으면 즉시 게임이 가능한 공식 인증 제품을 실시간 확인하세요.
          </p>

          {/* 간편 검색창 */}
          <div className="mt-6 max-w-md mx-auto">
            <input
              type="text"
              placeholder="모델명, 제조사(레노버, HP, 삼성, 한성), 그래픽카드 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
            />
          </div>
        </section>

        {/* 카테고리 필터 탭 */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-8 pb-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                selectedCategory === tab.key
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md scale-102'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 큐레이션 제품 카드 그리드 */}
        <section className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
            {filteredProducts.map((p) => {
              return (
                <div
                  key={p.id}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* 상단 뱃지 & 브랜드 */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                        {p.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-400 font-mono">
                        {p.brand} • {p.categoryLabel}
                      </span>
                    </div>

                    {/* 제품명 & 추천 이유 */}
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed font-medium">
                      {p.recommendedReason}
                    </p>

                    {/* 가격 정보 박스 */}
                    <div className="my-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-slate-400 line-through">
                          정상가 {p.regularPrice.toLocaleString()}원
                        </span>
                        <div className="text-right">
                          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 mr-2">
                            카드 청구 체감가
                          </span>
                          <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                            약 {p.effectivePrice.toLocaleString()}원
                          </span>
                        </div>
                      </div>
                      <div className="mt-1.5 text-[11px] text-amber-600 dark:text-amber-400 flex items-center justify-end gap-1 font-semibold">
                        <CreditCard className="w-3 h-3" />
                        <span>{p.cardBenefit}</span>
                      </div>
                    </div>

                    {/* 상세 하드웨어 스펙 테이블 */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                      <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/50">
                        <span className="text-[10px] text-slate-400 block font-mono">CPU</span>
                        <strong className="text-slate-800 dark:text-slate-200 line-clamp-1">{p.cpu}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/50">
                        <span className="text-[10px] text-slate-400 block font-mono">GPU (TGP)</span>
                        <strong className="text-slate-800 dark:text-slate-200 line-clamp-1">{p.gpu}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/50">
                        <span className="text-[10px] text-slate-400 block font-mono">메모리 / 저장공간</span>
                        <strong className="text-slate-800 dark:text-slate-200 line-clamp-1">{p.ram} / {p.storage}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/50">
                        <span className="text-[10px] text-slate-400 block font-mono">디스플레이 / 무게</span>
                        <strong className="text-slate-800 dark:text-slate-200 line-clamp-1">{p.display.split(' ')[0]} / {p.weight}</strong>
                      </div>
                    </div>

                    {/* 실측 게임 FPS 벤치마크 뱃지 */}
                    <div className="my-3 flex flex-wrap gap-1.5">
                      {p.gameBenchmarks.map((bm, bIdx) => (
                        <span
                          key={bIdx}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/40 font-semibold"
                        >
                          {bm.game}: <strong className="font-mono text-slate-900 dark:text-white">{bm.fps}</strong>
                        </span>
                      ))}
                    </div>

                    {/* 무상 A/S 및 보증 */}
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 my-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{p.warranty}</span>
                    </div>
                  </div>

                  {/* 하단 플랫폼별 실제 입점 마켓 맞춤형 직행 버튼 */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 flex items-center justify-between">
                      <span>실제 판매처 실시간 재고 &amp; 특가 확인</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">100% 실존 매물 검증</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {p.availableMalls.map((mallKey) => {
                        const config = MALL_CONFIG[mallKey];
                        if (!config) return null;
                        const kw = p.mallKeywords?.[mallKey] || p.searchKeyword;
                        const url = config.getUrl(kw);

                        return (
                          <a
                            key={mallKey}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className={`py-2 px-2 rounded-xl ${config.bgColor} font-bold text-xs flex items-center justify-center gap-1 shadow-sm transition-all text-center truncate`}
                            title={config.title}
                          >
                            <span className="truncate">{config.label}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 중간 스폰서 배너 슬롯 */}
        <AdBanner slotId="laptop-mid-slot" theme="prebuilt" />

        {/* 전문 구매 가이드 섹션 */}
        <section className="my-14 p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
            <span className="text-xs font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider font-mono">
              Expert Buying Strategy
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              게이밍 노트북 &amp; 완본체 실패 없는 3대 구매 전략
            </h2>
          </div>

          <div className="space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {/* 가이드 1 */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center text-xs font-bold font-mono">1</span>
                <span>노트북 살 때 'TGP(소비 전력 한계치)'를 반드시 확인해야 하는 이유</span>
              </h3>
              <p>
                동일한 'GeForce RTX 4060' 또는 'RTX 4070'이라는 이름을 달고 있어도, 얇고 가벼운 슬림 노트북에 들어간 GPU는 **TGP(Total Graphics Power)가 45W~65W**에 불과할 수 있습니다. 
                반면 정통 게이밍 노트북(레노버 리전, HP 오멘 등)에 들어간 GPU는 **TGP 140W 풀파워**를 뿜어냅니다. 
                전력 한계치가 2배 이상 차이 나기 때문에 실제 게임에서의 프레임은 무려 **35%~40% 이상 격차**가 벌어집니다. 
                따라서 제품 스펙표에서 단순히 그래픽카드 이름만 볼 것이 아니라, <strong>'최대 TGP 115W~140W'</strong>를 만족하는지 반드시 확인해야 합니다.
              </p>
            </div>

            {/* 가이드 2 */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center text-xs font-bold font-mono">2</span>
                <span>롯데하이마트 &amp; 롯데ON에서 체감가 15만 원 이상 아끼는 결제 노하우</span>
              </h3>
              <p>
                오픈마켓 중 <strong>롯데하이마트</strong>와 <strong>롯데ON</strong>은 대기업 완제품(삼성, LG) 및 정품 수입 노트북(레노버, HP)에서 강력한 카드 프로모션을 제공합니다.
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-xs sm:text-sm pl-2">
                <li><strong>카드사 결제일 7%~10% 청구할인:</strong> 롯데카드, 현대카드 결제 시 익월 카드 대금 청구서에서 10만~15만 원이 즉시 차감 청구됩니다.</li>
                <li><strong>L.POINT 대량 페이백:</strong> 디지털 위크 및 온쇼페 기간에는 구매 금액의 3%~5%를 L.POINT로 환급해 줍니다.</li>
                <li><strong>전국 오프라인 매장 A/S 접수 연계:</strong> 온라인에서 구매했더라도 제품 이상 시 가까운 하이마트 매장에서 수리 대행을 무료로 받을 수 있습니다.</li>
              </ul>
            </div>

            {/* 가이드 3 */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center text-xs font-bold font-mono">3</span>
                <span>대기업 완본체(삼성) vs 조립 전문 완본체(한성): 누구에게 추천하는가?</span>
              </h3>
              <p>
                컴퓨터 하드웨어 지식이 풍부하고 최고의 가성비를 원한다면 부품 단품 수준의 가격에 조립과 배선 정리, 1년 출장 A/S까지 포함된 <strong>한성컴퓨터 게이밍 완본체</strong>가 탁월합니다. 
                반면 <strong>부모님 선물용, 자녀 학습용 PC, 또는 소프트웨어 오류 시 기사님이 직접 방문해 주기를 바라는 사용자</strong>에게는 
                전국 공식 서비스센터를 보유한 <strong>삼성전자 오디세이 데스크톱</strong>이 가장 신뢰할 수 있는 선택입니다.
              </p>
            </div>
          </div>
        </section>

        {/* 하단 맞춤 견적기 복귀 배너 */}
        <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-rose-950 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-black">나만의 커스텀 조립 PC 견적이 궁금하신가요?</h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              부품별 실시간 최저가와 3초 만에 검증되는 완벽한 호환성 진단을 경험해보세요.
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-black text-xs sm:text-sm shrink-0 shadow-lg transition-all"
          >
            <span>🚀 커스텀 맞춤 견적기 가기</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
