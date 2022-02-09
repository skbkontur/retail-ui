import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FocusLock from 'react-focus-lock';
import { isKeyEscape } from '../../lib/events/keyboard/identifiers';
import LayoutEvents from '../../lib/LayoutEvents';
import { ModalStackSubscription } from '../ModalStack/ModalStack';
import RenderContainer from '../RenderContainer/RenderContainer';
import ZIndex from '../ZIndex/ZIndex';
import stopPropagation from '../../lib/events/stopPropagation';
import HideBodyVerticalScroll from '../HideBodyVerticalScroll/HideBodyVerticalScroll';
import ModalStack from '../ModalStack';
import { ModalContext, ModalContextProps } from './ModalContext';
import { Footer, isFooter } from './ModalFooter';
import { Header, isHeader } from './ModalHeader';
import { Body } from './ModalBody';
import Close from './ModalClose';
import ResizeDetector from '../internal/ResizeDetector';
import { isIE } from '../ensureOldIEClassName';
import styles from './Modal.module.less';
import { cx } from '../../lib/theming/Emotion';
import jsStyles from './Modal.styles';
import { ThemeConsumer } from '../ThemeConsumer';
import { ITheme } from '../../lib/theming/Theme';
import { isBody } from './helpers';

let mountedModalsCount = 0;

export interface ModalProps {
  /**
   * Отключает событие onClose, также дизейблит кнопку закрытия модалки
   */
  disableClose?: boolean;

  /**
   * Выравнивание окна по верху страницы.
   */
  alignTop?: boolean;

  /**
   * Не закрывать окно при клике на фон.
   */
  ignoreBackgroundClick?: boolean;

  /**
   * Не показывать крестик для закрытия окна.
   */
  noClose?: boolean;
  width?: number | string;

  /**
   * Вызывается, когда пользователь запросил закрытие окна (нажал на фон, на
   * Escape или на крестик).
   */
  onClose?: () => void;
}

export interface ModalState {
  stackPosition: number;
  horizontalScroll: boolean;
}

/**
 * Модальное окно
 *
 * Содержит в себе три компоненты: **Modal.Header**,
 * **Modal.Body** и **Modal.Footer**
 *
 * Для отображения серой плашки в футере в компонент
 * **Footer** необходимо передать пропс **panel**
 *
 * Для отключения прилипания шапки и футера
 * в соответствующий компонет нужно передать
 * проп **sticky** со значением **false**
 * (по-умолчанию прилипание включено)
 */
export default class Modal extends React.Component<ModalProps, ModalState> {
  public static Header = Header;
  public static Body = Body;
  public static Footer = Footer;

  public static propTypes = {
    children(props: ModalProps, propName: keyof ModalProps, componentName: string) {
      if (
        React.Children.toArray(props[propName]).some(child => !isHeader(child) && !isBody(child) && !isFooter(child))
      ) {
        return new Error(
          `Only 'Header/Body/Footer' components are allowed for '${propName}' prop of '${componentName}' component`,
        );
      }
    },
  };

  public state: ModalState = {
    stackPosition: 0,
    horizontalScroll: false,
  };

  private theme!: ITheme;
  private stackSubscription: ModalStackSubscription | null = null;
  private containerNode: HTMLDivElement | null = null;
  private mouseDownTarget: EventTarget | null = null;
  private mouseUpTarget: EventTarget | null = null;

  public componentDidMount() {
    this.stackSubscription = ModalStack.add(this, this.handleStackChange);

    if (mountedModalsCount === 0) {
      window.addEventListener('resize', this.checkHorizontalScrollAppearance);
    }

    mountedModalsCount++;
    window.addEventListener('keydown', this.handleKeyDown);
    this.checkHorizontalScrollAppearance();

    if (this.containerNode) {
      this.containerNode.addEventListener('scroll', LayoutEvents.emit);
    }
  }

  public componentWillUnmount() {
    if (--mountedModalsCount === 0) {
      window.removeEventListener('resize', this.checkHorizontalScrollAppearance);
      LayoutEvents.emit();
    }

    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.stackSubscription != null) {
      this.stackSubscription.remove();
    }
    ModalStack.remove(this);

