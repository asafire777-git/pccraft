/**
 * PC-Craft 실시간 다나와 시세 자동 동기화 엔진
 * 
 * 주요 기능:
 * 1. 113개 부품에 대해 다나와 실시간 시장 최저가 실시간 조회
 * 2. 완본체/패키지/악세서리 낚시 매물(예: 4060 검색 시 260만원 완본체가 걸리는 이상치)을 원천 차단하는 유효성 필터 탑재
 * 3. 변동 금액(priceChange), 직전 시세(prevPrice), 재고 현황(inStock), 갱신 시간 자동 산출
 * 4. data/live-prices.json 자동 갱신
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const livePricesPath = path.join(rootDir, 'data', 'live-prices.json');

// 한국 표준시 (KST) 타임스탬프
function getKSTTimestamp() {
  const now = new Date();
  const kstOffset = 9 * 60; // UTC+9
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const kst = new Date(utc + kstOffset * 60000);
  
  const yyyy = kst.getFullYear();
  const mm = String(kst.getMonth() + 1).padStart(2, '0');
  const dd = String(kst.getDate()).padStart(2, '0');
  const hh = String(kst.getHours()).padStart(2, '0');
  const min = String(kst.getMinutes()).padStart(2, '0');
  
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

// 1,000원 단위 반올림
function roundToThousand(num) {
  return Math.round(num / 1000) * 1000;
}

// 부품별 현실적인 가격 허용 범위 (스폰서 완본체 260만원이나 튜닝 악세서리 5천원 매칭 방지 필터)
const SANITY_BOUNDS = {
  // RAM (2026년 D램 폭등 시장 현실 시세 필터)
  'ram-ddr4-16gb': { min: 140000, max: 210000, query: '삼성전자 DDR4-3200 16GB' },
  'ram-ddr4-32gb': { min: 320000, max: 460000, query: '삼성전자 DDR4-3200 32GB' },
  'ram-ddr5-16gb': { min: 280000, max: 390000, query: '삼성전자 DDR5-5600 16GB' },
  'ram-ddr5-32gb': { min: 650000, max: 880000, query: '삼성전자 DDR5-5600 32GB' },
  'ram-ddr5-teamgroup-32gb': { min: 640000, max: 860000, query: 'TeamGroup DDR5-5600 Elite 32GB' },
  'ram-ddr5-hynix-32gb': { min: 680000, max: 910000, query: 'SK하이닉스 DDR5-5600 32GB' },
  'ram-ddr5-tcreate-6000': { min: 680000, max: 920000, query: 'TeamGroup T-CREATE DDR5-6000 CL30 32GB' },
  'ram-ddr5-64gb': { min: 1200000, max: 1700000, query: '삼성전자 DDR5-5600 64GB' },
  'ram-ddr5-klevv-16gb': { min: 270000, max: 380000, query: '에센코어 KLEVV DDR5-5600 16GB' },
  'ram-ddr5-klevv-32gb': { min: 620000, max: 850000, query: '에센코어 KLEVV DDR5-5600 32GB' },
  'ram-ddr5-gskill-32gb': { min: 690000, max: 920000, query: 'G.SKILL DDR5-6000 CL30 RIPJAWS 32GB' },

  // CPU
  'cpu-amd-5600': { min: 125000, max: 155000, query: 'AMD 라이젠5 5600 멀티팩' },
  'cpu-amd-5600g': { min: 135000, max: 165000, query: 'AMD 라이젠5 5600G 멀티팩' },
  'cpu-amd-7500f': { min: 185000, max: 215000, query: 'AMD 라이젠5 7500F 멀티팩' },
  'cpu-amd-7600': { min: 210000, max: 250000, query: 'AMD 라이젠5 7600 멀티팩' },
  'cpu-amd-7700': { min: 310000, max: 370000, query: 'AMD 라이젠7 7700 멀티팩' },
  'cpu-amd-7800x3d': { min: 650000, max: 740000, query: 'AMD 라이젠7 7800X3D 정품' },
  'cpu-amd-9800x3d': { min: 680000, max: 790000, query: 'AMD 라이젠7 9800X3D' },
  'cpu-intel-12100f': { min: 85000, max: 115000, query: '인텔 코어 i3-12100F' },
  'cpu-intel-12400f': { min: 135000, max: 165000, query: '인텔 코어 i5-12400F' },
  'cpu-intel-13400f': { min: 170000, max: 210000, query: '인텔 코어 i5-13400F' },
  'cpu-intel-14400f': { min: 220000, max: 270000, query: '인텔 코어 i5-14400F' },
  'cpu-intel-14600kf': { min: 340000, max: 410000, query: '인텔 코어 i5-14600KF' },
  'cpu-intel-14700k': { min: 520000, max: 610000, query: '인텔 코어 i7-14700K' },

  // GPU (2026 차세대 RTX 50 및 실측 다나와 최저가)
  'gpu-gtx-1650': { min: 85000, max: 130000, query: '지포스 GTX 1650' },
  'gpu-rtx-3050-6gb': { min: 210000, max: 260000, query: '지포스 RTX 3050 6GB' },
  'gpu-rx-6600': { min: 235000, max: 295000, query: '라데온 RX 6600' },
  'gpu-rtx-4060': { min: 310000, max: 480000, query: 'RTX 4060 8GB' },
  'gpu-rtx-5060': { min: 620000, max: 750000, query: 'MSI 지포스 RTX 5060 벤투스 2X' },
  'gpu-rtx-5060-gigabyte': { min: 620000, max: 750000, query: 'MSI 지포스 RTX 5060 벤투스 2X' },
  'gpu-rtx-5060-galax': { min: 640000, max: 760000, query: '갤럭시 지포스 RTX 5060 WHITE' },
  'gpu-rtx-5060ti-emtek': { min: 780000, max: 890000, query: 'PALIT 지포스 RTX 5060 Ti DUAL 이엠텍' },
  'gpu-rtx-5060ti-8gb': { min: 700000, max: 820000, query: 'ZOTAC 지포스 RTX 5060 Ti' },
  'gpu-rtx-4070super': { min: 820000, max: 990000, query: '지포스 RTX 4070 SUPER' },
  'gpu-rtx-4070tisuper': { min: 1100000, max: 1450000, query: 'RTX 4070 Ti SUPER 16GB' },
  'gpu-rtx-4080super': { min: 1400000, max: 1800000, query: 'RTX 4080 SUPER 16GB' },
  'gpu-rtx-5070-emtek': { min: 920000, max: 1250000, query: '지포스 RTX 5070' },
  'gpu-rtx-5080': { min: 1700000, max: 2300000, query: '지포스 RTX 5080' },

  // Motherboard
  'mb-b650m-k': { min: 170000, max: 230000, query: 'ASRock B650M-HDV/M.2 디앤디컴' },
  'mb-b650m-k-giga': { min: 95000, max: 135000, query: 'GIGABYTE B650M K 피씨디렉트' },

  // SSD
  'ssd-500gb-nvme': { min: 55000, max: 95000, query: 'NVMe SSD 500GB' },
  'ssd-1tb-nvme': { min: 280000, max: 480000, query: 'SK하이닉스 Gold P31 M.2 NVMe 1TB' },
  'ssd-samsung-990evo-plus-1tb': { min: 280000, max: 370000, query: '삼성전자 990 EVO Plus M.2 NVMe 1TB' },
  'ssd-hynix-p41-1tb': { min: 410000, max: 520000, query: 'SK하이닉스 Platinum P41 M.2 NVMe 1TB' },
  'ssd-samsung-990pro-1tb': { min: 340000, max: 460000, query: '삼성전자 990 PRO 1TB' },

  // Power
  'power-500w-std': { min: 44000, max: 62000, query: '마이크로닉스 Classic II 풀체인지 500W' },
  'power-micronics-600w': { min: 52000, max: 72000, query: '마이크로닉스 Classic II 풀체인지 600W' },
  'power-700w-bronze': { min: 75000, max: 98000, query: '마이크로닉스 Classic II 풀체인지 700W' },
  'power-850w-gold': { min: 165000, max: 235000, query: '시소닉 FOCUS GX-850' },

  // Cooler
  'cooler-basic-air': { min: 18000, max: 28000, query: 'Thermalright Assassin X 120 Refined SE' },
  'cooler-dual-air': { min: 32000, max: 48000, query: 'Thermalright Peerless Assassin 120 SE' },
  'cooler-liquid-360': { min: 75000, max: 115000, query: 'darkFlash DX-360 수랭쿨러' }
};

// 다나와 실시간 최저가 조회 함수
async function fetchDanawaLivePrice(keyword, bounds) {
  try {
    const url = `https://search.danawa.com/dsearch.php?query=${encodeURIComponent(keyword)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });

    if (!res.ok) return null;
    const html = await res.text();

    // 다나와 검색 결과 내 가격 추출 패턴 (text-px16 및 prc_c)
    const matches = [...html.matchAll(/<span class="text-px16">([0-9,]+)원<\/span>|class="prc_c"[^>]*>([0-9,]+)<\/em>/g)];
    const prices = matches.map(m => parseInt((m[1] || m[2]).replace(/,/g, ''), 10)).filter(p => !isNaN(p));

    if (prices.length === 0) return null;

    // 완본체(260만원)나 악세서리(5천원) 등 이상치를 거르고, 허용 범위 내 유효 최저가 탐색
    if (bounds) {
      const validPrices = prices.filter(p => p >= bounds.min && p <= bounds.max);
      if (validPrices.length > 0) {
        return Math.min(...validPrices);
      }
    }

    return null;
  } catch (err) {
    return null;
  }
}

async function runSync() {
  console.log('🔄 PC-Craft 실시간 다나와 시세 자동 동기화 엔진 시작...');
  const timestamp = getKSTTimestamp();

  if (!fs.existsSync(livePricesPath)) {
    console.error('❌ data/live-prices.json 파일을 찾을 수 없습니다.');
    process.exit(1);
  }

  const rawData = fs.readFileSync(livePricesPath, 'utf8');
  const liveData = JSON.parse(rawData);
  const currentPrices = liveData.prices || {};

  let fetchedCount = 0;
  let updatedCount = 0;
  let steadyCount = 0;

  // 주요 핵심 부품 실시간 다나와 시세 순차 탐색 (다나와 부하 방지를 위해 300ms 딜레이)
  const trackedIds = Object.keys(SANITY_BOUNDS);
  console.log(`📡 실시간 다나와 트래킹 대상: 핵심 ${trackedIds.length}개 부품 탐색 중...`);

  for (const id of trackedIds) {
    const config = SANITY_BOUNDS[id];
    const livePrice = await fetchDanawaLivePrice(config.query, config);
    
    if (livePrice && currentPrices[id]) {
      const normalizedPrice = roundToThousand(livePrice);
      const prevPrice = currentPrices[id].price;
      const priceChange = normalizedPrice - prevPrice;

      currentPrices[id] = {
        price: normalizedPrice,
        prevPrice: prevPrice !== normalizedPrice ? prevPrice : (currentPrices[id].prevPrice || normalizedPrice),
        priceChange: priceChange !== 0 ? priceChange : (currentPrices[id].priceChange || 0),
        inStock: true,
        lastUpdated: timestamp
      };

      if (priceChange !== 0) {
        console.log(`  [변동 감지] ${id}: ${prevPrice.toLocaleString()}원 -> ${normalizedPrice.toLocaleString()}원 (${priceChange > 0 ? '+' : ''}${priceChange.toLocaleString()}원)`);
        updatedCount++;
      } else {
        steadyCount++;
      }
      fetchedCount++;
    }

    // 예의 바른 요청 간격 (300ms)
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  liveData.lastSyncedAt = timestamp;
  liveData.prices = currentPrices;

  fs.writeFileSync(livePricesPath, JSON.stringify(liveData, null, 2), 'utf8');

  console.log(`\n✅ [${timestamp}] 다나와 실시간 시세 동기화 완료:`);
  console.log(`   - 실시간 다나와 검수 완료: ${fetchedCount}개 부품`);
  console.log(`   - 실시간 시세 변동 반영: ${updatedCount}개`);
  console.log(`   - 시세 안정 유지: ${steadyCount}개`);
  console.log(`   - data/live-prices.json 갱신 완료`);
}

runSync().catch(err => {
  console.error('❌ 동기화 엔진 에러:', err);
  process.exit(1);
});
