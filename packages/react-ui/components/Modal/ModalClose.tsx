import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CrossIcon } from '../../internal/icons/CrossIcon';
import { cx } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';
import { ResponsiveLayout } from '../ResponsiveLayout';

import { CloseProps } from './ModalContext';
import { styles } from './Modal.styles';

interface CloseComponentProps extends CloseProps {
  withoutAbsolute?: boolean;
}

export function ModalClose({ disableClose, requestClose, withoutAbsolute }: CloseComponentProps) {
  const theme = useContext(ThemeContext);
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
            [styles.disabled(theme)]: disableClose,
            [styles.focus(theme)]: focusedByTab,
            [styles.noAbsolute()]: withoutAbsolute,
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
