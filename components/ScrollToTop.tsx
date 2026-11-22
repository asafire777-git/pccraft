'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const calculateProgress = useCallback(() => {
    if (typeof window === 'undefined') return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // 250px 이상 스크롤 시 버튼 표시
    if (scrollTop > 250) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    if (scrollHeight > 0) {
      const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
      setScrollProgress(progress);
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [calculateProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG 원 둘레 계산 (반지름 r = 21, 둘레 = 2 * PI * 21 ≈ 131.95)
  const radius = 21;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50 transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="페이지 맨 위로 이동"
        className="group relative flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 shadow-lg shadow-slate-900/5 dark:shadow-black/40 hover:shadow-cyan-500/25 dark:hover:shadow-cyan-400/25 hover:border-cyan-500/60 dark:hover:border-cyan-400/60 transition-all duration-300 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
      >
        {/* 원형 스크롤 진행률 프로그레스 바 */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 48 48"
        >
          {/* 배경 트랙 */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-slate-200/80 dark:text-slate-800/80"
          />
          {/* 진행률 바 */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-cyan-500 dark:text-cyan-400 transition-all duration-150"
          />
        </svg>

        {/* 내부 아이콘 & TOP 텍스트 */}
        <div className="flex flex-col items-center justify-center text-slate-700 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5] transform group-hover:-translate-y-1 transition-transform duration-300" />
          <span className="text-[9px] sm:text-[10px] font-black tracking-wider leading-none mt-0.5 select-none font-sans">
            TOP
          </span>
        </div>

        {/* 툴팁 (데스크탑 마우스 호버 시 부드럽게 노출) */}
        <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[11px] font-semibold rounded-md shadow-md opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 pointer-events-none transition-all duration-200 whitespace-nowrap hidden sm:block">
          맨 위로
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-100" />
        </span>
      </button>
    </div>
  );
}
