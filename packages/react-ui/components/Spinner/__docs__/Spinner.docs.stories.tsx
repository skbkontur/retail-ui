import React from 'react';
import { Spinner, Gapped } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Display data/Spinner',
  component: Spinner,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const reactNodeCaption = (
    <div>
      <Spinner type="mini" caption={null} /> <span style={{ color: 'tomato', fontSize: '1.3em' }}>З</span>
      агрузка
    </div>
  );

  return (
    <Gapped>
      <Spinner type="big" caption="big" />
      <Spinner type="normal" caption="normal" />
      <Spinner type="mini" caption="mini" />
      <Spinner type="mini" dimmed caption="mini dimmed" />
      <Spinner type="big" caption={reactNodeCaption} />
      <Spinner type="big" caption="custom" width={8} color={'#538A1B'} />
    </Gapped>
  );
};
Example1.storyName = 'Базовый пример';
