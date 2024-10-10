import React, { AriaAttributes } from 'react';
import { globalObject } from '@skbkontur/global-object';

import { cx } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonWrapper, CommonProps } from '../CommonWrapper';

import { styles } from './CleanCrossIcon.styles';
import { CrossIcon } from './CrossIcon';
import { SizeProp } from '../../lib/types/props';
import { TokenSize } from '../../components/Token';

export interface CleanCrossIconProps
  extends Pick<AriaAttributes, 'aria-label'>,
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    CommonProps {
  /** Ширина и высота иконки крестика
   * @default small */
  size?: SizeProp;

  /** Возможность сфокусироваться на кнопке клавишей TAB
   * @default true */
  tabbable?: boolean;
}

export const CleanCrossIcon: React.FunctionComponent<CleanCrossIconProps> = ({
  size = 'small',
  tabbable = true,
  style,
  ...rest
}) => {
  const theme = React.useContext(ThemeContext);
  const getSizeClassName = (size: TokenSize) => {
    switch (size) {
      case 'large':
        return styles.cleanCrossLarge(theme);
      case 'medium':
        return styles.cleanCrossMedium(theme);
      case 'small':
      default:
        return styles.cleanCrossSmall(theme);
    }
  };

  const [focusedByTab, setFocusedByTab] = React.useState(false);

  const handleFocus = () => {
    // focus event fires before keyDown eventlistener so we should check tabPressed in async way
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
          getSizeClassName(size),
        )}
        style={{ ...style }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      >
        <span className={styles.wrapper()}>
          <CrossIcon size={size} focusable={tabIndex >= 0} />
        </span>
      </button>
    </CommonWrapper>
  );
};

CleanCrossIcon.__KONTUR_REACT_UI__ = 'CleanCrossIcon';
CleanCrossIcon.displayName = 'CleanCrossIcon';
