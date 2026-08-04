import { cx } from '@emotion/css';
import React, { useContext } from 'react';

import { useStyles } from '../../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { getStyles, globalClasses } from './MaskedInternal.styles.js';

interface MaskOverlayProps {
  typedValue: string;
  displayValue: string;
  selectionStart: number;
  selectionEnd: number;
  disabled?: boolean;
  textAlign?: React.CSSProperties['textAlign'];
  containerRef?: React.RefObject<HTMLSpanElement | null>;
  colored?: boolean;
}

function splitTextBySelection(
  text: string,
  textStartOffset: number,
  selectionStart: number,
  selectionEnd: number,
): [string, string, string] {
  if (selectionStart === selectionEnd) {
    return [text, '', ''];
  }

  const localStart = Math.max(0, selectionStart - textStartOffset);
  const localEnd = Math.min(text.length, selectionEnd - textStartOffset);

  if (localEnd <= localStart) {
    return [text, '', ''];
  }

  return [text.slice(0, localStart), text.slice(localStart, localEnd), text.slice(localEnd)];
}

/**
 * Абсолютно позиционированный слой над <input>.
 * Input делается прозрачным (color: transparent), а весь текст
 * (typedValue + maskPart) рендерится здесь с раскраской.
 * При center/right align overlay выравнивает маску, а input смещается paddingLeft.
 */
export function MaskOverlay({
  typedValue,
  displayValue,
  selectionStart,
  selectionEnd,
  disabled,
  textAlign,
  containerRef,
  colored = true,
}: MaskOverlayProps) {
  const theme = useContext(ThemeContext);
  const styles = useStyles(getStyles);
  const maskPart = displayValue.slice(typedValue.length);

  const disabledClass = disabled && globalClasses.disabled;
  const coloredClass = colored && globalClasses.colored;
  const selectedSegmentClass = styles.selectedSegment();

  if (!typedValue && !maskPart) {
    return null;
  }

  function renderSegment(text: string, offset: number, segmentClassName: string) {
    const [before, selected, after] = splitTextBySelection(text, offset, selectionStart, selectionEnd);

    return (
      <>
        {before ? <span className={segmentClassName}>{before}</span> : null}
        {selected ? <span className={selectedSegmentClass}>{selected}</span> : null}
        {after ? <span className={segmentClassName}>{after}</span> : null}
      </>
    );
  }

  return (
    <span ref={containerRef} aria-hidden="true" className={styles.overlay()}>
      <span
        data-tid="masked-input-overlay"
        style={{
          display: 'inline-block',
          width: '100%',
          whiteSpace: 'nowrap',
          textAlign,
          lineHeight: 'inherit',
        }}
      >
        {typedValue ? renderSegment(typedValue, 0, cx(styles.typed(theme), disabledClass, coloredClass)) : null}
        {maskPart
          ? renderSegment(maskPart, typedValue.length, cx(styles.mask(theme), disabledClass, coloredClass))
          : null}
      </span>
    </span>
  );
}
