import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { GlowEffect, PulsingGlow } from "./GlowEffects";

interface BatteryProps {
  x?: number;
  y?: number;
  scale?: number;
  voltage?: number;
  showLabel?: boolean;
  glowing?: boolean;
}

export const Battery: React.FC<BatteryProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  voltage = 1.5,
  showLabel = false,
  glowing = false
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const glowIntensity = glowing ? interpolate(
    Math.sin(frame / fps * 2),
    [-1, 1],
    [0.5, 1]
  ) : 0.3;
  
  const width = 80 * scale;
  const height = 40 * scale;
  const bumpHeight = 10 * scale;
  
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <GlowEffect intensity={glowIntensity} color="#00ff88" blur={20}>
        <svg width={width + bumpHeight} height={height + bumpHeight * 2} viewBox={`0 0 ${width + bumpHeight} ${height + bumpHeight * 2}`}>
          <rect
            x={bumpHeight / 2}
            y={bumpHeight}
            width={width}
            height={height}
            rx={4 * scale}
            fill="#1a1a2e"
            stroke="#00ff88"
            strokeWidth={2}
          />
          <rect
            x={width + bumpHeight / 2}
            y={bumpHeight + height / 4}
            width={bumpHeight}
            height={height / 2}
            rx={2 * scale}
            fill="#1a1a2e"
            stroke="#00ff88"
            strokeWidth={2}
          />
          <line x1={bumpHeight / 2 + 10} y1={bumpHeight + height / 2} x2={bumpHeight / 2 + 30} y2={bumpHeight + height / 2} stroke="#00ff88" strokeWidth={3} />
          <line x1={bumpHeight / 2 + 20} y1={bumpHeight + height / 4} x2={bumpHeight / 2 + 20} y2={bumpHeight + height * 3 / 4} stroke="#00ff88" strokeWidth={3} />
        </svg>
      </GlowEffect>
      
      {showLabel && (
        <div
          style={{
            position: "absolute",
            top: height + bumpHeight * 2 + 5,
            left: "50%",
            transform: "translateX(-50%)",
            color: "#00ff88",
            fontSize: 14 * scale,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {voltage}V
        </div>
      )}
    </div>
  );
};

interface BulbProps {
  x?: number;
  y?: number;
  scale?: number;
  brightness?: number;
  showLabel?: boolean;
}

export const Bulb: React.FC<BulbProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  brightness = 1,
  showLabel = false
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const glowIntensity = interpolate(brightness, [0, 1], [0, 1]);
  const filamentOpacity = interpolate(brightness, [0, 0.3, 1], [0, 0.5, 1]);
  const bulbGlow = interpolate(brightness, [0, 0.5, 1], [0, 0.3, 0.8]);
  
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <GlowEffect intensity={glowIntensity * 0.7} color="#ffdd00" blur={30 * brightness}>
        <svg width={60 * scale} height={80 * scale} viewBox="0 0 60 80">
          <ellipse
            cx={30}
            cy={30}
            rx={25 * scale}
            ry={28 * scale}
            fill="rgba(255, 255, 200, 0.1)"
            stroke="#ffcc00"
            strokeWidth={2}
          />
          <path
            d={`M ${20 * scale} ${55 * scale} Q ${15 * scale} ${65 * scale} ${25 * scale} ${70 * scale} Q ${30 * scale} ${73 * scale} ${35 * scale} ${70 * scale} Q ${45 * scale} ${65 * scale} ${40 * scale} ${55 * scale}`}
            fill="#1a1a2e"
            stroke="#888"
            strokeWidth={2}
          />
          <ellipse
            cx={30}
            cy={30}
            rx={8 * scale}
            ry={12 * scale}
            fill="#ffee88"
            opacity={filamentOpacity}
            style={{
              filter: `blur(${2 * (1 - brightness)}px)`,
            }}
          />
        </svg>
      </GlowEffect>
      
      <div
        style={{
          position: "absolute",
          inset: -20 * scale,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255, 255, 150, ${bulbGlow * 0.3}) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      
      {showLabel && brightness > 0.5 && (
        <div
          style={{
            position: "absolute",
            bottom: -20 * scale,
            left: "50%",
            transform: "translateX(-50%)",
            color: "#ffcc00",
            fontSize: 14 * scale,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 600,
          }}
        >
          {Math.round(brightness * 100)}%
        </div>
      )}
    </div>
  );
};

interface WireProps {
  path?: string;
  color?: string;
  strokeWidth?: number;
  glowIntensity?: number;
}

