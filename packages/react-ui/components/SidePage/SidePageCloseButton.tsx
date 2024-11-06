import React, { useContext, useState } from 'react';
import { globalObject } from '@skbkontur/global-object';

import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { XIcon20Regular } from '../../internal/icons2022/XIcon/XIcon20Regular';
import { EmotionContext } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './SidePage.styles';
import { SidePageLocaleHelper } from './locale';
import { SidePageHeaderDataTids } from './SidePageHeader';
import { SidePageContext } from './SidePageContext';

export const SidePageCloseButton = () => {
  const emotion = useContext(EmotionContext);
  const [isFocusedByTab, setIsFocusedByTab] = useState(false);

  const locale = useLocaleForControl('SidePage', SidePageLocaleHelper);
  const theme = useContext(ThemeContext);
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
  const icon = <XIcon20Regular align="none" />;

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
      {icon}
    </button>
  );
};

SidePageCloseButton.__KONTUR_REACT_UI__ = 'SidePageCloseButton';
SidePageCloseButton.displayName = 'SidePageCloseButton';
