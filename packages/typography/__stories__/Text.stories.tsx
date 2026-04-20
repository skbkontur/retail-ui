import React from 'react';

import { Text } from '../src/Text';
import { TTextSizes, TTextTags } from '../src/types';

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
  component: TTextTags,
  size: TTextSizes,
  wideColumn?: boolean,
  noSpacing?: boolean
) => (
  <div style={{ ...stylesWrapper.elementStyle }}>
    <div>{name}</div>
    <div style={{ border: '1px solid black' }}>
      <Text tag={component} size={size} wideColumn={wideColumn} noSpacing={noSpacing}>
        {header}
      </Text>
    </div>
  </div>
);

export const Default = () => (
  <div>
    {getBlockWrapper(`p 12px`, 'p', 12, false)}
    {getBlockWrapper(`p 12px wideColumn`, 'p', 12, true)}

    {getBlockWrapper(`p 14px`, 'p', 14, false)}
    {getBlockWrapper(`p 14px wideColumn`, 'p', 14, true)}

    {getBlockWrapper(`p 16px`, 'p', 16, false)}
    {getBlockWrapper(`p 16px wideColumn`, 'p', 16, true)}

    {getBlockWrapper(`p 18px`, 'p', 18, false)}
    {getBlockWrapper(`p 18px wideColumn`, 'p', 18, true)}

    {getBlockWrapper(`p 20px`, 'p', 20, false)}
    {getBlockWrapper(`p 20px wideColumn`, 'p', 20, true)}

    {getBlockWrapper(`p 22px`, 'p', 22, false)}
    {getBlockWrapper(`p 22px wideColumn`, 'p', 22, true)}

    {getBlockWrapper(`p 24px`, 'p', 24, false)}
    {getBlockWrapper(`p 24px wideColumn`, 'p', 24, true)}

    {getBlockWrapper(`p 28px`, 'p', 28, false)}

    {getBlockWrapper(`p 32px`, 'p', 32, false)}

    {getBlockWrapper(`p 36px`, 'p', 36, false)}

    {getBlockWrapper(`p 40px`, 'p', 40, false)}

    {getBlockWrapper(`p 48px`, 'p', 48, false)}

    {getBlockWrapper(`p 56px`, 'p', 56, false)}

    <hr />

    {getBlockWrapper(`p 56px`, 'p', 56, false, true)}

    {getBlockWrapper(`p 48px`, 'p', 48, false, true)}

    {getBlockWrapper(`p 40px`, 'p', 40, false, true)}
  </div>
);

export const TextWithCustom = () => {
  return (
    <div>
      <div style={{ ...stylesWrapper.elementStyle }}>
        <div>with custom style</div>
        <div style={{ border: '1px solid black' }}>
          <Text tag="p" size={16} style={{ color: 'blue' }}>
            {header}
          </Text>
        </div>
      </div>

      <div style={{ ...stylesWrapper.elementStyle }}>
        <div>with custom className</div>
        <div style={{ border: '1px solid black' }}>
          <Text tag="p" size={16} className={styles.red}>
            {header}
          </Text>
        </div>
      </div>
    </div>
  );
};
