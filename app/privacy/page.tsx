import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 | PC-Craft',
  description: 'PC-Craft의 개인정보 수집 항목, 쿠키(Cookie) 운영 및 구글 애드센스 등 제휴 광고 데이터 처리에 관한 방침입니다.',
  alternates: {
    canonical: 'https://pccraft.kr/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 mb-6 font-semibold">
          <ArrowLeft className="w-4 h-4" /> 맞춤 견적기로 돌아가기
        </Link>

        <div className="bg-white dark:bg-slate-900/60 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs leading-relaxed text-slate-600 dark:text-slate-300 space-y-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">개인정보처리방침</h1>
            <p className="text-slate-400 mt-1">최종 개정일: 2026년 10월 12일</p>
          </div>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">1. 개인정보의 수집 및 이용 목적</h2>
            <p>
              PC-Craft(이하 &apos;회사&apos;)는 사용자의 직접적인 회원가입 없이도 견적 시뮬레이터 기능을 자유롭게 제공합니다. 단, 견적 저장, 클라우드 동기화, 사용자 맞춤 서비스 제공 시에 한하여 최소한의 식별 정보(소셜 로그인 시 제공되는 고유 ID, 이메일)를 수집할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">2. 쿠키(Cookie) 및 웹 비콘의 운영</h2>
            <p>
              회사는 이용자의 편의성 증대(다크모드 설정 유지, 최근 견적 캐싱) 및 구글 애드센스(Google AdSense), 쿠팡 파트너스 등의 제휴 링크 클릭 식별을 위해 쿠키를 사용합니다. 이용자는 웹 브라우저의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">3. 구글 광고(Google AdSense) 관련 고지</h2>
            <p>
              본 웹사이트는 구글(Google LLC)이 제공하는 애드센스 광고를 게재할 수 있습니다. Google은 제휴 파트너로서 사용자가 이전에 방문한 웹사이트 기록을 바탕으로 관심 기반 광고를 게재하기 위해 DART 쿠키를 사용할 수 있습니다. 사용자는 Google 광고 및 콘텐츠 네트워크 개인정보 보호정책을 방문하여 DART 쿠키 사용을 중단할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">4. 개인정보 보호책임자 및 문의</h2>
            <p>
              서비스 이용 중 발생하는 개인정보 보호 관련 문의 및 제휴 상담은 공식 이메일(contact@pccraft.kr, 담당: 피씨크래프트 개인정보보호팀)로 접수해 주시면 신속히 처리해 드립니다.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
