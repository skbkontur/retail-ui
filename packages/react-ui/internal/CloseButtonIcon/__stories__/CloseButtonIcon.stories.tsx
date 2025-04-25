import React from 'react';

import type { CloseButtonIconProps } from '../CloseButtonIcon';
import { CloseButtonIcon } from '../CloseButtonIcon';
import { ComponentTable } from '../../ComponentTable';
import { Gapped } from '../../../components/Gapped';
import type { Story } from '../../../typings/stories';
import { Input } from '../../../components/Input';

export default {
  title: 'CloseButtonIcon',
};

type CloseButtonIconState = Partial<CloseButtonIconProps>;

const sizeStates: CloseButtonIconState[] = [{ size: 16 }, { size: 20 }, { size: 24 }, { size: 30 }];

const sideStates: CloseButtonIconState[] = [{ side: 16 }, { side: 20 }, { side: 24 }, { side: 30 }];

export const Side = () => (
  <ComponentTable
    Component={CloseButtonIcon}
    rows={sideStates.map((props) => ({ props }))}
    cols={sizeStates.map((props) => ({ props }))}
    presetProps={{ style: { background: 'rgba(50, 255, 50, 0.2)' } }}
  />
);

export const VerticalAlign = () => {
  const idle: React.CSSProperties = {};
  const baseline: React.CSSProperties = { display: 'flex', alignItems: 'baseline' };
  const center: React.CSSProperties = { display: 'flex', alignItems: 'center' };
  return (
    <Gapped vertical gap={20}>
      {Object.entries({ idle, baseline, center }).map(([name, style], index) => (
        <div style={style} key={index}>
          {name}
          <CloseButtonIcon size={24} side={24} color="#fff" style={{ backgroundColor: '#000' }} />
          Text
          <CloseButtonIcon side={16} color="#fff" style={{ backgroundColor: '#000' }} />
          Text
          <CloseButtonIcon side={20} color="#fff" style={{ backgroundColor: '#000' }} />
          Text
        </div>
      ))}
    </Gapped>
  );
};

export const Tabbable: Story = () => {
  return (
    <Gapped vertical gap={20} style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        notTabbable
        <Input style={{ width: 30 }} data-tid="notTabbable" />
        <CloseButtonIcon colorHover="#000" side={24} size={24} tabbable={false} />
        <Input style={{ width: 30 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        tabbable
        <Input style={{ width: 30 }} data-tid="tabbable" />
        <CloseButtonIcon colorHover="#000" side={24} size={24} />
        <Input style={{ width: 30 }} />
      </div>
    </Gapped>
  );
};
