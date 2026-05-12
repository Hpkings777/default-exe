import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { AbsoluteFill } from "remotion";
import { AnimatedBackground } from "../components/BackgroundEffects";
import { Caption } from "../components/Caption";
import { GlowEffect } from "../components/GlowEffects";

const caption = {
  text: "Increasing voltage increases current when resistance stays constant.",
  startTime: 0,
  endTime: 20
};

export const Scene5_VoltageEffect: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const leftReveal = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const rightReveal = interpolate(frame, [90, 150], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const smallBatteryGlow = interpolate(frame, [60, 120], [0.3, 0.6], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const largeBatteryGlow = interpolate(frame, [150, 210], [0.5, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const smallBulbBrightness = interpolate(frame, [60, 120], [0.2, 0.4], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const largeBulbBrightness = interpolate(frame, [150, 210], [0.5, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const smallElectronSpeed = 0.015;
  const largeElectronSpeed = 0.06;

  const cameraShift = interpolate(frame, [120, 180], [0, 0], {
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
          top: height / 2,
          transform: `translate(-50%, -50%) translateX(${-width * 0.15}px)`,
          opacity: leftReveal,
        }}
      >
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 24,
            color: "#00ff88",
            textAlign: "center",
            marginBottom: 20,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          Small Battery (1.5V)
        </div>

        <svg width="400" height="350" viewBox="0 0 400 350">
          <defs>
            <filter id="smallWireGlow">
              <feGaussianBlur stdDeviation={4} />
              <feFlood floodColor="#00ffff" floodOpacity={0.4} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="smallBulbGlow">
              <feGaussianBlur stdDeviation={smallBulbBrightness * 20} />
              <feFlood floodColor="#ffee00" floodOpacity={smallBulbBrightness * 0.4} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="smallBatteryGlow">
              <feGaussianBlur stdDeviation={smallBatteryGlow * 15} />
              <feFlood floodColor="#00ff88" floodOpacity={smallBatteryGlow * 0.5} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x={100} y={100} width={200} height={150} rx={75} fill="none" stroke="#00ffff" strokeWidth={4} filter="url(#smallWireGlow)" />

          <g transform="translate(200, 175)" filter="url(#smallBatteryGlow)">
            <rect x={-25} y={-20} width={50} height={40} rx={4} fill="#1a1a2e" stroke="#00ff88" strokeWidth={2} />
            <rect x={25} y={-10} width={10} height={20} rx={2} fill="#1a1a2e" stroke="#00ff88" strokeWidth={2} />
          </g>

          <circle cx={200} cy={175} r={20} fill="#ffee00" opacity={smallBulbBrightness * 0.3} filter="url(#smallBulbGlow)" />

          {[0, 0.2, 0.4, 0.6, 0.8].map((offset, i) => {
            const progress = ((frame * smallElectronSpeed + offset) % 1);
            const x = 100 + progress * 200;
            const y = 175 + Math.sin(progress * Math.PI * 2) * 50;

            return (
              <g key={i}>
                <circle cx={x} cy={y} r={5} fill="#00ffff" opacity={0.8}>
                  <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1s" repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}

          <div
            style={{
              position: "absolute",
              top: 280,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(0, 255, 136, 0.1)",
              border: "1px solid #00ff88",
              borderRadius: 8,
              padding: "10px 20px",
            }}
          >
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, color: "#00ff88" }}>
              Low electron pressure
            </div>
          </div>
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          left: width / 2,
          top: height / 2,
          transform: `translate(-50%, -50%) translateX(${width * 0.15}px)`,
          opacity: rightReveal,
        }}
      >
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 24,
            color: "#00ff88",
            textAlign: "center",
            marginBottom: 20,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          Large Battery (9V)
        </div>

        <svg width="400" height="350" viewBox="0 0 400 350">
          <defs>
            <filter id="largeWireGlow">
              <feGaussianBlur stdDeviation={8} />
              <feFlood floodColor="#00ffff" floodOpacity={0.7} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="largeBulbGlow">
              <feGaussianBlur stdDeviation={largeBulbBrightness * 35} />
              <feFlood floodColor="#ffee00" floodOpacity={largeBulbBrightness * 0.7} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="largeBatteryGlow">
              <feGaussianBlur stdDeviation={largeBatteryGlow * 25} />
              <feFlood floodColor="#00ff88" floodOpacity={largeBatteryGlow * 0.8} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x={100} y={100} width={200} height={150} rx={75} fill="none" stroke="#00ffff" strokeWidth={5} filter="url(#largeWireGlow)" />

          <g transform="translate(200, 175)" filter="url(#largeBatteryGlow)">
            <rect x={-35} y={-25} width={70} height={50} rx={4} fill="#1a1a2e" stroke="#00ff88" strokeWidth={3} />
            <rect x={35} y={-12} width={12} height={24} rx={2} fill="#1a1a2e" stroke="#00ff88" strokeWidth={2} />
            <line x1={-20} y1={0} x2={0} y2={0} stroke="#00ff88" strokeWidth={4} />
            <line x1={-10} y1={-12} x2={-10} y2={12} stroke="#00ff88" strokeWidth={4} />
          </g>

          <circle cx={200} cy={175} r={30} fill="#ffee00" opacity={largeBulbBrightness * 0.5} filter="url(#largeBulbGlow)" />

          {[0, 0.08, 0.16, 0.24, 0.32, 0.4, 0.48, 0.56, 0.64, 0.72, 0.8, 0.88, 0.96].map((offset, i) => {
            const progress = ((frame * largeElectronSpeed + offset) % 1);
            const x = 100 + progress * 200;
            const y = 175 + Math.sin(progress * Math.PI * 2) * 50;

            return (
              <g key={i}>
                <circle cx={x} cy={y} r={6} fill="#00ffff" opacity={0.9}>
                  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="0.3s" repeatCount="indefinite" />
                </circle>
                <circle cx={x} cy={y} r={10} fill="none" stroke="#00ffff" strokeWidth={1} opacity={0.4}>
                  <animate attributeName="r" values="6;12;6" dur="0.3s" repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}

          <div
            style={{
              position: "absolute",
              top: 280,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(0, 255, 136, 0.2)",
              border: "2px solid #00ff88",
              borderRadius: 8,
              padding: "10px 20px",
            }}
          >
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, color: "#00ff88", fontWeight: 600 }}>
              High electron pressure
            </div>
          </div>
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          left: width / 2,
          top: height * 0.9,
          transform: "translateX(-50%)",
          opacity: interpolate(frame, [240, 270], [0, 1]),
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            border: "1px solid #00ffff",
            borderRadius: 12,
            padding: "15px 30px",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 20, color: "#ffffff" }}>
            More voltage = More current (R stays constant)
          </div>
        </div>
      </div>

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