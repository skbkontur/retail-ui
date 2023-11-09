import React, { useContext } from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { isIE11 } from '../../lib/client';

import { styles } from './MiniModal.styles';
import { MiniModalDataTids } from './MiniModal';

/**
 * Отступ между кнопками
 *
 * @visibleName MiniModal.Indent
 */
export const MiniModalIndent = forwardRefAndName<HTMLDivElement, unknown>(
  'MiniModalIndent',
  ({ children, ...rest }, ref) => {
    const theme = useContext(ThemeContext);

    return (
      <div
        data-tid={MiniModalDataTids.indent}
        ref={ref}
        className={cx(!isIE11 ? styles.actionsIndent(theme) : styles.actionsIndentIE11Fallback(theme))}
        {...rest}
      />
    );
  },
);
