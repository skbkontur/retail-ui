import type { AriaAttributes } from 'react';
import React from 'react';
import { globalObject } from '@skbkontur/global-object';

import { cx } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { CommonProps } from '../CommonWrapper';
import { CommonWrapper } from '../CommonWrapper';
import type { SizeProp } from '../../lib/types/props';
import type { TokenSize } from '../../components/Token';

import { styles } from './ClearCrossIcon.styles';
import { CrossIcon } from './CrossIcon';

export interface ClearCrossIconProps
  extends Pick<AriaAttributes, 'aria-label'>,
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    CommonProps {
  /** Ширина и высота иконки крестика
   * @default small */
  size?: SizeProp;
  'data-tid'?: string;
}

export const ClearCrossIcon: React.FunctionComponent<ClearCrossIconProps> = ({
  size = 'small',
  style,
  'data-tid': dataTid,
  ...rest
}) => {
  const theme = React.useContext(ThemeContext);
  const getSizeClassNames = (size: TokenSize) => {
    switch (size) {
      case 'large':
        return { button: styles.clearCrossLarge(theme), span: styles.relativeWidthLarge(theme) };
      case 'medium':
        return { button: styles.clearCrossMedium(theme), span: styles.relativeWidthMedium(theme) };
      case 'small':
      default:
        return { button: styles.clearCrossSmall(theme), span: styles.relativeWidthSmall(theme) };
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
      <span className={getSizeClassNames(size).span}>
        <button
          data-tid={dataTid}
          type="button"
          tabIndex={-1}
          className={cx(
            styles.root(theme),
            // Todo: use &:focus-visible on root instead styles.focus. It supported on Chrome >= 86, Firefox >= 4, Safari >= 15.4
            focusedByTab && styles.focus(theme),
            getSizeClassNames(size).button,
          )}
          style={style}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        >
          <CrossIcon size={size} focusable />
        </button>
      </span>
    </CommonWrapper>
  );
};

ClearCrossIcon.__KONTUR_REACT_UI__ = 'ClearCrossIcon';
ClearCrossIcon.displayName = 'ClearCrossIcon';
