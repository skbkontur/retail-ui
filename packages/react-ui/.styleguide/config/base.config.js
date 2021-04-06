const path = require('path');
const parseTsComponent = require('react-docgen-typescript').withCustomConfig(
  path.join(__dirname, '../../tsconfig.json'),
  {
    propFilter: prop => !(prop.parent && /node_modules/.test(prop.parent.fileName)),
    savePropValueAsString: true,
  },
).parse;
const parseJsComponent = require('react-docgen').parse;
const { publishVersion } = require('../helpers');

const styles = {
  StyleGuide: {
    '@global body': {
      fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: 14,
    },
    '@font-face': {
      fontFamily: 'Segoe UI',
      fontWeight: 400,
      src: `local('Segoe UI'), local('SegoeUI'),
            url('//c.s-microsoft.com/static/fonts/segoe-ui/cyrillic/normal/latest.woff')
              format('woff')`,
    },
    content: {
      padding: '30px 40px',
    },
    hasSidebar: {
      paddingLeft: 300,
    },
    sidebar: {
      width: 300,
      background: '#41464e',
      fontSize: '16px',
    },
    logo: {
      borderBottom: 'none',
      padding: '40px',
      '& h1': {
        color: 'white',
        fontSize: '26px',
      },
    },
  },
  TableOfContents: {
    search: {
      padding: '30px 40px 20px',
    },
    input: {
      backgroundColor: 'none',
      borderRadius: 0,
      border: 'solid 2px rgba(255,255,255,0.2)',
      color: '#fff',
      padding: '6px 10px 7px 10px',
      fontSize: 'inherit',
      '&:focus': {
        border: 'solid 2px rgba(255,255,255,0.4)',
      },
    },
  },
  ComponentsList: {
    item: {
      fontSize: '16px',
      margin: 0,
      '& a': {
        '&:visited': {
          color: '#e5e5e5',
        },
        '&:link': {
          fontSize: '16px',
          color: '#e5e5e5',
          paddingLeft: 40,
          paddingTop: 7,
          paddingBottom: 9,
          display: 'inline-block',
          width: '100%',
          cursor: 'pointer',
        },
        '&:hover': {
          color: '#fff',
          background: 'rgba(47,51,56,0.5)',
        },
      },
    },
    isSelected: {
      fontWeight: 'normal',
      background: 'rgba(255, 255, 255, .3)',
    },
  },
  SectionHeading: {
    wrapper: {
      marginBottom: 0,
    },
    sectionName: {
      fontWeight: '200',
    },
  },
  Heading: {
    heading: {
      fontFamily: 'inherit',
    },
    heading2: {
      fontSize: '42px',
      fontWeight: '200',
      lineHeight: '50px',
      margin: '0',
    },
  },
  Pathline: {
    pathline: {
      fontSize: '16px',
      lineHeight: '50px',
      color: '#9B9B9B',
      marginBottom: 10,
    },
  },
  Code: {
    code: {
      ':not(pre) > &': {
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
        fontSize: '90%',
        background: '#f5f5f5',
        borderRadius: '2px',
        padding: '.12em .3em',
      },
    },
  },
};

const TRANSFORMS_FOR_IE11 = {
  test: /\.jsx?$/,
  include: new RegExp(
    `node_modules(/|\\\\)(?=(${[
      // ref: https://github.com/styleguidist/react-styleguidist/pull/1327
      'acorn-jsx',
      'estree-walker',
      'regexpu-core',
      'unicode-match-property-ecmascript',
      'unicode-match-property-value-ecmascript',
      'react-dev-utils',
      'ansi-styles',
      'ansi-regex',
      'chalk',
      'strip-ansi',
    ].join('|')})(/|\\\\)).*`,
  ),
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              ie: '11',
            },
          },
        ],
      ],
    },
  },
};

const webpackConfig = {
  module: {
    rules: [
      TRANSFORMS_FOR_IE11,
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          envName: 'development',
          extends: path.join(__dirname, '../../.babelrc.js'),
        },
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          {
            loader: 'dts-css-modules-loader',
            options: {
              namedExport: false,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'global',
                localIdentName: '[name]-[local]-[hash:base64:4]',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    public: 'localhost.testkontur.ru',
  },
};

module.exports = {
  skipComponentsWithoutExample: false,
  pagePerSection: true,
  styles,
  title: 'React UI',
  require: ['core-js'],
  propsParser: (path, ...rest) => {
    if (/\.tsx$/.test(path)) {
      return parseTsComponent(path, ...rest);
    }
    return parseJsComponent(...rest);
  },
  webpackConfig,
  version: publishVersion,
  ribbon: {
    url: 'https://github.com/skbkontur/retail-ui',
  },
  getComponentPathLine(path) {
    return path.substring(path.indexOf('components')) || path;
  },
  defaultExample: '../MockReadme.md',
  moduleAliases: {
    '@skbkontur/react-ui': path.resolve(__dirname, '../../'),
  },
  getExampleFilename(componentPath) {
    return componentPath.replace(path.extname(componentPath), '.md');
  },
  styleguideComponents: {
    PathlineRenderer: require.resolve('../components/Pathline/PathlineRenderer.tsx'),
    ArgumentRenderer: require.resolve('../components/Argument/ArgumentRenderer.tsx'),
  },
};
