import type { Emotion } from '@emotion/css/create-instance';
import type { HTMLAttributes } from 'react';
import React from 'react';
import { Transition } from 'react-transition-group';

import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { HideBodyVerticalScroll } from '../HideBodyVerticalScroll/index.js';
import { RenderContainer } from '../RenderContainer/index.js';
import { RenderLayer } from '../RenderLayer/index.js';
import { ZIndex } from '../ZIndex/index.js';
import { getJsStyles } from './MobilePopup.styles.js';
import { MobilePopupFooter } from './MobilePopupFooter/index.js';
import { MobilePopupHeader } from './MobilePopupHeader/index.js';

interface MobilePopupProps extends Pick<HTMLAttributes<HTMLDivElement>, 'id'> {
  /**
   * Функция, вызываемая при закрытии всплывающего окна
   */
  onClose?: () => void;
  /**
   * Заголовок всплывающего окна, располагается в шапке
   */
  caption?: string;
  /**
   * Шапка всплывающего окна
   */
  headerChildComponent?: React.ReactNode;
  /**
   * Подвал всплывающего окна
   */
  footerChildComponent?: React.ReactNode;
  /**
   * Позволяет получить контент всплывающего окна без обёртки в виде `RenderContainer`
   */
  withoutRenderContainer?: boolean;
  /**
   * Функция, вызываемая при клике по вуали
   */
  onCloseRequest?: () => void;
  /**
   * Позволяет контролировать текущее состояние всплывающего окна
   */
  opened: boolean;
  children?: React.ReactNode;
}

export const MobilePopupDataTids = {
  root: 'MobilePopup__root',
  container: 'MobilePopup__container',
  backdrop: 'MobilePopup__backdrop',
} as const;

@withRenderEnvironment
@rootNode
export class MobilePopup extends React.Component<MobilePopupProps> {
  public static __KONTUR_REACT_UI__ = 'MobileMenuHeader';
  public static displayName = 'MobileMenuHeader';
  private refForTransition = React.createRef<HTMLDivElement>();

  // see #2873 and #2895
  public static readonly defaultRootNode = null;

  private emotion!: Emotion;
  private jsStyles!: ReturnType<typeof getJsStyles>;
  private theme!: Theme;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  public render() {
    this.jsStyles = getJsStyles(this.emotion);
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMain() {
    const content = (
      <ZIndex id={this.props.id} className={this.jsStyles.zIndex()} priority={'MobilePopup'}>
        <Transition
          in={this.props.opened}
          onExited={this.props.onClose}
          mountOnEnter
          unmountOnExit
          timeout={0}
          nodeRef={this.refForTransition}
        >
          <div className={this.jsStyles.wrapper()} ref={this.refForTransition}>
            <RenderLayer onClickOutside={this.close}>
              <div
                ref={this.setRootNode}
                data-tid={MobilePopupDataTids.container}
                className={this.jsStyles.container(this.theme)}
              >
                <div data-tid={MobilePopupDataTids.root} className={this.jsStyles.root(this.theme)}>
                  <MobilePopupHeader caption={this.props.caption}>{this.props.headerChildComponent}</MobilePopupHeader>
                  <div className={this.jsStyles.content(this.theme)}>{this.props.children}</div>
                  <MobilePopupFooter>{this.props.footerChildComponent}</MobilePopupFooter>
                </div>
                <div onClick={this.close} className={this.jsStyles.bottomIndent()} />
              </div>
            </RenderLayer>
            <div
              data-tid={MobilePopupDataTids.backdrop}
              className={this.jsStyles.bg()}
              onClick={this.backdropClick}
              onMouseDown={this.backdropStopPropagation}
              onPointerDownCapture={this.backdropStopPropagation}
              onPointerUpCapture={this.backdropStopPropagation}
            />
            <HideBodyVerticalScroll />
          </div>
        </Transition>
      </ZIndex>
    );

    if (this.props.withoutRenderContainer) {
      return content;
    }

    return <RenderContainer>{content}</RenderContainer>;
  }

  public close = (): void => {
    if (this.props.onCloseRequest) {
      this.props.onCloseRequest();
    }
  };

  /** Не даём событию дойти до document (`RenderLayer` / «клик сквозь» вуаль).
   *  В мобильных браузерах pointerup может породить click по нижележащему элементу.
   *  Гасим его на вуали, а закрытие остаётся на обычном click по backdrop.
   */
  private backdropStopPropagation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  private backdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    this.backdropStopPropagation(event);
    this.close();
  };
}
