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
  weight?: TextProps['weight']
) => (
  <div style={{ ...stylesWrapper.elementStyle }}>
    <div>{name}</div>
    <div style={{ border: '1px solid black' }}>
      <Text as={component} size={size} wide={wide} weight={weight}>
        {header}
      </Text>
    </div>
  </div>
);

export const Default = () => (
  <div>
    {getBlockWrapper('p 12px', 'p', 12, false)}
    {getBlockWrapper('p 12px wide', 'p', 12, true)}

    {getBlockWrapper('p 14px', 'p', 14, false)}
    {getBlockWrapper('p 14px wide', 'p', 14, true)}

    {getBlockWrapper('p 16px', 'p', 16, false)}
    {getBlockWrapper('p 16px wide', 'p', 16, true)}

    {getBlockWrapper('p 18px', 'p', 18, false)}
    {getBlockWrapper('p 18px wide', 'p', 18, true)}

    {getBlockWrapper('p 20px', 'p', 20, false)}
    {getBlockWrapper('p 20px wide', 'p', 20, true)}

    {getBlockWrapper('p 22px', 'p', 22, false)}
    {getBlockWrapper('p 22px wide', 'p', 22, true)}

    {getBlockWrapper('p 24px', 'p', 24, false)}
    {getBlockWrapper('p 24px wide', 'p', 24, true)}

    {getBlockWrapper('p 28px', 'p', 28, false, 'bold')}

    {getBlockWrapper('p 32px', 'p', 32, false, 'bold')}

    {getBlockWrapper('p 36px', 'p', 36, false, 'bold')}

    {getBlockWrapper('p 40px', 'p', 40, false, 'bold')}

    {getBlockWrapper('p 48px', 'p', 48, false, 'bold')}

    {getBlockWrapper('p 56px', 'p', 56, false, 'bold')}

    <hr />

    {getBlockWrapper('p 40px', 'p', 40, false, 'bold')}

    {getBlockWrapper('p 48px', 'p', 48, false, 'bold')}

    {getBlockWrapper('p 56px', 'p', 56, false, 'bold')}
  </div>
);

export const TextWithCustom = () => {
  return (
    <div>
      <div style={{ ...stylesWrapper.elementStyle }}>
        <div>with custom style</div>
        <div style={{ border: '1px solid black' }}>
          <Text as="p" size={16} style={{ color: 'blue' }}>
            {header}
          </Text>
        </div>
      </div>

      <div style={{ ...stylesWrapper.elementStyle }}>
        <div>with custom className</div>
        <div style={{ border: '1px solid black' }}>
          <Text as="p" size={16} className={styles.red}>
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
      {getBlockWrapper('p 20px', 'p', 16, false)}
      {getBlockWrapper('p 48px', 'p', 40, false, 'bold')}

      <hr />

      {getBlockWrapper('p 20px regular', 'p', 20, false, 'regular')}
      {getBlockWrapper('p 20px medium', 'p', 20, false, 'medium')}
      {getBlockWrapper('p 20px bold', 'p', 20, false, 'bold')}

      <hr />

      {getBlockWrapper('p 48px regular', 'p', 48, false, 'regular')}
    </div>
  );
};
