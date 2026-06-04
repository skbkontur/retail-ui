import * as fs from 'fs';

import { headingTokens, bodyTokens } from '../tokens.js';

interface Token {
  'font-size': string;
  'line-height': string;
  'font-weight'?: string;
  'font-variant-numeric'?: string;
}

function createFile(fileName: string, content: string) {
  fs.writeFile(fileName, content.trim(), () => {});
}

const toCamelCaseWithCapsSize = (str: string) => {
  const parts = str.split('-');
  return parts
    .map((part, index) => {
      if (index === 0) {
        return part;
      }
      if (index === parts.length - 1) {
        return part.toUpperCase();
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join('');
};

const weightMap = {
  regular: 400,
  medium: 500,
  bold: 700,
};

const resetCss = `.reset {
  margin: 0;
  padding: 0;
}`;

const generateGlobalCss = () => {
  const cssRules: string[] = [resetCss.replace('.reset', '.t-reset')];

  Object.entries(headingTokens).forEach(([key, rawToken]) => {
    const token = rawToken as Token;
    cssRules.push(
      `.t-${key} { font-size: ${token['font-size']}; line-height: ${token['line-height']}; font-weight: 700; }`
    );
  });

  Object.entries(bodyTokens).forEach(([key, rawToken]) => {
    const token = rawToken as Token;
    const variantStr = token['font-variant-numeric'] ? ` font-variant-numeric: ${token['font-variant-numeric']};` : '';
    cssRules.push(
      `.t-${key} { font-size: ${token['font-size']}; line-height: ${token['line-height']}; font-weight: 400;${variantStr} }`
    );
  });

  Object.entries(weightMap).forEach(([name, value]) => {
    cssRules.push(`.t-${name} { font-weight: ${value}; }`);
  });

  createFile('./t.css', cssRules.join('\n\n'));
};

const generateCssModules = () => {
  const cssRules: string[] = [resetCss];

  Object.entries(headingTokens).forEach(([key, rawToken]) => {
    const token = rawToken as Token;
    cssRules.push(
      `.${toCamelCaseWithCapsSize(key)} { font-size: ${token['font-size']}; line-height: ${token['line-height']}; font-weight: 700; }`
    );
  });

  Object.entries(bodyTokens).forEach(([key, rawToken]) => {
    const token = rawToken as Token;
    const variantStr = token['font-variant-numeric'] ? ` font-variant-numeric: ${token['font-variant-numeric']};` : '';
    cssRules.push(
      `.${toCamelCaseWithCapsSize(key)} { font-size: ${token['font-size']}; line-height: ${token['line-height']}; font-weight: 400;${variantStr} }`
    );
  });

  Object.entries(weightMap).forEach(([name, value]) => {
    cssRules.push(`.${name} { font-weight: ${value}; }`);
  });

  createFile('./t.module.css', cssRules.join('\n\n'));
};

const generateScss = () => {
  const scssMixins: string[] = [];

  Object.entries(headingTokens).forEach(([key, rawToken]) => {
    const token = rawToken as Token;
    scssMixins.push(`
@mixin t-${key}($weight: bold, $reset: false) {
  font-size: ${token['font-size']};
  line-height: ${token['line-height']};
  @if $weight == 'regular' { font-weight: 400; }
  @else if $weight == 'medium' { font-weight: 500; }
  @else { font-weight: 700; }
  @if $reset {
    margin: 0;
    padding: 0;
  }
}`);
  });

  Object.entries(bodyTokens).forEach(([key, rawToken]) => {
    const token = rawToken as Token;
    const variantStr = token['font-variant-numeric']
      ? `\n  font-variant-numeric: ${token['font-variant-numeric']};`
      : '';
    scssMixins.push(`
@mixin t-${key}($weight: regular, $reset: false) {
  font-size: ${token['font-size']};
  line-height: ${token['line-height']};${variantStr}
  @if $weight == 'medium' { font-weight: 500; }
  @else if $weight == 'bold' { font-weight: 700; }
  @else { font-weight: 400; }
  @if $reset {
    margin: 0;
    padding: 0;
  }
}`);
  });

  createFile('./t.scss', scssMixins.join('\n\n'));
};

const generateLess = () => {
  const lessMixins: string[] = [];

  Object.entries(headingTokens).forEach(([key, rawToken]) => {
    const token = rawToken as Token;
    lessMixins.push(`
.t-${key}(@weight: bold, @reset: false) {
  font-size: ${token['font-size']};
  line-height: ${token['line-height']};
  .set-weight() when (@weight = regular) { font-weight: 400; }
  .set-weight() when (@weight = medium) { font-weight: 500; }
  .set-weight() when (@weight = bold) { font-weight: 700; }
  .set-weight();
  .set-reset() when (@reset = true) {
    margin: 0;
    padding: 0;
  }
  .set-reset();
}`);
  });

  Object.entries(bodyTokens).forEach(([key, rawToken]) => {
    const token = rawToken as Token;
    const variantStr = token['font-variant-numeric']
      ? `\n  font-variant-numeric: ${token['font-variant-numeric']};`
      : '';
    lessMixins.push(`
.t-${key}(@weight: regular, @reset: false) {
  font-size: ${token['font-size']};
  line-height: ${token['line-height']};${variantStr}
  .set-weight() when (@weight = regular) { font-weight: 400; }
  .set-weight() when (@weight = medium) { font-weight: 500; }
  .set-weight() when (@weight = bold) { font-weight: 700; }
  .set-weight();
  .set-reset() when (@reset = true) {
    margin: 0;
    padding: 0;
  }
  .set-reset();
}`);
  });

  createFile('./t.less', lessMixins.join('\n\n'));
};

generateGlobalCss();
generateCssModules();
generateScss();
generateLess();
