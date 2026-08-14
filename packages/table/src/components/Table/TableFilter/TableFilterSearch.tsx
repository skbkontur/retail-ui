import { Input } from '@skbkontur/react-ui/components/Input';
import type { Input as InputType } from '@skbkontur/react-ui/components/Input';
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import { ThemeFactory } from '@skbkontur/react-ui/lib/theming/ThemeFactory';
import React, { useContext, forwardRef } from 'react';

import { CommonWrapper, type CommonProps, type CommonWrapperRestProps } from '../../../reactUiCompat/CommonWrapper.js';
import { SizeTableContext } from '../TableContext.js';
import { TableDataTids } from '../TableDataTids.js';

import styles from './TableFilter.module.css';

export interface TableFilterSearchProps extends CommonProps {
  searchQuery: string;
  handleSearchQuery: (searchQuery: string) => void;
  searchPlaceholder: string;
}

export const TableFilterSearch = forwardRef<InputType, TableFilterSearchProps>(({ ...rest }, ref) => {
  const { size } = useContext(SizeTableContext);
  return (
    <CommonWrapper {...rest}>
      {(wrapperRest: CommonWrapperRestProps<TableFilterSearchProps>) => {
        const { searchQuery, handleSearchQuery, searchPlaceholder = 'Поиск...', ...menuItemProps } = wrapperRest;
        return (
          <ThemeContext.Consumer>
            {(theme) => (
              <ThemeContext.Provider
                value={ThemeFactory.create(
                  {
                    menuItemHoverBg: 'initial',
                  },
                  theme,
                )}
              >
                <MenuItem onClick={(e) => e.preventDefault()} size={size} {...menuItemProps}>
                  <Input
                    ref={ref}
                    size={size}
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => handleSearchQuery(e.target.value)}
                    className={styles.FilterSearch}
                    data-tid={TableDataTids.filterSearch}
                  />
                </MenuItem>
              </ThemeContext.Provider>
            )}
          </ThemeContext.Consumer>
        );
      }}
    </CommonWrapper>
  );
});
TableFilterSearch.displayName = 'TableFilterSearch';
