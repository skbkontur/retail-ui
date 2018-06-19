import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Spinner from '../Spinner';
import styles = require('./Loader.less');

export interface LoaderProps {
  children?: React.ReactNode;
  active: boolean;
  caption?: string;
  className?: string;
  type?: 'mini' | 'normal' | 'big';
};

/**
 * DRAFT - лоадер-контейнер
 */
class Loader extends React.Component<LoaderProps> {
  public static defaultProps = {
    type: Spinner.Types.normal
  };

  public static propTypes = {
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

  public render() {
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

  private _renderSpinner(type?: 'mini' | 'normal' | 'big', caption?: string) {
    return (
      <span className={styles.spinnerContainerCenter}>
        <Spinner type={type} caption={caption} />
      </span>
    );
  }
}

export default Loader;
