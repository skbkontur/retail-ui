import * as fs from 'fs';

import { tokens } from '../tokens.js';

function createFile(fileName: string, content: string) {
  fs.writeFile(fileName, content.trim(), () => {});
}

const weightMap = {
  regular: 400,
  medium: 500,
  bold: 700,
};

const generateGlobalCss = () => {
  const cssRules: string[] = [];

  Object.entries(tokens).forEach(([size, token]) => {
    cssRules.push(`
.t-${size} {
  font-size: ${token.fontSize};
  line-height: ${token.lineHeight};
  font-weight: 400;
  margin: 0;
}`);

    if ('wideLineHeight' in token) {
      cssRules.push(`
.t-${size}.t-wide {
  line-height: ${token.wideLineHeight};
}`);
    }
  });

  Object.entries(weightMap).forEach(([name, value]) => {
    cssRules.push(`
.t-${name} {
  font-weight: ${value};
}`);
  });

  createFile('./text.css', cssRules.join('\n'));
};

const generateCssModules = () => {
  const cssRules: string[] = [];

  Object.entries(tokens).forEach(([size, token]) => {
    cssRules.push(`
.t${size} {
  font-size: ${token.fontSize};
  line-height: ${token.lineHeight};
  font-weight: 400;
  margin: 0;
}`);

    if ('wideLineHeight' in token) {
      cssRules.push(`
.t${size}.wide {
  line-height: ${token.wideLineHeight};
}`);
    }
  });

  Object.entries(weightMap).forEach(([name, value]) => {
    cssRules.push(`
.${name} {
  font-weight: ${value};
}`);
  });

  createFile('./Text.module.css', cssRules.join('\n'));
};

const generateScss = () => {
  const sassSizeEntries: string[] = [];

  Object.entries(tokens).forEach(([size, token]) => {
    let entry = `
  "${size}": (
    "font-size": ${token.fontSize},
    "line-height": ${token.lineHeight}`;

    if ('wideLineHeight' in token) {
      entry += `,
    "wide-line-height": ${token.wideLineHeight}`;
    }

    entry += '\n  )';
    sassSizeEntries.push(entry);
  });

  const res = `
@use "sass:map";

$typography: (${sassSizeEntries.join(',')}
) !default;

$weights: (
  "regular": 400,
  "medium": 500,
  "bold": 700
);

@mixin t($size, $wide: false, $weight: null) {
  $style: map.get($typography, "#{$size}");

  @if $style {
    font-size: map.get($style, "font-size");
    
    @if $weight != null and map.has-key($weights, $weight) {
      font-weight: map.get($weights, $weight);
    } @else {
      font-weight: 400;
    }
    
    $line-height: map.get($style, "line-height");

    @if $wide and map.has-key($style, "wide-line-height") {
      $line-height: map.get($style, "wide-line-height");
    }

    line-height: $line-height;
    margin: 0;
  }
}`;
  createFile('./text.scss', res);
};

const generateLess = () => {
  const lessEntries: string[] = [];

  Object.entries(tokens).forEach(([size, token]) => {
    let entry = `
  @t${size}: {
    font-size: ${token.fontSize}; 
    line-height: ${token.lineHeight}; 
    wide-line-height: ${'wideLineHeight' in token ? token.wideLineHeight : 'null'};
  };`;
    lessEntries.push(entry);
  });

  const res = `
@typography: {${lessEntries.join('')}
}

@weights: {
  @regular: 400;
  @medium: 500;
  @bold: 700;
};

.t(@size, @wide: false, @weight: default) {
  @size-key: ~"t@{size}";
  @style: @typography[@@size-key];

  font-size: @style[font-size];
  margin: 0;
  
  .set-weight() when (@weight = default) {
    font-weight: 400;
  }
  .set-weight() when not (@weight = default) {
    @weight-key: ~"@{weight}";
    @val: @weights[@@weight-key];
    font-weight: ~"@{val}";
  }
  .set-weight();
  
  @has-wide: boolean(not(@style[wide-line-height] = null));
  
  @line-height-value: if((@wide = true) and (@has-wide = true), @style[wide-line-height], @style[line-height]);
  line-height: @line-height-value;
}`;
  createFile('./text.less', res);
};

generateGlobalCss();
generateCssModules();
generateScss();
generateLess();
