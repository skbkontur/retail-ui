import React, { useContext } from 'react';
import { globalObject } from '@skbkontur/global-object';

import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { XIcon20Regular } from '../../internal/icons2022/XIcon/XIcon20Regular';
import { isThemeVersionGTE } from '../../lib/theming/ThemeHelpers';

import { CloseProps } from './ModalContext';
import { styles } from './Modal.styles';
import { ModalDataTids } from './Modal';
import { ModalLocaleHelper } from './locale';

export function ModalClose({ disableClose, requestClose, ...otherProps }: CloseProps) {
  const locale = useLocaleForControl('Modal', ModalLocaleHelper);
  const theme = useContext(ThemeContext);
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
              [styles.close5_1(theme)]: isThemeVersionGTE(theme, 5, 1),
              [styles.closeMobile(theme)]: isMobile,
              [styles.closeMobile5_1(theme)]: isMobile && isThemeVersionGTE(theme, 5, 1),
              [styles.disabled(theme)]: disableClose,
              [styles.focus(theme)]: focusedByTab && !isThemeVersionGTE(theme, 5, 1),
              [styles.focus5_1(theme)]: focusedByTab && isThemeVersionGTE(theme, 5, 1),
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
