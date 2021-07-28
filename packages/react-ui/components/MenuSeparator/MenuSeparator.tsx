import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';

import { styles } from './MenuSeparator.styles';

export type MenuSeparatorProps = CommonProps;
/**
 * Разделитель в меню.
 */
function MenuSeparator(props: MenuSeparatorProps) {
  const theme = useContext(ThemeContext);

  return (
    <CommonWrapper {...props}>
      <div className={styles.root(theme)} />
    </CommonWrapper>
  );
}

MenuSeparator.__KONTUR_REACT_UI__ = 'MenuSeparator';

export { MenuSeparator };
