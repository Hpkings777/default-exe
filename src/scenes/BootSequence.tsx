import React, {useEffect} from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {BackgroundGrid} from '../components/BackgroundEffects';
import {Scanlines, GlitchText, NoiseOverlay} from '../components/GlitchEffects';
import {COLORS} from '../constants';

interface BootSequenceProps {
	onComplete?: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({onComplete}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();

	const beep1Opacity = interpolate(frame, [0, 5, 10, 15], [0, 1, 1, 0], {
		extrapolateRight: 'clamp',
	});
	const beep2Opacity = interpolate(frame, [15, 20, 25, 30], [0, 1, 1, 0], {
		extrapolateRight: 'clamp',
	});
	const beep3Opacity = interpolate(frame, [30, 35, 40, 45], [0, 1, 1, 0], {
		extrapolateRight: 'clamp',
	});
	const beep4Opacity = interpolate(frame, [45, 50, 55, 60], [0, 1, 1, 0], {
		extrapolateRight: 'clamp',
	});

	const glitchSnap = interpolate(frame, [50, 52, 54], [0, 1, 0], {
		extrapolateRight: 'clamp',
	});

	const initTextOpacity = interpolate(frame, [60, 75], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const typingProgress = interpolate(frame, [75, 120], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const fullOpacity = interpolate(frame, [120, 150], [1, 1], {
		extrapolateRight: 'clamp',
	});

	const fadeOut = interpolate(frame, [210, 240], [1, 0], {
		extrapolateRight: 'clamp',
	});

	const initTextChars = Math.floor(typingProgress * 6);
	const initText = 'Phorix. Initializing.'.slice(0, initTextChars);

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: COLORS.bg,
				opacity: fadeOut,
			}}
		>
			<BackgroundGrid opacity={0.1} />

			<svg
				width={width}
				height={height}
				style={{position: 'absolute', top: 0, left: 0}}
			>
				<rect x="0" y="0" width="100%" height="100%" fill={COLORS.bg} />

				<rect
					x={width * 0.1}
					y={height * 0.35}
					width={width * 0.8}
					height={height * 0.3}
					fill="none"
					stroke={COLORS.dim}
					strokeWidth={2}
				/>

				<rect
					x={width * 0.1 + 5}
					y={height * 0.35 + 5}
					width={width * 0.8 - 10}
					height={height * 0.3 - 10}
					fill="none"
					stroke={COLORS.primary + '40'}
					strokeWidth={1}
				/>
			</svg>

			<div
				style={{
					position: 'absolute',
					top: height * 0.4,
					left: width * 0.15,
					fontFamily: "'Courier New', monospace",
					fontSize: 24,
					color: COLORS.primary,
				}}
			>
				<div style={{opacity: beep1Opacity, marginBottom: 8}}>
					<span style={{color: COLORS.accent}}>[SYS]</span> Beep
				</div>
				<div style={{opacity: beep2Opacity, marginBottom: 8}}>
					<span style={{color: COLORS.accent}}>[SYS]</span> Beep
				</div>
				<div style={{opacity: beep3Opacity, marginBottom: 8}}>
					<span style={{color: COLORS.accent}}>[SYS]</span> Beep
				</div>
				<div style={{opacity: beep4Opacity}}>
					<span style={{color: COLORS.accent}}>[SYS]</span> Beep
				</div>
			</div>

			<div
				style={{
					position: 'absolute',
					top: height * 0.45,
					left: width * 0.15,
					fontFamily: "'Courier New', monospace",
					fontSize: 28,
					color: COLORS.glitch,
					opacity: glitchSnap,
					textShadow: `0 0 20px ${COLORS.glitch}`,
				}}
			>
				[ERROR] SYSTEM OVERRIDE DETECTED
			</div>

			<div
				style={{
					position: 'absolute',
					top: height * 0.52,
					left: width * 0.15,
					fontFamily: "'Courier New', monospace",
					fontSize: 24,
					color: COLORS.text,
					opacity: initTextOpacity,
				}}
			>
				<span style={{color: COLORS.accent}}>Phorix OS v2.0</span>
				<br />
				{initText}
				<span style={{animation: 'blink 0.5s infinite'}}>_</span>
			</div>

			<div
				style={{
					position: 'absolute',
					top: height * 0.65,
					left: width * 0.15,
					fontFamily: "'Courier New', monospace",
					fontSize: 18,
					color: COLORS.dim,
					opacity: fullOpacity,
				}}
			>
				<div>Loading modules...</div>
				<div>Initializing AI core...</div>
				<div>Calibrating neural network...</div>
				<div>System ready.</div>
			</div>

			<div
				style={{
					position: 'absolute',
					bottom: height * 0.1,
					left: width * 0.15,
					fontFamily: "'Orbitron', sans-serif",
					fontSize: 72,
					fontWeight: 700,
					color: COLORS.text,
					opacity: fullOpacity,
					textShadow: `0 0 40px ${COLORS.primary}, 0 0 80px ${COLORS.primary}40`,
					letterSpacing: '0.1em',
				}}
			>
				PHORIX
			</div>

			<Scanlines opacity={0.1} />
			<NoiseOverlay opacity={0.02} />
		</div>
	);
};
