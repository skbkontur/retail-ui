// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon20 from '../Icon/20px';
import Icon from '../Icon';
import Popup from '../Popup';
import Menu from '../Menu/Menu.js';

import styles from './Kebab.less';

type Props = {
  children: ?HTMLElement,
  size: string;
  onClose: (e: SyntheticMouseEvent) => void;
  onOpen: (e: SyntheticMouseEvent) => void;
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


  componentDidMount(){
    /**
     * It prevents mousdown handler from RenderLayer component at Popup and solves
     * problem, when Popup will reopen after click(close) on kebab
     */

  }

  render() {
    let style = this.state.opened ? { backgroundColor:  'rgba(0, 0, 0, 0.09)' } : {};
    let options = this._getOptions(this.props.size);

    return (
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
          onClickOutside={this._handleClickOutside}
          onFocusOutside={this._handleClickOutside}
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
   * Размер кебаба small 14px | medium 20px
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
