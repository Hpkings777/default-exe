import React, {useMemo} from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {BackgroundGrid} from '../components/BackgroundEffects';
import {Scanlines, NoiseOverlay} from '../components/GlitchEffects';
import {COLORS} from '../constants';

export const Bridge: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();

	const localFrame = frame;

	const fadeIn = interpolate(localFrame, [0, 30], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const minimalPulse = interpolate(Math.sin(localFrame * 0.05), [-1, 1], [0.95, 1.05]);

	const breathPause = interpolate(localFrame, [0, 15, 30, 45, 60, 75, 90], [0, 0, 1, 0, 0, 1, 0], {
		extrapolateRight: 'clamp',
	});

	const droneOpacity = interpolate(localFrame, [0, 60], [0.1, 0.3], {
		extrapolateRight: 'clamp',
	});

	const lines = useMemo(() => {
		return Array.from({length: 5}, (_, i) => ({
			id: i,
			y: height * 0.3 + i * 80,
			opacity: interpolate(Math.sin(localFrame * 0.03 + i), [-1, 1], [0.1, 0.3]),
		}));
	}, [localFrame, height]);

	const rawFeel = interpolate(localFrame, [0, 120], [0.8, 1], {
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: '#020204',
				overflow: 'hidden',
				opacity: fadeIn,
			}}
		>
			<svg
				width={width}
				height={height}
				style={{position: 'absolute', top: 0, left: 0}}
			>
				<defs>
					<linearGradient id="bridgeBg" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#000" stopOpacity="0" />
						<stop offset="50%" stopColor="#0a0a10" stopOpacity="0.5" />
						<stop offset="100%" stopColor="#000" stopOpacity="0" />
					</linearGradient>
				</defs>
				<rect width="100%" height="100%" fill="url(#bridgeBg)" />
			</svg>

			<svg
				width={width}
				height={height}
				style={{position: 'absolute', top: 0, left: 0, opacity: droneOpacity}}
			>
				<defs>
					<radialGradient id="droneGlow">
						<stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.1" />
						<stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
					</radialGradient>
				</defs>
				<circle
					cx={width / 2}
					cy={height / 2}
					r={200}
					fill="url(#droneGlow)"
				/>
			</svg>

			{lines.map((line) => (
				<div
					key={line.id}
					style={{
						position: 'absolute',
						left: width * 0.2,
						right: width * 0.2,
						top: line.y,
						height: 1,
						backgroundColor: COLORS.dim,
						opacity: line.opacity,
					}}
				/>
			))}

			<div
				style={{
					position: 'absolute',
					top: height * 0.3,
					left: '50%',
					transform: `translateX(-50%) scale(${minimalPulse})`,
					textAlign: 'center',
					opacity: rawFeel,
				}}
			>
				<div
					style={{
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 56,
						fontWeight: 300,
						color: COLORS.text,
						letterSpacing: '0.1em',
						opacity: 0.9,
					}}
				>
					Sach kadwa hai
				</div>
				<div
					style={{
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 48,
						fontWeight: 300,
						color: COLORS.text,
						letterSpacing: '0.1em',
						marginTop: 30,
						opacity: 0.7,
					}}
				>
					Par sun le aaj
				</div>
			</div>

			<div
				style={{
					position: 'absolute',
					top: height * 0.55,
					left: '50%',
					transform: 'translateX(-50%)',
					textAlign: 'center',
					opacity: breathPause * 0.5,
				}}
			>
				<div
					style={{
						fontFamily: "'Courier New', monospace",
						fontSize: 24,
						color: COLORS.primary,
						letterSpacing: '0.2em',
					}}
				>
					[BREATH]
				</div>
			</div>

			<div
				style={{
					position: 'absolute',
					bottom: height * 0.25,
					left: '50%',
					transform: 'translateX(-50%)',
					textAlign: 'center',
					opacity: rawFeel,
				}}
			>
				<div
					style={{
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 48,
						fontWeight: 600,
						color: COLORS.text,
						letterSpacing: '0.08em',
						textShadow: `0 0 20px ${COLORS.primary}40`,
					}}
				>
					Tool se upar hota hai
				</div>
				<div
					style={{
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 36,
						fontWeight: 300,
						color: COLORS.primary,
						letterSpacing: '0.15em',
						marginTop: 10,
					}}
				>
					creator ka raaj
				</div>
			</div>

			<div
				style={{
					position: 'absolute',
					top: height * 0.08,
					left: '50%',
					transform: 'translateX(-50%)',
					fontFamily: "'Courier New', monospace",
					fontSize: 12,
					color: COLORS.dim,
					letterSpacing: '0.15em',
				}}
			>
				[BRIDGE // HALF-TIME // MELODIC DROP]
			</div>

			<div
				style={{
					position: 'absolute',
					top: height * 0.08,
					right: width * 0.05,
					fontFamily: "'Courier New', monospace",
					fontSize: 12,
					color: COLORS.dim,
				}}
			>
				<div>DRY KICK</div>
				<div>BARE PIANO</div>
				<div>LOW DRONE</div>
			</div>

			<div
				style={{
					position: 'absolute',
					bottom: height * 0.05,
					left: '50%',
					transform: 'translateX(-50%)',
					fontFamily: "'Courier New', monospace",
					fontSize: 10,
					color: COLORS.dim,
					letterSpacing: '0.2em',
					opacity: 0.3,
				}}
			>
				[RAW // UNMASTERED FEEL INTENDED]
			</div>

			<Scanlines opacity={0.03} />
			<NoiseOverlay opacity={0.01} />
		</div>
	);
};
