import { act, cleanup, render } from '@testing-library/react';
import React from 'react';

import { ResizeDetector } from '../ResizeDetector.js';

// React 18 StrictMode replays these lifecycles without detaching DOM refs.
// Replay explicitly so this regression is also covered when running on React 19,
// which additionally replays ref callbacks and can hide the lost subscription.
const replayReact18StrictModeMount = (detector: ResizeDetector) => {
  act(() => {
    detector.componentWillUnmount();
    detector.componentDidMount();
  });
};

describe('ResizeDetector after React 18 StrictMode mount replay', () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('continues delivering iframe resize events', () => {
    const detectorRef = React.createRef<ResizeDetector>();
    const onResize = vi.fn();
    const { getByTitle } = render(
      <ResizeDetector ref={detectorRef} useResizeObserver={false} onResize={onResize}>
        <div>Content</div>
      </ResizeDetector>,
    );
    const iframe = getByTitle('resizeDetector') as HTMLIFrameElement;
    const resize = () => {
      act(() => {
        iframe.contentWindow?.dispatchEvent(new Event('resize'));
      });
    };

    resize();
    expect(onResize).toHaveBeenCalledTimes(1);
    onResize.mockClear();

    replayReact18StrictModeMount(detectorRef.current!);
    resize();

    expect(onResize).toHaveBeenCalledTimes(1);
    expect(onResize).toHaveBeenCalledWith(expect.objectContaining({ type: 'resize' }));
  });

  it('continues delivering ResizeObserver notifications', () => {
    const subscriptions = new Map<ResizeObserver, { callback: ResizeObserverCallback; element: Element }>();
    class ResizeObserverMock {
      public constructor(private callback: ResizeObserverCallback) {}

      public observe(element: Element) {
        subscriptions.set(this as unknown as ResizeObserver, { callback: this.callback, element });
      }

      public disconnect() {
        subscriptions.delete(this as unknown as ResizeObserver);
      }
    }
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);

    const detectorRef = React.createRef<ResizeDetector>();
    const onResize = vi.fn();
    render(
      <ResizeDetector ref={detectorRef} onResize={onResize}>
        <div>Content</div>
      </ResizeDetector>,
    );
    const resize = () => {
      act(() => {
        subscriptions.forEach(({ callback, element }, observer) => {
          callback([{ target: element } as ResizeObserverEntry], observer);
        });
      });
    };

    resize();
    expect(onResize).toHaveBeenCalledTimes(1);
    onResize.mockClear();

    replayReact18StrictModeMount(detectorRef.current!);
    resize();

    expect(onResize).toHaveBeenCalledTimes(1);
    expect(onResize).toHaveBeenCalledWith(expect.objectContaining({ type: 'resize' }));
  });
});
