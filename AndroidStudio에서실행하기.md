# 🎯 Android Studio에서 앱 실행하기

## 📱 Android Studio에서 확인하는 방법

### 방법 1: Android Studio + 터미널 (권장)

#### 1단계: Android 프로젝트 폴더 열기

1. **Android Studio 실행**
2. **File → Open** 클릭
3. **D:\아이돌\idol-filter-app\android** 폴더 선택
   - ⚠️ `android` 폴더가 없으면 먼저 생성 필요 (아래 참고)
4. **OK** 클릭

#### 2단계: 에뮬레이터 실행

1. Android Studio 상단의 **Device Manager** 아이콘 클릭
   - 또는 **Tools → Device Manager**
2. 원하는 에뮬레이터 옆 **▶️ Play** 버튼 클릭
3. 에뮬레이터가 완전히 부팅될 때까지 대기

#### 3단계: Metro 번들러 시작 (터미널)

**Android Studio의 터미널 사용:**
1. Android Studio 하단의 **Terminal** 탭 클릭
2. 다음 명령 실행:

```bash
cd D:\아이돌\idol-filter-app
npm start
```

**또는 별도 터미널 사용:**
- PowerShell 또는 CMD에서 위 명령 실행

#### 4단계: 앱 실행

**방법 A: Android Studio에서 실행**
1. 상단 툴바에서 **Run** 버튼 (▶️) 클릭
2. 또는 **Run → Run 'app'** 메뉴 선택
3. 또는 `Shift + F10` 단축키

**방법 B: 터미널에서 실행**
```bash
# 새 터미널에서 (Metro 번들러는 계속 실행 중)
cd D:\아이돌\idol-filter-app
npm run android
```

---

### 방법 2: Android Studio만 사용 (Gradle로 직접 실행)

#### 1단계: 프로젝트 열기
- Android Studio에서 `D:\아이돌\idol-filter-app\android` 폴더 열기

#### 2단계: Gradle 동기화
- Android Studio가 자동으로 Gradle 동기화 시작
- 완료될 때까지 대기

#### 3단계: 에뮬레이터 실행
- Device Manager에서 에뮬레이터 실행

#### 4단계: Metro 번들러 시작 (필수!)
- Android Studio Terminal에서:
```bash
cd D:\아이돌\idol-filter-app
npm start
```

#### 5단계: 앱 실행
- 상단 **Run** 버튼 (▶️) 클릭
- 또는 `Shift + F10`

---

## ⚠️ android 폴더가 없는 경우

React Native 프로젝트를 초기화해야 합니다:

### Android Studio Terminal에서:

```bash
# 프로젝트 폴더로 이동
cd D:\아이돌\idol-filter-app

# React Native 프로젝트 초기화
npx react-native init TempProject --template react-native-template-typescript

# android 폴더 복사
xcopy /E /I /Y TempProject\android android

# 임시 프로젝트 삭제 (선택사항)
rmdir /S /Q TempProject
```

### 또는 명령어로 직접:

```bash
cd D:\아이돌\idol-filter-app
npx @react-native-community/cli init . --skip-install
```

---

## 🔧 Android Studio 설정

### 1. SDK 설정 확인

1. **File → Settings** (또는 `Ctrl + Alt + S`)
2. **Appearance & Behavior → System Settings → Android SDK**
3. 다음이 설치되어 있는지 확인:
   - ✅ Android SDK Platform (API 33 이상)
   - ✅ Android SDK Build-Tools
   - ✅ Android Emulator

### 2. Gradle 설정

Android Studio가 자동으로 Gradle을 다운로드하고 설정합니다.
- 첫 실행 시 시간이 걸릴 수 있습니다

### 3. local.properties 확인

`android/local.properties` 파일이 있는지 확인:
- 없으면 생성:
```properties
sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
```

---

## 🎬 실행 순서 요약

### 첫 실행

1. **Android Studio 열기**
   - `D:\아이돌\idol-filter-app\android` 폴더 열기

2. **에뮬레이터 실행**
   - Device Manager → 에뮬레이터 ▶️ 클릭

3. **Metro 번들러 시작** (Android Studio Terminal)
   ```bash
   cd D:\아이돌\idol-filter-app
   npm install  # 처음 한 번만
   npm start
   ```

4. **앱 실행**
   - Android Studio에서 **Run** 버튼 (▶️) 클릭
   - 또는 `Shift + F10`

### 이후 실행

1. Android Studio에서 프로젝트 열기
2. 에뮬레이터 실행
3. Terminal에서 `npm start` (Metro 번들러)
4. **Run** 버튼 클릭

---

## 💡 Android Studio 팁

### 1. Logcat으로 로그 확인
- 하단 **Logcat** 탭에서 앱 로그 확인
- 필터로 "ReactNativeJS" 검색하면 React Native 로그만 보임

### 2. 디버깅
- **Run → Debug 'app'** 또는 `Shift + F9`
- 브레이크포인트 설정 가능

### 3. 빌드 변형 선택
- 상단 툴바에서 **debug/release** 선택 가능

### 4. 빠른 재시작
- 앱 실행 중 코드 수정 시
- Android Studio에서 **Run** 버튼 다시 클릭
- 또는 Metro 번들러에서 `r` 키 입력 (리로드)

---

## 🚨 문제 해결

### 문제 1: "SDK location not found"

**해결:**
`android/local.properties` 파일 생성:
```properties
sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
```

### 문제 2: "Gradle sync failed"

**해결:**
1. **File → Invalidate Caches / Restart**
2. **Invalidate and Restart** 선택
3. 다시 Gradle 동기화

### 문제 3: "Metro bundler not found"

**해결:**
Android Studio Terminal에서:
```bash
cd D:\아이돌\idol-filter-app
npm install
npm start
```

### 문제 4: 앱이 실행되지만 빈 화면

**해결:**
- Metro 번들러가 실행 중인지 확인
- Android Studio Terminal에서 `npm start` 실행

---

## ✅ 체크리스트

Android Studio에서 실행 전 확인:

- [ ] `android` 폴더 존재
- [ ] Android Studio에서 `android` 폴더 열기
- [ ] Gradle 동기화 완료
- [ ] 에뮬레이터 실행 중
- [ ] Metro 번들러 실행 중 (`npm start`)
- [ ] `local.properties` 파일 존재

---

## 🎯 가장 빠른 방법

1. **Android Studio 실행**
2. **File → Open** → `D:\아이돌\idol-filter-app\android` 선택
3. **Device Manager** → 에뮬레이터 실행
4. **Terminal** 탭에서:
   ```bash
   cd D:\아이돌\idol-filter-app
   npm start
   ```
5. **Run** 버튼 (▶️) 클릭

끝!

