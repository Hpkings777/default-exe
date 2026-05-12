import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { AbsoluteFill } from "remotion";
import { AnimatedBackground } from "../components/BackgroundEffects";
import { Caption } from "../components/Caption";
import { GlowEffect } from "../components/GlowEffects";

const caption = {
  text: "Ohm's Law connects voltage, current, and resistance.",
  startTime: 0,
  endTime: 15
};

const variableCaptions = [
  { text: "V = Voltage — electrical pressure", startTime: 4, endTime: 7 },
  { text: "I = Current — flow of electrons", startTime: 8, endTime: 11 },
  { text: "R = Resistance — opposition to flow", startTime: 11, endTime: 15 }
];

export const Scene2_OhmsLawIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const formulaScale = interpolate(frame, [0, 45], [0.3, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 4)
  });

  const formulaOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const glowPulse = interpolate(Math.sin(frame / fps * 3), [-1, 1], [0.6, 1]);

  const vHighlight = interpolate(frame, [90, 150], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const iHighlight = interpolate(frame, [180, 240], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const rHighlight = interpolate(frame, [270, 330], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const showVoltageLabel = frame >= 120 && frame < 210;
  const showCurrentLabel = frame >= 210 && frame < 300;
  const showResistanceLabel = frame >= 300 && frame < 390;

  const labelOpacity = interpolate(frame, [0, 30], [0, 1], {
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
          top: height / 2 - 80,
          transform: `translate(-50%, -50%) scale(${formulaScale})`,
          opacity: formulaOpacity,
        }}
      >
        <GlowEffect intensity={glowPulse * 0.8} color="#00ffff" blur={30}>
          <div
            style={{
              display: "flex",
              fontFamily: "system-ui, -apple-system, 'SF Pro Display', sans-serif",
              fontSize: 160,
              fontWeight: 200,
              color: "#ffffff",
              letterSpacing: "0.05em",
              textShadow: "0 0 40px rgba(0, 255, 255, 0.3)",
            }}
          >
            <span
              style={{
                color: vHighlight > 0.5 ? "#00ffff" : "#ffffff",
                textShadow: vHighlight > 0.5 ? "0 0 30px #00ffff, 0 0 60px #00ffff" : "none",
                fontWeight: vHighlight > 0.5 ? 600 : 200,
                transition: "all 0.3s ease",
              }}
            >
              V
            </span>
            <span style={{ opacity: 0.8 }}>=</span>
            <span
              style={{
                color: iHighlight > 0.5 ? "#00ffff" : "#ffffff",
                textShadow: iHighlight > 0.5 ? "0 0 30px #00ffff, 0 0 60px #00ffff" : "none",
                fontWeight: iHighlight > 0.5 ? 600 : 200,
                transition: "all 0.3s ease",
              }}
            >
              I
            </span>
            <span style={{ opacity: 0.8 }}>R</span>
          </div>
        </GlowEffect>
      </div>

      {showVoltageLabel && (
        <div
          style={{
            position: "absolute",
            left: width / 2 - 160,
            top: height / 2 + 100,
            transform: "translateX(-50%)",
            opacity: labelOpacity,
          }}
        >
          <GlowEffect intensity={0.6} color="#00ffff" blur={15}>
            <div
              style={{
                backgroundColor: "rgba(0, 255, 255, 0.1)",
                border: "2px solid #00ffff",
                borderRadius: 16,
                padding: "15px 30px",
              }}
            >
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 48, fontWeight: 700, color: "#00ffff" }}>
                V
              </div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, color: "#ffffff", marginTop: 5 }}>
                Voltage
              </div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, color: "#888888", marginTop: 8 }}>
                Electrical pressure that pushes electrons
              </div>
            </div>
          </GlowEffect>
        </div>
      )}

      {showCurrentLabel && (
        <div
          style={{
            position: "absolute",
            left: width / 2,
            top: height / 2 + 100,
            transform: "translateX(-50%)",
            opacity: labelOpacity,
          }}
        >
          <GlowEffect intensity={0.6} color="#00ffff" blur={15}>
            <div
              style={{
                backgroundColor: "rgba(0, 255, 255, 0.1)",
                border: "2px solid #00ffff",
                borderRadius: 16,
                padding: "15px 30px",
              }}
            >
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 48, fontWeight: 700, color: "#00ffff" }}>
                I
              </div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, color: "#ffffff", marginTop: 5 }}>
                Current
              </div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, color: "#888888", marginTop: 8 }}>
                Rate of electron flow
              </div>
            </div>
          </GlowEffect>
        </div>
      )}

      {showResistanceLabel && (
        <div
          style={{
            position: "absolute",
            left: width / 2 + 160,
            top: height / 2 + 100,
            transform: "translateX(-50%)",
            opacity: labelOpacity,
          }}
        >
          <GlowEffect intensity={0.6} color="#00ffff" blur={15}>
            <div
              style={{
                backgroundColor: "rgba(0, 255, 255, 0.1)",
                border: "2px solid #00ffff",
                borderRadius: 16,
                padding: "15px 30px",
              }}
            >
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 48, fontWeight: 700, color: "#00ffff" }}>
                R
              </div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, color: "#ffffff", marginTop: 5 }}>
                Resistance
              </div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, color: "#888888", marginTop: 8 }}>
                Opposition to current flow
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