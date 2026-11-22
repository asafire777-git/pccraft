import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { getPickBySlug, getAllPicks } from '@/data/picks';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Check,
  Flame,
  ChevronRight,
  Zap,
  Weight,
  Volume2,
  Plug,
  Layers,
  Eye,
  Info
} from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const picks = getAllPicks();
  return picks.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getPickBySlug(slug);

  if (!item) {
    return { title: '제품을 찾을 수 없습니다 | PC-Craft' };
  }

  return {
    title: `${item.title} | PC-Craft 테크&라이프 픽`,
    description: item.subtitle,
    keywords: [...item.tags, 'PC-Craft', '테크픽', '애드픽'],
    alternates: {
      canonical: `https://pccraft.kr/picks/${item.slug}`,
    },
    openGraph: {
      title: `${item.title} - 정밀 분석 리포트`,
      description: item.subtitle,
      url: `https://pccraft.kr/picks/${item.slug}`,
      images: [{ url: item.thumbnailImage, width: 800, height: 800 }],
    },
  };
}

// 챗GPT 특유의 ** 기호 및 지저분한 마크다운을 완벽히 정제하는 클리어타입 텍스트 클리너
function cleanText(text: string): string {
  return text.replace(/\*\*/g, '').replace(/__+/g, '').trim();
}

