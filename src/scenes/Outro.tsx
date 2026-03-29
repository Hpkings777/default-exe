import React, {useMemo} from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {BackgroundGrid} from '../components/BackgroundEffects';
import {Scanlines, NoiseOverlay} from '../components/GlitchEffects';
import {COLORS} from '../constants';

export const Outro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();

	const localFrame = frame;

	const fadeProgress = interpolate(localFrame, [0, 120], [1, 0], {
		extrapolateRight: 'clamp',
	});

	const lowPassProgress = interpolate(localFrame, [0, 240], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const reverseBootOpacity = interpolate(localFrame, [0, 60], [0, 0.8], {
		extrapolateRight: 'clamp',
	});

	const reverseBootFade = interpolate(localFrame, [360, 420], [1, 0], {
		extrapolateRight: 'clamp',
	});

	const machineClickOpacity = interpolate(localFrame, [420, 430], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const machineClickFade = interpolate(localFrame, [430, 450], [1, 0], {
		extrapolateRight: 'clamp',
	});

	const textOpacity = interpolate(localFrame, [60, 120], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const text2Opacity = interpolate(localFrame, [180, 240], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const text3Opacity = interpolate(localFrame, [300, 360], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const finalTextOpacity = interpolate(localFrame, [420, 480], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const gridFade = interpolate(localFrame, [0, 240], [0.1, 0], {
		extrapolateRight: 'clamp',
	});

	const lowPassFilter = 20000 - lowPassProgress * 19800;

	const beatPulse = interpolate(Math.sin(localFrame * 0.05), [-1, 1], [0.95, 1.05]);

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: COLORS.bg,
				overflow: 'hidden',
				opacity: fadeProgress,
			}}
		>
			<BackgroundGrid opacity={gridFade} animate={false} gridSize={60} />

			<svg
				width={width}
				height={height}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					filter: `blur(${lowPassProgress * 2}px)`,
				}}
			>
				<defs>
					<radialGradient id="outroGlow">
						<stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.05" />
						<stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
					</radialGradient>
				</defs>
				<circle
					cx={width / 2}
					cy={height / 2}
					r={300}
					fill="url(#outroGlow)"
				/>
			</svg>

			<div
				style={{
					position: 'absolute',
					top: height * 0.35,
					left: '50%',
					transform: `translateX(-50%) scale(${beatPulse})`,
					textAlign: 'center',
				}}
			>
				<div
					style={{
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 64,
						fontWeight: 300,
						color: COLORS.text,
						letterSpacing: '0.1em',
						opacity: textOpacity * fadeProgress,
						textShadow: `0 0 20px ${COLORS.primary}40`,
					}}
				>
					No hate
				</div>
				<div
					style={{
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 48,
						fontWeight: 300,
						color: COLORS.dim,
						letterSpacing: '0.15em',
						marginTop: 20,
						opacity: textOpacity * fadeProgress,
					}}
				>
					bas clarity
				</div>
			</div>

			<div
				style={{
					position: 'absolute',
					top: height * 0.5,
					left: '50%',
					transform: 'translateX(-50%)',
					textAlign: 'center',
					opacity: text2Opacity * fadeProgress,
				}}
			>
				<div
					style={{
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 48,
						fontWeight: 400,
						color: COLORS.text,
						letterSpacing: '0.12em',
					}}
				>
					Game seekh
				</div>
				<div
					style={{
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 36,
						fontWeight: 300,
						color: COLORS.dim,
						letterSpacing: '0.2em',
						marginTop: 10,
					}}
				>
					phir aana
				</div>
			</div>

			<div
				style={{
					position: 'absolute',
					top: height * 0.62,
					left: '50%',
					transform: 'translateX(-50%)',
					textAlign: 'center',
					opacity: text3Opacity * fadeProgress,
				}}
			>
				<div
					style={{
						fontFamily: "'Courier New', monospace",
						fontSize: 28,
						fontWeight: 400,
						color: COLORS.text,
						letterSpacing: '0.15em',
					}}
				>
					System off.
				</div>
			</div>

			<div
				style={{
					position: 'absolute',
					top: height * 0.75,
					left: '50%',
					transform: 'translateX(-50%)',
					textAlign: 'center',
					opacity: finalTextOpacity,
				}}
			>
				<div
					style={{
						fontFamily: "'Orbitron', sans-serif",
						fontSize: 80,
						fontWeight: 800,
						color: COLORS.primary,
						letterSpacing: '0.2em',
						textShadow: `0 0 30px ${COLORS.primary}, 0 0 60px ${COLORS.primary}60`,
					}}
				>
					PHORIX
				</div>
				<div
					style={{
						fontFamily: "'Orbitron', sans-serif",
						fontSize: 32,
						fontWeight: 400,
						color: COLORS.dim,
						letterSpacing: '0.3em',
						marginTop: 10,
					}}
				>
					out.
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
					letterSpacing: '0.2em',
					opacity: reverseBootOpacity * reverseBootFade,
				}}
			>
				[REVERSE BOOT SEQUENCE]
			</div>

			<div
				style={{
					position: 'absolute',
					top: height * 0.08,
					right: width * 0.05,
					fontFamily: "'Courier New', monospace",
					fontSize: 12,
					color: COLORS.dim,
					opacity: machineClickOpacity * machineClickFade,
				}}
			>
				[MACHINE CLICK]
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
					letterSpacing: '0.15em',
					opacity: 0.3,
				}}
			>
				[LOW-PASS FILTER: {Math.round(lowPassFilter)}Hz → 200Hz]
			</div>

			<Scanlines opacity={0.02} />
			<NoiseOverlay opacity={0.01} />
		</div>
	);
};
