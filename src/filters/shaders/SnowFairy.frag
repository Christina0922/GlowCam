/**
 * Snow Fairy Filter Fragment Shader
 * 스노우 페어리 필터 셰이더
 */

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

