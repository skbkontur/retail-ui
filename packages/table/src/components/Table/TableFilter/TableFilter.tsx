import type { Button } from '@skbkontur/react-ui/components/Button/Button';
import { DropdownMenu } from '@skbkontur/react-ui/components/DropdownMenu';
import React, { forwardRef, type ComponentRef, type ReactNode, type ReactElement } from 'react';

import type { SortDirection } from '../../../hooks/useTableSort.js';
import { CommonWrapper, type CommonProps, type CommonWrapperRestProps } from '../../../reactUiCompat/CommonWrapper.js';
import { TableDataTids } from '../TableDataTids.js';
import { TableHeaderButton } from './TableHeaderButton.js';

import styles from './TableFilter.module.css';

export interface TableFilterProps extends CommonProps {
  popup: ReactNode;
  filtered: boolean;
  sortDirection?: SortDirection;
  onOpen?: () => void;
  withoutDefaultIcon?: boolean;
  defaultIcon?: ReactElement;
  iconDefaultColor?: React.CSSProperties['color'];
  iconActiveColor?: React.CSSProperties['color'];
}
export const TableFilter = forwardRef<ComponentRef<typeof Button>, TableFilterProps>(
  ({ children, popup, ...rest }, ref) => (
    <CommonWrapper {...rest}>
      {(wrapperRest: CommonWrapperRestProps<Omit<TableFilterProps, 'popup'>>) => {
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
  ),
);
TableFilter.displayName = 'TableFilter';
