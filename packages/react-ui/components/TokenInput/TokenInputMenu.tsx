import React from 'react';

import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Popup } from '../../internal/Popup';
import { DropdownContainer } from '../../internal/DropdownContainer';
import { ComboBoxMenu, ComboBoxMenuProps } from '../../internal/CustomComboBox';
import { Menu } from '../../internal/Menu';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { is8pxTheme } from '../../lib/theming/ThemeHelpers';

export interface TokenInputMenuProps<T> extends ComboBoxMenuProps<T> {
  anchorElement: HTMLElement;
  wrapper: HTMLElement;
  useDropdownContainer: boolean;
}

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

  private renderMain = () => (
    this.props.useDropdownContainer ? this.renderDropdownContainer() : this.renderPopup()
  );

  private renderPopup() {
    return (
      <Popup
        opened={this.props.opened!}
        positions={['bottom left']}
        anchorElement={this.props.anchorElement}
        popupOffset={5}
        hasShadow={is8pxTheme(this.theme)}
      >
        {this.renderComboBoxMenu()}
      </Popup>
    );
  }

  private renderDropdownContainer = () => (
      <DropdownContainer getParent={() => this.props.wrapper} offsetY={1}>
        {this.renderComboBoxMenu()}
      </DropdownContainer>
  );

  private renderComboBoxMenu() {
    const { anchorElement, wrapper, useDropdownContainer, ...rest } = this.props;

    return (
      <ComboBoxMenu refMenu={this.menuRef} {...rest} />
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
