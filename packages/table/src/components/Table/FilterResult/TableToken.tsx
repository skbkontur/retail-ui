import { Token } from '@skbkontur/react-ui/components/Token';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import { ThemeFactory } from '@skbkontur/react-ui/lib/theming/ThemeFactory';
import React, { type FC } from 'react';

import { TableDataTids } from '../TableDataTids.js';

export interface TableTokenProps {
  caption: string;
  className?: string;
  onRemove: () => void;
}

export const TableToken: FC<TableTokenProps> = ({ caption, className, onRemove }) => {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <ThemeContext.Provider
          value={ThemeFactory.create(
            {
              tokenPaddingXMedium: '8px',
              tokenBg: theme.bgDefault,
              tokenBgHover: theme.bgDefault,
              tokenBorderWidth: '0',
              tokenBorderRadius: '16px',
              tokenPaddingYSmall: '4px',
              tokenPaddingXSmall: '8px',
            },
            theme
          )}
        >
          <Token className={className} onRemove={onRemove} data-tid={TableDataTids.appliedFilterToken}>
            <span>{caption}</span>
          </Token>
        </ThemeContext.Provider>
      )}
    </ThemeContext.Consumer>
  );
};
TableToken.displayName = 'TableToken';
