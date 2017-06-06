// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RenderContainer from '../RenderContainer';

import styles from './PopupContainer.less';

type Props = {
  children: React.Element<any>,
  position: Object,
  reportSelfSize: (element: HTMLElement) => void,
}

export default class PopupContainer extends Component {
  static defaultProps = {
    position: {}
  };

  props: Props;
  self_node: HTMLElement;

  componentDidMount() {
    this.props.reportSelfSize(this.self_node);
  }

  render() {
    let { position, children } = this.props;
    let { left, top } = position;

    let style = {
      'left': left + 'px',
      'top': top + 'px'
    };

    return (
        <RenderContainer>
          <div
            ref={el => this.self_node = el}
            className={styles.popupWrapper}
            style={style}
          >
          {children}
          </div>
        </RenderContainer>
    );
  }
}

PopupContainer.propTypes = {
  children: PropTypes.node,

/**
 * Позиция для попап контейнера
 */
  position: PropTypes.object,

/**
 * Функция для отправки размера самого себя
 */
  reportSelfSize: PropTypes.func
};
