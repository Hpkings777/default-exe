import { Composition, registerRoot } from 'remotion';
import { OhmsLawAnimation } from './OhmsLawAnimation';
import React from 'react';

const RemotionRoot: React.FC = () => {
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

  const totalDuration = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

  return (
    <>
      <Composition
        id="OHMS_LAW"
        component={OhmsLawAnimation}
        durationInFrames={totalDuration}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="DEFAULT_EXE"
        component={OhmsLawAnimation}
        durationInFrames={totalDuration}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);