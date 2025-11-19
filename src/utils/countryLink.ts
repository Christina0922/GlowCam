/**
 * 국가별 상품 추천 링크 분기 유틸리티
 */

export type CountryCode = 'KR' | 'US' | 'GB' | 'CA' | 'AU' | 'DE' | 'FR' | 'JP' | 'CN' | 'OTHER';

export interface ProductLink {
  url: string;
  platform: 'coupang' | 'amazon' | 'temu' | 'aliexpress';
  country: CountryCode;
}

/**
 * 국가 코드 감지 (간단한 버전, 실제로는 i18n 또는 디바이스 로케일 사용)
 */
export function detectCountry(): CountryCode {
  // 실제로는 react-native-localize 또는 디바이스 로케일 사용
  // 여기서는 간단한 예시
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  
  if (locale.includes('ko')) return 'KR';
  if (locale.includes('en-US')) return 'US';
  if (locale.includes('en-GB')) return 'GB';
  if (locale.includes('en-CA')) return 'CA';
  if (locale.includes('en-AU')) return 'AU';
  if (locale.includes('de')) return 'DE';
  if (locale.includes('fr')) return 'FR';
  if (locale.includes('ja')) return 'JP';
  if (locale.includes('zh-CN')) return 'CN';
  
  return 'OTHER';
}

/**
 * 필터별 추천 상품 링크 생성
 */
export function getProductLink(
  filterType: string,
  productCategory: 'accessory' | 'hairpin' | 'lighting' | 'makeup'
): ProductLink {
  const country = detectCountry();
  
  // 기본 상품 ID (실제로는 데이터베이스에서 가져옴)
  const productIds: Record<string, Record<string, string>> = {
    pinkGlow: {
      accessory: 'pink-glow-accessory-001',
      hairpin: 'pink-glow-hairpin-001',
      lighting: 'pink-glow-light-001',
      makeup: 'pink-glow-makeup-001',
    },
    fairyGlitter: {
      accessory: 'fairy-glitter-accessory-001',
      hairpin: 'fairy-glitter-hairpin-001',
      lighting: 'fairy-glitter-light-001',
      makeup: 'fairy-glitter-makeup-001',
    },
    // ... 다른 필터들
  };

  const productId = productIds[filterType]?.[productCategory] || 'default-001';

  // 국가별 링크 분기
  switch (country) {
    case 'KR':
      return {
        url: `https://www.coupang.com/vp/products/${productId}`,
        platform: 'coupang',
        country: 'KR',
      };
    
    case 'US':
    case 'GB':
    case 'CA':
    case 'AU':
      return {
        url: `https://www.amazon.com/dp/${productId}`,
        platform: 'amazon',
        country,
      };
    
    case 'CN':
      return {
        url: `https://www.temu.com/product-${productId}.html`,
        platform: 'temu',
        country: 'CN',
      };
    
    default:
      // 저가 해외 시장은 AliExpress
      return {
        url: `https://www.aliexpress.com/item/${productId}.html`,
        platform: 'aliexpress',
        country: 'OTHER',
      };
  }
}

/**
 * 필터별 추천 상품 목록 가져오기
 */
export function getRecommendedProducts(filterType: string): Array<{
  category: string;
  name: string;
  link: ProductLink;
}> {
  const categories: Array<'accessory' | 'hairpin' | 'lighting' | 'makeup'> = [
    'accessory',
    'hairpin',
    'lighting',
    'makeup',
  ];

  const categoryNames: Record<string, string> = {
    accessory: '악세사리',
    hairpin: '헤어핀',
    lighting: '조명',
    makeup: '메이크업',
  };

  return categories.map((category) => ({
    category: categoryNames[category] || category,
    name: `${filterType} ${category}`,
    link: getProductLink(filterType, category),
  }));
}

/**
 * 링크 열기 (웹뷰 또는 외부 브라우저)
 */
export async function openProductLink(link: ProductLink): Promise<void> {
  // 실제로는 Linking.openURL 또는 웹뷰 사용
  console.log('Opening product link:', link);
  // TODO: react-native Linking 또는 InAppBrowser 사용
}

