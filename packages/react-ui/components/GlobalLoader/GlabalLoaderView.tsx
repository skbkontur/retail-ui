import React from 'react';

import { AnimationKeyframes } from '../../lib/theming/AnimationKeyframes';
import { Theme } from '../../lib/theming/Theme';
import { cx } from '../../lib/theming/Emotion';
import { ZIndex } from '../../internal/ZIndex';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { styles } from './GlobalLoaderView.styles';

interface GlobalLoaderViewProps {
  expectedResponseTime: number;
  status?: 'success' | 'error';
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
            [styles.fullWidth()]: this.props.status === 'success',
          })}
          style={{
            animation: this.getAnimation(),
          }}
        />
      </ZIndex>
    );
  }
  private getAnimation(): string {
    const waitingFactor = parseInt(this.theme.globalLoaderWaitingFactor);
    const transitionDuration = parseInt(this.theme.globalLoaderTransitionDuration);
    const spinnerAnimationDuration = parseInt(this.theme.globalLoaderSpinnerAnimationDuration);

    if (this.props.status === 'success') {
      return 'none';
    }
    if (this.props.status === 'error') {
      return `${AnimationKeyframes.globalLoaderMoveToRight()} ${transitionDuration}ms linear, ${spinnerAnimationDuration}ms ${AnimationKeyframes.globalLoaderSpinner()} ${transitionDuration}ms infinite alternate`;
    }
    return `${AnimationKeyframes.globalLoaderProgress()} ${this.props.expectedResponseTime}ms linear, ${
      this.props.expectedResponseTime! * waitingFactor
    }ms ${AnimationKeyframes.globalLoaderSlowProgress()} ${
      this.props.expectedResponseTime
    }ms ease-out, ${transitionDuration}ms ${AnimationKeyframes.globalLoaderMoveToRight()} ${
      this.props.expectedResponseTime! * (waitingFactor + 1)
    }ms linear, ${spinnerAnimationDuration}ms ${AnimationKeyframes.globalLoaderSpinner()} ${
      this.props.expectedResponseTime! * (waitingFactor + 1) + transitionDuration
    }ms infinite alternate`;
  }
}
