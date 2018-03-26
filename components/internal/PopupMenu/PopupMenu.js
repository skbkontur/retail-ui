// @flow
import * as React from 'react';
import InternalMenu from '../InternalMenu/InternalMenu';
import Popup from '../../Popup';
import RenderLayer from '../../RenderLayer';
import type MenuItem from '../../MenuItem/MenuItem';

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

const AVAILABLE_POSITIONS = [
  'top left',
  'top center',
  'top right',
  'right top',
  'right middle',
  'right bottom',
  'bottom left',
  'bottom center',
  'bottom right',
  'left top',
  'left middle',
  'left bottom'
];

export default class PopupMenu extends React.Component<Props, State> {
  static defaultProps = {
    positions: AVAILABLE_POSITIONS
  };

  isDropdownMenu: boolean;
  isTooltipMenu: boolean;
  positions: Array<string>;

  constructor(props: Props) {
    super(props);

    if (!props.type) {
      throw new Error('Prop "type" is required!');
    }

    if (!this.props.caption) {
      throw new Error('Prop "caption" is required!');
    }

    this.isDropdownMenu = props.type === 'dropdown';
    this.isTooltipMenu = props.type === 'tooltip';

    this.positions = this.isDropdownMenu
      ? ['bottom left', 'bottom right', 'top left', 'top right']
      : props.positions;
  }

  state = {
    menuVisible: false
  };

  _captionWrapper: ?HTMLSpanElement;
  _savedFocusableElement: ?HTMLElement = null;

  componentDidMount() {
    this._validatePositionsProps();
  }

  componentDidUpdate() {
    this._validatePositionsProps();
  }

  _validatePositionsProps = (): void => {
    const isValidPosition = (position: string): boolean => {
      return AVAILABLE_POSITIONS.includes(position);
    };

    this.positions.forEach(item => {
      if (!isValidPosition(item)) {
        throw new Error(`Unxpected position '${item}'`);
      }
    });
  };

  _showMenu = (): void => {
    this._saveFocus();
    this.setState({ menuVisible: true });
  };

  _hideMenu = (): void => {
    this.setState({ menuVisible: false });
    this._restoreFocus();
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
        this._showMenu();
        break;

      default:
        break;
    }
  };

  _handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case 'Escape':
        this._hideMenu();
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
        onClickOutside={this._hideMenu}
        onFocusOutside={this._hideMenu}
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
                  onItemClick={this._hideMenu}
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
