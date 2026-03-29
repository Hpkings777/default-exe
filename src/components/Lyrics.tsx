import React, {useMemo} from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {LYRICS, COLORS, LyricLine} from '../constants';
import {GlitchText} from './GlitchEffects';

interface LyricDisplayProps {
	currentTime: number;
	showTranslation?: boolean;
	size?: 'small' | 'medium' | 'large';
	style?: React.CSSProperties;
}

export const LyricDisplay: React.FC<LyricDisplayProps> = ({
	currentTime,
	showTranslation = false,
	size = 'medium',
	style,
}) => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	const currentLyric = useMemo(() => {
		return LYRICS.find((lyric) => {
			const lyricStart = lyric.time;
			const lyricEnd = lyric.time + lyric.duration;
			return currentTime >= lyricStart && currentTime < lyricEnd;
		});
	}, [currentTime]);

	const prevLyric = useMemo(() => {
		if (!currentLyric) {
			return LYRICS.filter((l) => l.time < currentTime).slice(-1)[0];
		}
		return LYRICS.filter((l) => l.time < currentLyric.time).slice(-1)[0];
	}, [currentTime, currentLyric]);

	const nextLyric = useMemo(() => {
		if (!currentLyric) {
			return LYRICS.find((l) => l.time > currentTime);
		}
		return LYRICS.find((l) => l.time > currentLyric.time + currentLyric.duration);
	}, [currentTime, currentLyric]);

	const fontSize = size === 'large' ? 64 : size === 'medium' ? 48 : 36;
	const lineHeight = fontSize * 1.5;

	const opacity = interpolate(frame, [0, 10], [0, 1], {extrapolateRight: 'clamp'});

	const scale = spring({
		frame,
		fps: 30,
		config: {damping: 15, stiffness: 120},
	});

	const textScale = interpolate(scale, [0, 1], [0.9, 1]);

	if (!currentLyric || !currentLyric.text) {
		return null;
	}

	return (
		<div
			style={{
				position: 'absolute',
				bottom: height * 0.15,
				left: 0,
				right: 0,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				opacity,
				...style,
			}}
		>
			<div
				style={{
					transform: `scale(${textScale})`,
					textAlign: 'center',
					maxWidth: width * 0.9,
				}}
			>
				<div
					style={{
						fontFamily: "'Rajdhani', 'Orbitron', sans-serif",
						fontSize,
						fontWeight: 700,
						color: COLORS.text,
						textShadow: `0 0 30px ${COLORS.primary}, 0 0 60px ${COLORS.primary}40`,
						letterSpacing: '0.05em',
						lineHeight: lineHeight,
					}}
				>
					<GlitchText text={currentLyric.text} active={false} />
				</div>
				{showTranslation && currentLyric.translation && (
					<div
						style={{
							fontFamily: "'Inter', sans-serif",
							fontSize: fontSize * 0.6,
							color: COLORS.dim,
							marginTop: fontSize * 0.3,
							opacity: 0.7,
						}}
					>
						{currentLyric.translation}
					</div>
				)}
			</div>

			{nextLyric && nextLyric.text && (
				<div
					style={{
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: fontSize * 0.5,
						color: COLORS.dim,
						opacity: 0.5,
						marginTop: fontSize * 0.5,
					}}
				>
					{nextLyric.text}
				</div>
			)}
		</div>
	);
};

interface KaraokeWord {
	word: string;
	startTime: number;
	endTime: number;
}

interface KaraokeLineProps {
	text: string;
	startTime: number;
	duration: number;
	charPerFrame?: number;
	style?: React.CSSProperties;
	highlightColor?: string;
	normalColor?: string;
}

export const KaraokeLine: React.FC<KaraokeLineProps> = ({
	text,
	startTime,
	duration,
	charPerFrame = 3,
	style,
	highlightColor = COLORS.primary,
	normalColor = COLORS.text,
}) => {
	const frame = useCurrentFrame();
	const currentTime = frame;

	const elapsedTime = Math.max(0, currentTime - startTime);
	const charsToHighlight = Math.floor((elapsedTime / charPerFrame) * 10);
	const words = text.split(' ');

	let charCount = 0;
	const highlightedWords: {word: string; highlighted: boolean}[] = [];

	words.forEach((word) => {
		const wordLength = word.length;
		const wordStart = charCount;
		const wordEnd = charCount + wordLength;

		if (charCount < charsToHighlight) {
			highlightedWords.push({word, highlighted: true});
		} else if (wordStart < charsToHighlight && wordEnd > charsToHighlight) {
			const charsHighlighted = charsToHighlight - wordStart;
			const highlighted = word.slice(0, charsHighlighted);
			const normal = word.slice(charsHighlighted);
			if (highlighted) highlightedWords.push({word: highlighted, highlighted: true});
			if (normal) highlightedWords.push({word: normal, highlighted: false});
		} else {
			highlightedWords.push({word, highlighted: false});
		}
		charCount += wordLength + 1;
	});

	return (
		<div
			style={{
				fontFamily: "'Rajdhani', 'Orbitron', sans-serif",
				fontSize: 48,
				fontWeight: 700,
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				gap: '0.5em',
				...style,
			}}
		>
			{highlightedWords.map((item, i) => (
				<span
					key={i}
					style={{
						color: item.highlighted ? highlightColor : normalColor,
						textShadow: item.highlighted
							? `0 0 20px ${highlightColor}`
							: 'none',
						transition: 'color 0.1s, text-shadow 0.1s',
					}}
				>
					{item.word}
				</span>
			))}
		</div>
	);
};

interface LyricsTimelineProps {
	showLines?: number;
}

export const LyricsTimeline: React.FC<LyricsTimelineProps> = ({showLines = 3}) => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	const visibleLyrics = useMemo(() => {
		const currentIndex = LYRICS.findIndex(
			(l) => frame >= l.time && frame < l.time + l.duration,
		);
		if (currentIndex === -1) return [];

		const start = Math.max(0, currentIndex - Math.floor(showLines / 2));
		const end = Math.min(LYRICS.length, start + showLines);
		return LYRICS.slice(start, end);
	}, [frame, showLines]);

	return (
		<div
			style={{
				position: 'absolute',
				bottom: height * 0.2,
				left: width * 0.1,
				right: width * 0.1,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 20,
			}}
		>
			{visibleLyrics.map((lyric, i) => {
				const isCurrent = frame >= lyric.time && frame < lyric.time + lyric.duration;
				return (
					<div
						key={i}
						style={{
							fontFamily: "'Rajdhani', sans-serif",
							fontSize: isCurrent ? 56 : 36,
							fontWeight: isCurrent ? 700 : 400,
							color: isCurrent ? COLORS.text : COLORS.dim,
							opacity: isCurrent ? 1 : 0.4,
							textShadow: isCurrent ? `0 0 30px ${COLORS.primary}` : 'none',
							transition: 'all 0.3s ease',
						}}
					>
						{lyric.text}
					</div>
				);
			})}
		</div>
	);
};
