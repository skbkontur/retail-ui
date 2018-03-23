// @flow
import * as React from 'react';
import InternalMenu from '../InternalMenu/InternalMenu';
import Popup from '../Popup';
import RenderLayer from '../RenderLayer';
import type MenuItem from '../MenuItem/MenuItem';

import styles from './TooltipMenu.less';

type Props = {
  children?: React.ChildrenArray<React.Element<Class<MenuItem>>>,
  /** Максимальная высота меню */
  menuMaxHeight?: number | string,
  /** Ширина меню */
  menuWidth?: number | string,
  /** Элемент (обязательный), раскрывающий меню */
  caption: React.Element<*>,
  /**  Массив разрешенных положений меню относительно caption'а. */
  positions: Array<string>
};

type State = {
  menuVisible: boolean
};

/**
 * Меню, раскрывающееся по клику на переданный в ```caption``` элемент.
 * Положение зависит от переданного массива ```positions``` и работает так:
 * первое значаение в массиве - дефолтная позиция, меню раскрывается так, если ничего не мешает ему раскрыться,
 * если раскрыться в данной позиции не получается - берется следующие значение, и так далее.
 * Если меню должно раскрываться только в одну сторону - передаем в ```positions``` массив с одним элементом.
 * Если ```positions``` передан или передан пустой массив, используются все возможные положения.
 */
export default class TooltipMenu extends React.Component<Props, State> {
  static defaultProps = {
    positions: [
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
    ]
  };

  state = {
    menuVisible: false
  };

  _captionWrapper: ?HTMLSpanElement;
  _savedFocusableElement: ?HTMLElement = null;

  componentWillMount() {
    if (!this.props.caption) {
      throw new Error('Prop caption is required!');
    }
  }

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

  _getAvailablePositions = (): Array<string> => {
    const { positions } = this.props;

    if (positions && Array.isArray(positions) && positions.length) {
      return positions;
    }

    return this.constructor.defaultProps.positions;
  };

  render() {
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
                positions={this._getAvailablePositions()}
                opened={this.state.menuVisible}
                margin={10}
                hasShadow
                hasPin
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
