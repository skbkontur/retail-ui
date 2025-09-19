import React from 'react';

import type { Story, Meta } from '../../../typings/stories';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { LIGHT_THEME_5_3 } from '../../../lib/theming/themes/LightTheme';
import { Tooltip } from '../../../components/Tooltip';

export default {
  title: 'ThemeVersions/5_3',
  decorators: [
    (Story) => (
      <ThemeContext.Provider value={LIGHT_THEME_5_3}>
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

export const TooltipDefaultPosition5_3: Story = () => (
  <Tooltip render={() => <div style={{ width: 100 }}>Tooltip with default position</div>} trigger="opened">
    <div style={{ position: 'absolute', left: 200, top: 200 }}>Anchor</div>
  </Tooltip>
);
TooltipDefaultPosition5_3.storyName = 'Tooltip default position in 5.3';
