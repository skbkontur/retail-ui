import React, { forwardRef } from 'react';

import type { TTextProps } from './types.js';

import styles from '../Text.module.css';

export const Text = forwardRef<HTMLElement, TTextProps>((props, ref) => {
  const { tag: Tag, className, spacing, size, wideColumn, children, ...rest } = props;

  const classKey = `t${size}${wideColumn ? 'Wide' : ''}`;

  return (
    <Tag
      ref={ref as React.Ref<any>}
      className={`${styles[classKey] || ''} ${spacing ? styles.tSpacing : ''} ${className || ''}`}
      {...rest}
    >
      {children}
    </Tag>
  );
});

Text.displayName = 'Text';
