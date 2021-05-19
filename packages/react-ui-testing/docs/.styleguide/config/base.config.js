const path = require('path');

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

module.exports = {
  pagePerSection: true,
  title: 'react-ui-validations docs',
  require: ['core-js'],
  styles,
  sections: [
    {
      name: 'Описание',
      content: path.join(__dirname, '../../src/Description.md'),
      exampleMode: 'expand',
    },
    {
      name: 'Быстрый старт',
      content: path.join(__dirname, '../../src/QuickStart.md'),
      exampleMode: 'expand',
    },
    {
      name: 'Подключение скрипта',
      content: path.join(__dirname, '../../src/ExposeTidsToDom.md'),
      exampleMode: 'expand',
    },
    {
      name: 'API reference по PageObject',
      content: path.join(__dirname, '../../src/PageObjectsDotNet.md'),
      exampleMode: 'expand',
    },
  ],
  defaultExample: '../MockReadme.md',
  styleguideDir: path.join(__dirname, '../../build'),
};
