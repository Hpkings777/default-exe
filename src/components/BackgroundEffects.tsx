import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface BackgroundGridProps {
  opacity?: number;
  spacing?: number;
  animated?: boolean;
}

export const BackgroundGrid: React.FC<BackgroundGridProps> = ({
  opacity = 0.1,
  spacing = 50,
  animated = true
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const offset = animated ? (frame * 0.5) % spacing : 0;
  
  const horizontalLines = Math.ceil(height / spacing) + 1;
  const verticalLines = Math.ceil(width / spacing) + 1;
  
  return (
    <svg
      width="100%"
      height="100%"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <defs>
        <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="50%" stopColor="#0088ff" />
          <stop offset="100%" stopColor="#00ffff" />
        </linearGradient>
      </defs>
      
      {Array.from({ length: horizontalLines }, (_, i) => (
        <line
          key={`h-${i}`}
          x1={0}
          y1={i * spacing + offset}
          x2={width}
          y2={i * spacing + offset}
          stroke={`url(#gridGradient)`}
          strokeWidth={0.5}
          opacity={opacity * 0.5}
        />
      ))}
      
      {Array.from({ length: verticalLines }, (_, i) => (
        <line
          key={`v-${i}`}
          x1={i * spacing + offset}
          y1={0}
          x2={i * spacing + offset}
          y2={height}
          stroke={`url(#gridGradient)`}
          strokeWidth={0.5}
          opacity={opacity * 0.5}
        />
      ))}
    </svg>
  );
};

interface AmbientParticlesProps {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
}

export const AmbientParticles: React.FC<AmbientParticlesProps> = ({
  count = 50,
  color = "#00ffff",
  minSize = 1,
  maxSize = 4,
  speed = 1
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  
  const particles = Array.from({ length: count }, (_, i) => {
    const seed = i * 137.508;
    const baseX = (seed * 0.01) % width;
    const baseY = (seed * 0.007) % height;
    const size = minSize + (seed * 0.1) % (maxSize - minSize);
    const driftSpeed = 0.2 + (seed % 5) * 0.1;
    const verticalSpeed = 0.1 + (seed % 3) * 0.05;
    
    const x = (baseX + frame * speed * driftSpeed) % width;
    const y = (baseY + Math.sin(frame / fps + seed) * 20 + frame * speed * verticalSpeed) % height;
    
    const opacity = 0.2 + 0.3 * Math.sin(frame / fps * speed + seed);
    
    return (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={size}
        fill={color}
        opacity={opacity}
      >
        <animate
          attributeName="opacity"
          values={`${opacity * 0.5};${opacity};${opacity * 0.5}`}
          dur={`${2 + seed % 3}s`}
          repeatCount="indefinite"
        />
      </circle>
    );
  });
  
  return (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="particleGlow">
          <stop offset="0%" stopColor={color} stopOpacity={0.5} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      {particles}
    </svg>
  );
};

interface FloatingOrbsProps {
  count?: number;
  color?: string;
}

export const FloatingOrbs: React.FC<FloatingOrbsProps> = ({
  count = 5,
  color = "#00ffff"
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  
  const orbs = Array.from({ length: count }, (_, i) => {
    const seed = i * 123.456 + 100;
    const baseX = width * (0.2 + (i / count) * 0.6);
    const baseY = height * (0.3 + (i / count) * 0.4);
    const radiusX = 100 + (i % 3) * 50;
    const radiusY = 50 + (i % 2) * 30;
    const speed = 0.5 + (i % 3) * 0.2;
    
    const x = baseX + Math.sin(frame / fps * speed + seed) * radiusX;
    const y = baseY + Math.cos(frame / fps * speed + seed) * radiusY;
    const size = 30 + (i % 4) * 20;
    const opacity = 0.05 + 0.03 * Math.sin(frame / fps + seed);
    
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: `blur(${size / 4}px)`,
        }}
      />
    );
  });
  
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {orbs}
    </div>
  );
};

interface GradientOverlayProps {
  colors?: string[];
  positions?: number[];
  angle?: number;
  opacity?: number;
}

export const GradientOverlay: React.FC<GradientOverlayProps> = ({
  colors = ["#0a0a1a", "#0a0a2a", "#0a0a1a"],
  positions = [0, 0.5, 1],
  angle = 90,
  opacity = 0.8
}) => {
  const { width, height } = useVideoConfig();
  
  const radians = (angle * Math.PI) / 180;
  const x1 = width / 2 - Math.cos(radians) * width;
  const y1 = height / 2 - Math.sin(radians) * height;
  const x2 = width / 2 + Math.cos(radians) * width;
  const y2 = height / 2 + Math.sin(radians) * height;
  
  const stops = colors.map((color, i) => (
    <stop
      key={i}
      offset={`${(positions[i] || i / (colors.length - 1)) * 100}%`}
      stopColor={color}
    />
  ));
  
  return (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity }}>
      <defs>
        <linearGradient id="ambientGradient" x1={`${x1}px`} y1={`${y1}px`} x2={`${x2}px`} y2={`${y2}px`}>
          {stops}
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#ambientGradient)" />
    </svg>
  );
};

interface VignetteProps {
  intensity?: number;
  color?: string;
}

export const Vignette: React.FC<VignetteProps> = ({
  intensity = 0.5,
  color = "#000000"
}) => {
  const { width, height } = useVideoConfig();
  
  return (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <defs>
        <radialGradient id="vignetteGradient">
          <stop offset="40%" stopColor={color} stopOpacity={0} />
          <stop offset="100%" stopColor={color} stopOpacity={intensity} />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#vignetteGradient)" />
    </svg>
  );
};

interface AnimatedBackgroundProps {
  style?: "grid" | "particles" | "orbs" | "gradient" | "all";
  primaryColor?: string;
  secondaryColor?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  style = "all",
  primaryColor = "#00ffff",
  secondaryColor = "#0088ff"
}) => {
  const { width, height } = useVideoConfig();
  
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#0a0a1a",
        overflow: "hidden",
      }}
    >
      {(style === "grid" || style === "all") && (
        <BackgroundGrid opacity={0.08} animated />
      )}
      
      {(style === "particles" || style === "all") && (
        <AmbientParticles count={40} color={primaryColor} />
      )}
      
      {(style === "orbs" || style === "all") && (
        <FloatingOrbs count={4} color={primaryColor} />
      )}
      
      {(style === "gradient" || style === "all") && (
        <GradientOverlay
          colors={["#0a0a1a", "#0a1525", "#0a0a1a"]}
          angle={135}
          opacity={0.6}
        />
      )}
      
      <Vignette intensity={0.4} />
    </div>
  );
};