/**
 * Pink Glow Filter Fragment Shader
 * 핑크 글로우 필터 셰이더
 */

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

