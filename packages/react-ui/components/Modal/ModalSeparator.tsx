import React, { useContext } from 'react';

import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';

import { getStyles } from './Modal.styles.js';

export interface ModalSeparatorProps extends CommonProps {
  /** Фиксирует позицию ModalSeparator. */
  fixed?: boolean;
}

/**
 * Разделитель
 *
 * @visibleName Modal.Separator
 */
export function ModalSeparator({ fixed }: ModalSeparatorProps) {
  const theme = useContext(ThemeContext);
  const { cx } = useEmotion();
  const styles = useStyles(getStyles);

  return (
    <div className={styles.modalSeparatorWrapper()}>
      <div className={cx(styles.modalSeparator(theme), fixed && styles.modalSeparatorFixed(theme))} />
    </div>
  );
}

ModalSeparator.__KONTUR_REACT_UI__ = 'ModalSeparator';
ModalSeparator.displayName = 'ModalSeparator';
