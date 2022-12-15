import React from 'react';

import { ThemeContext } from '../theming/ThemeContext';
import { ThemeFactory } from '../theming/ThemeFactory';

export interface MobileStoryWrapper {
  children: React.ReactNode;
}

export const MobileStoryWrapper = ({ children }: MobileStoryWrapper) => {
  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <ThemeContext.Provider
            value={ThemeFactory.create(
              {
                mobileMediaQuery: '(max-width: 576px)',
              },
              theme,
            )}
          >
            {children}
          </ThemeContext.Provider>
        );
      }}
    </ThemeContext.Consumer>
  );
};
