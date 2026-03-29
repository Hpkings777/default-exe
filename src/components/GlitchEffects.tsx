import React, {useMemo} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {interpolate} from 'remotion';
import {COLORS} from '../constants';

interface GlitchTextProps {
	text: string;
	style?: React.CSSProperties;
	active?: boolean;
	intensity?: number;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
	text,
	style,
	active = true,
	intensity = 1,
}) => {
	const frame = useCurrentFrame();
	const {width} = useVideoConfig();

	const glitchOffset = useMemo(() => {
		if (!active) return 0;
		const noise = Math.sin(frame * 0.5) * 10 * intensity;
		return noise;
	}, [frame, active, intensity]);

	const rgbSplit = useMemo(() => {
		if (!active) return {r: 0, g: 0, b: 0};
		const r = Math.sin(frame * 0.3) * 5 * intensity;
		const g = Math.cos(frame * 0.4) * 3 * intensity;
		const b = Math.sin(frame * 0.6) * 4 * intensity;
		return {r, g, b};
	}, [frame, active, intensity]);

	const clipPath = useMemo(() => {
		if (!active) return 'none';
		const offset1 = Math.random() * 20 - 10;
		const offset2 = Math.random() * 20 - 10;
		return `inset(${offset1}px 0 ${-offset1}px 0, ${offset2}px 0 ${-offset2}px 0)`;
	}, [frame, active]);

	if (!active) {
		return (
			<span style={style}>
				{text}
			</span>
		);
	}

	return (
		<span style={{position: 'relative', display: 'inline-block'}}>
			<span
				style={{
					...style,
					position: 'relative',
					color: COLORS.glitch,
					textShadow: `${rgbSplit.r}px 0 ${COLORS.accent}`,
					transform: `translateX(${glitchOffset}px)`,
				}}
			>
				{text}
			</span>
			<span
				style={{
					...style,
					position: 'absolute',
					top: 0,
					left: 0,
					color: COLORS.accent,
					textShadow: `${-rgbSplit.g}px 0 ${COLORS.glitch}`,
					transform: `translateX(${-glitchOffset * 1.5}px)`,
					opacity: 0.8,
					clipPath,
				}}
			>
				{text}
			</span>
		</span>
	);
};

interface GlitchRectProps {
	width: number;
	height: number;
	x: number;
	y: number;
	color?: string;
	active?: boolean;
	clipPath?: string;
}

export const GlitchRect: React.FC<GlitchRectProps> = ({
	width,
	height,
	x,
	y,
	color = COLORS.glitch,
	active = true,
	clipPath,
}) => {
	const frame = useCurrentFrame();

	const glitchX = active ? Math.sin(frame * 0.7) * 5 : 0;

	return (
		<div
			style={{
				position: 'absolute',
				left: x + glitchX,
				top: y,
				width,
				height,
				backgroundColor: color,
				opacity: active ? 0.7 : 0,
				clipPath: clipPath || 'none',
			}}
		/>
	);
};

interface ScanlineProps {
	count?: number;
	opacity?: number;
}

export const Scanlines: React.FC<ScanlineProps> = ({
	count = 100,
	opacity = 0.05,
}) => {
	const lines = Array.from({length: count}, (_, i) => i);

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				pointerEvents: 'none',
				background: `repeating-linear-gradient(
					0deg,
					transparent,
					transparent 2px,
					rgba(0, 0, 0, ${opacity}) 2px,
					rgba(0, 0, 0, ${opacity}) 4px
				)`,
			}}
		/>
	);
};

interface NoiseOverlayProps {
	opacity?: number;
}

export const NoiseOverlay: React.FC<NoiseOverlayProps> = ({opacity = 0.03}) => {
	const frame = useCurrentFrame();

	const noiseValue = useMemo(() => {
		const seed = frame * 12345;
		return (Math.sin(seed) * 10000) % 1;
	}, [frame]);

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				pointerEvents: 'none',
				opacity,
				background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
			}}
		/>
	);
};

interface ChromaticAberrationProps {
	children: React.ReactNode;
	offset?: number;
}

export const ChromaticAberration: React.FC<ChromaticAberrationProps> = ({
	children,
	offset = 3,
}) => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	const aberrationX = Math.sin(frame * 0.5) * offset;

	return (
		<div style={{position: 'relative'}}>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: -aberrationX,
					color: '#ff0000',
					opacity: 0.5,
				}}
			>
				{children}
			</div>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: aberrationX,
					color: '#00ffff',
					opacity: 0.5,
				}}
			>
				{children}
			</div>
			<div style={{position: 'relative'}}>{children}</div>
		</div>
	);
};
