# GlowCam

아이돌 감성 필터 + 자동 영상 편집 + 유튜브 쇼츠 연동 앱

## 🚀 실제 앱 확인하기

### 가장 빠른 방법

1. **간단실행.bat** 더블클릭
2. 새 터미널에서 **Android실행.bat** 더블클릭

### 상세 가이드

**실제앱확인하기.md** 파일을 참고하세요.

---

## 📱 실행 방법 요약

### 방법 1: Android 에뮬레이터 (권장)

```bash
# 1. 환경 체크
node check-env.js

# 2. 의존성 설치
npm install

# 3. Android 프로젝트 초기화 (android 폴더가 없는 경우)
npx react-native init TempProject
# TempProject/android 폴더를 여기로 복사

# 4. Metro 번들러 시작
npm start

# 5. 새 터미널에서 앱 실행
npm run android
```

### 방법 2: 실제 Android 기기

1. 기기에서 개발자 옵션 활성화
2. USB 디버깅 켜기
3. USB로 PC 연결
4. `npm run android` 실행

---

## 📋 필수 요구사항

- ✅ Node.js 18 이상
- ✅ Java JDK 17 이상
- ✅ Android Studio
- ✅ Android SDK (API 33+)
- ✅ Android 에뮬레이터 또는 실제 기기

---

## 🛠️ 문제 해결

### "android 폴더가 없습니다"

```bash
npx react-native init TempProject
# TempProject/android 폴더를 idol-filter-app/로 복사
```

### "SDK location not found"

프로젝트 루트에 `local.properties` 파일 생성:

```properties
sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
```

### "포트 8081이 이미 사용 중"

```bash
npm start -- --reset-cache
```

---

## 📖 상세 가이드

- **실제앱확인하기.md** - 단계별 실행 가이드
- **실행가이드.md** - 상세 설정 가이드

---

## 프로젝트 구조

```
idol-filter-app/
├── src/
│   ├── components/      # UI 컴포넌트
│   ├── screens/         # 화면
│   ├── filters/         # 필터 엔진
│   │   ├── engine/     # 코어 엔진
│   │   ├── presets/     # 필터 프리셋
│   │   └── shaders/     # GPU 셰이더
│   ├── utils/           # 유틸리티
│   ├── hooks/           # 커스텀 훅
│   └── services/        # 서비스
├── 간단실행.bat         # 간단 실행 스크립트
├── Android실행.bat      # Android 실행 스크립트
└── check-env.js         # 환경 체크 스크립트
```

## 주요 기능

- 🎨 5가지 아이돌 감성 필터
- 📹 실시간 카메라 필터 적용
- ✂️ 자동 영상 편집 (3초/5초/7초)
- 📱 YouTube Shorts 포맷 지원
- 🌍 국가별 상품 추천 링크
