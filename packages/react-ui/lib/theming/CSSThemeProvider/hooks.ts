import { useRef, useLayoutEffect } from 'react';

import { Theme } from '../Theme';

import { RuleConfig } from './types';
import { getCSSRule } from './utils';

let count = 0;

export function useDefaultId() {
  const numberRef = useRef<number>();

  if (numberRef.current === undefined) {
    count += 1;
    numberRef.current = count;
  }

  return `theme-${numberRef.current}`;
}

export function useCSSRule(theme: Theme, config: RuleConfig = {}): void {
  const { kebabify, selector } = config;

  useLayoutEffect(() => {
    const $style = document.createElement('style');
    const rule = getCSSRule(theme, {
      kebabify,
      selector,
    });

    document.head.appendChild($style);
    $style.sheet?.insertRule(rule, 0);

    return () => {
      $style.remove();
    };
  }, [theme, kebabify, selector]);
}
