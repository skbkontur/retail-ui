import React from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { useEmotion } from '../../lib/theming/Emotion';
import { isIE11 } from '../../lib/client';
import { useTheme } from '../../lib/theming/useTheme';

import { getStyles } from './MiniModal.styles';
import { MiniModalDataTids } from './MiniModal';

/**
 * Отступ между кнопками
 *
 * @visibleName MiniModal.Indent
 */
export const MiniModalIndent = forwardRefAndName<HTMLDivElement, unknown>(
  'MiniModalIndent',
  ({ children, ...rest }, ref) => {
    const theme = useTheme();
    const emotion = useEmotion();
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
