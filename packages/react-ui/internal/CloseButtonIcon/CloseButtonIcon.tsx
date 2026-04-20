import type { AriaAttributes, CSSProperties } from 'react';
import React from 'react';

import { useKeyListener } from '../../lib/events/keyListener.js';
import { useEmotion, useGlobal, useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';
import type { CommonProps } from '../CommonWrapper/index.js';
import { CommonWrapper } from '../CommonWrapper/index.js';
import { DEFAULT_ICON_SIZE } from '../icons2022/iconConstants.js';
import { getStyles } from './CloseButtonIcon.styles.js';
import { CrossIcon } from './CrossIcon.js';

export interface CloseButtonIconProps
  extends Pick<AriaAttributes, 'aria-label'>, React.ButtonHTMLAttributes<HTMLButtonElement>, CommonProps {
  /**
   * Ширина и высота иконки крестика
   *
   * @default 16
   */
  size?: number;
  /**
   * Ширина и высота всей кнопки
   *
   * @default 16
   */
  side?: number;
  /**
   * Цвет иконки
   *
   * Переменная темы: `closeBtnIconColor`
   */
  color?: CSSProperties['color'];
  /**
   * Цвет иконки при наведении мышью и при фокусе
   *
   * Переменная темы: `closeBtnIconHoverColor`
   */
  colorHover?: CSSProperties['color'];
  /**
   * Возможность сфокусироваться на кнопке клавишей TAB
   *
   * @default true
   * */
  tabbable?: boolean;
}

export const CloseButtonIcon: React.FunctionComponent<CloseButtonIconProps> = ({
  side = DEFAULT_ICON_SIZE,
  size = DEFAULT_ICON_SIZE,
  color,
  colorHover,
  tabbable = true,
  style,
  ...rest
}) => {
  const globalObject = useGlobal();
  const { cx } = useEmotion();
  const styles = useStyles(getStyles);
  const _theme = React.useContext(ThemeContext);
  const theme = ThemeFactory.create(
    {
      closeBtnIconColor: color ?? _theme.closeBtnIconColor,
      closeBtnIconHoverColor: colorHover ?? _theme.closeBtnIconHoverColor,
    },
    _theme,
  );
  const keyListener = useKeyListener();
  const [focusedByTab, setFocusedByTab] = React.useState(false);

  const handleFocus = () => {
    // focus event fires before keyDown eventlistener
    // so we should check tabPressed in async way
    globalObject.requestAnimationFrame?.(() => {
      if (keyListener.isTabPressed) {
        setFocusedByTab(true);
      }
    });
  };
  const handleBlur = () => setFocusedByTab(false);

  const tabIndex = !tabbable || rest.disabled ? -1 : 0;

  return (
    <CommonWrapper {...rest}>
      <button
        tabIndex={tabIndex}
        className={cx(
          styles.root(theme),
          !rest.disabled && focusedByTab && styles.focus(theme),
          rest.disabled && styles.rootDisabled(theme),
        )}
        style={{ ...style, width: side, height: side }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      >
        <span className={styles.wrapper()}>
          <CrossIcon size={side < size ? side : size} focusable={tabIndex >= 0} />
        </span>
      </button>
    </CommonWrapper>
  );
};

CloseButtonIcon.__KONTUR_REACT_UI__ = 'CloseButtonIcon';
CloseButtonIcon.displayName = 'CloseButtonIcon';
