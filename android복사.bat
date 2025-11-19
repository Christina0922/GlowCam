@echo off
chcp 65001 >nul
title android 폴더 복사
color 0A

echo.
echo ════════════════════════════════════════
echo    android 폴더 복사 중...
echo ════════════════════════════════════════
echo.

cd /d "%~dp0"

echo [1/2] TempProject\android 폴더 확인...
if not exist "TempProject\android" (
    echo.
    echo ❌ TempProject\android 폴더를 찾을 수 없습니다!
    echo.
    echo TempProject 폴더 내용 확인 중...
    dir TempProject
    echo.
    echo React Native 프로젝트가 제대로 생성되지 않았을 수 있습니다.
    echo.
    echo 다음 명령을 수동으로 실행하세요:
    echo   cd D:\아이돌\idol-filter-app
    echo   npx react-native init TempProject --template react-native-template-typescript
    echo   xcopy /E /I /Y TempProject\android android
    echo.
    pause
    exit /b 1
)

echo ✅ TempProject\android 폴더 발견!
echo.

echo [2/2] android 폴더 복사 중...
if exist "android" (
    echo 기존 android 폴더가 있습니다.
    echo 백업할까요? (Y/N)
    set /p BACKUP="   > "
    if /i "%BACKUP%"=="Y" (
        if exist "android_backup" rmdir /S /Q android_backup
        move android android_backup
        echo ✅ 기존 android 폴더를 android_backup으로 백업했습니다.
    ) else (
        echo 기존 android 폴더를 삭제합니다...
        rmdir /S /Q android
    )
)

xcopy /E /I /Y "TempProject\android" "android"
if errorlevel 1 (
    echo.
    echo ❌ android 폴더 복사 실패!
    pause
    exit /b 1
)

echo.
echo ✅ android 폴더 복사 완료!
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

