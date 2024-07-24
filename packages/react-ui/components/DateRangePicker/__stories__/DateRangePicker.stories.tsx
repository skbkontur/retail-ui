import React, { useState } from 'react';
import { Story } from '@storybook/react';

import { Meta } from '../../../typings/stories';
import { DateRangePicker } from '../DateRangePicker';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { THEME_2022 } from '../../../lib/theming/themes/Theme2022';

export default {
  title: 'DateRangePicker',
} as Meta;

export const Component = () => {
  return (
    <DateRangePicker />
  );
};

export const WithMouseeventHandlers: Story = () => {
  const [date, setDate] = useState('02.07.2017');

  return (
    <DateRangePicker
      width={200}
      value={date}
      onMouseEnter={() => console.count('enter')}
      onMouseLeave={() => console.count('leave')}
      onValueChange={setDate}
    />
  );
};
WithMouseeventHandlers.storyName = 'with mouseevent handlers';

export const MobilePicker: Story = () => {
  const [date, setDate] = useState('02.07.2017');

  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <ThemeContext.Provider value={ThemeFactory.create(theme, THEME_2022)}>
            <DateRangePicker enableTodayLink width="auto" value={date} onValueChange={setDate} />
          </ThemeContext.Provider>
        );
      }}
    </ThemeContext.Consumer>
  );
};
MobilePicker.storyName = 'MobilePicker';
MobilePicker.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};

Component.storyName = 'Default';
