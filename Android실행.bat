@echo off
chcp 65001 >nul
echo ====================================
echo   Android 앱 실행
echo ====================================
echo.

echo Android 기기/에뮬레이터 확인 중...
call adb devices
echo.

echo 앱 빌드 및 실행 중...
echo (첫 실행은 시간이 오래 걸릴 수 있습니다)
echo.

call npm run android

if errorlevel 1 (
    echo.
    echo ❌ 실행 실패!
    echo.
    echo 문제 해결:
    echo 1. Android Studio에서 에뮬레이터가 실행 중인지 확인
    echo 2. USB로 연결된 기기가 있는지 확인 (adb devices)
    echo 3. 실행가이드.md 파일 참고
    echo.
    pause
) else (
    echo.
    echo ✅ 앱이 실행되었습니다!
    echo.
)

pause

