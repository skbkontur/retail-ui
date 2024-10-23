import React, { useContext } from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { EmotionContext } from '../../lib/theming/Emotion';
import { isIE11 } from '../../lib/client';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './MiniModal.styles';
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
    const emotion = useContext(EmotionContext);
    const styles = getStyles(emotion);

    return (
      <div
        data-tid={MiniModalDataTids.indent}
        ref={ref}
        className={emotion.cx(!isIE11 ? styles.actionsIndent(theme) : styles.actionsIndentIE11Fallback(theme))}
        {...rest}
      />
    );
  },
);