    if (this.containerNode) {
      this.containerNode.removeEventListener('scroll', LayoutEvents.emit);
    }
  }

  public render(): JSX.Element {
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    let hasHeader = false;
    let hasFooter = false;
    let hasPanel = false;

    React.Children.toArray(this.props.children).forEach(child => {
      if (isHeader(child)) {
        hasHeader = true;
      }
      if (isFooter(child)) {
        hasFooter = true;
        if (child.props.panel) {
          hasPanel = true;
        }
      }
    });

    const modalContextProps: ModalContextProps = {
      hasHeader,
      horizontalScroll: this.state.horizontalScroll,
    };
    if (hasHeader && !this.props.noClose) {
      modalContextProps.close = {
        disableClose: this.props.disableClose,
        requestClose: this.requestClose,
      };
    }
    if (!hasFooter) {
      modalContextProps.additionalPadding = true;
    }
    if (hasFooter && hasPanel) {
      modalContextProps.additionalPadding = true;
    }

    const style: { width?: number | string } = {};
    const containerStyle: { width?: number | string } = {};

    if (this.props.width) {
      style.width = this.props.width;
    } else {
      containerStyle.width = 'auto';
    }

    return (
      <RenderContainer>
        <ZIndex priority={'Modal'} className={styles.root}>
          <HideBodyVerticalScroll />
          {this.state.stackPosition === 0 && <div className={cx(styles.bg, jsStyles.bg(this.theme))} />}
          <div
            ref={this.refContainer}
            className={styles.container}
            onMouseDown={this.handleContainerMouseDown}
            onMouseUp={this.handleContainerMouseUp}
            onClick={this.handleContainerClick}
            data-tid="modal-container"
          >
            <div
              className={cx(styles.centerContainer, jsStyles.centerContainer(this.theme), {
                [styles.alignTop]: !!this.props.alignTop,
              })}
              style={containerStyle}
            >
              <div className={cx(styles.window, jsStyles.window(this.theme))} style={style}>
                <ResizeDetector onResize={this.handleResize}>
                  <FocusLock disabled={this.isDisableFocusLock()} autoFocus={false}>
                    {!hasHeader && !this.props.noClose ? (
                      <ZIndex priority={'ModalCross'} className={jsStyles.closeWrapper()}>
                        <Close requestClose={this.requestClose} disableClose={this.props.disableClose} />
                      </ZIndex>
                    ) : null}
                    <ModalContext.Provider value={modalContextProps}>
                      <div>
                        {/* React <= 15. ModalContext.Provider can only receive a single child element. */}
                        {this.props.children}
                      </div>
                    </ModalContext.Provider>
                  </FocusLock>
                </ResizeDetector>
              </div>
            </div>
          </div>
        </ZIndex>
      </RenderContainer>
    );
  }

  private requestClose = () => {
    if (this.props.disableClose) {
      return;
    }
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  private refContainer = (center: HTMLDivElement | null) => {
    this.containerNode = center;
  };

  private handleStackChange = (stack: ReadonlyArray<React.Component>) => {
    this.setState({ stackPosition: stack.indexOf(this) });
  };

  private handleContainerMouseDown = (event: React.MouseEvent) => {
    this.mouseDownTarget = event.target;
  };

  private handleContainerMouseUp = (event: React.MouseEvent) => {
    this.mouseUpTarget = event.target;
  };

  private handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!this.props.ignoreBackgroundClick) {
      const { target, currentTarget } = event;
      if (target === currentTarget && this.mouseDownTarget === currentTarget && this.mouseUpTarget === currentTarget) {
        this.requestClose();
      }
    }
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.state.stackPosition !== 0) {
      return;
    }
    if (isKeyEscape(e)) {
      stopPropagation(e);
      this.requestClose();
    }
  };

  private checkHorizontalScrollAppearance = () => {
    let hasScroll = false;

    if (this.containerNode) {
      const containerClientWidth = this.containerNode.clientWidth;
      const containerScrollWidth = this.containerNode.scrollWidth;
      hasScroll = containerClientWidth < containerScrollWidth;
    }
    if (hasScroll && !this.state.horizontalScroll) {
      this.setState({ horizontalScroll: true });
    } else if (this.state.horizontalScroll) {
      this.setState({ horizontalScroll: false });
    }
  };

  // TODO: без порталов ломается сохранение фокуса внутри модалки
  // NOTE: в ie нормально не работает
  private isDisableFocusLock = () => {
    return !ReactDOM.createPortal || isIE;
  };

  private handleResize = (event: UIEvent) => {
    LayoutEvents.emit();
  };
}
