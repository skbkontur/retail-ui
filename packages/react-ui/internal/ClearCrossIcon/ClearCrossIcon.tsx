import React, { AriaAttributes } from 'react';
import { globalObject } from '@skbkontur/global-object';

import { cx } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonWrapper, CommonProps } from '../CommonWrapper';
import { SizeProp } from '../../lib/types/props';
import { TokenSize } from '../../components/Token';

import { styles } from './ClearCrossIcon.styles';
import { CrossIcon } from './CrossIcon';

export interface ClearCrossIconProps
  extends Pick<AriaAttributes, 'aria-label'>,
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    CommonProps {
  /** Ширина и высота иконки крестика
   * @default small */
  size?: SizeProp;
}

export const ClearCrossIcon: React.FunctionComponent<ClearCrossIconProps> = ({ size = 'small', style, ...rest }) => {
  const theme = React.useContext(ThemeContext);
  const getSizeClassName = (size: TokenSize) => {
    switch (size) {
      case 'large':
        return styles.clearCrossLarge(theme);
      case 'medium':
        return styles.clearCrossMedium(theme);
      case 'small':
      default:
        return styles.clearCrossSmall(theme);
    }
  };

  const [focusedByTab, setFocusedByTab] = React.useState<boolean>(false);

  const handleFocus = () => {
    // focus event fires before keyDown eventlistener so we should check tabPressed in async way
    globalObject.requestAnimationFrame?.(() => {
      if (keyListener.isTabPressed) {
        setFocusedByTab(true);
      }
    });
  };
  const handleBlur = () => setFocusedByTab(false);

  return (
    <CommonWrapper {...rest}>
      <button
        type="button"
        tabIndex={-1}
        className={cx(
          styles.root(theme),
          // Todo: use &:focus-visible on root instead styles.focus. It supported on Chrome >= 86, Firefox >= 4, Safari >= 15.4
          focusedByTab && styles.focus(theme),
          getSizeClassName(size),
        )}
        style={style}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      >
        <CrossIcon size={size} focusable />
      </button>
    </CommonWrapper>
  );
};

ClearCrossIcon.__KONTUR_REACT_UI__ = 'ClearCrossIcon';
ClearCrossIcon.displayName = 'ClearCrossIcon';
