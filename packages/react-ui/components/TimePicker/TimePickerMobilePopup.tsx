import React, { useContext, useLayoutEffect } from 'react';
import type { ReactNode } from 'react';

import { MobilePopup } from '../../internal/MobilePopup/index.js';
import type { TimeInputRef } from '../../internal/TimeInput/index.js';
import { TimeInput } from '../../internal/TimeInput/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers.js';
import type { SizeProp } from '../../lib/types/props.js';
import type { InputIconType } from '../Input/index.js';
import type { MenuItemState } from '../MenuItem/index.js';
import { TimePickerDataTids } from './helpers/TimePicker.constants.js';
import type { TimeSegment, TimeFormat, TimeItemValue, TimePickerMenuItem } from './helpers/TimePicker.shared.js';
import { TimePickerItems } from './TimePickerItems.js';

interface TimePickerMobilePopupProps<T extends TimeItemValue> {
  id?: string;
  value: string;
  inputRef: React.RefObject<TimeInputRef | null>;
  disabled?: boolean;
  format: TimeFormat;
  size: SizeProp;
  rightIcon?: InputIconType;
  suffix?: ReactNode;
  resolvedItems: Array<TimePickerMenuItem<T>>;
  renderItem?: (item: T, state: MenuItemState) => ReactNode;
  isLoading?: boolean;
  isFailed: boolean;
  errorNetworkButton: string;
  errorNetworkMessage: string;
  highlightedItemIndex: number | null;
  selectedValue: string;
  itemRefs: React.RefObject<Map<number, HTMLSpanElement>>;
  error?: boolean;
  warning?: boolean;
  'aria-describedby'?: string;
  'aria-label'?: string;
  'aria-placeholder'?: string;
  'aria-activedescendant'?: string;
  'aria-controls'?: string;
  'aria-expanded'?: boolean;
  'aria-haspopup'?: React.AriaAttributes['aria-haspopup'];
  onFocus(event: React.FocusEvent<HTMLInputElement>): void;
  onBlur(event: React.FocusEvent<HTMLInputElement>): void;
  onClick(event: React.MouseEvent<HTMLInputElement>): void;
  onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void;
  onMouseDownCapture(event: React.MouseEvent<HTMLInputElement>): void;
  onMouseUp(event: React.MouseEvent<HTMLInputElement>): void;
  onPaste(event: React.ClipboardEvent<HTMLInputElement>): void;
  onSelectSegment(segment: TimeSegment, event: React.MouseEvent<HTMLSpanElement>): void;
  onRetry(): void;
  onSelectItem(item: T): void;
  onCloseRequest(): void;
}

export const TimePickerMobilePopup = <T extends TimeItemValue>(props: TimePickerMobilePopupProps<T>) => {
  const {
    id,
    value,
    inputRef,
    disabled,
    format,
    size,
    rightIcon,
    suffix,
    resolvedItems,
    renderItem,
    isLoading,
    isFailed,
    errorNetworkButton,
    errorNetworkMessage,
    highlightedItemIndex,
    selectedValue,
    itemRefs,
    error,
    warning,
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-placeholder': ariaPlaceholder,
    'aria-activedescendant': ariaActiveDescendant,
    'aria-controls': ariaControls,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHasPopup,
    onFocus,
    onBlur,
    onClick,
    onKeyDown,
    onMouseDownCapture,
    onMouseUp,
    onPaste,
    onSelectSegment,
    onRetry,
    onSelectItem,
    onCloseRequest,
  } = props;

  const theme = useContext(ThemeContext);
  const themeGTE6_1 = isThemeGTE(theme, '6.1');

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    });

    return () => {
      clearTimeout(timer);
    };
  }, [inputRef]);

  const input = (
    <TimeInput
      ref={inputRef}
      data-tid={TimePickerDataTids.mobileInput}
      width={'100%'}
      disabled={disabled}
      format={format}
      size={themeGTE6_1 ? size : undefined}
      rightIcon={rightIcon}
      suffix={suffix}
      value={value}
      error={error}
      warning={warning}
      aria-describedby={ariaDescribedby}
      aria-label={ariaLabel}
      aria-placeholder={ariaPlaceholder}
      aria-busy={isLoading || undefined}
      aria-activedescendant={ariaActiveDescendant}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHasPopup}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseDownCapture={onMouseDownCapture}
      onMouseUp={onMouseUp}
      onPaste={onPaste}
      onSelectSegment={onSelectSegment}
    />
  );

  const themeDependantProps = themeGTE6_1
    ? {
        footerChildComponent: input,
        size,
      }
    : {
        headerChildComponent: input,
      };

  return (
    <MobilePopup opened {...themeDependantProps} onCloseRequest={onCloseRequest}>
      <div id={id} role={'listbox'} data-tid={TimePickerDataTids.mobilePopup}>
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
          maxHeight={'auto'}
          disableScrollContainer
          onRetry={onRetry}
          onSelectItem={onSelectItem}
        />
      </div>
    </MobilePopup>
  );
};
