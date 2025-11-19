@echo off
chcp 65001 >nul
title android 폴더 생성
color 0E

echo.
echo ════════════════════════════════════════
echo    android 폴더 생성 중...
echo ════════════════════════════════════════
echo.

cd /d "%~dp0"

echo [1/3] React Native 프로젝트 초기화 중...
echo (임시 프로젝트를 생성하여 android 폴더를 가져옵니다)
echo.

if exist "TempProject" (
    echo 기존 TempProject 폴더 삭제 중...
    rmdir /S /Q TempProject
)

echo 새 프로젝트 생성 중... (시간이 걸릴 수 있습니다)
call npx react-native init TempProject --template react-native-template-typescript --skip-install

if errorlevel 1 (
    echo.
    echo ❌ 프로젝트 생성 실패!
    echo.
    echo 다른 방법을 시도합니다...
    call npx @react-native-community/cli init TempProject --skip-install
    if errorlevel 1 (
        echo.
        echo ❌ 프로젝트 생성 실패!
        echo.
        echo 수동으로 다음 명령을 실행하세요:
        echo   npx react-native init TempProject
        echo.
        pause
        exit /b 1
    )
)

echo.
echo [2/3] android 폴더 복사 중...
if exist "TempProject\android" (
    if exist "android" (
        echo 기존 android 폴더 백업 중...
        if exist "android_backup" rmdir /S /Q android_backup
        move android android_backup
    )
    xcopy /E /I /Y "TempProject\android" "android"
    if errorlevel 1 (
        echo ❌ android 폴더 복사 실패!
        pause
        exit /b 1
    )
    echo ✅ android 폴더 생성 완료!
) else (
    echo ❌ TempProject\android 폴더를 찾을 수 없습니다!
    pause
    exit /b 1
)

echo.
echo [3/3] 임시 프로젝트 정리 중...
rmdir /S /Q TempProject
echo ✅ 정리 완료

echo.
echo ════════════════════════════════════════
echo    완료!
echo ════════════════════════════════════════
echo.
echo 이제 Android Studio에서 다음 폴더를 열 수 있습니다:
echo   %CD%\android
echo.
echo 다음 단계:
echo 1. Android Studio 실행
echo 2. File → Open → D:\아이돌\idol-filter-app\android 선택
echo 3. 에뮬레이터 실행
echo 4. Terminal에서: npm start
echo 5. Run 버튼 클릭
echo.
pause

