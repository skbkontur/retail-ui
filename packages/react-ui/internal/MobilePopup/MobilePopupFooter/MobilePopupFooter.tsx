import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { Theme } from '../../../lib/theming/Theme';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { EmotionConsumer } from '../../../lib/theming/Emotion';

import { getStyles } from './MobilePopupFooter.styles';

export class MobilePopupFooter extends React.Component<React.PropsWithChildren> {
  public static __KONTUR_REACT_UI__ = 'MobileMenuFooter';

  private theme!: Theme;
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;

  public render() {
    return (
      <EmotionConsumer>
        {(emotion: Emotion) => {
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

  private renderMain() {
    const { children } = this.props;

    if (!children || !React.isValidElement(children)) {
      return null;
    }

    return <div className={this.styles.root(this.theme)}>{children}</div>;
  }
}
