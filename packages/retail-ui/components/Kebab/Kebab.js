

import cn from 'classnames';
import events from 'add-event-listener';
import * as React from 'react';
import PropTypes from 'prop-types';
import Icon20 from '../Icon/20px';
import Icon from '../Icon';
import Popup from '../Popup';
import Menu from '../Menu/Menu.js';
import LayoutEvents from '../../lib/LayoutEvents';
import RenderLayer from '../RenderLayer';
import PopupMenu from '../internal/PopupMenu';

import styles from './Kebab.less';

import type MenuItem from '../MenuItem/MenuItem';

type Props = {
  children?: React.ChildrenArray<?React.Element<Class<MenuItem>>>,
  disabled?: boolean,
  onClose: () => void,
  onOpen: () => void,
  size: 'small' | 'large',
  positions?: Array<string>,
  menuMaxHeight?: number | string
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
    positions: ['bottom left', 'bottom right', 'top left', 'top right'],
    size: 'small'
  };

  state = {
    opened: false,
    focusedByTab: false,
    anchor: null
  };

  _anchor: ?HTMLElement;
  _listener;

  componentDidMount() {
    /** addListener'у нужен колбэк в аргумент */
    this._listener = LayoutEvents.addListener(() => {});
    listenTabPresses();
  }

  componentWillUnmount() {
    this._listener.remove();
  }

  render() {
    const { disabled, positions } = this.props;
    const { focusedByTab, opened } = this.state;

    return (
      <PopupMenu
        popupMargin={5}
        popupPinOffset={15}
        popupHasPin
        positions={positions}
        onChangeMenuState={this._handleChangeMenuState}
        caption={
          <div
            tabIndex={disabled ? -1 : 0}
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            className={cn(
              styles.kebab,
              opened && styles.opened,
              disabled && styles.disabled,
              focusedByTab && styles.focused
            )}
          >
            {this._renderIcon(this.props.size)}
          </div>
        }
      >
        {!disabled && this.props.children}
      </PopupMenu>
    );
  }

  _handleChangeMenuState = (isOpened: boolean, restoreFocus: boolean): void => {
    this.setState(
      state => ({
        opened: isOpened,
        focusedByTab: !isOpened && restoreFocus
      }),
      () => {
        if (this.props.disabled) {
          return;
        }

        if (this.state.opened) {
          this.props.onOpen && this.props.onOpen();
        } else {
          this.props.onClose && this.props.onClose();
        }
      }
    );
  };

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
    this.setState({
      focusedByTab: false
    });
  };

  _renderIcon(size) {
    switch (size) {
      case 'small':
        return (
          <div className={styles.iconsmall}>
            <Icon name="MenuKebab" size="14" color="#757575" />
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
}

Kebab.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  menuMaxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

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
