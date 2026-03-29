import React, {useMemo} from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {BackgroundGrid, AmbientGlow} from '../components/BackgroundEffects';
import {Scanlines, NoiseOverlay, GlitchText, GlitchRect} from '../components/GlitchEffects';
import {COLORS} from '../constants';

export const RapidFire: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();

	const localFrame = frame;

	const silenceFrame = 0;
	const slamFrame = 30;

	const isIntense = localFrame >= slamFrame;

	const silenceOpacity = interpolate(localFrame, [0, 15], [1, 0], {
		extrapolateRight: 'clamp',
	});

	const slamPulse = interpolate(localFrame, [slamFrame, slamFrame + 15], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const energyLevel = isIntense ? 1.5 : 1;

	const glitchIntensity = isIntense ? 2 : 0.5;

	const glitchFrames = useMemo(() => {
		return Array.from({length: 5}, (_, i) => ({
			id: i,
			x: Math.random() * width,
			y: Math.random() * height,
			width: Math.random() * 200 + 50,
			height: Math.random() * 20 + 5,
			active: Math.random() > 0.7 && isIntense,
		}));
	}, [localFrame, isIntense, width, height]);

	const spectrumBars = useMemo(() => {
		if (!isIntense) return Array(64).fill(0.1);
		return Array.from({length: 64}, (_, i) => {
			const baseFreq = Math.sin(localFrame * 0.3 + i * 0.2) * 0.4 + 0.6;
			const highEnergy = Math.random() * 0.3;
			return Math.min(1, baseFreq + highEnergy);
		});
	}, [localFrame, isIntense]);

	const coldSynthOpacity = isIntense
		? interpolate(localFrame - slamFrame, [0, 60], [0, 0.4], {
				extrapolateRight: 'clamp',
			})
		: 0;

	const doubleIntensity = interpolate(localFrame, [slamFrame, slamFrame + 30], [1, 2], {
		extrapolateRight: 'clamp',
	});

	const rapidPulse = interpolate(Math.sin(localFrame * 0.8), [-1, 1], [0.85, 1.15]);

	const chromaticOffset = isIntense ? Math.sin(localFrame * 0.5) * 8 : 0;

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
			<BackgroundGrid opacity={0.2} animate={isIntense} gridSize={40} />

			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: COLORS.bg,
					opacity: silenceOpacity,
				}}
			/>

			{glitchFrames.map((glitch) =>
				glitch.active ? (
					<GlitchRect
						key={glitch.id}
						x={glitch.x}
						y={glitch.y}
						width={glitch.width}
						height={glitch.height}
						color={COLORS.glitch}
						active={true}
					/>
				) : null,
			)}

			<svg
				width={width}
				height={height}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					opacity: slamPulse,
				}}
			>
				<rect
					x={0}
					y={0}
					width={width}
					height={height}
					fill={COLORS.primary}
					opacity={0.1}
				/>
			</svg>

			<AmbientGlow
				color={COLORS.glitch}
				x={50}
				y={50}
				size={700}
				blur={350}
				opacity={0.2 * rapidPulse}
			/>

			<AmbientGlow
				color={COLORS.secondary}
				x={20}
				y={30}
				size={500}
				blur={250}
				opacity={0.15 * rapidPulse}
			/>

			<div
				style={{
					position: 'absolute',
					top: height * 0.35,
					left: '50%',
					transform: `translateX(-50%) scale(${rapidPulse})`,
					textAlign: 'center',
					opacity: 1 - silenceOpacity,
				}}
			>
				<div
					style={{
						position: 'relative',
						fontFamily: "'Orbitron', sans-serif",
						fontSize: 72 * energyLevel,
						fontWeight: 900,
						color: COLORS.text,
						letterSpacing: '0.08em',
						textShadow: `0 0 40px ${COLORS.glitch}, 0 0 80px ${COLORS.glitch}60`,
					}}
				>
					<span
						style={{
							position: 'absolute',
							left: -chromaticOffset,
							color: COLORS.primary,
							opacity: 0.7,
						}}
					>
						PHORIX
					</span>
					<span
						style={{
							position: 'absolute',
							left: chromaticOffset,
							color: COLORS.accent,
							opacity: 0.7,
						}}
					>
						PHORIX
					</span>
					<span style={{position: 'relative', color: COLORS.text}}>PHORIX</span>
				</div>

				<div
					style={{
						fontFamily: "'Orbitron', sans-serif",
						fontSize: 36,
						fontWeight: 700,
						color: COLORS.glitch,
						letterSpacing: '0.15em',
						marginTop: 20,
						textShadow: `0 0 20px ${COLORS.glitch}`,
					}}
				>
					SYSTEM OVERLOAD
				</div>
			</div>

			<svg
				width={width}
				height={height}
				style={{
					position: 'absolute',
					top: height * 0.55,
					left: 0,
				}}
			>
				<defs>
					<linearGradient id="rapidSpectrum" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor={COLORS.glitch} />
						<stop offset="33%" stopColor={COLORS.secondary} />
						<stop offset="66%" stopColor={COLORS.primary} />
						<stop offset="100%" stopColor={COLORS.accent} />
					</linearGradient>
				</defs>
				{spectrumBars.map((freq, i) => {
					const barHeight = freq * 60;
					const x = (i / spectrumBars.length) * width;
					return (
						<rect
							key={i}
							x={x}
							y={30 - barHeight / 2}
							width={width / spectrumBars.length - 2}
							height={barHeight}
							fill="url(#rapidSpectrum)"
							rx={1}
							opacity={0.8}
						/>
					);
				})}
			</svg>

			<div
				style={{
					position: 'absolute',
					top: height * 0.08,
					left: width * 0.05,
					fontFamily: "'Courier New', monospace",
					fontSize: 14,
					color: COLORS.glitch,
					opacity: isIntense ? 1 : 0.3,
				}}
			>
				<div>[RAPID-FIRE MODE]</div>
				<div>[DOUBLE-TIME ACTIVATED]</div>
				<div>[DRILL CADENCE: ENGAGED]</div>
			</div>

			<div
				style={{
					position: 'absolute',
					top: height * 0.08,
					right: width * 0.05,
					fontFamily: "'Courier New', monospace",
					fontSize: 14,
					color: COLORS.secondary,
					opacity: coldSynthOpacity,
				}}
			>
				<div>[2ND SYNTH LAYER]</div>
				<div>[ATONAL // COLD]</div>
			</div>

			<div
				style={{
					position: 'absolute',
					bottom: height * 0.08,
					left: '50%',
					transform: 'translateX(-50%)',
					fontFamily: "'Rajdhani', sans-serif",
					fontSize: 24,
					color: COLORS.glitch,
					letterSpacing: '0.3em',
					opacity: isIntense ? 1 : 0.3,
				}}
			>
				DOUBLE-TIME // MACHINE GUN
			</div>

			<Scanlines opacity={0.1} />
			<NoiseOverlay opacity={0.03} />
		</div>
	);
};
