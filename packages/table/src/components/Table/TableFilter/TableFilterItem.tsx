import React, { useContext } from 'react';
import type { SyntheticEvent, FC } from 'react';
import type { MenuItemProps } from '@skbkontur/react-ui/components/MenuItem';
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem';
import type { CommonWrapperRestProps } from '@skbkontur/react-ui/internal/CommonWrapper';
import { CommonWrapper } from '@skbkontur/react-ui/internal/CommonWrapper';

import { SizeTableContext } from '../TableContext.js';
import { TableDataTids } from '../TableDataTids.js';

import styles from './TableFilter.module.css';

export interface TableFilterItemProps extends MenuItemProps {
  children?: React.ReactNode;
}

export const TableFilterItem: FC<TableFilterItemProps> = ({ children, ...rest }) => {
  const { size } = useContext(SizeTableContext);

  return (
    <CommonWrapper {...rest}>
      {(wrapperRest: CommonWrapperRestProps<TableFilterItemProps>) => {
        const { onClick, ...menuItemProps } = wrapperRest;
        const handleClick = (e: SyntheticEvent<HTMLElement, Event>) => {
          e.preventDefault();
          onClick?.(e);
        };

        return (
          <MenuItem
            className={styles.FilterItem}
            {...menuItemProps}
            onClick={handleClick}
            size={size}
            data-tid={TableDataTids.filterItem}
          >
            {children}
          </MenuItem>
        );
      }}
    </CommonWrapper>
  );
};
TableFilterItem.displayName = 'TableFilterItem';
