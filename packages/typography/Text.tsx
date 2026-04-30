import React, { forwardRef } from 'react';
import type { AriaAttributes, HTMLAttributes, PropsWithChildren } from 'react';

import type { tokens } from './tokens.js';

import styles from './Text.module.css';

export interface TextProps
  extends
    Pick<AriaAttributes, 'aria-describedby' | 'aria-label' | 'aria-labelledby'>,
    Pick<HTMLAttributes<HTMLElement>, 'id' | 'role' | 'title' | 'className' | 'style'>,
    PropsWithChildren<{
      /**
       * Размер шрифта
       */
      size: keyof typeof tokens;
      /**
       * HTML-тег
       * @default span
       */
      as?:
        | 'span'
        | 'div'
        | 'p'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'label'
        | 'time'
        | 'data'
        | 'abbr'
        | 'cite'
        | 'small'
        | 'mark'
        | 'code'
        | 'address';
      /**
       * Включить внешние отступы
       * @default false
       */
      spacing?: boolean;
      /**
       * Широкая колонка — от 40 символов в строке
       * @default false
       */
      wide?: boolean;
      'data-tid'?: string;
    }> {}

export const Text = forwardRef<HTMLElement, TextProps>((props, ref) => {
  const { as: Component = 'span', className, spacing, size, wide, children, ...rest } = props;

  const combinedClassName = [styles[`t${size}`], wide && styles.tWide, spacing && styles.tSpacing, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component ref={ref as React.Ref<any>} className={combinedClassName} {...rest}>
      {children}
    </Component>
  );
});

Text.displayName = 'Text';
