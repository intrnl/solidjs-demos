import { For, Show, createEffect, createMemo, createSignal } from 'solid-js';
import { render } from 'solid-js/web';

import './style.css';

function App() {
	const ENTER_KEY = 13;
	const ESCAPE_KEY = 27;

	const filters = {
		all: (items) => items,
		active: (items) => items.filter((item) => !item.completed),
		completed: (items) => items.filter((item) => item.completed),
	};

	const [items, setItems] = createSignal([]);
	const [visibility, setVisibility] = createSignal('all');
	const [editing, setEditing] = createSignal(null);

	const filteredItems = createMemo(() => filters[visibility()](items()));
	const remaining = createMemo(() => filters.active(items()).length);

	const toggleAll = (event) => {
		setItems(items().map((item) => ({ ...item, completed: event.target.value })));
	};

	const clearCompleted = () => {
		setItems(items().filter((item) => !item.completed));
	};

	const addTodo = (event) => {
		if (event.which === ENTER_KEY) {
			setItems(
				items().concat({
					id: Date.now(),
					title: event.target.value,
					completed: false,
				}),
			);

			event.target.value = '';
		}
	};

	const removeTodo = (id) => {
		setItems(items().filter((item) => item.id !== id));
	};

	const editTodo = (next) => {
		const nextItems = items().slice();
		const index = nextItems.findIndex((item) => item.id === next.id);

		if (index !== -1) {
			nextItems[index] = { ...nextItems[index], ...next };
			setItems(nextItems);
		}
	};

	const toggleTodo = (id, event) => {
		editTodo({ id, completed: event.target.checked });
	};

	const handleEdit = (event) => {
		if (event.which === ENTER_KEY) {
			event.target.blur();
		} else if (event.which === ESCAPE_KEY) {
			setEditing(null);
		}
	};

	const handleSubmit = (event) => {
		editTodo({ id: editing(), title: event.target.value });
		editing.value = null;
	};

	const updateView = () => {
		let route = window.location.hash.replace(/#\/?/, '');

		if (!filters[route]) {
			route = 'all';
		}

		setVisibility(route);
	};

	window.addEventListener('hashchange', updateView);
	updateView();

	return (
		<>
			<header class="header">
				<h1>todos</h1>
				<input onKeyDown={addTodo} placeholder="What needs to be done" className="new-todo" autoFocus />
			</header>

			<Show when={items().length > 0}>
				<section class="main">
					<input
						id="toggle-all"
						type="checkbox"
						checked={remaining() === 0}
						onChange={toggleAll}
						className="toggle-all"
					/>
					<label htmlFor="toggle-all">Mark all as complete</label>

					<ul class="todo-list">
						<For each={filteredItems()}>
							{(item) => (
								<li class="todo" classList={{ completed: item.completed, editing: editing() === item.id }}>
									<div className="view">
										<input
											type="checkbox"
											checked={item.completed}
											onChange={(event) => toggleTodo(item.id, event)}
											className="toggle"
										/>

										<label onDblClick={() => setEditing(item.id)}>{item.title}</label>

										<button onClick={() => removeTodo(item.id)} className="destroy"></button>
									</div>

									<Show when={editing() === item.id}>
										<input
											ref={(target) => setTimeout(() => target.focus(), 0)}
											defaultValue={item.title}
											onKeyDown={handleEdit}
											onBlur={handleSubmit}
											class="edit"
										/>
									</Show>
								</li>
							)}
						</For>
					</ul>

					<footer className="footer">
						<span className="todo-count">
							<strong>{remaining}</strong> {remaining() === 1 ? 'item' : 'items'} left
						</span>

						<ul className="filters">
							<li>
								<a classList={{ selected: visibility() === 'all' }} href="#/">
									All
								</a>
							</li>
							<li>
								<a classList={{ selected: visibility() === 'active' }} href="#/active">
									Active
								</a>
							</li>
							<li>
								<a classList={{ selected: visibility() === 'completed' }} href="#/completed">
									Completed
								</a>
							</li>
						</ul>

						<Show when={items().length > remaining()}>
							<button className="clear-completed" onClick={clearCompleted}>
								Clear completed
							</button>
						</Show>
					</footer>
				</section>
			</Show>
		</>
	);
}

render(() => <App />, document.getElementById('root'));
