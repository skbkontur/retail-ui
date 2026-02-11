import React, {
  useContext,
  useCallback,
  type ReactNode,
  type FC,
  forwardRef,
  type MutableRefObject,
  type CSSProperties,
} from 'react';
import cx from 'classnames';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import { isDarkTheme } from '@skbkontur/react-ui/lib/theming/ThemeHelpers';
import type { CommonProps } from '@skbkontur/react-ui/internal/CommonWrapper';
import { CommonWrapper } from '@skbkontur/react-ui/internal/CommonWrapper';

import type { SizeProp } from '../../reactUiCompat/useSizeContext.js';
import { TableLightTheme } from '../../../internal/themes/TableLightTheme.js';
import { getTableTheme } from '../../../lib/theming/ThemeHelpers.js';
import { useSizeContextCompat } from '../../reactUiCompat/useSizeContext.js';
import { getSizeModifier } from '../../utils/getSizeModifier.js';

import styles from './Table.module.css';
import { TableHeader } from './TableHeader.js';
import { TableBody } from './TableBody.js';
import { TableFooter } from './TableFooter.js';
import { TableRow } from './TableRow.js';
import { TableDropdownFilter } from './TableDropdownFilter.js';
import { TableSort } from './TableSort.js';
import { TableDropdownSortableFilter } from './TableDropdownSortableFilter.js';
import { TableActionBar } from './TableActionBar/TableActionBar.js';
import { TableKebabButton } from './TableActionBar/TableKebabButton.js';
import { TableDataTids } from './TableDataTids.js';
import { TableFilter } from './TableFilter/TableFilter.js';
import { TableFilterSearch } from './TableFilter/TableFilterSearch.js';
import { TableHeaderButton } from './TableFilter/TableHeaderButton.js';
import { TableFilterItem } from './TableFilter/TableFilterItem.js';
import { TableFilterResultCell } from './FilterResult/FilterResultCell.js';
import { TableToken } from './FilterResult/TableToken.js';
import { TableFilterResultRow } from './FilterResult/FilterResultRow.js';
import { SizeTableContext } from './TableContext.js';
import { TableHeaderCell } from './TableHeaderCell.js';
import { TableCell } from './TableCell.js';
import { TableCheckboxCell } from './TableCheckboxCell.js';
import { TableHeaderCheckboxCell } from './TableHeaderCheckboxCell.js';

interface TableProps extends CommonProps {
  width?: CSSProperties['width'];
  minWidth?: CSSProperties['minWidth'];
  maxWidth?: CSSProperties['maxWidth'];
  hasChecked?: boolean;
  auto?: boolean;
  size?: SizeProp;
  rootNodeRef?: (instance: Element | null | undefined) => void;
}

interface WidthWrapperProps {
  width?: CSSProperties['width'];
  minWidth?: CSSProperties['minWidth'];
  maxWidth?: CSSProperties['maxWidth'];
  children: ReactNode;
}

const WidthWrapper = ({ width, minWidth, maxWidth, children }: WidthWrapperProps) => {
  if (width || minWidth || maxWidth) {
    return (
      <div
        style={{
          ...(width && { width }),
          ...(minWidth && { minWidth }),
          ...(maxWidth && { maxWidth }),
        }}
      >
        {children}
      </div>
    );
  }
  return <>{children}</>;
};

export interface TableActionsProps extends CommonProps {
  renderContent: () => ReactNode;
}

interface TableComponent extends FC<TableProps> {
  Header: typeof TableHeader;
  Body: typeof TableBody;
  Footer: typeof TableFooter;
  Row: typeof TableRow;
  Cell: typeof TableCell;
  CheckboxCell: typeof TableCheckboxCell;
  HeaderCell: typeof TableHeaderCell;
  HeaderCheckboxCell: typeof TableHeaderCheckboxCell;
  Sort: typeof TableSort;
  DropdownFilter: typeof TableDropdownFilter;
  DropdownSortableFilter: typeof TableDropdownSortableFilter;
  ActionBar: typeof TableActionBar;
  KebabButton: typeof TableKebabButton;
  Filter: typeof TableFilter;
  FilterSearch: typeof TableFilterSearch;
  HeaderButton: typeof TableHeaderButton;
  FilterItem: typeof TableFilterItem;
  FilterResultCell: typeof TableFilterResultCell;
  FilterResultRow: typeof TableFilterResultRow;
  Token: typeof TableToken;
  __KONTUR_REACT_UI__: string;
  displayName: string;
}

