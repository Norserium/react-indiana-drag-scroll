import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
	input: 'src/index.tsx',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: pkg.module,
			format: 'es',
			sourcemap: true,
		},
	],
	plugins: [
		external(),
		postcss({
			extensions: ['css', 'scss'],
			use: {
				sass: true,
			},
			plugins: [autoprefixer],
			inject: true,
		}),
		url(),
		babel({
			exclude: 'node_modules/**',
			plugins: ['external-helpers'],
		}),
		resolve(),
		commonjs(),
		terser(),
		typescript(),
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
};
