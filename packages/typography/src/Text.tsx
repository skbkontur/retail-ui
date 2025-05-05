import React from 'react';

import styles from '../Text.module.css';

import type { TTextProps } from './types';

export const Text: React.FC<TTextProps> = (props) => {
  const Tag = props.tag;
  const classKey = `t${props.size}${props.wideColumn ? 'Wide' : ''}`;
  return (
    <Tag
      className={`${styles[classKey] || ''} ${props.noSpacing ? styles.noSpacing : ''} ${props.className || ''}`}
      id={props.id}
      style={props.style}
      role={props.role}
      aria-describedby={props['aria-describedby']}
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
      data-tid={props['data-tid']}
    >
      {props.children}
    </Tag>
  );
};
