import * as fs from 'fs';
import * as path from 'path';

import { customizable } from '../lib/consts/default-swatch.js';
import type { ThemeKey } from '../lib/types/tokens.js';

interface Value {
  light: string;
  dark: string;
}

type Input = Record<string, string>;
type Groups = Record<string, Partial<Value>>;
type Output = Record<string, Value>;
type Entries = Array<[string, Value]>;

interface Rule {
  rule: string;
  fn: (data: any) => any;
}

const INPUT_FIGMA_BASE_PATH = path.join(import.meta.dirname, 'figma-tokens-base.json');
const INPUT_FIGMA_SEMANTIC_PATH = path.join(import.meta.dirname, 'figma-tokens.json');
const OUTPUT_TOKENS_PATH = './lib/get-colors-default-tokens.ts';
const TOKENS_BASE_MAP: Record<string, string> = JSON.parse(fs.readFileSync(INPUT_FIGMA_BASE_PATH, 'utf-8'));

export const transformations: Rule[] = [
  {
    rule: 'Filter',
    fn: (inputMap: Input): Input => {
      const MANUAL_PATTERNS: RegExp[] = [];
      const filtered: Input = {};
      for (const [key, value] of Object.entries(inputMap)) {
        if (key.startsWith('Effect/')) {
          continue;
        }
        if (MANUAL_PATTERNS.some((pattern) => pattern.test(value))) {
          continue;
        }
        if (value.includes('rgba(') || value.includes('#')) {
          continue;
        }
        filtered[key] = value;
      }
      return filtered;
    },
  },
  {
    rule: 'Group by Theme',
    fn: (inputMap: Input): Groups => {
      const groups: Groups = {};
      for (const [key, value] of Object.entries(inputMap)) {
        const parts = key.split(' / ');
        const theme = parts.pop()?.toLowerCase() as ThemeKey;
        const baseName = parts.join(' / ');

        if (!theme || !['light', 'dark'].includes(theme)) {
          continue;
        }

        if (!groups[baseName]) {
          groups[baseName] = {};
        }
        groups[baseName][theme] = value;
      }

      for (const baseName in groups) {
        if (!groups[baseName].light || !groups[baseName].dark) {
          delete groups[baseName];
        }
      }
      return groups;
    },
  },
  {
    rule: 'Reorder States',
    fn: (groups: Groups): Groups => {
      const STATE_SUFFIXES = ['Hover', 'Pressed', 'Disabled'];
      const reordered: Groups = {};

      for (const [baseName, values] of Object.entries(groups)) {
        const parts: string[] = baseName.split('/');
        let newParts = [...parts];

        const state = parts.find((p: string) => STATE_SUFFIXES.includes(p));

        if (state) {
          newParts = parts.filter((p: string) => p !== state);
          newParts.push(state);
        }

        reordered[newParts.join('/')] = values;
      }
      return reordered;
    },
  },
  {
    rule: 'Apply Naming',
    fn: (groups: Groups): Output => {
      const output: Output = {};
      for (const [baseName, values] of Object.entries(groups)) {
        const tokenPath = baseName;
        output[slashToCamelCase(tokenPath)] = values as Value;
      }
      return output;
    },
  },
  {
    rule: 'Map to BaseTokens',
    fn: (tokens: Output): Output => {
      const CUSTOMIZABLE_KEYS = Object.keys(customizable);
      const DIRECT_SCALE_BASE_NAMES = ['onbrand', 'gray', 'whitealpha', 'blackalpha'];

      const transformToken = (rawValue: string): string => {
        const parts = rawValue.split('/');
        if (parts.length >= 2) {
          const last = parts[parts.length - 1];
          const path = parts.slice(0, -1);
          const mainPart = path[0];
          const camelMainPart = slashToCamelCase(mainPart);
          let expression: string = CUSTOMIZABLE_KEYS.includes(camelMainPart) ? 'base.customizable' : 'base';

          for (const part of path) {
            const camelPart = slashToCamelCase(part);

            if (part === mainPart && expression === 'base') {
              if (camelPart === 'brand') {
                expression += '.' + camelPart + '.palette?';
                continue;
              } else if (camelPart === 'accent') {
                expression += '.' + camelPart + '?.palette?';
                continue;
              } else if (camelPart === 'onAccent') {
                expression += '.onAccent';
                continue;
              } else if (DIRECT_SCALE_BASE_NAMES.includes(camelPart)) {
                expression += '.' + camelPart;
                continue;
              }
            }

            expression += '.' + camelPart;
          }

          const lastIsNumber = last.match(/^\d+$/);
          if (lastIsNumber) {
            const isIndexAfterOptionalBase = camelMainPart === 'onAccent' && path.length === 1;

            if (isIndexAfterOptionalBase) {
              expression += `?.[${last}]`;
            } else {
              expression += `[${last}]`;
            }
          } else {
            expression += '.' + last.toLowerCase();
          }
          return expression;
        }
        return rawValue;
      };

      const valueToExpression = (value: string): string => {
        let rawValue = value;
        const camelValue = slashToCamelCase(rawValue);

        if (/^Light\//.test(rawValue) || /^Dark\//.test(rawValue)) {
          const brandValue = TOKENS_BASE_MAP[`${rawValue.replace(/'/g, '')} / Brand`];
          const grayValue = TOKENS_BASE_MAP[`${rawValue.replace(/'/g, '')} / Gray`];

          rawValue = `${brandValue.replace('Brand', 'Accent')} || ${grayValue}`;
        }

        return rawValue
          .split(' || ')
          .map((item: string) => {
            if (CUSTOMIZABLE_KEYS.includes(camelValue)) {
              return `base.customizable.${camelValue}`;
            }

            if (item === 'Brand/Normal/0') {
              return 'base.brand.promo';
            }

            if (item === 'Brand/Normal/100') {
              return 'base.brand.original';
            }

            if (item.includes('Semantic Tokens/Light') && item.includes('Logo')) {
              return 'base.brand.logo.light';
            }
            if (item.includes('Semantic Tokens/Dark') && item.includes('Logo')) {
              return 'base.brand.logo.dark';
            }

            if (item.includes('Brand')) {
              if (item.includes('Semantic Tokens/Light') && item.includes('Default')) {
                return 'base.brand.original';
              }

              if (item.includes('Semantic Tokens/Dark') && item.includes('Default')) {
                return 'base.brand.original';
              }

              if (item.includes('Semantic Tokens/Light') && item.includes('Hover')) {
                return 'base.brand.interactions.hover.light';
              }

              if (item.includes('Semantic Tokens/Dark') && item.includes('Hover')) {
                return 'base.brand.interactions.hover.dark';
              }

              if (item.includes('Semantic Tokens/Light') && item.includes('Pressed')) {
                return 'base.brand.interactions.pressed.light';
              }

              if (item.includes('Semantic Tokens/Dark') && item.includes('Pressed')) {
                return 'base.brand.interactions.pressed.dark';
              }
            }

            if (item.includes('Accent')) {
              if (item.includes('Semantic Tokens/Light') && item.includes('Default')) {
                return 'base.accent?.original.light';
              }

              if (item.includes('Semantic Tokens/Dark') && item.includes('Default')) {
                return 'base.accent?.original.dark';
              }

              if (item.includes('Semantic Tokens/Light') && item.includes('Hover')) {
                return 'base.accent?.interactions.hover.light';
              }

              if (item.includes('Semantic Tokens/Dark') && item.includes('Hover')) {
                return 'base.accent?.interactions.hover.dark';
              }

              if (item.includes('Semantic Tokens/Light') && item.includes('Pressed')) {
                return 'base.accent?.interactions.pressed.light';
              }

              if (item.includes('Semantic Tokens/Dark') && item.includes('Pressed')) {
                return 'base.accent?.interactions.pressed.dark';
              }
            }

            return transformToken(item);
          })
          .join(' || ');
      };

      const result: Output = {};
      for (const [key, values] of Object.entries(tokens)) {
        result[key] = {
          light: valueToExpression(values.light),
          dark: valueToExpression(values.dark),
        };
      }
      return result;
    },
  },
  {
    rule: 'Sort Keys',
    fn: (tokens: Output): Entries => {
      const SORT_ORDER = [
        'text',
        'texInverted',
        'textConst',
        'textOnAccent',
        'textOnBrand',
        'shape',
        'shapeInverted',
        'shapeConst',
        'line',
        'lineInverted',
        'lineConst',
        'surface',
        'illustration',
        'customizable',
      ];

      const getSortIndex = (key: string): number => {
        let bestIndex = SORT_ORDER.length;
        let longestMatchLength = 0;

        for (let i = 0; i < SORT_ORDER.length; i++) {
          const prefix = SORT_ORDER[i];
          const index = i;

          if (key.startsWith(prefix)) {
            if (key === prefix) {
              return index;
            }

            if (prefix.length > longestMatchLength) {
              longestMatchLength = prefix.length;
              bestIndex = index;
            }
          }
        }
        return bestIndex;
      };

      return Object.entries(tokens).sort(([keyA], [keyB]) => {
        const indexA = getSortIndex(keyA);
        const indexB = getSortIndex(keyB);

        if (indexA !== indexB) {
          return indexA - indexB;
        }
        return keyA.localeCompare(keyB);
      }) as Entries;
    },
  },
  {
    rule: 'Generate Code',
    fn: (sorted: Entries): string => {
      const generateBody = (theme: ThemeKey) =>
        sorted
          .map(([key, values], i) => `    ${key}: ${values[theme]}${i === sorted.length - 1 ? '' : ','}`)
          .join('\n');

      const lightBody = generateBody('light');
      const darkBody = generateBody('dark');

      return `import type { TokensBase } from './types/tokens-base.js';

export const getColorsDefaultTokens = (base: TokensBase): { light: Record<string, string>; dark: Record<string, string> } => ({
  light: {
${lightBody}
  },
  dark: {
${darkBody}
  }
});
`;
    },
  },
];

try {
  const inputData = JSON.parse(fs.readFileSync(INPUT_FIGMA_SEMANTIC_PATH, 'utf-8')) as Input;
  fs.writeFileSync(OUTPUT_TOKENS_PATH, extractTokensFromFigma(inputData));
} catch (error) {
  console.error('An error occurred during token transformation:', error);
}

export function extractTokensFromFigma(figmaJson: Input): string {
  let currentData: any = figmaJson;
  for (const rule of transformations) {
    currentData = rule.fn(currentData);
  }
  return currentData as string;
}

export function slashToCamelCase(str: string): string {
  let processedStr = str.replace(/onbrand/gi, 'On Brand');
  processedStr = processedStr.replace(/[/-]/g, ' ');
  processedStr = processedStr.replace(/([a-z])([A-Z])/g, '$1 $2');
  const parts = processedStr.split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return '';
  }

  return parts
    .map((part, index) => {
      const lowerPart = part.toLowerCase();

      if (index === 0) {
        return lowerPart;
      }

      return lowerPart.charAt(0).toUpperCase() + lowerPart.slice(1);
    })
    .join('');
}
