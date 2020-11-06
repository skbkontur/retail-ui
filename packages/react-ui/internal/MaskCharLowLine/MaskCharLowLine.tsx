import React from 'react';

import { jsStyles } from './MaskCharLowLine.styles';

/**
 * FIGURE SPACE
 *
 * space equal to tabular width of a font this is equivalent to the digit width of fonts with fixed-width digits
 *
 * @see http://www.fileformat.info/info/unicode/char/2007/index.htm
 */
export const MASK_CHAR_EXEMPLAR = String.fromCharCode(0x2007);

export const MaskCharLowLine = () => <span className={jsStyles.root()}>{MASK_CHAR_EXEMPLAR}</span>;
