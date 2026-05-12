import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { AbsoluteFill } from "remotion";
import { AnimatedBackground } from "../components/BackgroundEffects";
import { Caption } from "../components/Caption";
import { GlowEffect } from "../components/GlowEffects";

const caption = {
  text: "Ohm's Law is the foundation of electrical circuits.",
  startTime: 0,
  endTime: 20
};

export const Scene7_FinalSummary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const fadeInProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const circuitScale = interpolate(frame, [30, 90], [0.8, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const formulaScale = interpolate(frame, [60, 120], [0.5, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  const glowPulse = interpolate(Math.sin(frame / fps * 2), [-1, 1], [0.6, 1]);

  const electronSpeed = 0.04;

  const fadeOutProgress = interpolate(frame, [540, 600], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a", opacity: fadeInProgress }}>
      <AnimatedBackground />

      <div
        style={{
          position: "absolute",
          left: width / 2,
          top: height * 0.35,
          transform: `translate(-50%, -50%) scale(${circuitScale})`,
        }}
      >
        <svg width="500" height="400" viewBox="0 0 500 400">
          <defs>
            <linearGradient id="finalWireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="50%" stopColor="#0088ff" />
              <stop offset="100%" stopColor="#00ffff" />
            </linearGradient>
            <filter id="finalWireGlow">
              <feGaussianBlur stdDeviation={10} />
              <feFlood floodColor="#00ffff" floodOpacity={0.8} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="finalBulbGlow">
              <feGaussianBlur stdDeviation={40} />
              <feFlood floodColor="#ffee00" floodOpacity={0.8} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="finalBatteryGlow">
              <feGaussianBlur stdDeviation={20} />
              <feFlood floodColor="#00ff88" floodOpacity={0.7} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="finalResistorGlow">
              <feGaussianBlur stdDeviation={15} />
              <feFlood floodColor="#ff6600" floodOpacity={0.6} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#finalWireGlow)">
            <path
              d="M 150 200 L 150 80 L 350 80 L 350 200 L 300 200"
              fill="none"
              stroke="url(#finalWireGradient)"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 200 200 L 200 320 L 350 320 L 350 200"
              fill="none"
              stroke="url(#finalWireGradient)"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          <g transform="translate(350, 200)" filter="url(#finalBulbGlow)">
            <circle cx={0} cy={0} r={50} fill="#ffee00" opacity={0.3} />
            <circle cx={0} cy={0} r={35} fill="#ffee00" opacity={0.5} />
          </g>

          <g transform="translate(150, 200)" filter="url(#finalBatteryGlow)">
            <rect x={-30} y={-20} width={60} height={40} rx={4} fill="#1a1a2e" stroke="#00ff88" strokeWidth={2} />
            <rect x={30} y={-10} width={10} height={20} rx={2} fill="#1a1a2e" stroke="#00ff88" strokeWidth={2} />
            <line x1={-15} y1={0} x2={5} y2={0} stroke="#00ff88" strokeWidth={3} />
            <line x1={-5} y1={-12} x2={-5} y2={12} stroke="#00ff88" strokeWidth={3} />
          </g>

          <g transform="translate(200, 200)" filter="url(#finalResistorGlow)">
            <path
              d="M 0 0 L 10 -15 L 25 15 L 40 -15 L 55 15 L 70 0"
              fill="none"
              stroke="#ff6600"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((offset, i) => {
            const progress = ((frame * electronSpeed + offset) % 1);
            let x: number, y: number;

            const p = progress * 700;

            if (p < 150) {
              x = 150;
              y = 200 - p;
            } else if (p < 400) {
              x = 150 + (p - 150);
              y = 50;
            } else if (p < 500) {
              x = 400;
              y = 50 + (p - 400);
            } else if (p < 550) {
              x = 400 - (p - 500);
              y = 150;
            } else if (p < 600) {
              x = 300 - (p - 550);
              y = 200;
            } else {
              x = 200 + (p - 600);
              y = 200;
            }

            return (
              <g key={i}>
                <circle cx={x} cy={y} r={7} fill="#00ffff" opacity={0.9}>
                  <animate attributeName="opacity" values="0.9;0.4;0.9" dur="0.4s" repeatCount="indefinite" />
                </circle>
                <circle cx={x} cy={y} r={14} fill="none" stroke="#00ffff" strokeWidth={1} opacity={0.5}>
                  <animate attributeName="r" values="10;16;10" dur="0.4s" repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}

          <text x={350} y={70} textAnchor="middle" fill="#ffcc00" fontSize={16} fontFamily="system-ui">Bulb</text>
          <text x={150} y={270} textAnchor="middle" fill="#00ff88" fontSize={16} fontFamily="system-ui">Battery</text>
          <text x={235} y={160} textAnchor="middle" fill="#ff6600" fontSize={14} fontFamily="system-ui">R</text>
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          left: width / 2,
          top: height * 0.78,
          transform: `translate(-50%, -50%) scale(${formulaScale})`,
        }}
      >
        <GlowEffect intensity={glowPulse * 0.9} color="#00ffff" blur={40}>
          <div
            style={{
              display: "flex",
              fontFamily: "system-ui, -apple-system, 'SF Pro Display', sans-serif",
              fontSize: 100,
              fontWeight: 200,
              color: "#ffffff",
              letterSpacing: "0.08em",
              textShadow: "0 0 50px rgba(0, 255, 255, 0.4)",
            }}
          >
            <span style={{ color: "#00ffff", fontWeight: 600, textShadow: "0 0 30px #00ffff" }}>V</span>
            <span style={{ opacity: 0.6, margin: "0 20px" }}>=</span>
            <span style={{ color: "#00ffff", fontWeight: 600, textShadow: "0 0 30px #00ffff" }}>I</span>
            <span style={{ opacity: 0.6, margin: "0 20px" }}>R</span>
          </div>
        </GlowEffect>
      </div>

      <div
        style={{
          position: "absolute",
          left: width / 2,
          bottom: 160,
          opacity: interpolate(frame, [300, 360], [0, 1]),
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 255, 255, 0.1)",
            border: "2px solid #00ffff",
            borderRadius: 20,
            padding: "20px 50px",
          }}
        >
          <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, color: "#ffffff", textAlign: "center" }}>
            V = Voltage (Volts)
          </div>
          <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, color: "#ffffff", textAlign: "center" }}>
            I = Current (Amperes)
          </div>
          <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, color: "#ffffff", textAlign: "center" }}>
            R = Resistance (Ohms)
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          opacity: fadeOutProgress * 0.6,
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

      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          opacity: fadeOutProgress * 0.4,
        }}
      >
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 14,
            color: "#888888",
            letterSpacing: "0.1em",
          }}
        >
          AI-Powered Learning
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#000000",
          opacity: fadeOutProgress * 0.3,
          pointerEvents: "none",
        }}
      />

      <Caption caption={caption} fontSize={36} />
    </AbsoluteFill>
  );
};