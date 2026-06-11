import type { Emotion } from '@emotion/css/create-instance';
import type { PropsWithChildren } from 'react';
import React from 'react';

import { withRenderEnvironment } from '../../../lib/renderEnvironment/index.js';
import type { Theme } from '../../../lib/theming/Theme.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { isThemeGTE } from '../../../lib/theming/ThemeHelpers.js';
import type { SizeProp } from '../../../lib/types/props.js';
import { getJsStyles } from './MobilePopupFooter.styles.js';

interface Props extends PropsWithChildren {
  size?: SizeProp;
}

@withRenderEnvironment
export class MobilePopupFooter extends React.Component<Props> {
  public static __KONTUR_REACT_UI__ = 'MobileMenuFooter';

  private jsStyles!: ReturnType<typeof getJsStyles>;
  private emotion!: Emotion;
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
    const themeGTE6_1 = isThemeGTE(this.theme, '6.1');
    const { children } = this.props;

    if (!children || !React.isValidElement(children)) {
      return null;
    }

    if (themeGTE6_1) {
      return <div className={this.getRootSizeClassName6_1()}>{children}</div>;
    }

    return <div className={this.jsStyles.root(this.theme)}>{children}</div>;
  }

  private getRootSizeClassName6_1 = (): string => {
    switch (this.props.size) {
      case 'large':
        return this.jsStyles.rootLarge6_1(this.theme);
      case 'medium':
        return this.jsStyles.rootMedium6_1(this.theme);
      case 'small':
      default:
        return this.jsStyles.rootSmall6_1(this.theme);
    }
  };
}
