import React from 'react';

interface AdBannerProps {
  slotId?: string;
  format?: 'horizontal' | 'in-feed' | 'rectangle';
  className?: string;
}

export default function AdBanner({ slotId = 'default-slot', className = '' }: AdBannerProps) {
  return (
    <aside aria-label="광고 영역" className={`my-8 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 text-center transition-colors ${className}`}>
      <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 uppercase font-mono mb-2 px-1">
        <span>스폰서 링크 / ADVERTISEMENT</span>
        <span>Google AdSense Slot #{slotId}</span>
      </div>
      <div className="min-h-[90px] flex flex-col items-center justify-center rounded-lg bg-white dark:bg-slate-950/60 p-4 border border-slate-200 dark:border-slate-800/60 shadow-sm">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          전자기기 최저가 핫딜 & 카드사 즉시할인 프로모션
        </p>
        <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          (실제 운영 시 본 영역에 구글 애드센스 인피드 스크립트가 자동 로드됩니다)
        </span>
      </div>
    </aside>
  );
}
