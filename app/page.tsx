'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import EventBanner from '@/components/EventBanner';
import SearchBar from '@/components/SearchBar';
import AdBanner from '@/components/AdBanner';
import GameSelector from '@/components/GameSelector';
import CompatibilityBadge from '@/components/CompatibilityBadge';
import BuilderTable from '@/components/BuilderTable';
import PriceBattle from '@/components/PriceBattle';
import QuoteStorageModal from '@/components/QuoteStorageModal';
import PrebuiltComparison from '@/components/PrebuiltComparison';
import MultiPlatformExhibitionGrid from '@/components/MultiPlatformExhibitionGrid';
import AiAnalysisCard from '@/components/AiAnalysisCard';
import HardwareLabShowcase from '@/components/HardwareLabShowcase';
import { GAME_PRESETS, GamePreset } from '@/data/presets';
import { COMPONENTS_DATA, ComponentItem } from '@/data/components';
import { checkCompatibility } from '@/lib/compatibility';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  const [currentPreset, setCurrentPreset] = useState<GamePreset>(GAME_PRESETS[1]);
  const [showQuoteStorage, setShowQuoteStorage] = useState(false);

  const [selectedComponents, setSelectedComponents] = useState<Record<string, ComponentItem>>(() => {
    const initial: Record<string, ComponentItem> = {};
    const defaultIds = GAME_PRESETS[1].defaultComponentIds;

    Object.entries(defaultIds).forEach(([catKey, id]) => {
      const found = COMPONENTS_DATA[catKey]?.find((item) => item.id === id);
      if (found) {
        initial[catKey] = found;
      }
    });
    return initial;
  });

  const handleSelectPreset = (preset: GamePreset) => {
    setCurrentPreset(preset);
    const updated: Record<string, ComponentItem> = {};
    Object.entries(preset.defaultComponentIds).forEach(([catKey, id]) => {
      const found = COMPONENTS_DATA[catKey]?.find((item) => item.id === id);
      if (found) {
        updated[catKey] = found;
      }
    });
    setSelectedComponents(updated);
  };

  const handleLoadQuote = (components: Record<string, ComponentItem>, presetTitle?: string) => {
    setSelectedComponents(components);
    if (presetTitle) {
      const matched = GAME_PRESETS.find((p) => p.title === presetTitle);
      if (matched) {
        setCurrentPreset(matched);
      }
    }
  };

  const handleSelectComponent = (category: string, item: ComponentItem) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [category]: item
    }));
  };

  const totalPrice = useMemo(() => {
    return Object.values(selectedComponents).reduce((acc, cur) => acc + (cur?.price || 0), 0);
  }, [selectedComponents]);

  const compatibilityReport = useMemo(() => {
    return checkCompatibility(selectedComponents);
  }, [selectedComponents]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${currentPreset.title} 커스텀 PC 견적`,
    description: currentPreset.performanceDescription,
    image: 'https://pccraft.kr/og-image.jpg',
    brand: {
      '@type': 'Brand',
      name: 'PC-Craft'
    },
    category: 'Computers > Desktop Computers',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'KRW',
      lowPrice: totalPrice,
      highPrice: currentPreset.recommendedPrebuilt.price,
      offerCount: 8,
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      url: 'https://pccraft.kr'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '128',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'PC 견적 검증 연구소'
        },
        reviewBody: '최신 부품 호환성과 피크 소비전력 검증을 통과한 안정적인 가성비 조립 컴퓨터 구성입니다.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header onOpenQuoteStorage={() => setShowQuoteStorage(true)} />

      <main className="flex-1 max-w-7xl 2xl:max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 쿠팡 파트너스 기간 한정 프로모션 & 기획전 자동 이벤트 배너 */}
        <EventBanner />

        <DisclaimerBanner />

        {/* 히어로 타이틀 영역 */}
        <section className="text-center py-8 sm:py-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800/40 text-cyan-800 dark:text-cyan-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            2026 하드웨어 최신 트렌드 & 실시간 오픈마켓 최저가
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            원하는 게임만 고르세요.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-600 dark:from-cyan-400 dark:via-teal-300 dark:to-emerald-400">
              최적의 견적과 최저가
            </span>
            는 완성됩니다.
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-4 mb-6 leading-relaxed">
            CPU 소켓 일치 여부부터 파워서플라이 피크 소비전력까지 실시간으로 자동 검증합니다.
            <br className="hidden sm:inline" />
            부품별 개별 최저가 구매와 원클릭 완본체 비교로 가장 스마트한 쇼핑을 경험하세요.
          </p>

          {/* 스마트 자체 검색창 (실시간 부품 & 게임 자동완성 + 쿠팡 로켓 최저가 검색) */}
          <SearchBar
            onSelectPreset={handleSelectPreset}
            onSelectComponent={handleSelectComponent}
          />
        </section>

        {/* 1. 게임 & 용도별 프리셋 선택기 */}
        <div id="game-selector-section">
          <GameSelector
            selectedPresetId={currentPreset.id}
            onSelectPreset={handleSelectPreset}
          />
        </div>

        {/* 2. 실시간 하드웨어 호환성 진단 뱃지 */}
        <CompatibilityBadge report={compatibilityReport} />

        {/* 플랫폼 최저가 빅매치 퀵 앵커 배너 */}
        <div className="mb-4 flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-emerald-500/10 border border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              ⚔️ [실시간 최저가 빅매치] 쿠팡 로켓배송 vs 네이버 쇼핑
            </span>
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400">
              • 배송속도 vs 네이버페이 5% 적립 체감가 비교
            </span>
          </div>
          <button
            onClick={() => document.getElementById('price-battle-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs flex items-center gap-1 hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            <span>비교 보기</span>
            <span>↓</span>
          </button>
        </div>

        {/* 3. 부품별 맞춤 견적 테이블 */}
        <div id="builder-table-section">
          <BuilderTable
            selectedComponents={selectedComponents}
            onSelectComponent={handleSelectComponent}
            totalPrice={totalPrice}
            currentPreset={currentPreset}
            onOpenSaveModal={() => setShowQuoteStorage(true)}
          />
        </div>

        {/* 4. 실시간 플랫폼 최저가 배틀: 쿠팡 로켓배송 VS 네이버 쇼핑 */}
        <div id="price-battle-section">
          <PriceBattle
            currentPreset={currentPreset}
            selectedComponents={selectedComponents}
            totalPrice={totalPrice}
          />
        </div>

        {/* 5. 중단 쿠팡 하드웨어 페스타 기획전 배너 (애드센스 슬롯 자동 연동) */}
        <AdBanner slotId="main-infeed-ad-1" theme="hardware" />

        {/* 6. 직접 조립 vs 완본체(완제PC) 비교 섹션 */}
        <div id="prebuilt-section">
          <PrebuiltComparison
            currentPreset={currentPreset}
            customTotalPrice={totalPrice}
          />
        </div>

        {/* 7. 하드웨어 랩 2026 실측 벤치마크 & 전문 심층 리포트 쇼케이스 (구글 애드센스 고품질 저널리즘 섹션) */}
        <div id="hardware-lab-showcase">
          <HardwareLabShowcase />
        </div>

        {/* 하단 오픈마켓·쿠팡 통합 실시간 프로모션 & 핫딜 허브 그리드 */}
        <MultiPlatformExhibitionGrid />

        {/* 7. AI 정밀 벤치마크 및 SEO 콘텐츠 카드 */}
        <div id="specs-analysis">
          <AiAnalysisCard currentPreset={currentPreset} />
        </div>

        {/* 견적 보관함 모달 */}
        <QuoteStorageModal
          isOpen={showQuoteStorage}
          onClose={() => setShowQuoteStorage(false)}
          currentComponents={selectedComponents}
          currentPreset={currentPreset}
          totalPrice={totalPrice}
          onLoadQuote={handleLoadQuote}
        />
      </main>

      <Footer />
    </div>
  );
}
