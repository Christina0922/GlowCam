/**
 * 필터 타입 정의
 */

export interface FilterConfig {
  name: string;
  displayName: string;
  intensity: number; // 0.0 ~ 1.0
  enabled: boolean;
  shaderParams?: Record<string, any>;
}

export interface FilterResult {
  success: boolean;
  error?: string;
  processedFrame?: any; // 처리된 프레임 데이터
}

export interface FilterInterface {
  /**
   * 필터 적용
   * @param frame 원본 프레임 데이터
   * @param config 필터 설정
   * @returns 처리된 프레임 또는 에러
   */
  applyFilter(frame: any, config: FilterConfig): Promise<FilterResult>;

  /**
   * 필터 제거
   */
  removeFilter(): void;

  /**
   * 필터 설정 가져오기
   */
  getConfig(): FilterConfig;

  /**
   * 필터 활성화/비활성화
   */
  setEnabled(enabled: boolean): void;

  /**
   * 필터 강도 조절
   */
  setIntensity(intensity: number): void;
}

export type FilterType = 
  | 'pinkGlow'
  | 'fairyGlitter'
  | 'princessSoft'
  | 'idolSharp'
  | 'snowFairy'
  | 'none';

