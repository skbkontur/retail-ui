import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { RenderEnvironmentProvider } from '../../../lib/renderEnvironment/index.js';

export const WidgetWrapper = ({ children, containerNode = null }: any) => {
  const [widgetRoot, setWidgetRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const contentWindow = containerNode ? containerNode.ownerDocument.defaultView : window;

    const contentDocument = contentWindow.document;
    const body = contentDocument.body;

    const defaultRoot = containerNode ?? contentDocument.createElement('div');
    defaultRoot.id = 'widgetRoot';
    defaultRoot.style.padding = '10px';
    body.appendChild(defaultRoot);
    setWidgetRoot(defaultRoot);

    return () => {
      setWidgetRoot(null);
      if (defaultRoot) {
        defaultRoot.remove();
      }
    };
  }, []);

  return (
    <>
      {widgetRoot &&
        createPortal(
          <RenderEnvironmentProvider rootNode={widgetRoot}>{children}</RenderEnvironmentProvider>,
          widgetRoot,
        )}
    </>
  );
};
