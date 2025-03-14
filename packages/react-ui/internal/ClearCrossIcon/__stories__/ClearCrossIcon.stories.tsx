import React from 'react';

import { Story } from '../../../typings/stories';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { ClearCrossIcon } from '../ClearCrossIcon';

export default {
  title: 'CloseButtonIcon',
};

export const ClearCrossIconDefaultColors: Story = () => <ClearCrossIcon />;

export const ClearCrossIconWithCustomColor: Story = () => {
  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <ThemeContext.Provider value={ThemeFactory.create({ clearCrossIconColor: 'red' }, theme)}>
            <ClearCrossIcon />
          </ThemeContext.Provider>
        );
      }}
    </ThemeContext.Consumer>
  );
};
