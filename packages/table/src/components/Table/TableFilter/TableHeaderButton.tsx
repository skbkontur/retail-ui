import { IconArrowCDownLight16 } from '@skbkontur/icons/IconArrowCDownLight16';
import { IconArrowCDownLight20 } from '@skbkontur/icons/IconArrowCDownLight20';
import { IconUiFilterFunnelLight16 } from '@skbkontur/icons/IconUiFilterFunnelLight16';
import { IconUiFilterFunnelRegular20 } from '@skbkontur/icons/IconUiFilterFunnelRegular20';
import { IconUiFilterFunnelRegular24 } from '@skbkontur/icons/IconUiFilterFunnelRegular24';
import { IconUiFilterSortAHighToLowRegular16 } from '@skbkontur/icons/IconUiFilterSortAHighToLowRegular16';
import { IconUiFilterSortAHighToLowRegular20 } from '@skbkontur/icons/IconUiFilterSortAHighToLowRegular20';
import { IconUiFilterSortAHighToLowRegular24 } from '@skbkontur/icons/IconUiFilterSortAHighToLowRegular24';
import { IconUiFilterSortALowToHighRegular16 } from '@skbkontur/icons/IconUiFilterSortALowToHighRegular16';
import { IconUiFilterSortALowToHighRegular20 } from '@skbkontur/icons/IconUiFilterSortALowToHighRegular20';
import { IconUiFilterSortALowToHighRegular24 } from '@skbkontur/icons/IconUiFilterSortALowToHighRegular24';
import { Button } from '@skbkontur/react-ui/components/Button/Button';
import type { CommonProps, CommonWrapperRestProps } from '@skbkontur/react-ui/internal/CommonWrapper';
import { CommonWrapper } from '@skbkontur/react-ui/internal/CommonWrapper';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import { ThemeFactory } from '@skbkontur/react-ui/lib/theming/ThemeFactory';
import cx from 'classnames';
import React, {
  useContext,
  useState,
  forwardRef,
  type ComponentRef,
  type FocusEventHandler,
  type MouseEventHandler,
  type ReactElement,
} from 'react';

import { getTableTheme } from '../../../../lib/theming/ThemeHelpers.js';
import type { SortDirection } from '../../../hooks/useTableSort.js';
import type { SizeProp } from '../../../reactUiCompat/useSizeContext.js';
import { getIconSize } from '../../../utils/getIconSize.js';
import { getSizeModifier } from '../../../utils/getSizeModifier.js';
import { forceFocusVisibleAttribute } from '../focusFilterButton.js';
import { SizeTableContext } from '../TableContext.js';
import { TableDataTids } from '../TableDataTids.js';

import styles from './TableFilter.module.css';

export interface TableHeaderButtonProps extends CommonProps {
  filtered?: boolean;
  sortDirection?: SortDirection;
  withoutDefaultIcon?: boolean;
  defaultIcon?: ReactElement;
  onClick?: MouseEventHandler<HTMLElement>;
  hovered?: boolean;
  iconDefaultColor?: string;
  iconActiveColor?: string;
  onFocus?: FocusEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
}

const FILTER_ICONS = {
  16: IconUiFilterFunnelLight16,
  20: IconUiFilterFunnelRegular20,
  24: IconUiFilterFunnelRegular24,
} as const;

const SORT_ICONS = {
  desc: {
    16: IconUiFilterSortAHighToLowRegular16,
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

const getSortIcon = (sortDirection: SortDirection, iconSize: 16 | 20 | 24) => {
  return SORT_ICONS[sortDirection][iconSize];
};

const getHeaderIcon = (
  sortDirection?: SortDirection,
  filtered?: boolean,
  withoutDefaultIcon?: boolean,
  defaultIcon?: ReactElement,
  iconDefaultColor?: string,
  iconActiveColor?: string,
  size: SizeProp = 'small'
): ReactElement | undefined => {
  const iconSize = getIconSize(size);
  const isActive = filtered || sortDirection;
  const iconColor = isActive ? iconActiveColor : iconDefaultColor;
  const doubleIconGapClass = styles[getSizeModifier('DoubleIconGap', size)];

  if (filtered && sortDirection) {
    const FilterIcon = getFilterIcon(iconSize);
    const SortIcon = getSortIcon(sortDirection, iconSize);

    return (
      <>
        <FilterIcon color={iconColor} className={doubleIconGapClass} />
        <SortIcon color={iconColor} />
      </>
    );
  }

  if (filtered) {
    const FilterIcon = getFilterIcon(iconSize);
    return <FilterIcon color={iconColor} />;
  }

  if (sortDirection) {
    const SortIcon = getSortIcon(sortDirection, iconSize);
    return <SortIcon color={iconColor} />;
  }

  if (withoutDefaultIcon) {
    return undefined;
  }

  if (defaultIcon) {
    return defaultIcon;
  }

  const DefaultIcon = DEFAULT_ICONS[iconSize === 24 ? 20 : iconSize];
  return <DefaultIcon />;
};

export const TableHeaderButton = forwardRef<ComponentRef<typeof Button>, TableHeaderButtonProps>(
  ({ children, ...rest }, ref) => {
    const { size } = useContext(SizeTableContext);
    const tableTheme = getTableTheme(useContext(ThemeContext));
    const [forceVisualFocus, setForceVisualFocus] = useState(false);
    const handleForcedFocus: FocusEventHandler<HTMLElement> = (event) => {
      if (event.currentTarget.getAttribute(forceFocusVisibleAttribute) === 'true') {
        event.currentTarget.removeAttribute(forceFocusVisibleAttribute);
        setForceVisualFocus(true);
      }
    };

    return (
      <CommonWrapper {...rest}>
        {(wrapperRest: CommonWrapperRestProps<TableHeaderButtonProps>) => {
          const {
            sortDirection,
            filtered,
            withoutDefaultIcon,
            defaultIcon,
            hovered,
            iconDefaultColor = tableTheme.tableDefaultIconColor,
            iconActiveColor = tableTheme.tableActiveIconColor,
            onFocus,
            onBlur,
            ...buttonProps
          } = wrapperRest;
          const handleFocus: FocusEventHandler<HTMLElement> = (event) => {
            handleForcedFocus(event);
            onFocus?.(event);
          };
          const handleBlur: FocusEventHandler<HTMLElement> = (event) => {
            setForceVisualFocus(false);
            onBlur?.(event);
          };
          const icon = getHeaderIcon(
            sortDirection,
            filtered,
            withoutDefaultIcon,
            defaultIcon,
            iconDefaultColor,
            iconActiveColor,
            size
          );
          const iconSpacingClass = icon ? styles[getSizeModifier('IconSpacing', size ?? 'small')] : undefined;

          return (
            <ThemeContext.Consumer>
              {(theme) => (
                <ThemeContext.Provider
                  value={ThemeFactory.create(
                    {
                      btnTextHoverTextColor: theme.btnDefaultTextColor,
                      btnDefaultTextColor:
                        filtered || sortDirection || hovered ? theme.btnDefaultTextColor : theme.menuHeaderColor,
                      btnTextBg: hovered ? theme.btnTextHoverBg : theme.btnTextBg,
                    },
                    theme
                  )}
                >
                  <div className={cx(styles.ClickableHeaderWrapper)}>
                    <Button
                      ref={ref}
                      use="text"
                      size={size}
                      data-tid={TableDataTids.clickableHeader}
                      visuallyFocused={forceVisualFocus}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      {...buttonProps}
                    >
                      {children}
                      {icon && <span className={iconSpacingClass}>{icon}</span>}
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
