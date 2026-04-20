import * as fs from 'fs';
import * as path from 'path';

import * as DEFAULT_SWATCH from '../lib/consts/default-swatch.js';
import type { ConfigOptions } from '../lib/get-colors-base.js';
import { getColors } from '../lib/get-colors.js';
import type { ColorObject, ColorValue } from '../lib/types/tokens.js';
import { flattenHybridCase } from '../lib/utils/create-styles.js';
import { camelCaseToKebabCase, kebabCaseToCamelCase } from '../lib/utils/format-variable.js';

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
  fileFormat:
    | 'json'
    | 'json-snapshot'
    | 'json-base-snapshot'
    | 'css'
    | 'less'
    | 'scss'
    | 'less-fallback'
    | 'scss-fallback'
    | 'js'
    | 'js-css-vars'
    | 'js-css-vars-fallback';
  removePressedAndHover?: boolean;
}

const TOKENS_OUTPUT = path.join(import.meta.dirname, '..');
const DEFAULT_FOLDER = path.join(TOKENS_OUTPUT, 'tokens-default');

if (!fs.existsSync(DEFAULT_FOLDER)) {
  fs.mkdirSync(DEFAULT_FOLDER, { recursive: true });
}

for (const accentVariant of ['brand', 'gray']) {
  for (const brandColorKey in DEFAULT_SWATCH.brand) {
    if (accentVariant === 'brand' && (brandColorKey === 'red' || brandColorKey === 'orange')) {
      continue;
    }

    const cssContent = [
      getColors({
        brand: brandColorKey,
        accent: accentVariant,
        theme: 'light',
        output: 'css',
      }),
      getColors({
        brand: brandColorKey,
        accent: accentVariant,
        theme: 'dark',
        output: 'css',
      }),
    ].join('\n\n');

    const brandFileName = camelCaseToKebabCase(brandColorKey);

    saveTokens({
      tokens: cssContent,
      colorBrand: brandFileName,
      colorAccent: accentVariant,
      fileOutputDir: path.join(TOKENS_OUTPUT, 'tokens'),
      fileFormat: 'css',
    });

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

// Оригинальные файлы в корне
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
  fileSingleOutputName: path.join(TOKENS_OUTPUT, 'index.ts'),
});

const defaultThemes = [
  { name: 'light', data: tokensDefault.light },
  { name: 'dark', data: tokensDefault.dark },
];

defaultThemes.forEach((theme) => {
  const payload = { [theme.name]: theme.data };

  saveTokens({
    tokens: payload,
    colorBrand: defaultBrandFileName,
    colorAccent: DEFAULT_ACCENT,
    fileOutputDir: '',
    fileFormat: 'js-css-vars-fallback',
    tokensIsFlat: true,
    tokensCSSPrefix: 'k-color',
    fileSingleOutputName: path.join(DEFAULT_FOLDER, `${theme.name}.ts`),
  });

  saveTokens({
    tokens: payload,
    colorBrand: defaultBrandFileName,
    colorAccent: DEFAULT_ACCENT,
    fileOutputDir: '',
    fileFormat: 'scss-fallback',
    tokensIsFlat: true,
    tokensCSSPrefix: 'k-color',
    fileSingleOutputName: path.join(DEFAULT_FOLDER, `${theme.name}.scss`),
  });

  saveTokens({
    tokens: payload,
    colorBrand: defaultBrandFileName,
    colorAccent: DEFAULT_ACCENT,
    fileOutputDir: '',
    fileFormat: 'less-fallback',
    tokensIsFlat: true,
    tokensCSSPrefix: 'k-color',
    fileSingleOutputName: path.join(DEFAULT_FOLDER, `${theme.name}.less`),
  });
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

    case 'json-snapshot': {
      const toCamelCaseFlat = (obj: any) =>
        Object.entries(flattenHybridCase(obj)).reduce((acc: any, [key, value]) => {
          acc[kebabCaseToCamelCase(key)] = value;
          return acc;
        }, {});

      const lightHex = toCamelCaseFlat(tokens.light.hex);
      const lightOklch = toCamelCaseFlat(tokens.light.oklch);
      const darkHex = toCamelCaseFlat(tokens.dark.hex);
      const darkOklch = toCamelCaseFlat(tokens.dark.oklch);

      const result: any = {};
      const allKeys = new Set([...Object.keys(lightHex), ...Object.keys(darkHex)]);

      allKeys.forEach((key) => {
        result[key] = {
          light: {
            oklch: lightOklch[key],
            hex: lightHex[key],
          },
          dark: {
            oklch: darkOklch[key],
            hex: darkHex[key],
          },
        };
      });

      fs.writeFileSync(finalOutputFile, JSON.stringify(result, null, 2));
      break;
    }

    case 'json-base-snapshot': {
      const flatHex = flattenObject(tokens.hex);
      const flatOklch = flattenObject(tokens.oklch);

      const result: any = {};
      Object.keys(flatHex).forEach((key) => {
        result[kebabCaseToCamelCase(key)] = {
          oklch: flatOklch[key],
          hex: flatHex[key],
        };
      });

      fs.writeFileSync(finalOutputFile, JSON.stringify(result, null, 2));
      break;
    }

    case 'css': {
      fs.writeFileSync(finalOutputFile, typeof tokens === 'string' ? tokens.trim() : '');
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

    case 'less-fallback':
    case 'scss-fallback': {
      const varPrefix = format === 'less-fallback' ? '@color-' : '$color-';
      const themeKey = tokens.dark ? 'dark' : 'light';
      const themeTokens = themeKey ? tokens[themeKey] : tokens;

      if (themeTokens) {
        const flattenedTokens = flattenHybridCase(themeTokens);
        const content = Object.entries(flattenedTokens)
          .map(([key, value]) => {
            const cssVarName = camelCaseToKebabCase(key);
            return `${varPrefix}${cssVarName}: var(--${cssPrefix}-${cssVarName}, ${value});`;
          })
          .join('\n');
        fs.writeFileSync(finalOutputFile, content.trim() + '\n');
      }
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
