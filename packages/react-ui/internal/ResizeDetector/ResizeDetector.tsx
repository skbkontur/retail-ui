import React from 'react';
import cn from 'classnames';

import { jsStyles } from './ResizeDetector.styles';

export interface ResizeDetectorProps {
  onResize?: (event: UIEvent) => void;
  fullHeight?: boolean;
}

export class ResizeDetector extends React.Component<ResizeDetectorProps> {
  public static __KONTUR_REACT_UI__ = 'ResizeDetector';

  private iframeWindow: Window | null = null;

  public componentDidMount() {
    if (this.iframeWindow) {
      this.iframeWindow.addEventListener('resize', this.handleResize);
    }
  }

  public render() {
    return (
      <div className={jsStyles.root()}>
        <iframe title="resizeDetector" ref={this.iframeRef} className={jsStyles.iframe()} tabIndex={-1} />
        <div className={cn(jsStyles.content(), { [jsStyles.fullHeight()]: this.props.fullHeight })}>
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
