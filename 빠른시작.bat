@echo off
chcp 65001 >nul
echo ====================================
echo   Idol Filter App 빠른 시작
echo ====================================
echo.

echo [1/4] Node.js 버전 확인...
node --version
if errorlevel 1 (
    echo ❌ Node.js가 설치되어 있지 않습니다!
    echo https://nodejs.org 에서 설치하세요.
    pause
    exit /b 1
)
echo ✅ Node.js 확인됨
echo.

echo [2/4] 의존성 설치 중...
call npm install
if errorlevel 1 (
    echo ❌ 의존성 설치 실패!
    pause
    exit /b 1
)
echo ✅ 의존성 설치 완료
echo.

echo [3/4] Android 기기/에뮬레이터 확인...
call adb devices
if errorlevel 1 (
    echo ⚠️  adb를 찾을 수 없습니다.
    echo Android Studio의 SDK Platform-Tools가 설치되어 있는지 확인하세요.
    echo.
)
echo.

echo [4/4] Metro 번들러 시작...
echo.
echo 📱 이제 다른 터미널에서 다음 명령을 실행하세요:
echo    npm run android
echo.
echo 또는 이 창을 열어두고 새 터미널을 열어주세요.
echo.
pause
call npm start

