import React, { ForwardedRef, useContext, useImperativeHandle, useRef } from 'react';
import { InputMask } from 'imask';
import { IMaskInputProps } from 'react-imask';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { MaskCharLowLine } from '../MaskCharLowLine';
import { cx } from '../../lib/theming/Emotion';
import { InputElement, InputElementProps } from '../../components/Input';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { styles } from './MaskedInputElement.styles';

export type MaskedInputElementProps = IMaskInputProps<HTMLInputElement> &
  InputElementProps & {
    imaskRef: React.RefObject<{ maskRef: InputMask }>;
    maskedShadows: MaskedShadows | null;
    children: React.ReactElement;
  };

export type MaskedShadows = [string, string];

export const MaskedInputElementDataTids = {
  root: 'MaskedInput__root',
} as const;

export const MaskedInputElement = forwardRefAndName(
  'MaskedInputElement',
  function MaskedInputElement(props: MaskedInputElementProps, ref: ForwardedRef<InputElement>) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const rootNodeRef = React.useRef<HTMLDivElement>(null);
    const theme = useContext(ThemeContext);

    const { children, imaskRef, maskedShadows, ...inputProps } = props;

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
        {React.cloneElement(children, inputProps)}
        {renderMaskedShadows()}
      </span>
    );

    function renderMaskedShadows() {
      if (!maskedShadows) {
        return null;
      }

      const [left, right] = maskedShadows;

      // В rightHelper не DEFAULT_MASK_CHAR, а специальная логика для обратной совместимости.
      // Раньше использовался специальный шрифт с моноришиным подчёркиванием.
      const rightHelper = right.split('').map((_char, i) => (_char === '_' ? <MaskCharLowLine key={i} /> : _char));
      const leftHelper = props.style?.textAlign !== 'right' && <span style={{ color: 'transparent' }}>{left}</span>;

      const leftClass = props.style?.textAlign !== 'right' && styles.inputMaskLeft();

      return (
        <span className={cx(styles.inputMask(theme), leftClass)}>
          {leftHelper}
          {rightHelper}
        </span>
      );
    }
  },
);
