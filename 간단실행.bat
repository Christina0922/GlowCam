@echo off
chcp 65001 >nul
title Idol Filter App - 간단 실행
color 0A

echo.
echo ════════════════════════════════════════
echo    Idol Filter App - 간단 실행
echo ════════════════════════════════════════
echo.

cd /d "%~dp0"

echo [1/5] 현재 위치 확인...
echo 현재 폴더: %CD%
echo.

echo [2/5] 환경 체크 중...
call node check-env.js
if errorlevel 1 (
    echo.
    echo ⚠️  환경 설정에 문제가 있습니다.
    echo    실제앱확인하기.md 파일을 참고하세요.
    echo.
    pause
    exit /b 1
)
echo.

echo [3/5] 의존성 확인 중...
if not exist "node_modules" (
    echo node_modules 폴더가 없습니다. 설치를 시작합니다...
    call npm install
    if errorlevel 1 (
        echo ❌ 의존성 설치 실패!
        pause
        exit /b 1
    )
    echo ✅ 의존성 설치 완료
) else (
    echo ✅ node_modules 폴더 존재
)
echo.

echo [4/5] Android 폴더 확인...
if not exist "android" (
    echo.
    echo ⚠️  android 폴더가 없습니다!
    echo.
    echo React Native 프로젝트를 초기화해야 합니다.
    echo 다음 명령을 실행하세요:
    echo.
    echo   npx react-native init TempProject
    echo   (TempProject/android 폴더를 여기로 복사)
    echo.
    echo 또는 실제앱확인하기.md 파일을 참고하세요.
    echo.
    pause
    exit /b 1
) else (
    echo ✅ android 폴더 존재
)
echo.

echo [5/5] 연결된 기기 확인...
call adb devices 2>nul
if errorlevel 1 (
    echo ⚠️  adb를 찾을 수 없습니다.
    echo    Android Studio의 SDK Platform-Tools가 설치되어 있는지 확인하세요.
    echo.
) else (
    echo ✅ adb 사용 가능
)
echo.

echo ════════════════════════════════════════
echo    준비 완료!
echo ════════════════════════════════════════
echo.
echo 다음 단계:
echo.
echo 1. Android Studio에서 에뮬레이터를 실행하거나
echo    USB로 실제 기기를 연결하세요
echo.
echo 2. 이 창을 열어두고 새 터미널을 열어서:
echo    cd D:\아이돌\idol-filter-app
echo    npm run android
echo.
echo 또는 Android실행.bat 파일을 실행하세요.
echo.
echo 3. Metro 번들러를 시작합니다...
echo    (Ctrl+C로 중지 가능)
echo.
pause
echo.
echo Metro 번들러 시작 중...
call npm start

