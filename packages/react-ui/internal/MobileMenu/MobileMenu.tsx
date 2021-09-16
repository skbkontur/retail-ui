import React from 'react';

import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { MobileMenuHeader } from '../MobileMenuHeader';
import { Nullable } from '../../typings/utility-types';
import { DropdownContainer } from '../DropdownContainer';
import { cx } from '../../lib/theming/Emotion';

import { jsStyles } from './MobileMenu.styles';

interface MobileMenuProps {
  caption?: string;
  onClose: () => void;
  /**
   * Компонент, закрепленный ниже заголовка
   */
  headerChildComponent?: React.ReactNode;
  /**
   * Убрать бордер-радиусы
   */
  withoutBorderRadius?: boolean;
  maxMenuHeight?: number;
  useFullHeight?: boolean;
}

interface MobileMenuState {
  isScrolled: boolean;
}

export class MobileMenu extends React.Component<MobileMenuProps, MobileMenuState> {
  public static __KONTUR_REACT_UI__ = 'MobileMenuHeader';

  private rootDiv: Nullable<HTMLDivElement>;
  private theme!: Theme;

  public state: MobileMenuState = {
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
    return (
      <DropdownContainer
        getParent={() => null}
        mobileCloseHandler={this.props.onClose}
        mobileUseFullHeight={this.props.useFullHeight}
      >
        <div
          className={cx({
            [jsStyles.root(this.theme)]: true,
            [jsStyles.rootFullHeight(this.theme)]: this.props.useFullHeight,
          })}
          onClick={this.props.useFullHeight ? undefined : this.props.onClose}
        >
          <MobileMenuHeader
            caption={this.props.caption}
            onClose={this.props.onClose}
            withoutBorderRadius={this.props.withoutBorderRadius}
            withShadow={this.state.isScrolled}
          >
            {this.props.headerChildComponent}
          </MobileMenuHeader>
          <div
            className={jsStyles.content(this.theme)}
            style={{ height: this.props.maxMenuHeight || undefined }}
            onScroll={this.handleScrollMenu}
            ref={this.refRoot}
          >
            {this.props.children}
          </div>
        </div>
      </DropdownContainer>
    );
  }

  private refRoot = (rootDiv: HTMLDivElement) => {
    this.rootDiv = rootDiv;
  };

  private handleScrollMenu = (e: React.UIEvent<HTMLDivElement>) => {
    if (this.rootDiv) {
      const isScrolled = this.rootDiv.scrollTop > 0;

      if (isScrolled !== this.state.isScrolled) {
        this.setState({ isScrolled });
      }
    }
  };
}
