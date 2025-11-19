/**
 * 앱 전역 상수
 */

export const FILTER_NAMES: Record<string, string> = {
  none: '원본',
  pinkGlow: '핑크 글로우',
  fairyGlitter: '페어리 글리터',
  princessSoft: '공주 소프트',
  idolSharp: '아이돌 샤프',
  snowFairy: '스노우 페어리',
};

export const FILTER_EMOJIS: Record<string, string> = {
  none: '📷',
  pinkGlow: '💗',
  fairyGlitter: '✨',
  princessSoft: '👑',
  idolSharp: '⭐',
  snowFairy: '❄️',
};

export const VIDEO_FORMATS = {
  SHORT_3SEC: '3sec',
  SHORT_5SEC: '5sec',
  SHORT_7SEC: '7sec',
  SHORTS: 'shorts',
} as const;

export const SHORTS_RESOLUTION = {
  width: 1080,
  height: 1920,
  aspectRatio: '9:16',
};

export const DEFAULT_FILTER_INTENSITY = 1.0;
export const MIN_FILTER_INTENSITY = 0.0;
export const MAX_FILTER_INTENSITY = 1.0;

