import React from 'react';

import { Gapped } from '../../../components/Gapped/Gapped.js';
import { Radio } from '../../../components/Radio/Radio.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { LIGHT_THEME_6_3 } from '../../../lib/theming/themes/LightTheme.js';
import type { Story, Meta } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'ThemeVersions/6_3',
  decorators: [
    (Story) => (
      <ThemeContext.Provider value={LIGHT_THEME_6_3}>
        <Story />
      </ThemeContext.Provider>
    ),
  ],
};

export default meta;

const states = ['', 'focused', 'error', 'warning', 'disabled'] as const;

export const RadioChecked6_3: Story = () => {
  return (
    <Gapped gap={0} vertical>
      <Gapped gap={24} verticalAlign="top">
        {states.map((state) => (
          <Radio key={`small-${state || 'default'}`} checked size="small" value="value" {...{ [state]: true }} />
        ))}
      </Gapped>
      <Gapped gap={24} verticalAlign="top">
        {states.map((state) => (
          <Radio key={`medium-${state || 'default'}`} checked size="medium" value="value" {...{ [state]: true }} />
        ))}
      </Gapped>
      <Gapped gap={24} verticalAlign="top">
        {states.map((state) => (
          <Radio key={`large-${state || 'default'}`} checked size="large" value="value" {...{ [state]: true }} />
        ))}
      </Gapped>
    </Gapped>
  );
};
RadioChecked6_3.storyName = 'Radio checked 6.3';
RadioChecked6_3.parameters = {
  creevey: {
    skip: {
      'no themes': { in: /^(?!\b(chrome2022)\b)/ },
    },
  },
};
