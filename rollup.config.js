import serve from 'rollup-plugin-serve';
import copy from 'rollup-plugin-copy';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace';
import css from "rollup-plugin-import-css";
import scss from 'rollup-plugin-scss'

export default {
    input: 'src/main.js',
    //specify where to export the resulting bundle.js file and which directory
    output: {
      file: 'dist/bundle.js',
      //should always use es(ecma script) - the export import system
      format: 'es',
      sourcemap: 'inline'
    },
    plugins: [
      scss(),
      nodeResolve({
        extensions: [".js"],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify( 'development' )
      }),
      serve({ 
        historyApiFallback: true,
        contentBase:'dist',
        //80 is for http and 8080 is for development
        port:8080
      }),
      babel({
        presets: ["@babel/preset-react"],
      }),
      commonjs(),
      copy({
        targets: [
          { src: 'ui/index.html', dest: 'dist/' },
          { src: 'ui/style.css', dest: 'dist/' },
          { src: 'static/**/*', dest: 'dist/static/' }
        ]
      })
    ],
    watch: {
      //include: ["ui"]
    }
  };