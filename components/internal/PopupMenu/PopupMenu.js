// @flow
import * as React from 'react';
import InternalMenu from '../InternalMenu/InternalMenu';
import Popup from '../../Popup';
import RenderLayer from '../../RenderLayer';
import type MenuItem from '../../MenuItem/MenuItem';
import PopupMenuPositions, {
  DropdownMenuPositions
} from './PopupMenuPositions';
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
  /** Тип меню */
  type: 'dropdown' | 'tooltip'
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
    type: PopupMenuType.Tooltip
  };

  static Type = PopupMenuType;

  _captionWrapper: HTMLSpanElement | null = null;
  _savedFocusableElement: HTMLElement | null = null;

  state = {
    menuVisible: false,
    firstItemShouldBeSelected: false
  };

  _getPositions() {
    if (this._isDropdownMenu()) {
      return DropdownMenuPositions;
    }
    if (this._isTooltipMenu()) {
      if (isValidPostions(this.props.positions)) {
        return this.props.positions;
      } else {
        return PopupMenuPositions;
      }
    }
    throw new Error('Prop type is not specified');
  }

  _isDropdownMenu(): boolean {
    return this.props.type === PopupMenuType.Dropdown;
  }

  _isTooltipMenu(): boolean {
    return this.props.type === PopupMenuType.Tooltip;
  }

  _showMenu = (firstItemShouldBeSelected?: boolean): void => {
    this._saveFocus();
    this.setState({ menuVisible: true, firstItemShouldBeSelected });
  };

  _hideMenu = (restoreFocus?: boolean): void => {
    this.setState({ menuVisible: false, firstItemShouldBeSelected: false });

    if (restoreFocus) {
      this._restoreFocus();
    }
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
        this._hideMenu(true);
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

  render() {
    const menuTypeIsTooltip = this._isTooltipMenu();

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
                positions={this._getPositions()}
                opened={this.state.menuVisible}
                margin={menuTypeIsTooltip ? 10 : 0}
                hasShadow
                hasPin={menuTypeIsTooltip}
                pinOffset={menuTypeIsTooltip ? 16 : 0}
              >
                <InternalMenu
                  hasShadow={false}
                  maxHeight={this.props.menuMaxHeight || 'none'}
                  onKeyDown={this._handleKeyDown}
                  width={this.props.menuWidth || 'auto'}
                  onItemClick={() => this._hideMenu(true)}
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
