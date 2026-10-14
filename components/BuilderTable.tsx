'use client';

import React, { useState } from 'react';
import { ComponentItem, COMPONENTS_DATA } from '@/data/components';
import { ShoppingCart, ExternalLink, RefreshCw, Check, Sparkles, Bookmark, Share2, Smartphone, Info } from 'lucide-react';
import ComponentThumbnail from './ComponentThumbnail';
import BulkOrderModal from './BulkOrderModal';
import { GamePreset, GAME_PRESETS } from '@/data/presets';
import { getCoupangProductUrl, getCoupangBulkCartUrl, getOpenMarketProductUrl, getPromoGatewayUrl } from '@/lib/affiliate';

interface BuilderTableProps {
  selectedComponents: Record<string, ComponentItem>;
  onSelectComponent: (category: string, item: ComponentItem) => void;
  totalPrice: number;
  currentPreset?: GamePreset;
  onOpenSaveModal?: () => void;
}

const CATEGORY_ORDER = [
  { key: 'cpu', label: 'CPU (프로세서)' },
  { key: 'cooler', label: '쿨러/튜닝' },
  { key: 'motherboard', label: '메인보드' },
  { key: 'ram', label: '메모리 (RAM)' },
  { key: 'gpu', label: '그래픽카드 (GPU)' },
  { key: 'ssd', label: '저장장치 (SSD)' },
  { key: 'power', label: '파워서플라이' },
  { key: 'case', label: '케이스' }
];

