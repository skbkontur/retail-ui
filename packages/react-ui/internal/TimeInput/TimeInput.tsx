import React, { useContext, useEffect, useImperativeHandle, useRef } from 'react';

import type { InputProps } from '../../components/Input/index.js';
import {
  getTimePickerInputMinWidth,
  getTimePickerSuffixMargin,
} from '../../components/TimePicker/helpers/TimePicker.layout.js';
import {
  getTimeSegments,
  type TimeFormat,
  type TimeSegment,
} from '../../components/TimePicker/helpers/TimePicker.shared.js';
import { TimeClockIcon } from '../../components/TimePicker/TimeClockIcon.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { InputLikeText } from '../InputLikeText/index.js';
import type { TimeFragmentsRef } from './TimeFragments.js';
import { TimeFragments } from './TimeFragments.js';
import { getStyles } from './TimeInput.styles.js';

export interface TimeInputRef {
  focus(): void;
  blur(): void;
  blink(): void;
  isFragment(el: HTMLElement | EventTarget | null): boolean;
  isAllSelected(): boolean;
  getSegment(el: HTMLElement | EventTarget | null): TimeSegment | null;
  selectSegment(segment: TimeSegment): void;
  selectAll(): void;
  getNode(): HTMLElement | null;
}

export interface TimeInputProps extends Omit<InputProps, 'type' | 'value' | 'onValueChange' | 'inputMode'> {
  hasDropdown?: boolean;
  format: TimeFormat;
  value: string;
  'aria-placeholder'?: string;
  onSelectSegment?(segment: TimeSegment, event: React.MouseEvent<HTMLSpanElement>): void;
}

export const TimeInput = forwardRefAndName<TimeInputRef, TimeInputProps>('TimeInput', (props, ref) => {
  const {
    hasDropdown = false,
    size = 'small',
    disabled,
    autoFocus,
    suffix,
    style,
    width,
    corners,
    rightIcon,
    format,
    value,
    onSelectSegment,
    ...rest
  } = props;

  const theme = useContext(ThemeContext);

  const { cx } = useEmotion();

  const styles = useStyles(getStyles);

  const inputLikeTextRef = useRef<InputLikeText>(null);
  const fragmentsRef = useRef<TimeFragmentsRef>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputLikeTextRef.current?.focus(),
      blur: () => inputLikeTextRef.current?.blur(),
      blink: () => inputLikeTextRef.current?.blink(),
      getNode: () => inputLikeTextRef.current?.getNode() ?? null,
      isFragment: (el) => fragmentsRef.current?.isFragment(el) ?? false,
      getSegment: (el) => fragmentsRef.current?.getSegment(el) ?? null,
      selectAll: () => {
        const rootNode = fragmentsRef.current?.getRootNode() ?? null;

        if (!rootNode) {
          return;
        }

        inputLikeTextRef.current?.selectInnerNode(rootNode, 0, rootNode.childNodes.length);
      },

      isAllSelected: () => {
        const rootNode = fragmentsRef.current?.getRootNode() ?? null;

        if (!rootNode) {
          return false;
        }

        const selection = rootNode.ownerDocument.defaultView?.getSelection() ?? null;

        if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
          return false;
        }

        const range = selection.getRangeAt(0);
        const text = rootNode.textContent ?? '';

        return (
          range.toString() === text && rootNode.contains(range.startContainer) && rootNode.contains(range.endContainer)
        );
      },

      selectSegment: (segment) => {
        const rootNode = fragmentsRef.current?.getRootNode() ?? null;

        if (!rootNode) {
          return;
        }

        const segmentIndex = getTimeSegments(format).indexOf(segment);
        const start = segmentIndex < 0 ? 0 : segmentIndex * 2;
        const end = start + 1;

        inputLikeTextRef.current?.selectInnerNode(rootNode, start, end);
      },
    }),
    [format],
  );

  useEffect(() => {
    if (!autoFocus || disabled) {
      return;
    }

    const timer = setTimeout(() => {
      inputLikeTextRef.current?.focus();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const resolvedRightIcon =
    rightIcon === undefined ? (
      <span
        className={cx(styles.rightIcon(), styles.rightIconDefault(theme), {
          [styles.rightIconInteractive()]: hasDropdown && !disabled,
        })}
      >
        <TimeClockIcon size={size} />
      </span>
    ) : (
      rightIcon
    );
  const suffixMarginLeft = getTimePickerSuffixMargin(size, theme);
  const inputMinWidth = getTimePickerInputMinWidth(size, format, resolvedRightIcon !== null, theme);

  return (
    <InputLikeText
      ref={inputLikeTextRef}
      {...rest}
      takeContentWidth
      disabled={disabled}
      size={size}
      inputMode={'numeric'}
      width={width ?? 'auto'}
      suffix={suffix && <span style={{ marginLeft: suffixMarginLeft }}>{suffix}</span>}
      style={{ ...style, minWidth: inputMinWidth, ...corners }}
      rightIcon={resolvedRightIcon}
      value={value}
    >
      <TimeFragments ref={fragmentsRef} format={format} size={size} value={value} onSelectSegment={onSelectSegment} />
    </InputLikeText>
  );
});
