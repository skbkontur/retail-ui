import React from 'react';

import { Theme } from '../../lib/theming/Theme';
import { cx } from '../../lib/theming/Emotion';
import { ZIndex } from '../../internal/ZIndex';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { animations, styles } from './GlobalLoaderView.styles';

interface GlobalLoaderViewProps {
  expectedResponseTime: number;
  delayBeforeHide: number;
  status?: 'success' | 'error' | 'standard';
  disableAnimations: boolean;
  overtime: number;
}

export class GlobalLoaderView extends React.Component<GlobalLoaderViewProps> {
  private theme!: Theme;
  private readonly myRef: React.RefObject<HTMLDivElement>;
  constructor(props: GlobalLoaderViewProps) {
    super(props);
    this.myRef = React.createRef();
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

  private renderMain() {
    const currentWidth = this.myRef.current?.getBoundingClientRect().width || 0;
    const currentLeftPosition = this.myRef.current?.getBoundingClientRect().left || 0;
    return (
      <ZIndex priority="GlobalLoader" className={styles.outer(this.theme)}>
        <div
          ref={this.myRef}
          className={cx(styles.inner(this.theme), {
            [styles.error()]: this.props.status === 'error',
            [animations.successAnimation(this.props.delayBeforeHide, currentWidth, currentLeftPosition)]:
              !this.props.disableAnimations && this.props.status === 'success',
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
