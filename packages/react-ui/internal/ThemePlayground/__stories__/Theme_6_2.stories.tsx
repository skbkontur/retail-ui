import React from 'react';

import { TokenInput } from '../../../components/TokenInput/TokenInput.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { LIGHT_THEME_6_2 } from '../../../lib/theming/themes/LightTheme.js';
import type { Story, Meta } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'ThemeVersions/6_2',
  decorators: [
    (Story) => (
      <ThemeContext.Provider value={LIGHT_THEME_6_2}>
        <Story />
      </ThemeContext.Provider>
    ),
  ],
};

export default meta;

const getItems = async (query: string) => {
  return ['aaa', 'bbb'].filter((s) => s.includes(query));
};

export const TokenInputMenuOffset6_2: Story = () => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  return (
    <TokenInput menuAlign="left" getItems={getItems} selectedItems={selectedItems} onValueChange={setSelectedItems} />
  );
};
TokenInputMenuOffset6_2.storyName = 'TokenInput menu offset 6.2';
