'use client';

import React, { useState } from 'react';
import { MonitorItem, getRecommendedMonitors } from '@/data/monitors';
import { Monitor, ExternalLink, Sparkles, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { getCoupangProductUrl, getOpenMarketProductUrl } from '@/lib/affiliate';
import { trackEvent } from '@/lib/gtag';

interface MatchingMonitorsProps {
  gpuName?: string;
}

export default function MatchingMonitors({ gpuName }: MatchingMonitorsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { tierLabel, tierDesc, monitors } = getRecommendedMonitors(gpuName);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors mt-4">
      {/* 아코디언 헤더 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 dark:from-indigo-500/20 dark:to-cyan-500/20 border border-indigo-200 dark:border-indigo-800/40 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
            <Monitor className="w-5 h-5" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Monitor Matching Guide
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40 font-semibold font-mono">
                {tierLabel}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5 truncate">
              현재 견적 그래픽카드 연동 맞춤 모니터 추천
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-slate-400 dark:text-slate-500">
          <span className="hidden sm:inline text-xs font-medium">
            {isOpen ? '접기' : '펼치기'}
          </span>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* 아코디언 본문 */}
      {isOpen && (
        <div className="px-4 pb-5 sm:px-5 border-t border-slate-100 dark:border-slate-800/80 pt-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            💡 {tierDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {monitors.map((mon) => (
              <div
                key={mon.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/40 px-2 py-0.5 rounded">
                      {mon.brand}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      {mon.price.toLocaleString()}원
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug mb-1">
                    {mon.name}
                  </h4>

                  <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-slate-500 dark:text-slate-400 font-mono mb-2">
                    <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
                      {mon.screenSize}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
                      {mon.resolution}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                      {mon.refreshRate}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800">
                      {mon.panelType}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-3 flex items-start gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                    <span>{mon.reason}</span>
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {mon.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-1.5 py-0.5 rounded"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 구매 CTA 버튼 */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                  <a
                    href={getCoupangProductUrl(mon.id, mon.name, mon.searchKeyword)}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    onClick={() => trackEvent('affiliate_click', { platform: 'coupang', item_id: mon.id, item_name: mon.name, price: mon.price, category: 'monitor' })}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs transition-colors"
                    title="쿠팡 로켓배송 최저가 보기"
                  >
                    <span>🚀 쿠팡</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={getOpenMarketProductUrl(mon.id, mon.name, '11st', mon.searchKeyword)}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    onClick={() => trackEvent('affiliate_click', { platform: '11st', item_id: mon.id, item_name: mon.name, price: mon.price, category: 'monitor' })}
                    className="py-1.5 px-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs transition-colors"
                    title="11번가 슈팅배송 실시간가"
                  >
                    <span>⚡ 11번가</span>
                  </a>

                  <a
                    href={getOpenMarketProductUrl(mon.id, mon.name, 'gmarket', mon.searchKeyword)}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    onClick={() => trackEvent('affiliate_click', { platform: 'gmarket', item_id: mon.id, item_name: mon.name, price: mon.price, category: 'monitor' })}
                    className="py-1.5 px-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs transition-colors"
                    title="G마켓 특가 보기"
                  >
                    <span>🛒 G마켓</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
