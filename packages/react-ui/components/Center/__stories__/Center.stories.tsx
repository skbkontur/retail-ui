import React from 'react';
import { ComponentStory } from '@storybook/react';

import { Center } from '../Center';
import { Meta } from '../../../typings/stories';

export default {
  title: 'components/Center',
  argTypes: {
    align: { control: 'select', options: ['left', 'center', 'right'] },
  },
  parameters: { creevey: { skip: [true] } },
} as Meta;

const Template: ComponentStory<typeof Center> = (args) => (
  <div style={{ width: 200, height: 200, border: '1px solid #dfdede' }}>
    <Center {...args}>
      <div style={{ width: 30, height: 30, background: '#000' }}></div>
    </Center>
  </div>
);

export const Simple = Template.bind({});
Simple.args = {
  align: 'center',
};
Simple.storyName = 'simple';
