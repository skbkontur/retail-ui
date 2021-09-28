import React from 'react';

import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Nullable } from '../../typings/utility-types';
import { RenderContainer } from '../RenderContainer';
import { HideBodyVerticalScroll } from '../HideBodyVerticalScroll';
import { cx } from '../../lib/theming/Emotion';

import { jsStyles } from './MobilePopup.styles';
import { MobilePopupHeader } from './MobilePopupHeader';

interface MobilePopupProps {
  caption?: string;
  onClose: () => void;
  /**
   * Компонент, закрепленный сверху меню (под холдером)
   */
  headerChildComponent?: React.ReactNode;
  useFullHeight?: boolean;
}

interface MobilePopupState {
  isScrolled: boolean;
  isOpened: boolean;
}

export class MobilePopup extends React.Component<MobilePopupProps, MobilePopupState> {
  public static __KONTUR_REACT_UI__ = 'MobileMenuHeader';

  private contentDiv: Nullable<HTMLDivElement>;
  private theme!: Theme;

  public state: MobilePopupState = {
    isScrolled: false,
    isOpened: false,
  };

  public componentDidMount() {
    this.setState({ isOpened: true });
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

  public renderMain() {
    return (
      <RenderContainer>
        <div
          className={cx({
            [jsStyles.container(this.theme)]: true,
            [jsStyles.containerOpened()]: this.state.isOpened,
          })}
        >
          <div
            className={cx({
              [jsStyles.root(this.theme)]: true,
              [jsStyles.rootFullHeight(this.theme)]: this.props.useFullHeight,
            })}
            onClick={this.props.useFullHeight ? undefined : this.closeHandler}
          >
            <MobilePopupHeader
              caption={this.props.caption}
              onClose={this.closeHandler}
              withShadow={this.state.isScrolled}
            >
              {this.props.headerChildComponent}
            </MobilePopupHeader>
            <div className={jsStyles.content(this.theme)} onScroll={this.handleScrollMenu} ref={this.refContent}>
              {this.props.children}
            </div>
          </div>
        </div>
        <HideBodyVerticalScroll />
        <div onClick={this.closeHandler} className={jsStyles.bg()} />
      </RenderContainer>
    );
  }

  private closeHandler = () => {
    this.setState({
      isOpened: false,
    });

    setTimeout(this.props.onClose, 250);
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
