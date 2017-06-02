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
  self: HTMLElement;

  componentDidMount() {
    setTimeout(() => {
      this.props.reportSelfSize(this.self);
      this.self.classList.toggle(styles.popupWrapperVisible);
    }, 0);

  }

  render() {
    let { position, children } = this.props;
    let { left, top } = position;

    let style = {
      'left': left + 'px',
      'top': top + 'px'
    };

    return (
      <div>
        <RenderContainer>
          <div
            ref={el => this.self = el}
            className={styles.popupWrapper}
            style={style}
          >
          {children}
          </div>
        </RenderContainer>
      </div>
    );
  }
}

PopupContainer.propTypes = {
  children: PropTypes.node,

  /*
    Позиция для попап контейнера
  */
  position: PropTypes.object,

  /*
    Функция для отправки размера самого себя
  */
  reportSelfSize: PropTypes.func
};
