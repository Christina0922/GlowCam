# CMake 오류 해결 방법

## ⚠️ 문제

- "CMake Error: Could not find a package configuration file provided by 'fbjni'"
- "package.xml parsing problem"

## ✅ 해결 방법

### 방법 1: Gradle 동기화 완료 대기

현재 "Gradle project sync in progress..." 상태입니다.
- **4분 31초** 경과 중
- 의존성 다운로드 중이므로 **완료될 때까지 대기**하세요
- 처음 동기화는 시간이 오래 걸릴 수 있습니다 (10-15분)

### 방법 2: CMake 경고 무시 (권장)

CMake 오류는 **경고**일 수 있습니다:
- 앱 빌드에는 영향을 주지 않을 수 있음
- React Native의 일부 네이티브 모듈만 CMake를 사용
- 기본 기능은 작동할 수 있음

### 방법 3: NDK 설치 확인

1. **Android Studio → Tools → SDK Manager**
2. **SDK Tools** 탭
3. **NDK (Side by side)** 체크
4. **CMake** 체크
5. **Apply → OK**

### 방법 4: Gradle 캐시 정리

Android Studio Terminal에서:
```bash
cd D:\GlowCam\idol-filter-app\android
.\gradlew clean
.\gradlew --stop
```

그 다음 다시 동기화

---

## 🎯 권장 사항

**지금은 Gradle 동기화가 진행 중이므로:**
1. **완료될 때까지 대기** (10-15분 소요 가능)
2. 동기화가 완료되면 CMake 오류가 자동으로 해결될 수 있음
3. 완료 후 빌드를 시도해보세요

---

## 📝 확인 사항

동기화 완료 후:
- Build Output에서 오류가 사라졌는지 확인
- 여전히 CMake 오류가 있으면 NDK 설치 확인
- 앱 빌드가 성공하면 CMake 경고는 무시해도 됨

