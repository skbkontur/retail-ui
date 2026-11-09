import React, { useEffect, useState } from 'react';

import { ReactUIFeatureFlagsContext } from '../../../lib/featureFlagsContext/ReactUIFeatureFlagsContext.js';
import { ResizeDetector } from '../../ResizeDetector/index.js';
import { Popup } from '../Popup.js';

export default { title: 'Popup/Resize regressions' };

export const MaxWidthWithIframe = () => (
  <div>
    <p>Both popups must stay within 200px, including their visible content.</p>
    {[false, true].map((useIframe) => (
      <ReactUIFeatureFlagsContext.Provider key={String(useIframe)} value={{ resizeDetectorUseIframe: useIframe }}>
        <Popup
          id={useIframe ? 'resize-iframe' : 'resize-observer'}
          opened
          disableAnimations
          width={500}
          maxWidth={200}
          positions={['bottom left']}
          anchorElement={
            <span style={{ position: 'absolute', top: useIframe ? 250 : 100, left: 100 }}>
              {useIframe ? 'iframe' : 'ResizeObserver'}
            </span>
          }
        >
          <div style={{ background: '#d9efff', height: 50 }}>Content with width 500px</div>
        </Popup>
      </ReactUIFeatureFlagsContext.Provider>
    ))}
  </div>
);

const SideGrowth = ({ scrolled, animated = false }: { scrolled: boolean; animated?: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const expandedHeight = scrolled ? 300 : 100;

  useEffect(() => {
    const previousScroll = window.scrollY;
    window.scrollTo(0, scrolled ? 100 : 0);
    return () => window.scrollTo(0, previousScroll);
  }, [scrolled]);

  return (
    <div style={{ height: 2000 }}>
      <p style={{ position: 'absolute', top: 400, left: 100 }}>
        Expand the popup. It must move below the anchor and remain fully visible.
      </p>
      <Popup
        id="resize-side-growth"
        opened
        disableAnimations={!animated}
        positions={[scrolled ? 'left middle' : 'right middle', 'bottom left']}
        tryPreserveFirstRenderedPosition
        anchorElement={
          <span style={{ position: 'absolute', top: scrolled ? 120 : 20, left: 300, width: 20, height: 20 }}>A</span>
        }
      >
        <div
          data-tid="ResizeGrowthContent"
          style={{ width: 150, height: expanded ? expandedHeight : 40, background: '#d9efff' }}
        >
          <button onClick={() => setExpanded(!expanded)}>{expanded ? 'Shrink' : 'Expand'}</button>
        </div>
      </Popup>
    </div>
  );
};

export const RightMiddleGrowth = () => <SideGrowth scrolled={false} />;
RightMiddleGrowth.parameters = { creevey: { skip: true } };

export const LeftMiddleGrowthAfterScroll = () => <SideGrowth scrolled />;
LeftMiddleGrowthAfterScroll.parameters = { creevey: { skip: true } };

export const AnimatedPositionChange = () => <SideGrowth scrolled={false} animated />;
AnimatedPositionChange.parameters = { creevey: { skip: true } };

const ResizeProbe = ({ useIframe }: { useIframe: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const [notifications, setNotifications] = useState(0);
  return (
    <div style={{ marginBottom: 32 }}>
      <p>
        {useIframe ? 'iframe' : 'ResizeObserver'}: {notifications} resize notifications
      </p>
      <button onClick={() => setExpanded(!expanded)}>Toggle {useIframe ? 'iframe' : 'ResizeObserver'}</button>
      <ResizeDetector useResizeObserver={!useIframe} onResize={() => setNotifications((count) => count + 1)}>
        <div style={{ width: 200, height: expanded ? 100 : 40, background: '#d9efff' }}>Resizable content</div>
      </ResizeDetector>
    </div>
  );
};

export const StrictModeSubscriptions = () => (
  <React.StrictMode>
    <p>React {React.version}. In React 18 development mode, both counters must increase after Toggle.</p>
    <ResizeProbe useIframe={false} />
    <ResizeProbe useIframe />
  </React.StrictMode>
);
StrictModeSubscriptions.parameters = { creevey: { skip: true } };
