import React from 'react';

import { ComboBoxMenu } from '../../internal/CustomComboBox/index.js';
import type { ComboBoxMenuProps } from '../../internal/CustomComboBox/index.js';
import type { Menu } from '../../internal/Menu/index.js';
import type { PopupPositionsType, PopupProps } from '../../internal/Popup/index.js';
import { Popup } from '../../internal/Popup/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers.js';
import type { HTMLProps } from '../../typings/html.js';
import type { TokenSize } from '../Token/index.js';
import type { TokenInputMenuAlign, TokenInputProps } from './TokenInput.js';
import { TokenInputDataTids } from './TokenInput.js';

const cursorNearFieldEdgeTolerancePx = 1;

export interface TokenInputMenuProps<T> extends ComboBoxMenuProps<T> {
  /** html-элемент от которого будет позиционировано Menu в случае menuAlign cursor */
  anchorElementForCursor: PopupProps['anchorElement'];
  /** html-элемент от которого будет позиционировано Menu в случае menuAlign left */
  anchorElementRoot: PopupProps['anchorElement'];
  /** Задает ширину выпадающего меню. */
  menuWidth: TokenInputProps<string>['menuWidth'];
  /** Задает выравнивание выпадающего меню. */
  menuAlign: TokenInputMenuAlign;
  /** Задает id выпадающему меню.
   Полезно при реализации a11y. Например, помогает связать aria-controls с выпадающим меню. */
  popupMenuId?: HTMLProps['id'];
  /** Задает размер контрола. */
  size?: TokenSize;
}

interface TokenInputMenuState {
  forceMenuLeftAlign?: boolean;
  useRootAnchor?: boolean;
}

export class TokenInputMenu<T = string> extends React.Component<TokenInputMenuProps<T>, TokenInputMenuState> {
  public static __KONTUR_REACT_UI__ = 'TokenInputMenu';
  public static displayName = 'TokenInputMenu';

  public state: TokenInputMenuState = {};

  private theme!: Theme;

  private menu: Menu | null = null;

  public componentDidUpdate(prevProps: TokenInputMenuProps<T>) {
    if (prevProps.opened && !this.props.opened && (this.state.forceMenuLeftAlign || this.state.useRootAnchor)) {
      this.setState({ forceMenuLeftAlign: false, useRootAnchor: false });
    }
  }

