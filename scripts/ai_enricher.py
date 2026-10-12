"""
AI 상품 인리치먼트(Enrichment) 파이프라인
- 수집된 원시 상품 데이터를 바탕으로 LLM을 호출하여:
  1) 독자적인 3줄 핵심 요약
  2) 추천 대상 페르소나 (PROS)
  3) 비추천 대상 및 주의점 (CONS)
  4) 하드웨어 호환성 메타데이터 추출
  -> 검색엔진(구글/네이버) Thin Content 패널티를 원천 차단
"""

import json
import os

SAMPLE_RAW_PRODUCT = {
    "productName": "이엠텍 지포스 RTX 4060 MIRACLE WHITE D6 8GB",
    "originalPrice": 445000,
    "specsRaw": "RTX 4060 / 8GB / GDDR6 / 권장파워 500W / 2팬 / 화이트"
}

def generate_ai_enrichment_prompt(product_info: dict) -> str:
    return f"""
다음 컴퓨터 부품의 정보를 바탕으로, 검색엔진 최적화(SEO)와 쇼핑몰 사용자를 위한 독창적인 큐레이션 데이터를 JSON 포맷으로 생성해주세요.
단순 복사 설명문이 아닌, 하드웨어 전문가의 시선에서 객관적인 분석을 작성해야 합니다.

[상품명]: {product_info.get('productName')}
[가격]: {product_info.get('originalPrice')}원
[스펙]: {product_info.get('specsRaw')}

응답 JSON 스키마:
{{
  "curatorComment": "에디터 한줄평",
  "recommendedFor": ["추천 대상 1", "추천 대상 2"],
  "notRecommendedFor": ["비추천 대상 1"],
  "targetResolution": "FHD / QHD / 4K 중 택1",
  "bottleneckCheck": "어떤 CPU와 병목 없이 어울리는지 가이드"
}}
"""

if __name__ == "__main__":
    print("=== AI 저품질 방지 인리치먼트 파이프라인 준비 완료 ===")
    prompt = generate_ai_enrichment_prompt(SAMPLE_RAW_PRODUCT)
    print("생성된 프롬프트 템플릿:")
    print(prompt)
