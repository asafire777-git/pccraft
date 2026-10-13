'use client';

import React, { useState, useEffect } from 'react';
import { PromoEvent, getActivePromoEvents, getEventRemainingDays } from '@/data/events';
import { Sparkles, ExternalLink, ChevronLeft, ChevronRight, Clock, Tag, X, Copy, Check, Ticket } from 'lucide-react';

export default function EventBanner() {
  const [activeEvents, setActiveEvents] = useState<PromoEvent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    setActiveEvents(getActivePromoEvents());
  }, []);

  // 활성 이벤트가 여러 개일 경우 7초마다 자동 슬라이드
  useEffect(() => {
    if (activeEvents.length <= 1 || isPaused || isDismissed) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeEvents.length);
      setCopiedCode(false);
    }, 7000);
    return () => clearInterval(interval);
  }, [activeEvents.length, isPaused, isDismissed]);

  if (isDismissed || activeEvents.length === 0) {
    return null;
  }

  const current = activeEvents[currentIndex];
  const remaining = getEventRemainingDays(current.endDate);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeEvents.length - 1 : prev - 1));
    setCopiedCode(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % activeEvents.length);
    setCopiedCode(false);
  };

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // 플랫폼별 브랜드 배지 스타일
  const platformStyles: Record<string, { badge: string; border: string; glow: string; btn: string }> = {
    coupang: {
      badge: 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
      border: 'border-cyan-500/30 hover:border-cyan-500/60',
      glow: 'from-cyan-950/40 via-slate-900/60 to-slate-900/90 dark:from-cyan-950/60 dark:via-slate-900/80 dark:to-slate-950/90',
      btn: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-500/20'
    },
    gmarket: {
      badge: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      border: 'border-emerald-500/30 hover:border-emerald-500/60',
      glow: 'from-emerald-950/40 via-slate-900/60 to-slate-900/90 dark:from-emerald-950/60 dark:via-slate-900/80 dark:to-slate-950/90',
      btn: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/20'
    },
    aliexpress: {
      badge: 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30',
      border: 'border-rose-500/30 hover:border-rose-500/60',
      glow: 'from-rose-950/40 via-slate-900/60 to-slate-900/90 dark:from-rose-950/60 dark:via-slate-900/80 dark:to-slate-950/90',
      btn: 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-rose-500/20'
    },
    ssg: {
      badge: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30',
      border: 'border-amber-500/30 hover:border-amber-500/60',
      glow: 'from-amber-950/40 via-slate-900/60 to-slate-900/90 dark:from-amber-950/60 dark:via-slate-900/80 dark:to-slate-950/90',
      btn: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-amber-500/20'
    }
  };

  const style = platformStyles[current.platform] || platformStyles.coupang;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative mb-6 rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
    >
      <div
        className={`relative border ${style.border} bg-gradient-to-r ${style.glow} p-4 sm:p-5 backdrop-blur-md rounded-2xl transition-colors`}
      >
        {/* 상단 뱃지 & 마감 카운트다운 */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            {/* 플랫폼 태그 */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black border ${style.badge}`}
            >
              <Sparkles className="w-3 h-3" />
              {current.platformName} • {current.badge}
            </span>

            {/* 마감일 뱃지 */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
              <Clock className="w-3 h-3" />
              {remaining}
            </span>

            {/* 할인율 뱃지 */}
            {current.discountRate && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                <Tag className="w-3 h-3" />
                {current.discountRate}
              </span>
            )}

            {/* 쿠폰 안내 뱃지 */}
            {current.couponText && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                <Ticket className="w-3 h-3" />
                {current.couponText}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            {activeEvents.length > 1 && (
              <span className="text-[11px] font-mono mr-1">
                {currentIndex + 1} / {activeEvents.length}
              </span>
            )}
            <button
              onClick={() => setIsDismissed(true)}
              aria-label="이벤트 배너 닫기"
              className="p-1 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              title="배너 닫기"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 이벤트 내용 & 큼직한 배너 이미지 & CTA 버튼 */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-7 mt-2">
          {/* 좌측: 타이틀, 혜택 설명, 쿠폰 복사 & CTA 버튼 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              <span>{current.title}</span>
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed font-medium">
              {current.subtitle}
              {current.highlightText && (
                <span className="hidden sm:inline font-bold text-cyan-600 dark:text-cyan-400 ml-2">
                  • {current.highlightText}
                </span>
              )}
            </p>

            <div className="flex items-center gap-3 mt-4 flex-wrap">
              {/* 메인 기획전 직행 링크 */}
              <a
                href={current.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className={`px-5 py-3 rounded-xl font-black text-xs sm:text-sm md:text-base flex items-center gap-2 shadow-lg ${style.btn} transition-all duration-200 active:scale-95 cursor-pointer`}
              >
                <span>🔥 {current.platformName} 특가 보러가기</span>
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              {/* 프로모션 코드 원클릭 복사 버튼 */}
              {current.promoCode && (
                <button
                  onClick={(e) => handleCopyCode(current.promoCode!, e)}
                  className="px-3.5 py-3 rounded-xl bg-slate-900/90 text-white dark:bg-slate-800 dark:text-slate-100 border border-slate-700 hover:border-amber-400 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md"
                  title="할인코드 클립보드 복사"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                  <span>{copiedCode ? '코드 복사완료!' : `코드: ${current.promoCode}`}</span>
                </button>
              )}

              {/* 좌우 슬라이드 버튼 */}
              {activeEvents.length > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={prevSlide}
                    aria-label="이전 기획전"
                    className="p-2.5 rounded-xl bg-slate-200/80 dark:bg-slate-800/90 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                    title="이전 기획전"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="다음 기획전"
                    className="p-2.5 rounded-xl bg-slate-200/80 dark:bg-slate-800/90 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                    title="다음 기획전"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 우측: 배너사 기획전 비주얼 */}
          {current.imageUrl && (
            <a
              href={current.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group/banner-img relative block w-full lg:w-[400px] xl:w-[460px] h-[170px] sm:h-[220px] lg:h-[200px] xl:h-[220px] shrink-0 rounded-2xl overflow-hidden border-2 border-slate-200/90 dark:border-slate-800/90 shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-[0.99] cursor-pointer bg-slate-950"
              title={`${current.title} 바로가기`}
            >
              <img
                src={current.imageUrl}
                alt={current.imageAlt || current.title}
                fetchPriority={currentIndex === 0 ? 'high' : undefined}
                loading={currentIndex === 0 ? undefined : 'lazy'}
                className="w-full h-full object-cover object-center group-hover/banner-img:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover/banner-img:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-xs font-black text-white flex items-center gap-1.5">
                  <span>{current.platformName} 공식 특가 바로가기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="absolute top-2.5 right-2.5 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 px-2.5 py-1 rounded-lg text-[11px] font-bold text-white font-mono shadow-md flex items-center gap-1">
                <span>{current.platformName} 공식</span>
                <span>🔥</span>
              </div>
            </a>
          )}
        </div>

        {/* 인디케이터 닷 */}
        {activeEvents.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-3.5 pt-2.5 border-t border-slate-200/40 dark:border-slate-800/60">
            {activeEvents.map((evt, idx) => (
              <button
                key={evt.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? 'w-6 bg-cyan-500'
                    : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
                aria-label={`이벤트 ${idx + 1}번 선택: ${evt.title}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
