import React, { useImperativeHandle, useRef } from 'react';

import type { TimeFormat } from '../../components/TimePicker/index.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import { useEmotion } from '../../lib/renderEnvironment/index.js';
import type { Nullable } from '../../typings/utility-types.js';
import { getJsStyles } from './NativeTimeInput.styles.js';
import {
  getDefaultMaxTime,
  getDefaultMinTime,
  getNativeTimeStep,
  getTimeForComponent,
  getTimeForNative,
} from './NativeTimeInput.utils.js';

export interface NativeTimeInputProps {
  'data-tid'?: string;
  disabled?: boolean;
  format: TimeFormat;
  value: Nullable<string>;
  minTime?: Nullable<string>;
  maxTime?: Nullable<string>;
  onValueChange?(value: string): void;
}

export interface NativeTimeInputRef {
  focus(): void;
  click(): void;
}

export const NativeTimeInput = forwardRefAndName<NativeTimeInputRef, NativeTimeInputProps>(
  'NativeTimeInput',
  (props, ref) => {
    const { value, minTime, maxTime, format, disabled, onValueChange, 'data-tid': dataTid } = props;

    const jsStyles = getJsStyles(useEmotion());
    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        focus() {
          inputRef.current?.focus();
        },
        click() {
          inputRef.current?.click();
        },
      }),
      [],
    );

    return (
      <input
        type={'time'}
        data-tid={dataTid}
        ref={inputRef}
        disabled={disabled}
        className={jsStyles.inputTypeTime()}
        tabIndex={-1}
        step={getNativeTimeStep(format)}
        min={minTime ? getTimeForNative(minTime, format) : getDefaultMinTime(format)}
        max={maxTime ? getTimeForNative(maxTime, format) : getDefaultMaxTime(format)}
        value={getTimeForNative(value, format) ?? ''}
        onChange={(event) => {
          onValueChange?.(getTimeForComponent(event.target.value, format));
        }}
      />
    );
  },
);
