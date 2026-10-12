import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '서비스 이용약관 | PC-Craft',
  description: 'PC-Craft의 견적 서비스 이용 조건 및 가격 정보 면책 조항 안내입니다.'
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 mb-6 font-semibold">
          <ArrowLeft className="w-4 h-4" /> 맞춤 견적기로 돌아가기
        </Link>

        <div className="bg-white dark:bg-slate-900/60 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs leading-relaxed text-slate-600 dark:text-slate-300 space-y-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">서비스 이용약관</h1>
            <p className="text-slate-400 mt-1">시행일자: 2026년 10월 12일</p>
          </div>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">제1조 (목적)</h2>
            <p>
              본 약관은 PC-Craft(이하 &apos;사이트&apos;)가 제공하는 컴퓨터 부품 정보 탐색, 호환성 검증 알고리즘, 및 오픈마켓 가격 큐레이션 서비스의 이용조건 및 절차를 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">제2조 (정보 제공 및 면책)</h2>
            <p>
              1. 본 사이트에서 제공하는 가격 정보 및 재고 현황은 각 제휴 오픈마켓의 Open API 및 실시간 시세를 바탕으로 제공되나, 판매처의 긴급 프로모션, 환율 변동 등으로 인해 실제 결제 금액과 일시적 오차가 발생할 수 있습니다.<br />
              2. 본 사이트는 직접 물품을 판매 및 배송하는 통신판매업자가 아니며, 사용자와 판매처 간에 이루어지는 직·간접적인 거래에 대해서는 일체의 법적 책임을 부담하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">제3조 (지적재산권)</h2>
            <p>
              본 사이트에서 자체 개발한 호환성 체크 알고리즘, 벤치마크 분석 보고서, 디자인 UI 컴포넌트에 대한 저작권은 회사에 귀속됩니다.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
