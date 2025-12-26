import React from 'react';
import debounce from 'lodash.debounce';
import type { Emotion } from '@emotion/css/types/create-instance';

import { isBrowser } from '../../lib/globalObject';
import type { GlobalObject } from '../../lib/globalObject';
import type { AnyObject } from '../../lib/utils';
import * as LayoutEvents from '../../lib/LayoutEvents';
import type { SpinnerProps } from '../Spinner';
import { Spinner } from '../Spinner';
import type { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import { ZIndex } from '../../internal/ZIndex';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { isTestEnv } from '../../lib/currentEnvironment';
import { TaskWithDelayAndMinimalDuration } from '../../lib/taskWithDelayAndMinimalDuration';
import { getTabbableElements } from '../../lib/dom/tabbableHelpers';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { getDOMRect } from '../../lib/dom/getDOMRect';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { withRenderEnvironment } from '../../lib/renderEnvironment';

import { getStyles } from './Loader.styles';

const types = ['mini', 'normal', 'big'] as const;

export type LoaderType = (typeof types)[number];

export interface LoaderProps extends CommonProps {
  /** @ignore */
  children?: React.ReactNode;

  /** Задает состояние лоадера.
   * @default false */
  active?: boolean;

  /** Задает подпись под спиннером.
   * @default  "Загрузка"
   */
  caption?: SpinnerProps['caption'];

  /** Задает компонент, заменяющий спиннер. */
  component?: React.ReactNode;

  /** Задает размер спиннера и текста.
   * @default normal. */
  type?: LoaderType;

  /** Устанавливает время в миллисекундах для показа вуали без спиннера.
   * @default 300 */
  delayBeforeSpinnerShow?: number;

  /** Устанавливает минимальное время в миллисекундах для показа спиннера.
   * @default 1000. */
  minimalDelayBeforeSpinnerHide?: number;
}

export interface LoaderState {
  isStickySpinner: boolean;
  isSpinnerVisible: boolean;
  isLoaderActive: boolean;
  spinnerStyle?: AnyObject;
}

export const LoaderDataTids = {
  idle: 'Loader__Idle',
  veil: 'Loader__Veil',
  spinner: 'Loader__Spinner',
} as const;

type DefaultProps = Required<
  Pick<LoaderProps, 'type' | 'active' | 'delayBeforeSpinnerShow' | 'minimalDelayBeforeSpinnerHide'>
>;

/**
 * Компонент `Loader` принимает внутрь себя контент, поверх которого в активном состоянии `Loader`'а будет отрисован спиннер.
 *
 * Если вам нужен только сам спиннер без дополнительного функционала - используйте компонент Spinner.
 */
@withRenderEnvironment
@rootNode
export class Loader extends React.Component<LoaderProps, LoaderState> {
  public static __KONTUR_REACT_UI__ = 'Loader';
  public static displayName = 'Loader';

  public static defaultProps: DefaultProps = {
    type: 'normal',
    active: false,
    delayBeforeSpinnerShow: isTestEnv ? 0 : 300,
    minimalDelayBeforeSpinnerHide: isTestEnv ? 0 : 1000,
  };

  private getProps = createPropsGetter(Loader.defaultProps);

  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private spinnerContainerNode: Nullable<HTMLDivElement>;
  private childrenContainerNode: Nullable<HTMLDivElement>;
  private spinnerNode: Nullable<HTMLDivElement>;
  private layoutEvents: Nullable<{ remove: () => void }>;
  private spinnerTask!: TaskWithDelayAndMinimalDuration;
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
  }

  public componentDidMount() {
    this.spinnerTask = new TaskWithDelayAndMinimalDuration({
      delayBeforeTaskStart: this.getProps().delayBeforeSpinnerShow,
      durationOfTask: this.getProps().minimalDelayBeforeSpinnerHide,
      taskStartCallback: () => this.setState({ isSpinnerVisible: true }),
      taskStopCallback: () => this.setState({ isSpinnerVisible: false }),
    });
    const active = this.getProps().active;
    this.checkSpinnerPosition();
    active && this.spinnerTask.start();
    this.layoutEvents = LayoutEvents.addListener(debounce(this.checkSpinnerPosition, 10), this.globalObject);

    if (active) {
      this.disableChildrenFocus();
    }
  }

  public componentDidUpdate(prevProps: Readonly<LoaderProps>, prevState: Readonly<LoaderState>) {
    const { component } = this.props;
    const { active, delayBeforeSpinnerShow, minimalDelayBeforeSpinnerHide } = this.getProps();
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

  public render(): React.JSX.Element {
    this.styles = getStyles(this.emotion);

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
    const { caption, component } = this.props;
    const type = this.getProps().type;
    const { isLoaderActive } = this.state;

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div
          className={this.styles.loader()}
          data-tid={this.props['data-tid'] || (isLoaderActive ? LoaderDataTids.veil : LoaderDataTids.idle)}
        >
          <ZIndex
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
              className={this.cx({
                [this.styles.active(this.theme)]: isLoaderActive,
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

  private renderSpinner(type?: LoaderType, caption?: React.ReactNode, component?: React.ReactNode) {
    return (
      <span
        data-tid={LoaderDataTids.spinner}
        className={this.cx(this.styles.spinnerContainer(), {
          [this.styles.spinnerContainerSticky()]: this.state.isStickySpinner,
        })}
        style={this.state.spinnerStyle}
      >
        <div
          className={this.styles.spinnerComponentWrapper()}
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
    if (!this.spinnerContainerNode || !isBrowser(this.globalObject)) {
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

    const windowHeight = this.globalObject.innerHeight;
    const windowWidth = this.globalObject.innerWidth;

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

    this.globalObject.document?.querySelectorAll('[origin-tabindex]').forEach((el) => {
      el.setAttribute('tabindex', el.getAttribute('origin-tabindex') ?? '0');
      el.removeAttribute('origin-tabindex');
    });
  };

  private makeObservable = () => {
    const target = this.childrenContainerNode;
    if (!target || !this.globalObject.MutationObserver) {
      return;
    }
    const config = {
      childList: true,
      subtree: true,
    };
    const observer = new this.globalObject.MutationObserver(this.disableChildrenFocus);
    observer.observe(target, config);
    this.childrenObserver = observer;
  };

  private makeUnobservable = () => {
    this.childrenObserver?.disconnect();
    this.childrenObserver = null;
  };
}
