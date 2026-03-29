import React, {useMemo} from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {BackgroundGrid, AmbientGlow, PerspectiveGrid} from '../components/BackgroundEffects';
import {Scanlines, NoiseOverlay, GlitchText} from '../components/GlitchEffects';
import {COLORS} from '../constants';

export const BeatEntry: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();

	const localFrame = frame;

	const subBassOpacity = interpolate(localFrame, [0, 120], [0, 0.6], {
		extrapolateRight: 'clamp',
	});

	const kickDropFrame = 120;
	const kickDropProgress = interpolate(localFrame, [kickDropFrame, kickDropFrame + 30], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const kickPulse = interpolate(localFrame, [120, 121], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const kickOpacity = interpolate(localFrame, [120, 140], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const reverbPulse = interpolate(localFrame, [0, 30, 60, 90], [0.2, 0.4, 0.3, 0.5], {
		extrapolateRight: 'clamp',
	});

	const vinylCrackle = localFrame % 10 < 3 ? 0.1 : 0;

	const ambientPulse = interpolate(Math.sin(localFrame * 0.1), [-1, 1], [0.8, 1.2]);

	const waveformOffset = (localFrame * 2) % 100;

	const titleOpacity = interpolate(localFrame, [100, 150], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const titleScale = spring({
		frame: localFrame - 100,
		fps,
		config: {damping: 12, stiffness: 100},
	});

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
			}}
		>
			<BackgroundGrid opacity={0.12} animate={true} />
			<PerspectiveGrid intensity={0.8} />

			<AmbientGlow
				color={COLORS.primary}
				x={30}
				y={70}
				size={500}
				blur={250}
				opacity={0.1 * subBassOpacity}
			/>
			<AmbientGlow
				color={COLORS.secondary}
				x={70}
				y={30}
				size={400}
				blur={200}
				opacity={0.08 * subBassOpacity}
			/>

			<svg
				width={width}
				height={height}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					opacity: kickOpacity,
				}}
			>
				<defs>
					<radialGradient id="kickPulseGradient">
						<stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.3} />
						<stop offset="100%" stopColor={COLORS.primary} stopOpacity={0} />
					</radialGradient>
				</defs>
				<circle
					cx={width / 2}
					cy={height / 2}
					r={100 + kickPulse * 400}
					fill="url(#kickPulseGradient)"
				/>
			</svg>

			<div
				style={{
					position: 'absolute',
					bottom: height * 0.1,
					left: 0,
					right: 0,
					height: 4,
					background: `linear-gradient(90deg, 
						transparent, 
						${COLORS.primary}40 ${10 + waveformOffset}%, 
						${COLORS.primary} ${20 + waveformOffset}%, 
						${COLORS.primary}80 ${30 + waveformOffset}%, 
						${COLORS.primary} ${40 + waveformOffset}%, 
						transparent
					)`,
					opacity: subBassOpacity,
					filter: `blur(${2 - subBassOpacity * 1.5}px)`,
				}}
			/>

			<div
				style={{
					position: 'absolute',
					top: height * 0.3,
					left: width * 0.1,
					fontFamily: "'Courier New', monospace",
					fontSize: 16,
					color: COLORS.dim,
					opacity: reverbPulse,
				}}
			>
				<div>[808 KICK DROP]</div>
				<div>[VINYL CRACKLE: {vinylCrackle > 0 ? 'ACTIVE' : 'STANDBY'}]</div>
				<div>[AMBIENCE: CYBERPUNK]</div>
			</div>

			<div
				style={{
					position: 'absolute',
					top: height * 0.4,
					left: '50%',
					transform: `translateX(-50%) scale(${titleScale})`,
					opacity: titleOpacity,
					textAlign: 'center',
				}}
			>
				<div
					style={{
						fontFamily: "'Orbitron', sans-serif",
						fontSize: 120,
						fontWeight: 800,
						color: COLORS.text,
						letterSpacing: '0.15em',
						textShadow: `0 0 60px ${COLORS.primary}, 0 0 120px ${COLORS.primary}60`,
					}}
				>
					DEFAULT
				</div>
				<div
					style={{
						fontFamily: "'Orbitron', sans-serif",
						fontSize: 80,
						fontWeight: 400,
						color: COLORS.primary,
						letterSpacing: '0.3em',
						marginTop: -20,
					}}
				>
					.EXE
				</div>
			</div>

			<div
				style={{
					position: 'absolute',
					bottom: height * 0.05,
					left: '50%',
					transform: 'translateX(-50%)',
					fontFamily: "'Rajdhani', sans-serif",
					fontSize: 32,
					color: COLORS.dim,
					letterSpacing: '0.2em',
					opacity: titleOpacity,
				}}
			>
				PHORIX
			</div>

			<Scanlines opacity={0.08} />
			<NoiseOverlay opacity={0.02} />
		</div>
	);
};
