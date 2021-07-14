import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import debounce from 'lodash.debounce';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { Spinner, SpinnerProps } from '../Spinner';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { ZIndex } from '../../internal/ZIndex';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { isTestEnv } from '../../lib/currentEnvironment';

import { jsStyles } from './Loader.styles';

export interface LoaderProps extends CommonProps {
  children?: React.ReactNode;
  /**
   * Флаг переключения состояния лоадера
   * @default false
   */
  active: boolean;
  caption?: SpinnerProps['caption'];
  /**
   * Компонент заменяющий спиннер.
   */
  component?: React.ReactNode;
  className?: string;
  type?: 'mini' | 'normal' | 'big';
  /**
   * Время в миллисекундах для показа вуали без спиннера.
   * @default 300
   */
  delayBeforeSpinnerShow?: number;
  /**
   * Минимальное время в миллисекундах для показа спиннера
   * @default 1000
   */
  minimalDelayBeforeSpinnerHide?: number;
}

export interface LoaderState {
  isStickySpinner: boolean;
  isSpinnerVisible: boolean;
  needShowSpinnerMinimalTime: boolean;
  spinnerStyle?: object;
}

/**
 * DRAFT - лоадер-контейнер
 */
export class Loader extends React.Component<LoaderProps, LoaderState> {
  public static __KONTUR_REACT_UI__ = 'Loader';

  public static defaultProps: Partial<LoaderProps> = {
    type: Spinner.Types.normal,
    active: false,
    delayBeforeSpinnerShow: isTestEnv ? 0 : 300,
    minimalDelayBeforeSpinnerHide: 1000,
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

    component: PropTypes.node,

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
  };

  private theme!: Theme;
  private containerNode: Nullable<HTMLDivElement>;
  private spinnerNode: Nullable<HTMLDivElement>;
  private layoutEvents: Nullable<{ remove: () => void }>;
  private timeoutBeforeSpinnerShow: Nullable<NodeJS.Timeout>;
  private timeoutBeforeSpinnerHide: Nullable<NodeJS.Timeout>;

  constructor(props: LoaderProps) {
    super(props);

    this.containerNode = null;
    this.spinnerNode = null;

    this.state = {
      isStickySpinner: false,
      isSpinnerVisible: false,
      needShowSpinnerMinimalTime: false,
    };
  }

  public componentDidMount() {
    this.checkSpinnerPosition();
    this.checkSpinner();
    this.layoutEvents = LayoutEvents.addListener(debounce(this.checkSpinnerPosition, 10));
  }

  public componentDidUpdate(prevProps: Readonly<LoaderProps>) {
    const { component, active } = this.props;

    if ((active && !prevProps.active) || prevProps.component !== component) {
      this.checkSpinnerPosition();
    }

    if (active !== prevProps.active) {
      this.checkSpinner();
    }
  }

  public componentWillUnmount() {
    if (this.layoutEvents) {
      this.layoutEvents.remove();
    }
    this.clearTimeoutBeforeSpinnerShow();
    this.clearTimeoutBeforeSpinnerHide()
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
    const { active, type, caption, component } = this.props;

    const needShowLoaderMinimalTime = active || this.state.needShowSpinnerMinimalTime;
    return (
      <CommonWrapper {...this.props}>
        <div className={jsStyles.loader()}>
          <ZIndex
            priority={'Loader'}
            applyZIndex={needShowLoaderMinimalTime}
            coverChildren={needShowLoaderMinimalTime}
            style={{ height: '100%' }}
          >
            {this.props.children}
          </ZIndex>
          {needShowLoaderMinimalTime && (
            <ZIndex
              wrapperRef={this.wrapperRef}
              priority={'Loader'}
              className={cn({
                [jsStyles.active(this.theme)]: needShowLoaderMinimalTime,
              })}
            >
              {this.state.isSpinnerVisible && this.renderSpinner(type, caption, component)}
            </ZIndex>
          )}
        </div>
      </CommonWrapper>
    );
  }

  private wrapperRef = (element: HTMLDivElement | null) => {
    this.containerNode = element;
  };

  private renderSpinner(type?: 'mini' | 'normal' | 'big', caption?: React.ReactNode, component?: React.ReactNode) {
    return (
      <span
        className={this.state.isStickySpinner ? jsStyles.spinnerContainerSticky() : jsStyles.spinnerContainerCenter()}
        style={this.state.spinnerStyle}
      >
        <div
          className={jsStyles.spinnerComponentWrapper()}
          ref={element => {
            this.spinnerNode = element;
          }}
        >
          {component !== undefined ? component : <Spinner type={type} caption={caption} />}
        </div>
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
    if (this.spinnerNode) {
      const spinnerHeight = this.spinnerNode.getBoundingClientRect().height;

      if (spinnerHeight && spinnerStyle.bottom >= windowHeight - spinnerHeight) {
        delete spinnerStyle.top;
      }
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

  private checkSpinner = () => {
    if (this.props.active && this.state.needShowSpinnerMinimalTime) {
      return;
    }

    if (!this.props.active && !this.state.needShowSpinnerMinimalTime) {
      this.setState({ isSpinnerVisible: false });
      return;
    }

    this.setTimeoutBeforeSpinnerShow();
    this.setTimeoutBeforeSpinnerHide();
  };

  private setTimeoutBeforeSpinnerShow = () => {
    if (!this.timeoutBeforeSpinnerShow) {
      this.timeoutBeforeSpinnerShow = setTimeout(() => {
        if (this.props.active) {
          this.setState({
            isSpinnerVisible: true,
            needShowSpinnerMinimalTime: true,
          });
        }
        this.clearTimeoutBeforeSpinnerShow();
      }, this.props.delayBeforeSpinnerShow);
    }
  }

  private clearTimeoutBeforeSpinnerShow = () => {
    this.timeoutBeforeSpinnerShow && clearTimeout(this.timeoutBeforeSpinnerShow);
  }

  private setTimeoutBeforeSpinnerHide = () => {
    if (!this.timeoutBeforeSpinnerHide) {
      this.timeoutBeforeSpinnerHide = setTimeout(() => {
        this.setState({ needShowSpinnerMinimalTime: false });
        if (!this.props.active) {
          this.setState({ isSpinnerVisible: false });
        }
        this.clearTimeoutBeforeSpinnerHide();
      }, Number(this.props.delayBeforeSpinnerShow) + Number(this.props.minimalDelayBeforeSpinnerHide));
    }
  }

  private clearTimeoutBeforeSpinnerHide = () => {
    this.timeoutBeforeSpinnerHide && clearTimeout(this.timeoutBeforeSpinnerHide);
  }
}
