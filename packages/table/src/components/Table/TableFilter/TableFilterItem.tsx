import type { MenuItemProps } from '@skbkontur/react-ui/components/MenuItem';
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem';
import React, { useContext } from 'react';
import type { SyntheticEvent, FC } from 'react';

import { CommonWrapper, type CommonWrapperRestProps } from '../../../reactUiCompat/CommonWrapper.js';
import { SizeTableContext } from '../TableContext.js';
import { TableDataTids } from '../TableDataTids.js';

import styles from './TableFilter.module.css';

export interface TableFilterItemProps extends MenuItemProps {
  children?: React.ReactNode;
}

export const TableFilterItem: FC<TableFilterItemProps> = ({ children, ...rest }) => {
  const { size: contextSize } = useContext(SizeTableContext);

  return (
    <CommonWrapper {...rest}>
      {(wrapperRest: CommonWrapperRestProps<TableFilterItemProps>) => {
        const { onClick, size, ...menuItemProps } = wrapperRest;
        const resolvedSize = size ?? contextSize;
        const handleClick = (e: SyntheticEvent<HTMLElement, Event>) => {
          e.preventDefault();
          onClick?.(e);
        };

        return (
          <MenuItem
            className={styles.FilterItem}
            {...menuItemProps}
            onClick={handleClick}
            size={resolvedSize}
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
