import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { Cpu, Zap, HardDrive, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PC 부품 호환성 & 조립 가이드 2026 | PC-Craft',
  description: 'CPU와 메인보드 소켓 규격(AM5, LGA1700), DDR5 메모리 호환성, 그래픽카드 권장 파워 서플라이 계산법을 완벽 정리한 하드웨어 가이드입니다.'
};

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 mb-6 font-semibold">
          <ArrowLeft className="w-4 h-4" /> 맞춤 견적기로 돌아가기
        </Link>

        <DisclaimerBanner />

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 font-mono tracking-wider uppercase">Hardware Expert Guide</span>
            <h1 className="text-3xl sm:text-4xl font-black mt-2 text-slate-900 dark:text-white">
              2026 데스크톱 PC 하드웨어 호환성 & 사양 가이드
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 leading-relaxed">
              조립 컴퓨터를 처음 맞추거나 부품을 업그레이드할 때 가장 많이 실수하는 호환성 규칙과 필수 지식을 알기 쉽게 정리했습니다.
            </p>

            {/* 신설 하드웨어 랩 10대 리포트 바로가기 배너 */}
            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-indigo-500/15 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <strong className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>📖 [하드웨어 랩] 2026 심층 분석 리포트 10선 OPEN!</span>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-rose-600 text-white">NEW</span>
                </strong>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  RTX 50 vs 40 계급도, 라이젠 9800X3D 벤치마크, ATX 3.1 파워 계산법 등 각 3,000~6,000자 전문 리포트
                </p>
              </div>
              <Link
                href="/lab"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1 transition-all shadow-sm"
              >
                <span>리포트 허브 이동</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* 섹션 1: CPU 소켓 호환성 */}
          <section className="mb-10 bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white mb-3">
              <Cpu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              1. CPU와 메인보드 소켓(Socket) 일치 여부
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              CPU는 메인보드의 소켓 규격과 100% 일치해야 물리적으로 장착할 수 있습니다. 아무리 최신 메인보드라 하더라도 소켓 형태가 다르면 사용할 수 없습니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block font-bold mb-1">AMD 라이젠 7000 / 9000 시리즈</strong>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  • 소켓 규격: <strong>AM5</strong><br />
                  • 추천 메인보드: A620, B650, X670<br />
                  • 메모리: DDR5 전용 (DDR4 장착 불가)
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block font-bold mb-1">인텔 코어 13 / 14세대 시리즈</strong>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  • 소켓 규격: <strong>LGA1700</strong><br />
                  • 추천 메인보드: H610, B760, Z790<br />
                  • 메모리: DDR4 또는 DDR5 보드에 따라 선택
                </p>
              </div>
            </div>
          </section>

          {/* 섹션 2: 파워서플라이 정격 용량 계산 */}
          <section className="mb-10 bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white mb-3">
              <Zap className="w-5 h-5 text-amber-500" />
              2. 파워서플라이 정격 출력(W)과 피크 부하
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              시스템 전체 소비 전력(CPU TDP + 그래픽카드 TDP + 기본 전력 80W)에 최소 <strong>30%~40% 이상의 여유 마진</strong>을 둔 파워를 선택해야 게임 도중 셧다운(갑작스러운 전원 꺼짐) 현상을 방지할 수 있습니다.
            </p>
            <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>GTX 1650 / RTX 3050 급:</strong> 정격 500W 브론즈 파워 권장</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>RTX 4060 / 4060 Ti 급:</strong> 정격 550W ~ 600W 권장</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>RTX 4070 SUPER / 4070 Ti 급:</strong> 정격 700W ~ 750W 권장 (12V-2x6 케이블 지원)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>RTX 4080 SUPER / 4090 급:</strong> 정격 850W ~ 1000W 골드 등급 필수 권장</span>
              </li>
            </ul>
          </section>

          {/* 섹션 3: SSD 폼팩터 및 인터페이스 */}
          <section className="bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white mb-3">
              <HardDrive className="w-5 h-5 text-purple-500" />
              3. M.2 NVMe SSD 속도와 DRAM 탑재 유무
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              최신 스팀 대작 게임(다이렉트 스토리지 지원 게임) 및 윈도우 부팅 속도를 최적화하려면 SATA 방식보다 <strong>M.2 NVMe PCIe 4.0 규격</strong>을 사용하는 것이 필수적입니다. 또한 대용량 파일 전송이나 장시간 게임 플레이 시 속도 저하를 막기 위해 <strong>DRAM(디램) 탑재 모델</strong>(예: SK하이닉스 P41, 삼성 990 PRO)을 추천합니다.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
