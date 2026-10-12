import React from 'react';
import { 
  OFFICIAL_MONITOR_LINK, 
  OFFICIAL_GEAR_LINK, 
  OFFICIAL_PREBUILT_LINK 
} from '@/lib/affiliate';
import { Sparkles, ExternalLink, Zap, ShieldCheck, Monitor, Gamepad2, Cpu } from 'lucide-react';

interface ExhibitionItem {
  id: string;
  category: string;
  title: string;
  description: string;
  badge: string;
  benefits: string[];
  imgSrc: string;
  imgAlt: string;
  link: string;
  colorScheme: {
    border: string;
    badgeBg: string;
    btnBg: string;
  };
}

export default function CoupangExhibitionGrid() {
  const exhibitions: ExhibitionItem[] = [
    {
      id: 'ex-monitor',
      category: '게이밍 모니터 기획전',
      title: 'QHD 144Hz~240Hz 고주사율 모니터 대전',
      description: 'LG 울트라기어 & 삼성 오디세이 IPS 게이밍 모니터 1ms 무결점 보증 행사',
      badge: '최대 20% 카드할인',
      benefits: ['로켓배송 무료설치', 'IPS 광시야각 패널', '불량화소 100% 안심교환'],
      imgSrc: '/banners/banner-monitor.jpg',
      imgAlt: 'QHD 게이밍 모니터 특가 기획전',
      link: OFFICIAL_MONITOR_LINK,
      colorScheme: {
        border: 'hover:border-cyan-500/50',
        badgeBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
        btnBg: 'bg-cyan-600 hover:bg-cyan-500 text-white'
      }
    },
    {
      id: 'ex-gear',
      category: '게이밍 기어 페스타',
      title: '로지텍 G & 레이저 키보드·마우스 페스티벌',
      description: '프로게이머 실사용 초경량 무선 게이밍 마우스 & RGB 기계식 키보드 와우회원 핫딜',
      badge: '와우회원 특가할인',
      benefits: ['내일 아침 문 앞 도착', '초고속 무선 센서', '핫스왑 스위치 지원'],
      imgSrc: '/banners/banner-gear.jpg',
      imgAlt: '게이밍 기어 키보드 마우스 기획전',
      link: OFFICIAL_GEAR_LINK,
      colorScheme: {
        border: 'hover:border-amber-500/50',
        badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        btnBg: 'bg-amber-600 hover:bg-amber-500 text-white'
      }
    },
    {
      id: 'ex-prebuilt',
      category: '완본체 브랜드전',
      title: '가성비 데스크탑 & e스포츠 완제품 PC 기획전',
      description: '롤·발로란트·배그 완벽 방어 완본체, 윈도우 정품 탑재 + 1년 무상 A/S 보증',
      badge: '1년 무상출장 A/S',
      benefits: ['완제품 안심출고', '부품 호환성 100% 검증', '원클릭 간편구매'],
      imgSrc: '/banners/banner-prebuilt.jpg',
      imgAlt: '가성비 데스크탑 완제품 조립PC 기획전',
      link: OFFICIAL_PREBUILT_LINK,
      colorScheme: {
        border: 'hover:border-emerald-500/50',
        badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        btnBg: 'bg-emerald-600 hover:bg-emerald-500 text-white'
      }
    }
  ];

  return (
    <section className="my-10">
      {/* 헤더 타이틀 영역 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            쿠팡 파트너스 공식 테마 기획전
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            🔥 2026 하드웨어 &amp; 주변기기 특별전 핫딜
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            원하는 테마의 기획전 배너를 클릭하시면 카드사 즉시할인과 로켓배송 혜택을 바로 확인하실 수 있습니다.
          </p>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2 sm:mt-0 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>실시간 최저가 연동 기획전</span>
        </div>
      </div>

      {/* 3분할 기획전 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {exhibitions.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={`group flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-xl transition-all duration-300 ${item.colorScheme.border} cursor-pointer`}
            title={`${item.title} 바로가기`}
          >
            <div>
              {/* 카드 상단 배너 이미지 (16:10 비율, 넉넉하고 시원한 크기) */}
              <div className="w-full h-[170px] sm:h-[190px] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 relative mb-4 bg-slate-950 shadow-inner group-hover:scale-102 transition-transform duration-300">
                <img
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-white border border-slate-700/70 shadow-sm">
                  {item.category}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-black bg-rose-600 text-white shadow-md">
                  {item.badge}
                </div>
              </div>

              {/* 기획전 타이틀 (큼직하고 선명한 폰트) */}
              <h4 className="text-base sm:text-lg md:text-xl font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                {item.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {item.description}
              </p>

              {/* 주요 혜택 포인트 체크리스트 */}
              <ul className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {item.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-medium">
                    <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 카드 하단 CTA 버튼 */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                쿠팡 로켓배송 직행
              </span>
              <span
                className={`px-4 py-2 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-transform active:scale-95 ${item.colorScheme.btnBg}`}
              >
                <span>기획전 보기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* 하단 FTC 공정위 제휴 고지 */}
      <div className="mt-3 px-3 py-2 bg-slate-50/80 dark:bg-slate-900/40 rounded-xl border border-slate-200/60 dark:border-slate-800/60 text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-between">
        <span>* 본 배너 영역은 쿠팡 파트너스 활동의 일환으로 일정액의 수수료를 제공받을 수 있으며, 구매 가격에는 영향을 주지 않습니다.</span>
        <span className="font-mono text-[9px] text-slate-400/80">쿠팡 기획전 큐레이션</span>
      </div>
    </section>
  );
}
