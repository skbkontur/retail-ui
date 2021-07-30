import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { FocusableElement, tabbable } from 'tabbable';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { Spinner, SpinnerProps } from '../Spinner';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { ZIndex } from '../../internal/ZIndex';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';

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
}

export interface LoaderState {
  isStickySpinner: boolean;
  childrenFocusableElements: FocusableElement[];
  childrenObserver: MutationObserver | null;
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

  constructor(props: LoaderProps) {
    super(props);

    this.containerNode = null;
    this.spinnerNode = null;

    this.state = {
      isStickySpinner: false,
      childrenObserver: null,
      childrenFocusableElements: [],
    };
  }

  public componentDidMount() {
    this.checkSpinnerPosition();
    this.layoutEvents = LayoutEvents.addListener(debounce(this.checkSpinnerPosition, 10));

    this.makeObservable();

    if (this.props.active) {
      this.disableChildrenFocus();
    }
  }

  public componentDidUpdate(prevProps: Readonly<LoaderProps>) {
    const { component, active } = this.props;

    if ((active && !prevProps.active) || prevProps.component !== component) {
      this.checkSpinnerPosition();
    }

    if (prevProps.active !== active) {
      active ? this.disableChildrenFocus() : this.enableChildrenFocus();
    }
  }

  public componentWillUnmount() {
    this.state.childrenObserver?.disconnect();
    if (this.layoutEvents) {
      this.layoutEvents.remove();
    }
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
    const { active, type, caption, component } = this.props;

    return (
      <CommonWrapper {...this.props}>
        <div className={jsStyles.loader()}>
          <ZIndex
            priority={'Loader'}
            applyZIndex={this.props.active}
            coverChildren={this.props.active}
            style={{ height: '100%' }}
          >
            <div id="children-loader-wrapper" style={{ height: '100%' }}>
              {this.props.children}
            </div>
          </ZIndex>
          {active && (
            <ZIndex
              wrapperRef={this.wrapperRef}
              priority={'Loader'}
              className={cn({
                [jsStyles.active(this.theme)]: active,
              })}
            >
              {this.renderSpinner(type, caption, component)}
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

  private disableChildrenFocus() {
    const element = document.getElementById('children-loader-wrapper');
    if (!element) {
      return;
    }
    const tabbableElements = tabbable(element);
    tabbableElements.forEach((el) => {
      if (!el.hasAttribute('origin-tabindex')) {
        el.setAttribute('origin-tabindex', el.tabIndex + '');
      }
      el.tabIndex = -1;
    });
    this.setState((prevState) => ({
      childrenFocusableElements: [...prevState.childrenFocusableElements, ...tabbableElements],
    }));
  }

  private enableChildrenFocus() {
    this.state.childrenFocusableElements.forEach((el) => {
      const originalTabIndex = el.getAttribute('origin-tabindex');
      el.tabIndex = originalTabIndex ? +originalTabIndex : 0;
      el.removeAttribute('origin-tabindex');
    });
    this.setState({ childrenFocusableElements: [] });
  }

  private makeObservable() {
    const target = document.getElementById('children-loader-wrapper');
    if (!target) {
      return;
    }
    const config = {
      childList: true,
      subtree: true,
    };
    const observer = new MutationObserver(() =>
      this.props.active ? this.disableChildrenFocus() : this.enableChildrenFocus(),
    );
    observer.observe(target, config);
    this.setState({ childrenObserver: observer });
  }
}
