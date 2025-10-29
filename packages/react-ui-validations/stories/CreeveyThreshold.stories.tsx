import React from 'react';
import { Gapped } from '@skbkontur/react-ui/components/Gapped';
import type { Meta } from '@storybook/react';

export default {
  title: 'Creevey',
} as Meta;

export const CreeveyThreshold = () => {
  // NOTE: original gradient is rgba(43, 43, 43, 1) 50%, but with threshold 0.005 it is equal to rgba(44, 44, 44, 1) 50%
  const gradient = `linear-gradient(0deg,rgba(0, 0, 0, 1) 0%,rgba(44, 44, 44, 1) 50%,rgba(255, 255, 255, 1) 100%)`;

  const getGradientElement = (size: number) => {
    return <div style={{ height: size, width: size, background: gradient }} />;
  };

  return (
    <Gapped vertical>
      {getGradientElement(50)}
      {getGradientElement(100)}
      {getGradientElement(200)}
      {getGradientElement(300)}
    </Gapped>
  );
};

CreeveyThreshold.storyName = 'creevey threshold';
