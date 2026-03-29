import React, {useMemo} from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {BackgroundGrid, AmbientGlow, CircuitLines} from '../components/BackgroundEffects';
import {Scanlines, NoiseOverlay, GlitchText} from '../components/GlitchEffects';
import {COLORS} from '../constants';

export const FinalChorus: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();

	const localFrame = frame;

	const buildProgress = interpolate(localFrame, [0, 60], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const everythingReturns = interpolate(localFrame, [0, 30], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const highStringSwell = interpolate(localFrame, [30, 90], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const adLibIntensity = interpolate(localFrame, [60, 120], [0.5, 1], {
		extrapolateRight: 'clamp',
	});

	const triumphantPulse = interpolate(Math.sin(localFrame * 0.15), [-1, 1], [1, 1.1]);

	const spectrumBars = useMemo(() => {
		return Array.from({length: 128}, (_, i) => {
			const baseFreq = Math.sin(localFrame * 0.15 + i * 0.15) * 0.3 + 0.7;
			const peakBoost = Math.sin(localFrame * 0.2) * 0.2;
			return Math.min(1, baseFreq + peakBoost);
		});
	}, [localFrame]);

	const titleScale = spring({
		frame: localFrame,
		fps,
		config: {damping: 10, stiffness: 120},
	});

	const scaleValue = interpolate(titleScale, [0, 1], [0.9, 1.1]);

	const crowdChantY = interpolate(Math.sin(localFrame * 0.1), [-1, 1], [0, 10]);

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
			<BackgroundGrid opacity={0.15 * everythingReturns} animate={true} />

			<svg
				width={width}
				height={height}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					opacity: highStringSwell * 0.3,
				}}
			>
				<defs>
					<linearGradient id="stringSwell" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor={COLORS.accent} stopOpacity="0" />
						<stop offset="50%" stopColor={COLORS.accent} stopOpacity="0.1" />
						<stop offset="100%" stopColor={COLORS.accent} stopOpacity="0" />
					</linearGradient>
				</defs>
				<rect
					x={0}
					y={height * 0.3}
					width={width}
					height={height * 0.4}
					fill="url(#stringSwell)"
				/>
			</svg>

			<AmbientGlow
				color={COLORS.primary}
				x={50}
				y={50}
				size={600 * everythingReturns}
				blur={300}
				opacity={0.2 * triumphantPulse}
			/>

			<AmbientGlow
				color={COLORS.accent}
				x={20}
				y={30}
				size={500}
				blur={250}
				opacity={0.15 * triumphantPulse}
			/>

			<AmbientGlow
				color={COLORS.secondary}
				x={80}
				y={70}
				size={400}
				blur={200}
				opacity={0.12 * triumphantPulse}
			/>

			<svg
				width={width}
				height={120}
				style={{
					position: 'absolute',
					bottom: height * 0.4,
					left: 0,
					opacity: everythingReturns,
				}}
			>
				<defs>
					<linearGradient id="finalSpectrum" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor={COLORS.primary} />
						<stop offset="25%" stopColor={COLORS.accent} />
						<stop offset="50%" stopColor={COLORS.secondary} />
						<stop offset="75%" stopColor={COLORS.glitch} />
						<stop offset="100%" stopColor={COLORS.primary} />
					</linearGradient>
				</defs>
				{spectrumBars.map((freq, i) => {
					const barHeight = freq * 100;
					const x = (i / spectrumBars.length) * width;
					return (
						<rect
							key={i}
							x={x}
							y={60 - barHeight / 2}
							width={width / spectrumBars.length - 1}
							height={barHeight}
							fill="url(#finalSpectrum)"
							rx={1}
							opacity={0.7}
						/>
					);
				})}
			</svg>

			<div
				style={{
					position: 'absolute',
					top: height * 0.3,
					left: '50%',
					transform: `translateX(-50%) scale(${scaleValue})`,
					textAlign: 'center',
				}}
			>
				<div
					style={{
						fontFamily: "'Orbitron', sans-serif",
						fontSize: 80,
						fontWeight: 900,
						color: COLORS.text,
						letterSpacing: '0.1em',
						textShadow: `0 0 50px ${COLORS.primary}, 0 0 100px ${COLORS.primary}60, 0 0 150px ${COLORS.accent}40`,
					}}
				>
					AI SABKE PAAS
				</div>

				<div
					style={{
						fontFamily: "'Orbitron', sans-serif",
						fontSize: 56,
						fontWeight: 700,
						color: COLORS.primary,
						letterSpacing: '0.15em',
						marginTop: 20,
						textShadow: `0 0 30px ${COLORS.primary}`,
					}}
				>
					PAR DIMAAG RARE
				</div>

				<div
					style={{
						fontFamily: "'Orbitron', sans-serif",
						fontSize: 72,
						fontWeight: 800,
						color: COLORS.glitch,
						letterSpacing: '0.12em',
						marginTop: 30,
						textShadow: `0 0 40px ${COLORS.glitch}`,
					}}
				>
					ISI LIYE BHAI
				</div>

				<div
					style={{
						fontFamily: "'Orbitron', sans-serif",
						fontSize: 64,
						fontWeight: 400,
						color: COLORS.secondary,
						letterSpacing: '0.2em',
						marginTop: 10,
						textShadow: `0 0 30px ${COLORS.secondary}`,
					}}
				>
					TU ABHI BHI MID-TIER
				</div>
			</div>

			<div
				style={{
					position: 'absolute',
					top: height * 0.15,
					left: width * 0.05,
					fontFamily: "'Courier New', monospace",
					fontSize: 14,
					color: COLORS.primary,
					opacity: adLibIntensity,
				}}
			>
				<div style={{opacity: 0.8}}>[3-LAYER VOCAL STACK]</div>
				<div style={{opacity: 0.6}}>[CROWD-CHANT: ACTIVE]</div>
				<div style={{opacity: 0.4}}>[AD-LIBS: FLYING]</div>
			</div>

			<div
				style={{
					position: 'absolute',
					top: height * 0.08,
					left: '50%',
					transform: 'translateX(-50%)',
					fontFamily: "'Courier New', monospace",
					fontSize: 14,
					color: COLORS.accent,
					letterSpacing: '0.1em',
				}}
			>
				[FINAL CHORUS // PEAK // TRIUMPHANT]
			</div>

			<div
				style={{
					position: 'absolute',
					bottom: height * 0.1,
					left: '50%',
					transform: `translateX(-50%) translateY(${crowdChantY}px)`,
					fontFamily: "'Rajdhani', sans-serif",
					fontSize: 24,
					color: COLORS.dim,
					letterSpacing: '0.3em',
					opacity: adLibIntensity,
				}}
			>
				PHORIX // FINAL STATEMENT
			</div>

			<CircuitLines opacity={0.2 * everythingReturns} />
			<Scanlines opacity={0.06} />
			<NoiseOverlay opacity={0.02} />
		</div>
	);
};
