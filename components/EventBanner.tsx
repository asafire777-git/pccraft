'use client';

import React, { useState, useEffect } from 'react';
import { PromoEvent, getActivePromoEvents, getEventRemainingDays } from '@/data/events';
import { Sparkles, ExternalLink, ChevronLeft, ChevronRight, Clock, Tag, X } from 'lucide-react';

export default function EventBanner() {
  const [activeEvents, setActiveEvents] = useState<PromoEvent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setActiveEvents(getActivePromoEvents());
  }, []);

  // 활성 이벤트가 여러 개일 경우 6초마다 자동 슬라이드
  useEffect(() => {
    if (activeEvents.length <= 1 || isPaused || isDismissed) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeEvents.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeEvents.length, isPaused, isDismissed]);

  if (isDismissed || activeEvents.length === 0) {
    return null;
  }

  const current = activeEvents[currentIndex];
  const remaining = getEventRemainingDays(current.endDate);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeEvents.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % activeEvents.length);
  };

  // 테마 색상 맵핑
  const themeStyles = {
    cyan: {
      border: 'border-cyan-500/30 hover:border-cyan-500/60',
      bg: 'bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-slate-900/90 dark:from-cyan-950/60 dark:via-slate-900/80 dark:to-slate-950/90',
      badgeBg: 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
      btnBg: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-500/20',
      glow: 'from-cyan-500/10 to-transparent'
    },
    purple: {
      border: 'border-purple-500/30 hover:border-purple-500/60',
      bg: 'bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-slate-900/90 dark:from-purple-950/60 dark:via-slate-900/80 dark:to-slate-950/90',
      badgeBg: 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30',
      btnBg: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-500/20',
      glow: 'from-purple-500/10 to-transparent'
    },
    emerald: {
      border: 'border-emerald-500/30 hover:border-emerald-500/60',
      bg: 'bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-slate-900/90 dark:from-emerald-950/60 dark:via-slate-900/80 dark:to-slate-950/90',
      badgeBg: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      btnBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/20',
      glow: 'from-emerald-500/10 to-transparent'
    },
    amber: {
      border: 'border-amber-500/30 hover:border-amber-500/60',
      bg: 'bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-slate-900/90 dark:from-amber-950/60 dark:via-slate-900/80 dark:to-slate-950/90',
      badgeBg: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30',
      btnBg: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-amber-500/20',
      glow: 'from-amber-500/10 to-transparent'
    },
    blue: {
      border: 'border-blue-500/30 hover:border-blue-500/60',
      bg: 'bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-slate-900/90 dark:from-blue-950/60 dark:via-slate-900/80 dark:to-slate-950/90',
      badgeBg: 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30',
      btnBg: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/20',
      glow: 'from-blue-500/10 to-transparent'
    }
  };

  const style = themeStyles[current.themeColor] || themeStyles.cyan;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative mb-6 rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
    >
      <div
        className={`relative border ${style.border} ${style.bg} p-4 sm:p-5 backdrop-blur-md rounded-2xl transition-colors`}
      >
        {/* 상단 뱃지 & 마감 카운트다운 */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${style.badgeBg}`}
            >
              <Sparkles className="w-3 h-3" />
              {current.badge}
            </span>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
              <Clock className="w-3 h-3" />
              {remaining}
            </span>

            {current.discountRate && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                <Tag className="w-3 h-3" />
                {current.discountRate}
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
              className="p-1 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title="배너 닫기"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 이벤트 내용 & CTA 버튼 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>{current.title}</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-1 sm:line-clamp-none">
              {current.subtitle}
              {current.highlightText && (
                <span className="hidden md:inline font-semibold text-cyan-600 dark:text-cyan-400 ml-2">
                  • {current.highlightText}
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* 좌우 슬라이드 버튼 */}
            {activeEvents.length > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={prevSlide}
                  aria-label="이전 이벤트"
                  className="p-1.5 rounded-xl bg-slate-200/60 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="다음 이벤트"
                  className="p-1.5 rounded-xl bg-slate-200/60 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* 메인 기획전 직행 링크 */}
            <a
              href={current.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md ${style.btnBg} transition-all duration-200 active:scale-95`}
            >
              <span>기획전 특가 보러가기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 인디케이터 닷 (여러 개일 경우) */}
        {activeEvents.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-3 pt-2 border-t border-slate-200/40 dark:border-slate-800/60">
            {activeEvents.map((evt, idx) => (
              <button
                key={evt.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-6 bg-cyan-500'
                    : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
                aria-label={`이벤트 ${idx + 1}번 선택`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
