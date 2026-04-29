import React, { forwardRef } from 'react';

import type { TTextProps } from './types.js';

import styles from '../Text.module.css';

export const Text = forwardRef<HTMLElement, TTextProps>((props, ref) => {
  const { as: Component = 'span', className, spacing, size, wide, children, ...rest } = props;

  const classKey = `t${size}${wide ? 'Wide' : ''}`;

  return (
    <Component
      ref={ref as React.Ref<any>}
      className={`${styles[classKey] || ''} ${spacing ? styles.tSpacing : ''} ${className || ''}`}
      {...rest}
    >
      {children}
    </Component>
  );
});

Text.displayName = 'Text';
