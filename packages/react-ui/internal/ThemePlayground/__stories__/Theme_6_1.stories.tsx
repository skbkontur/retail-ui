import { IconCheckARegular16 } from '@skbkontur/icons/IconCheckARegular16';
import React from 'react';

import { Button } from '../../../components/Button/Button.js';
import { Gapped } from '../../../components/Gapped/Gapped.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { LIGHT_THEME_6_1 } from '../../../lib/theming/themes/LightTheme.js';
import type { Story, Meta } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'ThemeVersions/6_1',
  decorators: [
    (Story) => (
      <ThemeContext.Provider value={LIGHT_THEME_6_1}>
        <Story />
      </ThemeContext.Provider>
    ),
  ],
};

export default meta;

export const ButtonIcon6_1: Story = () => {
  return (
    <Gapped>
      <Button icon={<IconCheckARegular16 />} size="small" />
      <Button icon={<IconCheckARegular16 />} size="medium" />
      <Button icon={<IconCheckARegular16 />} size="large" />
    </Gapped>
  );
};
ButtonIcon6_1.storyName = 'Button Icon 6.1';
ButtonIcon6_1.parameters = {
  creevey: {
    skip: {
      'no themes': { in: /^(?!\b(chrome2022)\b)/ },
    },
  },
};
