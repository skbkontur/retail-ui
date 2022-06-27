// TODO: поправить после перехода на функциональные компоненты
// eslint-disable @typescript-eslint/no-non-null-assertion
import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { Spinner, SpinnerProps } from '../Spinner';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { ZIndex } from '../../internal/ZIndex';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { isTestEnv } from '../../lib/currentEnvironment';
import { TaskWithDelayAndMinimalDuration } from '../../lib/taskWithDelayAndMinimalDuration';
import { getTabbableElements } from '../../lib/dom/tabbableHelpers';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { getDOMRect } from '../../lib/dom/getDOMRect';

import { styles } from './Loader.styles';

export interface LoaderProps extends CommonProps {
  children?: React.ReactNode;
  /**
   * Флаг переключения состояния лоадера
   * @default false
   */
  active?: boolean;
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
  isLoaderActive: boolean;
  spinnerStyle?: object;
}

/**
 * DRAFT - лоадер-контейнер
 */
@rootNode
export class Loader extends React.Component<LoaderProps, LoaderState> {
  public static __KONTUR_REACT_UI__ = 'Loader';

  public static defaultProps: Partial<LoaderProps> = {
    type: Spinner.Types.normal,
    active: false,
    delayBeforeSpinnerShow: isTestEnv ? 0 : 300,
    minimalDelayBeforeSpinnerHide: isTestEnv ? 0 : 1000,
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
    /**
     * Время в миллисекундах для показа вуали без спиннера.
     * @default 300
     */
    delayBeforeSpinnerShow: PropTypes.number,
    /**
     * Минимальное время в миллисекундах для показа спиннера
     * @default 1000
     */
    minimalDelayBeforeSpinnerHide: PropTypes.number,
  };

  private theme!: Theme;
  private setRootNode!: TSetRootNode;
  private spinnerContainerNode: Nullable<HTMLDivElement>;
  private childrenContainerNode: Nullable<HTMLDivElement>;
  private spinnerNode: Nullable<HTMLDivElement>;
  private layoutEvents: Nullable<{ remove: () => void }>;
  private spinnerTask: TaskWithDelayAndMinimalDuration;
  private childrenObserver: Nullable<MutationObserver>;

  constructor(props: LoaderProps) {
    super(props);

    this.spinnerContainerNode = null;
    this.childrenContainerNode = null;
    this.childrenObserver = null;
    this.spinnerNode = null;

    this.state = {
      isStickySpinner: false,
      isSpinnerVisible: false,
      isLoaderActive: false,
    };

    this.spinnerTask = new TaskWithDelayAndMinimalDuration({
      delayBeforeTaskStart: this.props.delayBeforeSpinnerShow!,
      durationOfTask: this.props.minimalDelayBeforeSpinnerHide!,
      taskStartCallback: () => this.setState({ isSpinnerVisible: true }),
      taskStopCallback: () => this.setState({ isSpinnerVisible: false }),
    });
  }

  public componentDidMount() {
    this.checkSpinnerPosition();
    this.props.active && this.spinnerTask.start();
    this.layoutEvents = LayoutEvents.addListener(debounce(this.checkSpinnerPosition, 10));

    if (this.props.active) {
      this.disableChildrenFocus();
    }
  }

  public componentDidUpdate(prevProps: Readonly<LoaderProps>, prevState: Readonly<LoaderState>) {
    const { component, active, delayBeforeSpinnerShow, minimalDelayBeforeSpinnerHide } = this.props;
    const { isLoaderActive } = this.state;

    if ((active && !prevProps.active) || prevProps.component !== component) {
      this.checkSpinnerPosition();
    }

    if (
      delayBeforeSpinnerShow !== prevProps.delayBeforeSpinnerShow ||
      minimalDelayBeforeSpinnerHide !== prevProps.minimalDelayBeforeSpinnerHide
    ) {
      this.spinnerTask.update({
        delayBeforeTaskStart: delayBeforeSpinnerShow,
        durationOfTask: minimalDelayBeforeSpinnerHide,
      });
    }

    if (active !== prevProps.active) {
      active ? this.spinnerTask.start() : this.spinnerTask.stop();
    }

    if (isLoaderActive !== prevState.isLoaderActive) {
      if (isLoaderActive) {
        this.disableChildrenFocus();
      } else {
        this.enableChildrenFocus();
      }
    }
  }

