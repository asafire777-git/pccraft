import React from 'react';
import { 
  OFFICIAL_COMPONENTS_LINK, 
  OFFICIAL_PREBUILT_LINK,
  OFFICIAL_HARDWARE_FESTA_LINK,
  OFFICIAL_MONITOR_LINK
} from '@/lib/affiliate';
import { Sparkles, ExternalLink, Zap, ShieldCheck } from 'lucide-react';

interface AdBannerProps {
  slotId?: string;
  format?: 'horizontal' | 'in-feed' | 'rectangle';
  theme?: 'hardware' | 'prebuilt' | 'monitor';
  className?: string;
  /** 향후 애드센스 승인 완료 시 true로 변경하면 애드센스 스크립트 모드로 전환 */
  useAdSense?: boolean;
}

export default function AdBanner({ 
  slotId = 'default-slot', 
  format = 'in-feed',
  theme = 'hardware',
  className = '',
  useAdSense = false
}: AdBannerProps) {
  // 애드센스 승인 전/대기 중에는 수익을 극대화하는 쿠팡 공식 기획전 배너 자동 노출
  if (!useAdSense) {
    const bannerConfig = {
      hardware: {
        title: '2026 PC 하드웨어 & 조립 부품 로켓 슈퍼 페스타',
        subtitle: 'CPU · RTX 40 그래픽카드 · 고속 NVMe SSD 실시간 최저가 & 카드사 즉시할인',
        tag: '🚀 쿠팡 로켓배송 특가전',
        badge: '최대 20% 카드할인',
        link: OFFICIAL_HARDWARE_FESTA_LINK,
        imgSrc: '/banners/banner-infeed-wide.svg',
        imgAlt: '쿠팡 PC 하드웨어 페스타 기획전'
      },
      prebuilt: {
        title: '2026 게이밍 조립 PC & 인기 완본체 특별 기획전',
        subtitle: '롤·발로란트·배그 완벽 방어 완제PC, 윈도우 정품 탑재 + 1년 무상 A/S 보증',
        tag: '⚡ 완본체 브랜드전',
        badge: '로켓와우 특별할인',
        link: OFFICIAL_PREBUILT_LINK,
        imgSrc: '/banners/banner-prebuilt.svg',
        imgAlt: '게이밍 조립 PC 완본체 기획전'
      },
      monitor: {
        title: 'QHD 144Hz~240Hz 고주사율 게이밍 모니터 대전',
        subtitle: 'LG 울트라기어 & 삼성 오디세이 게이밍 모니터 불량화소 100% 무결점 보증',
        tag: '🖥️ 게이밍 디스플레이전',
        badge: '로켓배송 무료설치',
        link: OFFICIAL_MONITOR_LINK,
        imgSrc: '/banners/banner-monitor.svg',
        imgAlt: '게이밍 모니터 특별 기획전'
      }
    };

    const currentConfig = bannerConfig[theme] || bannerConfig.hardware;

    return (
      <aside 
        aria-label="쿠팡 기획전 스폰서 배너" 
        className={`my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900 transition-all ${className}`}
      >
        {/* 상단 라벨 & 공정위 문구 */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium px-4 py-2 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-700 dark:text-slate-300">스폰서 링크 / PROMOTION</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{currentConfig.tag}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>쿠팡 파트너스 공식 제휴</span>
          </div>
        </div>

        {/* 메인 배너 콘텐츠 영역 */}
        <a 
          href={currentConfig.link}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="group block p-4 sm:p-6 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
          title={`${currentConfig.title} 보러가기`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            {/* 좌측: 타이틀 및 혜택 카피 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  {currentConfig.badge}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  오늘 주문 내일 도착
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {currentConfig.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {currentConfig.subtitle}
              </p>

              <div className="flex items-center gap-3 mt-3.5 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  ✓ 무료배송
                </span>
                <span className="flex items-center gap-1">
                  ✓ 카드 무이자 할부
                </span>
                <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                  ✓ 안심 로켓반품
                </span>
              </div>
            </div>

            {/* 우측: 배너사 스타일 이미지 & 직행 버튼 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
              <div className="w-full sm:w-[200px] md:w-[240px] h-[100px] sm:h-[90px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-sm relative group-hover:scale-102 transition-transform duration-300">
                <img 
                  src={currentConfig.imgSrc} 
                  alt={currentConfig.imgAlt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/30 transition-all shrink-0">
                <span>특가 보러가기</span>
                <ExternalLink className="w-4 h-4" />
              </span>
            </div>
          </div>
        </a>

        {/* 법적 고지 캡션 */}
        <div className="px-4 py-1.5 bg-slate-50/60 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
          <span>* 본 배너는 쿠팡 파트너스 활동의 일환으로 일정액의 수수료를 제공받습니다.</span>
          <span className="font-mono text-[9px] text-slate-400/80">Slot #{slotId}</span>
        </div>
      </aside>
    );
  }

  // 애드센스 활성화 모드
  return (
    <aside aria-label="광고 영역" className={`my-8 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 text-center transition-colors ${className}`}>
      <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 uppercase font-mono mb-2 px-1">
        <span>스폰서 링크 / ADVERTISEMENT</span>
        <span>Google AdSense Slot #{slotId}</span>
      </div>
      <div className="min-h-[90px] flex flex-col items-center justify-center rounded-lg bg-white dark:bg-slate-950/60 p-4 border border-slate-200 dark:border-slate-800/60 shadow-sm">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-pccraft"
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
