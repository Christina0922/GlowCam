# Android Studio 프로젝트 생성 - Next 버튼 활성화 방법

## ⚠️ 문제: Next 버튼이 비활성화됨

경고 메시지: **"Your Save location contains non-ASCII characters."**

한글 경로(`D:\아이돌`) 때문에 발생하는 문제입니다.

## ✅ 해결 방법

### 방법 1: Save location을 영문 경로로 변경 (권장)

1. **Save location** 필드 옆의 폴더 아이콘 클릭
2. 영문 경로로 변경:
   - 예: `D:\IdolFilter\TempAndroid`
   - 예: `D:\Projects\TempAndroid`
   - 예: `C:\Users\YourName\AndroidProjects\TempAndroid`

3. 경로 변경 후 **Next** 버튼이 활성화됩니다!

### 방법 2: 현재 설정 유지하고 경로만 변경

**Save location을 다음으로 변경:**
```
D:\IdolFilter\TempAndroid
```

또는

```
D:\Projects\TempAndroid
```

---

## 📝 올바른 설정 예시

- **Name:** `TempAndroid` (또는 원하는 이름)
- **Package name:** `com.idolfilterapp` (또는 원하는 패키지명)
- **Save location:** `D:\IdolFilter\TempAndroid` ⭐ **영문 경로로!**
- **Minimum SDK:** API 24 이상
- **Build configuration language:** Kotlin DSL (현재 설정 유지)

---

## 🎯 완료 후

프로젝트가 생성되면:

1. 생성된 `TempAndroid` 폴더에서 `android` 관련 파일 확인
2. `D:\아이돌\idol-filter-app\android` 폴더로 필요한 파일 복사

---

## 💡 팁

- 한글 경로는 Android Studio에서 문제를 일으킬 수 있습니다
- 가능하면 프로젝트 경로는 영문으로 사용하는 것이 좋습니다
- 생성 후 파일을 한글 경로로 이동해도 됩니다

