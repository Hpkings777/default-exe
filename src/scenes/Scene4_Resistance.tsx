import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { AbsoluteFill } from "remotion";
import { AnimatedBackground } from "../components/BackgroundEffects";
import { Caption } from "../components/Caption";
import { GlowEffect } from "../components/GlowEffects";

const caption = {
  text: "Resistance opposes the flow of current.",
  startTime: 0,
  endTime: 20
};

export const Scene4_Resistance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const pipeOpacity = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const morphProgress = interpolate(frame, [180, 300], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const resistorOpacity = interpolate(frame, [300, 360], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const electronSlowdown = interpolate(frame, [300, 420], [1, 0.3], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const congestionOpacity = interpolate(frame, [330, 390], [0, 0.8], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <AnimatedBackground />

      <div
        style={{
          position: "absolute",
          left: width / 2,
          top: height / 2 - 60,
          transform: "translate(-50%, -50%)",
          opacity: pipeOpacity,
        }}
      >
        <svg width="800" height="350" viewBox="0 0 800 350">
          <defs>
            <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="50%" stopColor="#0088ff" />
              <stop offset="100%" stopColor="#00ffff" />
            </linearGradient>
            <filter id="pipeGlow">
              <feGaussianBlur stdDeviation={6} />
              <feFlood floodColor="#00ffff" floodOpacity={0.6} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#pipeGlow)" style={{ opacity: 1 - morphProgress * 0.5 }}>
            <rect x={50} y={100} width={200} height={100} rx={50} fill="none" stroke="#00ffff" strokeWidth={6} />
            <text x={150} y={80} textAnchor="middle" fill="#00ffff" fontSize={18} fontFamily="system-ui">Wide Pipe</text>
          </g>

          <g filter="url(#pipeGlow)" style={{ opacity: 1 - morphProgress * 0.5 }}>
            <rect x={550} y={130} width={200} height={40} rx={20} fill="none" stroke="#ff6600" strokeWidth={6} />
            <text x={650} y={120} textAnchor="middle" fill="#ff6600" fontSize={18} fontFamily="system-ui">Narrow Pipe</text>
          </g>

          <g transform={`translate(${morphProgress * 100}, 0)`} style={{ opacity: morphProgress }}>
            <rect x={50} y={80} width={200} height={90} rx={45} fill="none" stroke="#00ffff" strokeWidth={6} />

            <rect x={250} y={115} width={100} height={20} rx={10} fill="none" stroke="#ff6600" strokeWidth={5}>
              <animate attributeName="stroke-dasharray" values="0,1000;20,1000;0,1000" dur="2s" repeatCount="indefinite" />
            </rect>

            <rect x={350} y={80} width={200} height={90} rx={45} fill="none" stroke="#00ffff" strokeWidth={6} />

            <text x={400} y={60} textAnchor="middle" fill="#00ffff" fontSize={18} fontFamily="system-ui">Wire with Resistor</text>

            <path d="M 250 125 L 260 115 L 275 135 L 290 115 L 305 135 L 320 115 L 350 125" fill="none" stroke="#ff6600" strokeWidth={4} strokeLinecap="round" />
          </g>

          <g style={{ opacity: resistorOpacity }}>
            {Array.from({ length: 8 }, (_, i) => {
              const baseX = 250 + i * 12.5;
              const progress = ((frame * 0.01 + i * 0.1) % 1);
              const x = baseX;
              const y = 125 + Math.sin(progress * Math.PI * 3) * (5 + (1 - electronSlowdown) * 10);

              return (
                <g key={i}>
                  <circle cx={x} cy={y} r={5} fill="#00ffff" opacity={0.9} />
                  <circle cx={x} cy={y} r={8} fill="none" stroke="#00ffff" strokeWidth={1} opacity={0.4} />
                </g>
              );
            })}
          </g>

          {congestionOpacity > 0 && (
            <g>
              <circle cx={300} cy={125} r={30} fill="none" stroke="#ff6600" strokeWidth={2} opacity={congestionOpacity}>
                <animate attributeName="r" values="20;35;20" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.2;0.5" dur="1s" repeatCount="indefinite" />
              </circle>
              <text x={300} y={130} textAnchor="middle" fill="#ff6600" fontSize={14} fontFamily="system-ui" opacity={congestionOpacity}>
                Friction
              </text>
            </g>
          )}
        </svg>
      </div>

      {resistorOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: width / 2,
            top: height * 0.75,
            transform: "translateX(-50%)",
            opacity: resistorOpacity,
          }}
        >
          <GlowEffect intensity={0.5} color="#ff6600" blur={20}>
            <div
              style={{
                backgroundColor: "rgba(255, 102, 0, 0.1)",
                border: "2px solid #ff6600",
                borderRadius: 16,
                padding: "20px 40px",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 32, fontWeight: 700, color: "#ff6600" }}>
                Resistor
              </div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 18, color: "#ffffff", marginTop: 10 }}>
                Creates opposition to electron flow
              </div>
            </div>
          </GlowEffect>
        </div>
      )}

      <Caption caption={caption} fontSize={36} />

      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          opacity: 0.6,
        }}
      >
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 16,
            color: "#00ffff",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Kivora
        </div>
      </div>
    </AbsoluteFill>
  );
};