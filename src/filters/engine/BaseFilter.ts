import { FilterInterface, FilterConfig, FilterResult } from '../types';

/**
 * 기본 필터 클래스 - 모든 필터의 기본 구현
 */
export abstract class BaseFilter implements FilterInterface {
  protected config: FilterConfig;

  constructor(name: string, displayName: string) {
    this.config = {
      name,
      displayName,
      intensity: 1.0,
      enabled: true,
      shaderParams: {},
    };
  }

  /**
   * 필터 적용 (추상 메서드 - 각 필터에서 구현)
   */
  abstract applyFilter(frame: any, config: FilterConfig): Promise<FilterResult>;

  /**
   * 필터 제거
   */
  removeFilter(): void {
    this.config.enabled = false;
    // 추가 정리 작업이 필요하면 하위 클래스에서 오버라이드
  }

  /**
   * 필터 설정 가져오기
   */
  getConfig(): FilterConfig {
    return { ...this.config };
  }

  /**
   * 필터 활성화/비활성화
   */
  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
  }

  /**
   * 필터 강도 조절
   */
  setIntensity(intensity: number): void {
    this.config.intensity = Math.max(0, Math.min(1, intensity));
  }

  /**
   * 셰이더 파라미터 설정
   */
  protected setShaderParam(key: string, value: any): void {
    if (!this.config.shaderParams) {
      this.config.shaderParams = {};
    }
    this.config.shaderParams[key] = value;
  }

  /**
   * 셰이더 파라미터 가져오기
   */
  protected getShaderParam(key: string, defaultValue: any = null): any {
    return this.config.shaderParams?.[key] ?? defaultValue;
  }
}

