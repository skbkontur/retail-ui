import * as React from 'react';
import styles from './ResizeDetecter.less';

export interface ResizeDetecterProps {
  onResize?: (event: UIEvent) => void;
}

export default class ResizeDetecter extends React.Component<
  ResizeDetecterProps
> {
  private iframe: HTMLIFrameElement | null = null;

  public componentWillUnmount() {
    if (
      this.iframe &&
      this.iframe.contentWindow &&
      this.iframe.contentWindow.onresize
    ) {
      this.iframe.contentWindow.onresize = null;
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

  private iframeRef = (iframe: HTMLIFrameElement) => {
    if (iframe && iframe.contentWindow && !this.iframe) {
      this.iframe = iframe;

      if (this.iframe.contentWindow) {
        this.iframe.contentWindow.onresize = this.props.onResize || null;
      }
    }
  };
}
