import React from 'react';

import { useEmotion } from '../../lib/theming/Emotion';
import { CommonProps } from '../../internal/CommonWrapper';
import { useTheme } from '../../lib/theming/useTheme';

import { getStyles } from './Modal.styles';

export interface ModalSeparatorProps extends CommonProps {
  fixed?: boolean;
}

/**
 * Разделитель
 *
 * @visibleName Modal.Separator
 */
export function ModalSeparator({ fixed }: ModalSeparatorProps) {
  const theme = useTheme();
  const emotion = useEmotion();
  const styles = getStyles(emotion);

  return (
    <div className={styles.modalSeparatorWrapper()}>
      <div className={emotion.cx(styles.modalSeparator(theme), fixed && styles.modalSeparatorFixed())} />
    </div>
  );
}

ModalSeparator.__KONTUR_REACT_UI__ = 'ModalSeparator';
ModalSeparator.displayName = 'ModalSeparator';
