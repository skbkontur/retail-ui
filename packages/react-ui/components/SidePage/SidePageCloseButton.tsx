import React, { useContext, useState } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { CrossIcon } from '../../internal/icons/CrossIcon';
import { cx } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';

import { styles } from './SidePage.styles';
import { SidePageLocaleHelper } from './locale';
import { SidePageHeaderDataTids } from './SidePageHeader';
import { SidePageContext } from './SidePageContext';

export const SidePageCloseButton = () => {
  const [isFocusedByTab, setIsFocusedByTab] = useState(false);

  const locale = useLocaleForControl('SidePage', SidePageLocaleHelper);
  const theme = useContext(ThemeContext);
  const sidePageContext = useContext(SidePageContext);

  const handleFocus = () => {
    requestAnimationFrame(() => {
      if (keyListener.isTabPressed) {
        setIsFocusedByTab(true);
      }
    });
  };

  const handleBlur = () => {
    setIsFocusedByTab(false);
  };

  return (
    <button
      aria-label={locale?.closeButtonAriaLabel}
      className={cx(styles.close(theme), {
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