  public render(): React.JSX.Element {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <ThemeContext.Provider
              value={ThemeFactory.create(
                {
                  popupBackground: this.theme.tokenInputMenuPopupBg,
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

  public getMenuRef = (): Menu | null => this.menu;

  private getLabelPaddingY(t: Theme, size: TokenSize | undefined): number {
    switch (size) {
      case 'large':
        return parseInt(t.tokenInputPaddingYLarge, 10) || 0;
      case 'medium':
        return parseInt(t.tokenInputPaddingYMedium, 10) || 0;
      case 'small':
      default:
        return parseInt(t.tokenInputPaddingYSmall, 10) || 0;
    }
  }

  private getTokenPaddingY(t: Theme, size: TokenSize | undefined): number {
    switch (size) {
      case 'large':
        return parseInt(t.tokenPaddingYLarge, 10) || 0;
      case 'medium':
        return parseInt(t.tokenPaddingYMedium, 10) || 0;
      case 'small':
      default:
        return parseInt(t.tokenPaddingYSmall, 10) || 0;
    }
  }

  private getTokenMarginY(t: Theme, size: TokenSize | undefined): number {
    switch (size) {
      case 'large':
        return parseInt(t.tokenMarginYLarge, 10) || 0;
      case 'medium':
        return parseInt(t.tokenMarginYMedium, 10) || 0;
      case 'small':
      default:
        return parseInt(t.tokenMarginYSmall, 10) || 0;
    }
  }

  private getExpectedDistanceToFieldEdge(t: Theme, size: TokenSize | undefined): number {
    const tokenPaddingY = this.getTokenPaddingY(t, size);
    const tokenBorderWidth = parseInt(t.tokenBorderWidth, 10) || 0;
    const tokenMarginY = this.getTokenMarginY(t, size);
    const labelPaddingY = this.getLabelPaddingY(t, size);
    const labelBorderWidth = parseInt(t.tokenInputBorderWidth, 10) || 0;

    return tokenPaddingY + tokenBorderWidth + tokenMarginY + labelPaddingY + labelBorderWidth;
  }

  private getAnchorRects() {
    const { anchorElementRoot, anchorElementForCursor } = this.props;
    if (!(anchorElementRoot instanceof HTMLElement) || !(anchorElementForCursor instanceof HTMLElement)) {
      return null;
    }

    return {
      root: anchorElementRoot.getBoundingClientRect(),
      cursor: anchorElementForCursor.getBoundingClientRect(),
    };
  }

  private isCursorNearFieldTop(): boolean {
    const rects = this.getAnchorRects();
    if (!rects) {
      return false;
    }

    const expected = this.getExpectedDistanceToFieldEdge(this.theme, this.props.size);
    return rects.cursor.top - rects.root.top <= expected + cursorNearFieldEdgeTolerancePx;
  }

  private isCursorNearFieldBottom(): boolean {
    const rects = this.getAnchorRects();
    if (!rects) {
      return false;
    }

    const expected = this.getExpectedDistanceToFieldEdge(this.theme, this.props.size);
    return rects.root.bottom - rects.cursor.bottom <= expected + cursorNearFieldEdgeTolerancePx;
  }

  private shouldUseRootAnchor(menuAlign: TokenInputMenuAlign): boolean {
    if (menuAlign === 'left') {
      return true;
    }

    if (!isThemeGTE(this.theme, '6.4')) {
      return false;
    }

    return !!this.state.useRootAnchor;
  }

  private shouldUpgradeToRootAnchor(position: PopupPositionsType): boolean {
    if (this.state.useRootAnchor || !isThemeGTE(this.theme, '6.4') || this.props.menuAlign !== 'cursor') {
      return false;
    }

    const direction = position.split(' ')[0];

    if (direction === 'top') {
      return this.isCursorNearFieldTop();
    }

    return this.isCursorNearFieldBottom();
  }

  private getPopupMargin(menuAlign: TokenInputMenuAlign): number {
    const t = this.theme;
    const menuOffsetY = parseInt(t.tokenInputMenuOffsetY, 10) || 0;

    if (isThemeGTE(t, '6.4')) {
      return menuOffsetY;
    }

    if (menuAlign === 'left') {
      return 1;
    }

    switch (this.props.size) {
      case 'large':
        return parseInt(t.tokenInputPopupMarginLarge, 10) || 0;
      case 'medium':
        return parseInt(t.tokenInputPopupMarginMedium, 10) || 0;
      case 'small':
      default:
        return parseInt(t.tokenInputPopupMarginSmall, 10) || 0;
    }
  }

  private getPopupOffset(menuAlign: TokenInputMenuAlign, useRootAnchor: boolean): number {
    const baseOffset = parseInt(this.theme.tokenInputPopupOffset, 10) || 0;

    if (menuAlign === 'left') {
      return baseOffset;
    }

    const cursorOffset = 8 + baseOffset;
    if (!useRootAnchor) {
      return cursorOffset;
    }

    const rects = this.getAnchorRects();
    if (!rects) {
      return cursorOffset;
    }

    return rects.root.left - rects.cursor.left + cursorOffset;
  }

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
      anchorElementForCursor,
      anchorElementRoot,
      menuWidth,
    } = this.props;

    const menuAlign = this.state.forceMenuLeftAlign ? 'left' : this.props.menuAlign;
    const isCursorAlign = menuAlign === 'cursor';
    const useRootAnchor = this.shouldUseRootAnchor(menuAlign);

    return (
      <Popup
        id={this.props.popupMenuId}
        data-tid={TokenInputDataTids.tokenInputMenu}
        opened={!!opened}
        positions={
          isCursorAlign ? ['bottom left', 'top left'] : ['bottom left', 'top left', 'bottom right', 'top right']
        }
        anchorElement={useRootAnchor ? anchorElementRoot : anchorElementForCursor}
        popupOffset={this.getPopupOffset(menuAlign, useRootAnchor)}
        margin={this.getPopupMargin(menuAlign)}
        hasShadow
        width={isCursorAlign ? 'auto' : menuWidth}
        onPositionChange={this.handleMenuPositionChange}
      >
        <ComboBoxMenu
          size={this.props.size}
          items={items}
          loading={loading}
          hasMargin={false}
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

  private handleMenuPositionChange = (position: PopupPositionsType, isFullyVisible: boolean) => {
    const nextState: Partial<TokenInputMenuState> = {};

    if (this.shouldUpgradeToRootAnchor(position)) {
      nextState.useRootAnchor = true;
    }

    if (!this.state.forceMenuLeftAlign && !isFullyVisible && this.props.menuAlign === 'cursor') {
      nextState.forceMenuLeftAlign = true;
    }

    if (Object.keys(nextState).length > 0) {
      this.setState(nextState);
    }
  };

  private menuRef = (node: any) => (this.menu = node);
}
