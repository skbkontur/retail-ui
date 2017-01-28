import React, {PropTypes} from 'react';
import classnames from 'classnames';

import Spinner from '../Spinner';
import styles from './Loader.less';

/**
 * DRAFT - лоадер-контейнер
 */
class Loader extends React.Component {
  _renderSpinner(type, caption) {
    return (
      <span className={styles.spinnerContainerCenter}>
        <Spinner type={type} caption={caption} />
      </span>
    );
  }

  render() {
    const {active, type, caption, className} = this.props;
    const loaderClassName = classnames(styles.loader, className, {
      [styles.active]: active,
    });

    return (
      <div className={loaderClassName}>
        {this.props.children}

        {active && this._renderSpinner(type, caption)}
      </div>
    );
  }
}

Loader.propTypes = {
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
  type: PropTypes.oneOf(Object.keys(Spinner.Types)),
};

Loader.defaultProps = {
  type: Spinner.Types.normal,
};

export default Loader;
