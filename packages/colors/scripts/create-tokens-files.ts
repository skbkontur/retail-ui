import * as fs from 'fs';
import * as path from 'path';

import { camelCaseToKebabCase, kebabCaseToCamelCase } from '../lib/utils/format-variable.js';
import { getColors } from '../lib/get-colors.js';
import * as DEFAULT_SWATCH from '../lib/consts/default-swatch.js';
import type { ColorObject, ColorValue } from '../lib/types/tokens.js';
import type { ConfigOptions } from '../lib/get-colors-base.js';

type ColorFormat = ConfigOptions['format'];

const DEFAULT_BRAND = 'red';
const DEFAULT_ACCENT = 'gray';

interface SaveTokensOptions {
  colorBrand: string;
  colorAccent: string;
  colorFormat?: ColorFormat;
  tokens: any;
  tokensIsFlat?: boolean;
  tokensCSSPrefix?: string;
  tokensJSVariableName?: string;
  fileSingleOutputName?: string;
  fileOutputDir: string;
  fileFormat: 'json' | 'css' | 'less' | 'scss' | 'js' | 'js-css-vars' | 'js-css-vars-fallback';
  removePressedAndHover?: boolean;
}

const TOKENS_OUTPUT = path.join(import.meta.dirname, '..');

for (const accentVariant of ['brand', 'gray']) {
  for (const brandColorKey in DEFAULT_SWATCH.brand) {
    if (accentVariant === 'brand' && (brandColorKey === 'red' || brandColorKey === 'orange')) {
      continue;
    }

    const tokens = {
      light: getColors({
        brand: brandColorKey,
        accent: accentVariant,
        theme: 'light',
      }),
      dark: getColors({
        brand: brandColorKey,
        accent: accentVariant,
        theme: 'dark',
      }),
    };

    const tokensMobile = {
      light: getColors({
        brand: brandColorKey,
        accent: accentVariant,
        theme: 'light',
        format: 'hex-aarrggbb',
      }),
      dark: getColors({
        brand: brandColorKey,
        accent: accentVariant,
        theme: 'dark',
        format: 'hex-aarrggbb',
      }),
    };

    const brandFileName = camelCaseToKebabCase(brandColorKey);

    saveTokens({
      tokens,
      colorBrand: brandFileName,
      colorAccent: accentVariant,
      fileOutputDir: path.join(TOKENS_OUTPUT, 'tokens'),
      fileFormat: 'css',
      tokensCSSPrefix: 'k-color',
    });

    saveTokens({
      tokens: tokensMobile,
      colorBrand: brandFileName,
      colorAccent: accentVariant,
      fileOutputDir: path.join(TOKENS_OUTPUT, 'tokens-mobile'),
      fileFormat: 'json',
      tokensIsFlat: true,
      removePressedAndHover: true,
    });
  }
}

const tokensDefault = {
  light: getColors({
    brand: DEFAULT_BRAND,
    accent: DEFAULT_ACCENT,
    theme: 'light',
  }),
  dark: getColors({
    brand: DEFAULT_BRAND,
    accent: DEFAULT_ACCENT,
    theme: 'dark',
  }),
};

const defaultBrandFileName = camelCaseToKebabCase(DEFAULT_BRAND);

saveTokens({
  tokens: tokensDefault,
  colorBrand: defaultBrandFileName,
  colorAccent: DEFAULT_ACCENT,
  fileOutputDir: '',
  fileFormat: 'scss',
  tokensIsFlat: true,
  tokensCSSPrefix: 'k-color',
  fileSingleOutputName: path.join(TOKENS_OUTPUT, 'colors.scss'),
});

saveTokens({
  tokens: tokensDefault,
  colorBrand: defaultBrandFileName,
  colorAccent: DEFAULT_ACCENT,
  fileOutputDir: '',
  fileFormat: 'less',
  tokensIsFlat: true,
  tokensCSSPrefix: 'k-color',
  fileSingleOutputName: path.join(TOKENS_OUTPUT, 'colors.less'),
});

saveTokens({
  tokens: tokensDefault,
  colorBrand: defaultBrandFileName,
  colorAccent: DEFAULT_ACCENT,
  fileOutputDir: '',
  fileFormat: 'js-css-vars',
  tokensIsFlat: true,
  tokensCSSPrefix: 'k-color',
  fileSingleOutputName: path.join(TOKENS_OUTPUT, 'colors.ts'),
});

