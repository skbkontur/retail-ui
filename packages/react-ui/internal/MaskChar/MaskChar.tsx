import React from 'react';
import cn from 'classnames';

import { isIE11 } from '../../lib/utils';

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
  fixedWidth: boolean;
}

const defaultProps = {
  fixedWidth: false,
};

export function MaskChar({ char, fixedWidth }: MaskCharProps) {
  const finallyFixedWidth = fixedWidth || char === '_';
  return (
    <span
      data-char={char}
      className={cn(jsStyles.root(), {
        [jsStyles.rootIE11()]: isIE11,
        [jsStyles.char()]: char !== '_',
        [jsStyles.charLowLine()]: char === '_',
        [jsStyles.notFixedWidth()]: !finallyFixedWidth,
      })}
    >
      {finallyFixedWidth && !isIE11 && MASK_CHAR_EXEMPLAR}
    </span>
  );
}

MaskChar.defaultProps = defaultProps;
