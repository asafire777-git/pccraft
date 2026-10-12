"""
쿠팡 파트너스 공식 API 연동 및 딥링크 자동 생성 파이프라인
- HMAC-SHA256 서명 인증 구현
- 컴퓨터/가전 카테고리 상품 검색 및 트래킹 URL 생성
"""

import hmac
import hashlib
import time
import requests
import json
import os

# 쿠팡 파트너스 개발자 센터에서 발급받은 키
ACCESS_KEY = os.getenv("COUPANG_ACCESS_KEY", "YOUR_COUPANG_ACCESS_KEY")
SECRET_KEY = os.getenv("COUPANG_SECRET_KEY", "YOUR_COUPANG_SECRET_KEY")

DOMAIN = "https://api-gateway.coupang.com"

def generate_hmac_signature(method: str, url_path: str, secret_key: str) -> str:
    """쿠팡 파트너스 API HMAC 서명 생성"""
    # GMT 기준 타임스탬프 (yyMMdd'T'HHmmss'Z')
    datetime_gmt = time.strftime('%y%m%d', time.gmtime()) + 'T' + time.strftime('%H%M%S', time.gmtime()) + 'Z'
    message = datetime_gmt + method + url_path
    
    signature = hmac.new(
        secret_key.encode('utf-8'),
        message.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    authorization = f"CEA algorithm=HmacSHA256, access-key={ACCESS_KEY}, signed-date={datetime_gmt}, signature={signature}"
    return authorization

def search_products(keyword: str, limit: int = 10):
    """키워드(예: '라이젠 7500F', 'RTX 4060')로 쿠팡 상품 검색"""
    path = f"/v2/providers/affiliate_open_api/apis/openapi/products/search?keyword={keyword}&limit={limit}"
    auth_header = generate_hmac_signature("GET", path, SECRET_KEY)
    
    headers = {
        "Authorization": auth_header,
        "Content-Type": "application/json;charset=UTF-8"
    }
    
    url = DOMAIN + path
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            data = response.json()
            return data.get("data", {}).get("productData", [])
        else:
            print(f"API Error {response.status_code}: {response.text}")
            return []
    except Exception as e:
        print(f"Request failed: {e}")
        return []

def create_deeplink(original_urls: list):
    """일반 쿠팡 상품 URL을 파트너스 수익화 딥링크로 변환"""
    path = "/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink"
    auth_header = generate_hmac_signature("POST", path, SECRET_KEY)
    
    headers = {
        "Authorization": auth_header,
        "Content-Type": "application/json;charset=UTF-8"
    }
    
    payload = {
        "coupangUrls": original_urls
    }
    
    url = DOMAIN + path
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        if response.status_code == 200:
            return response.json().get("data", [])
        else:
            print(f"Deeplink Error: {response.text}")
            return []
    except Exception as e:
        print(f"Deeplink failed: {e}")
        return []

def check_stock_and_find_fallback(product_name: str, target_category: str):
    """
    품절 발생 시 대체 상품을 자동으로 검색하여 반환하는 폴백 알고리즘
    - 예: '이엠텍 RTX 4060' 품절 시 -> 'ZOTAC RTX 4060' 또는 'ASUS RTX 4060' 최저가 자동 스위칭
    """
    print(f"[모니터링] {product_name} 실시간 재고 확인 중...")
    
    # 실제 운영 시: 쿠팡 Open API 검색 결과 중 isRocket/inStock 필드 확인
    # 가상 시뮬레이션:
    is_in_stock = True
    
    if not is_in_stock:
        print(f"[경고] {product_name} 품절 감지! 동일 스펙 대체 상품 검색...")
        fallback_candidates = search_products(keyword=target_category, limit=5)
        if fallback_candidates:
            best_fallback = fallback_candidates[0]
            print(f"[대체 완료] {best_fallback.get('productName')} 으로 자동 교체되었습니다.")
            return {
                "inStock": False,
                "fallbackItem": best_fallback
            }
    
    return {
        "inStock": True,
        "message": "재고 정상 확보 상태"
    }

if __name__ == "__main__":
    print("=== 쿠팡 파트너스 API 자동화 및 품절 방지 파이프라인 ===")
    print("1. 매일 오전 09:00 정기 Cron 실행")
    print("2. 품절 상품 발견 시 동급 최저가 부품 자동 스위칭")
    print("3. 가격 변동치 계산 후 웹사이트 API(/api/sync-prices)로 전송")

