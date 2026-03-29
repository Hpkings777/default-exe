import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {interpolate, spring} from 'remotion';
import {COLORS} from '../constants';

interface SpectrumBarProps {
	index: number;
	frequency: number;
	totalBars: number;
	width: number;
	height: number;
	maxHeight: number;
}

const SpectrumBar: React.FC<SpectrumBarProps> = ({
	index,
	frequency,
	totalBars,
	width,
	height,
	maxHeight,
}) => {
	const barWidth = width / totalBars;
	const barHeight = Math.max(4, frequency * maxHeight);
	const centerY = height / 2;

	const x = index * barWidth;
	const y = centerY - barHeight / 2;

	const hue = (index / totalBars) * 60 + 140;
	const saturation = 100;
	const lightness = 50 + frequency * 20;

	return (
		<rect
			x={x}
			y={y}
			width={barWidth - 2}
			height={barHeight}
			fill={`hsl(${hue}, ${saturation}%, ${lightness}%)`}
			rx={1}
		/>
	);
};

interface AudioVisualizerProps {
	frequencies: number[];
	width?: number;
	height?: number;
	style?: React.CSSProperties;
	barCount?: number;
}

export const AudioVisualizerBars: React.FC<AudioVisualizerProps> = ({
	frequencies,
	width = 1920,
	height = 1080,
	style,
	barCount = 64,
}) => {
	return (
		<svg width={width} height={height} style={style}>
			{frequencies.slice(0, barCount).map((freq, i) => (
				<SpectrumBar
					key={i}
					index={i}
					frequency={freq}
					totalBars={barCount}
					width={width}
					height={height}
					maxHeight={height * 0.4}
				/>
			))}
		</svg>
	);
};

interface WaveformVisualizerProps {
	samples: number[];
	width?: number;
	height?: number;
	strokeColor?: string;
	strokeWidth?: number;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
	samples,
	width = 1920,
	height = 200,
	strokeColor = COLORS.primary,
	strokeWidth = 2,
}) => {
	const centerY = height / 2;
	const maxAmplitude = height / 2 - 10;

	const points = samples
		.map((sample, i) => {
			const x = (i / (samples.length - 1)) * width;
			const y = centerY + sample * maxAmplitude;
			return `${x},${y}`;
		})
		.join(' ');

	return (
		<svg width={width} height={height} style={{position: 'absolute', bottom: 0}}>
			<polyline
				points={points}
				fill="none"
				stroke={strokeColor}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

interface BeatPulseProps {
	intensity: number;
	children?: React.ReactNode;
	scale?: number;
}

export const BeatPulse: React.FC<BeatPulseProps> = ({
	intensity,
	children,
	scale = 1.05,
}) => {
	const pulseScale = 1 + intensity * (scale - 1);

	return (
		<div
			style={{
				transform: `scale(${pulseScale})`,
				transition: 'transform 50ms ease-out',
			}}
		>
			{children}
		</div>
	);
};

interface GlowRingProps {
	active: boolean;
	color?: string;
	size?: number;
	opacity?: number;
}

export const GlowRing: React.FC<GlowRingProps> = ({
	active,
	color = COLORS.primary,
	size = 200,
	opacity = 0.3,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const expandSpring = spring({
		frame,
		fps,
		config: {damping: 15, stiffness: 100},
	});

	if (!active) return null;

	return (
		<div
			style={{
				position: 'absolute',
				width: size * expandSpring,
				height: size * expandSpring,
				borderRadius: '50%',
				border: `2px solid ${color}`,
				boxShadow: `0 0 ${30 * expandSpring}px ${color}, inset 0 0 ${20 * expandSpring}px ${color}`,
				opacity: opacity * (1 - expandSpring * 0.5),
			}}
		/>
	);
};
