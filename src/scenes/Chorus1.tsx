import React, {useMemo} from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {BackgroundGrid, AmbientGlow, CircuitLines} from '../components/BackgroundEffects';
import {Scanlines, NoiseOverlay, GlitchText} from '../components/GlitchEffects';
import {LyricDisplay} from '../components/Lyrics';
import {COLORS, LYRICS} from '../constants';

export const Chorus1: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();

	const localFrame = frame;

	const chorusStart = 0;
	const currentTime = localFrame + chorusStart;

	const whooshProgress = interpolate(localFrame, [0, 15], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const whooshX = interpolate(whooshProgress, [0, 1], [-width, width]);

	const snareReverb = interpolate(localFrame, [15, 45], [0.3, 0.8], {
		extrapolateRight: 'clamp',
	});

	const vocalDubblePulse = interpolate(Math.sin(localFrame * 0.3), [-1, 1], [0.9, 1.1]);

	const spectrumBars = useMemo(() => {
		return Array.from({length: 32}, (_, i) => {
			const baseFreq = Math.sin(localFrame * 0.1 + i * 0.3) * 0.3 + 0.5;
			const beatPulse = (localFrame % 30 < 5) ? Math.sin(localFrame * 0.5) * 0.3 : 0;
			return Math.min(1, baseFreq + beatPulse);
		});
	}, [localFrame]);

	const energyPulse = interpolate(Math.sin(localFrame * 0.2), [-1, 1], [0.8, 1.2]);

	const whisperOpacity = interpolate(Math.sin(localFrame * 0.15), [-1, 1], [0.3, 0.7]);

	const titleBounce = spring({
		frame: localFrame,
		fps,
		config: {damping: 8, stiffness: 150},
	});

	const titleScale = interpolate(titleBounce, [0, 1], [0.95, 1.05]);

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
			<BackgroundGrid opacity={0.15} animate={true} />

			<div
				style={{
					position: 'absolute',
					top: 0,
					left: whooshX,
					right: 0,
					bottom: 0,
					background: `linear-gradient(90deg, transparent 40%, ${COLORS.primary}20 50%, transparent 60%)`,
					opacity: whooshProgress * 0.5,
				}}
			/>

			<AmbientGlow
				color={COLORS.primary}
				x={50}
				y={50}
				size={600}
				blur={300}
				opacity={0.15 * energyPulse}
			/>

			<AmbientGlow
				color={COLORS.secondary}
				x={20}
				y={80}
				size={400}
				blur={200}
				opacity={0.1 * energyPulse}
			/>

			<AmbientGlow
				color={COLORS.accent}
				x={80}
				y={20}
				size={300}
				blur={150}
				opacity={0.08 * energyPulse}
			/>

			<div
				style={{
					position: 'absolute',
					top: height * 0.25,
					left: '50%',
					transform: `translateX(-50%) scale(${titleScale})`,
					textAlign: 'center',
				}}
			>
				<div
					style={{
						fontFamily: "'Orbitron', sans-serif",
						fontSize: 100,
						fontWeight: 800,
						color: COLORS.text,
						letterSpacing: '0.12em',
						textShadow: `0 0 50px ${COLORS.primary}, 0 0 100px ${COLORS.primary}40`,
					}}
				>
					BETA BUILD TU
				</div>
				<div
					style={{
						fontFamily: "'Orbitron', sans-serif",
						fontSize: 48,
						fontWeight: 400,
						color: COLORS.primary,
						letterSpacing: '0.2em',
						marginTop: 10,
					}}
				>
					CRASH KARE FAST
				</div>
			</div>

			<div
				style={{
					position: 'absolute',
					top: height * 0.08,
					left: '50%',
					transform: 'translateX(-50%)',
					fontFamily: "'Courier New', monospace",
					fontSize: 14,
					color: COLORS.dim,
					letterSpacing: '0.1em',
				}}
			>
				[CHORUS // ANTHEM MODE // DOMINANT]
			</div>

			<svg
				width={width}
				height={100}
				style={{
					position: 'absolute',
					bottom: height * 0.35,
					left: 0,
				}}
			>
				<defs>
					<linearGradient id="spectrumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor={COLORS.primary} />
						<stop offset="50%" stopColor={COLORS.accent} />
						<stop offset="100%" stopColor={COLORS.secondary} />
					</linearGradient>
				</defs>
				{spectrumBars.map((freq, i) => {
					const barHeight = freq * 80;
					const x = (i / spectrumBars.length) * width + 20;
					return (
						<rect
							key={i}
							x={x}
							y={50 - barHeight / 2}
							width={width / spectrumBars.length - 10}
							height={barHeight}
							fill="url(#spectrumGradient)"
							rx={2}
							opacity={0.6}
						/>
					);
				})}
			</svg>

			<div
				style={{
					position: 'absolute',
					top: height * 0.12,
					right: width * 0.05,
					fontFamily: "'Courier New', monospace",
					fontSize: 12,
					color: COLORS.primary,
					opacity: whisperOpacity,
				}}
			>
				<div style={{opacity: 0.5}}>[WHISPER LAYER]</div>
				<div style={{opacity: 0.3}}>Phorix...</div>
			</div>

			<div
				style={{
					position: 'absolute',
					bottom: height * 0.1,
					left: 0,
					right: 0,
					textAlign: 'center',
					fontFamily: "'Rajdhani', sans-serif",
					fontSize: 28,
					color: COLORS.dim,
					letterSpacing: '0.3em',
				}}
			>
				PHORIX // CORE
			</div>

			<CircuitLines opacity={0.15} />
			<Scanlines opacity={0.06} />
			<NoiseOverlay opacity={0.02} />
		</div>
	);
};
