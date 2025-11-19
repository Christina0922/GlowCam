/**
 * 유효성 검사 유틸리티
 */

/**
 * 필터 강도 유효성 검사
 */
export function validateIntensity(intensity: number): boolean {
  return intensity >= 0 && intensity <= 1;
}

/**
 * 비디오 경로 유효성 검사
 */
export function validateVideoPath(path: string): boolean {
  if (!path || typeof path !== 'string') {
    return false;
  }
  
  // 기본적인 경로 형식 검사
  const validExtensions = ['.mp4', '.mov', '.avi', '.mkv'];
  const hasValidExtension = validExtensions.some(ext => 
    path.toLowerCase().endsWith(ext)
  );
  
  return hasValidExtension;
}

/**
 * 국가 코드 유효성 검사
 */
export function validateCountryCode(code: string): boolean {
  const validCodes = ['KR', 'US', 'GB', 'CA', 'AU', 'DE', 'FR', 'JP', 'CN', 'OTHER'];
  return validCodes.includes(code);
}

/**
 * 필터 타입 유효성 검사
 */
export function validateFilterType(type: string): boolean {
  const validTypes = ['none', 'pinkGlow', 'fairyGlitter', 'princessSoft', 'idolSharp', 'snowFairy'];
  return validTypes.includes(type);
}

