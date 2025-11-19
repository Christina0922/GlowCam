import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { FilterType } from '../filters/types';

const { width } = Dimensions.get('window');

interface FilterSelectorProps {
  currentFilter: FilterType;
  intensity: number;
  onFilterChange: (filter: FilterType) => void;
  onIntensityChange: (intensity: number) => void;
  onClose: () => void;
}

/**
 * 필터 선택 컴포넌트
 */
const FilterSelector: React.FC<FilterSelectorProps> = ({
  currentFilter,
  intensity,
  onFilterChange,
  onIntensityChange,
  onClose,
}) => {
  const filters: Array<{ type: FilterType; name: string; emoji: string }> = [
    { type: 'none', name: '원본', emoji: '📷' },
    { type: 'pinkGlow', name: '핑크 글로우', emoji: '💗' },
    { type: 'fairyGlitter', name: '페어리 글리터', emoji: '✨' },
    { type: 'princessSoft', name: '공주 소프트', emoji: '👑' },
    { type: 'idolSharp', name: '아이돌 샤프', emoji: '⭐' },
    { type: 'snowFairy', name: '스노우 페어리', emoji: '❄️' },
  ];

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>필터 선택</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.type}
                style={[
                  styles.filterItem,
                  currentFilter === filter.type && styles.filterItemActive,
                ]}
                onPress={() => onFilterChange(filter.type)}
              >
                <Text style={styles.filterEmoji}>{filter.emoji}</Text>
                <Text
                  style={[
                    styles.filterName,
                    currentFilter === filter.type && styles.filterNameActive,
                  ]}
                >
                  {filter.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* 필터 강도 조절 */}
          {currentFilter !== 'none' && (
            <View style={styles.intensityContainer}>
              <Text style={styles.intensityLabel}>필터 강도</Text>
              <View style={styles.sliderContainer}>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => onIntensityChange(Math.max(0, intensity - 0.1))}
                >
                  <Text style={styles.sliderButtonText}>-</Text>
                </TouchableOpacity>
                <View style={styles.sliderTrack}>
                  <View
                    style={[
                      styles.sliderFill,
                      { width: `${intensity * 100}%` },
                    ]}
                  />
                </View>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => onIntensityChange(Math.min(1, intensity + 0.1))}
                >
                  <Text style={styles.sliderButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.intensityValue}>
                {Math.round(intensity * 100)}%
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '50%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '300',
  },
  filterList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterItem: {
    alignItems: 'center',
    marginRight: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: 80,
  },
  filterItemActive: {
    backgroundColor: '#FF7CCB',
  },
  filterEmoji: {
    fontSize: 32,
    marginBottom: 5,
  },
  filterName: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  filterNameActive: {
    fontWeight: 'bold',
  },
  intensityContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  intensityLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sliderButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sliderTrack: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#FF7CCB',
  },
  intensityValue: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default FilterSelector;

