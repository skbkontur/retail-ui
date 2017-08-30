// @flow

import cn from 'classnames';
import events from 'add-event-listener';
import * as React from 'react';
import PropTypes from 'prop-types';
import Icon20 from '../Icon/20px';
import Icon from '../Icon';
import Popup from '../Popup';
import Menu from '../Menu/Menu.js';
import RenderLayer from '../RenderLayer';

import styles from './Kebab.less';

import type MenuItem from '../MenuItem/MenuItem';

type Props = {
  children?: React.ChildrenArray<?React.Element<Class<MenuItem>>>,
  disabled?: boolean,
  onClose: () => void,
  onOpen: () => void,
  size: 'small' | 'large'
};

type State = {
  anchor: ?HTMLElement,
  focusedByTab: boolean,
  opened: boolean
};

export default class Kebab extends React.Component<Props, State> {
  static defaultProps = {
    onOpen: () => {},
    onClose: () => {},
    size: 'small'
  };

  state = {
    opened: false,
    focusedByTab: false,
    anchor: null
  };

  _anchor: ?HTMLElement;

  componentDidMount() {
    listenTabPresses();
  }

  render() {
    const { disabled } = this.props;
    const { focusedByTab, opened } = this.state;
    return (
      <RenderLayer
        onClickOutside={this._handleClickOutside}
        onFocusOutside={this._handleClickOutside}
      >
        <div className={styles.container}>
          <div
            onClick={this._handleClick}
            onKeyDown={this._handleKeyDown}
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            tabIndex={disabled ? -1 : 0}
            ref={node => (this._anchor = node)}
            className={cn(
              styles.kebab,
              opened && styles.opened,
              disabled && styles.disabled,
              focusedByTab && styles.focused
            )}
          >
            {this._renderIcon(this.props.size)}
          </div>
          {this._anchor &&
            <Popup
              anchorElement={this._anchor}
              positions={[
                'bottom left',
                'bottom right',
                'top left',
                'top right'
              ]}
              popupOffset={10}
              opened={this.state.opened}
              margin={5}
              hasShadow
              hasPin
              pinOffset={15}
            >
              <div className={styles.menu}>
                <Menu hasShadow={false} onItemClick={this._handleMenuItemClick}>
                  {this.props.children}
                </Menu>
              </div>
            </Popup>}
        </div>
      </RenderLayer>
    );
  }

  _handleFocus = (e: SyntheticFocusEvent<>) => {
    if (!this.props.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      process.nextTick(() => {
        if (tabPressed) {
          this.setState({ focusedByTab: true });
          tabPressed = false;
        }
      });
    }
  };

  _handleBlur = () => {
    this.setState({ focusedByTab: false });
  };

  _handleMenuItemClick = () => {
    this._setPopupState(false);
  };

  _renderIcon(size) {
    switch (size) {
      case 'small':
        return (
          <div className={styles.iconsmall}>
            <Icon name="kebab" size="14" color="#757575" />
          </div>
        );
      case 'large':
        return (
          <div className={styles.iconlarge}>
            <Icon20 name="kebab" size="20" color="#757575" />
          </div>
        );
      default:
        throw new Error(`Unexpected size '${size}'`);
    }
  }

  _handleClickOutside = () => {
    this._setPopupState(false);
  };

  _handleClick = e => {
    this._setPopupState(!this.state.opened);
  };

  _handleKeyDown = event => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this._setPopupState(false);
        break;
      case 'Enter':
        event.preventDefault();
        this._setPopupState(true);
        break;
    }
  };

  _setPopupState = (opened: boolean) => {
    if (this.props.disabled && opened) {
      return;
    }

    if (this.state.opened === opened) {
      return;
    }

    opened
      ? this.props.onOpen && this.props.onOpen()
      : this.props.onClose && this.props.onClose();

    this.setState({
      opened
    });
  };
}

Kebab.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,

  /**
   * Размер кебаба small 14px | large 20px
   */
  size: PropTypes.string,

  /**
   * Коллбек, вызывающийся перед закрытием кебаба
   */
  onClose: PropTypes.func,

  /**
   * Коллбек, вызывающийся перед открытием кебаба
   */
  onOpen: PropTypes.func
};

const KEYCODE_TAB = 9;

let isListening: boolean;
let tabPressed: boolean;

function listenTabPresses() {
  if (!isListening) {
    events.addEventListener(window, 'keydown', (event: KeyboardEvent) => {
      tabPressed = event.keyCode === KEYCODE_TAB;
    });
    isListening = true;
  }
}
