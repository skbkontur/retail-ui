import React from 'react';

import type { Story, Meta } from '../../../typings/stories';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { LIGHT_THEME_5_0 } from '../../../lib/theming/themes/LightTheme';
import { Switcher } from '../../../components/Switcher';

export default {
  title: 'ThemeVersions/5_0',
  decorators: [
    (Story) => (
      <ThemeContext.Provider value={LIGHT_THEME_5_0}>
        <Story />
      </ThemeContext.Provider>
    ),
  ],
  parameters: {
    creevey: {
      captureElement: 'body',
      skip: {
        'no themes': { in: /^(?!\b(chrome2022)\b)/ },
      },
    },
  },
} as Meta;

export const Switcher5_0: Story = () => {
  return <Switcher error items={['One', 'Two', 'Three']} caption={'Label for Switcher'} />;
};
Switcher5_0.storyName = 'Switcher 5.0';
Switcher5_0.parameters = {
  creevey: {
    captureElement: '#test-element',
  },
};
