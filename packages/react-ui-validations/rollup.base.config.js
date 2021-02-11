import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import typescript2 from 'rollup-plugin-typescript2';

export function buildConfig(outputDir, reactUiPackageName) {
  return {
    input: 'src/index.tsx',
    output: {
      file: 'build/' + outputDir + '/index.js',
      format: 'cjs',
      sourcemap: 'build/' + outputDir + '/index.js.map',
    },
    plugins: [
      typescript2({
        useTsconfigDeclarationDir: true,
        tsconfig: './prod.tsconfig.json',
      }),
      resolve(),
      commonjs(),
      replace({
        __REACT_UI_PACKAGE__: reactUiPackageName,
      }),
    ],
    external: ['lodash.isequal', 'react-dom', 'react', 'prop-types', 'warning'],
  };
}
