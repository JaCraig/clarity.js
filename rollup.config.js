import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';
import serve from 'rollup-plugin-serve';
import {terser} from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';
import path from 'path';
import analyze from 'rollup-plugin-analyzer'
import postcss from 'rollup-plugin-postcss';
import copy from "rollup-plugin-copy-assets";
import autoprefixer from 'autoprefixer';
import VuePlugin from 'rollup-plugin-vue';
import multi from '@rollup/plugin-multi-entry';
import livereload from 'rollup-plugin-livereload';
import alias from '@rollup/plugin-alias';

const external = Object.keys(pkg.dependencies);
const isProduction = !process.env.ROLLUP_WATCH;
const globals = { vue: 'Vue', moment: 'moment' };


export default [
	// CSS files
	{
		input: 'src/less/main.less',
		output: [{ file: 'dist/Clarity.css' },],
		plugins: [
			postcss({ extract: true, plugins: [autoprefixer()] }),
		]
	},
	// CSS files min
	{
		input: 'src/less/main.less',
		output: [{ file: 'dist/Clarity.min.css' },],
		plugins: [
			postcss({ extract: true, plugins: [autoprefixer()], minimize: true, sourceMap: true }),
			copy({ assets: ['src/less/fonts'] })
		]
	},
	// browser-friendly UMD build
	{
		input: [
			'src/ts/Extensions/*.ts',
			'src/ts/Browser/BrowserUtils.ts',
			'src/ts/Component/VueExtensions/*.ts',
			'src/ts/Component/Tabs/ClairytTabs.vue',
			'src/ts/Component/Modal/ClairytModal.vue',
			'src/ts/Framework/Clarity.ts'
		],
		external: external,
		output: [
			{ name: 'Clarity', file: pkg.browser, format: 'umd', globals: globals },
			{ name: 'Clarity', file: 'dist/Clarity.umd.min.js', format: 'umd', plugins: [terser()], globals: globals }
		],
		plugins: [
			resolve(),
			commonjs(),
			typescript(),
			VuePlugin(),
			!isProduction && serve({ contentBase: ['out','dist'] }),
			license({
				banner: {
					content: {
						file: path.join(__dirname, 'LICENSE-CODE'),
					},
				},
				thirdParty: {
					allow: '(MIT OR Apache-2.0)',
				},
			}),
			isProduction && analyze({ summaryOnly: true }),
			multi(),
			!isProduction && livereload(),
			alias({
				entries: [
				  { find: 'vue', replacement: 'vue/dist/vue.js' },
				]
			})
		]
	},
	// Node and package system builds
	{
		input: [
			'src/ts/Extensions/*.ts',
			'src/ts/Browser/BrowserUtils.ts',
			'src/ts/Component/VueExtensions/*.ts',
			'src/ts/Component/Tabs/ClairytTabs.vue',
			'src/ts/Component/Modal/ClairytModal.vue',
			'src/ts/Framework/Clarity.ts'
		],
		external: external,
		plugins: [
			typescript(),
			VuePlugin(),
			license({
				banner: {
					content: {
						file: path.join(__dirname, 'LICENSE-CODE'),
					},
				},
				thirdParty: {
					allow: '(MIT OR Apache-2.0)',
				},
			}),
			isProduction && analyze({ summaryOnly: true }),
			multi(),
			alias({
				entries: [
				  { find: 'vue', replacement: 'vue/dist/vue.js' },
				]
			})
		],
		output: [
			{ file: pkg.main, format: 'cjs', globals: globals },
			{ file: pkg.module, format: 'es', globals: globals  },
			{ file: 'dist/Clarity.cjs.min.js', format: 'cjs', plugins: [terser()], globals: globals  },
			{ file: 'dist/Clarity.esm.min.js', format: 'es', plugins: [terser()], globals: globals  }
		]
	},
];
