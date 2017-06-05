// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Popup from '../Popup';

import styles from './Kebab.less';

type Props = {
  children: any,
  side: string,
  trigger: string,
  offset: number
}

export default class PopupContainer extends Component {
  props: Props;

  render() {
    let { children, ...props } = this.props;

    function returnChildren() {
      return children;
    }

    return (
    <Popup  render={returnChildren} {...props}>
      <div className={styles.kebab} tabIndex={1}>
        <Icon name="kebab" size="14" color="#777"/>
      </div>
    </Popup>
    );
  }
}

PopupContainer.propTypes = {
  children: PropTypes.node,

  /**
   * Отспуп от вызывающего элемента
   */
  offset: PropTypes.number,
  /**
   * С какой стороны рисовать кебаб
   */
  side: PropTypes.string,

  /**
   * Способ откытия кебаба
   */
  trigger: PropTypes.string
};
