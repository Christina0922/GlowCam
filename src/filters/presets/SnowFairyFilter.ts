import { BaseFilter } from '../engine/BaseFilter';
import { FilterConfig, FilterResult } from '../types';
import { ColorUtils } from '../engine/GPUUtils';

/**
 * Snow Fairy Filter (겨울왕국 감성)
 * - 흰색/라벤더 (#C8B5FF) 오버레이
 * - 눈송이 입자(Particle) 애니메이션
 * - 차가운 화이트 톤(색온도 감소)
 */
export class SnowFairyFilter extends BaseFilter {
  private readonly LAVENDER_COLOR = '#C8B5FF';
  private readonly OVERLAY_OPACITY = 0.15;
  private readonly COLOR_TEMPERATURE_SHIFT = -0.1; // 차가운 톤
  private snowflakes: Array<{ x: number; y: number; size: number; speed: number; rotation: number }> = [];

  constructor() {
    super('snowFairy', '스노우 페어리');
    this.setShaderParam('lavenderColor', ColorUtils.hexToRgb(this.LAVENDER_COLOR));
    this.setShaderParam('overlayOpacity', this.OVERLAY_OPACITY);
    this.setShaderParam('colorTemperatureShift', this.COLOR_TEMPERATURE_SHIFT);
    this.initializeSnowflakes();
  }

  /**
   * 눈송이 입자 초기화
   */
  private initializeSnowflakes(): void {
    this.snowflakes = [];
    // 화면 전체에 눈송이 입자 생성 (약 30개)
    for (let i = 0; i < 30; i++) {
      this.snowflakes.push({
        x: Math.random(),
        y: Math.random(),
        size: 2.0 + Math.random() * 4.0, // 2~6px
        speed: 0.3 + Math.random() * 0.7,
        rotation: Math.random() * Math.PI * 2,
      });
    }
  }

  async applyFilter(frame: any, config: FilterConfig): Promise<FilterResult> {
    try {
      const intensity = config.intensity;
      const lavenderRgb = ColorUtils.hexToRgb(this.LAVENDER_COLOR);

      if (!lavenderRgb) {
        return {
          success: false,
          error: 'Invalid lavender color',
        };
      }

      const processedFrame = await this.processFrameWithSnowEffect(frame, {
        intensity,
        lavenderColor: lavenderRgb,
        overlayOpacity: this.OVERLAY_OPACITY * intensity,
        colorTemperatureShift: this.COLOR_TEMPERATURE_SHIFT * intensity,
        snowflakes: this.snowflakes,
      });

      // 눈송이 애니메이션 업데이트
      this.updateSnowflakes();

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
   * 눈송이 효과 적용
   */
  private async processFrameWithSnowEffect(
    frame: any,
    params: {
      intensity: number;
      lavenderColor: { r: number; g: number; b: number };
      overlayOpacity: number;
      colorTemperatureShift: number;
      snowflakes: Array<{ x: number; y: number; size: number; speed: number; rotation: number }>;
    }
  ): Promise<any> {
    // TODO: 실제 GPU 셰이더 적용
    // 1. 차가운 화이트 톤 적용 (색온도 감소)
    // 2. 라벤더 오버레이
    // 3. 눈송이 입자 렌더링
    
    return frame;
  }

  /**
   * 눈송이 애니메이션 업데이트
   */
  private updateSnowflakes(): void {
    const currentTime = Date.now() * 0.001; // 초 단위

    this.snowflakes.forEach((flake) => {
      // 아래로 떨어지는 애니메이션
      flake.y += flake.speed * 0.001;
      
      // 회전 애니메이션
      flake.rotation += 0.01;
      
      // 화면 밖으로 나가면 위에서 다시 시작
      if (flake.y > 1.0) {
        flake.y = -0.1;
        flake.x = Math.random();
      }
      
      // 좌우로 약간 흔들림
      flake.x += Math.sin(currentTime + flake.rotation) * 0.0005;
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
      uniform vec3 u_lavenderColor;
      uniform float u_overlayOpacity;
      uniform float u_colorTemperatureShift;
      varying vec2 v_texCoord;

      // 눈송이 생성 함수
      float snowflake(vec2 uv, vec2 pos, float size, float rotation) {
        vec2 p = (uv - pos) * u_resolution;
        float angle = rotation;
        float c = cos(angle);
        float s = sin(angle);
        p = vec2(p.x * c - p.y * s, p.x * s + p.y * c);
        
        // 6각형 눈송이 패턴
        float dist = length(p);
        float angle2 = atan(p.y, p.x);
        float pattern = abs(sin(angle2 * 3.0)) * 0.5 + 0.5;
        
        float snow = smoothstep(size * 0.8, size * 0.3, dist) * pattern;
        return snow;
      }

      void main() {
        vec4 color = texture2D(u_texture, v_texCoord);
        
        // 차가운 화이트 톤 (색온도 감소 - 파란색 증가, 빨간색 감소)
        vec3 coolTone = color.rgb;
        coolTone.r += u_colorTemperatureShift * u_intensity;
        coolTone.b -= u_colorTemperatureShift * u_intensity * 0.5;
        
        // 라벤더 오버레이
        vec3 lavenderOverlay = mix(coolTone, u_lavenderColor / 255.0, u_overlayOpacity);
        
        // 눈송이 효과 (프로시저럴 생성)
        vec2 uv = v_texCoord;
        float snow = 0.0;
        
        // 여러 눈송이 생성 (셰이더에서는 프로시저럴로 생성)
        for (float i = 0.0; i < 10.0; i++) {
          float x = fract(sin(i * 12.9898) * 43758.5453);
          float y = fract(sin(i * 78.233) * 43758.5453) + u_time * 0.1;
          float size = 3.0 + sin(i * 5.0) * 2.0;
          float rotation = u_time * 0.5 + i;
          
          snow += snowflake(uv, vec2(x, fract(y)), size, rotation) * 0.3;
        }
        
        // 눈송이 오버레이
        vec3 finalColor = lavenderOverlay + vec3(snow * 0.8);
        
        gl_FragColor = vec4(finalColor, color.a);
      }
    `;
  }
}

