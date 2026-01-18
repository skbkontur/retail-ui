import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { isNonNullable } from '../../../lib/utils.js';
import type { Theme } from '../../../lib/theming/Theme.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { withRenderEnvironment } from '../../../lib/renderEnvironment/index.js';

import { getJsStyles } from './MobilePopupHeader.styles.js';

interface MobilePopupHeaderProps {
  /**
   * Заголовок шапки
   */
  caption?: string;
}

@withRenderEnvironment
export class MobilePopupHeader extends React.Component<React.PropsWithChildren<MobilePopupHeaderProps>> {
  public static __KONTUR_REACT_UI__ = 'MobileMenuHeader';
  public static displayName = 'MobileMenuHeader';

  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private jsStyles!: ReturnType<typeof getJsStyles>;
  private theme!: Theme;

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

  private renderMain() {
    const { caption, children } = this.props;

    return (
      <div
        className={this.cx({
          [this.jsStyles.root(this.theme)]: true,
          [this.jsStyles.rootWithoutContent()]: !caption && !children,
        })}
      >
        <div className={this.jsStyles.container()}>
          {caption && (
            <div
              className={this.cx({
                [this.jsStyles.caption(this.theme)]: true,
                [this.jsStyles.captionWithChildren()]: isNonNullable(children),
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
}
