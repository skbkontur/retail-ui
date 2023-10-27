import React, { ReactNode, useContext } from 'react';

import { CommonWrapper } from '../../internal/CommonWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { styles } from './Paging.styles';

export interface HintPlaceholderProps {
  children?: ReactNode;
}

export function HintPlaceholder(props: HintPlaceholderProps) {
  const theme = useContext(ThemeContext);
  return (
    <CommonWrapper {...props}>
      <div className={styles.pageLinkHint(theme)}>{props.children}</div>
    </CommonWrapper>
  );
}
