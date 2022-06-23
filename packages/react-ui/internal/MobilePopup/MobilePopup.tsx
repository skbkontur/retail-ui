import React from 'react';
import { Transition } from 'react-transition-group';

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
  children?: React.ReactNode;
}

interface MobilePopupState {
  isScrolled: boolean;
}

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
          timeout={{ appear: 0, exit: 250 }}
        >
          {(state) => (
            <>
              <div
                className={cx({
                  [jsStyles.container(this.theme)]: true,
                  [jsStyles.containerOpened()]: state === 'entered',
                })}
              >
                <div
                  className={cx({
                    [jsStyles.root(this.theme)]: true,
                    [jsStyles.rootFullHeight(this.theme)]: this.props.useFullHeight,
                  })}
                  onClick={this.props.useFullHeight ? undefined : this.close}
                >
                  <MobilePopupHeader
                    caption={this.props.caption}
                    onClose={this.close}
                    withShadow={this.state.isScrolled}
                  >
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
              </div>
              <div
                onClick={this.close}
                className={cx({
                  [jsStyles.bg()]: true,
                  [jsStyles.bgShowed()]: state === 'entered',
                })}
              />
              <HideBodyVerticalScroll />
            </>
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

  private handleScrollMenu = (e: React.UIEvent<HTMLDivElement>) => {
    if (this.contentDiv) {
      const isScrolled = this.contentDiv.scrollTop > 0;

      if (isScrolled !== this.state.isScrolled) {
        this.setState({ isScrolled });
      }
    }
  };
}
