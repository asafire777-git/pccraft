'use client';

import React, { useState, useEffect } from 'react';
import { PROMO_EVENTS, PromoEvent, PlatformType, getEventRemainingDays } from '@/data/events';
import { Sparkles, ExternalLink, Zap, ShieldCheck, Copy, Check, Ticket, Clock, Tag } from 'lucide-react';

export default function MultiPlatformExhibitionGrid() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | 'all'>('all');
  const [copiedCodes, setCopiedCodes] = useState<Record<string, boolean>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredEvents = PROMO_EVENTS.filter((evt) => {
    if (selectedPlatform === 'all') return true;
    return evt.platform === selectedPlatform;
  });

  const handleCopyCode = (id: string, code: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCodes((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedCodes((prev) => ({ ...prev, [id]: false }));
    }, 2500);
  };

  const platformTabs = [
    { key: 'all', label: '전체 보기', icon: '🔥' },
    { key: 'lotteon', label: '롯데ON 온쇼페', icon: '🔴' },
    { key: 'coupang', label: '쿠팡 로켓특가', icon: '🚀' },
    { key: 'gmarket', label: 'G마켓 특가전', icon: '🟢' }
  ];

  return (
    <section className="my-12">
      {/* 헤더 타이틀 영역 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            공식 제휴 실시간 기획전 &amp; 부품 할인전
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            🔥 주요 플랫폼 실시간 PC 기획전 &amp; 부품 모음
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            공식 승인된 쿠팡 로켓배송 및 G마켓 실시간 최저가 기획전을 투명하게 제공합니다.
          </p>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2 sm:mt-0 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>공식 제휴 실시간 프로모션</span>
        </div>
      </div>

      {/* 플랫폼 필터 탭 */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
        {platformTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedPlatform(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
              selectedPlatform === tab.key
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md scale-102'
                : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 프로모션 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEvents.map((item) => {
          const remaining = isMounted ? getEventRemainingDays(item.endDate) : '진행중';
          const isCopied = Boolean(copiedCodes[item.id]);

          return (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-cyan-500/50"
            >
              <div>
                {/* 카드 상단 배너 이미지 (16:10 비율) */}
                <div className="w-full h-[170px] sm:h-[190px] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 relative mb-4 bg-slate-950 shadow-inner group-hover:scale-102 transition-transform duration-300">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt || item.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                    />
                  )}
                  {/* 플랫폼 배지 */}
                  <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-black text-white border border-slate-700/70 shadow-sm flex items-center gap-1">
                    <span>{item.platformName}</span>
                    <span className="text-[10px] text-cyan-300">• {item.badge}</span>
                  </div>

                  {/* 마감일 뱃지 */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg text-[11px] font-black bg-rose-600 text-white shadow-md flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{remaining}</span>
                  </div>
                </div>

                {/* 프로모션 타이틀 */}
                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed line-clamp-2">
                  {item.subtitle}
                </p>

                {/* 할인 혜택 및 쿠폰 정보 */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  {item.discountRate && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{item.discountRate}</span>
                    </div>
                  )}

                  {item.couponText && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-300">
                      <Ticket className="w-3.5 h-3.5" />
                      <span>{item.couponText}</span>
                    </div>
                  )}

                  {/* 프로모션 코드 복사 버튼 */}
                  {item.promoCode && (
                    <div className="pt-1">
                      <button
                        onClick={(e) => handleCopyCode(item.id, item.promoCode!, e)}
                        className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                        title="프로모션 코드 복사"
                      >
                        <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                          <Ticket className="w-3 h-3" /> 코드: <strong className="text-slate-900 dark:text-white">{item.promoCode}</strong>
                        </span>
                        <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-0.5">
                          {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{isCopied ? '복사완료!' : '코드 복사'}</span>
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 카드 하단 CTA 버튼 */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  {item.platformName} 공식 특가
                </span>
                <a
                  href={item.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <span>특가 바로가기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* 하단 제휴 고지 */}
      <div className="mt-4 px-3.5 py-2.5 bg-slate-50/80 dark:bg-slate-900/40 rounded-xl border border-slate-200/60 dark:border-slate-800/60 text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-between">
        <span>※ 본 프로모션 허브는 쿠팡 파트너스 및 링크프라이스(G마켓, SSG, 알리) 공식 제휴 프로모션 링크를 기반으로 안내하며, 구매 시 소정의 수수료를 제공받을 수 있습니다.</span>
        <span className="font-mono text-[9px] text-slate-400/80">실시간 프로모션 허브</span>
      </div>
    </section>
  );
}
