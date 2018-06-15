
import * as React from 'react';
import InternalMenu from '../InternalMenu/InternalMenu';
import Popup from '../../Popup';
import RenderLayer from '../../RenderLayer';
import type MenuItem from '../../MenuItem/MenuItem';
import PopupMenuPositions from './PopupMenuPositions';
import isValidPostions from './validatePositions';
import styles from './PopupMenu.less';

type Props = {
  children?: React.ChildrenArray<React.Element<Class<MenuItem>>>,
  /** Максимальная высота меню */
  menuMaxHeight?: number | string,
  /** Ширина меню */
  menuWidth?: number | string,
  /** Элемент (обязательный), раскрывающий меню */
  caption: React.Element<*>,
  /**  Массив разрешенных положений меню относительно caption'а. */
  positions: Array<string>,
  /** Колбэк, вызываемый после открытия/закрытия меню */
  onChangeMenuState?: (boolean, boolean) => void,
  /** Пропсы, передающиеся в Popup */
  popupHasPin: boolean,
  popupMargin: number,
  popupPinOffset: number
};

type State = {
  menuVisible: boolean,
  firstItemShouldBeSelected?: boolean
};

export const PopupMenuType = {
  Dropdown: 'dropdown',
  Tooltip: 'tooltip'
};

export default class PopupMenu extends React.Component<Props, State> {
  static defaultProps = {
    positions: PopupMenuPositions,
    type: PopupMenuType.Tooltip,
    popupHasPin: true
  };

  static Type = PopupMenuType;

  _captionWrapper: HTMLSpanElement | null = null;
  _savedFocusableElement: HTMLElement | null = null;

  state = {
    menuVisible: false,
    firstItemShouldBeSelected: false
  };

  _getPositions() {
    if (isValidPostions(this.props.positions)) {
      return this.props.positions;
    }

    return PopupMenuPositions;
  }

  _showMenu = (firstItemShouldBeSelected?: boolean): void => {
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

  _hideMenu = (restoreFocus?: boolean): void => {
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

  _toggleMenu = (): void => {
    this.state.menuVisible ? this._hideMenu() : this._showMenu();
  };

  _handleCaptionClick = (): void => {
    this._toggleMenu();
  };

  _handleCaptionKeyDown = (
    event: SyntheticKeyboardEvent<HTMLElement>
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

  _handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case 'Escape':
        const restoreFocus = true;
        this._hideMenu(restoreFocus);
        break;

      default:
        break;
    }
  };

  _saveFocus = (): void => {
    if (document) {
      this._savedFocusableElement = document.activeElement;
    }
  };

  _restoreFocus = (): void => {
    if (this._savedFocusableElement) {
      this._savedFocusableElement.focus();
      this._savedFocusableElement = null;
    }
  };

  _handleChangeMenuVisible = (focusShouldBeRestored: boolean): void => {
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

  _handleItemSelection = (eventType: string): void => {
    const restoreFocus = eventType === 'keydown';
    this._hideMenu(restoreFocus);
  };

  render() {
    return (
      <RenderLayer
        onClickOutside={() => this._hideMenu()}
        onFocusOutside={() => this._hideMenu()}
        active={this.state.menuVisible}
      >
        <div className={styles.container}>
          <span
            onClick={this._handleCaptionClick}
            onKeyDown={this._handleCaptionKeyDown}
            ref={element => (this._captionWrapper = element)}
            className={styles.caption}
          >
            {this.props.caption}
          </span>
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
}
