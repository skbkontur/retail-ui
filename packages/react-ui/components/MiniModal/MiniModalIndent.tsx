import React, { useContext } from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import { useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { MiniModalDataTids } from './MiniModal.js';
import { getStyles } from './MiniModal.styles.js';

/**
 * Отступ между кнопками
 *
 * @visibleName MiniModal.Indent
 */
export const MiniModalIndent = forwardRefAndName<HTMLDivElement, React.InputHTMLAttributes<HTMLDivElement>>(
  'MiniModalIndent',
  ({ children, ...rest }, ref) => {
    const styles = useStyles(getStyles);
    const theme = useContext(ThemeContext);

    return <div data-tid={MiniModalDataTids.indent} ref={ref} className={styles.actionsIndent(theme)} {...rest} />;
  },
);
