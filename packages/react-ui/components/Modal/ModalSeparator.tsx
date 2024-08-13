import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { CommonProps } from '../../internal/CommonWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { styles } from './Modal.styles';

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

  return (
    <div className={styles.modalSeparatorWrapper()}>
      <div className={cx(styles.modalSeparator(theme), fixed && styles.modalSeparatorFixed())} />
    </div>
  );
}

ModalSeparator.__KONTUR_REACT_UI__ = 'ModalSeparator';
ModalSeparator.displayName = 'ModalSeparator';
