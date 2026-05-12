import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { AbsoluteFill } from "remotion";
import { AnimatedBackground } from "../components/BackgroundEffects";
import { Caption } from "../components/Caption";
import { GlowEffect } from "../components/GlowEffects";

const caption = {
  text: "More voltage increases current. More resistance reduces it.",
  startTime: 0,
  endTime: 20
};

export const Scene6_EquationBreakdown: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const equationOpacity = interpolate(frame, [0, 45], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const voltagePhase = frame < 150;
  const resistancePhase = frame >= 150 && frame < 300;

  const voltageValue = voltagePhase ? interpolate(frame, [60, 150], [5, 10], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  }) : 10;

  const resistanceValue = resistancePhase ? interpolate(frame, [210, 300], [2, 5], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  }) : 5;

  const currentValue = voltagePhase 
    ? interpolate(frame, [60, 150], [2.5, 5], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    : resistancePhase 
    ? interpolate(frame, [210, 300], [5, 2], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    : 2;

  const voltageHighlight = voltagePhase ? interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  }) : 0;

  const resistanceHighlight = resistancePhase ? interpolate(frame, [210, 240], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  }) : 0;

  const currentHighlight = voltagePhase || resistancePhase ? interpolate(frame, [120, 150], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  }) : 0;

  const graphOpacity = interpolate(frame, [30, 90], [0, 1], {
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
          top: height * 0.25,
          transform: "translate(-50%, -50%)",
          opacity: equationOpacity,
        }}
      >
        <GlowEffect intensity={0.7} color="#00ffff" blur={25}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 100,
              fontWeight: 200,
              color: "#ffffff",
              letterSpacing: "0.05em",
            }}
          >
            <span
              style={{
                color: voltageHighlight > 0.5 ? "#00ffff" : "#ffffff",
                fontWeight: voltageHighlight > 0.5 ? 700 : 200,
                textShadow: voltageHighlight > 0.5 ? "0 0 30px #00ffff" : "none",
                transition: "all 0.3s ease",
              }}
            >
              I
            </span>
            <span style={{ opacity: 0.6, margin: "0 15px" }}>=</span>
            <span
              style={{
                color: voltageHighlight > 0.5 ? "#00ffff" : "#ffffff",
                fontWeight: voltageHighlight > 0.5 ? 700 : 200,
                textShadow: voltageHighlight > 0.5 ? "0 0 30px #00ffff" : "none",
                transition: "all 0.3s ease",
              }}
            >
              V
            </span>
            <span style={{ opacity: 0.6, margin: "0 15px" }}>/</span>
            <span
              style={{
                color: resistanceHighlight > 0.5 ? "#ff6600" : "#ffffff",
                fontWeight: resistanceHighlight > 0.5 ? 700 : 200,
                textShadow: resistanceHighlight > 0.5 ? "0 0 30px #ff6600" : "none",
                transition: "all 0.3s ease",
              }}
            >
              R
            </span>
          </div>
        </GlowEffect>
      </div>

      <div
        style={{
          position: "absolute",
          left: width * 0.25,
          top: height * 0.55,
          transform: "translate(-50%, -50%)",
          opacity: graphOpacity,
        }}
      >
        <GlowEffect intensity={voltageHighlight * 0.6} color="#00ffff" blur={15}>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              border: "2px solid #00ffff",
              borderRadius: 16,
              padding: "20px 30px",
              minWidth: 150,
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, color: "#888888", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Voltage (V)
            </div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 48,
                fontWeight: 700,
                color: "#00ffff",
                textShadow: "0 0 20px #00ffff",
              }}
            >
              {voltageValue.toFixed(1)}V
            </div>
            <div
              style={{
                marginTop: 10,
                height: 6,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(voltageValue / 12) * 100}%`,
                  height: "100%",
                  backgroundColor: "#00ffff",
                  borderRadius: 3,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>
        </GlowEffect>
      </div>

      <div
        style={{
          position: "absolute",
          left: width / 2,
          top: height * 0.55,
          transform: "translate(-50%, -50%)",
          opacity: graphOpacity,
        }}
      >
        <GlowEffect intensity={currentHighlight * 0.6} color="#00ff00" blur={15}>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              border: "2px solid #00ff00",
              borderRadius: 16,
              padding: "20px 30px",
              minWidth: 150,
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, color: "#888888", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Current (I)
            </div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 48,
                fontWeight: 700,
                color: "#00ff00",
                textShadow: "0 0 20px #00ff00",
              }}
            >
              {currentValue.toFixed(1)}A
            </div>
            <div
              style={{
                marginTop: 10,
                height: 6,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(currentValue / 6) * 100}%`,
                  height: "100%",
                  backgroundColor: "#00ff00",
                  borderRadius: 3,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>
        </GlowEffect>
      </div>

      <div
        style={{
          position: "absolute",
          left: width * 0.75,
          top: height * 0.55,
          transform: "translate(-50%, -50%)",
          opacity: graphOpacity,
        }}
      >
        <GlowEffect intensity={resistanceHighlight * 0.6} color="#ff6600" blur={15}>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              border: "2px solid #ff6600",
              borderRadius: 16,
              padding: "20px 30px",
              minWidth: 150,
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, color: "#888888", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Resistance (R)
            </div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 48,
                fontWeight: 700,
                color: "#ff6600",
                textShadow: "0 0 20px #ff6600",
              }}
            >
              {resistanceValue.toFixed(1)}Ω
            </div>
            <div
              style={{
                marginTop: 10,
                height: 6,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(resistanceValue / 6) * 100}%`,
                  height: "100%",
                  backgroundColor: "#ff6600",
                  borderRadius: 3,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>
        </GlowEffect>
      </div>

      {frame >= 330 && (
        <div
          style={{
            position: "absolute",
            left: width / 2,
            top: height * 0.82,
            transform: "translateX(-50%)",
            opacity: interpolate(frame, [330, 360], [0, 1]),
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              border: "1px solid #00ffff",
              borderRadius: 12,
              padding: "15px 40px",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 22, color: "#ffffff" }}>
              V ↑ → I ↑ &nbsp;&nbsp;|&nbsp;&nbsp; R ↑ → I ↓
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