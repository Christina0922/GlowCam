# Android Studio 단계별 실행 가이드

## 📱 현재 상태 확인

✅ `android` 폴더 존재 확인
✅ 프로젝트 구조 준비 완료

---

## 🎯 Android Studio에서 할 일 (단계별)

### 1단계: 프로젝트 열기

1. **Android Studio 실행**
2. **File → Open** 클릭
3. **`D:\GlowCam\idol-filter-app\android` 폴더 선택**
   - ⚠️ **`android` 폴더를 선택해야 합니다!**
   - `idol-filter-app` 폴더가 아닌 `android` 폴더!
4. **OK** 클릭

---

### 2단계: Gradle 동기화 대기

1. Android Studio가 자동으로 **Gradle 동기화** 시작
2. 하단 상태바에서 "Gradle sync in progress..." 확인
3. **완료될 때까지 대기** (처음에는 시간이 걸릴 수 있음)
4. 완료되면 "Gradle sync finished" 메시지 표시

---

### 3단계: SDK 경로 설정 (필요한 경우)

만약 "SDK location not found" 오류가 나면:

1. **`android/local.properties` 파일 열기**
2. **SDK 경로 수정:**
   ```properties
   sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
   ```
   - 실제 SDK 경로로 변경 (Android Studio → SDK Manager에서 확인)

---

### 4단계: 에뮬레이터 실행

1. **상단 툴바의 Device Manager 아이콘 클릭**
   - 또는 **Tools → Device Manager**
2. **에뮬레이터 목록에서 원하는 기기 선택**
3. **▶️ Play 버튼 클릭**
4. **에뮬레이터가 완전히 부팅될 때까지 대기**

---

### 5단계: Metro 번들러 시작

**Android Studio 하단의 Terminal 탭에서:**

```bash
cd D:\GlowCam\idol-filter-app
npm start
```

또는 **별도 터미널에서:**
- PowerShell 또는 CMD 열기
- 위 명령 실행

---

### 6단계: 앱 실행

1. **Android Studio 상단의 Run 버튼 (▶️) 클릭**
   - 또는 **Run → Run 'app'** 메뉴
   - 또는 **Shift + F10** 단축키

2. **에뮬레이터 선택**
   - 실행 중인 에뮬레이터 선택
   - 또는 USB로 연결된 실제 기기 선택

3. **빌드 및 실행 대기**

---

## ✅ 성공 확인

에뮬레이터에서 앱이 실행되면 성공입니다!

---

## 🚨 문제 해결

### 문제 1: "SDK location not found"

**해결:**
- `android/local.properties` 파일에서 SDK 경로 수정

### 문제 2: "Gradle sync failed"

**해결:**
- File → Sync Project with Gradle Files 다시 실행
- Build → Clean Project
- Build → Rebuild Project

### 문제 3: "compileSdk" 오류

**해결:**
- 이미 수정했으므로 Gradle 동기화만 다시 실행

### 문제 4: Metro 번들러 연결 안 됨

**해결:**
- Terminal에서 `npm start` 실행 확인
- 에뮬레이터에서 앱을 다시 실행

---

## 📝 체크리스트

실행 전 확인:
- [ ] Android Studio에서 `android` 폴더 열기
- [ ] Gradle 동기화 완료
- [ ] 에뮬레이터 실행 중
- [ ] Metro 번들러 실행 중 (`npm start`)
- [ ] Run 버튼 클릭

---

## 🎯 요약

1. **File → Open → `android` 폴더 선택**
2. **Gradle 동기화 대기**
3. **에뮬레이터 실행**
4. **Terminal에서 `npm start`**
5. **Run 버튼 클릭**

끝!

