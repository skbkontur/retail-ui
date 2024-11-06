import React, { useContext } from 'react';

import { EmotionContext } from '../../lib/theming/Emotion';
import { CommonProps } from '../../internal/CommonWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './Modal.styles';

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
  const emotion = useContext(EmotionContext);
  const styles = getStyles(emotion);

  return (
    <div className={styles.modalSeparatorWrapper()}>
      <div className={emotion.cx(styles.modalSeparator(theme), fixed && styles.modalSeparatorFixed())} />
    </div>
  );
}

ModalSeparator.__KONTUR_REACT_UI__ = 'ModalSeparator';
ModalSeparator.displayName = 'ModalSeparator';
