import { cx } from '@emotion/css';
import React, { useContext } from 'react';

import { Menu } from '../../internal/Menu/index.js';
import { useStyles } from '../../lib/renderEnvironment/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { SizeProp } from '../../lib/types/props.js';
import { MenuItem } from '../MenuItem/index.js';
import { TimePickerDataTids } from './helpers/TimePicker.constants.js';
import type { TimeFormat, TimeItem } from './helpers/TimePicker.shared.js';
import { normalizeTimeValue } from './helpers/TimePicker.value.js';
import { getStyles } from './TimePicker.styles.js';

const getItemSizeClassName = (styles: ReturnType<typeof getStyles>, theme: Theme, size: SizeProp): string => {
  switch (size) {
    case 'large':
      return styles.itemLarge(theme);
    case 'medium':
      return styles.itemMedium(theme);
    case 'small':
    default:
      return styles.itemSmall(theme);
  }
};

const ItemRoot = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { disabled?: boolean; state?: unknown }
>(({ disabled = false, state: _state, ...props }, ref) => {
  if (disabled) {
    return <div {...props} ref={ref as React.Ref<HTMLDivElement>} />;
  }

  return <button {...props} ref={ref as React.Ref<HTMLButtonElement>} type={'button'} disabled={disabled} />;
});

interface TimePickerItemsProps {
  itemIdPrefix?: string;
  format: TimeFormat;
  size: SizeProp;
  resolvedItems: TimeItem[];
  highlightedItemIndex: number | null;
  normalizedValue: string;
  itemRefs?: React.RefObject<Map<number, HTMLSpanElement>>;
  maxHeight?: React.CSSProperties['maxHeight'];
  disableScrollContainer?: boolean;
  onSelectItem(item: TimeItem): void;
}

export const TimePickerItems = (props: TimePickerItemsProps) => {
  const {
    itemIdPrefix,
    format,
    size,
    resolvedItems,
    highlightedItemIndex,
    normalizedValue,
    itemRefs,
    maxHeight,
    disableScrollContainer,
    onSelectItem,
  } = props;

  const theme = useContext(ThemeContext);
  const styles = useStyles(getStyles);
  const itemSizeClassName = getItemSizeClassName(styles, theme, size);

  return (
    <Menu hasMargin={false} width={'100%'} maxHeight={maxHeight} disableScrollContainer={disableScrollContainer}>
      {resolvedItems.map((item, index) => {
        const normalizedItem = normalizeTimeValue(item.value, format);

        let state: 'hover' | 'selected' | undefined;

        if (highlightedItemIndex === index) {
          state = 'hover';
        } else if (normalizedItem === normalizedValue) {
          state = 'selected';
        }

        return (
          <MenuItem
            key={`${item.value}-${index}`}
            component={ItemRoot}
            disabled={item.disabled}
            isNotSelectable={item.disabled}
            size={size}
            state={state}
            onClick={item.disabled ? undefined : () => onSelectItem(item)}
          >
            <span
              id={itemIdPrefix ? `${itemIdPrefix}-item-${index}` : undefined}
              data-tid={TimePickerDataTids.item}
              className={cx(styles.item(), itemSizeClassName)}
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
              <span className={styles.itemValue()}>{normalizedItem}</span>
              {item.label && <span className={styles.itemLabel(theme)}>{item.label}</span>}
            </span>
          </MenuItem>
        );
      })}
    </Menu>
  );
};
