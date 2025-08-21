import type { HTMLAttributes } from 'react';
import React from 'react';
import { Transition } from 'react-transition-group';

import type { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { RenderContainer } from '../RenderContainer';
import { HideBodyVerticalScroll } from '../HideBodyVerticalScroll';
import { ZIndex } from '../ZIndex';
import { RenderLayer } from '../RenderLayer';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';

import { jsStyles } from './MobilePopup.styles';
import { MobilePopupHeader } from './MobilePopupHeader';
import { MobilePopupFooter } from './MobilePopupFooter';

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
} as const;

@rootNode
export class MobilePopup extends React.Component<MobilePopupProps> {
  public static __KONTUR_REACT_UI__ = 'MobileMenuHeader';
  public static displayName = 'MobileMenuHeader';

  // see #2873 and #2895
  public static readonly defaultRootNode = null;

  private theme!: Theme;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

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

  public renderMain() {
    const content = (
      <ZIndex id={this.props.id} className={jsStyles.zIndex()} priority={'MobilePopup'}>
        <Transition in={this.props.opened} onExited={this.props.onClose} mountOnEnter unmountOnExit timeout={0}>
          <div className={jsStyles.wrapper()}>
            <RenderLayer onClickOutside={this.close}>
              <div
                ref={this.setRootNode}
                data-tid={MobilePopupDataTids.container}
                className={jsStyles.container(this.theme)}
              >
                <div data-tid={MobilePopupDataTids.root} className={jsStyles.root(this.theme)}>
                  <MobilePopupHeader caption={this.props.caption}>{this.props.headerChildComponent}</MobilePopupHeader>
                  <div className={jsStyles.content(this.theme)}>{this.props.children}</div>
                  <MobilePopupFooter>{this.props.footerChildComponent}</MobilePopupFooter>
                </div>
                <div onClick={this.close} className={jsStyles.bottomIndent()} />
              </div>
            </RenderLayer>
            <div className={jsStyles.bg()} />
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

  public close = () => {
    if (this.props.onCloseRequest) {
      this.props.onCloseRequest();
    }
  };
}
