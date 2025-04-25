import React from 'react';
import { Center, Switcher, Gapped } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Layout/Center',
  component: Center,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const [alignAt, setAlignAt] = React.useState('center');

  return (
    <Gapped vertical gap="12px">
      <Switcher
        items={[
          { label: 'Слева', value: 'left' },
          { label: 'По центру', value: 'center' },
          { label: 'Справа', value: 'right' },
        ]}
        value={alignAt}
        onValueChange={setAlignAt}
      />

      <Center align={alignAt} style={{ background: '#fdd', height: 150 }}>
        <div style={{ background: 'black', width: 30, height: 30 }} />
      </Center>
    </Gapped>
  );
};
Example1.storyName = 'Пример использования';
