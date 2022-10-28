import React from 'react';
import { Transition } from 'react-transition-group';

import { isNullable } from '../../lib/utils';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Nullable } from '../../typings/utility-types';
import { RenderContainer } from '../RenderContainer';
import { HideBodyVerticalScroll } from '../HideBodyVerticalScroll';
import { ZIndex } from '../ZIndex';
import { cx } from '../../lib/theming/Emotion';

import { jsStyles } from './MobilePopup.styles';
import { MobilePopupHeader } from './MobilePopupHeader';

interface MobilePopupProps {
  /**
   * Хэндлер, вызываемый при закрытии меню
   */
  onClose?: () => void;
  caption?: string;
  /**
   * Компонент, закрепленный сверху меню (под холдером)
   */
  headerChildComponent?: React.ReactNode;
  useFullHeight?: boolean;
  withoutRenderContainer?: boolean;
  /**
   * Хэндлер, вызываемый при клике по вуали или заголовку
   */
  onCloseRequest?: () => void;
  opened: boolean;
  /**
   * Отключает анимацию компонента
   */
  disableAnimation?: boolean;
}

interface MobilePopupState {
  isScrolled: boolean;
}

export const MobilePopupDataTids = {
  root: 'MobilePopup__root',
  container: 'MobilePopup__container',
} as const;

export class MobilePopup extends React.Component<MobilePopupProps, MobilePopupState> {
  public static __KONTUR_REACT_UI__ = 'MobileMenuHeader';

  private contentDiv: Nullable<HTMLDivElement>;
  private theme!: Theme;

  public state: MobilePopupState = {
    isScrolled: false,
  };

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
      <ZIndex priority={'MobilePopup'}>
        <Transition
          in={this.props.opened}
          onExited={this.props.onClose}
          mountOnEnter
          unmountOnExit
          appear
          timeout={{ appear: 0, exit: this.props.disableAnimation ? 0 : 250 }}
        >
          {(state) => (
            <div className={jsStyles.wrapper()}>
              <div
                data-tid={MobilePopupDataTids.container}
                className={cx({
                  [jsStyles.container(this.theme)]: true,
                  [jsStyles.containerAnimation()]: !this.props.disableAnimation,
                  [jsStyles.containerOpenedAnimation()]: !this.props.disableAnimation,
                  [jsStyles.containerOpenedAnimation()]: state === 'entered' && !this.props.disableAnimation,
                })}
              >
                <div
                  data-tid={MobilePopupDataTids.root}
                  className={cx({
                    [jsStyles.root(this.theme)]: true,
                    [jsStyles.rootFullHeight(this.theme)]: this.props.useFullHeight,
                    [jsStyles.rootWithChildren()]: isNullable(this.props.children),
                  })}
                  onClick={this.props.useFullHeight ? undefined : this.close}
                >
                  <MobilePopupHeader caption={this.props.caption} onClose={this.close}>
                    {this.props.headerChildComponent}
                  </MobilePopupHeader>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={jsStyles.content(this.theme)}
                    onScroll={this.handleScrollMenu}
                    ref={this.refContent}
                  >
                    {this.props.children}
                  </div>
                </div>
                <div onClick={this.close} className={jsStyles.bottomIndent()} />
              </div>
              <div
                onClick={this.close}
                className={cx({
                  [jsStyles.bg()]: true,
                  [jsStyles.bgAnimation()]: !this.props.disableAnimation,
                  [jsStyles.bgShowed()]: state === 'entered',
                  [jsStyles.bgShowedAnimation()]: !this.props.disableAnimation,
                })}
              />
              <HideBodyVerticalScroll />
            </div>
          )}
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

  private refContent = (contentDiv: HTMLDivElement) => {
    this.contentDiv = contentDiv;
  };

  private handleScrollMenu = () => {
    if (this.contentDiv) {
      const isScrolled = this.contentDiv.scrollTop > 0;

      if (isScrolled !== this.state.isScrolled) {
        this.setState({ isScrolled });
      }
    }
  };
}
