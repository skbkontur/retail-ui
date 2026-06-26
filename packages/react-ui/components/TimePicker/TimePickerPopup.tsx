import React, { useContext } from 'react';

import { Popup } from '../../internal/Popup/index.js';
import { ZIndex } from '../../internal/ZIndex/index.js';
import { getMenuPositions } from '../../lib/getMenuPositions.js';
import { useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { SizeProp } from '../../lib/types/props.js';
import { TimePickerDataTids } from './helpers/TimePicker.constants.js';
import type { TimeFormat, TimeItem } from './helpers/TimePicker.shared.js';
import { getStyles } from './TimePicker.styles.js';
import { TimePickerItems } from './TimePickerItems.js';

interface TimePickerPopupProps {
  id?: string;
  anchorElement: HTMLElement;
  menuPos?: 'top' | 'bottom';
  menuAlign?: 'left' | 'right';
  menuWidth?: React.CSSProperties['width'];
  popupMaxHeight: string;
  format: TimeFormat;
  size: SizeProp;
  resolvedItems: TimeItem[];
  highlightedItemIndex: number | null;
  normalizedValue: string;
  itemRefs: React.RefObject<Map<number, HTMLSpanElement>>;
  onSelectItem(item: TimeItem): void;
}

export const TimePickerPopup = (props: TimePickerPopupProps) => {
  const {
    id,
    anchorElement,
    menuPos,
    menuAlign,
    menuWidth,
    popupMaxHeight,
    format,
    size,
    resolvedItems,
    highlightedItemIndex,
    normalizedValue,
    itemRefs,
    onSelectItem,
  } = props;

  const theme = useContext(ThemeContext);
  const styles = useStyles(getStyles);

  return (
    <Popup
      id={id}
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
      <div className={styles.popup(theme)} onMouseDown={(event) => event.preventDefault()}>
        <TimePickerItems
          itemIdPrefix={id}
          format={format}
          size={size}
          resolvedItems={resolvedItems}
          highlightedItemIndex={highlightedItemIndex}
          normalizedValue={normalizedValue}
          itemRefs={itemRefs}
          maxHeight={popupMaxHeight}
          onSelectItem={onSelectItem}
        />
      </div>
    </Popup>
  );
};
