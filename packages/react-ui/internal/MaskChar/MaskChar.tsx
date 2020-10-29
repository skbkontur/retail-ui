import React from 'react';

import { jsStyles } from './MaskChar.styles';

/**
 * FIGURE SPACE
 *
 * space equal to tabular width of a font this is equivalent to the digit width of fonts with fixed-width digits
 *
 * @see http://www.fileformat.info/info/unicode/char/2007/index.htm
 */
export const MASK_CHAR_EXEMPLAR = String.fromCharCode(0x2007);

interface MaskCharProps {
  char: string;
}

export function MaskChar({ char }: MaskCharProps) {
  let maskCharElement = <span className={jsStyles.charLowLine()} />;
  if (char !== '_') {
    maskCharElement = <span className={jsStyles.char()}>{char}</span>;
  }
  return (
    <span className={jsStyles.container()}>
      {maskCharElement}
      <span className={jsStyles.charExemplar()}>{MASK_CHAR_EXEMPLAR}</span>
    </span>
  );
}
