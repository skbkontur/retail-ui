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
    return [
      <iframe
        key="resize-detecter-iframe"
        ref={this.iframeRef}
        className={styles.root}
      />,
      <div key="resize-detecter-content" className={styles.content}>
        {this.props.children}
      </div>
    ];
  }

  private iframeRef = (iframe: HTMLIFrameElement) => {
    if (iframe && iframe.contentWindow && !this.iframe) {
      this.iframe = iframe;

      if (this.iframe.parentElement) {
        const parentStyles = window.getComputedStyle(this.iframe.parentElement);

        if (parentStyles.getPropertyValue('position') === 'static') {
          parentStyles.setProperty('position', 'relative');
        }
      }

      if (this.iframe.contentWindow) {
        this.iframe.contentWindow.onresize = this.props.onResize || null;
      }
    }
  };
}
