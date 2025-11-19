import React, { useEffect } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { FilterType } from '../filters/types';
import { getFilterEngine } from '../filters/engine/FilterEngine';

interface FilterPreviewProps {
  filterType: FilterType;
  intensity: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * 필터 미리보기 오버레이 컴포넌트
 * 실제로는 GPU 셰이더로 카메라 프레임에 직접 적용
 * 여기서는 구조만 정의
 */
const FilterPreview: React.FC<FilterPreviewProps> = ({
  filterType,
  intensity,
  style,
}) => {
  const filterEngine = getFilterEngine();

  useEffect(() => {
    // 필터 변경 시 엔진에 적용
    filterEngine.switchFilter(filterType, intensity);
  }, [filterType, intensity]);

  // 실제 구현에서는 여기에 WebGL/OpenGL 렌더링 로직이 들어감
  // 현재는 투명한 오버레이로 구조만 정의
  return (
    <View
      style={[
        styles.container,
        style,
        // 필터별 오버레이 색상 (임시, 실제로는 셰이더로 처리)
        filterType === 'pinkGlow' && styles.pinkOverlay,
        filterType === 'fairyGlitter' && styles.glitterOverlay,
        filterType === 'princessSoft' && styles.softOverlay,
        filterType === 'snowFairy' && styles.snowOverlay,
      ]}
      pointerEvents="none"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  // 임시 오버레이 스타일 (실제로는 셰이더로 처리)
  pinkOverlay: {
    backgroundColor: 'rgba(255, 124, 203, 0.05)',
  },
  glitterOverlay: {
    // 글리터는 애니메이션이므로 셰이더로만 처리 가능
  },
  softOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  snowOverlay: {
    backgroundColor: 'rgba(200, 181, 255, 0.05)',
  },
});

export default FilterPreview;

