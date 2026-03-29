# DEFAULT.EXE - Music Video Animation

A full-fledged Remotion video animation for "DEFAULT.EXE" by PHORIX.

## Project Structure

```
src/
├── index.tsx              # Entry point
├── DefaultExe.tsx          # Main composition
├── constants.ts           # Lyrics, timing, colors
├── components/
│   ├── AudioVisualizer.tsx    # Spectrum bars, waveforms
│   ├── GlitchEffects.tsx      # Glitch text, scanlines
│   ├── BackgroundEffects.tsx  # Grid, particles, glows
│   └── Lyrics.tsx             # Synchronized lyrics display
└── scenes/
    ├── BootSequence.tsx   # 0:00 - 0:08
    ├── BeatEntry.tsx       # 0:08 - 0:48
    ├── Chorus1.tsx         # 0:48 - 1:40
    ├── RapidFire.tsx       # 1:40 - 2:08
    ├── Bridge.tsx          # 2:08 - 2:24
    ├── FinalChorus.tsx     # 2:24 - 2:44
    └── Outro.tsx           # 2:44 - end
```

## Video Specifications

- **Duration:** 180 seconds (3 minutes)
- **Frame Rate:** 30 FPS
- **Resolution:** 1920x1080
- **BPM:** 148
- **Key:** F# Minor

## Sections Timeline

| Section | Start | End | Duration |
|---------|-------|-----|----------|
| Boot Sequence | 0:00 | 0:08 | 8s |
| Beat Entry | 0:08 | 0:48 | 40s |
| Chorus 1 | 0:48 | 1:40 | 52s |
| Rapid Fire | 1:40 | 2:08 | 28s |
| Bridge | 2:08 | 2:24 | 16s |
| Final Chorus | 2:24 | 2:44 | 20s |
| Outro | 2:44 | 3:00 | 16s |

## Usage

### Development Preview
```bash
npm start
```

### Render Video
```bash
npm run build
```

### Add Audio (Optional)

To sync the animation with the actual audio:

1. Place your audio file in `public/default-exe.mp3`
2. Update `src/DefaultExe.tsx` to include the Audio component:

```tsx
import { Audio } from '@remotion/media';
import { staticFile } from 'remotion';

export const DefaultExe: React.FC = () => {
  return (
    <>
      <Audio src={staticFile('default-exe.mp3')} />
      {/* ... rest of composition */}
    </>
  );
};
```

3. Enable audio-reactive visualizations by using `useWindowedAudioData` and `visualizeAudio` from `@remotion/media-utils`

## Customization

### Modify Lyrics Timing
Edit `src/constants.ts` - the `LYRICS` array contains all lyrics with precise frame timings.

### Adjust Colors
Edit the `COLORS` object in `src/constants.ts`:
- `bg`: Background color
- `primary`: Main accent (green)
- `secondary`: Secondary accent (pink)
- `accent`: Tertiary accent (cyan)
- `glitch`: Glitch effect color (red-pink)

### Modify Section Timing
Edit the `SECTIONS` array in `src/constants.ts` to adjust when each scene plays.

## Notes

- All animations are frame-based using `useCurrentFrame()`
- No CSS animations (they don't render correctly)
- No Tailwind animations
- All timing is calculated in frames, not seconds
- The video runs at 30 FPS by default

## Dependencies

- remotion
- @remotion/media-utils (for audio visualization)
- react
