import { BaseFilter } from '../engine/BaseFilter';
import { FilterConfig, FilterResult } from '../types';

/**
 * Fairy Glitter Filter
 * - 하이라이트 부분에 미세한 별반짝 효과
 * - 화면 전체에 0.5~1.5px 글리터(랜덤)
 * - 움직임 감지 시 반짝 모션 증가
 */
export class FairyGlitterFilter extends BaseFilter {
  private glitterParticles: Array<{ x: number; y: number; size: number; opacity: number }> = [];
  private lastFrameTime: number = 0;
  private motionDetected: boolean = false;

  constructor() {
    super('fairyGlitter', '페어리 글리터');
    this.initializeGlitterParticles();
  }

  /**
   * 글리터 입자 초기화
   */
  private initializeGlitterParticles(): void {
    this.glitterParticles = [];
    // 화면 전체에 랜덤 글리터 입자 생성 (약 50개)
    for (let i = 0; i < 50; i++) {
      this.glitterParticles.push({
        x: Math.random(),
        y: Math.random(),
        size: 0.5 + Math.random() * 1.0, // 0.5~1.5px
        opacity: 0.3 + Math.random() * 0.7,
      });
    }
  }

  async applyFilter(frame: any, config: FilterConfig): Promise<FilterResult> {
    try {
      const intensity = config.intensity;
      const currentTime = Date.now();

      // 움직임 감지 (간단한 프레임 차이 기반)
      // 실제로는 더 정교한 모션 감지 알고리즘 필요
      if (this.lastFrameTime > 0) {
        const timeDiff = currentTime - this.lastFrameTime;
        this.motionDetected = timeDiff < 50; // 빠른 프레임 변화 = 움직임
      }
      this.lastFrameTime = currentTime;

      // 움직임이 감지되면 글리터 효과 강화
      const motionMultiplier = this.motionDetected ? 1.5 : 1.0;

      const processedFrame = await this.processFrameWithGlitter(frame, {
        intensity,
        particles: this.glitterParticles,
        motionMultiplier,
      });

      // 입자 애니메이션 업데이트
      this.updateParticles();

      return {
        success: true,
        processedFrame,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * 글리터 효과 적용
   */
  private async processFrameWithGlitter(
    frame: any,
    params: {
      intensity: number;
      particles: Array<{ x: number; y: number; size: number; opacity: number }>;
      motionMultiplier: number;
    }
  ): Promise<any> {
    // TODO: 실제 GPU 셰이더 적용
    // 1. 하이라이트 영역 감지
    // 2. 글리터 입자를 하이라이트 영역에 오버레이
    // 3. 움직임에 따라 반짝임 강도 조절
    
    return frame;
  }

  /**
   * 입자 애니메이션 업데이트
   */
  private updateParticles(): void {
    this.glitterParticles.forEach((particle) => {
      // 약간의 움직임 추가 (부유 효과)
      particle.x += (Math.random() - 0.5) * 0.001;
      particle.y += (Math.random() - 0.5) * 0.001;
      
      // 경계 체크 및 재배치
      if (particle.x < 0 || particle.x > 1) particle.x = Math.random();
      if (particle.y < 0 || particle.y > 1) particle.y = Math.random();
      
      // 투명도 펄스 효과
      particle.opacity = 0.3 + Math.sin(Date.now() * 0.005 + particle.x * 10) * 0.3;
    });
  }

  /**
   * 셰이더 코드
   */
  getFragmentShader(): string {
    return `
      precision mediump float;
      uniform sampler2D u_texture;
      uniform vec2 u_resolution;
      uniform float u_intensity;
      uniform float u_time;
      uniform float u_motionMultiplier;
      varying vec2 v_texCoord;

      // 하이라이트 감지 및 글리터 생성
      float getGlitter(vec2 uv) {
        // 랜덤 노이즈 기반 글리터
        vec2 grid = floor(uv * 100.0);
        vec2 gridUV = fract(uv * 100.0);
        
        float random = fract(sin(dot(grid, vec2(12.9898, 78.233))) * 43758.5453);
        float sparkle = step(0.98, random) * step(0.3, gridUV.x) * step(0.3, gridUV.y);
        
        // 시간 기반 펄스
        float pulse = sin(u_time * 2.0 + random * 10.0) * 0.5 + 0.5;
        
        return sparkle * pulse * u_intensity * u_motionMultiplier;
      }

      void main() {
        vec4 color = texture2D(u_texture, v_texCoord);
        
        // 하이라이트 감지
        float brightness = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        float highlight = step(0.7, brightness);
        
        // 글리터 효과
        float glitter = getGlitter(v_texCoord) * highlight;
        vec3 glitterColor = vec3(1.0, 1.0, 1.0); // 흰색 글리터
        
        // 하이라이트 영역에만 글리터 적용
        vec3 finalColor = color.rgb + glitterColor * glitter * 0.8;
        
        gl_FragColor = vec4(finalColor, color.a);
      }
    `;
  }
}

