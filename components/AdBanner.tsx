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
        imgSrc: '/banners/banner-infeed-wide.jpg',
        imgAlt: '쿠팡 PC 하드웨어 페스타 기획전'
      },
      prebuilt: {
        title: '2026 게이밍 조립 PC & 인기 완본체 특별 기획전',
        subtitle: '롤·발로란트·배그 완벽 방어 완제PC, 윈도우 정품 탑재 + 1년 무상 A/S 보증',
        tag: '⚡ 완본체 브랜드전',
        badge: '로켓와우 특별할인',
        link: OFFICIAL_PREBUILT_LINK,
        imgSrc: '/banners/banner-prebuilt.jpg',
        imgAlt: '게이밍 조립 PC 완본체 기획전'
      },
      monitor: {
        title: 'QHD 144Hz~240Hz 고주사율 게이밍 모니터 대전',
        subtitle: 'LG 울트라기어 & 삼성 오디세이 게이밍 모니터 불량화소 100% 무결점 보증',
        tag: '🖥️ 게이밍 디스플레이전',
        badge: '로켓배송 무료설치',
        link: OFFICIAL_MONITOR_LINK,
        imgSrc: '/banners/banner-monitor.jpg',
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
          className="group block p-5 sm:p-7 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
          title={`${currentConfig.title} 보러가기`}
        >
          {/* 상단 뱃지 & 타이틀 */}
          <div className="flex items-center gap-2 mb-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
              {currentConfig.badge}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              오늘 주문 내일 도착
            </span>
          </div>

          <h4 className="text-lg sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors tracking-tight leading-snug">
            {currentConfig.title}
          </h4>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-medium">
            {currentConfig.subtitle}
          </p>

          {/* 큼직하고 시원한 파노라마 기획전 비주얼 (글자 잘림 없이 시원하게 표시) */}
          <div className="w-full h-[150px] sm:h-[180px] md:h-[220px] rounded-2xl overflow-hidden my-4 sm:my-5 border border-slate-200/90 dark:border-slate-800 bg-slate-950 shadow-md relative group-hover:scale-[1.01] transition-transform duration-500">
            <img 
              src={currentConfig.imgSrc} 
              alt={currentConfig.imgAlt}
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700/80 text-xs font-bold text-white shadow-md flex items-center gap-1.5">
              <span>{currentConfig.tag}</span>
            </div>
            <div className="absolute top-3 right-3 bg-rose-600 px-3 py-1 rounded-lg text-xs font-black text-white shadow-md">
              {currentConfig.badge}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
              <span className="text-xs font-black text-white flex items-center gap-1.5">
                <span>쿠팡 파트너스 공식 특가 바로가기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 하단 혜택 체크리스트 & 큼직한 CTA 버튼 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold flex-wrap">
              <span className="flex items-center gap-1">
                ✓ 무료배송
              </span>
              <span className="flex items-center gap-1">
                ✓ 카드 무이자 할부
              </span>
              <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                ✓ 안심 로켓반품
              </span>
            </div>

            <span className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/35 transition-all shrink-0">
              <span>🚀 기획전 특가 보러가기</span>
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </div>
        </a>

        {/* 법적 고지 캡션 */}
        <div className="px-5 py-2 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>* 본 배너는 쿠팡 파트너스 활동의 일환으로 일정액의 수수료를 제공받습니다.</span>
          <span className="font-mono text-[10px] text-slate-400/80">Slot #{slotId}</span>
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
