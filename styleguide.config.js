const fs = require('fs');
const path = require('path');
const parseTsComponent = require('react-docgen-typescript').withDefaultConfig()
  .parse;
const parseJsComponent = require('react-docgen').parse;

function getComponentList() {
  const dirPath = path.resolve(__dirname, 'components');
  return fs
    .readdirSync(dirPath)
    .map(x => [
      path.join(dirPath, x, `${x}.tsx`),
      path.join(dirPath, x, `${x}.js`)
    ])
    .map(([ts, js]) => (fs.existsSync(ts) ? ts : fs.existsSync(js) ? js : null))
    .filter(Boolean);
}

module.exports = {
  components: getComponentList,
  skipComponentsWithoutExample: true,
  styles: {
    StyleGuide: {
      '@global body': {
        fontFamily: 'Segoe UI',
        fontSize: 14
      },
      '@font-face': {
        fontFamily: 'Segoe UI',
        fontWeight: 400,
        src: `local('Segoe UI'), local('SegoeUI'),
            url('//c.s-microsoft.com/static/fonts/segoe-ui/cyrillic/normal/latest.woff')
              format('woff')`
      }
    }
  },
  title: 'React UI Style Guide',
  require: ['babel-polyfill'],
  propsParser: (path, ...rest) => {
    if (/\.tsx$/.test(path)) {
      return parseTsComponent(path, ...rest);
    }
    return parseJsComponent(...rest);
  },
  webpackConfig: {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'ts-loader' },
        {
          test: /\.jsx?$/,
          exclude: /node_modules\/(?!buble)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['env', 'react'],
                plugins: [
                  'transform-object-rest-spread',
                  'transform-class-properties',
                  [
                    'transform-runtime',
                    {
                      helpers: false,
                      polyfill: false,
                      regenerator: true,
                      moduleName: 'babel-runtime'
                    }
                  ]
                ]
              }
            }
          ]
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-modules-flow-types-loader',
            'css-loader',
            'typed-css-modules-loader',
            'less-loader'
          ],
          include: /retail-ui/
        },
        {
          test: /\.(png|woff|woff2|eot)$/,
          use: ['file-loader']
        }
      ]
    }
  }
};
