import { defineConfig } from 'vite';

import solid from 'vite-plugin-solid';

export default defineConfig({
	root: 'src',
	base: './',
	build: {
		outDir: '../dist/',
		rollupOptions: {
			input: {
				'main': 'src/index.html',
				'1kpoints': 'src/1kpoints/index.html',
				'spiral': 'src/spiral/index.html',
				'dbmonster': 'src/dbmonster/index.html',
			},
		},
		modulePreload: false,
	},
	plugins: [
		solid(),
	],
});
