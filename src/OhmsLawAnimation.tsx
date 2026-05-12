import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Scene1_Hook } from "./scenes/Scene1_Hook";
import { Scene2_OhmsLawIntro } from "./scenes/Scene2_OhmsLawIntro";
import { Scene3_Current } from "./scenes/Scene3_Current";
import { Scene4_Resistance } from "./scenes/Scene4_Resistance";
import { Scene5_VoltageEffect } from "./scenes/Scene5_VoltageEffect";
import { Scene6_EquationBreakdown } from "./scenes/Scene6_EquationBreakdown";
import { Scene7_FinalSummary } from "./scenes/Scene7_FinalSummary";

const FPS = 30;
const SCENE_DURATIONS = {
  scene1: 10 * FPS,
  scene2: 15 * FPS,
  scene3: 15 * FPS,
  scene4: 20 * FPS,
  scene5: 20 * FPS,
  scene6: 20 * FPS,
  scene7: 20 * FPS,
};

const TRANSITION_DURATION = 15;

const calculateTotalDuration = () => {
  let total = 0;
  Object.values(SCENE_DURATIONS).forEach((duration) => {
    total += duration;
  });
  return total;
};

export const OhmsLawAnimation: React.FC = () => {
  const totalDuration = calculateTotalDuration();

  let currentOffset = 0;
  const scene1Start = currentOffset;
  currentOffset += SCENE_DURATIONS.scene1;

  const scene2Start = currentOffset;
  currentOffset += SCENE_DURATIONS.scene2;

  const scene3Start = currentOffset;
  currentOffset += SCENE_DURATIONS.scene3;

  const scene4Start = currentOffset;
  currentOffset += SCENE_DURATIONS.scene4;

  const scene5Start = currentOffset;
  currentOffset += SCENE_DURATIONS.scene5;

  const scene6Start = currentOffset;
  currentOffset += SCENE_DURATIONS.scene6;

  const scene7Start = currentOffset;
  currentOffset += SCENE_DURATIONS.scene7;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <Sequence from={scene1Start} durationInFrames={SCENE_DURATIONS.scene1}>
        <Scene1_Hook />
      </Sequence>

      <Sequence from={scene2Start} durationInFrames={SCENE_DURATIONS.scene2}>
        <Scene2_OhmsLawIntro />
      </Sequence>

      <Sequence from={scene3Start} durationInFrames={SCENE_DURATIONS.scene3}>
        <Scene3_Current />
      </Sequence>

      <Sequence from={scene4Start} durationInFrames={SCENE_DURATIONS.scene4}>
        <Scene4_Resistance />
      </Sequence>

      <Sequence from={scene5Start} durationInFrames={SCENE_DURATIONS.scene5}>
        <Scene5_VoltageEffect />
      </Sequence>

      <Sequence from={scene6Start} durationInFrames={SCENE_DURATIONS.scene6}>
        <Scene6_EquationBreakdown />
      </Sequence>

      <Sequence from={scene7Start} durationInFrames={SCENE_DURATIONS.scene7}>
        <Scene7_FinalSummary />
      </Sequence>
    </AbsoluteFill>
  );
};