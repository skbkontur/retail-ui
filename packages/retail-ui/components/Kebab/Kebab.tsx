import cn from 'classnames';
import events from 'add-event-listener';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import Icon20 from '../Icon/20px';
import Icon from '../Icon';
import LayoutEvents from '../../lib/LayoutEvents';
import PopupMenu from '../internal/PopupMenu';

import styles = require('./Kebab.less');
import { createPropsGetter } from '../internal/createPropsGetter';
import { Nullable } from '../../typings/utility-types';

export interface KebabProps {
  disabled?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  size?: 'small' | 'large';
  positions?: string[];
  menuMaxHeight?: number | string;
}

export interface KebabState {
  anchor: Nullable<HTMLElement>;
  focusedByTab: boolean;
  opened: boolean;
}

export default class Kebab extends React.Component<KebabProps, KebabState> {
  public static propTypes = {};
  public static defaultProps = {
    onOpen: () => undefined,
    onClose: () => undefined,
    positions: ['bottom left', 'bottom right', 'top left', 'top right'],
    size: 'small'
  };

  public state = {
    opened: false,
    focusedByTab: false,
    anchor: null
  };

  private _listener: {
    remove: () => void;
  } = {
    remove: () => undefined
  };

  private getProps = createPropsGetter(Kebab.defaultProps);

  private captionElement: Nullable<HTMLDivElement>;

  public componentDidMount() {
    /** addListener'у нужен колбэк в аргумент */
    this._listener = LayoutEvents.addListener(() => undefined);
    listenTabPresses();
  }

  public componentWillUnmount() {
    this._listener.remove();
  }

  public render(): JSX.Element {
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
            ref={element => (this.captionElement = element)}
          >
            {this._renderIcon(this.getProps().size)}
          </div>
        }
      >
        {!disabled && this.props.children}
      </PopupMenu>
    );
  }

  private _handleChangeMenuState = (
    isOpened: boolean,
    restoreFocus: boolean
  ): void => {
    this.setState(
      {
        opened: isOpened,
        focusedByTab: !isOpened && restoreFocus
      },
      () => {
        if (this.props.disabled) {
          return;
        }

        process.nextTick(() => {
          if (this.captionElement && restoreFocus) {
            tabPressed = true;
            this.captionElement.focus();
          }
        });

        if (this.state.opened) {
          if (this.props.onOpen) {
            this.props.onOpen();
          }
        } else {
          if (this.props.onClose) {
            this.props.onClose();
          }
        }
      }
    );
  };

  private _handleFocus = () => {
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

  private _handleBlur = () => {
    this.setState({
      focusedByTab: false
    });
  };

  private _renderIcon(size: string) {
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
            <Icon20 name="kebab" color="#757575" />
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
