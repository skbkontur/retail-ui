import React, { useContext } from 'react';

import { Menu } from '../../internal/Menu/index.js';
import { MenuMessage } from '../../internal/MenuMessage/index.js';
import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { SizeProp } from '../../lib/types/props.js';
import { isMenuFooter } from '../MenuFooter/index.js';
import { isMenuHeader } from '../MenuHeader/index.js';
import { isMenuItem, MenuItem, type MenuItemProps, type MenuItemState } from '../MenuItem/index.js';
import { Spinner } from '../Spinner/index.js';
import { TimePickerDataTids } from './helpers/TimePicker.constants.js';
import {
  isNavigableMenuElement,
  isTimeMenuItem,
  type TimeItemValue,
  type TimePickerMenuItem,
} from './helpers/TimePicker.shared.js';
import { getStyles } from './TimePicker.styles.js';

const getItemLabelSizeClassName = (styles: ReturnType<typeof getStyles>, theme: Theme, size: SizeProp): string => {
  switch (size) {
    case 'large':
      return styles.itemLabelLarge(theme);
    case 'medium':
      return styles.itemLabelMedium(theme);
    case 'small':
    default:
      return styles.itemLabelSmall(theme);
  }
};

const ItemRoot = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { disabled?: boolean; state?: MenuItemState }
>(({ disabled = false, state: _state, ...props }, ref) => {
  if (disabled) {
    return <div {...props} ref={ref as React.Ref<HTMLDivElement>} />;
  }

  return <button {...props} ref={ref as React.Ref<HTMLButtonElement>} type={'button'} />;
});

interface TimePickerItemsProps<T extends TimeItemValue> {
  itemIdPrefix?: string;
  size: SizeProp;
  resolvedItems: Array<TimePickerMenuItem<T>>;
  renderItem?: (item: T, state: MenuItemState) => React.ReactNode;
  highlightedItemIndex: number | null;
  selectedValue: string;
  itemRefs?: React.RefObject<Map<number, HTMLSpanElement>>;
  maxHeight?: React.CSSProperties['maxHeight'];
  disableScrollContainer?: boolean;
  isLoading?: boolean;
  isFailed: boolean;
  errorNetworkButton: string;
  errorNetworkMessage: string;
  onRetry(): void;
  onSelectItem(item: T): void;
}

export const TimePickerItems = <T extends TimeItemValue>(props: TimePickerItemsProps<T>) => {
  const {
    itemIdPrefix,
    size,
    resolvedItems,
    renderItem,
    highlightedItemIndex,
    selectedValue,
    itemRefs,
    maxHeight,
    disableScrollContainer,
    isLoading,
    isFailed,
    errorNetworkButton,
    errorNetworkMessage,
    onRetry,
    onSelectItem,
  } = props;

  const theme = useContext(ThemeContext);
  const { cx } = useEmotion();
  const styles = useStyles(getStyles);
  const itemLabelSizeClassName = getItemLabelSizeClassName(styles, theme, size);

  if (isFailed) {
    return (
      <Menu
        hasMargin={false}
        width={'100%'}
        maxHeight={maxHeight}
        disableScrollContainer={disableScrollContainer}
        data-tid={TimePickerDataTids.failed}
      >
        <MenuMessage size={size} as={'div'}>
          <div style={{ maxWidth: 300, whiteSpace: 'normal' }}>{errorNetworkMessage}</div>
        </MenuMessage>
        <MenuItem onClick={onRetry} size={size} isMobile={disableScrollContainer}>
          {errorNetworkButton}
        </MenuItem>
      </Menu>
    );
  }

  if (isLoading && resolvedItems.length === 0) {
    return (
      <Menu
        hasMargin={false}
        width={'100%'}
        maxHeight={maxHeight}
        disableScrollContainer={disableScrollContainer}
        data-tid={TimePickerDataTids.loading}
      >
        <MenuMessage size={size} as={'div'}>
          <Spinner size={'small'} dimmed />
        </MenuMessage>
      </Menu>
    );
  }

  return (
    <Menu hasMargin={false} width={'100%'} maxHeight={maxHeight} disableScrollContainer={disableScrollContainer}>
      {resolvedItems.map((resolvedItem, index) => {
        if (!isTimeMenuItem(resolvedItem)) {
          const element = typeof resolvedItem === 'function' ? resolvedItem() : resolvedItem;
          const key = element.key ?? index;

          if (isMenuItem(element)) {
            const menuItemProps = element.props as MenuItemProps;
            // Навигация смотрит на исходный элемент источника, поэтому пункт-функция в нее не попадает:
            // выглядеть как доступная опция он не должен.
            const isNavigable = isNavigableMenuElement(resolvedItem);
            const isHighlighted = isNavigable && highlightedItemIndex === index;

            return React.cloneElement(element, {
              key,
              isMobile: disableScrollContainer,
              size,
              id: menuItemProps.id ?? (isNavigable && itemIdPrefix ? `${itemIdPrefix}-item-${index}` : undefined),
              role: menuItemProps.role ?? 'option',
              'aria-selected': menuItemProps['aria-selected'] ?? false,
              'aria-disabled': menuItemProps['aria-disabled'] ?? (isNavigable ? undefined : true),
              ...(isHighlighted ? { state: 'hover' } : null),
            } as MenuItemProps);
          }

          if (isMenuHeader(element) || isMenuFooter(element)) {
            return React.cloneElement(element, { key, size });
          }

          return React.cloneElement(element, { key });
        }

        let state: 'hover' | 'selected' | undefined;

        if (highlightedItemIndex === index) {
          state = 'hover';
        } else if (resolvedItem.value === selectedValue) {
          state = 'selected';
        }

        return (
          <MenuItem
            key={`${resolvedItem.value}-${index}`}
            id={itemIdPrefix ? `${itemIdPrefix}-item-${index}` : undefined}
            role={'option'}
            aria-selected={resolvedItem.value === selectedValue}
            aria-disabled={resolvedItem.disabled || undefined}
            component={ItemRoot}
            disabled={resolvedItem.disabled}
            isNotSelectable={resolvedItem.disabled}
            size={size}
            state={state}
            onClick={resolvedItem.disabled ? undefined : () => onSelectItem(resolvedItem.item)}
          >
            {(activeState) => (
              <span
                data-tid={TimePickerDataTids.item}
                className={styles.item()}
                ref={(node) => {
                  if (!itemRefs) {
                    return;
                  }

                  if (node) {
                    itemRefs.current.set(index, node);
                  } else {
                    itemRefs.current.delete(index);
                  }
                }}
              >
                {renderItem ? (
                  renderItem(resolvedItem.item, activeState ?? null)
                ) : (
                  <>
                    <span className={styles.itemValue()}>{resolvedItem.value}</span>
                    {resolvedItem.label && (
                      <span
                        className={cx(styles.itemLabel(), itemLabelSizeClassName, {
                          [styles.itemLabelColor(theme)]: !resolvedItem.disabled,
                        })}
                      >
                        {resolvedItem.label}
                      </span>
                    )}
                  </>
                )}
              </span>
            )}
          </MenuItem>
        );
      })}
    </Menu>
  );
};
