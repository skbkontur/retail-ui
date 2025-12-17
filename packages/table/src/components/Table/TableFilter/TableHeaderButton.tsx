import React, { useContext, forwardRef, type ComponentRef, type MouseEventHandler, type ReactElement } from 'react';
import { IconUiFilterFunnelLight16 } from '@skbkontur/icons/IconUiFilterFunnelLight16';
import { IconUiFilterFunnelRegular20 } from '@skbkontur/icons/IconUiFilterFunnelRegular20';
import { IconUiFilterFunnelRegular24 } from '@skbkontur/icons/IconUiFilterFunnelRegular24';
import { IconUiFilterSortAHighToLowLight16 } from '@skbkontur/icons/IconUiFilterSortAHighToLowLight16';
import { IconUiFilterSortAHighToLowRegular20 } from '@skbkontur/icons/IconUiFilterSortAHighToLowRegular20';
import { IconUiFilterSortAHighToLowRegular24 } from '@skbkontur/icons/IconUiFilterSortAHighToLowRegular24';
import { IconUiFilterSortALowToHighRegular16 } from '@skbkontur/icons/IconUiFilterSortALowToHighRegular16';
import { IconUiFilterSortALowToHighRegular20 } from '@skbkontur/icons/IconUiFilterSortALowToHighRegular20';
import { IconUiFilterSortALowToHighRegular24 } from '@skbkontur/icons/IconUiFilterSortALowToHighRegular24';
import { IconArrowCDownLight16 } from '@skbkontur/icons/IconArrowCDownLight16';
import { IconArrowCDownLight20 } from '@skbkontur/icons/IconArrowCDownLight20';
import { Button } from '@skbkontur/react-ui/components/Button/Button';
import type { CommonProps, CommonWrapperRestProps } from '@skbkontur/react-ui/internal/CommonWrapper';
import { CommonWrapper } from '@skbkontur/react-ui/internal/CommonWrapper';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import { ThemeFactory } from '@skbkontur/react-ui/lib/theming/ThemeFactory';
import cx from 'classnames';

import type { SortDirection } from '../../../hooks/useTableSort.js';
import type { SizeProp } from '../../../reactUiCompat/useSizeContext.js';
import { SizeTableContext } from '../TableContext.js';
import { getIconSize } from '../../../utils/getIconSize.js';
import { TableDataTids } from '../TableDataTids.js';

import styles from './TableFilter.module.css';

export interface TableHeaderButtonProps extends CommonProps {
  filtered?: boolean;
  sorted?: SortDirection;
  withoutDefaultIcon?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  hovered?: boolean;
}

const FILTER_ICONS = {
  16: IconUiFilterFunnelLight16,
  20: IconUiFilterFunnelRegular20,
  24: IconUiFilterFunnelRegular24,
} as const;

const SORT_ICONS = {
  desc: {
    16: IconUiFilterSortAHighToLowLight16,
    20: IconUiFilterSortAHighToLowRegular20,
    24: IconUiFilterSortAHighToLowRegular24,
  },
  asc: {
    16: IconUiFilterSortALowToHighRegular16,
    20: IconUiFilterSortALowToHighRegular20,
    24: IconUiFilterSortALowToHighRegular24,
  },
} as const;

const DEFAULT_ICONS = {
  16: IconArrowCDownLight16,
  20: IconArrowCDownLight20,
} as const;

const getFilterIcon = (iconSize: 16 | 20 | 24) => {
  return FILTER_ICONS[iconSize];
};

const getSortIcon = (sorted: SortDirection, iconSize: 16 | 20 | 24) => {
  return SORT_ICONS[sorted][iconSize];
};

const getHeaderIcon = (
  sorted?: SortDirection,
  filtered?: boolean,
  withoutDefaultIcon?: boolean,
  size: SizeProp = 'small'
): ReactElement | undefined => {
  const iconSize = getIconSize(size);
  const iconColor = '#1874CF';

  if (filtered && sorted) {
    const FilterIcon = getFilterIcon(iconSize);
    const SortIcon = getSortIcon(sorted, iconSize);

    return (
      <>
        <FilterIcon color={iconColor} />
        <SortIcon color={iconColor} />
      </>
    );
  }

  if (filtered) {
    const FilterIcon = getFilterIcon(iconSize);
    return <FilterIcon color={iconColor} />;
  }

  if (sorted) {
    const SortIcon = getSortIcon(sorted, iconSize);
    return <SortIcon color={iconColor} />;
  }

  if (withoutDefaultIcon) {
    return undefined;
  }

  const DefaultIcon = DEFAULT_ICONS[iconSize === 24 ? 20 : iconSize];
  return <DefaultIcon />;
};

export const TableHeaderButton = forwardRef<ComponentRef<typeof Button>, TableHeaderButtonProps>(
  ({ children, ...rest }, ref) => {
    const { size } = useContext(SizeTableContext);

    return (
      <CommonWrapper {...rest}>
        {(wrapperRest: CommonWrapperRestProps<TableHeaderButtonProps>) => {
          const { sorted, filtered, withoutDefaultIcon, hovered, ...buttonProps } = wrapperRest;
          const icon = getHeaderIcon(sorted, filtered, withoutDefaultIcon, size);

          return (
            <ThemeContext.Consumer>
              {(theme) => (
                <ThemeContext.Provider
                  value={ThemeFactory.create(
                    {
                      btnTextHoverTextColor: theme.btnDefaultTextColor,
                      btnDefaultTextColor:
                        filtered || sorted || hovered ? theme.btnDefaultTextColor : theme.menuHeaderColor,
                      btnTextBg: hovered ? theme.btnTextHoverBg : theme.btnTextBg,
                    },
                    theme
                  )}
                >
                  <div className={cx(styles.ClickableHeaderWrapper)}>
                    <Button ref={ref} use="text" size={size} data-tid={TableDataTids.clickableHeader} {...buttonProps}>
                      {children} {icon}
                    </Button>
                  </div>
                </ThemeContext.Provider>
              )}
            </ThemeContext.Consumer>
          );
        }}
      </CommonWrapper>
    );
  }
);
TableHeaderButton.displayName = 'TableHeaderButton';
