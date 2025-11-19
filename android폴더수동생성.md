# android 폴더 수동 생성 방법

React Native CLI에 문제가 있을 때 사용하는 방법입니다.

## 방법 1: Android Studio에서 새 프로젝트 생성 (가장 쉬움)

### 1단계: Android Studio에서 새 프로젝트 생성

1. **Android Studio 실행**
2. **File → New → New Project**
3. **Empty Activity** 선택
4. **Next** 클릭
5. 프로젝트 설정:
   - Name: `TempAndroidProject`
   - Package name: `com.idolfilterapp` (또는 원하는 이름)
   - Save location: `D:\아이돌\idol-filter-app\TempAndroidProject`
   - Language: **Kotlin** 선택
   - Minimum SDK: **API 21** 이상
6. **Finish** 클릭

### 2단계: android 폴더 복사

프로젝트가 생성되면:

```bash
# 터미널에서
cd D:\아이돌\idol-filter-app
xcopy /E /I /Y TempAndroidProject\app\src\main\java\com\idolfilterapp idol-filter-app\android\app\src\main\java\com\idolfilterapp
```

**또는 더 간단하게:**

1. `TempAndroidProject` 폴더의 `app` 폴더를 확인
2. `D:\아이돌\idol-filter-app\android\app` 폴더에 필요한 파일들 복사

---

## 방법 2: 기존 React Native 프로젝트에서 복사

다른 React Native 프로젝트가 있다면:

```bash
# 다른 React Native 프로젝트의 android 폴더를 복사
xcopy /E /I /Y "다른프로젝트경로\android" "D:\아이돌\idol-filter-app\android"
```

---

## 방법 3: GitHub에서 템플릿 다운로드

1. https://github.com/facebook/react-native/tree/main/packages/react-native/template
2. `android` 폴더 다운로드
3. `D:\아이돌\idol-filter-app\android`에 복사

---

## 방법 4: 간단한 android 폴더 구조 생성

최소한의 구조만 만들어서 시작:

### 필요한 최소 파일들:

```
android/
├── app/
│   ├── build.gradle
│   └── src/
│       └── main/
│           ├── AndroidManifest.xml
│           └── java/com/idolfilterapp/
│               └── MainActivity.kt
├── build.gradle
├── settings.gradle
└── gradle/
    └── wrapper/
        ├── gradle-wrapper.jar
        └── gradle-wrapper.properties
```

---

## 추천: 방법 1 (Android Studio에서 생성)

가장 확실하고 빠른 방법입니다!

1. Android Studio → New Project
2. Empty Activity 생성
3. 생성된 프로젝트의 구조를 참고하여 필요한 파일만 복사

---

## 생성 후 확인

`android` 폴더가 생성되면:

1. Android Studio에서 `D:\아이돌\idol-filter-app\android` 폴더 열기
2. Gradle 동기화 대기
3. 에뮬레이터 실행
4. Terminal에서 `npm start`
5. Run 버튼 클릭

