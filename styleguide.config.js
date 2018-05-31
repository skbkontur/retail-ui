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
  pagePerSection: true,
  styles: {
    StyleGuide: {
      '@global body': {
        fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: 14
      },
      '@font-face': {
        fontFamily: 'Segoe UI',
        fontWeight: 400,
        src: `local('Segoe UI'), local('SegoeUI'),
            url('//c.s-microsoft.com/static/fonts/segoe-ui/cyrillic/normal/latest.woff')
              format('woff')`
      },
      content: {
        padding: '30px 40px'
      },
      hasSidebar: {
        paddingLeft: 300
      },
      sidebar: {
        width: 300,
        background: '#41464e',
        fontSize: '16px'
      },
      logo: {
        borderBottom: 'none',
        padding: '40px',

        '& h1': {
          color: 'white',
          fontSize: '26px'
        }
      }
    },
    TableOfContents: {
      search: {
        padding: '30px 40px 20px'
      },
      input: {
        backgroundColor: 'none',
        borderRadius: 0,
        border: 'solid 2px rgba(255,255,255,0.2)',
        color: '#fff',
        padding: '6px 10px 7px 10px',
        fontSize: 'inherit',

        '&:focus': {
          border: 'solid 2px rgba(255,255,255,0.4)'
        }
      }
    },
    ComponentsList: {
      list: {
        paddingLeft: 0,
        paddingBottom: 100
      },
      item: {
        fontSize: '16px',
        margin: 0,

        '& a': {
          '&:visited': {
            color: '#e5e5e5'
          },

          '&:link': {
            fontSize: '16px',
            color: '#e5e5e5',
            paddingLeft: 40,
            paddingTop: 7,
            paddingBottom: 9,
            display: 'inline-block',
            width: '100%',
            cursor: 'pointer'
          },

          '&:hover': {
            color: '#fff',
            background: 'rgba(47,51,56,0.5)'
          }
        }
      }
    },
    SectionHeading: {
      wrapper: {
        marginBottom: 0
      },
      sectionName: {
        fontWeight: '200'
      }
    },
    Heading: {
      heading: {
        fontFamily: 'inherit'
      },
      heading2: {
        fontSize: '42px',
        fontWeight: '200',
        lineHeight: '50px',
        margin: '0'
      }
    },
    Pathline: {
      pathline: {
        fontSize: '16px',
        lineHeight: '50px',
        color: '#9B9B9B',
        marginBottom: 10
      }
    }
  },
  title: 'React UI',
  require: ['babel-polyfill'],
  propsParser: (path, ...rest) => {
    if (/\.tsx$/.test(path)) {
      return parseTsComponent(path, ...rest);
    }
    return parseJsComponent(...rest);
  },
  webpackConfig: {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: { transpileOnly: true }
        },
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
            '@skbkontur/typed-css-modules-loader',
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
