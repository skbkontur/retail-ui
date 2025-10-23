import React from 'react';

import type { Story, Meta } from '../../../typings/stories';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { LIGHT_THEME_5_3 } from '../../../lib/theming/themes/LightTheme';
import { Tooltip } from '../../../components/Tooltip';
import { ComboboxWithClearCross } from '../../../components/ComboBox/__stories__/Combobox.stories';
import { ClearCrossSizes } from '../../../components/Input/__stories__/Input.stories';
import { Textarea } from '../../../components/Textarea';

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

export const ComboboxWithClearCross5_3: Story = () => (
  <div data-tid="theme_5_3_root">
    <ComboboxWithClearCross />
  </div>
);
ComboboxWithClearCross5_3.parameters = { creevey: { captureElement: '[data-tid="theme_5_3_root"]' } };

export const InputClearCrossSizes5_3: Story = () => (
  <div data-tid="theme_5_3_root">
    <ClearCrossSizes />
  </div>
);
InputClearCrossSizes5_3.parameters = { creevey: { captureElement: '[data-tid="theme_5_3_root"]' } };

export const Textarea5_3: Story = () => (
  <div data-tid="theme_5_3_root">
    <Textarea />
  </div>
);
Textarea5_3.parameters = { creevey: { captureElement: '[data-tid="theme_5_3_root"]' } };
