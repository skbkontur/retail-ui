import React from 'react';

import type { Story } from '../../../typings/stories';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { ClearCrossIcon } from '../ClearCrossIcon';

export default {
  title: 'ClearCrossIcon',
};

export const ClearCrossIconDefaultColors: Story = () => <ClearCrossIcon data-tid={'clear-cross-icon'} />;

export const ClearCrossIconWithCustomColors: Story = () => {
  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <ThemeContext.Provider
            value={ThemeFactory.create({ clearCrossIconColor: 'red', clearCrossIconHoverColor: 'yellow' }, theme)}
          >
            <ClearCrossIcon data-tid={'clear-cross-icon'} />
          </ThemeContext.Provider>
        );
      }}
    </ThemeContext.Consumer>
  );
};
