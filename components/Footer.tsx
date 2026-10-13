import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 py-12 px-4 sm:px-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-900">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-slate-900 dark:text-white">PC-Craft Smart Commerce</span>
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/40">
                pccraft.kr
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              실시간 오픈마켓 최저가 비교 및 하드웨어 호환성 알고리즘을 통해 소비자에게 가장 합리적인 데스크톱 컴퓨터 견적과 완본체 솔루션을 제안합니다.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 px-3 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>KFTC 전자상거래 소비자보호법 및 제휴 가이드 준수</span>
          </div>
        </div>

        {/* 공식 운영 브랜드 및 단일 공식 메일 창구 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-xs">
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px]">공식 제휴 & 고객 지원</span>
              <a href="mailto:contact@pccraft.kr" className="font-semibold text-slate-800 dark:text-slate-200 hover:underline">
                contact@pccraft.kr
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px]">운영 플랫폼</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                피씨크래프트 (PC-Craft Team)
              </span>
            </div>
          </div>
        </div>

        {/* 필수 정책 네비게이션 */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-400 pt-2">
          <Link href="/lab" className="hover:text-cyan-600 dark:hover:text-cyan-400 underline font-semibold">
            하드웨어 랩 (10대 리포트)
          </Link>
          <Link href="/laptop" className="hover:text-cyan-600 dark:hover:text-cyan-400 underline">
            노트북&amp;완제관
          </Link>
          <Link href="/deals" className="hover:text-cyan-600 dark:hover:text-cyan-400 underline">
            할인 캘린더
          </Link>
          <Link href="/guide" className="hover:text-cyan-600 dark:hover:text-cyan-400 underline">
            PC 부품 호환성 가이드
          </Link>
          <Link href="/about" className="hover:text-cyan-600 dark:hover:text-cyan-400 underline">
            서비스 소개 &amp; 제휴안내
          </Link>
          <Link href="/terms" className="hover:text-cyan-600 dark:hover:text-cyan-400 underline">
            이용약관
          </Link>
          <Link href="/privacy" className="hover:text-cyan-600 dark:hover:text-cyan-400 underline font-bold text-slate-900 dark:text-slate-200">
            개인정보처리방침
          </Link>
        </div>

        <div className="text-[11px] text-slate-400 dark:text-slate-500 space-y-2 leading-relaxed">
          <p>
            <strong>제휴 마케팅 및 대가성 공지사항:</strong> 본 웹사이트(pccraft.kr)는 쿠팡 파트너스(Coupang Partners), 링크프라이스(G마켓, 옥션, 롯데ON, 하이마트 등), 네이버 쇼핑 제휴마케팅 프로그램 참여자로서 제휴마케팅이 포함된 광고 및 큐레이션 정보를 제공하며, 사이트 내 추천 링크를 통한 유효 구매 발생 시 플랫폼사로부터 일정액의 수수료를 제공받을 수 있습니다. 이는 구매자의 결제 금액에 어떠한 불이익이나 추가 비용을 발생시키지 않습니다.
          </p>
          <p>
            <strong>면책 조항:</strong> 본 사이트에 노출되는 상품 가격 및 재고 수량은 오픈마켓 및 파트너사의 실시간 프로모션, 환율, 수급 상황에 따라 변동될 수 있습니다. 최종 결제 전 판매 페이지의 실제 금액과 스펙을 반드시 재확인하시기 바랍니다.
          </p>
          <p className="pt-2 text-slate-400 dark:text-slate-600 font-mono">
            © 2026 피씨크래프트 (pccraft.kr). All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
