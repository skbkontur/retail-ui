import * as React from 'react';
import InternalMenu from '../InternalMenu/InternalMenu';
import Popup from '../../Popup';
import RenderLayer from '../../RenderLayer';
import PopupMenuPositions from './PopupMenuPositions';
import isValidPostions from './validatePositions';
import styles from './PopupMenu.less';

export interface PopupMenuCaptionProps {
  opened: boolean;
  openMenu: (firstItemShouldBeSelected?: boolean) => void;
  closeMenu: (restoreFocus?: boolean) => void;
  toggleMenu: () => void;
}

export interface PopupMenuProps {
  children?: React.ReactNode;
  /** Максимальная высота меню */
  menuMaxHeight?: number | string;
  /** Ширина меню */
  menuWidth?: number | string;

  /**
   * Элемент или функция возвращающая элемент,
   * если передана, используется вместо ```caption```,
   * в таком случае управлять открытием и закрытием меню
   * придется в этой функции
   */
  caption:
    | React.ReactNode
    | ((props: PopupMenuCaptionProps) => React.ReactNode);
  /**  Массив разрешенных положений меню относительно caption'а. */
  positions?: string[];
  /** Колбэк, вызываемый после открытия/закрытия меню */
  onChangeMenuState?: (x0: boolean, x1: boolean) => void;
  /** Пропсы, передающиеся в Popup */
  popupHasPin?: boolean;
  popupMargin?: number;
  popupPinOffset?: number;
  type?: 'dropdown' | 'tooltip';
}

interface PopupMenuState {
  menuVisible: boolean;
  firstItemShouldBeSelected?: boolean;
}

export const PopupMenuType = {
  Dropdown: 'dropdown',
  Tooltip: 'tooltip'
};

export default class PopupMenu extends React.Component<
  PopupMenuProps,
  PopupMenuState
> {
  public static defaultProps = {
    positions: PopupMenuPositions,
    type: PopupMenuType.Tooltip,
    popupHasPin: true,
    popupMargin: 0
  };

  public static Type = PopupMenuType;

  public state = {
    menuVisible: false,
    firstItemShouldBeSelected: false
  };

  private _captionWrapper: HTMLSpanElement | null = null;
  private _savedFocusableElement: HTMLElement | null = null;

  public render() {
    return (
      <RenderLayer
        onClickOutside={this.hideMenuWithoutFocusing}
        onFocusOutside={this.hideMenuWithoutFocusing}
        active={this.state.menuVisible}
      >
        <div className={styles.container}>
          {this.renderCaption()}
          {this._captionWrapper &&
            this.props.children && (
              <Popup
                anchorElement={this._captionWrapper}
                opened={this.state.menuVisible}
                hasShadow
                margin={this.props.popupMargin}
                hasPin={this.props.popupHasPin}
                pinOffset={this.props.popupPinOffset}
                positions={this._getPositions()}
              >
                <InternalMenu
                  hasShadow={false}
                  maxHeight={this.props.menuMaxHeight || 'none'}
                  onKeyDown={this._handleKeyDown}
                  width={this.props.menuWidth || 'auto'}
                  onItemClick={this._handleItemSelection}
                  cyclicSelection={false}
                  initialSelectedItemIndex={
                    this.state.firstItemShouldBeSelected ? 0 : -1
                  }
                >
                  {this.props.children}
                </InternalMenu>
              </Popup>
            )}
        </div>
      </RenderLayer>
    );
  }

  private renderCaption = () => {
    if (typeof this.props.caption === 'function') {
      const caption = this.props.caption({
        opened: this.state.menuVisible,
        openMenu: this._showMenu,
        closeMenu: this._hideMenu,
        toggleMenu: this._toggleMenu
      });

      return (
        <span
          className={styles.caption}
          ref={element => (this._captionWrapper = element)}
        >
          {caption}
        </span>
      );
    }

    return (
      <span
        onClick={this._handleCaptionClick}
        onKeyDown={this._handleCaptionKeyDown}
        ref={element => (this._captionWrapper = element)}
        className={styles.caption}
      >
        {this.props.caption}
      </span>
    );
  };

  private hideMenuWithoutFocusing = () => this._hideMenu();

  private _getPositions() {
    if (this.props.positions && isValidPostions(this.props.positions)) {
      return this.props.positions;
    }

    return PopupMenuPositions;
  }

  private _showMenu = (firstItemShouldBeSelected?: boolean): void => {
    this._saveFocus();
    this.setState(
      {
        menuVisible: true,
        firstItemShouldBeSelected
      },
      () => {
        this._handleChangeMenuVisible(false);
      }
    );
  };

  private _hideMenu = (restoreFocus?: boolean): void => {
    this.setState(
      {
        menuVisible: false,
        firstItemShouldBeSelected: false
      },
      () => {
        this._handleChangeMenuVisible(!!restoreFocus);
      }
    );
  };

  private _toggleMenu = (): void => {
    this.state.menuVisible ? this._hideMenu() : this._showMenu();
  };

  private _handleCaptionClick = (): void => {
    this._toggleMenu();
  };

  private _handleCaptionKeyDown = (
    event: React.KeyboardEvent<HTMLElement>
  ): void => {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        this._showMenu(true);
        break;

      default:
        break;
    }
  };

  private _handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case 'Escape':
        const restoreFocus = true;
        this._hideMenu(restoreFocus);
        break;

      default:
        break;
    }
  };

  private _saveFocus = (): void => {
    if (document) {
      this._savedFocusableElement = document.activeElement as HTMLElement;
    }
  };

  private _restoreFocus = (): void => {
    if (this._savedFocusableElement) {
      this._savedFocusableElement.focus();
      this._savedFocusableElement = null;
    }
  };

  private _handleChangeMenuVisible = (focusShouldBeRestored: boolean): void => {
    if (focusShouldBeRestored) {
      this._restoreFocus();
    }
    if (typeof this.props.onChangeMenuState === 'function') {
      this.props.onChangeMenuState(
        this.state.menuVisible,
        focusShouldBeRestored
      );
    }
  };

  private _handleItemSelection = (
    event: React.SyntheticEvent<HTMLElement>
  ): void => {
    if (event.isDefaultPrevented()) {
      return;
    }

    if (event.type === 'keydown') {
      event.preventDefault();
    }

    const restoreFocus = event.type === 'keydown';
    this._hideMenu(restoreFocus);
  };
}
