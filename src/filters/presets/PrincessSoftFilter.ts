import { BaseFilter } from '../engine/BaseFilter';
import { FilterConfig, FilterResult } from '../types';

/**
 * Princess Soft Filter
 * - 부드러운 블러(Soft blur)
 * - 화이트 톤 강화
 * - 배경 흐림 + 피부 선명 효과
 */
export class PrincessSoftFilter extends BaseFilter {
  private readonly BLUR_RADIUS = 2.0;
  private readonly WHITE_TONE_BOOST = 0.15;

  constructor() {
    super('princessSoft', '공주 소프트');
    this.setShaderParam('blurRadius', this.BLUR_RADIUS);
    this.setShaderParam('whiteToneBoost', this.WHITE_TONE_BOOST);
  }

  async applyFilter(frame: any, config: FilterConfig): Promise<FilterResult> {
    try {
      const intensity = config.intensity;

      const processedFrame = await this.processFrameWithSoftBlur(frame, {
        intensity,
        blurRadius: this.BLUR_RADIUS * intensity,
        whiteToneBoost: this.WHITE_TONE_BOOST * intensity,
      });

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
   * 소프트 블러 및 화이트 톤 강화 처리
   */
  private async processFrameWithSoftBlur(
    frame: any,
    params: {
      intensity: number;
      blurRadius: number;
      whiteToneBoost: number;
    }
  ): Promise<any> {
    // TODO: 실제 GPU 셰이더 적용
    // 1. 가우시안 블러 적용 (배경)
    // 2. 얼굴 영역 감지 및 선명도 유지
    // 3. 화이트 톤 강화
    
    return frame;
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
      uniform float u_blurRadius;
      uniform float u_whiteToneBoost;
      varying vec2 v_texCoord;

      // 가우시안 블러 샘플링
      vec4 gaussianBlur(sampler2D tex, vec2 uv, float radius) {
        vec4 color = vec4(0.0);
        float total = 0.0;
        
        for (float x = -2.0; x <= 2.0; x++) {
          for (float y = -2.0; y <= 2.0; y++) {
            vec2 offset = vec2(x, y) * radius / u_resolution;
            float weight = exp(-(x*x + y*y) / 2.0);
            color += texture2D(tex, uv + offset) * weight;
            total += weight;
          }
        }
        
        return color / total;
      }

      void main() {
        vec2 uv = v_texCoord;
        
        // 원본 색상
        vec4 original = texture2D(u_texture, uv);
        
        // 블러 적용 (배경 효과)
        vec4 blurred = gaussianBlur(u_texture, uv, u_blurRadius * u_intensity);
        
        // 얼굴 영역 감지 (간단한 밝기 기반, 실제로는 얼굴 인식 필요)
        float skinTone = dot(original.rgb, vec3(0.299, 0.587, 0.114));
        float isSkin = step(0.4, skinTone) * step(skinTone, 0.9);
        
        // 피부는 선명하게, 배경은 블러
        vec4 mixed = mix(blurred, original, isSkin * 0.7 + 0.3);
        
        // 화이트 톤 강화
        float whiteComponent = min(mixed.r, min(mixed.g, mixed.b));
        vec3 whiteBoosted = mixed.rgb + vec3(whiteComponent * u_whiteToneBoost * u_intensity);
        
        // 부드러운 톤 조정
        vec3 softTone = mix(whiteBoosted, vec3(1.0), 0.05 * u_intensity);
        
        gl_FragColor = vec4(softTone, original.a);
      }
    `;
  }
}

