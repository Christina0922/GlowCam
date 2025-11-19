import { FilterInterface, FilterConfig, FilterType, FilterResult } from '../types';
import { PinkGlowFilter } from '../presets/PinkGlowFilter';
import { FairyGlitterFilter } from '../presets/FairyGlitterFilter';
import { PrincessSoftFilter } from '../presets/PrincessSoftFilter';
import { IdolSharpFilter } from '../presets/IdolSharpFilter';
import { SnowFairyFilter } from '../presets/SnowFairyFilter';

/**
 * 필터 엔진 - 필터 로딩, 적용, 전환, 해제를 관리하는 중앙 엔진
 */
export class FilterEngine {
  private currentFilter: FilterInterface | null = null;
  private filterType: FilterType = 'none';
  private filters: Map<FilterType, FilterInterface> = new Map();
  private isInitialized: boolean = false;

  constructor() {
    this.initializeFilters();
  }

  /**
   * 모든 필터 초기화
   */
  private initializeFilters(): void {
    this.filters.set('pinkGlow', new PinkGlowFilter());
    this.filters.set('fairyGlitter', new FairyGlitterFilter());
    this.filters.set('princessSoft', new PrincessSoftFilter());
    this.filters.set('idolSharp', new IdolSharpFilter());
    this.filters.set('snowFairy', new SnowFairyFilter());
    this.isInitialized = true;
  }

  /**
   * 필터 전환
   * @param filterType 적용할 필터 타입
   * @param intensity 필터 강도 (0.0 ~ 1.0)
   */
  public switchFilter(filterType: FilterType, intensity: number = 1.0): void {
    // 현재 필터 제거
    if (this.currentFilter) {
      this.currentFilter.removeFilter();
      this.currentFilter = null;
    }

    // 'none'이면 필터 제거만 하고 종료
    if (filterType === 'none') {
      this.filterType = 'none';
      return;
    }

    // 새 필터 로드
    const filter = this.filters.get(filterType);
    if (!filter) {
      console.warn(`Filter ${filterType} not found`);
      return;
    }

    this.currentFilter = filter;
    this.filterType = filterType;
    this.currentFilter.setIntensity(intensity);
    this.currentFilter.setEnabled(true);
  }

  /**
   * 현재 필터에 프레임 적용
   * @param frame 원본 프레임
   * @returns 처리된 프레임
   */
  public async applyFilter(frame: any): Promise<FilterResult> {
    if (!this.currentFilter || this.filterType === 'none') {
      return {
        success: true,
        processedFrame: frame, // 필터 없이 원본 반환
      };
    }

    const config = this.currentFilter.getConfig();
    if (!config.enabled) {
      return {
        success: true,
        processedFrame: frame,
      };
    }

    try {
      return await this.currentFilter.applyFilter(frame, config);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * 현재 필터 제거
   */
  public removeFilter(): void {
    if (this.currentFilter) {
      this.currentFilter.removeFilter();
      this.currentFilter = null;
      this.filterType = 'none';
    }
  }

  /**
   * 현재 필터 타입 가져오기
   */
  public getCurrentFilterType(): FilterType {
    return this.filterType;
  }

  /**
   * 현재 필터 설정 가져오기
   */
  public getCurrentFilterConfig(): FilterConfig | null {
    return this.currentFilter?.getConfig() || null;
  }

  /**
   * 필터 강도 조절
   */
  public setIntensity(intensity: number): void {
    if (this.currentFilter) {
      this.currentFilter.setIntensity(Math.max(0, Math.min(1, intensity)));
    }
  }

  /**
   * 필터 활성화/비활성화
   */
  public setEnabled(enabled: boolean): void {
    if (this.currentFilter) {
      this.currentFilter.setEnabled(enabled);
    }
  }

  /**
   * 사용 가능한 모든 필터 목록 가져오기
   */
  public getAvailableFilters(): FilterType[] {
    return Array.from(this.filters.keys());
  }

  /**
   * 필터 엔진 초기화 상태 확인
   */
  public isReady(): boolean {
    return this.isInitialized;
  }
}

// 싱글톤 인스턴스
let filterEngineInstance: FilterEngine | null = null;

/**
 * 필터 엔진 싱글톤 인스턴스 가져오기
 */
export const getFilterEngine = (): FilterEngine => {
  if (!filterEngineInstance) {
    filterEngineInstance = new FilterEngine();
  }
  return filterEngineInstance;
};

