@echo off
chcp 65001 >nul
title Android Studio에서 실행하기
color 0B

echo.
echo ════════════════════════════════════════
echo    Android Studio에서 앱 실행하기
echo ════════════════════════════════════════
echo.

cd /d "%~dp0"

echo [1/4] android 폴더 확인...
if not exist "android" (
    echo.
    echo ❌ android 폴더가 없습니다!
    echo.
    echo React Native 프로젝트를 초기화해야 합니다.
    echo.
    echo 다음 명령을 실행하세요:
    echo   npx react-native init TempProject
    echo   (TempProject/android 폴더를 여기로 복사)
    echo.
    echo 또는 AndroidStudio에서실행하기.md 파일을 참고하세요.
    echo.
    pause
    exit /b 1
) else (
    echo ✅ android 폴더 존재
)
echo.

echo [2/4] Android Studio 경로 확인...
set "AS_PATH="
if exist "C:\Program Files\Android\Android Studio\bin\studio64.exe" (
    set "AS_PATH=C:\Program Files\Android\Android Studio\bin\studio64.exe"
) else if exist "C:\Program Files (x86)\Android\Android Studio\bin\studio64.exe" (
    set "AS_PATH=C:\Program Files (x86)\Android\Android Studio\bin\studio64.exe"
) else (
    echo ⚠️  Android Studio 기본 경로를 찾을 수 없습니다.
    echo    수동으로 Android Studio를 열어주세요.
    echo.
    echo    열 폴더: %CD%\android
    echo.
)

echo [3/4] Metro 번들러 준비...
if not exist "node_modules" (
    echo node_modules 폴더가 없습니다. 설치를 시작합니다...
    call npm install
    if errorlevel 1 (
        echo ❌ 의존성 설치 실패!
        pause
        exit /b 1
    )
) else (
    echo ✅ node_modules 폴더 존재
)
echo.

echo [4/4] 안내...
echo.
echo ════════════════════════════════════════
echo    다음 단계를 따라주세요:
echo ════════════════════════════════════════
echo.
echo 1. Android Studio에서 다음 폴더를 엽니다:
echo    %CD%\android
echo.
if defined AS_PATH (
    echo 2. Android Studio를 자동으로 열까요? (Y/N)
    set /p OPEN_AS="   > "
    if /i "%OPEN_AS%"=="Y" (
        echo.
        echo Android Studio 실행 중...
        start "" "%AS_PATH%" "%CD%\android"
    )
) else (
    echo 2. Android Studio를 수동으로 열어주세요.
    echo    File → Open → %CD%\android
    echo.
)
echo.
echo 3. Android Studio에서:
echo    - Device Manager에서 에뮬레이터 실행
echo    - Terminal 탭에서: npm start
echo    - Run 버튼 (▶️) 클릭
echo.
echo 4. 또는 이 창에서 Metro 번들러를 시작할까요? (Y/N)
set /p START_METRO="   > "
if /i "%START_METRO%"=="Y" (
    echo.
    echo Metro 번들러 시작 중...
    echo (Ctrl+C로 중지)
    echo.
    call npm start
) else (
    echo.
    echo Android Studio Terminal에서 npm start를 실행하세요.
    echo.
    pause
)

