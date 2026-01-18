import React, { forwardRef, type ComponentRef, type ReactNode, type ReactElement } from 'react';
import { DropdownMenu } from '@skbkontur/react-ui/components/DropdownMenu';
import type { Button } from '@skbkontur/react-ui/components/Button/Button';
import type { CommonProps, CommonWrapperRestProps } from '@skbkontur/react-ui/internal/CommonWrapper';
import { CommonWrapper } from '@skbkontur/react-ui/internal/CommonWrapper';

import { TableDataTids } from '../TableDataTids.js';
import type { SortDirection } from '../../../hooks/useTableSort.js';

import { TableHeaderButton } from './TableHeaderButton.js';
import styles from './TableFilter.module.css';

export interface TableFilterProps extends CommonProps {
  popup: ReactNode;
  filtered: boolean;
  sortDirection?: SortDirection;
  onOpen?: () => void;
  withoutDefaultIcon?: boolean;
  defaultIcon?: ReactElement;
  iconDefaultColor?: string;
  iconActiveColor?: string;
}
export const TableFilter = forwardRef<ComponentRef<typeof Button>, TableFilterProps>(
  ({ children, popup, ...rest }, ref) => (
    <CommonWrapper {...rest}>
      {(wrapperRest: CommonWrapperRestProps<TableFilterProps>) => {
        const {
          filtered,
          sortDirection,
          onOpen,
          withoutDefaultIcon,
          defaultIcon,
          iconDefaultColor,
          iconActiveColor,
          ...dropdownProps
        } = wrapperRest;
        return (
          <DropdownMenu
            caption={({ openMenu, opened }) => (
              <TableHeaderButton
                ref={ref}
                onClick={() => openMenu()}
                className={styles.ClickableHeader}
                filtered={filtered}
                sortDirection={sortDirection}
                hovered={opened}
                withoutDefaultIcon={withoutDefaultIcon}
                defaultIcon={defaultIcon}
                iconDefaultColor={iconDefaultColor}
                iconActiveColor={iconActiveColor}
              >
                {children}
              </TableHeaderButton>
            )}
            data-tid={TableDataTids.filter}
            onOpen={onOpen}
            {...dropdownProps}
          >
            {popup}
          </DropdownMenu>
        );
      }}
    </CommonWrapper>
  )
);
TableFilter.displayName = 'TableFilter';
