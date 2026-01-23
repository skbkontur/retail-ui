import * as fs from 'fs';

import type { TTextTokens } from '../src/TextTokens.ts';
// @ts-expect-error: its ok to import .ts here
import { TextTokens } from '../src/TextTokens.ts';

function createFile(fileName: string, content: string) {
  fs.writeFile(fileName, content, () => {});
}

const generateCss = (inputTokens: { [key in TTextTokens]: Record<string, any> }) => {
  const tokens = Object.keys(inputTokens)
    .sort()
    .map((token) => {
      const tokenValues = TextTokens[token as TTextTokens];
      return `.t${token}{
          font-size:${tokenValues.fontSize};
          line-height:${tokenValues.lineHeight};
          margin:${tokenValues.margin};
          font-weight:${tokenValues.fontWeight};
        }`;
    });
  const res = `${tokens.join('\n\n')}

    .noSpacing {
      margin: 0;
    }
  `;
  createFile('./Text.css', res);
  createFile('./Text.module.css', res);
};

const generateScss = (inputTokens: { [key in TTextTokens]: Record<string, any> }) => {
  const tokens = Object.keys(inputTokens)
    .sort()
    .map((token) => {
      const tokenValues = TextTokens[token as TTextTokens];
      return `"${token}": (
            font-size:${tokenValues.fontSize},
            line-height: ${tokenValues.lineHeight},
            margin: ${tokenValues.margin},
            font-weight: ${tokenValues.fontWeight}
          )`;
    });
  const res = `
  @use "sass:map";
  @use "sass:string";

  $typography: (
    ${tokens.join(',\n')}
  ) !default;

  /// @param {number} $size - Размер
  /// @param {boolean} $spacing [true] - Отступы
  /// @param {boolean} $wideColumn [false] - Широкая колонка
  @mixin t($size, $spacing: true, $wideColumn: false) {
    $size-key: if($wideColumn, "#{$size}Wide", "#{$size}");
    $style: map.get($typography, $size-key);

    font-size: map.get($style, font-size);
    font-weight: map.get($style, font-weight);
    line-height: map.get($style, line-height);

    @if $spacing {
      margin: map.get($style, margin);
    } @else {
      margin: 0;
    }
  }
  `;
  createFile('./text.scss', res);
};

const generateLess = (inputTokens: { [key in TTextTokens]: Record<string, any> }) => {
  const tokens = Object.keys(inputTokens)
    .sort()
    .map((token) => {
      const tokenValues = TextTokens[token as TTextTokens];
      return `@${token}: {
            font-size:${tokenValues.fontSize};
            font-weight:${tokenValues.fontWeight};
            line-height:${tokenValues.lineHeight};
            margin:${tokenValues.margin};
         }`;
    });

  const res = `
    @typography: {
      ${tokens.join('\n')}
    }

    .t(@size, @spacing: true, @wideColumn: false) {
      @size-key: if(@wideColumn, %(e("%aWide"), @size), @size);
      @size-props: @typography[@@size-key];

      font-size: @size-props[font-size];
      font-weight: @size-props[font-weight];
      line-height: @size-props[line-height];
      margin: if(@spacing, @size-props[margin], 0);
    }

    `;
  createFile('./text.less', res);
};

[generateCss, generateScss, generateLess].forEach((callBack) => {
  callBack(TextTokens);
});