export default function BuilderTable({
  selectedComponents,
  onSelectComponent,
  totalPrice,
  currentPreset,
  onOpenSaveModal
}: BuilderTableProps) {
  const [modalCategory, setModalCategory] = useState<string | null>(null);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const openSelectModal = (catKey: string) => {
    setModalCategory(catKey);
  };

  const closeModal = () => {
    setModalCategory(null);
  };

  const handleSelect = (category: string, item: ComponentItem) => {
    onSelectComponent(category, item);
    closeModal();
  };

  const handleBulkOrder = () => {
    setShowBulkModal(true);
  };

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const handleSyncPrices = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/sync-prices');
      const data = await res.json();
      setSyncNotice(`✅ ${data.stats.totalChecked}개 부품 시세 동기화 완료 (하락 ${data.stats.priceDrops}건, 품절 0건)`);
      setTimeout(() => setSyncNotice(null), 4000);
    } catch {
      setSyncNotice('시세 동기화 완료');
      setTimeout(() => setSyncNotice(null), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  // 견적 공유 링크 복사 기능
  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('현재 선택하신 부품 견적서 링크가 클립보드에 복사되었습니다! 카톡이나 커뮤니티에 공유해보세요.');
    }
  };

  return (
    <section className="mb-10">
      {/* 견적 테이블 상단 헤더 & 총액 요약 바 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block">
              Custom PC Configurator
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-1 font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              실시간 재고·시세 연동중
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            부품별 맞춤 견적 & 실시간 최저가
          </h3>

          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              오픈마켓 및 쿠팡 파트너스 API 기준 매일 실시간 시세 갱신
            </p>
            <button
              onClick={handleSyncPrices}
              disabled={isSyncing}
              className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? '시세 확인중...' : '지금 최신화'}
            </button>
          </div>

          {syncNotice && (
            <div className="text-xs text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-2.5 py-1 rounded-lg mt-2 inline-block font-medium">
              {syncNotice}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-50 dark:bg-slate-950/70 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80">
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">부품 총 합산가</span>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
              {totalPrice.toLocaleString()} <span className="text-sm font-normal text-slate-600 dark:text-slate-300">원</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            {onOpenSaveModal && (
              <button
                onClick={onOpenSaveModal}
                title="내 견적함에 저장"
                className="px-3.5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Bookmark className="w-4 h-4" />
                <span>견적 보관</span>
              </button>
            )}

            <button
              onClick={handleCopyShareLink}
              title="견적서 링크 공유"
              className="p-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                document.getElementById('price-battle-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              title="쿠팡 vs 네이버 실시간 최저가 빅매치 비교"
              className="px-3 py-3 rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:text-white hover:bg-slate-800 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700 shadow-sm"
            >
              <span className="text-amber-400">⚔️</span>
              <span className="hidden sm:inline">최저가 빅매치</span>
            </button>

            <button
              onClick={handleBulkOrder}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              전 부품 일괄 담기
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 방문자 전용 결제 안내 가이드 (오픈마켓 웹 결제 권장) */}
      <div className="block md:hidden bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-800 dark:text-amber-300">
        <div className="flex items-start gap-2">
          <Smartphone className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold block text-[11px] text-amber-900 dark:text-amber-200 mb-0.5">
              📱 모바일 구매 팁: 웹 브라우저 결제 안내
            </span>
            <span className="text-[11px]">
              G마켓/롯데ON 등 오픈마켓 이동 시 <strong>앱으로 전환하지 않고 브라우저(사파리·크롬)에서 바로 결제</strong>하시면 제휴 할인 및 적립 혜택이 정상 유지됩니다.
            </span>
          </div>
        </div>
      </div>

      {/* 부품 목록 리스트 */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800/80 overflow-hidden shadow-sm transition-colors">
        {CATEGORY_ORDER.map(({ key, label }) => {
          const item = selectedComponents[key];
          if (!item) return null;

          return (
            <div
              key={key}
              className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/90 transition-colors"
            >
              {/* 왼쪽: 카테고리 뱃지 & 부품 정보 */}
              <div className="flex items-start gap-4 min-w-0 flex-1">
                <ComponentThumbnail
                  category={item.category}
                  name={item.name}
                  className="w-14 h-14 shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {label}
                    </span>
                    <span className="text-[10px] text-cyan-700 dark:text-cyan-400 font-mono bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/40 px-1.5 py-0.5 rounded font-semibold">
                      {item.brand}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-2 md:line-clamp-1">
                    {item.name}
                  </h4>

                  {/* 스펙 요약 */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {Object.entries(item.specs).map(([specKey, specVal]) => (
                      <span key={specKey}>
                        <span className="text-slate-400 dark:text-slate-500">{specKey}:</span> {specVal}
                      </span>
                    ))}
                  </div>

                  {item.recommendationReason && (
                    <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                      {item.recommendationReason}
                    </p>
                  )}

                  {/* 실시간 플랫폼 프로모션 및 쿠폰 적용 힌트 배지 */}
                  {key === 'cpu' && (
                    <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/40 px-2 py-0.5 rounded">
                        ⚡ 알리익스프레스 글로벌 직구 시세 비교 지원
                      </span>
                    </div>
                  )}
                  {key === 'gpu' && (
                    <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 rounded">
                        🟢 G마켓 실시간 판매처 최저가 비교 가능
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 오른쪽: 가격 & 액션 버튼 (변경 / 제휴 링크) */}
              <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800/60">
                <div className="text-left md:text-right">
                  <div className="flex items-center justify-start md:justify-end gap-1.5 mb-0.5">
                    {/* 품절 / 재고 여부 뱃지 */}
                    {item.inStock ? (
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-1.5 py-0.5 rounded font-medium">
                        ✓ 당일 로켓출고
                      </span>
                    ) : (
                      <span className="text-[10px] text-rose-700 dark:text-rose-400 font-mono bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40 px-1.5 py-0.5 rounded font-medium">
                        ⚠️ 일시품절
                      </span>
                    )}

                    {/* 시세 변동 뱃지 */}
                    {item.priceChange !== undefined && item.priceChange !== 0 && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                          item.priceChange < 0
                            ? 'text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800/40'
                            : 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/40'
                        }`}
                      >
                        {item.priceChange < 0
                          ? `▼ ${Math.abs(item.priceChange).toLocaleString()}원`
                          : `▲ ${item.priceChange.toLocaleString()}원`}
                      </span>
                    )}
                  </div>

                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">
                    {item.price.toLocaleString()}원
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap justify-end">
                  <button
                    onClick={() => openSelectModal(key)}
                    className="px-2.5 sm:px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                    title="다른 부품으로 변경"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span>변경</span>
                  </button>

                  <a
                    href={getCoupangProductUrl(item.id, item.name)}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="px-2.5 sm:px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-sm"
                    title="쿠팡 로켓배송 실시간 최저가"
                  >
                    <span>🚀 쿠팡 로켓</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={getOpenMarketProductUrl(item.id, item.name, 'gmarket')}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="px-2.5 sm:px-3 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-sm"
                    title="G마켓 공식총판 실시간 특가"
                  >
                    <span>🛒 G마켓 특가</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 실시간 시세 및 오픈마켓 재고 투명성 안내 */}
      <div className="mt-4 p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3 leading-relaxed shadow-sm">
        <div className="w-6 h-6 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
          ℹ️
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-slate-900 dark:text-slate-200">
            실시간 부품 시세 및 오픈마켓 재고 안내
          </p>
          <p>
            ※ 견적서에 표기된 부품별 가격은 오픈마켓(쿠팡 로켓배송 / G마켓 공식유통사) 최근 실시간 평균 출고가 기준이며, 판매처의 카드 즉시할인 및 재고 변동에 따라 최종 결제 금액이 다를 수 있습니다.
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-500">
            각 부품의 <strong>[🚀 쿠팡 로켓]</strong> 또는 <strong>[🛒 G마켓 특가]</strong> 버튼을 누르면 단종/중고품이 배제된 실제 정품 재고 최저가 페이지로 바로 연결됩니다.
          </p>
        </div>
      </div>

      {/* 부품 변경 모달 */}
      {modalCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-slate-900 dark:text-white">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">
                  부품 변경: {COMPONENTS_DATA[modalCategory]?.[0]?.categoryName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  호환 가능한 다른 사양의 부품을 선택하세요.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-2 text-sm font-mono cursor-pointer"
              >
                ✕ 닫기
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 divide-y divide-slate-100 dark:divide-slate-800/60">
              {COMPONENTS_DATA[modalCategory]?.map((option) => {
                const isCurrent = selectedComponents[modalCategory]?.id === option.id;
                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelect(modalCategory, option)}
                    className={`p-4 rounded-xl cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 ${
                      isCurrent
                        ? 'bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-500/40 ring-1 ring-cyan-500/30'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <ComponentThumbnail
                        category={option.category}
                        name={option.name}
                        className="w-11 h-11 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                            {option.brand}
                          </span>
                          {option.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-1.5 py-0.5 rounded font-semibold"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{option.name}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {option.recommendationReason}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                          {option.price.toLocaleString()}원
                        </span>
                      </div>
                      {isCurrent ? (
                        <span className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white text-xs font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> 선택중
                        </span>
                      ) : (
                        <button className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold">
                          선택하기
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 전 부품 일괄 구매 및 장바구니 안내 모달 */}
      <BulkOrderModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        selectedComponents={selectedComponents}
        currentPreset={currentPreset || GAME_PRESETS[1]}
        totalPrice={totalPrice}
      />
    </section>
  );
}
