import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import cn from 'classnames';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { Spinner, SpinnerProps } from '../Spinner';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { ZIndex } from '../../internal/ZIndex';

import { jsStyles } from './Loader.styles';

export interface LoaderProps {
  children?: React.ReactNode;
  /**
   * Флаг переключения состояния лоадера
   * @default false
   */
  active: boolean;
  caption?: SpinnerProps['caption'];
  className?: string;
  type?: 'mini' | 'normal' | 'big';
  /**
   * @deprecated Старое поведение спиннера - облачко при среднем и большом размере - исчезнет в 3.0 поведение пересено в `@skbkontur/react-ui-addons` смотри [миграцию](https://github.com/skbkontur/retail-ui/blob/master/packages/react-ui/MIGRATION.md)
   *
   * @default false
   */
  cloud?: boolean;
}

export interface LoaderState {
  isStickySpinner: boolean;
  spinnerStyle?: object;
}

/**
 * DRAFT - лоадер-контейнер
 */
export class Loader extends React.Component<LoaderProps, LoaderState> {
  public static __KONTUR_REACT_UI__ = 'Loader';

  public static defaultProps = {
    type: Spinner.Types.normal,
    active: false,
  };

  public static propTypes = {
    /**
     * показываем лоадер или нет
     */
    active: PropTypes.bool,

    /**
     * Текст рядом с лоадером.
     *
     * @default  "Загрузка"
     */
    caption: Spinner.propTypes.caption,

    /**
     * Класс для обертки
     */
    className: PropTypes.string,

    /**
     * Тип спиннера: mini, normal, big
     *
     * @default  normal
     *
     * Spinner.types - все доступные типы
     */
    type: PropTypes.oneOf(Object.keys(Spinner.Types)),
    /**
     * @deprecated Старое поведение спиннера - облачко при среднем и большом размере
     *
     * @default false - исчезнет в 3.0
     */
    cloud: PropTypes.bool,
  };

  private theme!: Theme;
  private containerNode: Nullable<HTMLDivElement>;
  private spinnerNode: Nullable<HTMLSpanElement>;
  private spinnerHeight?: number;
  private layoutEvents: Nullable<{ remove: () => void }>;

  constructor(props: LoaderProps) {
    super(props);

    this.containerNode = null;
    this.spinnerNode = null;

    warning(
      !this.props.cloud,
      'cloud is deprecated, will removed in 3.0, if you want cloud use prop component instead. ',
    );

    this.state = {
      isStickySpinner: false,
    };
  }

  public componentDidMount() {
    if (this.spinnerNode) {
      this.spinnerHeight = this.spinnerNode.children[0].getBoundingClientRect().height;
    }

    this.checkSpinnerPosition();
    this.layoutEvents = LayoutEvents.addListener(this.checkSpinnerPosition);
  }

  public componentDidUpdate(prevProps: Readonly<LoaderProps>) {
    if (this.props.active && !prevProps.active) {
      this.checkSpinnerPosition();
    }
  }

  public componentWillUnmount() {
    if (this.layoutEvents) {
      this.layoutEvents.remove();
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const { active, type, caption, className } = this.props;

    return (
      <div style={{ position: 'relative' }} className={cn(jsStyles.loader(), className)}>
        <ZIndex
          priority={'Loader'}
          applyZIndex={this.props.active}
          coverChildren={this.props.active}
          style={{ height: '100%' }}
        >
          {this.props.children}
        </ZIndex>
        {active && (
          <ZIndex
            wrapperRef={this.wrapperRef}
            priority={'Loader'}
            className={cn({
              [jsStyles.active(this.theme)]: active,
            })}
          >
            {this.renderSpinner(type, caption)}
          </ZIndex>
        )}
      </div>
    );
  }

  private wrapperRef = (element: HTMLDivElement | null) => {
    this.containerNode = element;
  };

  private renderSpinner(type?: 'mini' | 'normal' | 'big', caption?: React.ReactNode) {
    return (
      <span
        className={this.state.isStickySpinner ? jsStyles.spinnerContainerSticky() : jsStyles.spinnerContainerCenter()}
        style={this.state.spinnerStyle}
        ref={element => {
          this.spinnerNode = element;
        }}
      >
        <Spinner type={type} caption={caption} cloud={this.props.cloud} />
      </span>
    );
  }

  private checkSpinnerPosition = () => {
    if (!this.containerNode) {
      return;
    }

    const {
      top: containerTop,
      right: containerRight,
      bottom: containerBottom,
      left: containerLeft,
      height: containerHeight,
      width: containerWidth,
    } = this.containerNode.getBoundingClientRect();

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Если контейнер не больше высоты и не шире окна,
    // то просто выравниваем по центру
    if (windowHeight >= containerHeight && windowWidth >= containerWidth) {
      this.setState({
        isStickySpinner: false,
        spinnerStyle: {},
      });
      return;
    }

    const spinnerStyle: {
      top?: number;
      right: number;
      bottom: number;
      left: number;
    } = {
      top: 30,
      right: 0,
      bottom: 30,
      left: 0,
    };

    // ПО ВЕРТИКАЛИ
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

    // Если знаем высоту спиннера и нижний край контейнера поднимается
    // выше отступа на высоту спиннера, то убираем верхнюю позицию лоадера
    if (this.spinnerHeight && spinnerStyle.bottom >= windowHeight - this.spinnerHeight) {
      delete spinnerStyle.top;
    }

    // ПО ГОРИЗОНТАЛИ
    // Если левый край контейнера правее левого края окна,
    // то сдвигаем и лоадер
    if (containerLeft > 0) {
      spinnerStyle.left = containerLeft;
    }

    // Если правый край контейнера левее правого края окна,
    // то сдвигаем и лоадер
    if (containerRight < windowWidth) {
      spinnerStyle.right = windowWidth - containerRight;
    }

    this.setState({
      isStickySpinner: true,
      spinnerStyle,
    });
  };
}
