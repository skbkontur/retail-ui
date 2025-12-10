import React from 'react';

import type { Story } from '../../../typings/stories.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory.js';
import { ClearCrossIcon } from '../ClearCrossIcon.js';

export default {
  title: 'ClearCrossIcon',
};

export const ClearCrossIconDefaultColors: Story = () => (
  <span style={{ position: 'relative', display: 'inline-block', width: '32px', height: '32px' }}>
    <ClearCrossIcon data-tid={'clear-cross-icon'} />
  </span>
);

export const ClearCrossIconWithCustomColors: Story = () => {
  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <ThemeContext.Provider
            value={ThemeFactory.create({ clearCrossIconColor: 'red', clearCrossIconHoverColor: 'yellow' }, theme)}
          >
            <span style={{ position: 'relative', display: 'inline-block', width: '32px', height: '32px' }}>
              <ClearCrossIcon data-tid={'clear-cross-icon'} />
            </span>
          </ThemeContext.Provider>
        );
      }}
    </ThemeContext.Consumer>
  );
};
