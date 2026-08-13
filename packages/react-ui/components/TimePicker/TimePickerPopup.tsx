import React, { useContext } from 'react';

import { Popup } from '../../internal/Popup/index.js';
import { ZIndex } from '../../internal/ZIndex/index.js';
import { getMenuPositions } from '../../lib/getMenuPositions.js';
import { useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { SizeProp } from '../../lib/types/props.js';
import type { MenuItemState } from '../MenuItem/index.js';
import { TimePickerDataTids } from './helpers/TimePicker.constants.js';
import type { TimeItemValue, TimePickerMenuItem } from './helpers/TimePicker.shared.js';
import { getStyles } from './TimePicker.styles.js';
import { TimePickerItems } from './TimePickerItems.js';

interface TimePickerPopupProps<T extends TimeItemValue> {
  id?: string;
  anchorElement: HTMLElement;
  menuPos?: 'top' | 'bottom';
  menuAlign?: 'left' | 'right';
  menuWidth?: React.CSSProperties['width'];
  popupMaxHeight: string;
  size: SizeProp;
  resolvedItems: Array<TimePickerMenuItem<T>>;
  renderItem?: (item: T, state: MenuItemState) => React.ReactNode;
  isLoading?: boolean;
  isFailed: boolean;
  errorNetworkButton: string;
  errorNetworkMessage: string;
  highlightedItemIndex: number | null;
  selectedValue: string;
  itemRefs: React.RefObject<Map<number, HTMLSpanElement>>;
  onRetry(): void;
  onSelectItem(item: T): void;
}

export const TimePickerPopup = <T extends TimeItemValue>(props: TimePickerPopupProps<T>) => {
  const {
    id,
    anchorElement,
    menuPos,
    menuAlign,
    menuWidth,
    popupMaxHeight,
    size,
    resolvedItems,
    renderItem,
    isLoading,
    isFailed,
    errorNetworkButton,
    errorNetworkMessage,
    highlightedItemIndex,
    selectedValue,
    itemRefs,
    onRetry,
    onSelectItem,
  } = props;

  const theme = useContext(ThemeContext);
  const styles = useStyles(getStyles);

  return (
    <Popup
      opened
      hasShadow
      anchorElement={anchorElement}
      data-tid={TimePickerDataTids.popup}
      priority={ZIndex.priorities.PopupMenu}
      margin={parseInt(theme.timePickerMenuOffsetY)}
      width={menuWidth}
      minWidth={menuWidth === undefined ? '100%' : undefined}
      positions={getMenuPositions(menuPos, menuAlign)}
    >
      <div id={id} role={'listbox'} className={styles.popup(theme)} onMouseDown={(event) => event.preventDefault()}>
        <TimePickerItems
          itemIdPrefix={id}
          size={size}
          resolvedItems={resolvedItems}
          renderItem={renderItem}
          isLoading={isLoading}
          isFailed={isFailed}
          errorNetworkButton={errorNetworkButton}
          errorNetworkMessage={errorNetworkMessage}
          highlightedItemIndex={highlightedItemIndex}
          selectedValue={selectedValue}
          itemRefs={itemRefs}
          maxHeight={popupMaxHeight}
          onRetry={onRetry}
          onSelectItem={onSelectItem}
        />
      </div>
    </Popup>
  );
};
