
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Spinner from '../Spinner';
import styles from './Loader.less';

type Props = {
  children?: React.Node,
  active: boolean,
  caption?: string,
  className?: string,
  type?: 'mini' | 'normal' | 'big'
};

/**
 * DRAFT - лоадер-контейнер
 */
class Loader extends React.Component<Props> {
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

  _renderSpinner(type, caption) {
    return (
      <span className={styles.spinnerContainerCenter}>
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
      <div className={loaderClassName}>
        {this.props.children}

        {active && this._renderSpinner(type, caption)}
      </div>
    );
  }
}

export default Loader;
