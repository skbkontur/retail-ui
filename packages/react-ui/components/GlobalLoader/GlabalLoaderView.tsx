import React from 'react';

import { Theme } from '../../lib/theming/Theme';
import { cx } from '../../lib/theming/Emotion';
import { ZIndex } from '../../internal/ZIndex';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { animations, styles } from './GlobalLoaderView.styles';

interface GlobalLoaderViewProps {
  expectedResponseTime: number;
  status?: 'success' | 'error' | 'standard';
  disableAnimations: boolean;
  overtime: number;
}

export class GlobalLoaderView extends React.Component<GlobalLoaderViewProps> {
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
    return (
      <ZIndex priority="GlobalLoader" className={styles.outer(this.theme)}>
        <div
          className={cx(styles.inner(this.theme), {
            [animations.successAnimation()]: !this.props.disableAnimations && this.props.status === 'success',
            [styles.successWithoutAnimation()]: this.props.disableAnimations && this.props.status === 'success',
            [animations.errorAnimation(this.theme)]: !this.props.disableAnimations && this.props.status === 'error',
            [styles.errorWithoutAnimation()]: this.props.disableAnimations && this.props.status === 'error',
            [animations.standardAnimation(this.theme, this.props.expectedResponseTime, this.props.overtime)]:
              !this.props.disableAnimations && this.props.status === 'standard',
          })}
        />
      </ZIndex>
    );
  }
}
