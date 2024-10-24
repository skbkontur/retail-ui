import React from 'react';

import { EmotionConsumer } from '../../lib/theming/Emotion';

import { getStyles } from './ResizeDetector.styles';

export interface ResizeDetectorProps {
  onResize?: (event: UIEvent) => void;
  fullHeight?: boolean;
}

export class ResizeDetector extends React.Component<React.PropsWithChildren<ResizeDetectorProps>> {
  public static __KONTUR_REACT_UI__ = 'ResizeDetector';
  public static displayName = 'ResizeDetector';

  private iframeWindow: Window | null = null;

  public componentDidMount() {
    if (this.iframeWindow) {
      this.iframeWindow.addEventListener('resize', this.handleResize);
    }
  }

  public render() {
    return (
      <EmotionConsumer>
        {(emotion) => {
          const styles = getStyles(emotion);
          return (
            <div className={styles.root()}>
              <iframe title="resizeDetector" ref={this.iframeRef} className={styles.iframe()} tabIndex={-1} />
              <div className={emotion.cx({ [styles.content()]: true, [styles.fullHeight()]: this.props.fullHeight })}>
                {this.props.children}
              </div>
            </div>
          );
        }}
      </EmotionConsumer>
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
