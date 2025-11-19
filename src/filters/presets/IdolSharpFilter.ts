import { BaseFilter } from '../engine/BaseFilter';
import { FilterConfig, FilterResult } from '../types';

/**
 * Idol Sharp Filter
 * - 눈매 강조 (경계 약간 강화)
 * - 컨트라스트 소폭 상향
 * - 선명도 20% 증가
 * - 블러 + 샤픈 조합
 */
export class IdolSharpFilter extends BaseFilter {
  private readonly SHARPNESS_BOOST = 0.2; // 20%
  private readonly CONTRAST_BOOST = 0.15;
  private readonly EDGE_ENHANCE = 0.3;

  constructor() {
    super('idolSharp', '아이돌 샤프');
    this.setShaderParam('sharpnessBoost', this.SHARPNESS_BOOST);
    this.setShaderParam('contrastBoost', this.CONTRAST_BOOST);
    this.setShaderParam('edgeEnhance', this.EDGE_ENHANCE);
  }

  async applyFilter(frame: any, config: FilterConfig): Promise<FilterResult> {
    try {
      const intensity = config.intensity;

      const processedFrame = await this.processFrameWithSharpening(frame, {
        intensity,
        sharpnessBoost: this.SHARPNESS_BOOST * intensity,
        contrastBoost: this.CONTRAST_BOOST * intensity,
        edgeEnhance: this.EDGE_ENHANCE * intensity,
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
   * 샤프닝 및 눈매 강조 처리
   */
  private async processFrameWithSharpening(
    frame: any,
    params: {
      intensity: number;
      sharpnessBoost: number;
      contrastBoost: number;
      edgeEnhance: number;
    }
  ): Promise<any> {
    // TODO: 실제 GPU 셰이더 적용
    // 1. 언샤프 마스킹 (Unsharp Masking)
    // 2. 경계 감지 및 강화 (특히 눈 영역)
    // 3. 컨트라스트 증가
    
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
      uniform float u_sharpnessBoost;
      uniform float u_contrastBoost;
      uniform float u_edgeEnhance;
      varying vec2 v_texCoord;

      // 언샤프 마스킹
      vec4 unsharpMask(sampler2D tex, vec2 uv) {
        vec2 pixelSize = 1.0 / u_resolution;
        
        // 중앙 픽셀
        vec4 center = texture2D(tex, uv);
        
        // 주변 픽셀 샘플링
        vec4 top = texture2D(tex, uv + vec2(0.0, -pixelSize.y));
        vec4 bottom = texture2D(tex, uv + vec2(0.0, pixelSize.y));
        vec4 left = texture2D(tex, uv + vec2(-pixelSize.x, 0.0));
        vec4 right = texture2D(tex, uv + vec2(pixelSize.x, 0.0));
        
        // 블러 (평균)
        vec4 blurred = (top + bottom + left + right + center) / 5.0;
        
        // 언샤프 마스크 = 원본 - 블러
        return center + (center - blurred) * u_sharpnessBoost;
      }

      // 경계 감지 (Sobel 필터)
      float edgeDetection(sampler2D tex, vec2 uv) {
        vec2 pixelSize = 1.0 / u_resolution;
        
        float tl = dot(texture2D(tex, uv + vec2(-pixelSize.x, -pixelSize.y)).rgb, vec3(0.299, 0.587, 0.114));
        float tm = dot(texture2D(tex, uv + vec2(0.0, -pixelSize.y)).rgb, vec3(0.299, 0.587, 0.114));
        float tr = dot(texture2D(tex, uv + vec2(pixelSize.x, -pixelSize.y)).rgb, vec3(0.299, 0.587, 0.114));
        float ml = dot(texture2D(tex, uv + vec2(-pixelSize.x, 0.0)).rgb, vec3(0.299, 0.587, 0.114));
        float mc = dot(texture2D(tex, uv).rgb, vec3(0.299, 0.587, 0.114));
        float mr = dot(texture2D(tex, uv + vec2(pixelSize.x, 0.0)).rgb, vec3(0.299, 0.587, 0.114));
        float bl = dot(texture2D(tex, uv + vec2(-pixelSize.x, pixelSize.y)).rgb, vec3(0.299, 0.587, 0.114));
        float bm = dot(texture2D(tex, uv + vec2(0.0, pixelSize.y)).rgb, vec3(0.299, 0.587, 0.114));
        float br = dot(texture2D(tex, uv + vec2(pixelSize.x, pixelSize.y)).rgb, vec3(0.299, 0.587, 0.114));
        
        float gx = -tl - 2.0*tm - tr + bl + 2.0*bm + br;
        float gy = -tl - 2.0*ml - bl + tr + 2.0*mr + br;
        
        return sqrt(gx*gx + gy*gy);
      }

      void main() {
        vec2 uv = v_texCoord;
        
        // 언샤프 마스킹으로 선명도 증가
        vec4 sharpened = unsharpMask(u_texture, uv);
        
        // 경계 감지
        float edge = edgeDetection(u_texture, uv);
        float edgeStrength = smoothstep(0.1, 0.3, edge);
        
        // 경계 강화 (특히 눈매 영역)
        vec3 edgeEnhanced = sharpened.rgb + vec3(edgeStrength * u_edgeEnhance * u_intensity);
        
        // 컨트라스트 증가
        vec3 contrast = (edgeEnhanced - 0.5) * (1.0 + u_contrastBoost * u_intensity) + 0.5;
        
        gl_FragColor = vec4(contrast, sharpened.a);
      }
    `;
  }
}

