import React, {PropTypes} from 'react';
import classnames from 'classnames';

import Spinner from '../Spinner';
import styles from './Loader.less';

/**
 * DRAFT - лоадер-контейнер
 */
class Loader extends React.Component {
  renderSpinner(type, caption, alwaysShowCaption) {

    return (
      <span className={styles.spinnerContainerCenter}>
        <Spinner type={type}
                 caption={caption}
                 alwaysShowCaption={alwaysShowCaption}/>
      </span>
    );
  }

  render() {
    const {isActive, type, caption, alwaysShowCaption} = this.props;
    const loaderClassName = classnames(styles.loader, {
      [styles.active]: isActive,
    });

    return (
      <div className={loaderClassName}>
        {this.props.children}

        {isActive && this.renderSpinner(type, caption, alwaysShowCaption)}
      </div>
    );
  }
}

Loader.propTypes = {
  /**
   * показываем лоадер или нет
   */
  isActive: PropTypes.bool.isRequired,

  /**
   * Текст рядом с лоадером.
   *
   * "Загрузка" - значение по-умолчанию
   */
  caption: PropTypes.string,

  /**
   * Показываем ли текст для большого и маленького лоадера
   */
  alwaysShowCaption: PropTypes.bool,

  /**
   * Тип спиннера: mini, normal, big
   *
   * Значение по-умолчанию - normal
   *
   * Spinner.types - все доступные типы
   */
  type: PropTypes.oneOf(Object.keys(Spinner.types)),
};

Loader.defaultProps = {
  alwaysShowCaption: false,
  caption: null,
  type: Spinner.types.normal,
};

export default Loader;
