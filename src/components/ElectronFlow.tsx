import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface ElectronProps {
  position: number;
  color?: string;
  size?: number;
  trailLength?: number;
}

const Electron: React.FC<ElectronProps> = ({
  position,
  color = "#00ffff",
  size = 8,
  trailLength = 30
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: position,
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `
          0 0 ${size * 2}px ${color},
          0 0 ${size * 4}px ${color},
          0 0 ${size * 6}px rgba(0, 255, 255, 0.5)
        `,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -trailLength,
          top: "50%",
          transform: "translateY(-50%)",
          width: trailLength,
          height: size * 0.6,
          background: `linear-gradient(to left, transparent, ${color})`,
          opacity: 0.6,
          borderRadius: size,
        }}
      />
    </div>
  );
};

interface ElectronFlowProps {
  path: string;
  speed?: number;
  electronCount?: number;
  color?: string;
  size?: number;
  paused?: boolean;
}

export const ElectronFlow: React.FC<ElectronFlowProps> = ({
  path,
  speed = 1,
  electronCount = 8,
  color = "#00ffff",
  size = 8,
  paused = false
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const totalLength = 100;
  
  const electrons = Array.from({ length: electronCount }, (_, i) => {
    const offset = (i / electronCount) * totalLength;
    const position = paused ? 0 : (frame * speed * 2 + offset) % totalLength;
    const normalizedPosition = (position / totalLength) * 100;
    
    return (
      <Electron
        key={i}
        position={normalizedPosition}
        color={color}
        size={size}
      />
    );
  });
  
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {electrons}
    </div>
  );
};

interface CircuitElectronsProps {
  direction?: "clockwise" | "counterclockwise";
  speed?: number;
  electronCount?: number;
  color?: string;
  size?: number;
  circuitType?: "simple" | "battery-bulb";
  paused?: boolean;
}

export const CircuitElectrons: React.FC<CircuitElectronsProps> = ({
  direction = "clockwise",
  speed = 1,
  electronCount = 12,
  color = "#00ffff",
  size = 8,
  circuitType = "simple",
  paused = false
}) => {
  const frame = useCurrentFrame();
  
  const electrons = Array.from({ length: electronCount }, (_, i) => {
    const baseOffset = (i / electronCount) * 100;
    const position = paused ? 0 : ((frame * speed * 1.5 + baseOffset) % 100);
    
    const angle = (position / 100) * 360 - 90;
    const radians = (angle * Math.PI) / 180;
    
    const scale = circuitType === "battery-bulb" ? 1.2 : 1;
    const rx = 200 * scale;
    const ry = 120 * scale;
    
    let x: number, y: number;
    
    if (circuitType === "battery-bulb") {
      const normalizedAngle = ((angle + 90) % 360) / 360;
      
      if (normalizedAngle < 0.25) {
        x = rx + (normalizedAngle / 0.25) * 100;
        y = 0;
      } else if (normalizedAngle < 0.5) {
        x = rx + 100 + Math.sin((normalizedAngle - 0.25) * Math.PI * 2) * ry;
        y = (normalizedAngle - 0.25) * 4 * ry;
      } else if (normalizedAngle < 0.75) {
        x = rx + 100 - ((normalizedAngle - 0.5) / 0.25) * (rx + 100);
        y = ry * 2;
      } else {
        x = -100 + Math.cos((normalizedAngle - 0.75) * Math.PI * 2) * rx;
        y = ry * 2 - ((normalizedAngle - 0.75) * 4) * ry * 2;
      }
    } else {
      x = rx * Math.cos(radians);
      y = ry * Math.sin(radians);
    }
    
    const adjustedY = direction === "counterclockwise" ? -y : y;
    
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${adjustedY}px)`,
          transform: "translate(-50%, -50%)",
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: color,
          boxShadow: `
            0 0 ${size * 2}px ${color},
            0 0 ${size * 3}px ${color},
            0 0 ${size * 5}px rgba(0, 255, 255, 0.6)
          `,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: size * 2,
            height: size * 0.5,
            background: `linear-gradient(to ${direction === "clockwise" ? "left" : "right"}, transparent, ${color})`,
            opacity: 0.5,
            top: "50%",
            transform: `translateY(-50%) ${direction === "clockwise" ? "" : "scaleX(-1)"}`,
            left: direction === "clockwise" ? "auto" : "100%",
            right: direction === "clockwise" ? "100%" : "auto",
            borderRadius: size * 0.5,
          }}
        />
      </div>
    );
  });
  
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {electrons}
    </div>
  );
};

interface FlowingElectronProps {
  progress: number;
  pathWidth?: number;
  pathHeight?: number;
  color?: string;
  size?: number;
}

export const FlowingElectron: React.FC<FlowingElectronProps> = ({
  progress,
  pathWidth = 300,
  pathHeight = 150,
  color = "#00ffff",
  size = 10
}) => {
  const x = interpolate(progress, [0, 1], [0, pathWidth]);
  const y = pathHeight / 2 + Math.sin((progress * Math.PI * 2)) * (pathHeight / 4);
  
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `
          0 0 ${size}px ${color},
          0 0 ${size * 2}px ${color},
          0 0 ${size * 4}px rgba(0, 255, 255, 0.5)
        `,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

interface ElectronPulseProps {
  count?: number;
  color?: string;
  maxSize?: number;
  minSize?: number;
}

export const ParticleField: React.FC<ElectronPulseProps> = ({
  count = 30,
  color = "#00ffff",
  maxSize = 4,
  minSize = 1
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const particles = Array.from({ length: count }, (_, i) => {
    const seed = i * 137.5;
    const baseX = ((seed * 0.618) % 1) * 100;
    const baseY = ((seed * 0.382) % 1) * 100;
    const speed = 0.3 + (seed % 10) * 0.05;
    const size = minSize + ((seed * 7) % (maxSize - minSize));
    
    const x = (baseX + (frame * speed) % 100) % 100;
    const y = baseY + Math.sin(frame / fps + seed) * 10;
    const opacity = 0.3 + 0.3 * Math.sin(frame / fps * speed + seed);
    
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: color,
          opacity,
          boxShadow: `0 0 ${size * 2}px ${color}`,
        }}
      />
    );
  });
  
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {particles}
    </div>
  );
};