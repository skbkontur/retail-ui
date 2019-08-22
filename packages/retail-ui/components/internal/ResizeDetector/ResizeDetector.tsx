import * as React from 'react';
import styles from './ResizeDetector.module.less';

export interface ResizeDetectorProps {
  onResize?: (event: UIEvent) => void;
}

export default class ResizeDetector extends React.Component<ResizeDetectorProps> {
  private iframeWindow: Window | null = null;

  public componentDidMount() {
    if (this.iframeWindow) {
      this.iframeWindow.addEventListener('resize', this.handleResize);
    }
  }

  public render() {
    return (
      <div className={styles.root}>
        <iframe ref={this.iframeRef} className={styles.iframe} />
        <div className={styles.content}>{this.props.children}</div>
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
