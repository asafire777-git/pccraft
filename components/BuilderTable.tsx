'use client';

import React, { useState } from 'react';
import { ComponentItem, COMPONENTS_DATA } from '@/data/components';
import { ShoppingCart, ExternalLink, RefreshCw, Check, Sparkles, Bookmark, Share2, Smartphone, Info, Search, AlertCircle, CheckCircle2, Camera, ShieldCheck, HelpCircle, Wrench, PlaneTakeoff, FileText } from 'lucide-react';
import ComponentThumbnail from './ComponentThumbnail';
import BulkOrderModal from './BulkOrderModal';
import EstimateImageModal from './EstimateImageModal';
import TakeoffAuditModal from './TakeoffAuditModal';
import MatchingMonitors from './MatchingMonitors';
import PriceFeedbackSection from './PriceFeedbackSection';
import { GamePreset, GAME_PRESETS } from '@/data/presets';
import { getCoupangProductUrl, getCoupangBulkCartUrl, getOpenMarketProductUrl, getPromoGatewayUrl, getDanawaSearchUrl, get11stSearchUrl } from '@/lib/affiliate';
import { encodeQuoteToShareUrl } from '@/lib/share';
import { trackEvent } from '@/lib/gtag';

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
  const [modalSearch, setModalSearch] = useState('');
  const [modalBrand, setModalBrand] = useState('all');
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showTakeoffModal, setShowTakeoffModal] = useState(false);
  const [includeWindows, setIncludeWindows] = useState(false);
  const [showMultipackInfo, setShowMultipackInfo] = useState(false);

  const WINDOWS_PRICE = 189000;
  const effectiveTotalPrice = totalPrice + (includeWindows ? WINDOWS_PRICE : 0);

  const openSelectModal = (catKey: string) => {
    setModalCategory(catKey);
    setModalSearch('');
    setModalBrand('all');
  };

  const closeModal = () => {
    setModalCategory(null);
    setModalSearch('');
    setModalBrand('all');
  };

  const handleSelect = (category: string, item: ComponentItem) => {
    onSelectComponent(category, item);
    closeModal();
  };

  const handleBulkOrder = () => {
    setShowBulkModal(true);
  };

  // 견적 공유 링크 복사 기능 (선택된 부품 및 프리셋 정보가 포함된 딥링크 생성)
  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = encodeQuoteToShareUrl(selectedComponents, currentPreset?.id);
      navigator.clipboard.writeText(shareUrl || window.location.href);
      trackEvent('quote_share_link', {
        preset_id: currentPreset?.id || 'custom',
        total_price: effectiveTotalPrice
      });
      alert('현재 선택하신 부품 견적서 링크가 클립보드에 복사되었습니다! 카톡이나 커뮤니티에 공유해보세요.');
    }
  };

  return (
    <section className="mb-10">
      {/* 견적 테이블 상단 헤더 & 총액 요약 바 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5 transition-colors">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block whitespace-nowrap">
              Custom PC Configurator
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1 font-mono font-medium whitespace-nowrap">
              💡 시장 표준 기준시세
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 break-keep-all leading-snug">
            부품별 맞춤 견적 &amp; 오픈마켓 최저가 비교
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl leading-relaxed break-keep-all">
            표기 가격은 다나와/오픈마켓 <strong>시장 표준 기준가</strong>입니다. 실시간 재고와 변동 최저가는 각 쇼핑몰 바로가기 버튼(쿠팡/G마켓/11번가)을 통해 다이렉트로 확인하세요.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3.5 bg-slate-50 dark:bg-slate-950/70 p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 shrink-0">
          <div className="shrink-0 min-w-[150px]">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono whitespace-nowrap">
              {includeWindows ? '최종 견적가 (OS 포함)' : '부품 총 합산가'}
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight leading-none mt-1 whitespace-nowrap flex items-baseline gap-1">
              <span>{effectiveTotalPrice.toLocaleString()}</span>
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">원</span>
            </div>
            {includeWindows && (
              <span className="text-[10px] text-sky-600 dark:text-sky-400 font-mono font-medium block mt-1 whitespace-nowrap">
                부품 {totalPrice.toLocaleString()}원 + OS {WINDOWS_PRICE.toLocaleString()}원
              </span>
            )}
          </div>

          {/* 깔끔하게 1열 정렬 및 모바일 최적화된 액션 버튼 그룹 */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap">
            {/* 이륙 가능 판독 & 커뮤니티 텍스트 복사 버튼 */}
            <button
              onClick={() => setShowTakeoffModal(true)}
              title="이륙 가능? AI 호환성 & 가성비 점수 판독 및 커뮤니티 질문용 텍스트 복사"
              className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <PlaneTakeoff className="w-3.5 h-3.5" />
              <span>🚀 이륙 판독 &amp; 질문 복사</span>
            </button>

            {/* 커뮤니티 공유용 견적서 고화질 캡처 버튼 */}
            <button
              onClick={() => setShowImageModal(true)}
              title="퀘이사존/디시/펨코 공유용 고화질 견적 캡처"
              className="px-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>견적 캡처</span>
            </button>

            {onOpenSaveModal && (
              <button
                onClick={onOpenSaveModal}
                title="내 견적함에 저장"
                className="px-3 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>견적 보관</span>
              </button>
            )}

            <button
              onClick={handleCopyShareLink}
              title="견적서 링크 공유"
              className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer shrink-0"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                document.getElementById('price-battle-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              title="쿠팡 vs 네이버 실시간 최저가 빅매치 비교"
              className="px-3 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:text-white hover:bg-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-700 shadow-sm whitespace-nowrap shrink-0"
            >
              <span className="text-amber-400">⚔️</span>
              <span>최저가 빅매치</span>
            </button>

            <button
              onClick={handleBulkOrder}
              className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>전 부품 일괄 담기</span>
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

                  {/* CPU 멀티팩 공식 3년 A/S 안내 배지 & 툴팁 (초보자 불안 해소) */}
                  {key === 'cpu' && (item.name.includes('멀티팩') || item.name.includes('벌크')) && (
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => setShowMultipackInfo(!showMultipackInfo)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 text-[11px] font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer transition-colors"
                        title="멀티팩 정품 무상 A/S 상세 정보 보기"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>🛡️ 멀티팩이란? 공식 3년 A/S 박스정품과 100% 동일</span>
                        <HelpCircle className="w-3 h-3 opacity-70 shrink-0" />
                      </button>

                      {showMultipackInfo && (
                        <div className="mt-2 p-3 rounded-xl bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/70 text-xs text-blue-950 dark:text-blue-200 leading-relaxed shadow-xs">
                          <div className="flex items-start gap-2">
                            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="block text-blue-950 dark:text-blue-100 font-bold mb-0.5">
                                💡 CPU '멀티팩' 정품 안내
                              </strong>
                              <p className="text-[11px] text-blue-900 dark:text-blue-200">
                                종이 박스 포장만 간소화된 포장 형태로, 국내 공식 유통사(대원CTS / 인텍앤컴퍼니 / 피씨디렉트 / 코잇 등)의 <strong>국내 3년 무상 A/S</strong>가 일반 박스 정품과 100% 동일하게 보증됩니다. 성능과 부품 내구성은 완전히 같으면서 단가만 1~3만 원 저렴하여 조립 컴퓨터 구매 시 가장 추천되는 실속형 정품입니다.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:justify-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800/60 w-full md:w-auto">
                <div className="text-left md:text-right shrink-0">
                  <div className="flex items-center justify-start md:justify-end gap-1.5 mb-0.5">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                      기준가
                    </span>
                  </div>

                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono block">
                    {item.price.toLocaleString()}원
                  </span>
                  {item.priceChange && item.priceChange !== 0 ? (
                    <span className={`text-[10px] font-mono block mt-0.5 whitespace-nowrap ${
                      item.priceChange < 0
                        ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                        : 'text-rose-500 dark:text-rose-400'
                    }`}>
                      {item.priceChange < 0 ? '▼' : '▲'} {Math.abs(item.priceChange).toLocaleString()}원 {item.priceChange < 0 ? '인하' : '인상'}
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block mt-0.5 whitespace-nowrap">
                      실시간 최저가 검증
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 sm:flex sm:items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => openSelectModal(key)}
                    className="col-span-1 px-2 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                    title="다른 부품으로 변경"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span>변경</span>
                  </button>

                  <a
                    href={getCoupangProductUrl(item.id, item.name, item.searchKeyword)}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    onClick={() => trackEvent('affiliate_click', { platform: 'coupang', item_id: item.id, item_name: item.name, price: item.price, category: item.category })}
                    className="col-span-1 px-2 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-sm"
                    title="쿠팡 실시간 최저가 확인"
                  >
                    <span>🚀 쿠팡</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={getOpenMarketProductUrl(item.id, item.name, 'gmarket', item.searchKeyword)}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    onClick={() => trackEvent('affiliate_click', { platform: 'gmarket', item_id: item.id, item_name: item.name, price: item.price, category: item.category })}
                    className="col-span-1 px-2 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-sm"
                    title="G마켓 실시간 최저가 확인"
                  >
                    <span>🛒 G마켓</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={get11stSearchUrl(item.searchKeyword || item.name)}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    onClick={() => trackEvent('affiliate_click', { platform: '11st', item_id: item.id, item_name: item.name, price: item.price, category: item.category })}
                    className="col-span-1 px-2 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-sm"
                    title="11번가 실시간 최저가 확인"
                  >
                    <span>⚡ 11번가</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {/* 다나와 실시간 시세/가격비교 직행 버튼 */}
                  <a
                    href={getDanawaSearchUrl(item.name, item.id, item.searchKeyword)}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    onClick={() => trackEvent('danawa_click', { item_id: item.id, item_name: item.name, category: item.category })}
                    className="col-span-2 sm:col-span-1 px-2 sm:px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-slate-300 dark:border-slate-700"
                    title="다나와 실시간 가격비교 및 시세 확인"
                  >
                    <span>📊 다나와</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 정품 Windows 11 Home FPP OS 옵션 토글 */}
      <div className={`mt-4 p-4 sm:p-5 rounded-2xl border transition-all ${
        includeWindows 
          ? 'bg-sky-50/80 dark:bg-sky-950/30 border-sky-300 dark:border-sky-700/70 shadow-sm' 
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <input
              type="checkbox"
              id="windows-toggle"
              checked={includeWindows}
              onChange={(e) => setIncludeWindows(e.target.checked)}
              className="w-5 h-5 mt-1 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
            />
            <label htmlFor="windows-toggle" className="cursor-pointer select-none">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>💿 정품 Microsoft Windows 11 Home (FPP/처음사용자용)</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 font-semibold font-mono">
                  평생 영구 소장 · 무제한 이전 설치 가능
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                공식 USB 패키지 동봉 | PC를 새로 교체해도 마이크로소프트 계정 연동으로 무제한 재인증 가능
              </p>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5 font-medium">
                ⚠️ 주의: 오픈마켓에서 1~2만 원에 판매되는 시리얼 번호는 불법 볼륨 라이선스(MAK/KMS)로 수개월 내 인증 해제될 위험이 있습니다.
              </p>
            </label>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800">
            <div className="text-left sm:text-right">
              <span className="text-base sm:text-lg font-bold text-sky-600 dark:text-sky-400 font-mono block">
                +{WINDOWS_PRICE.toLocaleString()}원
              </span>
              <span className="text-[10px] text-slate-400 font-mono">정품 공식 출고가</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIncludeWindows(!includeWindows)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  includeWindows
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {includeWindows ? '✓ 견적 포함됨' : '+ 견적에 추가'}
              </button>

              <a
                href={getCoupangProductUrl('ms-win11-home-fpp', '윈도우11 Home FPP 처음사용자용', '윈도우11 Home FPP 처음사용자용')}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="px-2.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                title="쿠팡 정품 윈도우11 로켓배송"
              >
                <span>🚀 쿠팡 정품</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 커뮤니티 바이럴 배너: AI 이륙 판독 & 퀘이사존/디시/쿨엔 질문용 텍스트 복사 */}
      <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-cyan-950 text-white border border-indigo-800/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
            <PlaneTakeoff className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-white">
                이 견적, 구매(이륙)해도 괜찮을까요?
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 font-semibold font-mono">
                AI 호환성 100% 검증
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              소켓 일치 여부와 파워 정격 용량, CPU-GPU 병목 밸런스를 즉시 판독하고, <strong>퀘이사존/디시 컴본갤/쿨엔조이 전용 질문 텍스트</strong>를 1초 만에 복사할 수 있습니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
          <button
            onClick={() => setShowTakeoffModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <PlaneTakeoff className="w-3.5 h-3.5" />
            <span>이륙 판독기 열기</span>
          </button>
          <button
            onClick={() => setShowTakeoffModal(true)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all border border-white/20 cursor-pointer whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>📋 질문 텍스트 복사</span>
          </button>
        </div>
      </div>

      {/* 조립 두려운 초보자를 위한 브릿지 카드 */}
      <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white border border-indigo-900/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-amber-400">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-white">
                직접 조립이 망설여지시나요?
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-semibold font-mono">
                초보자 안심 가이드
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              선 정리와 부품 초기 불량 테스트가 걱정된다면, <strong>동급 완본체 완제 PC</strong> 또는 <strong>전문 조립 대행 공임</strong>을 선택하세요.
            </p>
            <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400 flex-wrap">
              <span>✓ 표준 조립 공임비: 평균 35,000~45,000원</span>
              <span>✓ 완본체 PC: 1년 전국 무상 방문 출장 A/S 기본 포함</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              document.getElementById('prebuilt-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <span>1년 출장 AS 완본체 비교</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* 그래픽카드 사양 연동 맞춤 모니터 추천 */}
      <MatchingMonitors gpuName={selectedComponents.gpu?.name} />

      {/* 소비자 집단지성: 실시간 특가 제보 & 구매 꿀팁 섹션 (추천 대체 기능 #3) */}
      <PriceFeedbackSection selectedComponents={selectedComponents} />

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
            ※ 견적서에 표기된 부품별 가격은 오픈마켓(쿠팡 로켓배송 / G마켓 / 11번가 슈팅배송 공식유통사) 최근 실시간 평균 출고가 기준이며, 판매처의 카드 즉시할인 및 재고 변동에 따라 최종 결제 금액이 다를 수 있습니다.
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-500">
            각 부품의 <strong>[🚀 쿠팡 로켓]</strong> 또는 <strong>[🛒 G마켓 특가]</strong> 버튼, 그리고 하단 최저가 비교 배틀의 <strong>[⚡ 11번가 슈팅]</strong> 링크를 통해 단종/중고품이 배제된 실제 정품 재고 최저가 페이지로 바로 연결됩니다.
          </p>
        </div>
      </div>

      {/* 부품 변경 모달 */}
      {modalCategory && (() => {
        const categoryItems = COMPONENTS_DATA[modalCategory] || [];
        const currentItem = selectedComponents[modalCategory];
        
        // 고유 브랜드 목록 추출
        const availableBrands = Array.from(new Set(categoryItems.map((i) => i.brand)));

        // 검색어 및 브랜드 필터링
        const filteredOptions = categoryItems.filter((opt) => {
          const matchesBrand = modalBrand === 'all' || opt.brand === modalBrand;
          const q = modalSearch.toLowerCase().trim();
          const cleanQ = q.replace(/\s+/g, '');
          const cleanName = opt.name.toLowerCase().replace(/\s+/g, '');
          const matchesSearch =
            !q ||
            opt.name.toLowerCase().includes(q) ||
            cleanName.includes(cleanQ) ||
            opt.brand.toLowerCase().includes(q) ||
            opt.tags.some((t) => t.toLowerCase().includes(q) || t.toLowerCase().replace(/\s+/g, '').includes(cleanQ)) ||
            Object.values(opt.specs).some((s) => s.toLowerCase().includes(q) || s.toLowerCase().replace(/\s+/g, '').includes(cleanQ)) ||
            (opt.socket && opt.socket.toLowerCase().includes(q));
          return matchesBrand && matchesSearch;
        });

        // 소켓 및 규격 호환성 체크 헬퍼
        const getCompatibilityStatus = (opt: ComponentItem) => {
          if (modalCategory === 'cpu' && selectedComponents.motherboard) {
            const mbSocket = selectedComponents.motherboard.socket;
            if (mbSocket && opt.socket) {
              if (mbSocket === opt.socket) {
                return { compatible: true, text: `✓ 메인보드(${mbSocket}) 호환` };
              }
              return { compatible: false, text: `⚠️ ${opt.socket} 소켓 (메인보드 변경 필요)` };
            }
          }
          if (modalCategory === 'motherboard' && selectedComponents.cpu) {
            const cpuSocket = selectedComponents.cpu.socket;
            if (cpuSocket && opt.socket) {
              if (cpuSocket === opt.socket) {
                return { compatible: true, text: `✓ CPU(${cpuSocket}) 호환` };
              }
              return { compatible: false, text: `⚠️ ${opt.socket} 소켓 (${cpuSocket} CPU 불일치)` };
            }
          }
          if (modalCategory === 'ram') {
            const isDdr4 = opt.specs['규격']?.includes('DDR4');
            const isDdr5 = opt.specs['규격']?.includes('DDR5');
            const cpuSocket = selectedComponents.cpu?.socket;
            if ((cpuSocket === 'AM5' || cpuSocket === 'LGA1851') && isDdr4) {
              return { compatible: false, text: `⚠️ ${cpuSocket}는 DDR5 전용` };
            }
            if (cpuSocket === 'AM4' && isDdr5) {
              return { compatible: false, text: `⚠️ AM4는 DDR4 전용` };
            }
            if (selectedComponents.motherboard) {
              const mbMem = selectedComponents.motherboard.specs['메모리 규격'] || '';
              if (mbMem.includes('DDR5') && isDdr4) {
                return { compatible: false, text: `⚠️ DDR5 보드 슬롯 불일치` };
              }
              if (mbMem.includes('DDR4') && isDdr5) {
                return { compatible: false, text: `⚠️ DDR4 보드 슬롯 불일치` };
              }
            }
            return { compatible: true, text: `✓ 메모리 규격 정상 호환` };
          }
          if (modalCategory === 'power' && selectedComponents.gpu) {
            const gpuTdp = selectedComponents.gpu.tdp || 115;
            const cpuTdp = selectedComponents.cpu?.tdp || 65;
            const estWatt = cpuTdp + gpuTdp + 80;
            if (opt.wattage && opt.wattage < estWatt) {
              return { compatible: false, text: `⚠️ 용량 부족 (${opt.wattage}W < 예상 ${estWatt}W)` };
            }
            return { compatible: true, text: `✓ 정격 ${opt.wattage}W 여유 충분` };
          }
          return null;
        };

        return (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-900 dark:text-white">
              {/* 모달 상단 헤더 */}
              <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      부품 변경: {categoryItems[0]?.categoryName}
                    </h3>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300">
                      총 {categoryItems.length}개 모델
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    원하시는 스펙과 가격대의 부품을 실시간 최저가로 바로 비교 및 교체할 수 있습니다.
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-2 text-sm font-mono cursor-pointer rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  ✕ 닫기
                </button>
              </div>

              {/* 검색창 및 브랜드 필터 바 */}
              <div className="p-3 sm:p-4 bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 space-y-2.5">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={modalSearch}
                    onChange={(e) => setModalSearch(e.target.value)}
                    placeholder="부품명, 브랜드, 태그, 스펙 검색 (예: 7800X3D, 화이트, 32GB, 3열, 시소닉...)"
                    className="w-full pl-9 pr-8 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  {modalSearch && (
                    <button
                      onClick={() => setModalSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-1"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* 브랜드 빠른 선택 필터 칩 */}
                {availableBrands.length > 1 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                    <span className="text-[11px] text-slate-400 shrink-0 font-semibold mr-1">브랜드:</span>
                    <button
                      onClick={() => setModalBrand('all')}
                      className={`px-2.5 py-1 rounded-lg font-medium shrink-0 transition-colors ${
                        modalBrand === 'all'
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      전체 ({categoryItems.length})
                    </button>
                    {availableBrands.map((b) => {
                      const count = categoryItems.filter((i) => i.brand === b).length;
                      return (
                        <button
                          key={b}
                          onClick={() => setModalBrand(b)}
                          className={`px-2.5 py-1 rounded-lg font-medium shrink-0 transition-colors ${
                            modalBrand === b
                              ? 'bg-cyan-600 text-white font-bold'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {b} ({count})
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 부품 리스트 컨테이너 */}
              <div className="p-3 sm:p-4 overflow-y-auto space-y-2.5 divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredOptions.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
                    검색 조건에 일치하는 부품이 없습니다. 검색어를 변경해보세요.
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const isCurrent = currentItem?.id === option.id;
                    const priceDiff = currentItem ? option.price - currentItem.price : 0;
                    const compat = getCompatibilityStatus(option);

                    return (
                      <div
                        key={option.id}
                        className={`p-3.5 sm:p-4 rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3.5 ${
                          isCurrent
                            ? 'bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-500/40 ring-1 ring-cyan-500/30'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent'
                        }`}
                      >
                        {/* 좌측: 부품 썸네일 & 상세 스펙 */}
                        <div
                          className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer"
                          onClick={() => handleSelect(modalCategory, option)}
                        >
                          <ComponentThumbnail
                            category={option.category}
                            name={option.name}
                            className="w-12 h-12 shrink-0 mt-0.5"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap mb-1">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                                {option.brand}
                              </span>
                              {option.socket && (
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40">
                                  {option.socket}
                                </span>
                              )}
                              {compat && (
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex items-center gap-1 ${
                                    compat.compatible
                                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40'
                                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40 font-bold'
                                  }`}
                                >
                                  {compat.text}
                                </span>
                              )}
                              {option.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-1.5 py-0.5 rounded font-medium"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                              {option.name}
                            </h4>

                            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                              {Object.entries(option.specs).map(([sKey, sVal]) => (
                                <span key={sKey}>
                                  <span className="text-slate-400 dark:text-slate-500">{sKey}:</span> {sVal}
                                </span>
                              ))}
                            </div>

                            {option.recommendationReason && (
                              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                                {option.recommendationReason}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* 우측: 시세, 차액 및 선택 버튼 & 실시간 링크 */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                          <div className="text-left sm:text-right">
                            <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono block">
                              {option.price.toLocaleString()}원
                            </span>
                            {currentItem && (
                              <span
                                className={`text-[10px] font-mono font-semibold ${
                                  priceDiff === 0
                                    ? 'text-slate-400'
                                    : priceDiff > 0
                                    ? 'text-amber-600 dark:text-amber-400'
                                    : 'text-cyan-600 dark:text-cyan-400'
                                }`}
                              >
                                {priceDiff === 0
                                  ? '현재 구성과 동일'
                                  : priceDiff > 0
                                  ? `+${priceDiff.toLocaleString()}원 (추가)`
                                  : `-${Math.abs(priceDiff).toLocaleString()}원 (절감)`}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5">
                            {/* 실제 쇼핑몰 실시간 상품 확인 링크 */}
                            <a
                              href={getCoupangProductUrl(option.id, option.name, option.searchKeyword)}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              onClick={(e) => e.stopPropagation()}
                              className="px-2 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40 text-[11px] font-bold flex items-center gap-1"
                              title="쿠팡 실물 상품 바로가기"
                            >
                              <span>🚀 쿠팡</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>

                            {isCurrent ? (
                              <span className="px-3 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm">
                                <Check className="w-3.5 h-3.5" /> 선택중
                              </span>
                            ) : (
                              <button
                                onClick={() => handleSelect(modalCategory, option)}
                                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold shadow-sm cursor-pointer transition-colors"
                              >
                                선택하기
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* 커뮤니티 공유용 고화질 견적 캡처 모달 */}
      <EstimateImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        selectedComponents={selectedComponents}
        currentPreset={currentPreset}
        totalPrice={effectiveTotalPrice}
        includeWindows={includeWindows}
      />

      {/* 전 부품 일괄 구매 및 장바구니 안내 모달 */}
      <BulkOrderModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        selectedComponents={selectedComponents}
        currentPreset={currentPreset || GAME_PRESETS[1]}
        totalPrice={effectiveTotalPrice}
      />

      {/* 이륙 판독기 & 커뮤니티 질문용 텍스트 복사 모달 */}
      <TakeoffAuditModal
        isOpen={showTakeoffModal}
        onClose={() => setShowTakeoffModal(false)}
        selectedComponents={selectedComponents}
        currentPreset={currentPreset}
        totalPrice={effectiveTotalPrice}
        includeWindows={includeWindows}
      />

      {/* 모바일 전용 하단 고정 스티키 바 (실시간 합계 + 이륙 판독 + 견적 캡처 + 일괄 담기) */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-2.5 shadow-2xl safe-area-bottom">
        <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
          <div className="min-w-0">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate font-medium">
              {currentPreset?.title || '맞춤 견적'} {includeWindows ? '· OS포함' : ''}
            </span>
            <div className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight leading-none mt-0.5 whitespace-nowrap flex items-baseline gap-0.5">
              <span>{effectiveTotalPrice.toLocaleString()}</span>
              <span className="text-xs font-normal text-slate-600 dark:text-slate-400">원</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setShowTakeoffModal(true)}
              className="px-2.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all cursor-pointer"
              title="이륙 판독 & 커뮤니티 복사"
            >
              <PlaneTakeoff className="w-3 h-3" />
              <span>이륙 판독</span>
            </button>

            <button
              onClick={() => setShowImageModal(true)}
              className="px-2.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all cursor-pointer"
              title="견적서 이미지 캡처/다운로드"
            >
              <Camera className="w-3 h-3" />
              <span>캡처</span>
            </button>

            <button
              onClick={handleBulkOrder}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all cursor-pointer"
            >
              <ShoppingCart className="w-3 h-3" />
              <span>담기</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
