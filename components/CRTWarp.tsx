'use client';

import React, { useEffect, useRef } from 'react';

export interface CRTWarpProps {
  color?: string;
  backgroundColor?: string;
  speed?: number;
  curvature?: number;
  scanlineStrength?: number;
  scanlineFrequency?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  bloom?: number;
  bloomRadius?: number;
  noise?: number;
  vignette?: number;
  brightness?: number;
  pixelation?: number;
  rgbShift?: number;
  mouseReact?: boolean;
  mouseStrength?: number;
  dpr?: number;
  fps?: number;
  paused?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const vertexShaderSource = `
attribute vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_color;
uniform vec3 u_backgroundColor;
uniform float u_speed;
uniform float u_curvature;
uniform float u_scanlineStrength;
uniform float u_scanlineFrequency;
uniform float u_waveAmplitude;
uniform float u_waveFrequency;
uniform float u_bloom;
uniform float u_noise;
uniform float u_vignette;
uniform float u_brightness;
uniform float u_rgbShift;
uniform float u_mouseStrength;

vec2 curveUV(vec2 uv, float curvature) {
    vec2 st = uv - 0.5;
    float r2 = dot(st, st);
    vec2 warped = st * (1.0 + curvature * r2 * 2.0);
    return warped + 0.5;
}

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

vec3 sampleScene(vec2 uv, float t) {
    float wave = sin(uv.y * u_waveFrequency * 6.0 + t * u_speed * 2.0) * u_waveAmplitude * 0.03;
    vec2 p = uv;
    p.x += wave;

    vec2 m = u_mouse * 0.05 * u_mouseStrength;
    p += m;

    float gx = smoothstep(0.05, 0.0, abs(fract(p.x * 16.0) - 0.5));
    float gy = smoothstep(0.05, 0.0, abs(fract(p.y * 16.0) - 0.5));
    float grid = max(gx, gy) * 0.35;

    float raster = exp(-abs(p.y - 0.5 + sin(p.x * 3.0 + t * u_speed * 1.5) * 0.2) * 5.0) * u_bloom;
    
    float ambient = 0.08;
    float intensity = clamp(grid + raster + ambient, 0.0, 1.0);
    return mix(u_backgroundColor, u_color, intensity);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    vec2 warpedUV = curveUV(uv, u_curvature);
    
    if (warpedUV.x < 0.0 || warpedUV.x > 1.0 || warpedUV.y < 0.0 || warpedUV.y > 1.0) {
        gl_FragColor = vec4(u_backgroundColor, 1.0);
        return;
    }

    float t = u_time;

    float shift = u_rgbShift * 0.04;
    vec3 col;
    col.r = sampleScene(warpedUV + vec2(shift, 0.0), t).r;
    col.g = sampleScene(warpedUV, t).g;
    col.b = sampleScene(warpedUV - vec2(shift, 0.0), t).b;

    float scan = sin(warpedUV.y * u_scanlineFrequency * 3.14159);
    scan = 0.5 + 0.5 * scan;
    float scanMod = 1.0 - (1.0 - scan) * u_scanlineStrength;
    col *= scanMod;

    float grain = (hash(gl_FragCoord.xy + fract(t * 10.0)) - 0.5) * u_noise;
    col += vec3(grain);

    float vig = warpedUV.x * warpedUV.y * (1.0 - warpedUV.x) * (1.0 - warpedUV.y);
    float vignetteFactor = clamp(16.0 * vig, 0.0, 1.0);
    if (u_vignette > 0.0) {
        col *= pow(vignetteFactor, u_vignette * 0.5);
    }

    col *= u_brightness;

    gl_FragColor = vec4(col, 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(cleanHex, 16);
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
}

export default function CRTWarp({
  color = '#8035a0',
  backgroundColor = '#05010a',
  speed = 0.5,
  curvature = 0.25,
  scanlineStrength = 0.25,
  scanlineFrequency = 200,
  waveAmplitude = 0.3,
  waveFrequency = 2.5,
  bloom = 1.5,
  noise = 0.1,
  vignette = 0,
  brightness = 1.25,
  rgbShift = 0.015,
  mouseReact = true,
  mouseStrength = 0.5,
  dpr = 1,
  fps = 30,
  paused = false,
  className = '',
  style = {},
}: CRTWarpProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) {
      console.warn('WebGL not supported for CRTWarp');
      return;
    }

    function createShader(type: number, source: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error(gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      mouse: gl.getUniformLocation(program, 'u_mouse'),
      color: gl.getUniformLocation(program, 'u_color'),
      backgroundColor: gl.getUniformLocation(program, 'u_backgroundColor'),
      speed: gl.getUniformLocation(program, 'u_speed'),
      curvature: gl.getUniformLocation(program, 'u_curvature'),
      scanlineStrength: gl.getUniformLocation(program, 'u_scanlineStrength'),
      scanlineFrequency: gl.getUniformLocation(program, 'u_scanlineFrequency'),
      waveAmplitude: gl.getUniformLocation(program, 'u_waveAmplitude'),
      waveFrequency: gl.getUniformLocation(program, 'u_waveFrequency'),
      bloom: gl.getUniformLocation(program, 'u_bloom'),
      noise: gl.getUniformLocation(program, 'u_noise'),
      vignette: gl.getUniformLocation(program, 'u_vignette'),
      brightness: gl.getUniformLocation(program, 'u_brightness'),
      rgbShift: gl.getUniformLocation(program, 'u_rgbShift'),
      mouseStrength: gl.getUniformLocation(program, 'u_mouseStrength'),
    };

    let animationFrameId: number;
    let lastTime = 0;
    const interval = 1000 / fps;

    function resize() {
      if (!canvas || !containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const targetDpr = Math.min(window.devicePixelRatio || 1, dpr);
      canvas.width = width * targetDpr;
      canvas.height = height * targetDpr;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseReact || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const fgRgb = hexToRgb(color);
    const bgRgb = hexToRgb(backgroundColor);

    function render(time: number) {
      if (!paused && gl && program) {
        if (time - lastTime >= interval) {
          lastTime = time;
          gl.useProgram(program);

          gl.uniform2f(uniforms.resolution, canvas!.width, canvas!.height);
          gl.uniform1f(uniforms.time, time * 0.001);
          gl.uniform2f(uniforms.mouse, mouseRef.current.x, mouseRef.current.y);
          gl.uniform3f(uniforms.color, fgRgb[0], fgRgb[1], fgRgb[2]);
          gl.uniform3f(uniforms.backgroundColor, bgRgb[0], bgRgb[1], bgRgb[2]);
          gl.uniform1f(uniforms.speed, speed);
          gl.uniform1f(uniforms.curvature, curvature);
          gl.uniform1f(uniforms.scanlineStrength, scanlineStrength);
          gl.uniform1f(uniforms.scanlineFrequency, scanlineFrequency);
          gl.uniform1f(uniforms.waveAmplitude, waveAmplitude);
          gl.uniform1f(uniforms.waveFrequency, waveFrequency);
          gl.uniform1f(uniforms.bloom, bloom);
          gl.uniform1f(uniforms.noise, noise);
          gl.uniform1f(uniforms.vignette, vignette);
          gl.uniform1f(uniforms.brightness, brightness);
          gl.uniform1f(uniforms.rgbShift, rgbShift);
          gl.uniform1f(uniforms.mouseStrength, mouseStrength);

          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
      }
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, [
    color,
    backgroundColor,
    speed,
    curvature,
    scanlineStrength,
    scanlineFrequency,
    waveAmplitude,
    waveFrequency,
    bloom,
    noise,
    vignette,
    brightness,
    rgbShift,
    mouseReact,
    mouseStrength,
    dpr,
    fps,
    paused,
  ]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
