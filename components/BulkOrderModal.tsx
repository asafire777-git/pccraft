'use client';

import React, { useState } from 'react';
import { ComponentItem } from '@/data/components';
import { GamePreset } from '@/data/presets';
import { getCoupangProductUrl, getCoupangPrebuiltUrl } from '@/lib/affiliate';
import { X, ShoppingCart, ExternalLink, CheckCircle2, Copy, Check, Truck, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface BulkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedComponents: Record<string, ComponentItem>;
  currentPreset: GamePreset;
  totalPrice: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  cpu: 'CPU',
  cooler: '쿨러',
  motherboard: '메인보드',
  ram: '메모리(RAM)',
  gpu: '그래픽카드',
  ssd: 'SSD',
  power: '파워서플라이',
  case: '케이스'
};

export default function BulkOrderModal({
  isOpen,
  onClose,
  selectedComponents,
  currentPreset,
  totalPrice
}: BulkOrderModalProps) {
  const [copyDone, setCopyDone] = useState(false);

  if (!isOpen) return null;

  const componentsList = Object.entries(selectedComponents)
    .filter(([_, item]) => Boolean(item))
    .map(([key, item]) => ({
      key,
      label: CATEGORY_LABELS[key] || key,
      item
    }));

  // 전체 부품 쿠팡 최저가 탭 순차 열기
  const handleOpenAllTabs = () => {
    componentsList.forEach(({ item }, idx) => {
      const url = getCoupangProductUrl(item.id, item.name);
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
      }, idx * 250);
    });
  };

  // 견적서 텍스트 복사
  const handleCopyText = () => {
    const lines = [
      `[PC-Craft] ${currentPreset.title} 부품 일괄 구매 주문서`,
      `총 합계: ${totalPrice.toLocaleString()}원 (로켓배송 무료)`,
      `----------------------------------------`
    ];

    componentsList.forEach(({ label, item }) => {
      lines.push(`• [${label}] ${item.name} - ${item.price.toLocaleString()}원`);
    });

    lines.push(`----------------------------------------`);
    lines.push(`실시간 최저가 확인: https://pccraft.kr`);

    navigator.clipboard.writeText(lines.join('\n'));
    setCopyDone(true);
    setTimeout(() => setCopyDone(false), 2500);
  };

  const prebuiltUrl = getCoupangPrebuiltUrl(currentPreset.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative text-slate-900 dark:text-white max-h-[92vh] flex flex-col">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl cursor-pointer transition-colors"
          title="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-4 shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
              전 부품 일괄 구매 & 장바구니 가이드
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              선택하신 8개 핵심 부품을 가장 빠르고 저렴하게 구매하는 최적의 방법입니다.
            </p>
          </div>
        </div>

        {/* 총액 및 배송 혜택 요약 배너 */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/30 flex items-center justify-between gap-4 mb-4 shrink-0">
          <div>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold block">
              8개 부품 최종 견적 총액
            </span>
            <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              {totalPrice.toLocaleString()} <span className="text-sm font-sans font-normal">원</span>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              <Truck className="w-3 h-3" /> 로켓 묶음 무료배송
            </span>
            <span className="block text-slate-500 text-[11px] mt-0.5">내일 아침 7시 전 도착</span>
          </div>
        </div>

        {/* 8종 부품 리스트 (스크롤 영역) */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 mb-4 divide-y divide-slate-100 dark:divide-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            선택된 부품 목록 ({componentsList.length}개)
          </div>

          {componentsList.map(({ label, item }) => {
            const partUrl = getCoupangProductUrl(item.id, item.name);
            return (
              <div
                key={item.id}
                className="pt-2 flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0 flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold shrink-0">
                    {label}
                  </span>
                  <span className="truncate font-medium text-slate-800 dark:text-slate-200">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {item.price.toLocaleString()}원
                  </span>
                  <a
                    href={partUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40 text-[11px] font-bold flex items-center gap-0.5 transition-colors"
                    title="해당 부품 쿠팡 최저가 열기"
                  >
                    <span>담기</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3대 추천 구매 옵션 버튼 그룹 */}
        <div className="space-y-2.5 shrink-0 pt-2 border-t border-slate-200 dark:border-slate-800">
          {/* 옵션 1: 8개 부품 최저가 탭 순차 열기 */}
          <button
            onClick={handleOpenAllTabs}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>8개 부품 쿠팡 로켓배송 탭 차례로 열기 (추천)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* 옵션 2: 조립이 번거롭다면 완본체 원클릭 구매 */}
          <a
            href={prebuiltUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>조립이 번거로우신가요? 동급 완본체 PC 원클릭 로켓배송 바로구매</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* 옵션 3: 텍스트 복사 */}
          <button
            onClick={handleCopyText}
            className="w-full py-2 px-4 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copyDone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copyDone ? '주문서 복사 완료!' : '부품 주문서 텍스트 복사하기'}</span>
          </button>
        </div>

        {/* 쿠팡 보안 정책 안내 안내문구 */}
        <div className="mt-3 text-[10px] text-slate-400 text-center leading-tight">
          💡 쿠팡의 개인정보 보안 정책상 외부 사이트에서 개인 장바구니로의 직접 담기는 지원되지 않으며, 각 로켓배송 최저가 페이지에서 원클릭으로 담으시면 동일하게 카드 즉시할인 및 무료배송이 적용됩니다.
        </div>
      </div>
    </div>
  );
}
