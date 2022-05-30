import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import webWorkerLoader from 'rollup-plugin-web-worker-loader';
import nodePolyfills from 'rollup-plugin-polyfill-node';
const extensions = ['.js','.mjs', '.ts', '.tsx'];

export default {
    input: "src/index.js",
    output: {
        file: "modules/index.mjs",
        format: "es",
        sourcemap: true,
    },
    plugins: [
        image(),
        json(),
        webWorkerLoader(),
        postcss({
            extensions: [".css"],
            plugins: [
            ]
        }),
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify( 'development' )
        }),
        babel({
            extensions,
            exclude: /node_modules/,
            babelrc: false,
            babelHelpers: 'runtime',
            presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
            ],
            plugins: [
                'react-require',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties',
                ['@babel/plugin-proposal-object-rest-spread', {
                    useBuiltIns: true,
                }],
                ['@babel/plugin-transform-runtime', {
                    corejs: 3,
                    helpers: true,
                    regenerator: true,
                    useESModules: true,
                }],
            ],
        }),
        nodePolyfills(),
        nodeResolve(),
        commonjs( {
            include: /node_modules/
        }),
        serve({
            open: false,
            verbose: true,
            contentBase: [""],
            host: "localhost",
            port: 3012,
        }),
        livereload({ watch: "dist" }),
    ]
};
/*
{
      jsnext: true,
      main: true,
      browser: true,
      preferBuiltins: true,
      extensions: [".js",".mjs"],
    }
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import sass from "sass";
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: "src/index.js",
  output: {
    file: "modules/index.mjs",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    image(),
    peerDepsExternal(),
    postcss({
      extract: false,
      modules: true,
      use: ['sass', 'scss'],
    }),
    nodeResolve({
      extensions: [".js"],
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    babel({
      babelHelpers: 'inline',
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
    serve({
      open: true,
      verbose: true,
      contentBase: [""],
      host: "localhost",
      port: 3012,
    }),
    livereload({ watch: "dist" }),
  ]
};

 */
