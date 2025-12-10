import React, { useContext } from 'react';

import { useGlobal, useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { useLocaleForControl } from '../../lib/locale/useLocaleForControl.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { useKeyListener } from '../../lib/events/keyListener.js';
import { ResponsiveLayout } from '../ResponsiveLayout/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { XIcon20Regular } from '../../internal/icons2022/XIcon/XIcon20Regular.js';

import type { CloseProps } from './ModalContext.js';
import { getStyles } from './Modal.styles.js';
import { ModalDataTids } from './Modal.js';
import { ModalLocaleHelper } from './locale/index.js';

export function ModalClose({ disableClose, requestClose, ...otherProps }: CloseProps) {
  const locale = useLocaleForControl('Modal', ModalLocaleHelper);
  const globalObject = useGlobal();
  const { cx } = useEmotion();
  const styles = useStyles(getStyles);
  const theme = useContext(ThemeContext);
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

  const handleBlur = () => {
    setFocusedByTab(false);
  };

  const icon = <XIcon20Regular align="none" />;

  return (
    <CommonWrapper {...otherProps}>
      <ResponsiveLayout>
        {({ isMobile }) => (
          <button
            aria-label={locale.closeButtonAriaLabel}
            className={cx({
              [styles.close(theme)]: true,
              [styles.closeMobile(theme)]: isMobile,
              [styles.disabled(theme)]: disableClose,
              [styles.focus(theme)]: focusedByTab,
            })}
            onClick={requestClose}
            onFocus={handleFocus}
            onBlur={handleBlur}
            data-tid={ModalDataTids.close}
            tabIndex={disableClose ? -1 : 0}
          >
            {icon}
          </button>
        )}
      </ResponsiveLayout>
    </CommonWrapper>
  );
}

ModalClose.__KONTUR_REACT_UI__ = 'ModalClose';
ModalClose.displayName = 'ModalClose';
