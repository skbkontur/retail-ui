import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { isNonNullable } from '../../../lib/utils';
import { Theme } from '../../../lib/theming/Theme';
import { EmotionConsumer } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { getStyles } from './MobilePopupHeader.styles';

interface MobilePopupHeaderProps {
  /**
   * Заголовок шапки
   */
  caption?: string;
}

export class MobilePopupHeader extends React.Component<React.PropsWithChildren<MobilePopupHeaderProps>> {
  public static __KONTUR_REACT_UI__ = 'MobileMenuHeader';
  public static displayName = 'MobileMenuHeader';

  private theme!: Theme;
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;

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

  private renderMain() {
    const { caption, children } = this.props;
    const styles = this.styles;

    return (
      <div
        className={this.emotion.cx({
          [styles.root(this.theme)]: true,
          [styles.rootWithoutContent()]: !caption && !children,
        })}
      >
        <div className={styles.container()}>
          {caption && (
            <div
              className={this.emotion.cx({
                [styles.caption(this.theme)]: true,
                [styles.captionWithChildren()]: isNonNullable(children),
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
