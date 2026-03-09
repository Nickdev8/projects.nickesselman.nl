<script lang="ts">
	import { onMount } from 'svelte';

	type KeyDef = {
		code: string;
		raw?: string;
		label?: string;
		width?: number;
	};

	type TrailPoint = {
		id: number;
		x: number;
		y: number;
	};

	type Pulse = TrailPoint;

	type RecentInput = {
		id: number;
		kind: 'key' | 'mouse' | 'scroll';
		label: string;
	};

	const rainColumns = [
		{ text: 'cursor', left: '6%', delay: '0s', duration: '14s' },
		{ text: 'signals', left: '18%', delay: '1.2s', duration: '17s' },
		{ text: '1011010', left: '30%', delay: '0.4s', duration: '12s' },
		{ text: 'typing', left: '42%', delay: '1.7s', duration: '16s' },
		{ text: 'focus', left: '54%', delay: '0.8s', duration: '13s' },
		{ text: 'motion', left: '68%', delay: '2.2s', duration: '18s' },
		{ text: '0110011', left: '82%', delay: '0.3s', duration: '15s' }
	];

	const keyRows: KeyDef[][] = [
		[
			{ code: 'Escape', label: 'esc', width: 1.2 },
			{ code: 'Digit1', raw: '1' },
			{ code: 'Digit2', raw: '2' },
			{ code: 'Digit3', raw: '3' },
			{ code: 'Digit4', raw: '4' },
			{ code: 'Digit5', raw: '5' },
			{ code: 'Digit6', raw: '6' },
			{ code: 'Digit7', raw: '7' },
			{ code: 'Digit8', raw: '8' },
			{ code: 'Digit9', raw: '9' },
			{ code: 'Digit0', raw: '0' },
			{ code: 'Minus', raw: '-' },
			{ code: 'Equal', raw: '=' },
			{ code: 'Backspace', label: 'bksp', width: 1.8 }
		],
		[
			{ code: 'Tab', label: 'tab', width: 1.45 },
			{ code: 'KeyQ', raw: 'Q' },
			{ code: 'KeyW', raw: 'W' },
			{ code: 'KeyE', raw: 'E' },
			{ code: 'KeyR', raw: 'R' },
			{ code: 'KeyT', raw: 'T' },
			{ code: 'KeyY', raw: 'Y' },
			{ code: 'KeyU', raw: 'U' },
			{ code: 'KeyI', raw: 'I' },
			{ code: 'KeyO', raw: 'O' },
			{ code: 'KeyP', raw: 'P' },
			{ code: 'BracketLeft', raw: '[' },
			{ code: 'BracketRight', raw: ']' },
			{ code: 'Backslash', raw: '\\', width: 1.35 }
		],
		[
			{ code: 'CapsLock', label: 'caps', width: 1.7 },
			{ code: 'KeyA', raw: 'A' },
			{ code: 'KeyS', raw: 'S' },
			{ code: 'KeyD', raw: 'D' },
			{ code: 'KeyF', raw: 'F' },
			{ code: 'KeyG', raw: 'G' },
			{ code: 'KeyH', raw: 'H' },
			{ code: 'KeyJ', raw: 'J' },
			{ code: 'KeyK', raw: 'K' },
			{ code: 'KeyL', raw: 'L' },
			{ code: 'Semicolon', raw: ';' },
			{ code: 'Quote', raw: "'" },
			{ code: 'Enter', label: 'enter', width: 2.05 }
		],
		[
			{ code: 'ShiftLeft', label: 'shift', width: 2.2 },
			{ code: 'KeyZ', raw: 'Z' },
			{ code: 'KeyX', raw: 'X' },
			{ code: 'KeyC', raw: 'C' },
			{ code: 'KeyV', raw: 'V' },
			{ code: 'KeyB', raw: 'B' },
			{ code: 'KeyN', raw: 'N' },
			{ code: 'KeyM', raw: 'M' },
			{ code: 'Comma', raw: ',' },
			{ code: 'Period', raw: '.' },
			{ code: 'Slash', raw: '/' },
			{ code: 'ShiftRight', label: 'shift', width: 2.45 }
		],
		[
			{ code: 'ControlLeft', label: 'ctl', width: 1.35 },
			{ code: 'MetaLeft', label: 'cmd', width: 1.25 },
			{ code: 'AltLeft', label: 'alt', width: 1.25 },
			{ code: 'Space', label: 'space', width: 5.6 },
			{ code: 'AltRight', label: 'alt', width: 1.25 },
			{ code: 'ArrowLeft', label: 'lt' },
			{ code: 'ArrowDown', label: 'dn' },
			{ code: 'ArrowUp', label: 'up' },
			{ code: 'ArrowRight', label: 'rt' }
		]
	];

	const letterOffset = 11;
	const digitOffset = 5;

	const rotateLetter = (value: string) => {
		const base = value.toUpperCase().charCodeAt(0) - 65;
		return String.fromCharCode(((base + letterOffset) % 26) + 65);
	};

	const rotateDigit = (value: string) => `${(Number(value) + digitOffset) % 10}`;

	const obfuscateKeycap = (key: KeyDef) => {
		if (key.label) return key.label;
		if (!key.raw) return 'key';
		if (/^[A-Z]$/.test(key.raw)) return rotateLetter(key.raw);
		if (/^[0-9]$/.test(key.raw)) return rotateDigit(key.raw);
		if (key.raw === '-') return '~';
		if (key.raw === '=') return '+';
		if (key.raw === '[') return '{';
		if (key.raw === ']') return '}';
		if (key.raw === '\\') return '|';
		if (key.raw === ';') return ':';
		if (key.raw === "'") return '"';
		if (key.raw === ',') return '<';
		if (key.raw === '.') return '>';
		if (key.raw === '/') return '?';
		return key.raw;
	};

	const bucketKey = (code: string) => {
		if (code.startsWith('Key')) {
			const letter = code.slice(3);
			if (['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].includes(letter)) return 'alpha-top';
			if (['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].includes(letter)) return 'alpha-home';
			return 'alpha-low';
		}
		if (code.startsWith('Digit')) return 'digit-row';
		if (code.startsWith('Arrow')) return `nav-${code.slice(5).toLowerCase()}`;
		if (code.includes('Shift') || code.includes('Control') || code.includes('Alt') || code.includes('Meta')) {
			return 'modifier';
		}
		if (['Enter', 'Backspace', 'Delete'].includes(code)) return 'edit';
		if (['Space', 'Tab', 'Escape'].includes(code)) return code.toLowerCase();
		return 'system';
	};

	let activeCodes = new Set<string>();
	let recentInputs: RecentInput[] = [
		{ id: 1, kind: 'mouse', label: 'mouse-live' },
		{ id: 2, kind: 'key', label: 'keys-obfuscated' }
	];
	let trail: TrailPoint[] = [];
	let pulses: Pulse[] = [];
	let pointerX = 58;
	let pointerY = 38;
	let pointerSpeed = 0.18;
	let sessionActive = false;
	let eventId = 2;
	let decayTimer = 0;

	const pushRecent = (label: string, kind: RecentInput['kind']) => {
		eventId += 1;
		recentInputs = [{ id: eventId, kind, label }, ...recentInputs].slice(0, 6);
	};

	const addPulse = (x: number, y: number) => {
		eventId += 1;
		const id = eventId;
		pulses = [...pulses, { id, x, y }];
		window.setTimeout(() => {
			pulses = pulses.filter((pulse) => pulse.id !== id);
		}, 750);
	};

	const updatePointer = (clientX: number, clientY: number) => {
		const nextX = Math.min(Math.max((clientX / window.innerWidth) * 100, 4), 96);
		const nextY = Math.min(Math.max((clientY / window.innerHeight) * 100, 6), 94);
		const dx = nextX - pointerX;
		const dy = nextY - pointerY;

		pointerX = nextX;
		pointerY = nextY;
		pointerSpeed = Math.min(1, Math.hypot(dx, dy) / 7);

		eventId += 1;
		trail = [...trail.slice(-10), { id: eventId, x: nextX, y: nextY }];
	};

	const syncSession = () => {
		const active = document.visibilityState === 'visible' && document.hasFocus();
		sessionActive = active;
		if (!active && activeCodes.size) {
			activeCodes = new Set();
		}
	};

	onMount(() => {
		syncSession();

		const handlePointerMove = (event: MouseEvent) => {
			syncSession();
			updatePointer(event.clientX, event.clientY);
		};

		const handlePointerDown = (event: MouseEvent) => {
			syncSession();
			updatePointer(event.clientX, event.clientY);
			addPulse(pointerX, pointerY);
			pushRecent('mouse-click', 'mouse');
		};

		const handleWheel = () => {
			syncSession();
			pushRecent('scroll-burst', 'scroll');
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			syncSession();
			if (!event.code) return;

			const next = new Set(activeCodes);
			next.add(event.code);
			activeCodes = next;

			if (!event.repeat) {
				pushRecent(bucketKey(event.code), 'key');
			}
		};

		const handleKeyUp = (event: KeyboardEvent) => {
			const next = new Set(activeCodes);
			next.delete(event.code);
			activeCodes = next;
		};

		const handleVisibility = () => {
			syncSession();
		};

		window.addEventListener('mousemove', handlePointerMove);
		window.addEventListener('mousedown', handlePointerDown);
		window.addEventListener('wheel', handleWheel, { passive: true });
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
		window.addEventListener('focus', handleVisibility);
		window.addEventListener('blur', handleVisibility);
		document.addEventListener('visibilitychange', handleVisibility);

		decayTimer = window.setInterval(() => {
			pointerSpeed = Math.max(pointerSpeed * 0.82 - 0.015, 0);
			trail = trail.slice(-8);
		}, 90);

		return () => {
			window.removeEventListener('mousemove', handlePointerMove);
			window.removeEventListener('mousedown', handlePointerDown);
			window.removeEventListener('wheel', handleWheel);
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
			window.removeEventListener('focus', handleVisibility);
			window.removeEventListener('blur', handleVisibility);
			document.removeEventListener('visibilitychange', handleVisibility);
			window.clearInterval(decayTimer);
		};
	});
</script>

<section class="input-panel panel" aria-label="Live input mirror">
	<div class="rain-layer" aria-hidden="true">
		{#each rainColumns as column}
			<span
				class="rain-column"
				style={`--left:${column.left}; --delay:${column.delay}; --duration:${column.duration};`}
			>
				{column.text}
			</span>
		{/each}
	</div>

	<div class="panel-head">
		<div>
			<p class="head-label">live input mirror</p>
			<p class="head-sub">Mouse motion + obfuscated keyboard zones</p>
		</div>
		<span class:session-live={sessionActive} class="live-chip">
			{sessionActive ? 'live' : 'paused'}
		</span>
	</div>

	<div class="mouse-field" aria-hidden="true">
		<div class="field-grid"></div>
		<div class="field-beam"></div>

		{#each pulses as pulse}
			<span class="pulse" style={`--x:${pulse.x}%; --y:${pulse.y}%;`}></span>
		{/each}

		{#each trail as point, index (point.id)}
			<span class="trail-dot" style={`--x:${point.x}%; --y:${point.y}%; --order:${index};`}></span>
		{/each}

		<div
			class="cursor-shell"
			style={`--x:${pointerX}%; --y:${pointerY}%; --speed:${pointerSpeed};`}
		>
			<span class="cursor-ring"></span>
			<span class="cursor-core"></span>
			<span class="cursor-axis cursor-axis-x"></span>
			<span class="cursor-axis cursor-axis-y"></span>
		</div>

		<div class="telemetry">
			<span>pointer {Math.round(pointerX)}:{Math.round(pointerY)}</span>
			<span>motion {Math.round(pointerSpeed * 100)}</span>
			<span>{activeCodes.size} keys lit</span>
		</div>
	</div>

	<div class="keyboard-shell" aria-label="Keyboard activity">
		{#each keyRows as row}
			<div class="key-row">
				{#each row as key}
					<div
						class:active-key={activeCodes.has(key.code)}
						class="keycap"
						style={`--span:${key.width ?? 1};`}
					>
						<span>{obfuscateKeycap(key)}</span>
					</div>
				{/each}
			</div>
		{/each}
	</div>

	<div class="panel-foot">
		<div class="recent-strip" aria-label="Recent input tags">
			{#each recentInputs as item (item.id)}
				<span class={`recent-chip recent-chip--${item.kind}`}>{item.label}</span>
			{/each}
		</div>

		<p class="footnote">
			P.S. this actually reacts live to mouse movement and focused-tab keyboard input. Letter
			caps are intentionally shifted so it is not a raw key log.
		</p>
	</div>
</section>

<style>
	.input-panel {
		position: relative;
		display: grid;
		grid-template-rows: auto minmax(0, 1fr) auto auto;
		gap: 1rem;
		min-height: 26rem;
		padding: 1.2rem;
		overflow: hidden;
	}

	.rain-layer {
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.42;
	}

	.rain-column {
		position: absolute;
		left: var(--left);
		top: -20%;
		display: block;
		width: 1.1rem;
		color: rgba(117, 255, 147, 0.28);
		font-family: 'Silkscreen', monospace;
		font-size: 0.72rem;
		line-height: 1.5;
		word-break: break-all;
		text-transform: uppercase;
		animation: signal-rain var(--duration) linear infinite;
		animation-delay: var(--delay);
	}

	.panel-head {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}

	.head-label,
	.head-sub {
		margin: 0;
	}

	.head-label {
		font-family: 'Silkscreen', monospace;
		font-size: 0.82rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.head-sub {
		margin-top: 0.45rem;
		color: var(--text-muted);
		font-size: 0.92rem;
	}

	.live-chip {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 4.9rem;
		padding: 0.45rem 0.8rem;
		border: 1px solid rgba(125, 255, 156, 0.18);
		border-radius: 999px;
		background: rgba(117, 255, 147, 0.06);
		color: var(--text-muted);
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.session-live {
		color: var(--text);
		border-color: rgba(125, 255, 156, 0.35);
		box-shadow: 0 0 24px rgba(117, 255, 147, 0.12);
	}

	.mouse-field {
		position: relative;
		min-height: 11.4rem;
		border: 1px solid rgba(125, 255, 156, 0.14);
		border-radius: 24px;
		background:
			radial-gradient(circle at center, rgba(117, 255, 147, 0.06), transparent 58%),
			linear-gradient(180deg, rgba(6, 15, 10, 0.94), rgba(4, 8, 6, 0.9));
		overflow: hidden;
	}

	.field-grid,
	.field-beam {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.field-grid {
		background-image:
			linear-gradient(90deg, rgba(125, 255, 156, 0.06) 1px, transparent 1px),
			linear-gradient(180deg, rgba(125, 255, 156, 0.06) 1px, transparent 1px);
		background-size: 32px 32px;
		mask-image: linear-gradient(180deg, black, rgba(0, 0, 0, 0.3));
	}

	.field-beam {
		background: linear-gradient(90deg, transparent, rgba(117, 255, 147, 0.08), transparent);
		transform: translateX(-45%);
		animation: beam-pass 7s linear infinite;
	}

	.trail-dot,
	.pulse,
	.cursor-shell {
		position: absolute;
		left: var(--x);
		top: var(--y);
		transform: translate(-50%, -50%);
	}

	.trail-dot {
		width: calc(0.48rem + ((var(--order) + 1) * 0.08rem));
		height: calc(0.48rem + ((var(--order) + 1) * 0.08rem));
		border-radius: 999px;
		background: rgba(117, 255, 147, calc(0.12 + ((var(--order) + 1) * 0.04)));
		filter: blur(0.4px);
	}

	.pulse {
		width: 1rem;
		height: 1rem;
		border: 1px solid rgba(117, 255, 147, 0.42);
		border-radius: 999px;
		animation: pulse-expand 750ms ease-out forwards;
	}

	.cursor-shell {
		z-index: 1;
		width: 2.4rem;
		height: 2.4rem;
	}

	.cursor-ring,
	.cursor-core,
	.cursor-axis {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.cursor-ring {
		width: calc(1.8rem + (var(--speed) * 1rem));
		height: calc(1.8rem + (var(--speed) * 1rem));
		border: 1px solid rgba(117, 255, 147, 0.54);
		border-radius: 999px;
		box-shadow: 0 0 24px rgba(117, 255, 147, 0.18);
	}

	.cursor-core {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 999px;
		background: var(--accent);
		box-shadow: 0 0 18px rgba(117, 255, 147, 0.42);
	}

	.cursor-axis-x {
		width: calc(2.3rem + (var(--speed) * 1.2rem));
		height: 1px;
		background: rgba(117, 255, 147, 0.32);
	}

	.cursor-axis-y {
		width: 1px;
		height: calc(2.3rem + (var(--speed) * 1.2rem));
		background: rgba(117, 255, 147, 0.32);
	}

	.telemetry {
		position: absolute;
		left: 1rem;
		right: 1rem;
		bottom: 0.9rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
	}

	.telemetry span,
	.recent-chip {
		display: inline-flex;
		align-items: center;
		padding: 0.38rem 0.65rem;
		border: 1px solid rgba(125, 255, 156, 0.18);
		border-radius: 999px;
		background: rgba(4, 10, 7, 0.72);
		font-size: 0.76rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.keyboard-shell {
		display: grid;
		gap: 0.42rem;
	}

	.key-row {
		display: flex;
		gap: 0.42rem;
	}

	.keycap {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 2.2rem;
		flex: var(--span) 1 0;
		border: 1px solid rgba(125, 255, 156, 0.1);
		border-radius: 13px;
		background:
			linear-gradient(180deg, rgba(9, 22, 14, 0.88), rgba(5, 11, 8, 0.88));
		color: rgba(233, 255, 232, 0.72);
		font-family: 'Silkscreen', monospace;
		font-size: 0.7rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		transition:
			transform 120ms ease,
			border-color 120ms ease,
			box-shadow 120ms ease,
			background-color 120ms ease;
	}

	.active-key {
		transform: translateY(-1px);
		border-color: rgba(125, 255, 156, 0.46);
		background:
			linear-gradient(180deg, rgba(24, 70, 40, 0.92), rgba(11, 33, 20, 0.92));
		box-shadow:
			inset 0 0 0 1px rgba(255, 255, 255, 0.03),
			0 0 26px rgba(117, 255, 147, 0.16);
		color: var(--text);
	}

	.panel-foot {
		display: grid;
		gap: 0.8rem;
	}

	.recent-strip {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
	}

	.recent-chip--key {
		color: #d5ffd8;
	}

	.recent-chip--mouse {
		color: #c8ffef;
	}

	.recent-chip--scroll {
		color: #f2ffcb;
	}

	.footnote {
		margin: 0;
		color: var(--text-muted);
		font-size: 0.84rem;
		line-height: 1.55;
	}

	@keyframes signal-rain {
		from {
			transform: translateY(-10%);
		}

		to {
			transform: translateY(145%);
		}
	}

	@keyframes beam-pass {
		from {
			transform: translateX(-45%);
		}

		to {
			transform: translateX(220%);
		}
	}

	@keyframes pulse-expand {
		0% {
			opacity: 0.75;
			transform: translate(-50%, -50%) scale(0.8);
		}

		100% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(4.4);
		}
	}

	@media (max-width: 760px) {
		.input-panel {
			min-height: 24rem;
			padding: 1rem;
		}

		.mouse-field {
			min-height: 10rem;
		}

		.key-row {
			gap: 0.32rem;
		}

		.keycap {
			min-height: 1.9rem;
			border-radius: 11px;
			font-size: 0.62rem;
		}
	}
</style>
