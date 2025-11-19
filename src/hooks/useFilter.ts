import { useState, useCallback } from 'react';
import { FilterType } from '../filters/types';
import { getFilterEngine } from '../filters/engine/FilterEngine';

/**
 * 필터 사용을 위한 커스텀 훅
 */
export const useFilter = () => {
  const [currentFilter, setCurrentFilter] = useState<FilterType>('none');
  const [intensity, setIntensity] = useState(1.0);
  const filterEngine = getFilterEngine();

  const changeFilter = useCallback((filterType: FilterType) => {
    setCurrentFilter(filterType);
    filterEngine.switchFilter(filterType, intensity);
  }, [intensity]);

  const changeIntensity = useCallback((newIntensity: number) => {
    const clampedIntensity = Math.max(0, Math.min(1, newIntensity));
    setIntensity(clampedIntensity);
    filterEngine.setIntensity(clampedIntensity);
  }, []);

  const removeFilter = useCallback(() => {
    setCurrentFilter('none');
    filterEngine.removeFilter();
  }, []);

  return {
    currentFilter,
    intensity,
    changeFilter,
    changeIntensity,
    removeFilter,
  };
};

