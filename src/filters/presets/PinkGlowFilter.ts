import { BaseFilter } from '../engine/BaseFilter';
import { FilterConfig, FilterResult } from '../types';
import { ColorUtils } from '../engine/GPUUtils';

/**
 * Pink Glow Filter
 * - 피부톤을 밝게 보정
 * - 채도 +15%
 * - 하이라이트 증가
 * - 전체 화면에 핑크 계열 (#FF7CCB) 미세 오버레이 10%
 */
export class PinkGlowFilter extends BaseFilter {
  private readonly PINK_COLOR = '#FF7CCB';
  private readonly OVERLAY_OPACITY = 0.1; // 10%
  private readonly SATURATION_BOOST = 0.15; // 15%

  constructor() {
    super('pinkGlow', '핑크 글로우');
    this.setShaderParam('pinkColor', ColorUtils.hexToRgb(this.PINK_COLOR));
    this.setShaderParam('overlayOpacity', this.OVERLAY_OPACITY);
    this.setShaderParam('saturationBoost', this.SATURATION_BOOST);
  }

  async applyFilter(frame: any, config: FilterConfig): Promise<FilterResult> {
    try {
      const intensity = config.intensity;
      const pinkRgb = ColorUtils.hexToRgb(this.PINK_COLOR);
      
      if (!pinkRgb) {
        return {
          success: false,
          error: 'Invalid pink color',
        };
      }

      // 실제 구현에서는 GPU 셰이더를 사용하여 처리
      // 여기서는 구조만 정의하고, 실제 셰이더는 shaders 폴더에 추가
      const processedFrame = await this.processFrameWithShader(frame, {
        intensity,
        pinkColor: pinkRgb,
        overlayOpacity: this.OVERLAY_OPACITY * intensity,
        saturationBoost: this.SATURATION_BOOST * intensity,
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
   * 셰이더를 사용한 프레임 처리 (실제 구현은 GPUUtils와 셰이더 코드 필요)
   */
  private async processFrameWithShader(
    frame: any,
    params: {
      intensity: number;
      pinkColor: { r: number; g: number; b: number };
      overlayOpacity: number;
      saturationBoost: number;
    }
  ): Promise<any> {
    // TODO: 실제 GPU 셰이더 적용
    // 1. 프레임을 텍스처로 변환
    // 2. Pink Glow 셰이더 적용
    // 3. 처리된 텍스처 반환
    
    // 현재는 프레임을 그대로 반환 (셰이더 구현 후 교체)
    return frame;
  }

  /**
   * 셰이더 코드 (shaders/PinkGlow.frag에 저장 예정)
   */
  getFragmentShader(): string {
    return `
      precision mediump float;
      uniform sampler2D u_texture;
      uniform vec2 u_resolution;
      uniform float u_intensity;
      uniform vec3 u_pinkColor;
      uniform float u_overlayOpacity;
      uniform float u_saturationBoost;
      varying vec2 v_texCoord;

      void main() {
        vec4 color = texture2D(u_texture, v_texCoord);
        
        // 채도 증가
        float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        vec3 saturated = mix(vec3(gray), color.rgb, 1.0 + u_saturationBoost * u_intensity);
        
        // 하이라이트 증가
        float brightness = max(saturated.r, max(saturated.g, saturated.b));
        vec3 highlighted = saturated + (brightness * 0.2 * u_intensity);
        
        // 핑크 오버레이
        vec3 pinkOverlay = mix(highlighted, u_pinkColor / 255.0, u_overlayOpacity * u_intensity);
        
        // 피부톤 밝게 보정 (Y 채널 증가)
        float luminance = dot(pinkOverlay, vec3(0.299, 0.587, 0.114));
        vec3 brightened = pinkOverlay + (luminance * 0.15 * u_intensity);
        
        gl_FragColor = vec4(brightened, color.a);
      }
    `;
  }
}

