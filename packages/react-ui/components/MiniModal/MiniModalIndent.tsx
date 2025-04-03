import React, { useContext } from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { styles } from './MiniModal.styles';
import { MiniModalDataTids } from './MiniModal';

/**
 * Отступ между кнопками
 *
 * @visibleName MiniModal.Indent
 */
export const MiniModalIndent = forwardRefAndName<HTMLDivElement, React.InputHTMLAttributes<HTMLDivElement>>(
  'MiniModalIndent',
  ({ children, ...rest }, ref) => {
    const theme = useContext(ThemeContext);

    return <div data-tid={MiniModalDataTids.indent} ref={ref} className={styles.actionsIndent(theme)} {...rest} />;
  },
);
