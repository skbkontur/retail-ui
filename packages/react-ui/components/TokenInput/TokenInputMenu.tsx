import React from 'react';

import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Popup } from '../../internal/Popup';
import { ComboBoxMenu, ComboBoxMenuProps } from '../../internal/CustomComboBox';
import { Menu } from '../../internal/Menu';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { TokenInputMenuAlign, TokenInputProps } from './TokenInput';

export interface TokenInputMenuProps<T> extends ComboBoxMenuProps<T> {
  anchorElement: HTMLElement;
  menuWidth: TokenInputProps<string>['menuWidth'];
  menuAlign: TokenInputMenuAlign;
}

export const tokenInputMenuDataTid = {
  origin: 'TokenInputMenu',
  root: 'TokenInputMenu__root',
};

export class TokenInputMenu<T = string> extends React.Component<TokenInputMenuProps<T>> {
  public static __KONTUR_REACT_UI__ = 'TokenInputMenu';

  private theme!: Theme;

  private menu: Menu | null = null;

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <ThemeContext.Provider
              value={ThemeFactory.create(
                {
                  popupMargin: this.getPopupMargin() + 'px',
                },
                theme,
              )}
            >
              {this.renderMain()}
            </ThemeContext.Provider>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  public getMenuRef = (): any | null => this.menu;

  private renderMain() {
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
      anchorElement,
      menuWidth,
      menuAlign,
    } = this.props;

    return (
      <Popup
        data-tid={tokenInputMenuDataTid.root}
        opened={opened!}
        positions={['bottom left', 'top left']}
        anchorElement={anchorElement}
        popupOffset={menuAlign === 'left' ? 0 : 5}
        margin={menuAlign === 'left' ? 1 : undefined}
        hasShadow
        width={menuAlign === 'cursor' ? 'auto' : menuWidth}
        withoutMobile
      >
        <ComboBoxMenu
          items={items}
          loading={loading}
          maxMenuHeight={maxMenuHeight}
          onValueChange={onValueChange}
          opened={opened}
          refMenu={this.menuRef}
          renderTotalCount={renderTotalCount}
          renderItem={renderItem}
          renderNotFound={renderNotFound}
          totalCount={totalCount}
          renderAddButton={renderAddButton}
        />
      </Popup>
    );
  }

  private getPopupMargin = (): number => {
    const paddingY = parseInt(this.theme.tokenInputPaddingY, 10) || 0;
    const outlineWidth = parseInt(this.theme.controlOutlineWidth, 10) || 0;
    const marginY = parseInt(this.theme.tokenMarginY, 10) || 0;
    return paddingY + outlineWidth + marginY;
  };

  private menuRef = (node: any) => (this.menu = node);
}
