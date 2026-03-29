import React, {useMemo} from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring, Sequence} from 'remotion';
import {BootSequence} from './scenes/BootSequence';
import {BeatEntry} from './scenes/BeatEntry';
import {Chorus1} from './scenes/Chorus1';
import {RapidFire} from './scenes/RapidFire';
import {Bridge} from './scenes/Bridge';
import {FinalChorus} from './scenes/FinalChorus';
import {Outro} from './scenes/Outro';
import {AudioVisualizerBars, WaveformVisualizer} from './components/AudioVisualizer';
import {Scanlines, NoiseOverlay} from './components/GlitchEffects';
import {COLORS, SECTIONS} from './constants';

interface SceneWrapperProps {
	children: React.ReactNode;
	fadeIn?: number;
	fadeOut?: number;
}

const SceneWrapper: React.FC<SceneWrapperProps> = ({
	children,
	fadeIn = 15,
	fadeOut = 15,
}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const opacity = interpolate(
		frame,
		[0, fadeIn, durationInFrames - fadeOut, durationInFrames],
		[0, 1, 1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		},
	);

	return (
		<div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity}}>
			{children}
		</div>
	);
};

export const DefaultExe: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height, durationInFrames} = useVideoConfig();

	const currentSection = useMemo(() => {
		return SECTIONS.find(
			(section) => frame >= section.startFrame && frame < section.endFrame,
		);
	}, [frame]);

	const sectionProgress = useMemo(() => {
		if (!currentSection) return 0;
		return (frame - currentSection.startFrame) / (currentSection.endFrame - currentSection.startFrame);
	}, [frame, currentSection]);

	const globalPulse = interpolate(Math.sin(frame * 0.02), [-1, 1], [0.98, 1.02]);

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width,
				height,
				backgroundColor: COLORS.bg,
				transform: `scale(${globalPulse})`,
				transformOrigin: 'center center',
			}}
		>
			<Sequence from={0} durationInFrames={240} name="Boot">
				<BootSequence />
			</Sequence>

			<Sequence from={240} durationInFrames={1200} name="BeatEntry">
				<BeatEntry />
			</Sequence>

			<Sequence from={1440} durationInFrames={1560} name="Chorus1">
				<Chorus1 />
			</Sequence>

			<Sequence from={3000} durationInFrames={840} name="RapidFire">
				<RapidFire />
			</Sequence>

			<Sequence from={3840} durationInFrames={480} name="Bridge">
				<Bridge />
			</Sequence>

			<Sequence from={4320} durationInFrames={600} name="FinalChorus">
				<FinalChorus />
			</Sequence>

			<Sequence from={4920} durationInFrames={480} name="Outro">
				<Outro />
			</Sequence>

			<div
				style={{
					position: 'absolute',
					top: height * 0.02,
					left: width * 0.02,
					fontFamily: "'Courier New', monospace",
					fontSize: 12,
					color: COLORS.dim,
					letterSpacing: '0.1em',
					opacity: 0.5,
				}}
			>
				<div>TRACK: DEFAULT.EXE</div>
				<div>ARTIST: PHORIX</div>
			</div>

			<div
				style={{
					position: 'absolute',
					top: height * 0.02,
					right: width * 0.02,
					fontFamily: "'Courier New', monospace",
					fontSize: 12,
					color: COLORS.dim,
					textAlign: 'right',
					opacity: 0.5,
				}}
			>
				<div>SECTION: {currentSection?.name.toUpperCase() || 'N/A'}</div>
				<div>PROGRESS: {Math.round(sectionProgress * 100)}%</div>
			</div>

			<div
				style={{
					position: 'absolute',
					bottom: height * 0.02,
					left: width * 0.02,
					fontFamily: "'Courier New', monospace",
					fontSize: 10,
					color: COLORS.dim,
					opacity: 0.3,
				}}
			>
				<div>BPM: 148</div>
				<div>KEY: F# Minor</div>
			</div>

			<div
				style={{
					position: 'absolute',
					bottom: height * 0.02,
					right: width * 0.02,
					fontFamily: "'Courier New', monospace",
					fontSize: 10,
					color: COLORS.dim,
					textAlign: 'right',
					opacity: 0.3,
				}}
			>
				<div>FRAME: {frame}</div>
				<div>DURATION: {durationInFrames}</div>
			</div>

			<Scanlines opacity={0.05} />
			<NoiseOverlay opacity={0.015} />
		</div>
	);
};
