import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import pkg from './package.json'

export default {
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: "auto"
        },
        {
            file: pkg.module,
            format: 'esm',
        },
    ],
    plugins: [nodeResolve(), commonjs(), babel({babelHelpers: 'runtime'})],
};
