import { Index, batch, createMemo, createSignal, onMount } from 'solid-js';
import { Show, render } from 'solid-js/web';

import * as perfmon from 'perf-monitor';

import './style.css';

function Spiral() {
	const COUNT = 500;
	const LOOPS = 6;

	const [x, setX] = createSignal(0);
	const [y, setY] = createSignal(0);
	const [big, setBig] = createSignal(false);
	const [counter, setCounter] = createSignal(0);

	let stopped = false;
	let moved = { x: 0, y: 0, timeout: false };

	const cursors = createMemo(() => {
		const max = COUNT + Math.round(Math.sin((counter() / 90) * 2 * Math.PI) * COUNT * 0.5);
		const next = [];

		for (let i = max; i--; ) {
			let f = (i / max) * LOOPS;
			let theta = f * 2 * Math.PI;
			let m = 20 + i * 2;
			let hue = (f * 255 + counter() * 10) % 255;

			next[i] = {
				color: `hsl(${hue}, 100%, 50%)`,
				x: (x() + Math.sin(theta) * m) | 0,
				y: (y() + Math.cos(theta) * m) | 0,
			};
		}

		return next;
	});

	const handlePointerMove = (ev) => {
		moved.x = ev.x;
		moved.y = ev.y;

		if (!moved.timeout) {
			moved.timeout = true;

			requestAnimationFrame(() => {
				batch(() => {
					moved.timeout = false;
					setX(moved.x);
					setY(moved.y);
				});
			});
		}
	};

	const handlePointerDown = () => {
		setBig(true);
	};

	const handlePointerUp = () => {
		setBig(false);
	};

	const increment = () => {
		if (stopped) {
			return;
		}

		setCounter(counter() + 1);
		requestAnimationFrame(increment);
	};

	onMount(() => {
		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('pointerdown', handlePointerDown);
		window.addEventListener('pointerup', handlePointerUp);

		requestAnimationFrame(increment);

		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerdown', handlePointerDown);
			window.removeEventListener('pointerup', handlePointerUp);

			stopped = true;
		};
	});

	return (
		<div class="main">
			<Cursor label x={x()} y={y()} big={big()} />

			<Index each={cursors()}>
				{(cursor) => <Cursor color={cursor().color} x={cursor().x} y={cursor().y} big={big()} />}
			</Index>
		</div>
	);
}

function Cursor(props) {
	return (
		<div
			classList={{ cursor: true, big: props.big, label: props.label }}
			style={{
				'border-color': props.color,
				transform: `translate(${props.x}px, ${props.y}px) scale(${props.big ? 2 : 1})`,
			}}
		>
			<Show when={props.label}>
				<span class="label">
					{props.x} {props.y}
				</span>
			</Show>
		</div>
	);
}

if (!/[&?]perfmon=(false|off|0)\b/.test(location.search)) {
	perfmon.startFPSMonitor();
	perfmon.startMemMonitor();
}

render(() => <Spiral />, document.getElementById('root'));
