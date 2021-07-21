import React from 'react';

import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Popup } from '../../internal/Popup';
import { DropdownContainer} from '../../internal/DropdownContainer';
import { ComboBoxMenu, ComboBoxMenuProps } from '../../internal/CustomComboBox';
import { Menu } from '../../internal/Menu';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { is8pxTheme } from '../../lib/theming/ThemeHelpers';

export interface TokenInputMenuProps<T> extends ComboBoxMenuProps<T> {
  anchorElement: HTMLElement;
  wrapper: HTMLLabelElement | null;
  useTokenInputMenu?: 'DropdownMenu' | 'PopupMenu';
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

  private renderMain() {
    const { useTokenInputMenu } = this.props;

    return (
      useTokenInputMenu === 'PopupMenu' ? this.renderPopupMenu() : this.renderDropdownMenu()
    );
  }

  private renderPopupMenu() {
    const { opened } = this.props;
    return (
      <Popup
        opened={opened!}
        positions={['bottom left']}
        anchorElement={this.props.anchorElement}
        popupOffset={5}
        hasShadow={is8pxTheme(this.theme)}
      >
        {this.renderComboBoxMenu()}
      </Popup>
    )
  }

  private renderDropdownMenu() {
    return (
      <DropdownContainer
        getParent={() => this.props.wrapper}
        offsetY={1}
      >
        {this.renderComboBoxMenu()}
      </DropdownContainer>
    )
  }
  private renderComboBoxMenu() {
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
    } = this.props;
    return (
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
    )
  }

  private getPopupMargin = (): number => {
    const paddingY = parseInt(this.theme.tokenInputPaddingY, 10) || 0;
    const outlineWidth = parseInt(this.theme.controlOutlineWidth, 10) || 0;
    const marginY = parseInt(this.theme.tokenMarginY, 10) || 0;
    return paddingY + outlineWidth + marginY;
  };

  private menuRef = (node: any) => (this.menu = node);
}
