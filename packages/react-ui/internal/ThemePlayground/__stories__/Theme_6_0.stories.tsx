import React from 'react';

import { Calendar } from '../../../components/Calendar/Calendar.js';
import type { Story, Meta } from '../../../typings/stories.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { LIGHT_THEME_6_0 } from '../../../lib/theming/themes/LightTheme.js';

const meta: Meta = {
  title: 'ThemeVersions/6_0',
  decorators: [
    (Story) => (
      <ThemeContext.Provider value={LIGHT_THEME_6_0}>
        <Story />
      </ThemeContext.Provider>
    ),
  ],
  parameters: {
    creevey: {
      skip: {
        'no themes': { in: /^(?!\b(chrome2022)\b)/ },
      },
    },
  },
};

export default meta;

export const Calendar6_0: Story = () => {
  const [date, setDate] = React.useState('12.05.2022');
  return <Calendar value={date} onValueChange={setDate} />;
};
Calendar6_0.storyName = 'Calendar 6.0';
