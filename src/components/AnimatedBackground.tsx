import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

interface AnimatedBackgroundProps {
  variant?: 'home' | 'camera' | 'splash';
  children?: React.ReactNode;
}

/**
 * 화려한 애니메이션 배경 컴포넌트
 */
const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'home',
  children 
}) => {
  const glowAnim1 = useRef(new Animated.Value(0)).current;
  const glowAnim2 = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 글로우 애니메이션 1
    const glow1 = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim1, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim1, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    // 글로우 애니메이션 2 (역방향)
    const glow2 = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim2, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim2, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    // 반짝이 애니메이션
    const sparkle = Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // 펄스 애니메이션
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    glow1.start();
    glow2.start();
    sparkle.start();
    pulse.start();

    return () => {
      glow1.stop();
      glow2.stop();
      sparkle.stop();
      pulse.stop();
    };
  }, []);

  const glow1Opacity = glowAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const glow2Opacity = glowAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.6],
  });

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  const sparkleScale = sparkleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1.2, 0.8],
  });

  const getGradientColors = () => {
    switch (variant) {
      case 'home':
        return [
          ['#000000', '#1a0033', '#330066'],
          ['#FF7CCB', '#FFB6E1', '#FFD6F0'],
          ['#667eea', '#764ba2', '#f093fb'],
        ];
      case 'camera':
        return [
          ['#000000', '#1a1a2e', '#16213e'],
          ['#667eea', '#764ba2', '#f093fb'],
          ['#FF7CCB', '#FFB6E1', '#FFD6E1'],
        ];
      case 'splash':
        return [
          ['#000000', '#1a0033', '#330066'],
          ['#FF7CCB', '#FFB6E1', '#FFD6F0'],
          ['#667eea', '#764ba2', '#f093fb'],
        ];
      default:
        return [
          ['#000000', '#1a0033', '#330066'],
          ['#FF7CCB', '#FFB6E1', '#FFD6F0'],
          ['#667eea', '#764ba2', '#f093fb'],
        ];
    }
  };

  const [gradient1, gradient2, gradient3] = getGradientColors();

  // 반짝이 위치 생성
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * width,
    y: Math.random() * height,
    delay: Math.random() * 2000,
    size: Math.random() * 4 + 2,
  }));

  return (
    <View style={styles.container}>
      {/* 메인 그라데이션 배경 */}
      <LinearGradient
        colors={gradient1}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* 애니메이션 글로우 1 */}
      <Animated.View
        style={[
          styles.glowCircle,
          {
            top: height * 0.2,
            left: width * 0.1,
            opacity: glow1Opacity,
            transform: [
              {
                scale: pulseAnim.interpolate({
                  inputRange: [1, 1.2],
                  outputRange: [1, 1.3],
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={gradient2}
          style={styles.glowGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      {/* 애니메이션 글로우 2 */}
      <Animated.View
        style={[
          styles.glowCircle,
          {
            top: height * 0.6,
            right: width * 0.1,
            opacity: glow2Opacity,
            transform: [
              {
                scale: pulseAnim.interpolate({
                  inputRange: [1, 1.2],
                  outputRange: [1.2, 1],
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={gradient3}
          style={styles.glowGradient}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </Animated.View>

      {/* 반짝이 효과 */}
      {sparkles.map((sparkle) => (
        <Animated.View
          key={sparkle.id}
          style={[
            styles.sparkle,
            {
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
              opacity: sparkleOpacity,
              transform: [
                {
                  scale: sparkleScale,
                },
                {
                  rotate: sparkleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={[styles.sparkleDot, { width: sparkle.size, height: sparkle.size }]} />
        </Animated.View>
      ))}

      {/* 추가 글로우 레이어 */}
      <Animated.View
        style={[
          styles.glowOverlay,
          {
            opacity: glow1Opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0.1, 0.3],
            }),
          },
        ]}
      >
        <LinearGradient
          colors={['rgba(255, 124, 203, 0.1)', 'transparent', 'rgba(102, 126, 234, 0.1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* 콘텐츠 */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  glowCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  glowGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
  },
  sparkle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkleDot: {
    backgroundColor: '#fff',
    borderRadius: 50,
    shadowColor: '#FF7CCB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  glowOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default AnimatedBackground;

