import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { AbsoluteFill } from "remotion";
import { AnimatedBackground } from "../components/BackgroundEffects";
import { Caption } from "../components/Caption";
import { GlowEffect } from "../components/GlowEffects";

const caption = {
  text: "Current is the flow of electric charge through a conductor.",
  startTime: 0,
  endTime: 15
};

export const Scene3_Current: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const leftWireOpacity = interpolate(frame, [0, 45], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const rightWireOpacity = interpolate(frame, [30, 75], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const slowElectronSpeed = 0.02;
  const fastElectronSpeed = 0.08;

  const leftBulbBrightness = interpolate(frame, [60, 120], [0.2, 0.4], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const rightBulbBrightness = interpolate(frame, [60, 120], [0.4, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const labelLeftOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const labelRightOpacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const dividerOpacity = interpolate(frame, [0, 30], [0, 0.3], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <AnimatedBackground />

      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        <line
          x1={width / 2}
          y1={height * 0.2}
          x2={width / 2}
          y2={height * 0.8}
          stroke="#00ffff"
          strokeWidth={1}
          strokeDasharray="10 5"
          opacity={dividerOpacity}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left: width * 0.25,
          top: height / 2,
          transform: "translate(-50%, -50%)",
          opacity: leftWireOpacity,
        }}
      >
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 20,
            color: "#888888",
            textAlign: "center",
            marginBottom: 20,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Low Current
        </div>

        <svg width="350" height="250" viewBox="0 0 350 250">
          <defs>
            <filter id="leftWireGlow">
              <feGaussianBlur stdDeviation={5} />
              <feFlood floodColor="#00ffff" floodOpacity={0.5} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="leftBulbGlow">
              <feGaussianBlur stdDeviation={leftBulbBrightness * 25} />
              <feFlood floodColor="#ffee00" floodOpacity={leftBulbBrightness * 0.5} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#leftWireGlow)">
            <rect x={50} y={80} width={250} height={90} rx={45} fill="none" stroke="#00ffff" strokeWidth={4} />
          </g>

          <circle cx={175} cy={125} r={25} fill="#ffee00" opacity={leftBulbBrightness * 0.3} filter="url(#leftBulbGlow)" />

          {[0, 0.25, 0.5, 0.75].map((offset, i) => {
            const progress = ((frame * slowElectronSpeed + offset) % 1);
            const x = 50 + progress * 250;
            const y = 125 + Math.sin(progress * Math.PI * 2) * 30;

            return (
              <g key={i}>
                <circle cx={x} cy={y} r={5} fill="#00ffff" opacity={0.9}>
                  <animate attributeName="opacity" values="0.9;0.5;0.9" dur="0.8s" repeatCount="indefinite" />
                </circle>
                <circle cx={x} cy={y} r={10} fill="none" stroke="#00ffff" strokeWidth={1} opacity={0.4} />
              </g>
            );
          })}
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          left: width * 0.75,
          top: height / 2,
          transform: "translate(-50%, -50%)",
          opacity: rightWireOpacity,
        }}
      >
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 20,
            color: "#00ffff",
            textAlign: "center",
            marginBottom: 20,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          High Current
        </div>

        <svg width="350" height="250" viewBox="0 0 350 250">
          <defs>
            <filter id="rightWireGlow">
              <feGaussianBlur stdDeviation={8} />
              <feFlood floodColor="#00ffff" floodOpacity={0.7} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="rightBulbGlow">
              <feGaussianBlur stdDeviation={rightBulbBrightness * 30} />
              <feFlood floodColor="#ffee00" floodOpacity={rightBulbBrightness * 0.7} />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#rightWireGlow)">
            <rect x={50} y={80} width={250} height={90} rx={45} fill="none" stroke="#00ffff" strokeWidth={4} />
          </g>

          <circle cx={175} cy={125} r={30} fill="#ffee00" opacity={rightBulbBrightness * 0.4} filter="url(#rightBulbGlow)" />

          {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((offset, i) => {
            const progress = ((frame * fastElectronSpeed + offset) % 1);
            const x = 50 + progress * 250;
            const y = 125 + Math.sin(progress * Math.PI * 2) * 30;

            return (
              <g key={i}>
                <circle cx={x} cy={y} r={6} fill="#00ffff" opacity={0.9}>
                  <animate attributeName="opacity" values="0.9;0.4;0.9" dur="0.3s" repeatCount="indefinite" />
                </circle>
                <circle cx={x} cy={y} r={12} fill="none" stroke="#00ffff" strokeWidth={1} opacity={0.5}>
                  <animate attributeName="r" values="8;14;8" dur="0.3s" repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}
        </svg>
      </div>

      {labelLeftOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: width * 0.25,
            top: height * 0.85,
            transform: "translateX(-50%)",
            opacity: labelLeftOpacity,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              border: "1px solid #888888",
              borderRadius: 8,
              padding: "10px 20px",
            }}
          >
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 18, color: "#888888" }}>
              Few electrons, slow movement
            </div>
          </div>
        </div>
      )}

      {labelRightOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: width * 0.75,
            top: height * 0.85,
            transform: "translateX(-50%)",
            opacity: labelRightOpacity,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              border: "1px solid #00ffff",
              borderRadius: 8,
              padding: "10px 20px",
            }}
          >
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 18, color: "#00ffff" }}>
              Many electrons, fast movement
            </div>
          </div>
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