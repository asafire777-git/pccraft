import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { GAME_SEO_LIST, GameSeoData } from '@/data/games';
import { GAME_PRESETS } from '@/data/presets';
import { COMPONENTS_DATA } from '@/data/components';
import { getCoupangPrebuiltUrl, getOpenMarketPrebuiltUrl } from '@/lib/affiliate';
import {
  Gamepad2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Monitor,
  Flame,
  ArrowLeft,
  Wrench,
  HelpCircle,
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';

interface GamePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GAME_SEO_LIST.map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = GAME_SEO_LIST.find((g) => g.slug === slug);
  if (!game) return {};

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pccraft.kr';
  const pageUrl = `${baseUrl}/game/${game.slug}`;

  return {
    title: game.metaTitle,
    description: game.metaDescription,
    keywords: game.keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: game.metaTitle,
      description: game.metaDescription,
      url: pageUrl,
      type: 'article',
      images: [
        {
          url: game.heroImage,
          width: 1200,
          height: 630,
          alt: game.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: game.metaTitle,
      description: game.metaDescription,
      images: [game.heroImage],
    },
  };
}

export default async function GameLandingPage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = GAME_SEO_LIST.find((g) => g.slug === slug);

  if (!game) {
    notFound();
  }

  const preset = GAME_PRESETS.find((p) => p.id === game.presetId) || GAME_PRESETS[1];

  // 프리셋 부품 목록 및 실시간 합계 금액 계산
  const componentsList = Object.entries(preset.defaultComponentIds).map(([category, id]) => {
    const item = COMPONENTS_DATA[category]?.find((c) => c.id === id);
    return {
      category,
      item,
    };
  }).filter((c) => c.item !== undefined);

  const totalPrice = componentsList.reduce((sum, c) => sum + (c.item?.price || 0), 0);

  // 구글 검색 리치 스니펫용 JSON-LD 스키마 (FAQPage)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: game.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* 상단 네비게이션 브레드크럼 */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
          <Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-400">
            홈
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>게임별 추천 견적</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-slate-200 font-bold truncate">
            {game.shortTitle}
          </span>
        </div>

        {/* 1. 히어로 배너 영역 */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-10 border border-slate-800 shadow-xl mb-10">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-4">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>{game.genre} • {game.developer}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {game.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              {game.subtitle}
            </p>

            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <Link
                href={`/?preset=${preset.id}#builder-table`}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <span>이 견적으로 실시간 커스텀하기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="#system-requirements"
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/10 transition-all cursor-pointer"
              >
                공식 사양표 비교
              </Link>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
            <img
              src={game.heroImage}
              alt={game.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-950/70 to-slate-950" />
          </div>
        </section>

        {/* 2. 해상도별 예상 프레임 벤치마크 지표 */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <span>목표 해상도별 실측 평균 FPS</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <span className="text-[11px] text-slate-500 block mb-1">FHD (보통 옵션)</span>
              <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                {game.fpsBenchmarks.fhdMedium}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-emerald-500/40 shadow-sm text-center bg-emerald-50/30 dark:bg-emerald-950/20">
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block mb-1 font-semibold">
                FHD 풀옵션 (추천)
              </span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {game.fpsBenchmarks.fhdUltra}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <span className="text-[11px] text-slate-500 block mb-1">QHD (고화질)</span>
              <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                {game.fpsBenchmarks.qhdHigh}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <span className="text-[11px] text-slate-500 block mb-1">4K UHD</span>
              <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                {game.fpsBenchmarks.uhd4k}
              </span>
            </div>
          </div>
        </section>

        {/* 3. PC-Craft 실시간 검증 추천 견적 상세 카드 */}
        <section className="mb-12">
          <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
              <div>
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 block mb-1">
                  PC-CRAFT VERIFIED SPEC
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {game.shortTitle} 최적화 공식 추천 부품 견적
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  병목 현상(Bottleneck) 0% 및 실시간 오픈마켓 최저가 검증 완료 구성
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-400 block">실시간 부품 최저가 합계</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
            </div>

            {/* 부품 목록 테이블 */}
            <div className="mt-6 divide-y divide-slate-100 dark:divide-slate-800/80">
              {componentsList.map(({ category, item }) => {
                if (!item) return null;
                return (
                  <div key={item.id} className="py-3.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-16 font-bold text-slate-500 shrink-0 uppercase font-mono">
                        {category}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {item.name}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300 shrink-0">
                      {item.price.toLocaleString()}원
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 견적 액션 버튼 그룹 */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                💡 실시간 최저가 쿠폰 및 부품 변경은 메인 견적기에서 지원됩니다.
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href={`/?preset=${preset.id}#builder-table`}
                  className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>견적기에서 부품 교체하기</span>
                </Link>

                <a
                  href={getCoupangPrebuiltUrl(preset.id)}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <span>🚀 쿠팡 완본체 보기</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 공식 시스템 사양 비교표 */}
        <section id="system-requirements" className="mb-12">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>{game.shortTitle} 공식 시스템 요구 사양</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
              <span className="font-bold text-slate-400 block mb-2 font-mono">MINIMUM (최소 사양)</span>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>• CPU: {game.systemRequirements.minimum.cpu}</li>
                <li>• RAM: {game.systemRequirements.minimum.ram}</li>
                <li>• GPU: {game.systemRequirements.minimum.gpu}</li>
                <li>• 용량: {game.systemRequirements.minimum.storage}</li>
                <li className="pt-2 text-emerald-600 font-bold border-t border-slate-100 dark:border-slate-800">
                  타겟: {game.systemRequirements.minimum.targetFps}
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border-2 border-cyan-500/40 text-xs shadow-md">
              <span className="font-bold text-cyan-600 dark:text-cyan-400 block mb-2 font-mono">
                RECOMMENDED (공식 권장 사양)
              </span>
              <ul className="space-y-2 text-slate-700 dark:text-slate-200 font-medium">
                <li>• CPU: {game.systemRequirements.recommended.cpu}</li>
                <li>• RAM: {game.systemRequirements.recommended.ram}</li>
                <li>• GPU: {game.systemRequirements.recommended.gpu}</li>
                <li>• 용량: {game.systemRequirements.recommended.storage}</li>
                <li className="pt-2 text-cyan-600 font-bold border-t border-slate-100 dark:border-slate-800">
                  타겟: {game.systemRequirements.recommended.targetFps}
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-indigo-500/40 text-xs">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-2 font-mono">
                144Hz ULTRA (고주사율 종결)
              </span>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>• CPU: {game.systemRequirements.ultra144hz.cpu}</li>
                <li>• RAM: {game.systemRequirements.ultra144hz.ram}</li>
                <li>• GPU: {game.systemRequirements.ultra144hz.gpu}</li>
                <li>• 용량: {game.systemRequirements.ultra144hz.storage}</li>
                <li className="pt-2 text-indigo-600 font-bold border-t border-slate-100 dark:border-slate-800">
                  타겟: {game.systemRequirements.ultra144hz.targetFps}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. 전문가 하드웨어 세팅 꿀팁 */}
        <section className="mb-12">
          <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs leading-relaxed">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>전문가 {game.shortTitle} 하드웨어 세팅 팁</span>
            </h2>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              {game.expertTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. 자주 묻는 질문 (FAQ - SEO 리치 스니펫 대응) */}
        <section className="mb-14">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <span>자주 묻는 질문 (FAQ)</span>
          </h2>

          <div className="space-y-3">
            {game.faq.map((f, idx) => (
              <details
                key={idx}
                className="group p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs transition-colors"
              >
                <summary className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer list-none flex items-center justify-between">
                  <span>Q. {f.question}</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 leading-relaxed">
                  A. {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* 7. 다른 게임 맞춤 견적 둘러보기 */}
        <section className="mb-10 pb-8 border-t border-slate-200 dark:border-slate-800 pt-8">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
            🎮 다른 대세 게임 추천 견적 바로가기
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {GAME_SEO_LIST.filter((g) => g.slug !== game.slug).map((g) => (
              <Link
                key={g.slug}
                href={`/game/${g.slug}`}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                {g.shortTitle} 견적 →
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