  public componentWillUnmount() {
    this.makeUnobservable();
    if (this.layoutEvents) {
      this.layoutEvents.remove();
    }
    this.spinnerTask.clearTask();
  }

  public static getDerivedStateFromProps(props: LoaderProps, state: LoaderState): Partial<LoaderState> {
    if (props.active && !state.isLoaderActive) {
      return {
        isLoaderActive: true,
      };
    }
    if (state.isLoaderActive && !(props.active || state.isSpinnerVisible)) {
      return {
        isLoaderActive: false,
      };
    }

    return state;
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const { type, caption, component } = this.props;
    const { isLoaderActive } = this.state;

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div className={styles.loader()} data-tid={isLoaderActive ? 'Loader__Veil' : ''}>
          <ZIndex
            priority={'Loader'}
            applyZIndex={isLoaderActive}
            coverChildren={isLoaderActive}
            style={{ height: '100%' }}
            wrapperRef={this.childrenRef}
          >
            {this.props.children}
          </ZIndex>
          {isLoaderActive && (
            <ZIndex
              wrapperRef={this.spinnerRef}
              priority={'Loader'}
              className={cx({
                [styles.active(this.theme)]: isLoaderActive,
              })}
            >
              {this.state.isSpinnerVisible && this.renderSpinner(type, caption, component)}
            </ZIndex>
          )}
        </div>
      </CommonWrapper>
    );
  }

  private childrenRef = (element: HTMLDivElement | null) => {
    this.childrenContainerNode = element;
  };

  private spinnerRef = (element: HTMLDivElement | null) => {
    this.spinnerContainerNode = element;
  };

  private renderSpinner(type?: 'mini' | 'normal' | 'big', caption?: React.ReactNode, component?: React.ReactNode) {
    return (
      <span
        data-tid={'Loader__Spinner'}
        className={cx(styles.spinnerContainer(), { [styles.spinnerContainerSticky()]: this.state.isStickySpinner })}
        style={this.state.spinnerStyle}
      >
        <div
          className={styles.spinnerComponentWrapper()}
          ref={(element) => {
            this.spinnerNode = element;
          }}
        >
          {component !== undefined ? component : <Spinner type={type} caption={caption} />}
        </div>
      </span>
    );
  }

  private checkSpinnerPosition = () => {
    if (!this.spinnerContainerNode) {
      return;
    }

    const {
      top: containerTop,
      right: containerRight,
      bottom: containerBottom,
      left: containerLeft,
      height: containerHeight,
      width: containerWidth,
    } = getDOMRect(this.spinnerContainerNode);

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

    const spinnerHeight = getDOMRect(this.spinnerNode).height;

    if (spinnerHeight && spinnerStyle.bottom >= windowHeight - spinnerHeight) {
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

  private disableChildrenFocus = () => {
    if (!this.childrenObserver) {
      this.makeObservable();
    }
    const tabbableElements = getTabbableElements(this.childrenContainerNode);
    tabbableElements.forEach((el) => {
      if (!el.hasAttribute('origin-tabindex')) {
        el.setAttribute('origin-tabindex', el.tabIndex.toString());
      }
      el.tabIndex = -1;
    });
  };

  private enableChildrenFocus = () => {
    this.makeUnobservable();
    // NOTE: NodeList doesn't support 'forEach' method in IE11 and other older browsers
    Array.from(document.querySelectorAll('[origin-tabindex]')).forEach((el) => {
      el.setAttribute('tabindex', el.getAttribute('origin-tabindex') ?? '0');
      el.removeAttribute('origin-tabindex');
    });
  };

  private makeObservable = () => {
    const target = this.childrenContainerNode;
    if (!target) {
      return;
    }
    const config = {
      childList: true,
      subtree: true,
    };
    const observer = new MutationObserver(this.disableChildrenFocus);
    observer.observe(target, config);
    this.childrenObserver = observer;
  };

  private makeUnobservable = () => {
    this.childrenObserver?.disconnect();
    this.childrenObserver = null;
  };
}
