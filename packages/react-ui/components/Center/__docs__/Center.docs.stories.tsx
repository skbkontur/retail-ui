import { Center, Gapped, Switcher } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Layout/Center',
  component: Center,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Example1: Story = () => {
  const [alignAt, setAlignAt] = React.useState<'left' | 'center' | 'right'>('center');

  return (
    <Gapped vertical gap={12}>
      <Switcher
        items={[
          { label: 'Слева', value: 'left' },
          { label: 'По центру', value: 'center' },
          { label: 'Справа', value: 'right' },
        ]}
        value={alignAt}
        onValueChange={(value) => setAlignAt(value as 'left' | 'center' | 'right')}
      />

      <Center align={alignAt} style={{ background: '#fdd', height: 150 }}>
        <div style={{ background: 'black', width: 30, height: 30 }} />
      </Center>
    </Gapped>
  );
};
Example1.storyName = 'Пример использования';
