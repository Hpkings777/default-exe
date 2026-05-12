import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { GlowEffect } from "./GlowEffects";

interface FormulaProps {
  formula: string;
  startFrame?: number;
  duration?: number;
  fontSize?: number;
  highlightVariables?: boolean;
  highlightColor?: string;
}

export const Formula: React.FC<FormulaProps> = ({
  formula,
  startFrame = 0,
  duration = 60,
  fontSize = 120,
  highlightVariables = false,
  highlightColor = "#00ffff"
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const localFrame = frame - startFrame;
  const isVisible = localFrame >= 0 && localFrame <= duration + 30;
  
  if (!isVisible) return null;
  
  const entranceProgress = interpolate(localFrame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  
  const exitProgress = interpolate(localFrame, [duration, duration + 30], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  
  const progress = Math.min(entranceProgress, exitProgress);
  const scale = interpolate(progress, [0, 0.5, 1], [0.5, 1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  
  const glowIntensity = interpolate(
    Math.sin(localFrame / fps * 3),
    [-1, 1],
    [0.6, 1]
  ) * progress;
  
  const letters = formula.split("");
  const variablePattern = /^[VIR]$/;
  
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
        opacity: progress,
      }}
    >
      <GlowEffect intensity={glowIntensity} color={highlightColor} blur={25}>
        <div
          style={{
            display: "flex",
            fontFamily: "system-ui, -apple-system, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
            fontSize,
            fontWeight: 300,
            color: "#ffffff",
            letterSpacing: "0.1em",
            textShadow: "0 0 30px rgba(0, 255, 255, 0.5)",
          }}
        >
          {letters.map((letter, i) => {
            const isVariable = variablePattern.test(letter);
            const letterDelay = i * 5;
            const letterProgress = interpolate(
              localFrame,
              [10 + letterDelay, 30 + letterDelay],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: letterProgress,
                  transform: `translateY(${(1 - letterProgress) * 20}px)`,
                  color: highlightVariables && isVariable ? highlightColor : "#ffffff",
                  textShadow: highlightVariables && isVariable
                    ? `0 0 20px ${highlightColor}, 0 0 40px ${highlightColor}`
                    : "none",
                  fontWeight: highlightVariables && isVariable ? 600 : 300,
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>
      </GlowEffect>
    </div>
  );
};

interface VariableHighlightProps {
  variable: string;
  label: string;
  x: number;
  y: number;
  visible: boolean;
  color?: string;
}

export const VariableHighlight: React.FC<VariableHighlightProps> = ({
  variable,
  label,
  x,
  y,
  visible,
  color = "#00ffff"
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const opacity = visible ? 1 : 0;
  const scale = interpolate(opacity, [0, 1], [0.8, 1]);
  
  const arrowProgress = interpolate(
    Math.sin(frame / fps * 2),
    [-1, 1],
    [0, 1]
  );
  
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <GlowEffect intensity={0.8} color={color} blur={15}>
        <div
          style={{
            backgroundColor: "rgba(0, 255, 255, 0.1)",
            border: `2px solid ${color}`,
            borderRadius: 12,
            padding: "10px 20px",
            fontFamily: "system-ui, sans-serif",
            fontSize: 48,
            fontWeight: 600,
            color: color,
          }}
        >
          {variable}
        </div>
      </GlowEffect>
      
      <svg
        width={60}
        height={30 + arrowProgress * 10}
        viewBox="0 0 60 40"
        style={{ overflow: "visible" }}
      >
        <path
          d={`M 30 0 L 30 ${20 + arrowProgress * 10}`}
          stroke={color}
          strokeWidth={2}
          fill="none"
          strokeDasharray="5 3"
        />
        <circle
          cx={30}
          cy={25 + arrowProgress * 5}
          r={4}
          fill={color}
        />
      </svg>
      
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: 28,
          fontWeight: 500,
          color: "#ffffff",
          textAlign: "center",
          maxWidth: 150,
        }}
      >
        {label}
      </div>
    </div>
  );
};

interface EquationBreakdownProps {
  equation: string;
  showLabels?: boolean;
  highlightIndex?: number;
}

export const EquationBreakdown: React.FC<EquationBreakdownProps> = ({
  equation,
  showLabels = false,
  highlightIndex = -1
}) => {
  const frame = useCurrentFrame();
  
  const parts = equation.split(/([+\-*/=])/);
  
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        fontSize: 80,
        fontWeight: 300,
        color: "#ffffff",
        letterSpacing: "0.05em",
      }}
    >
      {parts.map((part, i) => {
        const isHighlighted = i === highlightIndex;
        const isOperator = /^[+\-*/=]$/.test(part);
        
        return (
          <span
            key={i}
            style={{
              color: isHighlighted ? "#00ffff" : "#ffffff",
              fontWeight: isHighlighted ? 600 : 300,
              textShadow: isHighlighted ? "0 0 20px #00ffff, 0 0 40px #00ffff" : "none",
              transition: "all 0.3s ease",
            }}
          >
            {part}
          </span>
        );
      })}
    </div>
  );
};

interface AnimatedValueProps {
  value: number;
  unit: string;
  label: string;
  x: number;
  y: number;
  color?: string;
  showChange?: boolean;
  minValue?: number;
  maxValue?: number;
}

export const AnimatedValue: React.FC<AnimatedValueProps> = ({
  value,
  unit,
  label,
  x,
  y,
  color = "#00ffff",
  showChange = false,
  minValue = 0,
  maxValue = 100
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const normalizedValue = (value - minValue) / (maxValue - minValue);
  
  const pulseProgress = interpolate(
    Math.sin(frame / fps * 3),
    [-1, 1],
    [0.8, 1]
  );
  
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <GlowEffect intensity={0.6 * pulseProgress} color={color} blur={20}>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: `2px solid ${color}`,
            borderRadius: 12,
            padding: "15px 25px",
            minWidth: 120,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 48,
              fontWeight: 700,
              color: color,
              textShadow: `0 0 20px ${color}`,
            }}
          >
            {value.toFixed(1)}
          </div>
          <div
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 24,
              fontWeight: 400,
              color: "#888888",
            }}
          >
            {unit}
          </div>
        </div>
      </GlowEffect>
      
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: 20,
          fontWeight: 500,
          color: "#ffffff",
        }}
      >
        {label}
      </div>
      
      {showChange && (
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 16,
            fontWeight: 600,
            color: normalizedValue > 0.5 ? "#00ff88" : "#ff6666",
            marginTop: 5,
          }}
        >
          {normalizedValue > 0.5 ? "▲ HIGH" : "▼ LOW"}
        </div>
      )}
    </div>
  );
};

interface SliderProps {
  value: number;
  min: number;
  max: number;
  label: string;
  x: number;
  y: number;
  color?: string;
  onChange?: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  min,
  max,
  label,
  x,
  y,
  color = "#00ffff"
}) => {
  const frame = useCurrentFrame();
  const normalizedValue = (value - min) / (max - min);
  
  const handleHeight = 30;
  const trackWidth = 200;
  
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: 18,
          fontWeight: 600,
          color: "#ffffff",
        }}
      >
        {label}
      </div>
      
      <div
        style={{
          position: "relative",
          width: trackWidth,
          height: 8,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: `${normalizedValue * 100}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            borderRadius: 4,
          }}
        />
      </div>
      
      <div
        style={{
          position: "absolute",
          left: `${normalizedValue * trackWidth - 15}px`,
          top: -11,
          width: 30,
          height: handleHeight,
          backgroundColor: color,
          borderRadius: 6,
          boxShadow: `0 0 15px ${color}, 0 0 30px ${color}`,
        }}
      />
      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: trackWidth,
          fontFamily: "system-ui, sans-serif",
          fontSize: 14,
          color: "#888888",
        }}
      >
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};