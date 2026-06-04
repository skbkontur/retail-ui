import React, { forwardRef } from 'react';
import type { AriaAttributes, HTMLAttributes, PropsWithChildren } from 'react';

import type { headingTokens } from './tokens.js';
import { toCamelCaseWithCapsSize } from './utils/format.js';

import styles from './t.module.css';

export interface HeadingProps
  extends
    Pick<AriaAttributes, 'aria-describedby' | 'aria-label' | 'aria-labelledby'>,
    Pick<HTMLAttributes<HTMLElement>, 'id' | 'role' | 'title' | 'className' | 'style'>,
    PropsWithChildren<{
      /** Стиль заголовка */
      use: keyof typeof headingTokens;
      /** Семантический HTML-тег компонента
       * @default 'div' */
      as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
      /** Начертание шрифта
       * @default regular' */
      weight?: 'regular' | 'medium' | 'bold';
      /** Сброс отступов у HTML-элементов
       * @default true */
      reset?: boolean;
      'data-tid'?: string;
    }> {}

export const Heading = forwardRef<HTMLElement, HeadingProps>((props, ref) => {
  const { as: Component = 'div', className, use, weight, children, reset = true, ...rest } = props;

  const sizeClass = styles[toCamelCaseWithCapsSize(use)];
  const weightClass = weight ? styles[weight] : '';
  const resetClass = reset ? styles.reset : '';

  const combinedClassName = [sizeClass, weightClass, resetClass, className].filter(Boolean).join(' ');

  return (
    <Component ref={ref as React.Ref<any>} className={combinedClassName} {...rest}>
      {children}
    </Component>
  );
});

Heading.displayName = 'Heading';