export const Table: TableComponent = forwardRef<HTMLTableElement, TableProps>(
  ({ children, hasChecked, auto, size: sizeProp, className, rootNodeRef, width, minWidth, maxWidth, ...rest }, ref) => {
    const sizeContext = useSizeContextCompat();
    const size = sizeProp ?? sizeContext.size;
    const tableTheme = getTableTheme(useContext(ThemeContext));
    const tableSizeClassName = styles[getSizeModifier('Table', size)];
    const tableRef = useCallback(
      (node: HTMLTableElement | null) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as MutableRefObject<HTMLTableElement | null>).current = node;
        }
      },
      [ref]
    );

    return (
      <SizeTableContext.Provider value={{ size }}>
        <WidthWrapper width={width} minWidth={minWidth} maxWidth={maxWidth}>
          <CommonWrapper rootNodeRef={rootNodeRef} className={className} {...rest}>
            <table
              ref={tableRef}
              style={
                {
                  '--table-base-size': TableLightTheme.tableBaseSize,
                  '--table-sticky-background': tableTheme.tableStickyBackground,
                  '--table-text': tableTheme.tableText,
                  '--table-secondary-text': tableTheme.tableSecondaryText,
                  '--table-outline': tableTheme.tableOutline,
                  '--table-outline-width': tableTheme.tableOutlineWidth,
                  '--table-border': tableTheme.tableBorder,
                  '--table-row-hover': tableTheme.tableRowHover,
                  '--table-row-shadow-hover': tableTheme.tableRowShadowHover,
                  '--table-row-active': tableTheme.tableRowActive,
                  '--table-row-shadow-active': tableTheme.tableRowShadowActive,
                  '--table-row-checked': tableTheme.tableRowChecked,
                  '--table-row-shadow-checked': tableTheme.tableRowShadowChecked,
                  '--table-row-checked-hover': tableTheme.tableRowCheckedHover,
                  '--table-row-shadow-checked-hover': tableTheme.tableRowShadowCheckedHover,
                  '--table-row-checked-active': tableTheme.tableRowCheckedActive,
                  '--table-row-shadow-checked-active': tableTheme.tableRowShadowCheckedActive,
                  '--table-danger-active-color': tableTheme.tableDangerActiveColor,
                } as CSSProperties
              }
              className={cx(styles.Table, {
                [styles.HasChecked]: hasChecked,
                [styles.TableLayoutAuto]: auto,
                [tableSizeClassName]: true,
              })}
              data-tid={TableDataTids.root}
            >
              {children}
            </table>
          </CommonWrapper>
        </WidthWrapper>
      </SizeTableContext.Provider>
    );
  }
) as unknown as TableComponent;

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.CheckboxCell = TableCheckboxCell;
Table.HeaderCell = TableHeaderCell;
Table.HeaderCheckboxCell = TableHeaderCheckboxCell;
Table.Sort = TableSort;
Table.DropdownFilter = TableDropdownFilter;
Table.DropdownSortableFilter = TableDropdownSortableFilter;
Table.ActionBar = TableActionBar;
Table.KebabButton = TableKebabButton;
Table.Filter = TableFilter;
Table.FilterSearch = TableFilterSearch;
Table.HeaderButton = TableHeaderButton;
Table.FilterItem = TableFilterItem;
Table.FilterResultCell = TableFilterResultCell;
Table.FilterResultRow = TableFilterResultRow;
Table.Token = TableToken;

Table.__KONTUR_REACT_UI__ = 'Table';
Table.displayName = 'Table';

export { TableHeaderCell, TableCell, TableCheckboxCell, TableHeaderCheckboxCell };
