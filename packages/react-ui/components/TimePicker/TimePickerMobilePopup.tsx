import React, { useLayoutEffect } from 'react';
import type { ReactNode } from 'react';

import { MobilePopup } from '../../internal/MobilePopup/index.js';
import type { TimeInputRef } from '../../internal/TimeInput/index.js';
import { TimeInput } from '../../internal/TimeInput/index.js';
import type { SizeProp } from '../../lib/types/props.js';
import type { InputIconType } from '../Input/index.js';
import { TimePickerDataTids } from './helpers/TimePicker.constants.js';
import type { TimeSegment, TimeFormat, TimeItem } from './helpers/TimePicker.shared.js';
import { TimePickerItems } from './TimePickerItems.js';

interface TimePickerMobilePopupProps {
  id?: string;
  opened: boolean;
  value: string;
  inputRef: React.RefObject<TimeInputRef | null>;
  disabled?: boolean;
  format: TimeFormat;
  size: SizeProp;
  rightIcon?: InputIconType;
  suffix?: ReactNode;
  resolvedItems: TimeItem[];
  highlightedItemIndex: number | null;
  normalizedValue: string;
  itemRefs: React.RefObject<Map<number, HTMLSpanElement>>;
  error?: boolean;
  warning?: boolean;
  'aria-describedby'?: string;
  'aria-label'?: string;
  'aria-placeholder'?: string;
  onFocus(event: React.FocusEvent<HTMLInputElement>): void;
  onBlur(event: React.FocusEvent<HTMLInputElement>): void;
  onClick(event: React.MouseEvent<HTMLInputElement>): void;
  onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void;
  onMouseDownCapture(event: React.MouseEvent<HTMLInputElement>): void;
  onMouseUp(event: React.MouseEvent<HTMLInputElement>): void;
  onPaste(event: React.ClipboardEvent<HTMLInputElement>): void;
  onSelectSegment(segment: TimeSegment, event: React.MouseEvent<HTMLSpanElement>): void;
  onSelectItem(item: TimeItem): void;
  onCloseRequest(): void;
}

export const TimePickerMobilePopup = (props: TimePickerMobilePopupProps) => {
  const {
    id,
    opened,
    value,
    inputRef,
    disabled,
    format,
    size,
    rightIcon,
    suffix,
    resolvedItems,
    highlightedItemIndex,
    normalizedValue,
    itemRefs,
    error,
    warning,
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-placeholder': ariaPlaceholder,
    onFocus,
    onBlur,
    onClick,
    onKeyDown,
    onMouseDownCapture,
    onMouseUp,
    onPaste,
    onSelectSegment,
    onSelectItem,
    onCloseRequest,
  } = props;

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    });

    return () => {
      clearTimeout(timer);
    };
  }, [inputRef]);

  return (
    <MobilePopup
      id={id}
      opened={opened}
      verticalAlign={'center'}
      size={size}
      headerChildComponent={
        <TimeInput
          ref={inputRef}
          data-tid={TimePickerDataTids.mobileInput}
          width={'100%'}
          disabled={disabled}
          format={format}
          size={size}
          rightIcon={rightIcon}
          suffix={suffix}
          value={value}
          error={error}
          warning={warning}
          aria-describedby={ariaDescribedby}
          aria-label={ariaLabel}
          aria-placeholder={ariaPlaceholder}
          onFocus={onFocus}
          onBlur={onBlur}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onMouseDownCapture={onMouseDownCapture}
          onMouseUp={onMouseUp}
          onPaste={onPaste}
          onSelectSegment={onSelectSegment}
        />
      }
      onCloseRequest={onCloseRequest}
    >
      <div data-tid={TimePickerDataTids.mobilePopup}>
        <TimePickerItems
          itemIdPrefix={id}
          format={format}
          size={size}
          resolvedItems={resolvedItems}
          highlightedItemIndex={highlightedItemIndex}
          normalizedValue={normalizedValue}
          itemRefs={itemRefs}
          maxHeight={'auto'}
          disableScrollContainer
          onSelectItem={onSelectItem}
        />
      </div>
    </MobilePopup>
  );
};
