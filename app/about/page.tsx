import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { ShieldCheck, Target, HeartHandshake, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '플랫폼 소개 & 제휴 운영 원칙 | PC-Craft',
  description: 'PC-Craft의 설립 목적, 실시간 최저가 수집 철학 및 공정거래위원회 지침 준수 투명성 정책 안내입니다.',
  alternates: {
    canonical: 'https://pccraft.kr/about',
  },
  openGraph: {
    title: '플랫폼 소개 & 제휴 운영 원칙 | PC-Craft',
    description: 'PC-Craft의 설립 목적 및 공정거래위원회 지침 준수 투명성 정책 안내',
    url: 'https://pccraft.kr/about',
    images: [{ url: 'https://pccraft.kr/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 mb-6 font-semibold">
          <ArrowLeft className="w-4 h-4" /> 맞춤 견적기로 돌아가기
        </Link>

        <DisclaimerBanner />

        <div className="bg-white dark:bg-slate-900/60 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 font-mono tracking-wider uppercase">About PC-Craft</span>
          <h1 className="text-3xl font-black mt-2 text-slate-900 dark:text-white">
            PC-Craft 서비스 소개 & 가치
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 leading-relaxed">
            복잡하고 난해한 컴퓨터 부품 견적의 벽을 허물고, 누구나 본인이 즐기는 게임에 맞추어 가장 경제적이고 합리적인 데스크톱을 맞출 수 있도록 돕는 스마트 커머스 가이드 플랫폼입니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
              <div className="p-2.5 rounded-lg bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 w-fit mb-3">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">실시간 데이터 기반 추천</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                단순 광고성 부품 배치를 배제하고, 실제 하드웨어 벤치마크 실측치와 가격 변동 추이를 분석하여 가성비가 가장 우수한 조합만을 알고리즘으로 선별합니다.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
              <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 w-fit mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">철저한 법적 투명성</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                공정거래위원회 전자상거래 지침을 100% 준수하며, 소비자의 알 권리를 위해 제휴 링크 및 광고 영역을 명확히 고지합니다.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
