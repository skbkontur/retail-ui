import type { Emotion } from '@emotion/css/create-instance';
import React from 'react';

import { getFullReactUIFlagsContext } from '../../lib/featureFlagsContext/FeatureFlagsHelpers.js';
import { ReactUIFeatureFlagsContext } from '../../lib/featureFlagsContext/ReactUIFeatureFlagsContext.js';
import { getElementRef } from '../../lib/getElementRef.js';
import type { GlobalObject } from '../../lib/globalObject.js';
import { mergeRefs } from '../../lib/mergeRefs.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { Nullable } from '../../typings/utility-types.js';
import { getStyles } from './ResizeDetector.styles.js';

export interface ResizeDetectorProps {
  onResize?: (event: UIEvent) => void;
  /**
   * Использовать ResizeObserver, если он доступен, иначе — iframe. По умолчанию true.
   * При включённом глобальном флаге resizeDetectorUseIframe используется iframe.
   */
  useResizeObserver?: boolean;
  fullHeight?: boolean;
  alignBaseline?: boolean;
}

@withRenderEnvironment
export class ResizeDetector extends React.Component<React.PropsWithChildren<ResizeDetectorProps>> {
  public static __KONTUR_REACT_UI__ = 'ResizeDetector';
  public static displayName = 'ResizeDetector';
  public static defaultProps = { useResizeObserver: true };
  public static contextType = ReactUIFeatureFlagsContext;
  public context!: React.ContextType<typeof ReactUIFeatureFlagsContext>;

  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private iframeWindow: Window | null = null;

  private shouldUseResizeObserver = () => {
    const flags = getFullReactUIFlagsContext(this.context);
    return (
      !flags.resizeDetectorUseIframe &&
      this.props.useResizeObserver !== false &&
      Boolean(this.globalObject.ResizeObserver)
    );
  };

  private handleIframeResize = (event: UIEvent) => {
    this.props.onResize?.(event);
  };

  private iframeRef = (iframe: HTMLIFrameElement | null) => {
    this.iframeWindow?.removeEventListener('resize', this.handleIframeResize);
    this.iframeWindow = iframe?.contentWindow ?? null;
    this.iframeWindow?.addEventListener('resize', this.handleIframeResize);
  };

  private resizeObserver: Nullable<ResizeObserver> = null;
  private elementRef: Element | null = null;
  private observedElement: Element | null = null;

  private setupObserver = (element: Element | null) => {
    if (this.observedElement === element && this.resizeObserver) {
      return;
    }

    this.resizeObserver?.disconnect();
    this.observedElement = null;

    if (!element || !this.shouldUseResizeObserver() || !this.globalObject.ResizeObserver) {
      return;
    }

    this.resizeObserver = new this.globalObject.ResizeObserver((entries) => {
      if (entries.length > 0 && this.props.onResize) {
        const event = new UIEvent('resize', {
          bubbles: false,
          cancelable: false,
        });

        this.props.onResize(event);
      }
    });

    if (this.resizeObserver) {
      this.resizeObserver.observe(element);
      this.observedElement = element;
    }
  };

  public componentDidMount() {
    this.setupObserver(this.elementRef);
    this.iframeWindow?.addEventListener('resize', this.handleIframeResize);
  }

  public componentWillUnmount() {
    this.iframeWindow?.removeEventListener('resize', this.handleIframeResize);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.observedElement = null;
  }

  private setElementRef = (element: Element | null) => {
    this.elementRef = element;
    this.setupObserver(element);
  };

  public render() {
    const { children, fullHeight, alignBaseline } = this.props;
    if (!this.shouldUseResizeObserver()) {
      const styles = getStyles(this.emotion);
      return (
        <div className={styles.root()}>
          <iframe title="resizeDetector" ref={this.iframeRef} className={styles.iframe()} tabIndex={-1} />
          <div
            className={this.cx(styles.content(), {
              [styles.fullHeight()]: fullHeight,
              [styles.flex()]: alignBaseline,
            })}
          >
            {children}
          </div>
        </div>
      );
    }
    // Observe DOM elements directly; wrap other children to obtain a DOM ref.
    if (React.Children.count(children) === 1 && React.isValidElement(children) && typeof children.type === 'string') {
      const child = children as React.ReactElement<{
        ref?: React.Ref<Element>;
      }>;
      const existingRef = getElementRef(child) as React.Ref<Element>;
      return React.cloneElement(child, {
        ref: mergeRefs(existingRef, this.setElementRef),
      });
    }
    return <div ref={this.setElementRef}>{children}</div>;
  }
}
