import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import {
  create3SecondChallenge,
  createEmotionalCut,
  convertToShortsFormat,
} from '../services/autoEdit';
import { getRecommendedProducts, openProductLink } from '../utils/countryLink';
import ProductRecommendation from '../components/ProductRecommendation';

type ExportScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Export'>;
type ExportScreenRouteProp = RouteProp<RootStackParamList, 'Export'>;

/**
 * 영상 내보내기 화면
 */
const ExportScreen: React.FC = () => {
  const navigation = useNavigation<ExportScreenNavigationProp>();
  const route = useRoute<ExportScreenRouteProp>();
  const videoPath = route.params?.videoPath;

  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'3sec' | '5sec' | '7sec' | 'shorts'>('3sec');

  if (!videoPath) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>영상 파일을 찾을 수 없습니다.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>돌아가기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /**
   * 영상 편집 및 내보내기
   */
  const handleExport = async () => {
    setIsProcessing(true);

    try {
      let result;

      switch (selectedFormat) {
        case '3sec':
          result = await create3SecondChallenge(videoPath);
          break;
        case '5sec':
          result = await createEmotionalCut(videoPath, 5);
          break;
        case '7sec':
          result = await createEmotionalCut(videoPath, 7);
          break;
        case 'shorts':
          result = await convertToShortsFormat(videoPath);
          break;
      }

      if (result.success && result.videoPath) {
        Alert.alert('완료', '영상이 저장되었습니다.');
        // TODO: 공유 기능 추가
      } else {
        Alert.alert('오류', result.error || '영상 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', error instanceof Error ? error.message : '알 수 없는 오류');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>영상 내보내기</Text>

        <View style={styles.formatSection}>
          <Text style={styles.sectionTitle}>포맷 선택</Text>
          <View style={styles.formatButtons}>
            <TouchableOpacity
              style={[
                styles.formatButton,
                selectedFormat === '3sec' && styles.formatButtonActive,
              ]}
              onPress={() => setSelectedFormat('3sec')}
            >
              <Text
                style={[
                  styles.formatButtonText,
                  selectedFormat === '3sec' && styles.formatButtonTextActive,
                ]}
              >
                3초 챌린지
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.formatButton,
                selectedFormat === '5sec' && styles.formatButtonActive,
              ]}
              onPress={() => setSelectedFormat('5sec')}
            >
              <Text
                style={[
                  styles.formatButtonText,
                  selectedFormat === '5sec' && styles.formatButtonTextActive,
                ]}
              >
                5초 컷
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.formatButton,
                selectedFormat === '7sec' && styles.formatButtonActive,
              ]}
              onPress={() => setSelectedFormat('7sec')}
            >
              <Text
                style={[
                  styles.formatButtonText,
                  selectedFormat === '7sec' && styles.formatButtonTextActive,
                ]}
              >
                7초 컷
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.formatButton,
                selectedFormat === 'shorts' && styles.formatButtonActive,
              ]}
              onPress={() => setSelectedFormat('shorts')}
            >
              <Text
                style={[
                  styles.formatButtonText,
                  selectedFormat === 'shorts' && styles.formatButtonTextActive,
                ]}
              >
                Shorts 포맷
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.exportButton, isProcessing && styles.exportButtonDisabled]}
          onPress={handleExport}
          disabled={isProcessing}
        >
          <Text style={styles.exportButtonText}>
            {isProcessing ? '처리 중...' : '내보내기'}
          </Text>
        </TouchableOpacity>

        {/* 상품 추천 섹션 */}
        <ProductRecommendation filterType="pinkGlow" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  formatSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
  },
  formatButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  formatButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  formatButtonActive: {
    backgroundColor: '#FF7CCB',
    borderColor: '#FF7CCB',
  },
  formatButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  formatButtonTextActive: {
    fontWeight: 'bold',
  },
  exportButton: {
    backgroundColor: '#FF7CCB',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  exportButtonDisabled: {
    opacity: 0.5,
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF7CCB',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExportScreen;