export const Wire: React.FC<WireProps> = ({
  path = "",
  color = "#00ffff",
  strokeWidth = 4,
  glowIntensity = 0.5
}) => {
  if (!path) return null;
  
  return (
    <GlowEffect intensity={glowIntensity} color={color} blur={15}>
      <svg width="100%" height="100%" style={{ overflow: "visible" }}>
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={path}
          fill="none"
          stroke="#ffffff"
          strokeWidth={strokeWidth * 0.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.8}
        />
      </svg>
    </GlowEffect>
  );
};

interface ResistorProps {
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  showLabel?: boolean;
}

export const Resistor: React.FC<ResistorProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  rotation = 0,
  showLabel = false
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const pulseIntensity = interpolate(
    Math.sin(frame / fps * 2),
    [-1, 1],
    [0.5, 1]
  );
  
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    >
      <GlowEffect intensity={0.5 * pulseIntensity} color="#ff6600" blur={15}>
        <svg width={80 * scale} height={30 * scale} viewBox="0 0 80 30">
          <line x1={0} y1={15} x2={10} y2={15} stroke="#00ffff" strokeWidth={3} />
          <path
            d="M 10 15 L 15 5 L 25 25 L 35 5 L 45 25 L 55 5 L 65 25 L 70 15"
            fill="none"
            stroke="#ff6600"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1={70} y1={15} x2={80} y2={15} stroke="#00ffff" strokeWidth={3} />
        </svg>
      </GlowEffect>
      
      {showLabel && (
        <div
          style={{
            position: "absolute",
            bottom: -18 * scale,
            left: "50%",
            transform: "translateX(-50%)",
            color: "#ff6600",
            fontSize: 12 * scale,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 600,
          }}
        >
          R
        </div>
      )}
    </div>
  );
};

interface SimpleCircuitProps {
  showElectrons?: boolean;
  electronSpeed?: number;
  bulbBrightness?: number;
  glowing?: boolean;
}

export const SimpleCircuit: React.FC<SimpleCircuitProps> = ({
  showElectrons = true,
  electronSpeed = 1,
  bulbBrightness = 0.5,
  glowing = true
}) => {
  const frame = useCurrentFrame();
  
  return (
    <div
      style={{
        position: "relative",
        width: 500,
        height: 300,
      }}
    >
      <svg width="100%" height="100%" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="50%" stopColor="#0088ff" />
            <stop offset="100%" stopColor="#00ffff" />
          </linearGradient>
        </defs>
        
        <path
          d="M 100 150 L 100 50 L 400 50 L 400 150 L 300 150 L 300 200 L 350 200 L 350 250 L 250 250 L 250 200 L 300 200 L 300 150 L 250 150 L 250 100 L 150 100 L 150 200 L 200 200 L 200 250 L 100 250 L 100 150"
          fill="none"
          stroke="url(#wireGradient)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      
      <Battery x={100} y={200} scale={1} voltage={1.5} showLabel glowing={glowing} />
      <Bulb x={350} y={200} scale={1.2} brightness={bulbBrightness} />
      
      {showElectrons && (
        <div style={{ position: "absolute", inset: 0 }}>
          <CircuitElectronsDisplay speed={electronSpeed} />
        </div>
      )}
    </div>
  );
};

const CircuitElectronsDisplay: React.FC<{ speed?: number }> = ({ speed = 1 }) => {
  const frame = useCurrentFrame();
  
  const path = "M 100 150 L 100 50 L 400 50 L 400 150 L 300 150 L 300 200 L 350 200 L 350 250 L 250 250 L 250 200 L 300 200 L 300 150 L 250 150 L 250 100 L 150 100 L 150 200 L 100 200 L 100 150";
  
  const pathLength = 1200;
  const electronPositions = [0.1, 0.3, 0.5, 0.7, 0.9];
  
  return (
    <>
      {electronPositions.map((pos, i) => {
        const progress = (frame * speed * 0.02 + pos) % 1;
        return (
          <ElectronOnPath
            key={i}
            path={path}
            pathLength={pathLength}
            progress={progress}
          />
        );
      })}
    </>
  );
};

const ElectronOnPath: React.FC<{
  path: string;
  pathLength: number;
  progress: number;
}> = ({ path, pathLength, progress }) => {
  const x = 100 + (progress < 0.25 ? progress * 4 * 300 :
                progress < 0.5 ? 300 :
                progress < 0.75 ? 300 - (progress - 0.5) * 4 * 300 :
                0);
  
  const y = 50 + (progress < 0.25 ? -progress * 4 * 100 :
                progress < 0.5 ? 0 :
                progress < 0.75 ? (progress - 0.5) * 4 * 100 + 100 :
                150);
  
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: "#00ffff",
        boxShadow: "0 0 10px #00ffff, 0 0 20px #00ffff",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};