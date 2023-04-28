import { defineConfig } from 'vite';

import solid from 'vite-plugin-solid';

export default defineConfig({
	root: 'src',
	base: './',
	build: {
		minify: 'terser',
		sourcemap: true,
		target: 'esnext',
		emptyOutDir: true,
		outDir: '../dist/',
		rollupOptions: {
			input: {
				'main': 'src/index.html',
				'1kpoints': 'src/1kpoints/index.html',
				'spiral': 'src/spiral/index.html',
				'dbmonster': 'src/dbmonster/index.html',
				'todomvc': 'src/todomvc/index.html',
			},
		},
		modulePreload: {
			polyfill: false,
		},
	},
	plugins: [
		solid(),
	],
});
