import React, { useContext, useState } from 'react';
import { globalObject } from '@skbkontur/global-object';

import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { CrossIcon } from '../../internal/icons/CrossIcon';
import { useEmotion } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';
import { useTheme } from '../../lib/theming/useTheme';

import { getStyles } from './SidePage.styles';
import { SidePageLocaleHelper } from './locale';
import { SidePageHeaderDataTids } from './SidePageHeader';
import { SidePageContext } from './SidePageContext';

export const SidePageCloseButton = () => {
  const emotion = useEmotion();
  const [isFocusedByTab, setIsFocusedByTab] = useState(false);

  const locale = useLocaleForControl('SidePage', SidePageLocaleHelper);
  const theme = useTheme();
  const sidePageContext = useContext(SidePageContext);

  const handleFocus = () => {
    globalObject.requestAnimationFrame?.(() => {
      if (keyListener.isTabPressed) {
        setIsFocusedByTab(true);
      }
    });
  };

  const handleBlur = () => {
    setIsFocusedByTab(false);
  };

  const styles = getStyles(emotion);

  return (
    <button
      aria-label={locale?.closeButtonAriaLabel}
      className={emotion.cx(styles.close(theme), {
        [styles.closeFocus(theme)]: isFocusedByTab,
      })}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={sidePageContext.requestClose}
      data-tid={SidePageHeaderDataTids.close}
    >
      <CrossIcon />
    </button>
  );
};

SidePageCloseButton.__KONTUR_REACT_UI__ = 'SidePageCloseButton';
SidePageCloseButton.displayName = 'SidePageCloseButton';
