import React, { HTMLAttributes } from 'react';
import { Transition } from 'react-transition-group';
import type { Emotion } from '@emotion/css/create-instance';

import { Theme } from '../../lib/theming/Theme';
import { RenderContainer } from '../RenderContainer';
import { HideBodyVerticalScroll } from '../HideBodyVerticalScroll';
import { ZIndex } from '../ZIndex';
import { RenderLayer } from '../RenderLayer';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { EmotionConsumer } from '../../lib/theming/Emotion';

import { MobilePopupHeader } from './MobilePopupHeader';
import { MobilePopupFooter } from './MobilePopupFooter';
import { getStyles } from './MobilePopup.styles';

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
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
  private setRootNode!: TSetRootNode;

  public render() {
    return (
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
          this.styles = getStyles(this.emotion);
          return (
            <ThemeContext.Consumer>
              {(theme) => {
                this.theme = theme;
                return this.renderMain();
              }}
            </ThemeContext.Consumer>
          );
        }}
      </EmotionConsumer>
    );
  }

  public renderMain() {
    const styles = this.styles;
    const content = (
      <ZIndex id={this.props.id} className={styles.zIndex()} priority={'MobilePopup'}>
        <Transition in={this.props.opened} onExited={this.props.onClose} mountOnEnter unmountOnExit timeout={0}>
          <div className={styles.wrapper()}>
            <RenderLayer onClickOutside={this.close}>
              <div
                ref={this.setRootNode}
                data-tid={MobilePopupDataTids.container}
                className={styles.container(this.theme)}
              >
                <div data-tid={MobilePopupDataTids.root} className={styles.root(this.theme)}>
                  <MobilePopupHeader caption={this.props.caption}>{this.props.headerChildComponent}</MobilePopupHeader>
                  <div className={styles.content(this.theme)}>{this.props.children}</div>
                  <MobilePopupFooter>{this.props.footerChildComponent}</MobilePopupFooter>
                </div>
                <div onClick={this.close} className={styles.bottomIndent()} />
              </div>
            </RenderLayer>
            <div className={styles.bg()} />
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
