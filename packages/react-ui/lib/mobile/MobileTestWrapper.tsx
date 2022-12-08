import React from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';

export interface MobileTestWrapper {
  children: React.ReactNode;
}

export const MobileTestWrapper = ({ children }: MobileTestWrapper) => {
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
