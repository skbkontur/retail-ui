import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { withRenderEnvironment } from '../../lib/renderEnvironment';

import { getStyles } from './ResizeDetector.styles';

export interface ResizeDetectorProps {
  onResize?: (event: UIEvent) => void;
  fullHeight?: boolean;
  alignBaseline?: boolean;
}

@withRenderEnvironment
export class ResizeDetector extends React.Component<React.PropsWithChildren<ResizeDetectorProps>> {
  public static __KONTUR_REACT_UI__ = 'ResizeDetector';
  public static displayName = 'ResizeDetector';

  private iframeWindow: Window | null = null;
  private styles!: ReturnType<typeof getStyles>;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];

  public componentDidMount() {
    if (this.iframeWindow) {
      this.iframeWindow.addEventListener('resize', this.handleResize);
    }
  }

  public render() {
    this.styles = getStyles(this.emotion);

    return (
      <div className={this.styles.root()}>
        <iframe title="resizeDetector" ref={this.iframeRef} className={this.styles.iframe()} tabIndex={-1} />
        <div
          className={this.cx({
            [this.styles.content()]: true,
            [this.styles.fullHeight()]: this.props.fullHeight,
            [this.styles.flex()]: this.props.alignBaseline,
          })}
        >
          {this.props.children}
        </div>
      </div>
    );
  }

  private handleResize = (event: UIEvent) => {
    if (this.props.onResize) {
      this.props.onResize(event);
    }
  };

  private iframeRef = (iframe: HTMLIFrameElement) => {
    if (iframe && iframe.contentWindow) {
      this.iframeWindow = iframe.contentWindow;
    }
  };
}
