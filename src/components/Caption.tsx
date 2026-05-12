import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { AbsoluteFill } from "remotion";

interface CaptionData {
  text: string;
  startTime: number;
  endTime: number;
}

interface CaptionProps {
  caption: CaptionData;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  padding?: number;
  borderRadius?: number;
}

export const Caption: React.FC<CaptionProps> = ({
  caption,
  fontSize = 42,
  color = "#ffffff",
  backgroundColor = "rgba(0, 0, 0, 0.7)",
  padding = 20,
  borderRadius = 12
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const startFrame = caption.startTime * fps;
  const endFrame = caption.endTime * fps;
  
  const fadeInDuration = 10;
  const fadeOutDuration = 10;
  
  const opacity = interpolate(
    frame,
    [
      startFrame - fadeInDuration,
      startFrame,
      endFrame,
      endFrame + fadeOutDuration
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  const isVisible = frame >= startFrame - fadeInDuration && frame <= endFrame + fadeOutDuration;
  
  if (!isVisible) return null;
  
  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        opacity,
        backgroundColor,
        color,
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        fontSize,
        fontWeight: 500,
        padding: `${padding}px ${padding * 2}px`,
        borderRadius,
        textAlign: "center",
        maxWidth: "90%",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
        letterSpacing: "0.02em",
        lineHeight: 1.4,
      }}
    >
      {caption.text}
    </div>
  );
};

interface CaptionOverlayProps {
  captions: CaptionData[];
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
}

export const CaptionOverlay: React.FC<CaptionOverlayProps> = ({
  captions,
  ...props
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const currentCaption = captions.find(
    c => frame >= c.startTime * fps && frame <= c.endTime * fps
  );
  
  if (!currentCaption) return null;
  
  return <Caption caption={currentCaption} {...props} />;
};

export const createCaptionsArray = (
  captionData: Array<{ text: string; start: number; end: number }>
): CaptionData[] => {
  return captionData.map(c => ({
    text: c.text,
    startTime: c.start,
    endTime: c.end
  }));
};