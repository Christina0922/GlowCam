@echo off
chcp 65001 >nul
title android 폴더 만들기
color 0C

echo.
echo ════════════════════════════════════════
echo    android 폴더 생성 (전체 과정)
echo ════════════════════════════════════════
echo.

cd /d "%~dp0"

echo [1/4] 기존 TempProject 정리...
if exist "TempProject" (
    echo TempProject 폴더 삭제 중...
    rmdir /S /Q TempProject
    timeout /t 2 >nul
)
echo ✅ 정리 완료
echo.

echo [2/4] React Native 프로젝트 생성 중...
echo (시간이 걸릴 수 있습니다. 잠시만 기다려주세요...)
echo.

call npx react-native init TempProject --template react-native-template-typescript --skip-install

if errorlevel 1 (
    echo.
    echo ⚠️  첫 번째 방법 실패. 다른 방법 시도 중...
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
echo [3/4] android 폴더 확인...
if not exist "TempProject\android" (
    echo.
    echo ❌ TempProject\android 폴더를 찾을 수 없습니다!
    echo.
    echo TempProject 폴더 내용:
    dir TempProject /B
    echo.
    pause
    exit /b 1
)

echo ✅ android 폴더 발견!
echo.

echo [4/4] android 폴더 복사 중...
if exist "android" (
    echo 기존 android 폴더를 백업합니다...
    if exist "android_backup" rmdir /S /Q android_backup
    move android android_backup
)

xcopy /E /I /Y "TempProject\android" "android"
if errorlevel 1 (
    echo ❌ android 폴더 복사 실패!
    pause
    exit /b 1
)

echo ✅ android 폴더 복사 완료!
echo.

echo [5/5] 임시 프로젝트 정리...
rmdir /S /Q TempProject
echo ✅ 정리 완료

echo.
echo ════════════════════════════════════════
echo    완료!
echo ════════════════════════════════════════
echo.
echo ✅ android 폴더가 생성되었습니다!
echo.
echo 다음 단계:
echo 1. Android Studio 실행
echo 2. File → Open → D:\아이돌\idol-filter-app\android 선택
echo 3. 에뮬레이터 실행
echo 4. Terminal에서: cd D:\아이돌\idol-filter-app
echo 5. Terminal에서: npm start
echo 6. Run 버튼 클릭
echo.
pause

