import React from 'react';

import { useStyles } from '../../lib/renderEnvironment/index.js';

import { getStyles } from './MaskCharLowLine.styles.js';

/**
 * FIGURE SPACE
 *
 * space equal to tabular width of a font this is equivalent to the digit width of fonts with fixed-width digits
 *
 * @see http://www.fileformat.info/info/unicode/char/2007/index.htm
 */
export const MASK_CHAR_EXEMPLAR = String.fromCharCode(0x2007);

export const MaskCharLowLine = () => {
  const styles = useStyles(getStyles);
  return <span className={styles.root()}>{MASK_CHAR_EXEMPLAR}</span>;
};
