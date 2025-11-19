/**
 * Fairy Glitter Filter Fragment Shader
 * 페어리 글리터 필터 셰이더
 */

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

