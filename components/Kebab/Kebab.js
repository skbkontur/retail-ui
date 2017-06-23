// @flow
/* global React$Element */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon20 from '../Icon/20px';
import Icon from '../Icon';
import Popup from '../Popup';
import Menu from '../Menu/Menu.js';
import RenderLayer from '../RenderLayer';

import styles from './Kebab.less';

type ReactNode = React$Element<any> | string;

type Props = {
  children: ?ReactNode | ReactNode[];
  size: string;
  onClose: () => void;
  onOpen: () => void;
}

type State = {
  anchor: ?HTMLElement;
  opened: boolean;
}

export default class Kebab extends Component {
  props: Props;
  state: State = {
    opened: false,
    anchor: this.anchor
  };
  anchor: HTMLElement;

  render() {
    let style = this.state.opened ? { backgroundColor:  'rgba(0, 0, 0, 0.09)' } : {};
    let options = this._getOptions(this.props.size);

    return (
      <RenderLayer
        onClickOutside={this._handleClickOutside}
        onFocusOutside={this._handleClickOutside}
      >
        <div>
          <div
            onClick={this._handleClick}
            onKeyDown={this._handleKeyDown}
            style={style}
            className={styles.kebab + ' ' + options.className}
            tabIndex={1}
            ref={e => this.anchor = e}
          >
            {options.icon}
          </div>
          <Popup
            anchorElement={this.anchor}
            positions={['bottom left', 'bottom right', 'top left', 'top right']}
            onClickOutside={() => {}}
            onFocusOutside={() => {}}
            popupOffset={options.popupOffset}
            opened={this.state.opened}
            backgroundColor={'#fff'}
            hasShadow={true}
            hasPin={true}
            pinSize={10}
            pinOffset={18}
          >
            <Menu
              hasShadow={false}
              onItemClick={this._handleMenuItemClick}
            >
              {this.props.children}
            </Menu>
          </Popup>
        </div>
      </RenderLayer>
    );
  }

  _handleMenuItemClick = () => {
    this._setPopupState(false);
  }

  _getOptions(size){
    switch (size) {
      case 'small':
        return {
          className: styles.small,
          popupOffset: 18,
          icon: <Icon name="kebab" size="14" color="#000"/>
        }
      case 'large':
        return {
          className: styles.medium,
          popupOffset: 15,
          icon: <div className={styles.prop}>
                  <Icon20 name="kebab" size="20" color="#000"/>
                </div>
        }
      default:
        throw new Error(`Unexpected size '${size}'`);
    }
  }

  _handleClickOutside = () => {
    this._setPopupState(false);
  }

  _handleClick = (e) => {
    this._setPopupState(!this.state.opened);
  }

  _handleKeyDown = e => {
    if (e.keyCode === 13) {
      this._setPopupState(true);
    }
  }

  _setPopupState = (opened: boolean) => {
    if (this.state.opened === opened) {
      return;
    }

    opened
    ? this.props.onOpen && this.props.onOpen()
    : this.props.onClose && this.props.onClose();

    this.setState({
      opened
    });
  }

}

Kebab.propTypes = {
  children: PropTypes.node,

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
