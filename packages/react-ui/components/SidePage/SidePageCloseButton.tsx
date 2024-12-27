import React, { useContext, useState } from 'react';
import { globalObject } from '@skbkontur/global-object';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { XIcon20Regular } from '../../internal/icons2022/XIcon/XIcon20Regular';
import { cx } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';
import { CommonProps } from '../../internal/CommonWrapper';

import { styles } from './SidePage.styles';
import { SidePageLocaleHelper } from './locale';
import { SidePageHeaderDataTids } from './SidePageHeader';
import { SidePageContext } from './SidePageContext';

export interface SidePageCloseButtonProps extends CommonProps {
  isHeaderFixed: boolean;
  isMobile?: boolean;
}

export const SidePageCloseButton = ({ isHeaderFixed, isMobile }: SidePageCloseButtonProps) => {
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

  const icon = <XIcon20Regular align="none" />;
  return (
    <button
      aria-label={locale?.closeButtonAriaLabel}
      className={cx(styles.close(theme), {
        [styles.closeFocus(theme)]: isFocusedByTab,
        [styles.closeSticky(theme)]: isHeaderFixed,
        [styles.closeMobile(theme)]: isMobile,
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
