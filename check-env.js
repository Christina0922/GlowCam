/**
 * 환경 설정 체크 스크립트
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('====================================');
console.log('  환경 설정 체크');
console.log('====================================\n');

let hasError = false;

// 1. Node.js 버전 체크
console.log('[1] Node.js 버전 확인...');
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf-8' }).trim();
  const majorVersion = parseInt(nodeVersion.replace('v', '').split('.')[0]);
  if (majorVersion >= 18) {
    console.log(`✅ Node.js ${nodeVersion} (OK)\n`);
  } else {
    console.log(`❌ Node.js ${nodeVersion} (v18 이상 필요)\n`);
    hasError = true;
  }
} catch (error) {
  console.log('❌ Node.js를 찾을 수 없습니다\n');
  hasError = true;
}

// 2. npm 버전 체크
console.log('[2] npm 버전 확인...');
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf-8' }).trim();
  console.log(`✅ npm ${npmVersion}\n`);
} catch (error) {
  console.log('❌ npm을 찾을 수 없습니다\n');
  hasError = true;
}

// 3. Java 체크
console.log('[3] Java 설치 확인...');
try {
  const javaVersion = execSync('java -version', { encoding: 'utf-8', stdio: 'pipe' });
  console.log('✅ Java 설치됨\n');
} catch (error) {
  console.log('❌ Java를 찾을 수 없습니다 (JDK 17 이상 필요)\n');
  hasError = true;
}

// 4. Android SDK 체크
console.log('[4] Android SDK 확인...');
const androidHome = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
if (androidHome) {
  const sdkPath = path.join(androidHome, 'platform-tools', 'adb');
  if (fs.existsSync(sdkPath) || fs.existsSync(sdkPath + '.exe')) {
    console.log(`✅ Android SDK: ${androidHome}\n`);
  } else {
    console.log(`⚠️  Android SDK 경로는 설정되었지만 adb를 찾을 수 없습니다\n`);
  }
} else {
  console.log('❌ ANDROID_HOME 환경변수가 설정되지 않았습니다\n');
  console.log('   Android Studio 설치 후 환경변수를 설정하세요\n');
  hasError = true;
}

// 5. adb 체크
console.log('[5] adb (Android Debug Bridge) 확인...');
try {
  const adbVersion = execSync('adb version', { encoding: 'utf-8' });
  console.log('✅ adb 사용 가능\n');
} catch (error) {
  console.log('❌ adb를 찾을 수 없습니다\n');
  hasError = true;
}

// 6. 연결된 기기 체크
console.log('[6] 연결된 Android 기기/에뮬레이터 확인...');
try {
  const devices = execSync('adb devices', { encoding: 'utf-8' });
  const deviceCount = (devices.match(/device$/gm) || []).length;
  if (deviceCount > 0) {
    console.log(`✅ ${deviceCount}개의 기기가 연결되어 있습니다\n`);
  } else {
    console.log('⚠️  연결된 기기가 없습니다\n');
    console.log('   Android Studio에서 에뮬레이터를 실행하거나\n');
    console.log('   USB로 실제 기기를 연결하세요\n');
  }
} catch (error) {
  console.log('⚠️  adb devices 실행 실패\n');
}

// 7. 프로젝트 구조 체크
console.log('[7] 프로젝트 구조 확인...');
const requiredFiles = [
  'package.json',
  'index.js',
  'src/App.tsx',
  'src/filters/engine/FilterEngine.ts',
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  if (!fs.existsSync(path.join(__dirname, file))) {
    console.log(`❌ ${file} 파일이 없습니다`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('✅ 프로젝트 구조 정상\n');
} else {
  hasError = true;
}

// 8. node_modules 체크
console.log('[8] 의존성 설치 확인...');
if (fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('✅ node_modules 폴더 존재\n');
} else {
  console.log('⚠️  node_modules 폴더가 없습니다\n');
  console.log('   npm install을 실행하세요\n');
}

// 결과 요약
console.log('====================================');
if (hasError) {
  console.log('❌ 일부 설정이 완료되지 않았습니다');
  console.log('   실행가이드.md 파일을 참고하세요');
} else {
  console.log('✅ 환경 설정이 완료되었습니다!');
  console.log('   npm start로 Metro 번들러를 시작하고');
  console.log('   npm run android로 앱을 실행하세요');
}
console.log('====================================\n');

