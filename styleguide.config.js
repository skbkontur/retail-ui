const fs = require('fs');
const path = require('path');

function getComponentList() {
  const dirPath = path.resolve(__dirname, 'components');
  return fs
    .readdirSync(dirPath)
    .map(x => path.join(dirPath, x, `${x}.js`))
    .filter(x => fs.existsSync(x));
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
  webpackConfig: {
    module: {
      rules: [
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
          use: ['style-loader', 'css-loader', 'less-loader'],
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
