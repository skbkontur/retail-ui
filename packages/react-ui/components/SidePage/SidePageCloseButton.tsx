import React, { useContext, useState } from 'react';

import { useGlobal, useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { useLocaleForControl } from '../../lib/locale/useLocaleForControl.js';
import { XIcon20Regular } from '../../internal/icons2022/XIcon/XIcon20Regular.js';
import { useKeyListener } from '../../lib/events/keyListener.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';

import { getStyles } from './SidePage.styles.js';
import { SidePageLocaleHelper } from './locale/index.js';
import { SidePageHeaderDataTids } from './SidePageHeader.js';
import { SidePageContext } from './SidePageContext.js';

export interface SidePageCloseButtonProps extends CommonProps {
  isHeaderFixed: boolean;
  isMobile?: boolean;
}

export const SidePageCloseButton = ({ isHeaderFixed, isMobile }: SidePageCloseButtonProps): React.JSX.Element => {
  const [isFocusedByTab, setIsFocusedByTab] = useState(false);

  const locale = useLocaleForControl('SidePage', SidePageLocaleHelper);
  const globalObject = useGlobal();
  const theme = useContext(ThemeContext);
  const { cx } = useEmotion();
  const styles = useStyles(getStyles);
  const keyListener = useKeyListener();
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
