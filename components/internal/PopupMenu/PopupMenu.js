// @flow
import * as React from 'react';
import InternalMenu from '../InternalMenu/InternalMenu';
import Popup from '../../Popup';
import RenderLayer from '../../RenderLayer';
import type MenuItem from '../../MenuItem/MenuItem';
import availablePositions from './availablePositions';
import isValidPostions from './validatePositions';
import LayoutEvents from '../../../lib/LayoutEvents';
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
  menuVisible: boolean
};

export default class PopupMenu extends React.Component<Props, State> {
  static defaultProps = {
    positions: availablePositions
  };

  isDropdownMenu: boolean;
  isTooltipMenu: boolean;
  positions: Array<string>;
  _captionWrapper: ?HTMLSpanElement;
  _savedFocusableElement: ?HTMLElement = null;
  _menuElement: ?React.ElementRef<typeof InternalMenu>;

  constructor(props: Props) {
    super(props);

    if (!props.type) {
      throw new Error('Prop "type" is required!');
    }

    this.isDropdownMenu = props.type === 'dropdown';
    this.isTooltipMenu = props.type === 'tooltip';

    if (this.isDropdownMenu) {
      this.positions = ['bottom left', 'bottom right', 'top left', 'top right'];
    }

    if (this.isTooltipMenu) {
      if (isValidPostions(this.props.positions)) {
        this.positions = this.props.positions;
      } else {
        this.positions = availablePositions;
      }
    }

    this.state = {
      menuVisible: false
    };
  }

  _showMenu = (withForceSelect: ?boolean = false): void => {
    this._saveFocus();
    this.setState({ menuVisible: true }, () => {
      if (withForceSelect) {
        setTimeout(() => {
          if (this._menuElement) {
            this._menuElement.move(1);
          }
        }, 0);
      }
    });
  };

  _hideMenu = (restoreFocus: ?boolean = false): void => {
    this.setState({ menuVisible: false });

    if (restoreFocus) {
      this._restoreFocus();
    }
  };

  _toggleMenu = (): void => {
    this.state.menuVisible ? () => this._hideMenu() : this._showMenu();
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
        const withForceSelect = true;
        this._showMenu(withForceSelect);
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
    if (!this.isDropdownMenu && !this.isTooltipMenu) {
      return null;
    }

    return (
      <RenderLayer
        onClickOutside={() => this._hideMenu()}
        onFocusOutside={() => this._hideMenu()}
      >
        <div className={styles.container}>
          <span
            onClick={this._handleCaptionClick}
            onKeyDown={this._handleCaptionKeyDown}
            ref={element => {
              this._captionWrapper = element;
            }}
            className={styles.caption}
          >
            {this.props.caption}
          </span>
          {this._captionWrapper &&
            this.props.children && (
              <Popup
                anchorElement={this._captionWrapper}
                positions={this.positions}
                opened={this.state.menuVisible}
                margin={this.isTooltipMenu ? 10 : 0}
                hasShadow
                hasPin={this.isTooltipMenu}
              >
                <InternalMenu
                  hasShadow={false}
                  maxHeight={this.props.menuMaxHeight || 'none'}
                  onKeyDown={this._handleKeyDown}
                  width={this.props.menuWidth || 'auto'}
                  onItemClick={() => this._hideMenu(true)}
                  ref={element => {
                    this._menuElement = element;
                  }}
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
