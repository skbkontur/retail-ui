import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash.debounce';

import Spinner from '../Spinner';
import styles = require('./Loader.less');

export interface LoaderProps {
  children?: React.ReactNode;
  active: boolean;
  caption?: string;
  className?: string;
  type?: 'mini' | 'normal' | 'big';
}

export interface LoaderState {
  isStickySpinner: boolean;
  spinnerStyle?: object;
}

/**
 * DRAFT - лоадер-контейнер
 */
class Loader extends React.Component<LoaderProps, LoaderState> {
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

  private containerNode: HTMLDivElement | null;
  private spinnerNode: HTMLSpanElement | null;
  private spinnerHeight?: number;

  constructor(props: LoaderProps) {
    super(props);

    this.containerNode = null;
    this.spinnerNode = null;

    this.state = {
      isStickySpinner: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.changeWindowHandler);
    window.addEventListener('resize', this.changeWindowHandler);
    this.checkSpinnerPosition();

    if (this.spinnerNode) {
      this.spinnerHeight = this.spinnerNode.children[0].getBoundingClientRect().height;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.changeWindowHandler);
    window.removeEventListener('resize', this.changeWindowHandler);
  }

  private checkSpinnerPosition = () => {
    if (!this.containerNode) {
      return;
    }

    const {
      top: containerTop,
      bottom: containerBottom,
      left: containerLeft,
      height: containerHeight,
      width: containerWidth
    } = this.containerNode.getBoundingClientRect();

    const windowHeight = window.innerHeight;

    // Если контейнер не больше высоты окна, то просто выравниваем по центру
    if (windowHeight >= containerHeight) {
      return;
    }

    const spinnerStyle = {
      width: containerWidth,
      left: containerLeft,
      top: 0,
      bottom: 0
    };

    // Если верхний край контейнера ниже верхнего края окна,
    // то сдвигаем и лоадер
    if (containerTop > 0) {
      spinnerStyle.top = containerTop + 30;
    }

    // Если нижний край контейнера выше нижнего края окна,
    // то сдвигаем и лоадер
    if (containerBottom < windowHeight) {
      spinnerStyle.bottom = Math.abs(windowHeight - containerBottom) + 30;
    }

    // Если значем высоту спиннера и нижний край контейнера поднимается
    // выше отступа на высоту спиннера, то убираем верхнюю позицию лоадера
    if (
      this.spinnerHeight &&
      spinnerStyle.bottom >= windowHeight - this.spinnerHeight
    ) {
      delete spinnerStyle.top;
    }

    this.setState({
      isStickySpinner: true,
      spinnerStyle
    });
  };

  private changeWindowHandler = debounce(this.checkSpinnerPosition, 10);

  public render() {
    const { active, type, caption, className } = this.props;
    const loaderClassName = classnames(styles.loader, className, {
      [styles.active]: active
    });

    return (
      <div
        className={loaderClassName}
        ref={element => {
          this.containerNode = element;
        }}
      >
        {this.props.children}

        {active && this._renderSpinner(type, caption)}
      </div>
    );
  }

  private _renderSpinner(type?: 'mini' | 'normal' | 'big', caption?: string) {
    return (
      <span
        className={
          this.state.isStickySpinner
            ? styles.spinnerContainerSticky
            : styles.spinnerContainerCenter
        }
        style={this.state.spinnerStyle}
        ref={element => {
          this.spinnerNode = element;
        }}
      >
        <Spinner type={type} caption={caption} />
      </span>
    );
  }
}

export default Loader;
