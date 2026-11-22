/**
 * PC-Craft 다나와 pcode 기반 정밀 시세 자동 동기화 엔진 (Option A: Zero Server Load)
 *
 * 주요 기능:
 * 1. lib/affiliate.ts의 CUSTOM_DANAWA_PCODES & DANAWA_PCODE_MULTIPLIERS를 단일 진실 원천(SSOT)으로 자동 로드
 * 2. 다나와 버튼과 100% 동일한 상품 상세 페이지(prod.danawa.com/info/?pcode=...)에서 오픈마켓 최저가를 1원 단위까지 정확히 추출
 * 3. 듀얼 채널 RAM(16GBx2, 8GBx2)은 단품 최저가 x 수량 배수(2)로 정확히 합산
 * 4. pcode가 없는 보조 부품은 search.danawa.com + 유효성 범위 필터(SANITY_BOUNDS)로 안전 조회
 * 5. 실제 가격 변동이 발생한 경우에만 data/live-prices.json을 덮어쓰기 (불필요한 커밋/데이터 찌꺼기 원천 방지)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const livePricesPath = path.join(rootDir, 'data', 'live-prices.json');
const affiliatePath = path.join(rootDir, 'lib', 'affiliate.ts');

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

function roundToThousand(num) {
  return Math.round(num / 1000) * 1000;
}

// lib/affiliate.ts에서 CUSTOM_DANAWA_PCODES 및 DANAWA_PCODE_MULTIPLIERS 자동 파싱
function loadDanawaPcodeConfig() {
  const code = fs.readFileSync(affiliatePath, 'utf8');
  const pcodes = {};
  const multipliers = {};

  const pcodeBlock = code.match(/export const CUSTOM_DANAWA_PCODES[\s\S]*?=\s*\{([\s\S]*?)\};/);
  if (pcodeBlock) {
    for (const m of pcodeBlock[1].matchAll(/'([^']+)'\s*:\s*'([0-9]+)'/g)) {
      pcodes[m[1]] = m[2];
    }
  }

  const multBlock = code.match(/export const DANAWA_PCODE_MULTIPLIERS[\s\S]*?=\s*\{([\s\S]*?)\};/);
  if (multBlock) {
    for (const m of multBlock[1].matchAll(/'([^']+)'\s*:\s*([0-9]+)/g)) {
      multipliers[m[1]] = parseInt(m[2], 10);
    }
  }

  return { pcodes, multipliers };
}

// pcode가 없는 나머지 핵심 부품용 검색 기반 보조 필터
const SANITY_BOUNDS = {
  'ram-ddr4-32gb': { min: 320000, max: 460000, query: '삼성전자 DDR4-3200 32GB' },
  'ram-ddr5-hynix-32gb': { min: 680000, max: 910000, query: 'SK하이닉스 DDR5-5600 32GB' },
  'ram-ddr5-tcreate-6000': { min: 680000, max: 920000, query: 'TeamGroup T-CREATE DDR5-6000 CL30 32GB' },
  'ram-ddr5-64gb': { min: 1200000, max: 1700000, query: '삼성전자 DDR5-5600 64GB' },
  'ram-ddr5-klevv-16gb': { min: 270000, max: 390000, query: '에센코어 KLEVV DDR5-5600 16GB' },
  'ram-ddr5-gskill-32gb': { min: 690000, max: 920000, query: 'G.SKILL DDR5-6000 CL30 RIPJAWS 32GB' },
  'cpu-amd-5600g': { min: 135000, max: 175000, query: 'AMD 라이젠5 5600G 멀티팩' },
  'cpu-amd-7700': { min: 310000, max: 390000, query: 'AMD 라이젠7 7700 멀티팩' },
  'cpu-amd-9800x3d': { min: 650000, max: 820000, query: 'AMD 라이젠7 9800X3D' },
  'cpu-intel-12100f': { min: 85000, max: 125000, query: '인텔 코어 i3-12100F' },
  'cpu-intel-13400f': { min: 170000, max: 220000, query: '인텔 코어 i5-13400F' },
  'cpu-intel-14600kf': { min: 300000, max: 410000, query: '인텔 코어 i5-14600KF' },
  'cpu-intel-14700k': { min: 480000, max: 610000, query: '인텔 코어 i7-14700K' },
  'gpu-gtx-1650': { min: 85000, max: 140000, query: '지포스 GTX 1650' },
  'gpu-rx-6600': { min: 235000, max: 310000, query: '라데온 RX 6600' },
  'gpu-rtx-4060': { min: 380000, max: 550000, query: 'RTX 4060 8GB' },
  'gpu-rtx-4070super': { min: 820000, max: 1050000, query: '지포스 RTX 4070 SUPER' },
  'gpu-rtx-4070tisuper': { min: 1100000, max: 1450000, query: 'RTX 4070 Ti SUPER 16GB' },
  'gpu-rtx-4080super': { min: 1400000, max: 1850000, query: 'RTX 4080 SUPER 16GB' },
  'gpu-rtx-5070-emtek': { min: 920000, max: 1250000, query: '지포스 RTX 5070' },
  'gpu-rtx-5080': { min: 1700000, max: 2300000, query: '지포스 RTX 5080' },
  'ssd-samsung-990pro-1tb': { min: 300000, max: 480000, query: '삼성전자 990 PRO 1TB' },
  'power-850w-gold': { min: 165000, max: 235000, query: '시소닉 FOCUS GX-850' },
  'cooler-liquid-360': { min: 75000, max: 115000, query: 'darkFlash DX-360 수랭쿨러' }
};

const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept-Language': 'ko-KR,ko;q=0.9',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Referer': 'https://search.danawa.com/'
};

// 1순위: 다나와 상품 상세 페이지(pcode)에서 정확한 오픈마켓 최저가 추출 (1원 단위)
async function fetchDanawaPriceByPcode(pcode) {
  try {
    const url = `https://prod.danawa.com/info/?pcode=${pcode}`;
    const res = await fetch(url, { headers: FETCH_HEADERS, redirect: 'follow' });
    if (!res.ok) return null;
    const html = await res.text();

    // 1) 다나와 공식 대표 최저가 JSON 필드 (lowestPrice / minPrice)
    const jsonMatch = html.match(/["\\]*lowestPrice["\\]*:\s*([0-9]+)/) || html.match(/["\\]*minPrice["\\]*:\s*([0-9]+)/);
    if (jsonMatch) {
      const val = parseInt(jsonMatch[1], 10);
      if (!isNaN(val) && val >= 5000 && val <= 10000000) return val;
    }

    // 2) 몰 리스트 중 isLowest:true 항목
    const isLowestMatch = html.match(/\\?"isLowest\\?":true[^}]*\\?"price\\?":\\?"([0-9,]+)\\?"/);
    if (isLowestMatch) {
      const val = parseInt(isLowestMatch[1].replace(/,/g, ''), 10);
      if (!isNaN(val) && val >= 5000 && val <= 10000000) return val;
    }

    // 3) JSON-LD Offer lowPrice
    const ldMatch = html.match(/"lowPrice"\s*:\s*"?([0-9]+)"?/);
    if (ldMatch) {
      const val = parseInt(ldMatch[1], 10);
      if (!isNaN(val) && val >= 5000 && val <= 10000000) return val;
    }

    return null;
  } catch {
    return null;
  }
}

// 2순위: pcode가 없는 부품용 검색 페이지 보조 조회
async function fetchDanawaPriceBySearch(keyword, bounds) {
  try {
    const url = `https://search.danawa.com/?query=${encodeURIComponent(keyword)}`;
    const res = await fetch(url, { headers: FETCH_HEADERS, redirect: 'follow' });
    if (!res.ok) return null;
    const html = await res.text();

    const matches = [...html.matchAll(/<span class="text-px16">([0-9,]+)원<\/span>|class="prc_c"[^>]*>([0-9,]+)<\/em>/g)];
    const prices = matches.map(m => parseInt((m[1] || m[2]).replace(/,/g, ''), 10)).filter(p => !isNaN(p));
    if (prices.length === 0) return null;

    if (bounds) {
      const validPrices = prices.filter(p => p >= bounds.min && p <= bounds.max);
      if (validPrices.length > 0) {
        return roundToThousand(Math.min(...validPrices));
      }
    }
    return null;
  } catch {
    return null;
  }
}

async function runSync() {
  console.log('🔄 PC-Craft 다나와 pcode 기반 정밀 시세 동기화 엔진 시작...');
  const timestamp = getKSTTimestamp();

  if (!fs.existsSync(livePricesPath)) {
    console.error('❌ data/live-prices.json 파일을 찾을 수 없습니다.');
    process.exit(1);
  }

  const liveData = JSON.parse(fs.readFileSync(livePricesPath, 'utf8'));
  const currentPrices = liveData.prices || {};
  const { pcodes, multipliers } = loadDanawaPcodeConfig();

  // pcode 중복 호출 방지를 위한 인메모리 캐시 (1회 실행 동안만 유지, 디스크 찌꺼기 없음)
  const pcodePriceCache = new Map();

  let pcodeSuccess = 0;
  let searchSuccess = 0;
  let updatedCount = 0;
  let steadyCount = 0;
  let failCount = 0;

  // 1단계: pcode가 등록된 모든 부품 정밀 동기화 (다나와 버튼과 100% 동일 페이지 기준)
  const pcodeIds = Object.keys(pcodes);
  console.log(`📡 [1단계] 다나와 고유 pcode 직조회 대상: ${pcodeIds.length}개 부품`);

  for (const id of pcodeIds) {
    if (!currentPrices[id]) continue;
    const pcode = pcodes[id];
    const mult = multipliers[id] || 1;

    let unitPrice;
    if (pcodePriceCache.has(pcode)) {
      unitPrice = pcodePriceCache.get(pcode);
    } else {
      unitPrice = await fetchDanawaPriceByPcode(pcode);
      pcodePriceCache.set(pcode, unitPrice);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    if (unitPrice) {
      const finalPrice = unitPrice * mult;
      const prevPrice = currentPrices[id].price;
      const priceChange = finalPrice - prevPrice;

      if (priceChange !== 0) {
        currentPrices[id] = {
          price: finalPrice,
          prevPrice,
          priceChange,
          inStock: true,
          lastUpdated: timestamp
        };
        console.log(`  [pcode 변동] ${id} (pcode=${pcode}${mult > 1 ? ` x${mult}` : ''}): ${prevPrice.toLocaleString()}원 -> ${finalPrice.toLocaleString()}원 (${priceChange > 0 ? '+' : ''}${priceChange.toLocaleString()}원)`);
        updatedCount++;
      } else {
        steadyCount++;
      }
      pcodeSuccess++;
    } else {
      console.warn(`  [pcode 보류] ${id} (pcode=${pcode}): 응답 없음 -> 기존 시세(${currentPrices[id].price.toLocaleString()}원) 안전 유지`);
      failCount++;
    }
  }

  // 2단계: pcode가 없는 보조 부품 검색 기반 동기화
  const searchIds = Object.keys(SANITY_BOUNDS).filter(id => !pcodes[id]);
  console.log(`📡 [2단계] 검색 기반 보조 조회 대상: ${searchIds.length}개 부품`);

  for (const id of searchIds) {
    if (!currentPrices[id]) continue;
    const config = SANITY_BOUNDS[id];
    const livePrice = await fetchDanawaPriceBySearch(config.query, config);

    if (livePrice) {
      const prevPrice = currentPrices[id].price;
      const priceChange = livePrice - prevPrice;

      if (priceChange !== 0) {
        currentPrices[id] = {
          price: livePrice,
          prevPrice,
          priceChange,
          inStock: true,
          lastUpdated: timestamp
        };
        console.log(`  [검색 변동] ${id}: ${prevPrice.toLocaleString()}원 -> ${livePrice.toLocaleString()}원 (${priceChange > 0 ? '+' : ''}${priceChange.toLocaleString()}원)`);
        updatedCount++;
      } else {
        steadyCount++;
      }
      searchSuccess++;
    }

    await new Promise(resolve => setTimeout(resolve, 300));
  }

  // 실제 가격 변동이 1건 이상 있을 때만 파일 갱신 (불필요한 빈 커밋/재배포 방지)
  if (updatedCount > 0) {
    liveData.lastSyncedAt = timestamp;
    liveData.prices = currentPrices;
    fs.writeFileSync(livePricesPath, JSON.stringify(liveData, null, 2) + '\n', 'utf8');
    console.log(`\n✅ [${timestamp}] data/live-prices.json 갱신 완료!`);
  } else {
    console.log(`\nℹ️ [${timestamp}] 변동된 부품이 없어 파일을 그대로 유지합니다 (불필요한 커밋 생략).`);
  }

  console.log(`   - pcode 1:1 정밀 검수: ${pcodeSuccess}개 성공 / ${failCount}개 보류`);
  console.log(`   - 검색 보조 검수: ${searchSuccess}개 성공`);
  console.log(`   - 시세 변동 반영: ${updatedCount}개 / 변동 없음: ${steadyCount}개`);
}

runSync().catch(err => {
  console.error('❌ 동기화 엔진 에러:', err);
  process.exit(1);
});
