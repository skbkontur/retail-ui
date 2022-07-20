import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { CommonProps } from '../../internal/CommonWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { styles } from './Modal.styles';

export interface ModalSeparatorProps extends CommonProps {
  fixed?: boolean;
}

export function ModalSeparator(props: ModalSeparatorProps) {
  const theme = useContext(ThemeContext);

  return (
    <div className={styles.modalSeparatorWrapper()}>
      <div className={cx({ [styles.modalSeparator(theme)]: true, [styles.modalSeparatorFixed()]: props.fixed })} />
    </div>
  );
}