saveTokens({
  tokens: { light: tokensDefault.light },
  colorBrand: defaultBrandFileName,
  colorAccent: DEFAULT_ACCENT,
  fileOutputDir: '',
  fileFormat: 'js-css-vars-fallback',
  tokensIsFlat: true,
  tokensCSSPrefix: 'k-color',
  fileSingleOutputName: path.join(TOKENS_OUTPUT, 'default-light.ts'),
});

saveTokens({
  tokens: { dark: tokensDefault.dark },
  colorBrand: defaultBrandFileName,
  colorAccent: DEFAULT_ACCENT,
  fileOutputDir: '',
  fileFormat: 'js-css-vars-fallback',
  tokensIsFlat: true,
  tokensCSSPrefix: 'k-color',
  fileSingleOutputName: path.join(TOKENS_OUTPUT, 'default-dark.ts'),
});

export function saveTokens({
  tokens,
  colorBrand,
  colorAccent,
  tokensIsFlat,
  tokensCSSPrefix,
  tokensJSVariableName,
  fileSingleOutputName,
  fileOutputDir,
  fileFormat,
  removePressedAndHover,
}: SaveTokensOptions): void {
  const isFlat = tokensIsFlat ?? false;
  const cssPrefix = tokensCSSPrefix ?? '';

  const brandFileName = colorBrand;
  const accentVariant = colorAccent;
  const outputDir = fileOutputDir;
  const format = fileFormat;
  const singleOutputFile = fileSingleOutputName;
  const jsVariableName = tokensJSVariableName;

  if (!singleOutputFile) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const baseFileName = `brand-${brandFileName}_accent-${accentVariant.toLowerCase()}`;
  let fileName = baseFileName;

  if (!isFlat && (format === 'json' || format === 'js')) {
    fileName += '.tree';
  }

  const finalOutputFile = singleOutputFile || path.join(outputDir, `${fileName}.${format}`);

  switch (format) {
    case 'json': {
      const tokensToWrite = isFlat ? JSON.parse(JSON.stringify(tokens)) : tokens;

      if (removePressedAndHover) {
        if (tokensToWrite.light) {
          removeStateTokens(tokensToWrite.light);
        }
        if (tokensToWrite.dark) {
          removeStateTokens(tokensToWrite.dark);
        }
      }

      const toCamelCaseFlat = (tokens: any) =>
        Object.entries(flattenHybridCase(tokens)).reduce((acc: any, [key, value]) => {
          acc[kebabCaseToCamelCase(key)] = value;
          return acc;
        }, {});

      const flatLight = toCamelCaseFlat(tokensToWrite.light);
      const flatDark = toCamelCaseFlat(tokensToWrite.dark);

      const themedTokens: any = {};
      const allKeys = new Set([...Object.keys(flatLight), ...Object.keys(flatDark)]);

      // @ts-ignore
      for (const key of allKeys) {
        themedTokens[key] = {
          light: flatLight[key],
          dark: flatDark[key],
        };
      }

      fs.writeFileSync(finalOutputFile, JSON.stringify(themedTokens, null, 2));
      break;
    }

    case 'css': {
      const brandDataSelector = `[data-k-brand="${brandFileName}"][data-k-accent="${accentVariant.toLowerCase()}"]`;
      const baseSelector = brandDataSelector;

      let cssContent = '';

      const hasThemes = tokens.light || tokens.dark;

      if (hasThemes) {
        const lightTokens = tokens.light;
        const flattenedLightTokens = flattenHybridCase(lightTokens);
        const lightVars = Object.entries(flattenedLightTokens)
          .map(([key, value]) => `  --${cssPrefix}-${camelCaseToKebabCase(key)}: ${value};`)
          .join('\n');

        cssContent += `${baseSelector} {\n${lightVars}\n}\n\n`;

        if (tokens.dark) {
          const darkTokens = tokens.dark;
          const flattenedDarkTokens = flattenHybridCase(darkTokens);
          const darkVars = Object.entries(flattenedDarkTokens)
            .map(([key, value]) => `  --${cssPrefix}-${camelCaseToKebabCase(key)}: ${value};`)
            .join('\n');

          const darkSelector = `${baseSelector}[data-k-theme="dark"]`;
          cssContent += `${darkSelector} {\n${darkVars}\n}\n\n`;
        }
      }

      fs.writeFileSync(finalOutputFile, cssContent.trim());
      break;
    }

    case 'less':
    case 'scss': {
      const varPrefix = format === 'less' ? '@color-' : '$color-';

      const lessScssVars: string[] = [];
      const hasThemes = tokens.light || tokens.dark;
      const themeTokens = hasThemes ? tokens.light : tokens;

      if (themeTokens) {
        const flattenedTokens = flattenHybridCase(themeTokens);

        const themeVars = Object.entries(flattenedTokens).map(([key]) => {
          const cssVarName = camelCaseToKebabCase(key);

          return `${varPrefix}${cssVarName}: var(--${cssPrefix}-${cssVarName});`;
        });

        lessScssVars.push(...themeVars);
      }

      const content = lessScssVars.join('\n');

      fs.writeFileSync(finalOutputFile, content.trim() + '\n');
      break;
    }

    case 'js-css-vars': {
      const jsCssVars: string[] = [];
      const hasThemes = tokens.light || tokens.dark;
      const themeTokens = hasThemes ? tokens.light : tokens;

      if (themeTokens) {
        const flattenedTokens = flattenHybridCase(themeTokens);

        const jsVars = Object.entries(flattenedTokens).map(([key]) => {
          const cssVarName = camelCaseToKebabCase(key);
          const jsVarNameCamel = kebabCaseToCamelCase(cssVarName);
          const cssVarReference = `var(--${cssPrefix}-${cssVarName})`;

          return `export const ${jsVarNameCamel} = "${cssVarReference}";`;
        });

        jsCssVars.push(...jsVars);
      }

      const content = jsCssVars.join('\n');

      fs.writeFileSync(finalOutputFile, content.trim() + '\n');
      break;
    }

    case 'js-css-vars-fallback': {
      const jsCssVars: string[] = [];

      const themeKey = tokens.light ? 'light' : 'dark';
      const themeTokens = tokens[themeKey];

      if (themeTokens) {
        const flattenedTokens = flattenHybridCase(themeTokens);

        const jsVars = Object.entries(flattenedTokens).map(([key, value]) => {
          const cssVarName = camelCaseToKebabCase(key);
          const jsVarNameCamel = kebabCaseToCamelCase(cssVarName);

          const cssVarReference = `var(--${cssPrefix}-${cssVarName}, ${value})`;

          return `export const ${jsVarNameCamel} = "${cssVarReference}";`;
        });

        jsCssVars.push(...jsVars);
      }

      const content = jsCssVars.join('\n');
      fs.writeFileSync(finalOutputFile, content.trim() + '\n');
      break;
    }
    case 'js': {
      let jsTokens;

      const toCamelCaseFlat = (tokens: any) =>
        Object.entries(flattenObject(tokens)).reduce((acc: any, [key, value]) => {
          acc[kebabCaseToCamelCase(key)] = value;
          return acc;
        }, {});

      if (isFlat) {
        jsTokens = {
          light: toCamelCaseFlat(tokens.light),
          dark: toCamelCaseFlat(tokens.dark),
        };

        const jsContent: string = `export const ${jsVariableName} = ${JSON.stringify(jsTokens, null, 2)};`;
        fs.writeFileSync(finalOutputFile, jsContent);
      } else {
        jsTokens = tokens;
        let jsContent = `export const ${jsVariableName} = ${JSON.stringify(jsTokens, null, 2)};`;
        jsContent = unquoteJsKeys(jsContent);
        fs.writeFileSync(finalOutputFile, jsContent);
      }
      break;
    }

    default: {
      console.error(`Unsupported format: ${format}`);
      break;
    }
  }
}

function unquoteJsKeys(objString: string): string {
  return objString.replace(/"([^"]+)":/g, '$1:');
}

function removeStateTokens(obj: any): any {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return obj;
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = kebabCaseToCamelCase(key);
      if (camelKey.includes('Pressed') || camelKey.includes('Hover')) {
        delete obj[key];
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        removeStateTokens(obj[key]);
      }
    }
  }
  return obj;
}

function flattenHybridCase(obj: any, prefix = ''): any {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix + (prefix ? '-' : '') + key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenHybridCase(obj[key], newKey));
    } else {
      // @ts-ignore
      acc[newKey] = obj[key];
    }
    return acc;
  }, {});
}

function flattenObject(obj: ColorObject, prefix = ''): { [key: string]: string | ColorValue } {
  let result: { [key: string]: string | ColorValue } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}-${camelCaseToKebabCase(key)}` : key;
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        result = {
          ...result,
          // @ts-ignore
          ...flattenObject(obj[key], newKey),
        };
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}