export default async function PickDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getPickBySlug(slug);

  if (!item) {
    notFound();
  }

  // 본문 단락 분리
  const paragraphs = item.content.split('\n\n');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 상단 브레드크럼 */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-cyan-600 transition-colors">홈</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/picks" className="hover:text-cyan-600 transition-colors">테크&amp;라이프 픽</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-[200px] sm:max-w-xs">
            {item.title}
          </span>
        </nav>

        <DisclaimerBanner />

        {/* 기사 헤더 영역 */}
        <header className="space-y-4 pt-2 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/40">
              {item.categoryLabel}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              {item.affiliatePlatform}
            </span>
            <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 실측 스펙 검증 완료
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            {cleanText(item.title)}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {cleanText(item.subtitle)}
          </p>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
            <div className="flex items-center gap-3">
              <span>작성: {item.author}</span>
              <span>•</span>
              <span>발행: {item.publishedAt}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {item.readTimeMinutes}분 소요
              </span>
            </div>
          </div>
        </header>

        {/* 1. 비주얼 쇼케이스 & 실측 스펙 하이라이트 박스 */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          {/* 제품 대표 실사 이미지 (로컬 고화질 에셋) */}
          <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative border border-slate-200 dark:border-slate-700 shadow-md shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={item.thumbnailImage} 
              alt={item.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-black flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" /> 실사 갤러리 포함
            </div>
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-cyan-600 text-white text-[11px] font-black shadow-md">
              실측 390g 초경량
            </div>
          </div>

          {/* 핵심 스펙 요약 & 구매 버튼 */}
          <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> 실시간 제휴 특가
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  {item.price}
                </span>
                {item.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {item.originalPrice}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                알리익스프레스 초이스 / 무료 배송 지원 (쿠폰 적용 시 변동 가능)
              </p>
            </div>

            {/* 4대 핵심 포인트 뱃지 */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">모터 속도</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">110,000 RPM</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-2">
                <Weight className="w-4 h-4 text-cyan-500 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">본체 무게</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">실측 390g</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-2">
                <Plug className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">전원 규격</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">220V EU플러그</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-violet-500 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">작동 소음</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">약 59 dB</span>
                </div>
              </div>
            </div>

            {/* 바로가기 버튼 */}
            <a
              href={item.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>알리익스프레스 공식 최저가 보러가기</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* 2. 에디터 3줄 핵심 요약 */}
        <section className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50/70 to-blue-50/40 dark:from-cyan-950/30 dark:to-slate-900/40 border border-cyan-200/80 dark:border-cyan-800/40 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base mb-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <span>에디터 3줄 핵심 요약</span>
          </div>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {item.summary.map((line, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-cyan-500 font-black text-base leading-none">•</span>
                <span className="leading-relaxed">{cleanText(line)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 3. 정밀 기술 스펙 시트 (Spec Sheet) */}
        <section className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-500" />
              <span>판매 페이지 실측 스펙 비교표</span>
            </h3>
            <span className="text-xs text-slate-400">제조사 공식 등록 사양 기준</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs sm:text-sm">
            {item.specs.map((sp, idx) => (
              <div 
                key={idx} 
                className={`flex items-center justify-between p-2.5 rounded-lg border ${
                  sp.highlight 
                    ? 'bg-cyan-50/60 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/60' 
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800/60'
                }`}
              >
                <span className="text-slate-500 dark:text-slate-400 font-medium">{sp.label}</span>
                <span className={`font-bold ${sp.highlight ? 'text-cyan-700 dark:text-cyan-300' : 'text-slate-800 dark:text-slate-200'}`}>
                  {cleanText(sp.value)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 제품 실사 포토 갤러리 (로컬 고화질 이미지 6종) */}
        {item.galleryImages && item.galleryImages.length > 0 && (
          <section className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-amber-500" />
                <span>제품 구조 및 기능 실사 갤러리 ({item.galleryImages.length})</span>
              </h3>
              <span className="text-xs text-slate-400">고화질 원본 검증</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {item.galleryImages.map((img, i) => (
                <div key={i} className="group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex flex-col shadow-xs">
                  <div className="aspect-[4/3] overflow-hidden bg-slate-900 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={img.url} 
                      alt={img.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 text-xs text-slate-600 dark:text-slate-300 leading-snug">
                    <span className="font-bold text-cyan-600 dark:text-cyan-400 mr-1.5">#{i + 1}</span>
                    {cleanText(img.caption)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. 플러그 옵션 주의 가이드 배너 */}
        <section className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-500/50 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-1">
            <div className="font-black text-base text-amber-800 dark:text-amber-300">
              구매 전 필수 확인: 반드시 [EU Plug (220V)] 옵션을 선택하세요!
            </div>
            <p className="leading-relaxed">
              도코 헤어드라이어의 <strong>EU 플러그 규격은 220V~240V (50/60Hz, 1600W)</strong>로 설계되어 있어, 별도의 돼지코 변환기 없이 한국 가정용 콘센트에 바로 꽂아 사용하실 수 있습니다. 
              함께 판매되는 <strong>US Plug(110V 전용)</strong>를 선택하실 경우 국내에서 제 성능이 나오지 않으니 주문 시 옵션을 꼭 확인하시기 바랍니다.
            </p>
          </div>
        </section>

        {/* 6. 장점 & 구매 전 체크포인트 (Pros & Cons) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
            <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-3">
              <Check className="w-4 h-4" />
              <span>주요 특장점 및 장점</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {item.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{cleanText(pro)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40">
            <h3 className="text-sm font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5 mb-3">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>아쉬운 점 &amp; 사전 체크포인트</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {item.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">!</span>
                  <span>{cleanText(con)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. 이런 분께 추천합니다 */}
        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-cyan-500" />
            <span>이런 분께 추천합니다</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {item.recommendFor.map((rec, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs sm:text-sm text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>{cleanText(rec)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 8. 본문 상세 리뷰 - PC-Craft 클리어타입 템플릿 */}
        <article className="space-y-6 pt-4 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
          {paragraphs.map((p, i) => {
            const trimmed = cleanText(p);

            // 대제목 (## )
            if (p.trim().startsWith('## ')) {
              const headingText = cleanText(p.trim().replace('## ', ''));
              return (
                <div key={i} className="pt-6 pb-2 border-b-2 border-cyan-500/30 flex items-center gap-2.5">
                  <span className="w-2.5 h-6 rounded-full bg-cyan-500 inline-block" />
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {headingText}
                  </h2>
                </div>
              );
            }

            // 서브섹션 제목 (### ① ...)
            if (p.trim().startsWith('### ')) {
              const subText = cleanText(p.trim().replace('### ', ''));
              return (
                <div key={i} className="pt-4">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2 p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>{subText}</span>
                  </h3>
                </div>
              );
            }

            // 구분선
            if (p.trim().startsWith('---')) {
              return <hr key={i} className="my-6 border-slate-200 dark:border-slate-800" />;
            }

            // 불릿 리스트 (- 로 시작하는 여러 줄)
            if (trimmed.includes('\n- ') || trimmed.startsWith('- ')) {
              const items = trimmed.split('\n- ').map((s) => s.replace(/^- /, '').trim()).filter(Boolean);
              return (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
                  {items.map((it, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs sm:text-sm flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <span className="text-cyan-500 font-bold mt-0.5">•</span>
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              );
            }

            // 번호 매김 리스트 (1. 2. 3.)
            if (/^\d+\.\s/.test(trimmed)) {
              const lines = trimmed.split(/\n(?=\d+\.\s)/);
              return (
                <div key={i} className="space-y-3 my-4">
                  {lines.map((line, idx) => {
                    const match = line.match(/^(\d+)\.\s*(.*)$/);
                    const num = match ? match[1] : `${idx + 1}`;
                    const content = match ? match[2] : line;
                    return (
                      <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-cyan-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                          {num}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {content}
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            }

            // 일반 본문 문단 (클리어타입 스타일)
            return (
              <p key={i} className="leading-relaxed text-slate-700 dark:text-slate-300 font-normal">
                {trimmed}
              </p>
            );
          })}
        </article>

        {/* 9. 하단 최종 CTA 배너 */}
        <section className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 text-white shadow-2xl text-center space-y-4 border border-cyan-500/30">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 inline-block">
            {item.categoryLabel}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {cleanText(item.title)}
          </h3>
          <p className="text-xs sm:text-sm text-cyan-200 max-w-xl mx-auto">
            110,000RPM 고속 BLDC 모터 · 실측 390g 초경량 · 220V EU플러그 완벽 호환! 지금 공식 제휴 링크에서 특가 혜택을 확인해 보세요.
          </p>

          <div className="pt-2">
            <a
              href={item.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base shadow-xl transition-all active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>알리익스프레스 공식 최저가 바로가기 ({item.price})</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[11px] text-slate-400 pt-3">
            ※ 이 글에는 제휴 링크가 포함되어 있으며, 링크를 통한 구매 시 작성자에게 수수료가 지급될 수 있습니다.
          </p>
        </section>

        {/* 목록으로 복귀 버튼 */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <Link
            href="/picks"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-cyan-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>테크&amp;라이프 픽 목록으로</span>
          </Link>
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-cyan-600 font-semibold"
          >
            맞춤 견적기 바로가기 →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
