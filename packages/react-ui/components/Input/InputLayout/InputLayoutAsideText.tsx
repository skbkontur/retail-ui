import React from 'react';

import { useEmotion, useStyles } from '../../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { isThemeGTE } from '../../../lib/theming/ThemeHelpers.js';
import type { InputProps } from '../Input.js';
import { getStylesLayout } from './InputLayout.styles.js';
import { InputLayoutContext } from './InputLayoutContext.js';

export interface InputLayoutAsideTextProps {
  text: InputProps['prefix'] | InputProps['suffix'];
}

export const InputLayoutAsideText: React.FunctionComponent<InputLayoutAsideTextProps> = ({ text = null }) => {
  const theme = React.useContext(ThemeContext);
  const { cx } = useEmotion();
  const stylesLayout = useStyles(getStylesLayout);
  const { disabled } = React.useContext(InputLayoutContext);
  const themeGTE6_4 = isThemeGTE(theme, '6.4');
  const asideClassName = stylesLayout.aside();

  return text ? (
    <span
      className={cx(
        asideClassName,
        stylesLayout.text(theme),
        themeGTE6_4 && stylesLayout.text6_4(theme),
        disabled && stylesLayout.textDisabled(theme),
      )}
    >
      {text}
    </span>
  ) : null;
};
