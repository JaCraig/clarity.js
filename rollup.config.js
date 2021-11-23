import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import serve from 'rollup-plugin-serve';
import license from 'rollup-plugin-license';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
// import copy from "rollup-plugin-copy-assets";
import autoprefixer from 'autoprefixer';
import VuePlugin from 'rollup-plugin-vue';
import multi from '@rollup/plugin-multi-entry';
import livereload from 'rollup-plugin-livereload';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import concat from './build/rollup-plugin-concat';
import copy from './build/rollup-plugin-copy';

const external = Object.keys(pkg.dependencies);
const isProduction = !process.env.ROLLUP_WATCH;
const globals = { vue: 'Vue', moment: 'moment' };


export default [
	// HTML files
	{
		input: "src/temp.js",
		output: {
			file: "out/temp.js",
			format: "cjs",
		},
		plugins: [
			copy({ assets: [{ source: "index.html", destination: "./index.html" },{ source: "index2.html", destination: "./index2.html" }] }),
		],
	},
	// Image files
	{
		input: "src/images/temp.js",
		output: {
			file: "out/images/temp.js",
			format: "cjs",
		},
		plugins: [
			copy({ assets: [{ source: "./", destination: "./" }] }),
		],
	},
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
			copy({ assets: [{ source:'../../node_modules/@fortawesome/fontawesome-free/webfonts', destination:"./webfonts" }] })
		]
	},
	// Node and package system builds
	{
		input: [
			'src/ts/Extensions/HTMLElement.ts',
			'src/ts/Extensions/NodeList.ts',
			'src/ts/Extensions/Object.ts',
			'src/ts/Extensions/String.ts',
			'src/ts/Clarity.ts',
		],
		external: external,
		plugins: [
			resolve(),
			typescript(),
			VuePlugin(),
			commonjs({ extensions: ['.js','.ts', '.vue']}),
			multi(),
			alias({
				entries: [
				  { find: 'vue', replacement: 'vue/dist/vue.js' },
				]
			}),
			replace({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')}),
			license({
				banner: {
					content: {
						file: path.join(__dirname, 'LICENSE-CODE'),
					},
				},
				thirdParty: {
					allow: '(MIT OR Apache-2.0 OR 0BSD)',
				},
			}),
			!isProduction && serve({ contentBase: ['out','dist'] }),
			!isProduction && livereload(),
		],
		output: [
			{ file: pkg.main, format: 'cjs', globals: globals },
			{ file: pkg.module, format: 'es', globals: globals  },
			{ file: 'dist/Clarity.cjs.min.js', format: 'cjs', globals: globals, plugins: [terser()]  },
			{ file: 'dist/Clarity.esm.min.js', format: 'es', globals: globals, plugins: [terser()]  },
			{ name: 'clarity', file: pkg.browser, format: 'umd', globals: globals },
			{ name: 'clarity', file: 'dist/Clarity.umd.min.js', format: 'umd', globals: globals, plugins: [terser()] }
		]
	},
];
