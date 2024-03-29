import { Index, createEffect, createSignal, onCleanup } from 'solid-js';
import { render } from 'solid-js/web';

import './style.css';

import * as perfmon from 'perf-monitor';
import { interpolateViridis } from './viridis.js';

const Layout = {
	PHYLLOTAXIS: 0,
	GRID: 1,
	WAVE: 2,
	SPIRAL: 3,
};

const LAYOUT_ORDER = [Layout.PHYLLOTAXIS, Layout.SPIRAL, Layout.PHYLLOTAXIS, Layout.GRID, Layout.WAVE];

const theta = Math.PI * (3 - Math.sqrt(5));

function App() {
	const [count, setCount] = createSignal(1000);

	const params = new URLSearchParams(location.search);

	if (params.has('count')) {
		const next = parseInt(params.get('count'));

		if (!Number.isNaN(next) && next >= 10 && next <= 10000) {
			setCount(next);
		}
	}

	function onRangeChange(ev) {
		setCount(ev.target.valueAsNumber);
	}

	return (
		<div className="app-wrapper">
			<VizDemo count={count()} />

			<div className="controls">
				<span># Points</span>
				<input type="range" min={10} max={10000} value={count} onChange={onRangeChange} />
				<span>{count}</span>
			</div>

			<span className="about">
				Solid.js 1k Points demo, based on the{' '}
				<a href="https://dingoeatingfuzz.github.io/glimmer-1k/" target="_blank">
					Glimmer demo by Michael Lange
				</a>
			</span>
		</div>
	);
}

function VizDemo(props) {
	const NUM_STEPS = 60 * 2;

	let stopped = false;

	let phyllotaxis;
	let spiral;
	let grid;
	let wave;

	let step = 0;
	let layout = 0;
	let _count = NaN;

	const [points, setPoints] = createSignal([]);

	const makePoints = (count) => {
		const array = [];

		for (let i = 0; i < count; i++) {
			const [px, py] = project(phyllotaxis(i));
			const [sx, sy] = project(spiral(i));
			const [gx, gy] = project(grid(i));
			const [wx, wy] = project(wave(i));

			array.push({
				x: 0,
				y: 0,
				color: interpolateViridis(i / count),
				px,
				py,
				sx,
				sy,
				gx,
				gy,
				wx,
				wy,
			});
		}

		return array;
	};

	createEffect(() => {
		if (_count !== props.count) {
			_count = props.count;

			phyllotaxis = genPhyllotaxis(_count);
			spiral = genSpiral(_count);
			grid = genGrid(_count);
			wave = genWave(_count);

			setPoints(makePoints(_count));
		}
	});

	createEffect(() => {
		const next = () => {
			if (stopped) {
				return;
			}

			step = (step + 1) % NUM_STEPS;
			layout = step === 0 ? (layout + 1) % LAYOUT_ORDER.length : layout;

			// Clamp the linear interpolation at 80% for a pause at each finished layout state
			const pct = Math.min(1, step / (NUM_STEPS * 0.8));

			const currentLayout = LAYOUT_ORDER[layout];
			const nextLayout = LAYOUT_ORDER[(layout + 1) % LAYOUT_ORDER.length];

			const pxProp = xForLayout(currentLayout);
			const nxProp = xForLayout(nextLayout);
			const pyProp = yForLayout(currentLayout);
			const nyProp = yForLayout(nextLayout);

			const nextPoints = points().map((point) => {
				const next = { ...point };
				next.x = lerp(next, pct, pxProp, nxProp);
				next.y = lerp(next, pct, pyProp, nyProp);

				return next;
			});

			setPoints(nextPoints);
			requestAnimationFrame(next);
		};

		requestAnimationFrame(next);
		onCleanup(() => (stopped = true));
	});

	return (
		<svg className="demo">
			<Index each={points()}>
				{(point) => (
					<rect
						class="point"
						transform={`translate(${Math.floor(point().x)}, ${Math.floor(point().y)})`}
						fill={point().color}
					/>
				)}
			</Index>
		</svg>
	);
}

if (!/[&?]perfmon=(false|off|0)\b/.test(location.search)) {
	perfmon.startFPSMonitor();
	perfmon.startMemMonitor();
}

render(() => <App />, document.getElementById('root'));

function xForLayout(layout) {
	switch (layout) {
		case Layout.PHYLLOTAXIS:
			return 'px';
		case Layout.GRID:
			return 'gx';
		case Layout.WAVE:
			return 'wx';
		case Layout.SPIRAL:
			return 'sx';
	}
}

function yForLayout(layout) {
	switch (layout) {
		case Layout.PHYLLOTAXIS:
			return 'py';
		case Layout.GRID:
			return 'gy';
		case Layout.WAVE:
			return 'wy';
		case Layout.SPIRAL:
			return 'sy';
	}
}

function lerp(obj, percent, startProp, endProp) {
	let px = obj[startProp];
	return px + (obj[endProp] - px) * percent;
}

function genPhyllotaxis(n) {
	return (i) => {
		let r = Math.sqrt(i / n);
		let th = i * theta;
		return [r * Math.cos(th), r * Math.sin(th)];
	};
}

function genGrid(n) {
	let rowLength = Math.round(Math.sqrt(n));
	return (i) => [
		-0.8 + (1.6 / rowLength) * (i % rowLength),
		-0.8 + (1.6 / rowLength) * Math.floor(i / rowLength),
	];
}

function genWave(n) {
	let xScale = 2 / (n - 1);
	return (i) => {
		let x = -1 + i * xScale;
		return [x, Math.sin(x * Math.PI * 3) * 0.3];
	};
}

function genSpiral(n) {
	return (i) => {
		let t = Math.sqrt(i / (n - 1)),
			phi = t * Math.PI * 10;
		return [t * Math.cos(phi), t * Math.sin(phi)];
	};
}

function scale(magnitude, vector) {
	return vector.map((p) => p * magnitude);
}

function translate(translation, vector) {
	return vector.map((p, i) => p + translation[i]);
}

function project(vector) {
	const wh = window.innerHeight / 2;
	const ww = window.innerWidth / 2;
	return translate([ww, wh], scale(Math.min(wh, ww), vector));
}
