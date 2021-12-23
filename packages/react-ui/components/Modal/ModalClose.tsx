import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CrossIcon } from '../../internal/icons/CrossIcon';
import { cx } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';
import { ResponsiveLayout } from '../ResponsiveLayout';

import { CloseProps, ModalContext } from './ModalContext';
import { styles } from './Modal.styles';

export function ModalClose({ disableClose, requestClose }: CloseProps) {
  const theme = useContext(ThemeContext);
  const modal = useContext(ModalContext);
  const [focusedByTab, setFocusedByTab] = React.useState(false);

  const handleFocus = () => {
    // focus event fires before keyDown eventlistener
    // so we should check tabPressed in async way
    requestAnimationFrame(() => {
      if (keyListener.isTabPressed) {
        setFocusedByTab(true);
      }
    });
  };

  const handleBlur = () => {
    setFocusedByTab(false);
  };

  return (
    <ResponsiveLayout>
      {({ isMobile }) => (
        <button
          className={cx({
            [styles.close(theme)]: true,
            [styles.mobileClose(theme)]: isMobile,
            [styles.mobileCloseWithoutHeader(theme)]: !modal.hasHeader && isMobile,
            [styles.disabled(theme)]: disableClose,
            [styles.focus(theme)]: focusedByTab,
          })}
          onClick={requestClose}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-tid="modal-close"
          tabIndex={disableClose ? -1 : 0}
        >
          <CrossIcon />
        </button>
      )}
    </ResponsiveLayout>
  );
}
