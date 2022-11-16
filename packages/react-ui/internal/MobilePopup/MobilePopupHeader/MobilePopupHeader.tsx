import React from 'react';

import { isNonNullable } from '../../../lib/utils';
import { Theme } from '../../../lib/theming/Theme';
import { cx } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { jsStyles } from './MobilePopupHeader.styles';

interface MobilePopupHeaderProps {
  caption?: string;
}

export class MobilePopupHeader extends React.Component<MobilePopupHeaderProps> {
  public static __KONTUR_REACT_UI__ = 'MobileMenuHeader';

  private theme!: Theme;

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
    const { caption, children } = this.props;

    return (
      <div
        className={cx({
          [jsStyles.root(this.theme)]: true,
          [jsStyles.rootWithoutCaption()]: !caption && !children,
        })}
        onClick={this.rootClickHandler}
      >
        <div className={jsStyles.container()}>
          {caption && (
            <div
              className={cx({
                [jsStyles.caption(this.theme)]: true,
                [jsStyles.captionWithChildren()]: isNonNullable(children),
              })}
            >
              {caption}
            </div>
          )}
          {React.isValidElement(children) && <div>{children}</div>}
        </div>
      </div>
    );
  }

  private rootClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
}
