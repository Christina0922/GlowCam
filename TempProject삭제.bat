@echo off
chcp 65001 >nul
title TempProject 폴더 강제 삭제
color 0C

echo.
echo ════════════════════════════════════════
echo    TempProject 폴더 강제 삭제
echo ════════════════════════════════════════
echo.
echo ⚠️  이 스크립트는 관리자 권한이 필요할 수 있습니다.
echo.
pause

cd /d "%~dp0"

echo [1/3] Android Studio 프로세스 확인...
tasklist | findstr /i "studio64.exe" >nul
if %errorlevel% == 0 (
    echo ⚠️  Android Studio가 실행 중입니다.
    echo    Android Studio를 완전히 종료하고 다시 시도하세요.
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Android Studio가 실행 중이 아닙니다.
)
echo.

echo [2/3] Java/Gradle 프로세스 확인...
tasklist | findstr /i "java.exe" >nul
if %errorlevel% == 0 (
    echo ⚠️  Java 프로세스가 실행 중입니다.
    echo    Java 프로세스를 종료할까요? (Y/N)
    set /p KILL_JAVA="   > "
    if /i "%KILL_JAVA%"=="Y" (
        taskkill /F /IM java.exe /T 2>nul
        echo ✅ Java 프로세스 종료 완료
    )
) else (
    echo ✅ Java 프로세스 없음
)
echo.

echo [3/3] TempProject 폴더 삭제 시도...
if exist "TempProject" (
    echo TempProject 폴더 발견. 삭제 시도 중...
    
    REM 속성 제거 시도
    attrib -r -s -h "TempProject\*.*" /S /D 2>nul
    
    REM 삭제 시도
    rmdir /S /Q "TempProject" 2>nul
    
    if exist "TempProject" (
        echo.
        echo ❌ 삭제 실패!
        echo.
        echo 다음 방법을 시도하세요:
        echo 1. 이 배치 파일을 관리자 권한으로 실행 (우클릭 → 관리자 권한으로 실행)
        echo 2. 파일 탐색기에서 수동으로 삭제
        echo 3. 컴퓨터 재시작 후 삭제
        echo.
        echo 또는 TempProject는 무시하고 다음 프로젝트만 사용하세요:
        echo   D:\GlowCam\idol-filter-app\android
        echo.
    ) else (
        echo ✅ TempProject 폴더 삭제 완료!
    )
) else (
    echo ✅ TempProject 폴더가 이미 없습니다.
)
echo.

echo ════════════════════════════════════════
echo    완료
echo ════════════════════════════════════════
echo.
pause

