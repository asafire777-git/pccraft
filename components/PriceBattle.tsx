'use client';

import React, { useState } from 'react';
import { ComponentItem } from '@/data/components';
import { GamePreset } from '@/data/presets';
import { getCoupangProductUrl, getCoupangSearchUrl, getNaverShoppingUrl } from '@/lib/affiliate';
import { Zap, Truck, ShieldCheck, Coins, ExternalLink, ChevronDown, ChevronUp, Trophy, Check, ArrowRight, Sparkles } from 'lucide-react';

interface PriceBattleProps {
  currentPreset: GamePreset;
  selectedComponents: Record<string, ComponentItem>;
  totalPrice: number;
}

export default function PriceBattle({ currentPreset, selectedComponents, totalPrice }: PriceBattleProps) {
  const [showPartsDetail, setShowPartsDetail] = useState(false);

  // 쿠팡 체감 혜택 계산 (카드 즉시할인 약 4% 추정)
  const coupangCardDiscount = Math.round(totalPrice * 0.04);
  const coupangEffectivePrice = totalPrice - coupangCardDiscount;

  // 네이버 쇼핑 체감 혜택 계산 (네이버페이 멤버십 포인트 약 5% 적립 추정)
  const naverPointCashback = Math.round(totalPrice * 0.05);
  const naverEffectivePrice = totalPrice - naverPointCashback;

  // 핵심 3대 부품 추출 (CPU, 그래픽카드, SSD)
  const keyCategories = [
    { key: 'cpu', label: 'CPU (프로세서)' },
    { key: 'gpu', label: '그래픽카드 (VGA)' },
    { key: 'ssd', label: 'SSD (초고속 스토리지)' }
  ];

  return (
    <section className="my-12 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* 배경 은은한 그라데이션 장식 */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 섹션 헤더 */}
      <div className="text-center max-w-2xl mx-auto mb-8 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500/10 to-emerald-500/10 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          실시간 플랫폼 최저가 빅매치
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          쿠팡 로켓배송 <span className="text-rose-500">VS</span> 네이버 쇼핑
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          어디서 사는 게 진짜 이득일까? 단순 표시 가격뿐만 아니라 <strong>배송 속도, 카드사 즉시할인, 네이버페이 적립금</strong>까지 종합 비교해 드립니다.
        </p>
      </div>

      {/* 1:1 대결 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* 중앙 VS 배지 (데스크탑 화면 중앙 겹침 효과) */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-900 dark:bg-slate-800 border-4 border-white dark:border-slate-950 items-center justify-center shadow-xl">
          <span className="font-black italic text-xs tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-emerald-400">
            VS
          </span>
        </div>

        {/* 1. 쿠팡 로켓배송 카드 */}
        <div className="rounded-2xl border-2 border-rose-500/30 dark:border-rose-500/40 bg-gradient-to-b from-rose-50/50 via-white to-rose-50/30 dark:from-rose-950/20 dark:via-slate-900 dark:to-rose-950/10 p-5 sm:p-6 flex flex-col justify-between shadow-lg relative group hover:border-rose-500 transition-colors">
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500 text-white text-[11px] font-extrabold shadow-sm">
              <Trophy className="w-3 h-3" /> 빠른배송 1위
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-rose-500/30">
                🚀
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-1.5">
                  쿠팡 로켓배송
                </h3>
                <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
                  로켓와우 익일/새벽 도착 보장
                </span>
              </div>
            </div>

            {/* 가격 정보 */}
            <div className="my-4 p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-rose-200/60 dark:border-rose-900/40">
              <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                <span>견적 합계가</span>
                <span className="font-mono line-through">{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between items-center text-xs text-rose-600 dark:text-rose-400 mt-1">
                <span>카드사 최대 즉시할인 (추정)</span>
                <span className="font-mono font-bold">-{coupangCardDiscount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between items-end mt-2 pt-2 border-t border-rose-100 dark:border-rose-900/30">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">최종 체감 혜택가</span>
                <span className="text-xl font-black font-mono text-rose-600 dark:text-rose-400">
                  약 {coupangEffectivePrice.toLocaleString()}원
                </span>
              </div>
            </div>

            {/* 핵심 혜택 리스트 */}
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 my-4">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>내일 아침 7시 전 문 앞 도착:</strong> 주말에 조립하고 바로 게임 가능
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>전 부품 묶음 무료배송:</strong> 판매처별 개별 배송비(3,000원×n) 0원
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>30일 무료 반품 & 맞교환:</strong> 초기 불량 발생 시 즉시 교환 접수
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <a
              href={getCoupangSearchUrl(currentPreset.title)}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-rose-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>쿠팡 로켓 실시간 최저가 확인</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2. 네이버 쇼핑 카드 */}
        <div className="rounded-2xl border-2 border-emerald-500/30 dark:border-emerald-500/40 bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/30 dark:from-emerald-950/20 dark:via-slate-900 dark:to-emerald-950/10 p-5 sm:p-6 flex flex-col justify-between shadow-lg relative group hover:border-emerald-500 transition-colors">
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-extrabold shadow-sm">
              <Trophy className="w-3 h-3" /> 포인트 적립 1위
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-emerald-500/30">
                N
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-1.5">
                  네이버 쇼핑
                </h3>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  스마트스토어 & 브랜드스토어
                </span>
              </div>
            </div>

            {/* 가격 정보 */}
            <div className="my-4 p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200/60 dark:border-emerald-900/40">
              <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                <span>네이버 최저가 기준</span>
                <span className="font-mono">{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between items-center text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                <span>네이버플러스 멤버십 포인트 적립 (추정)</span>
                <span className="font-mono font-bold">+{naverPointCashback.toLocaleString()}P</span>
              </div>
              <div className="flex justify-between items-end mt-2 pt-2 border-t border-emerald-100 dark:border-emerald-900/30">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">포인트 환산 실체감가</span>
                <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                  약 {naverEffectivePrice.toLocaleString()}원
                </span>
              </div>
            </div>

            {/* 핵심 혜택 리스트 */}
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 my-4">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>네이버페이 포인트 최대 5% 적립:</strong> 다른 쇼핑 및 현금처럼 재사용
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>오픈마켓 최저가 탐색:</strong> 유통사 직영 특가 및 쿠폰 적용 가능
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>일반 택배 배송:</strong> 평균 1~3일 소요 (상점별 개별 배송비 확인 필요)
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <a
              href={getNaverShoppingUrl(currentPreset.title)}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>네이버 쇼핑 실시간 최저가 확인</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 스마트 AI 구매 가이드 판정 */}
      <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white mb-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>PC-Craft 구매 결정 가이드 요약</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <strong className="text-rose-600 dark:text-rose-400 block mb-1">
              🚀 쿠팡 로켓배송을 추천하는 분
            </strong>
            “기다리기 싫고 내일 당장 조립하고 싶다”, “부품 초기 불량 시 번거로운 실랑이 없이 묻지마 맞교환/환불을 원한다면 쿠팡이 압도적으로 유리합니다.”
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">
              🟢 네이버 쇼핑을 추천하는 분
            </strong>
            “배송이 2~3일 걸려도 괜찮다”, “네이버플러스 멤버십을 쓰고 있어 수만 원 상당의 네이버페이 적립금을 챙기고 싶다면 네이버가 더 유리합니다.”
          </div>
        </div>
      </div>

      {/* 핵심 3대 부품 1:1 비교 토글 아코디언 */}
      <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-5">
        <button
          onClick={() => setShowPartsDetail(!showPartsDetail)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer py-1"
        >
          <span className="flex items-center gap-1.5">
            🔍 주요 핵심 부품(CPU·GPU·SSD) 개별 플랫폼 최저가 1:1 바로가기
          </span>
          {showPartsDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showPartsDetail && (
          <div className="mt-4 space-y-3 animate-in fade-in duration-200">
            {keyCategories.map(({ key, label }) => {
              const comp = selectedComponents[key];
              if (!comp) return null;

              const coupangUrl = getCoupangProductUrl(comp.id, comp.name);
              const naverUrl = getNaverShoppingUrl(comp.name, comp.id);

              return (
                <div
                  key={key}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">{label}</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate block">
                      {comp.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      정가 기준 {comp.price.toLocaleString()}원
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={coupangUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 text-xs font-bold flex items-center gap-1 transition-colors"
                      title="쿠팡 로켓배송 최저가 확인 (트래킹 장착)"
                    >
                      <span>쿠팡 최저가</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <a
                      href={naverUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 text-xs font-bold flex items-center gap-1 transition-colors"
                      title="네이버 쇼핑 최저가 확인"
                    >
                      <span>네이버 최저가</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 하단 제휴 및 경제적 대가 안내 */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 text-center leading-relaxed">
        ※ 본 플랫폼 최저가 비교는 실시간 시장 시세 및 쿠팡 파트너스·네이버 쇼핑 공식 검색 데이터를 기반으로 제공되며, 제휴 링크를 통해 구매 시 일정액의 수수료를 제공받을 수 있습니다.
      </div>
    </section>
  );
}
