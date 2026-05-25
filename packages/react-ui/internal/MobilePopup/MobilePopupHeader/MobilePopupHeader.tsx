import type { Emotion } from '@emotion/css/create-instance';
import React from 'react';
import type { ReactElement } from 'react';

import { withRenderEnvironment } from '../../../lib/renderEnvironment/index.js';
import type { Theme } from '../../../lib/theming/Theme.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { isThemeGTE } from '../../../lib/theming/ThemeHelpers.js';
import type { SizeProp } from '../../../lib/types/props.js';
import { isNonNullable } from '../../../lib/utils.js';
import { getJsStyles } from './MobilePopupHeader.styles.js';

interface MobilePopupHeaderProps {
  /**
   * Заголовок шапки
   */
  caption?: string;
  size?: SizeProp;
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

  private renderMain(): ReactElement | null {
    const themeGTE6_1 = isThemeGTE(this.theme, '6.1');
    const { caption, children } = this.props;

    if (themeGTE6_1) {
      if (!caption && (!children || !React.isValidElement(children))) {
        return null;
      }

      return (
        <div className={this.getRootSizeClassName_6_1()}>
          <div className={this.getContainerClassName_6_1()}>
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

  private getContainerClassName_6_1 = (): string => {
    switch (this.props.size) {
      case 'large':
        return this.jsStyles.containerLarge_6_1(this.theme);
      case 'medium':
        return this.jsStyles.containerMedium_6_1(this.theme);
      case 'small':
      default:
        return this.jsStyles.containerSmall_6_1(this.theme);
    }
  };

  private getRootSizeClassName_6_1 = (): string => {
    switch (this.props.size) {
      case 'large':
        return this.jsStyles.rootLarge_6_1(this.theme);
      case 'medium':
        return this.jsStyles.rootMedium_6_1(this.theme);
      case 'small':
      default:
        return this.jsStyles.rootSmall_6_1(this.theme);
    }
  };
}
