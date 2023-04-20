import React from 'react';

import { CloseButtonIcon, CloseButtonIconProps } from '../CloseButtonIcon';
import { ComponentTable } from '../../ComponentTable';
import { Gapped } from '../../../components/Gapped';

export default {
  title: 'CloseButtonIcon',
  parameters: {
    creevey: { skip: { 'only available in theme2022': { in: /^(?!\b.*2022.*\b)/ } } },
  },
};

type CloseButtonIconState = Partial<CloseButtonIconProps>;

const sizeStates: CloseButtonIconState[] = [{ size: 16 }, { size: 20 }, { size: 24 }];

const sideStates: CloseButtonIconState[] = [{ side: 16 }, { side: 20 }, { side: 24 }];

export const Side = () => (
  <ComponentTable
    Component={CloseButtonIcon}
    rows={sideStates.map((props) => ({ props }))}
    cols={sizeStates.map((props) => ({ props }))}
    presetProps={{ style: { background: 'rgba(50, 255, 50, 0.2)' } }}
  />
);

export const VerticalAlign = () => {
  const baseline: React.CSSProperties = { display: 'flex', alignItems: 'baseline' };
  const center: React.CSSProperties = { display: 'flex', alignItems: 'center' };
  return (
    <Gapped vertical gap={20}>
      {[baseline, center].map((style, index) => (
        <div style={style} key={index}>
          Text
          <CloseButtonIcon size={24} side={24} />
          Text
          <CloseButtonIcon side={16} />
          Text
          <CloseButtonIcon side={20} />
          Text
        </div>
      ))}
    </Gapped>
  );
};
