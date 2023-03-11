import * as path from 'node:path';

import { defineConfig } from 'vite';

import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
	root: 'src',
	base: './',
	build: {
		outDir: '../dist/',
		rollupOptions: {
			input: {
				'main': path.resolve(__dirname, 'src/index.html'),
				'1kpoints': path.resolve(__dirname, 'src/1kpoints.html'),
				'spiral': path.resolve(__dirname, 'src/spiral.html'),
				'dbmonster': path.resolve(__dirname, 'src/dbmonster.html'),
			},
		},
		modulePreload: false,
	},
	plugins: [
		solidPlugin(),
	],
});
