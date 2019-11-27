const path = require('path');
const semver = require('semver');
const parseTsComponent = require('react-docgen-typescript').withCustomConfig(
  path.join(__dirname, '../../tsconfig.json'),
  {
    propFilter: prop => !(prop.parent && /node_modules/.test(prop.parent.fileName)),
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

const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-runtime',
          ],
        },
      },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
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
  skipComponentsWithoutExample: true,
  pagePerSection: true,
  styles,
  title: 'React UI',
  require: ['babel-polyfill'],
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  propsParser: (path, ...rest) => {
    if (/\.tsx$/.test(path)) {
      return parseTsComponent(path, ...rest);
    }
    return parseJsComponent(...rest);
  },
  webpackConfig,
  dangerouslyUpdateWebpackConfig: config => {
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];
    return config;
  },
  version: publishVersion,
  ribbon: {
    url: 'https://github.com/skbkontur/retail-ui',
  },
  getComponentPathLine(path) {
    return path.substring(path.indexOf('components')) || path;
  },
};
