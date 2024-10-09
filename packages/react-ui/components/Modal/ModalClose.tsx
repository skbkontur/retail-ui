import React from 'react';
import { globalObject } from '@skbkontur/global-object';

import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { CrossIcon } from '../../internal/icons/CrossIcon';
import { useEmotion } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { XIcon20Regular } from '../../internal/icons2022/XIcon/XIcon20Regular';
import { useTheme } from '../../lib/theming/useTheme';

import { CloseProps } from './ModalContext';
import { getStyles } from './Modal.styles';
import { ModalDataTids } from './Modal';
import { ModalLocaleHelper } from './locale';

export function ModalClose({ disableClose, requestClose, ...otherProps }: CloseProps) {
  const emotion = useEmotion();
  const locale = useLocaleForControl('Modal', ModalLocaleHelper);
  const theme = useTheme();
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

  const icon = isTheme2022(theme) ? <XIcon20Regular align="none" /> : <CrossIcon />;
  const styles = getStyles(emotion);

  return (
    <CommonWrapper {...otherProps}>
      <ResponsiveLayout>
        {({ isMobile }) => (
          <button
            aria-label={locale.closeButtonAriaLabel}
            className={emotion.cx({
              [styles.close(theme)]: true,
              [styles.mobileClose(theme)]: isMobile,
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
