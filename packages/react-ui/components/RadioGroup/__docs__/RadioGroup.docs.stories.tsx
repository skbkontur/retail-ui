import React from 'react';
import { RadioGroup, Gapped, Radio } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/RadioGroup',
  component: RadioGroup,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const items = ['One', 'Two', 'Three', 'Four'];

  const simpleRadioGroup = (
    <div>
      <h5>Numbers</h5>
      <RadioGroup name="number-simple" items={items} defaultValue="One" />
    </div>
  );

  const complexRadioGroup = (
    <div>
      <h5>Numbers</h5>
      <RadioGroup name="number-complex" defaultValue="3">
        <Gapped gap={40}>
          <Gapped vertical gap={0}>
            <b>Odd</b>
            <Radio value="1">One</Radio>
            <Radio value="3">Three</Radio>
            <Radio value="5" disabled>
              Five
            </Radio>
            <Radio value="7">Seven</Radio>
          </Gapped>
          <Gapped vertical gap={0}>
            <b>Even</b>
            <Radio value="2">Two</Radio>
            <Radio value="4">Four</Radio>
            <Radio value="6">Six</Radio>
            <Radio value="8">Eight</Radio>
          </Gapped>
        </Gapped>
      </RadioGroup>
    </div>
  );

  return (
    <div>
      {simpleRadioGroup}
      {complexRadioGroup}
    </div>
  );
};
Example1.storyName = 'Базовый пример';
