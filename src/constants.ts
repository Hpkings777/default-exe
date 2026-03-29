export const FPS = 30;
export const BPM = 148;
export const BEAT_DURATION = FPS * (60 / BPM);

export const COLORS = {
	bg: '#050508',
	primary: '#00ff88',
	secondary: '#ff0066',
	accent: '#00ccff',
	dim: '#1a1a2e',
	text: '#ffffff',
	glitch: '#ff3366',
};

export interface LyricLine {
	time: number;
	duration: number;
	text: string;
	translation?: string;
}

export interface Section {
	name: string;
	startFrame: number;
	endFrame: number;
}

export const SECTIONS: Section[] = [
	{name: 'boot', startFrame: 0, endFrame: 240},
	{name: 'beatEntry', startFrame: 240, endFrame: 1440},
	{name: 'chorus1', startFrame: 1440, endFrame: 3000},
	{name: 'rapidFire', startFrame: 3000, endFrame: 3840},
	{name: 'bridge', startFrame: 3840, endFrame: 4320},
	{name: 'finalChorus', startFrame: 4320, endFrame: 4920},
	{name: 'outro', startFrame: 4920, endFrame: 5400},
];

export const LYRICS: LyricLine[] = [
	{time: 0, duration: 240, text: ''},
	{time: 240, duration: 60, text: 'Suno vs Phorix?', translation: ''},
	{time: 300, duration: 120, text: 'Cute.', translation: ''},
	{time: 420, duration: 150, text: 'Yeh tools ka nahi — control ka scene hai.', translation: ''},
	{time: 570, duration: 150, text: 'Preset pe jiye… main blueprint pe jee raha hoon.', translation: ''},
	{time: 720, duration: 150, text: 'Tu generator hai, main generator ka architect hoon.', translation: ''},

	{time: 900, duration: 90, text: 'Tu bolta Suno, jaise khud composer hai,', translation: ''},
	{time: 990, duration: 90, text: 'Button dabaya aur bole "main closer hai."', translation: ''},
	{time: 1080, duration: 90, text: 'Template pe jeet ka sapna dekh raha,', translation: ''},
	{time: 1170, duration: 90, text: 'Par originality se tu roz bhaag raha.', translation: ''},
	{time: 1260, duration: 90, text: 'Ek click, ek track — waah bhai, kya art hai,', translation: ''},
	{time: 1350, duration: 90, text: 'Itna bhi nahi pata — yeh tune toh chart hai,', translation: ''},

	{time: 1440, duration: 60, text: 'Beta build tu… crash kare fast,', translation: ''},
	{time: 1500, duration: 60, text: 'Phorix core chale… built to last.', translation: ''},
	{time: 1560, duration: 60, text: 'Tu output dikha, main process dikhaun,', translation: ''},
	{time: 1620, duration: 60, text: 'Game samajh… warna fir se harun.', translation: ''},
	{time: 1680, duration: 60, text: 'Tu tune generate kar, main tune dissect karu,', translation: ''},
	{time: 1740, duration: 60, text: 'Tera AI tool hai — mera AI select karu.', translation: ''},

	{time: 1800, duration: 90, text: 'Har baar excuse "AI ne banaya" —', translation: ''},
	{time: 1890, duration: 90, text: 'Khud ka kya input? Kuch bhi nahi laya.', translation: ''},
	{time: 1980, duration: 90, text: 'Gaana clean, par feel kahan hai,', translation: ''},
	{time: 2070, duration: 90, text: 'Algorithm jeeta… par tu kahan hai?', translation: ''},
	{time: 2160, duration: 90, text: 'Emotion nahi, direction nahi, intention nahi,', translation: ''},
	{time: 2250, duration: 90, text: 'Sab kuch auto — tera khud ka mention nahi.', translation: ''},
	{time: 2340, duration: 90, text: 'Main tweak karu lines, tune kare flow,', translation: ''},
	{time: 2430, duration: 90, text: 'Tu same default pe hi chala raha show.', translation: ''},

	{time: 2520, duration: 90, text: 'Skill ko shortcut se replace kiya,', translation: ''},
	{time: 2610, duration: 90, text: 'Phir bolta "bhai maine create kiya"?', translation: ''},
	{time: 2700, duration: 90, text: 'Creation mein sweat hota hai, blood hota hai,', translation: ''},
	{time: 2790, duration: 90, text: 'Tera track mein sirf prompt ka flood hota hai.', translation: ''},

	{time: 2880, duration: 60, text: 'Phorix aa gaya, system overload —', translation: ''},
	{time: 2940, duration: 60, text: 'Tu still loading, mujhe nahi tera error code,', translation: ''},
	{time: 3000, duration: 60, text: 'Main iterate karta, tu sirf operate karta,', translation: ''},
	{time: 3060, duration: 60, text: 'Tera output stale, mera blueprint update karta.', translation: ''},
	{time: 3120, duration: 60, text: 'No lag, no cap, no latency —', translation: ''},
	{time: 3180, duration: 60, text: 'Teri creativity sirf battery —', translation: ''},
	{time: 3240, duration: 60, text: 'Main rewrite karta, tu recite karta,', translation: ''},
	{time: 3300, duration: 60, text: 'Tu Suno ka user — main Phorix ka architect.', translation: ''},
	{time: 3360, duration: 60, text: 'Plagiarism-free mindset, ownership claim karta,', translation: ''},
	{time: 3420, duration: 60, text: 'Tu trend follow karta, main trend frame karta —', translation: ''},
	{time: 3480, duration: 120, text: 'Samajh bhai, yeh rap nahi — system statement hai,', translation: ''},
	{time: 3600, duration: 120, text: 'Phorix ek tool nahi — ek permanent placement hai.', translation: ''},

	{time: 3720, duration: 120, text: 'Sach kadwa hai, par sun le aaj —', translation: ''},
	{time: 3840, duration: 120, text: 'Tool se upar hota creator ka raaj.', translation: ''},
	{time: 3960, duration: 120, text: 'Kal tu seekh gaya toh respect milega,', translation: ''},
	{time: 4080, duration: 120, text: 'Aaj ke liye — bas thoda sa jalega.', translation: ''},
	{time: 4200, duration: 120, text: 'Shortcut liya tune, destination bhool gaya,', translation: ''},
	{time: 4320, duration: 120, text: 'Main destination tha — aur tu tool tha, bhool gaya.', translation: ''},

	{time: 4440, duration: 60, text: 'Beta build tu… update pending,', translation: ''},
	{time: 4500, duration: 60, text: 'Phorix system… always trending.', translation: ''},
	{time: 4560, duration: 60, text: 'AI sabke paas — par dimaag rare,', translation: ''},
	{time: 4620, duration: 60, text: 'Isi liye bhai… tu abhi bhi mid-tier.', translation: ''},
	{time: 4680, duration: 60, text: 'Version 2.0 mein bhi tu wahi —', translation: ''},
	{time: 4740, duration: 120, text: 'Default settings pe, original nahi.', translation: ''},

	{time: 4860, duration: 180, text: 'No hate… bas clarity.', translation: ''},
	{time: 5040, duration: 180, text: 'Game seekh… phir aana.', translation: ''},
	{time: 5220, duration: 180, text: 'System off.', translation: ''},
	{time: 5400, duration: 0, text: 'Phorix out.', translation: ''},
];

export const VISUAL_EFFECTS_TIMING = {
	glitchInterval: 150,
	glitchDuration: 15,
	flashInterval: 240,
	beatPulseMultiplier: 1.15,
};

export const ADLIBS = [
	'Phorix',
	'System',
	'No lag',
	'Architect',
	'Real one',
	'Overload',
	'Default.exe',
];
