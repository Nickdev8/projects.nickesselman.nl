export type ProjectLink = {
	label: string;
	href: string;
};

export type Project = {
	title: string;
	status: string;
	track: string;
	summary: string;
	stack: string[];
	links: ProjectLink[];
	accent: string;
};

export type BuildMode = {
	title: string;
	description: string;
	points: string[];
};

export type LabNote = {
	title: string;
	note: string;
};

export const featuredProjects: Project[] = [
	{
		title: 'PartyVR',
		status: 'Active prototype',
		track: 'VR chaos',
		summary:
			'Room-scale party game platform with server authority, spectator screens, and short LAN rounds built to be loud, funny, and readable.',
		stack: ['Godot', 'OpenXR', 'LAN multiplayer', 'Spectator mode'],
		links: [{ label: 'Repo', href: 'https://github.com/Nickdev8/PartyVR' }],
		accent: '#7dff9c'
	},
	{
		title: 'F#CK DOOMSCROLLING',
		status: 'Working app',
		track: 'Phone defense',
		summary:
			'Android app that watches for Reels, Spotlight, and TikTok through accessibility hooks and kicks you out before the endless scroll wins.',
		stack: ['Kotlin', 'Android', 'Accessibility', 'Behavior tooling'],
		links: [{ label: 'Repo', href: 'https://github.com/Nickdev8/F-CKDOOMSCROLLING' }],
		accent: '#52f57f'
	},
	{
		title: 'LedScreen',
		status: 'PCB ready',
		track: 'Hardware',
		summary:
			'Custom RP2040 board for driving chains of LED panels, streaming animations, and pushing xLights-style installs past the usual hobby scale.',
		stack: ['KiCad', 'RP2040', 'Arduino', 'PCB design'],
		links: [
			{ label: 'Repo', href: 'https://github.com/Nickdev8/LedScreen' },
			{ label: 'BOM', href: 'https://cdn.nickesselman.nl/ledpanel/ibom.html' }
		],
		accent: '#98ff78'
	},
	{
		title: 'Blipstorm',
		status: 'Playable demo',
		track: 'Game build',
		summary:
			'Island defense prototype where your bots do the fighting, birds stay annoying, and Godot experiments turn into a real web-playable build.',
		stack: ['Godot 4', 'Aseprite', 'Web export', 'Prototype systems'],
		links: [
			{ label: 'Live', href: 'https://nickdev8.github.io/' },
			{ label: 'Repo', href: 'https://github.com/Nickdev8/islandblimp' }
		],
		accent: '#69ffb2'
	},
	{
		title: 'PAO',
		status: 'In progress',
		track: 'Party game',
		summary:
			'Real-world betrayal game where eliminations happen by snapping a selfie with your target hidden in the background.',
		stack: ['Expo', 'Mobile', 'Social design', 'Hack Club'],
		links: [{ label: 'Repo', href: 'https://github.com/AleksanderGPL/pao' }],
		accent: '#7affc0'
	},
	{
		title: 'Hackpad',
		status: 'Built and soldered',
		track: 'Micro board',
		summary:
			'Custom 4x4 macropad with my own PCB, case, firmware, and a fast hardware sprint from layout to real switches.',
		stack: ['KiCad', 'RP2040', 'Firmware', '3D case'],
		links: [{ label: 'Repo', href: 'https://github.com/Nickdev8/macropad' }],
		accent: '#a8ff8b'
	},
	{
		title: 'TryTerminal',
		status: 'Demo tool',
		track: 'Web tool',
		summary:
			'Browser terminal for safely demoing a selected set of CLI tools without handing someone the keys to a real shell.',
		stack: ['Node', 'Web app', 'CLI sandbox', 'Hack Club'],
		links: [{ label: 'Repo', href: 'https://github.com/Nickdev8/TryTerminal' }],
		accent: '#72ffc7'
	},
	{
		title: 'Monkey Swing',
		status: 'First shipped game',
		track: 'Origin story',
		summary:
			'My early Unity and C# game where repeated faceplants finally taught me how to finish and ship a small thing.',
		stack: ['Unity', 'C#', 'Itch.io', '2D game'],
		links: [{ label: 'Play', href: 'https://nikkcc.itch.io/ms' }],
		accent: '#8eff72'
	}
];

export const buildModes: BuildMode[] = [
	{
		title: 'Games first',
		description:
			'I keep returning to playable systems: party chaos, jam prototypes, browser experiments, and anything that can become a good story in one round.',
		points: ['Fast gameplay loops', 'Readable multiplayer moments', 'Small builds that actually ship']
	},
	{
		title: 'Hardware when it gets physical',
		description:
			'PCBs, LED boards, and weird little devices usually start because I want a real object in my hands, not just another repo.',
		points: ['Own boards and firmware', 'Hack Club hardware sprints', 'Designed to be used, not framed']
	},
	{
		title: 'Useful weird tools',
		description:
			'Some projects are just there because the problem is funny enough or annoying enough that building the tool feels obvious.',
		points: ['Phone behavior blockers', 'Safe terminal demos', 'Quick web utilities with personality']
	}
];

export const labNotes: LabNote[] = [
	{ title: 'Undercity E-ink Lanyard', note: 'event wearable' },
	{ title: 'Rollercoaster', note: 'drawing game demo' },
	{ title: 'Peggle Shiba', note: 'physics experiment' },
	{ title: 'Co-op Puzzle Game', note: 'multiplayer prototype' },
	{ title: 'Nickdev8.github.io', note: 'web game shelf' },
	{ title: 'Highwar', note: 'older Hack Club build' }
];

