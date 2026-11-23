import React from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle2, HelpCircle, ShieldCheck, ArrowRight } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: '조립 PC와 브랜드 완본체(완제 PC) 중 어떤 것을 선택하는 것이 유리한가요?',
    a: '부품별 개별 최저가를 직접 조합하면 동일 성능 대비 메인보드 전원부, 파워서플라이 등급, 쿨러 정숙성을 원하는 수준으로 맞출 수 있습니다. 반면 조립 경험이 없거나 초기 불량 대응 및 출장 A/S 편의성이 중요하다면, 정품 부품 모델명이 투명하게 공개된 완본체 구성을 선택하는 편이 안전합니다.'
  },
  {
    q: 'CPU와 메인보드 호환성은 무엇을 가장 먼저 확인해야 하나요?',
    a: '가장 먼저 CPU 소켓(AMD AM5, AMD AM4, 인텔 LGA1700, LGA1851)이 메인보드와 일치하는지 확인해야 합니다. 그다음 메모리 규격(DDR4 vs DDR5)을 맞추고, 65W급 보급형 CPU를 넘어 120W 이상 고성능 CPU를 선택할 경우 메인보드 전원부(VRM) 페이즈와 방열판 유무를 반드시 점검해야 쓰로틀링 없이 제 성능을 낼 수 있습니다.'
  },
  {
    q: '파워서플라이 용량은 어떤 기준으로 계산하는 것이 안전한가요?',
    a: 'CPU와 그래픽카드의 최대 소비전력(TDP) 합산값에 시스템 기본 전력(메인보드·메모리·SSD·팬 약 80~100W)을 더한 뒤, 효율과 피크 전류 여유를 고려해 최소 1.4~1.5배 이상의 정격 용량을 선택하는 것이 표준입니다. 최신 지포스 RTX 50 시리즈를 사용한다면 ATX 3.0 또는 ATX 3.1 규격 지원 여부를 함께 확인하는 것이 좋습니다.'
  },
  {
    q: '2026년 기준 게이밍 PC 메모리 용량은 16GB와 32GB 중 무엇이 적당한가요?',
    a: '리그오브레전드, 발로란트 등 가벼운 온라인 게임과 웹서핑 위주라면 16GB로도 충분합니다. 다만 배틀그라운드, 로스트아크, 최신 스팀 AAA 게임과 함께 디스코드·유튜브·브라우저 탭을 동시에 띄우는 환경이라면 32GB(16GB×2 듀얼 채널) 구성이 프레임 드랍과 스터터링을 확실히 줄여줍니다.'
  },
  {
    q: 'CPU 멀티팩(밸류팩)과 정품 박스의 차이는 무엇인가요?',
    a: 'AMD 멀티팩과 인텔 밸류팩은 대량 유통용 간소화 패키지로 공급되는 공식 유통사 정품입니다. 일반 리테일 박스와 CPU 본체 성능은 100% 동일하며, 국내 공식 유통사를 통해 동일한 3년 무상 A/S를 받을 수 있어 가성비 조립 견적에서 가장 널리 선택됩니다.'
  },
  {
    q: '다나와 최저가와 실제 오픈마켓 결제 금액에 차이가 나는 이유는 무엇인가요?',
    a: '다나와 표기 최저가는 쇼핑몰별 개별 배송비(부품당 2,500~4,000원)가 제외된 단품 기준가입니다. 부품 8종을 서로 다른 최저가 몰에서 개별 구매하면 배송비가 중복 발생하므로, 최종 결제 전 배송비 합산액과 카드사 즉시할인·무이자 할부 혜택을 함께 비교하는 것이 가장 합리적입니다.'
  }
];

export default function HomeBuyingGuideFaq() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  return (
    <section className="mt-12 space-y-8" aria-label="조립 PC 구매 가이드 및 자주 묻는 질문">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1. 핵심 구매 기준 및 예산 배분 가이드 */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              PC-Craft Editorial Guide
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              실패 없는 2026 조립 PC 부품 선택 4대 핵심 기준
            </h2>
          </div>
          <Link
            href="/lab"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-400 hover:underline shrink-0"
          >
            <span>하드웨어 랩 심층 리포트 전체 보기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <article className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/80 space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              1. 해상도와 주사율에 맞춘 GPU 우선 배분
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              게이밍 PC 성능의 60% 이상은 그래픽카드가 결정합니다. FHD(1920×1080) 환경에서는 메인스트림 GPU로도 충분한 프레임을 확보할 수 있지만, QHD(2560×1440) 144Hz 이상이나 4K 해상도에서는 VRAM 12GB~16GB 이상의 상위 GPU에 전체 예산의 35~45%를 우선 배분하는 것이 병목 없는 최적의 밸런스입니다.
            </p>
          </article>

          <article className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/80 space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              2. 메인보드 전원부와 확장성 검증
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              메인보드는 단순히 소켓만 맞는다고 끝이 아닙니다. Dr.MOS 전원부 구성, M.2 NVMe 슬롯 개수, 방열판 탑재 여부, Wi-Fi 및 블루투스 내장 여부를 사전에 확인해야 향후 CPU 업그레이드나 저장장치 추가 시 메인보드를 통째로 교체하는 이중 지출을 막을 수 있습니다.
            </p>
          </article>

          <article className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/80 space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              3. 케이스 물리적 간섭(GPU 길이 · 쿨러 높이) 체크
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              초보자가 가장 많이 겪는 조립 실수는 3팬 대형 그래픽카드나 360mm 수랭 라디에이터가 케이스 내부에 들어가지 않는 물리적 간섭입니다. 구매 전 케이스 상세 스펙의 그래픽카드 최대 장착 길이(mm)와 공랭 쿨러 최대 높이(보통 160mm 이상 권장)를 반드시 대조해야 합니다.
            </p>
          </article>

          <article className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/80 space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0" />
              4. 파워서플라이 안전 마진과 무상 보증 기간
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              파워서플라이는 시스템 전체 수명을 좌우하는 핵심 안전 부품입니다. 80PLUS 브론즈 이상 인증, 보호회로(OVP·UVP·OPP·SCP) 완비, 국내 유통사 무상 보증 6~10년 제품을 선택하고, 피크 부하에서도 안정적인 출력을 유지할 수 있도록 넉넉한 정격 용량을 확보하는 것이 좋습니다.
            </p>
          </article>
        </div>
      </div>

      {/* 2. 자주 묻는 질문 (FAQ) */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="mb-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            조립 PC 견적 &amp; 호환성 자주 묻는 질문 (FAQ)
          </h2>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="py-4 first:pt-0 last:pb-0">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1.5">
                Q{idx + 1}. {item.q}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
