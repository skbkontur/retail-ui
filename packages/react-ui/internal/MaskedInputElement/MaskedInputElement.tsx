import React, { ForwardedRef, useContext, useImperativeHandle, useRef } from 'react';
import { InputMask } from 'imask';
import { IMaskInput } from 'react-imask';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { MaskCharLowLine } from '../MaskCharLowLine';
import { cx } from '../../lib/theming/Emotion';
import { InputElement, InputElementProps, InputProps } from '../../components/Input';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { styles } from './MaskedInputElement.styles';
import { getDefinitions, getMaskChar } from './MaskedInputElement.helpers';

export interface MaskedInputElementProps
  extends InputElementProps,
    Pick<InputProps, 'onValueChange' | 'onUnexpectedInput'> {
  mask: string;
  maskChar?: string | null;
  formatChars?: { [key: string]: string };
  alwaysShowMask?: boolean;
  imaskRef: React.RefObject<{ maskRef: InputMask }>;
  maskedShadows: MaskedShadow | null;
}

export type MaskedShadow = [string, string];

export const MaskedInputElementDataTids = {
  root: 'MaskedInput__root',
} as const;

export const MaskedInputElement = forwardRefAndName(
  'MaskedInputElement',
  function MaskedInputElement(props: MaskedInputElementProps, ref: ForwardedRef<InputElement>) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const rootNodeRef = React.useRef<HTMLDivElement>(null);
    const theme = useContext(ThemeContext);
    const prevUnmaskedValue = useRef('');

    const {
      mask,
      maskChar,
      formatChars,
      alwaysShowMask,
      maxLength,
      onUnexpectedInput,
      onValueChange,
      defaultValue,
      style,
      imaskRef,
      maskedShadows,
      ...inputProps
    } = props;

    useImperativeHandle(
      ref,
      () => ({
        input: inputRef.current,
        getRootNode: () => rootNodeRef.current,
      }),
      [],
    );

    return (
      <span
        data-tid={MaskedInputElementDataTids.root}
        ref={rootNodeRef}
        className={styles.container()}
        x-ms-format-detection="none"
      >
        <IMaskInput
          {...inputProps}
          mask={mask}
          definitions={getDefinitions(formatChars)}
          eager
          overwrite={'shift'}
          onAccept={handleAccept}
          onInput={handleInput}
          value={getValue()}
          inputRef={inputRef}
          ref={imaskRef}
          placeholderChar={getMaskChar(props.maskChar)}
          style={{ ...style }}
        />
        {renderMaskedShadows()}
      </span>
    );

    function renderMaskedShadows() {
      const isMaskVisible = maskedShadows;

      if (!maskedShadows) {
        return null;
      }
      const [left, right] = maskedShadows;

      // В rightHelper не DEFAULT_MASK_CHAR, а специальная логика для обратной совместимости.
      // Раньше использовался специальный шрифт с моноришиным подчёркиванием.
      const rightHelper = right.split('').map((_char, i) => (_char === '_' ? <MaskCharLowLine key={i} /> : _char));
      const leftHelper = style?.textAlign !== 'right' && <span style={{ color: 'transparent' }}>{left}</span>;

      const leftClass = style?.textAlign !== 'right' && styles.inputMaskLeft();

      return (
        isMaskVisible && (
          <span className={cx(styles.inputMask(theme), leftClass)}>
            {leftHelper}
            {rightHelper}
          </span>
        )
      );
    }

    function getValue(): string {
      return (props.value ?? props.defaultValue ?? '').toString();
    }

    /** В imask вызывается только когда значение с маской меняется*/
    function handleAccept(value: string) {
      onValueChange?.(value);
    }

    /** Отслеживаем неправильные нажатия,
     * handleAccept не вызывается когда значение с маской не меняется, а handleInput вызывается
     * Сначала вызывается handleAccept, затем handleInput
     * */
    function handleInput() {
      if (imaskRef.current) {
        const { unmaskedValue } = imaskRef.current.maskRef;

        if (prevUnmaskedValue.current === unmaskedValue) {
          onUnexpectedInput?.(unmaskedValue);
        }

        prevUnmaskedValue.current = unmaskedValue;
      }
    }
  },
);
