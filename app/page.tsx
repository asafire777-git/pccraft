'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import AdBanner from '@/components/AdBanner';
import GameSelector from '@/components/GameSelector';
import CompatibilityBadge from '@/components/CompatibilityBadge';
import BuilderTable from '@/components/BuilderTable';
import PrebuiltComparison from '@/components/PrebuiltComparison';
import AiAnalysisCard from '@/components/AiAnalysisCard';
import { GAME_PRESETS, GamePreset } from '@/data/presets';
import { COMPONENTS_DATA, ComponentItem } from '@/data/components';
import { checkCompatibility } from '@/lib/compatibility';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  const [currentPreset, setCurrentPreset] = useState<GamePreset>(GAME_PRESETS[1]);

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
    category: 'Computers > Desktop Computers',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'KRW',
      lowPrice: totalPrice,
      highPrice: currentPreset.recommendedPrebuilt.price,
      offerCount: 8
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
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

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            CPU 소켓 일치 여부부터 파워서플라이 피크 소비전력까지 실시간으로 자동 검증합니다.
            <br className="hidden sm:inline" />
            부품별 개별 최저가 구매와 원클릭 완본체 비교로 가장 스마트한 쇼핑을 경험하세요.
          </p>
        </section>

        {/* 1. 게임 & 용도별 프리셋 선택기 */}
        <GameSelector
          selectedPresetId={currentPreset.id}
          onSelectPreset={handleSelectPreset}
        />

        {/* 2. 실시간 하드웨어 호환성 진단 뱃지 */}
        <CompatibilityBadge report={compatibilityReport} />

        {/* 3. 부품별 맞춤 견적 테이블 */}
        <BuilderTable
          selectedComponents={selectedComponents}
          onSelectComponent={handleSelectComponent}
          totalPrice={totalPrice}
        />

        {/* 4. 구글 애드센스 인피드 광고 영역 */}
        <AdBanner slotId="main-infeed-ad-1" />

        {/* 5. 직접 조립 vs 완본체(완제PC) 비교 섹션 */}
        <div id="prebuilt-section">
          <PrebuiltComparison
            currentPreset={currentPreset}
            customTotalPrice={totalPrice}
          />
        </div>

        {/* 6. AI 정밀 벤치마크 및 SEO 콘텐츠 카드 */}
        <div id="specs-analysis">
          <AiAnalysisCard currentPreset={currentPreset} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
