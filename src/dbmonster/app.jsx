import { Index, render } from 'solid-js/web';

import * as perfmon from 'perf-monitor';

import './style.css';
import './env.js';
import { createSignal } from 'solid-js';


function Table (props) {
	return (
		<table class='table table-striped latest-data'>
			<tbody>
				<Index each={props.dbs}>
					{(db) => (
						<tr>
							<td class='dbname'>
								{db().dbname}
							</td>

							<td class='query-count'>
								<span class={db().lastSample.countClassName}>
									{db().lastSample.nbQueries}
								</span>
							</td>

							<Index each={db().lastSample.topFiveQueries}>
								{(query) => (
									<td class={query().elapsedClassName}>
										{query().formatElapsed}

										<div class='popover left'>
											<div class='popover-content'>{query().query}</div>
											<div class='arrow'></div>
										</div>
									</td>
								)}
							</Index>
						</tr>
					)}
				</Index>
			</tbody>
		</table>
	)
}

if (!(/[&?]perfmon=(false|off|0)\b/).test(location.search)) {
	perfmon.startFPSMonitor();
	perfmon.startMemMonitor();
	perfmon.initProfiler('view update');

	const root = document.getElementById('root');
	const [array, setArray] = createSignal([]);

	function redraw () {
		const next = ENV.generateData().toArray();

		perfmon.startProfile('view update');
		setArray(next);
		perfmon.endProfile('view update');

		setTimeout(redraw, ENV.timeout);
	}

	redraw();
	render(() => <Table dbs={array()} />, root);
}
else {
	const root = document.getElementById('root');
	const [array, setArray] = createSignal([]);

	function redraw () {
		const next = ENV.generateData().toArray();

		setArray(next);

		setTimeout(redraw, ENV.timeout);
	}
	
	redraw();
	render(() => <Table dbs={array()} />, root);
}
