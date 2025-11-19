import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { getFilterEngine } from '../filters/engine/FilterEngine';
import { FilterType } from '../filters/types';
import FilterSelector from '../components/FilterSelector';
import FilterPreview from '../components/FilterPreview';

const { width, height } = Dimensions.get('window');

/**
 * 카메라 화면 - 실시간 필터 적용
 */
const CameraScreen: React.FC = () => {
  const camera = useRef<Camera>(null);
  const [isActive, setIsActive] = useState(true);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('none');
  const [filterIntensity, setFilterIntensity] = useState(1.0);
  const [showFilterSelector, setShowFilterSelector] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const device = useCameraDevice('front'); // 전면 카메라
  const { hasPermission, requestPermission } = useCameraPermission();

  const filterEngine = getFilterEngine();

  useEffect(() => {
    // 카메라 권한 확인
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  /**
   * 필터 변경 핸들러
   */
  const handleFilterChange = (filterType: FilterType) => {
    setCurrentFilter(filterType);
    filterEngine.switchFilter(filterType, filterIntensity);
  };

  /**
   * 필터 강도 조절
   */
  const handleIntensityChange = (intensity: number) => {
    setFilterIntensity(intensity);
    filterEngine.setIntensity(intensity);
  };

  /**
   * 촬영 시작/중지
   */
  const handleRecord = async () => {
    if (!camera.current) {
      Alert.alert('오류', '카메라를 초기화할 수 없습니다.');
      return;
    }

    try {
      if (isRecording) {
        // 녹화 중지
        await camera.current.stopRecording();
        setIsRecording(false);
        Alert.alert('완료', '영상이 저장되었습니다.');
      } else {
        // 녹화 시작
        setIsRecording(true);
        await camera.current.startRecording({
          onRecordingFinished: (video) => {
            setIsRecording(false);
            console.log('Video saved:', video.path);
            // TODO: 자동 편집 기능 호출
          },
          onRecordingError: (error) => {
            setIsRecording(false);
            Alert.alert('오류', error.message);
          },
        });
      }
    } catch (error) {
      setIsRecording(false);
      Alert.alert('오류', error instanceof Error ? error.message : '녹화 중 오류가 발생했습니다.');
    }
  };

  /**
   * 사진 촬영
   */
  const handleCapture = async () => {
    if (!camera.current) {
      Alert.alert('오류', '카메라를 초기화할 수 없습니다.');
      return;
    }

    try {
      const photo = await camera.current.takePhoto({
        flash: 'off',
      });
      console.log('Photo saved:', photo.path);
      Alert.alert('완료', '사진이 저장되었습니다.');
    } catch (error) {
      Alert.alert('오류', error instanceof Error ? error.message : '촬영 중 오류가 발생했습니다.');
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>카메라 권한이 필요합니다.</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>권한 요청</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>카메라를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={isActive}
        video={true}
        audio={true}
        // 필터는 실제로는 카메라 프레임에 GPU 셰이더로 적용
        // 현재는 구조만 정의
      />

      {/* 필터 미리보기 오버레이 */}
      <FilterPreview
        filterType={currentFilter}
        intensity={filterIntensity}
        style={styles.filterOverlay}
      />

      {/* 필터 선택 버튼 */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setShowFilterSelector(true)}
      >
        <Text style={styles.filterButtonText}>
          {currentFilter === 'none' ? '필터 선택' : currentFilter}
        </Text>
      </TouchableOpacity>

      {/* 컨트롤 버튼 영역 */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, styles.captureButton]}
          onPress={handleCapture}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.controlButton,
            styles.recordButton,
            isRecording && styles.recordButtonActive,
          ]}
          onPress={handleRecord}
        >
          <Text style={styles.recordButtonText}>
            {isRecording ? '●' : '○'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 필터 선택 모달 */}
      {showFilterSelector && (
        <FilterSelector
          currentFilter={currentFilter}
          intensity={filterIntensity}
          onFilterChange={handleFilterChange}
          onIntensityChange={handleIntensityChange}
          onClose={() => setShowFilterSelector(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  filterOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  filterButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  controlButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  recordButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonActive: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  permissionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CameraScreen;

