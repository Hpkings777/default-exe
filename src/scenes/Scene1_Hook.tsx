import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { AbsoluteFill } from "remotion";
import { AnimatedBackground } from "../components/BackgroundEffects";
import { Caption } from "../components/Caption";
import { GlowEffect } from "../components/GlowEffects";

const caption = {
  text: "How does electricity actually flow through a circuit?",
  startTime: 0,
  endTime: 10
};

export const Scene1_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const revealProgress = interpolate(frame, [0, 90], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const zoomProgress = interpolate(frame, [60, 300], [1, 1.15], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const bulbBrightness = interpolate(frame, [30, 120], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const wireGlow = interpolate(frame, [30, 150], [0.2, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const electronSpeed = interpolate(frame, [60, 180], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const circuitX = width / 2;
  const circuitY = height / 2 - 50;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <AnimatedBackground />

      <div
        style={{
          position: "absolute",
          left: circuitX,
          top: circuitY,
          transform: `translate(-50%, -50%) scale(${zoomProgress})`,
          opacity: revealProgress,
        }}
      >
        <svg width="600" height="400" viewBox="0 0 600 400">
          <defs>
            <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="50%" stopColor="#0088ff" />
              <stop offset="100%" stopColor="#00ffff" />
            </linearGradient>
            <filter id="wireGlow">
              <feGaussianBlur stdDeviation={wireGlow * 8} />
              <feFlood floodColor="#00ffff" floodOpacity={wireGlow * 0.8} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="bulbGlow">
              <feGaussianBlur stdDeviation={bulbBrightness * 20} />
              <feFlood floodColor="#ffee00" floodOpacity={bulbBrightness * 0.6} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#wireGlow)">
            <path
              d="M 150 200 L 150 100 L 450 100 L 450 200 L 400 200"
              fill="none"
              stroke="url(#wireGradient)"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 200 200 L 200 300 L 400 300 L 400 200"
              fill="none"
              stroke="url(#wireGradient)"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          <g transform="translate(450, 200)">
            <g filter="url(#bulbGlow)">
              <circle cx={0} cy={0} r={40} fill="#ffee00" opacity={bulbBrightness * 0.3} />
              <circle cx={0} cy={0} r={25} fill="#ffee00" opacity={bulbBrightness * 0.6} />
            </g>
            <svg width="60" height="80" x={-30} y={-40}>
              <ellipse
                cx={30}
                cy={30}
                rx={25}
                ry={28}
                fill="rgba(255, 255, 200, 0.2)"
                stroke="#ffcc00"
                strokeWidth={2}
              />
              <path
                d="M 20 55 Q 15 65 25 70 Q 30 73 35 70 Q 45 65 40 55"
                fill="#1a1a2e"
                stroke="#888"
                strokeWidth={2}
              />
              <ellipse
                cx={30}
                cy={30}
                rx={8}
                ry={12}
                fill="#ffee88"
                opacity={bulbBrightness}
              />
            </svg>
          </g>

          <g transform="translate(150, 200)">
            <svg width="80" height="120" x={-40} y={-60}>
              <rect x={0} y={20} width={60} height={40} rx={4} fill="#1a1a2e" stroke="#00ff88" strokeWidth={2} />
              <rect x={60} y={30} width={10} height={20} rx={2} fill="#1a1a2e" stroke="#00ff88" strokeWidth={2} />
              <line x1={10} y1={40} x2={30} y2={40} stroke="#00ff88" strokeWidth={3} />
              <line x1={20} y1={30} x2={20} y2={50} stroke="#00ff88" strokeWidth={3} />
            </svg>
          </g>

          {electronSpeed > 0 && (
            <g>
              {[0, 0.15, 0.3, 0.45, 0.6, 0.75].map((offset, i) => {
                const progress = ((frame * 0.03 * electronSpeed + offset) % 1);
                let x: number, y: number;

                const pathLength = 800;
                const p = progress * pathLength;

                if (p < 150) {
                  x = 150;
                  y = 200 - p;
                } else if (p < 450) {
                  x = 150 + (p - 150);
                  y = 50;
                } else if (p < 550) {
                  x = 450;
                  y = 50 + (p - 450);
                } else if (p < 600) {
                  x = 450 - (p - 550) * 0.5;
                  y = 100 + (p - 550) * 2;
                } else if (p < 700) {
                  x = 400 - (p - 600);
                  y = 200;
                } else {
                  x = 200 + (p - 700);
                  y = 200;
                  if (p < 800) {
                    x = 400 - (p - 700);
                    y = 200 + (p - 700);
                  }
                }

                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r={6}
                      fill="#00ffff"
                      opacity={0.9}
                    >
                      <animate
                        attributeName="opacity"
                        values="0.9;0.5;0.9"
                        dur="0.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx={x}
                      cy={y}
                      r={12}
                      fill="none"
                      stroke="#00ffff"
                      strokeWidth={1}
                      opacity={0.5}
                    />
                  </g>
                );
              })}
            </g>
          )}
        </svg>
      </div>

      <Caption caption={caption} fontSize={36} />

      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          opacity: interpolate(frame, [0, 30, 60], [0, 0.3, 0.6]),
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