// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash.debounce';

import Spinner from '../Spinner';
import styles from './Loader.less';

type Props = {
  children?: React.Node,
  active: boolean,
  caption?: string,
  className?: string,
  type?: 'mini' | 'normal' | 'big'
};

type State = {
  spinnerTopOffset: number,
  stickySpinner: boolean
};

/**
 * DRAFT - лоадер-контейнер
 */
class Loader extends React.Component<Props, State> {
  static defaultProps = {
    type: Spinner.Types.normal
  };

  static propTypes = {
    /**
     * показываем лоадер или нет
     */
    active: PropTypes.bool.isRequired,

    /**
     * Текст рядом с лоадером.
     *
     * "Загрузка" - значение по-умолчанию
     */
    caption: PropTypes.string,

    /**
     * Класс для обертки
     */
    className: PropTypes.string,

    /**
     * Тип спиннера: mini, normal, big
     *
     * Значение по-умолчанию - normal
     *
     * Spinner.types - все доступные типы
     */
    type: PropTypes.oneOf(Object.keys(Spinner.Types))
  };

  _containerNode: ?HTMLDivElement;

  state = {
    spinnerTopOffset: 0,
    stickySpinner: false
  };

  componentDidMount() {
    window.addEventListener('scroll', debounce(this._moveSpinner, 10));
    this._moveSpinner();
  }

  _moveSpinner = () => {
    if (!this._containerNode) {
      return;
    }

    const {
      top: containerTop,
      height: containerHeight
    } = this._containerNode.getBoundingClientRect();

    const hiddenTop = Math.abs(Math.min(0, containerTop));
    const hiddenBottom = Math.abs(
      Math.min(0, window.innerHeight - containerTop - containerHeight)
    );
    const visibleHeight = containerHeight - hiddenBottom - hiddenTop;

    if (visibleHeight < 0) {
      this.setState({
        stickySpinner: false,
        spinnerTopOffset: 0
      });
      return;
    }

    if (hiddenTop || hiddenBottom) {
      const spinnerTop = hiddenTop + visibleHeight / 2;

      if (spinnerTop < 30) {
        return;
      }

      if (spinnerTop > containerHeight - 30) {
        return;
      }

      this.setState({
        stickySpinner: true,
        spinnerTopOffset: spinnerTop
      });
    } else {
      this.setState({
        stickySpinner: false,
        spinnerTopOffset: 0
      });
    }
  };

  _renderSpinner(type, caption) {
    return (
      <span
        className={
          this.state.stickySpinner
            ? styles.spinnerContainerSticky
            : styles.spinnerContainerCenter
        }
        style={{
          top: this.state.spinnerTopOffset
        }}
      >
        <Spinner type={type} caption={caption} />
      </span>
    );
  }

  render() {
    const { active, type, caption, className } = this.props;
    const loaderClassName = classnames(styles.loader, className, {
      [styles.active]: active
    });

    return (
      <div
        className={loaderClassName}
        ref={elelment => {
          this._containerNode = elelment;
        }}
      >
        {this.props.children}

        {active && this._renderSpinner(type, caption)}
      </div>
    );
  }
}

export default Loader;
