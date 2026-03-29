import React, {useMemo} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {interpolate, spring} from 'remotion';
import {COLORS} from '../constants';

interface BackgroundGridProps {
	opacity?: number;
	gridSize?: number;
	color?: string;
	animate?: boolean;
}

export const BackgroundGrid: React.FC<BackgroundGridProps> = ({
	opacity = 0.15,
	gridSize = 60,
	color = COLORS.dim,
	animate = true,
}) => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	const offsetY = animate ? (frame * 0.5) % gridSize : 0;

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
			<svg
				width="100%"
				height="100%"
				style={{
					position: 'absolute',
					opacity,
					transform: `translateY(${offsetY}px)`,
				}}
			>
				<defs>
					<pattern
						id="cyberGrid"
						width={gridSize}
						height={gridSize}
						patternUnits="userSpaceOnUse"
					>
						<path
							d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
							fill="none"
							stroke={color}
							strokeWidth="0.5"
						/>
					</pattern>
				</defs>
				<rect width="100%" height="200%" fill="url(#cyberGrid)" />
			</svg>
		</div>
	);
};

interface PerspectiveGridProps {
	intensity?: number;
}

export const PerspectiveGrid: React.FC<PerspectiveGridProps> = ({
	intensity = 1,
}) => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	const perspectiveOpacity = interpolate(frame, [0, 60], [0, 0.2], {
		extrapolateRight: 'clamp',
	});

	const lines = Array.from({length: 20}, (_, i) => i);

	return (
		<svg
			width={width}
			height={height}
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				opacity: perspectiveOpacity * intensity,
			}}
		>
			<defs>
				<linearGradient
					id="gridFade"
					x1="0%"
					y1="100%"
					x2="0%"
					y2="0%"
				>
					<stop offset="0%" stopColor={COLORS.primary} stopOpacity="0" />
					<stop offset="100%" stopColor={COLORS.primary} stopOpacity="0.5" />
				</linearGradient>
			</defs>

			{lines.map((i) => {
				const x = (i / (lines.length - 1)) * width;
				return (
					<line
						key={`v-${i}`}
						x1={x}
						y1={height}
						x2={width / 2}
						y2={height * 0.3}
						stroke="url(#gridFade)"
						strokeWidth="1"
					/>
				);
			})}

			{Array.from({length: 10}, (_, i) => i).map((i) => {
				const y = height - (i / 9) * height * 0.7;
				return (
					<line
						key={`h-${i}`}
						x1={0}
						y1={y}
						x2={width}
						y2={y}
						stroke="url(#gridFade)"
						strokeWidth="1"
					/>
				);
			})}
		</svg>
	);
};

interface AmbientGlowProps {
	color?: string;
	x?: number;
	y?: number;
	size?: number;
	blur?: number;
	opacity?: number;
	animate?: boolean;
}

export const AmbientGlow: React.FC<AmbientGlowProps> = ({
	color = COLORS.primary,
	x = 50,
	y = 50,
	size = 400,
	blur = 200,
	opacity = 0.15,
	animate = true,
}) => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	const pulseOpacity = animate
		? interpolate(Math.sin(frame * 0.05), [-1, 1], [0.5, 1])
		: 1;

	const pulseScale = animate
		? interpolate(Math.sin(frame * 0.03), [-1, 1], [0.9, 1.1])
		: 1;

	const posX = (x / 100) * width;
	const posY = (y / 100) * height;

	return (
		<div
			style={{
				position: 'absolute',
				left: posX - (size * pulseScale) / 2,
				top: posY - (size * pulseScale) / 2,
				width: size * pulseScale,
				height: size * pulseScale,
				borderRadius: '50%',
				background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
				filter: `blur(${blur}px)`,
				opacity: opacity * pulseOpacity,
			}}
		/>
	);
};

interface FloatingParticlesProps {
	count?: number;
	color?: string;
	speed?: number;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
	count = 50,
	color = COLORS.primary,
	speed = 1,
}) => {
	const {width, height} = useVideoConfig();

	const particles = useMemo(() => {
		return Array.from({length: count}, (_, i) => ({
			id: i,
			x: Math.random() * width,
			y: Math.random() * height,
			size: Math.random() * 3 + 1,
			speedX: (Math.random() - 0.5) * speed,
			speedY: (Math.random() - 0.5) * speed,
			opacity: Math.random() * 0.5 + 0.2,
		}));
	}, [count, width, height, speed]);

	return (
		<>
			{particles.map((p) => (
				<div
					key={p.id}
					style={{
						position: 'absolute',
						left: p.x,
						top: p.y,
						width: p.size,
						height: p.size,
						borderRadius: '50%',
						backgroundColor: color,
						opacity: p.opacity,
						boxShadow: `0 0 ${p.size * 2}px ${color}`,
					}}
				/>
			))}
		</>
	);
};

interface HexagonGridProps {
	opacity?: number;
}

export const HexagonGrid: React.FC<HexagonGridProps> = ({opacity = 0.1}) => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	const hexSize = 30;
	const hexHeight = hexSize * Math.sqrt(3);
	const hexWidth = hexSize * 2;
	const cols = Math.ceil(width / (hexWidth * 0.75)) + 1;
	const rows = Math.ceil(height / hexHeight) + 1;

	const offsetY = (frame * 0.2) % hexHeight;

	return (
		<svg
			width={width}
			height={height + hexHeight}
			style={{
				position: 'absolute',
				top: -offsetY,
				opacity,
			}}
		>
			<defs>
				<pattern
					id="hexPattern"
					width={hexWidth * 0.75}
					height={hexHeight}
					patternUnits="userSpaceOnUse"
				>
					<polygon
						points={`${hexSize},0 ${hexSize * 2},${hexHeight / 2} ${hexSize},${hexHeight} 0,${hexHeight / 2}`}
						fill="none"
						stroke={COLORS.dim}
						strokeWidth="1"
					/>
				</pattern>
			</defs>
			<rect width="100%" height="200%" fill="url(#hexPattern)" />
		</svg>
	);
};

interface CircuitLinesProps {
	opacity?: number;
}

export const CircuitLines: React.FC<CircuitLinesProps> = ({opacity = 0.2}) => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	const drawLength = interpolate(frame, [0, 180], [0, width * 1.5], {
		extrapolateRight: 'clamp',
	});

	const pathD = `
		M 0 ${height * 0.3}
		L ${width * 0.2} ${height * 0.3}
		L ${width * 0.2} ${height * 0.5}
		L ${width * 0.5} ${height * 0.5}
		L ${width * 0.5} ${height * 0.2}
		L ${width * 0.8} ${height * 0.2}
		L ${width * 0.8} ${height * 0.7}
		L ${width} ${height * 0.7}
	`;

	return (
		<svg
			width={width}
			height={height}
			style={{position: 'absolute', top: 0, left: 0, opacity}}
		>
			<defs>
				<linearGradient id="circuitFade" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor={COLORS.primary} stopOpacity="0" />
					<stop offset="50%" stopColor={COLORS.primary} stopOpacity="1" />
					<stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
				</linearGradient>
			</defs>
			<path
				d={pathD}
				fill="none"
				stroke="url(#circuitFade)"
				strokeWidth="2"
				strokeDasharray={`${drawLength} ${width}`}
			/>
			<circle cx={width * 0.2} cy={height * 0.3} r="4" fill={COLORS.primary} />
			<circle cx={width * 0.5} cy={height * 0.5} r="4" fill={COLORS.primary} />
			<circle cx={width * 0.8} cy={height * 0.7} r="4" fill={COLORS.primary} />
		</svg>
	);
};
