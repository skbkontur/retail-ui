import type { ReactNode } from 'react';
import React, { useContext } from 'react';

import { ComboBoxMenuDataTids } from '../../internal/CustomComboBox/ComboBoxMenu.js';
import { CustomComboBoxLocaleHelper } from '../../internal/CustomComboBox/locale/index.js';
import { Menu, MenuDataTids } from '../../internal/Menu/index.js';
import { MenuMessage } from '../../internal/MenuMessage/index.js';
import { LocaleContext } from '../../lib/locale/LocaleContext.js';
import type { SizeProp } from '../../lib/types/props.js';
import type { Nullable } from '../../typings/utility-types.js';
import { MenuItem } from '../MenuItem/index.js';

interface TokenInputFailedMenuProps {
  refMenu?: (menu: Nullable<Menu>) => void;
  maxMenuHeight?: number | string;
  size?: SizeProp;
  isMobile?: boolean;
  menuId?: string;
  hasMargin?: boolean;
  repeatRequest?: () => void;
  renderAddButton?: () => ReactNode;
}

export function TokenInputFailedMenu(props: TokenInputFailedMenuProps) {
  const { locale: localeFromContext, langCode } = useContext(LocaleContext);
  const { errorNetworkButton, errorNetworkMessage } = {
    ...CustomComboBoxLocaleHelper.get(langCode),
    ...localeFromContext?.ComboBox,
  };

  const maxHeight = props.isMobile ? 'auto' : props.maxMenuHeight;

  return (
    <Menu
      ref={props.refMenu}
      maxHeight={maxHeight}
      hasMargin={props.hasMargin}
      disableScrollContainer={props.isMobile}
      id={props.menuId}
      data-tid={`${ComboBoxMenuDataTids.failed} ${MenuDataTids.root}`}
    >
      <MenuMessage size={props.size} key="message">
        <div style={{ maxWidth: 300, whiteSpace: 'normal' }}>{errorNetworkMessage}</div>
      </MenuMessage>
      <MenuItem onClick={props.repeatRequest} size={props.size} key="retry" isMobile={props.isMobile}>
        {errorNetworkButton}
      </MenuItem>
      {props.renderAddButton?.()}
    </Menu>
  );
}
