import React, { useEffect, useState, useRef } from 'react';
import type { Decorator } from '@storybook/react';

import { WidgetWrapper } from './WidgetWrapper';

export const WithIframeInIframe: Decorator = (Story) => {
  const outerIframeRef = useRef<HTMLIFrameElement>(null);

  const [containerNode, setContainerNode] = useState<ChildNode | null>(null);

  useEffect(() => {
    const iframe = outerIframeRef.current;
    if (!iframe) {
      return;
    }
    const setupOuterIframe = () => {
      const doc = iframe.contentDocument;
      if (!doc) {
        return;
      }

      doc.documentElement.innerHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <link nonce="my-super-nonce" rel="stylesheet" href="https://s.kontur.ru/common-v2/fonts/LabGrotesque/LabGrotesque.css" />
            <style nonce="my-super-nonce">
              body {
                font-family: 'Lab Grotesque', sans-serif;
                margin: 0;
                padding: 10px !important;
              }
            </style>
          </head>
          <body>
            <div></div>
          </body>
        </html>
      `;

      const rootDiv = doc.body.firstElementChild;
      setContainerNode(rootDiv);
    };

    setupOuterIframe();
  }, []);

  return (
    <>
      <iframe
        id="outerIframe"
        ref={outerIframeRef}
        src="about:blank"
        title="Внешний iframe-контейнер"
        style={{ minWidth: '500px', minHeight: '500px' }}
      />

      {containerNode && (
        <WidgetWrapper containerNode={containerNode}>
          <Story />
        </WidgetWrapper>
      )}
    </>
  );
};
