import type { ReactElement, ReactNode } from 'react';
import React from 'react';

import type { ComboBoxMenuProps } from '../../internal/CustomComboBox/index.js';
import { ComboBoxMenu } from '../../internal/CustomComboBox/index.js';
import type { Menu } from '../../internal/Menu/index.js';
import { MobilePopup } from '../../internal/MobilePopup/index.js';
import type { HTMLProps } from '../../typings/html.js';
import type { Nullable } from '../../typings/utility-types.js';
import type { TokenSize } from '../Token/index.js';

export interface TokenInputMobileMenuProps<T> extends ComboBoxMenuProps<T> {
  /** Задает id выпадающему меню.
   Полезно при реализации a11y. Например, помогает связать aria-controls с выпадающим меню. */
  popupMenuId?: HTMLProps['id'];
  /** Задает размер контрола. */
  size?: TokenSize;
  /** Компонент для футера в мобильном попапе */
  mobileFooterComponent?: ReactNode;
  /** Функция вызываем при клике по вуали в мобильном модале */
  onCloseRequest?: () => void;
}

export class TokenInputMobileMenu<T = string> extends React.Component<TokenInputMobileMenuProps<T>> {
  public static __KONTUR_REACT_UI__ = 'TokenInputMobileMenu';
  public static displayName = 'TokenInputMobileMenu';

  private menu: Menu | null = null;

  public getMenuRef = (): Menu | null => this.menu;

  public render(): ReactElement {
    const {
      loading,
      maxMenuHeight,
      renderTotalCount,
      totalCount,
      opened,
      items,
      renderNotFound,
      renderItem,
      onValueChange,
      renderAddButton,
      onCloseRequest,
    } = this.props;

    return (
      <MobilePopup
        opened
        footerChildComponent={this.props.mobileFooterComponent}
        size={this.props.size}
        id={this.props.popupMenuId}
        onCloseRequest={onCloseRequest}
      >
        <ComboBoxMenu
          size={this.props.size}
          items={items}
          loading={loading}
          hasMargin={false}
          refMenu={this.menuRef}
          maxMenuHeight={maxMenuHeight}
          onValueChange={onValueChange}
          opened={opened}
          renderTotalCount={renderTotalCount}
          renderItem={renderItem}
          renderNotFound={renderNotFound}
          totalCount={totalCount}
          renderAddButton={renderAddButton}
        />
      </MobilePopup>
    );
  }

  private menuRef = (node: Nullable<Menu>) => {
    this.menu = node ?? null;
  };
}
