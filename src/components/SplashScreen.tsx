import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import AnimatedBackground from './AnimatedBackground';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

/**
 * 스플래시 스크린 - 앱 시작 화면
 */
const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 로고 페이드인 + 스케일
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // 회전 애니메이션
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // 글로우 펄스
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 2초 후 자동 종료
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1, 0.5],
  });

  const glowScale = glowAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1],
  });

  return (
    <AnimatedBackground variant="splash">
      <View style={styles.container}>
        {/* 메인 로고 */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* 글로우 효과 */}
          <Animated.View
            style={[
              styles.glowRing,
              {
                opacity: glowOpacity,
                transform: [{ scale: glowScale }, { rotate }],
              },
            ]}
          />
          
          {/* 로고 텍스트 */}
          <Text style={styles.logoText}>GlowCam</Text>
          <Text style={styles.logoSubtext}>✨ 아이돌 감성 필터 ✨</Text>
        </Animated.View>

        {/* 로딩 인디케이터 */}
        <Animated.View
          style={[
            styles.loadingContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.loadingDots}>
            {[0, 1, 2].map((index) => (
              <Animated.View
                key={index}
                style={[
                  styles.loadingDot,
                  {
                    opacity: glowAnim.interpolate({
                      inputRange: [0, 0.33, 0.66, 1],
                      outputRange: index === 0 
                        ? [1, 0.5, 0.5, 1]
                        : index === 1
                        ? [0.5, 1, 0.5, 0.5]
                        : [0.5, 0.5, 1, 0.5],
                    }),
                    transform: [
                      {
                        scale: glowAnim.interpolate({
                          inputRange: [0, 0.33, 0.66, 1],
                          outputRange: index === 0 
                            ? [1, 1.3, 1, 1]
                            : index === 1
                            ? [1, 1, 1.3, 1]
                            : [1, 1, 1, 1.3],
                        }),
                      },
                    ],
                  },
                ]}
              />
            ))}
          </View>
        </Animated.View>
      </View>
    </AnimatedBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  glowRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#FF7CCB',
    shadowColor: '#FF7CCB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  logoText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#FF7CCB',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginBottom: 10,
    letterSpacing: 2,
  },
  logoSubtext: {
    fontSize: 18,
    color: '#FFB6E1',
    textShadowColor: '#FF7CCB',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  loadingContainer: {
    marginTop: 40,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 12,
  },
  loadingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF7CCB',
    shadowColor: '#FF7CCB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
});

export default SplashScreen;

