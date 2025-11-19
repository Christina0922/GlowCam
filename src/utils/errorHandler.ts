/**
 * 에러 처리 유틸리티
 */

export class FilterError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'FilterError';
  }
}

/**
 * 필터 적용 에러 처리
 */
export function handleFilterError(error: unknown): string {
  if (error instanceof FilterError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return '알 수 없는 오류가 발생했습니다.';
}

/**
 * 영상 처리 에러 처리
 */
export function handleVideoError(error: unknown): string {
  if (error instanceof Error) {
    // 특정 에러 타입별 메시지
    if (error.message.includes('permission')) {
      return '저장 권한이 필요합니다.';
    }
    if (error.message.includes('format')) {
      return '지원하지 않는 영상 포맷입니다.';
    }
    if (error.message.includes('memory')) {
      return '메모리가 부족합니다.';
    }
    return error.message;
  }
  
  return '영상 처리 중 오류가 발생했습니다.';
}

/**
 * 카메라 에러 처리
 */
export function handleCameraError(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('permission')) {
      return '카메라 권한이 필요합니다.';
    }
    if (error.message.includes('device')) {
      return '카메라를 찾을 수 없습니다.';
    }
    return error.message;
  }
  
  return '카메라 오류가 발생했습니다.';
}

