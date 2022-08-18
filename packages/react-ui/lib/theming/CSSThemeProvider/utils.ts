import kebabCase from 'lodash.kebabcase';

import { Theme } from '../Theme';

import { RuleConfig } from './types';

const ROOT_SELECTOR = ':root';

export function getCSSRule(theme: Theme, config: RuleConfig): string {
  const { kebabify = true, selector = ROOT_SELECTOR } = config;
  let properties = '';

  for (const key in theme) {
    const value = theme[key as keyof Theme];

    if (typeof value === 'string') {
      const property = kebabify ? kebabCase(key) : key;

      properties += `--${property}: ${value};`;
    }
  }

  return `
    ${selector} {
      ${properties}
    }
  `;
}
