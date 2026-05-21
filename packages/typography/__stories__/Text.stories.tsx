import React from 'react';

import { Text, type TextProps } from '../Text.js';

import styles from './colors.module.css';

export default {
  title: 'Typography',
};

const header = 'Дизайн для реального мира';

const stylesWrapper = {
  elementStyle: {
    margin: '16px',
  },
};

const getBlockWrapper = (
  name: string,
  component: NonNullable<TextProps['as']>,
  size: TextProps['size'],
  wide?: TextProps['wide'],
  spacing?: TextProps['spacing'],
  weight?: TextProps['weight']
) => (
  <div style={{ ...stylesWrapper.elementStyle }}>
    <div>{name}</div>
    <div style={{ border: '1px solid black' }}>
      <Text as={component} size={size} wide={wide} spacing={spacing} weight={weight}>
        {header}
      </Text>
    </div>
  </div>
);

export const Default = () => (
  <div>
    {getBlockWrapper('p 12px spacer', 'p', 12, false, true)}
    {getBlockWrapper('p 12px spacer wide', 'p', 12, true, true)}

    {getBlockWrapper('p 14px spacer', 'p', 14, false, true)}
    {getBlockWrapper('p 14px spacer wide', 'p', 14, true, true)}

    {getBlockWrapper('p 16px spacer', 'p', 16, false, true)}
    {getBlockWrapper('p 16px spacer wide', 'p', 16, true, true)}

    {getBlockWrapper('p 18px spacer', 'p', 18, false, true)}
    {getBlockWrapper('p 18px spacer wide', 'p', 18, true, true)}

    {getBlockWrapper('p 20px spacer', 'p', 20, false, true)}
    {getBlockWrapper('p 20px spacer wide', 'p', 20, true, true)}

    {getBlockWrapper('p 22px spacer', 'p', 22, false, true)}
    {getBlockWrapper('p 22px spacer wide', 'p', 22, true, true)}

    {getBlockWrapper('p 24px spacer', 'p', 24, false, true)}
    {getBlockWrapper('p 24px spacer wide', 'p', 24, true, true)}

    {getBlockWrapper('p 28px spacer', 'p', 28, false, true, 'bold')}

    {getBlockWrapper('p 32px spacer', 'p', 32, false, true, 'bold')}

    {getBlockWrapper('p 36px spacer', 'p', 36, false, true, 'bold')}

    {getBlockWrapper('p 40px spacer', 'p', 40, false, true, 'bold')}

    {getBlockWrapper('p 48px spacer', 'p', 48, false, true, 'bold')}

    {getBlockWrapper('p 56px spacer', 'p', 56, false, true, 'bold')}

    <hr />

    {getBlockWrapper('p 40px', 'p', 40, false, false, 'bold')}

    {getBlockWrapper('p 48px', 'p', 48, false, false, 'bold')}

    {getBlockWrapper('p 56px', 'p', 56, false, false, 'bold')}
  </div>
);

export const TextWithCustom = () => {
  return (
    <div>
      <div style={{ ...stylesWrapper.elementStyle }}>
        <div>with custom style</div>
        <div style={{ border: '1px solid black' }}>
          <Text as="p" size={16} style={{ color: 'blue' }} spacing>
            {header}
          </Text>
        </div>
      </div>

      <div style={{ ...stylesWrapper.elementStyle }}>
        <div>with custom className</div>
        <div style={{ border: '1px solid black' }}>
          <Text as="p" size={16} className={styles.red} spacing>
            {header}
          </Text>
        </div>
      </div>
    </div>
  );
};

export const TextWithWeight = () => {
  return (
    <div>
      {getBlockWrapper('p 20px', 'p', 16, false, false)}
      {getBlockWrapper('p 48px', 'p', 40, false, false, 'bold')}

      <hr />

      {getBlockWrapper('p 20px regular', 'p', 20, false, true, 'regular')}
      {getBlockWrapper('p 20px medium', 'p', 20, false, true, 'medium')}
      {getBlockWrapper('p 20px bold', 'p', 20, false, true, 'bold')}

      <hr />

      {getBlockWrapper('p 48px regular', 'p', 48, false, true, 'regular')}
    </div>
  );
};
