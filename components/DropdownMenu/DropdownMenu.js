// @flow
import * as React from 'react';
import InternalMenu from '../InternalMenu/InternalMenu';
import Popup from '../Popup';
import RenderLayer from '../RenderLayer';
import type MenuItem from '../MenuItem/MenuItem';

import styles from './DropdownMenu.less';

type Props = {
  children?: React.ChildrenArray<React.Element<Class<MenuItem>>>,
  /** Максимальная высота меню */
  menuMaxHeight?: number | string,
  /** Ширина меню */
  menuWidth?: number | string,
  /** Элемент (обязательный), раскрывающий меню */
  caption: React.Element<*>
};

type State = {
  menuVisible: boolean
};

/**
 * Меню, раскрывающееся по клику на переданный в ```caption``` элемент
 */
export default class DropdownMenu extends React.Component<Props, State> {
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
                positions={[
                  'bottom left',
                  'bottom right',
                  'top left',
                  'top right'
                ]}
                opened={this.state.menuVisible}
                margin={0}
                hasShadow
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
