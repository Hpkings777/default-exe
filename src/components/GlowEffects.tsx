import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const GlowEffect: React.FC<{
  children: React.ReactNode;
  intensity?: number;
  color?: string;
  blur?: number;
  className?: string;
}> = ({ children, intensity = 1, color = "#00ffff", blur = 20, className }) => {
  const filterId = React.useId();
  
  return (
    <div className={className} style={{ position: "relative", display: "inline-block" }}>
      <div
        style={{
          position: "absolute",
          inset: -blur,
          filter: `url(#glow-${filterId})`,
          opacity: intensity,
          pointerEvents: "none",
        }}
      >
        {children}
      </div>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id={`glow-${filterId}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={blur / 2} result="blur" />
            <feFlood floodColor={color} floodOpacity={0.8} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  );
};

export const PulsingGlow: React.FC<{
  children: React.ReactNode;
  color?: string;
  minIntensity?: number;
  maxIntensity?: number;
  speed?: number;
}> = ({ children, color = "#00ffff", minIntensity = 0.3, maxIntensity = 1, speed = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const intensity = interpolate(
    Math.sin((frame / fps) * speed * Math.PI),
    [-1, 1],
    [minIntensity, maxIntensity]
  );
  
  return (
    <GlowEffect intensity={intensity} color={color} blur={30}>
      {children}
    </GlowEffect>
  );
};

export const GradientGlow: React.FC<{
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  colors?: string[];
  spread?: number;
  opacity?: number;
}> = ({ x1 = 0, y1 = 0, x2 = 1, y2 = 0, colors = ["#00ffff", "#0088ff"], spread = 200, opacity = 0.6 }) => {
  const id = React.useId();
  
  return (
    <svg style={{ position: "absolute", width: 0, height: 0 }}>
      <defs>
        <linearGradient id={`grad-glow-${id}`} x1={`${x1 * 100}%`} y1={`${y1 * 100}%`} x2={`${x2 * 100}%`} y2={`${y2 * 100}%`}>
          {colors.map((color, i) => (
            <stop key={i} offset={`${(i / (colors.length - 1)) * 100}%`} stopColor={color} />
          ))}
        </linearGradient>
        <filter id={`grad-filter-${id}`} x={`-${spread / 2}%`} y={`-${spread / 2}%`} width={`${100 + spread}%`} height={`${100 + spread}%`}>
          <feGaussianBlur stdDeviation={15} />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 -1" />
        </filter>
      </defs>
    </svg>
  );
};

export const SoftShadow: React.FC<{
  children: React.ReactNode;
  color?: string;
  blur?: number;
  offsetX?: number;
  offsetY?: number;
  opacity?: number;
}> = ({ children, color = "#000000", blur = 30, offsetX = 0, offsetY = 10, opacity = 0.5 }) => {
  const id = React.useId();
  
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          filter: `drop-shadow(${offsetX}px ${offsetY}px ${blur}px ${color})`,
          opacity: opacity,
          pointerEvents: "none",
        }}
      >
        {children}
      </div>
      {children}
    </div>
  );
};

export const NeonLine: React.FC<{
  d: string;
  color?: string;
  strokeWidth?: number;
  animated?: boolean;
  className?: string;
}> = ({ d, color = "#00ffff", strokeWidth = 3, animated = false, className }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const dashOffset = animated
    ? interpolate(frame, [0, fps * 2], [0, 100], { extrapolateRight: "repeat" })
    : 0;
  
  return (
    <svg width="100%" height="100%" className={className} style={{ overflow: "visible" }}>
      <GlowEffect intensity={0.8} color={color} blur={15}>
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={animated ? "10 5" : "none"}
          strokeDashoffset={dashOffset}
        />
      </GlowEffect>
      <path
        d={d}
        fill="none"
        stroke="#ffffff"
        strokeWidth={strokeWidth * 0.3}
        strokeLinecap="round"
        opacity={0.9}
      />
    </svg>
  );
};