import React from 'react';
import { createRoot } from 'react-dom/client';

export const IframeRenderer = ({ children, extraHTML = '', width = 150, height = 70, id = '' }: any) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if (iframeRef.current) {
      const contentWindow: any = iframeRef.current.contentWindow;
      const root = contentWindow.document ?? contentWindow.contentDocument;
      root.write(`
        ${extraHTML}
        <link nonce="my-super-nonce" rel="stylesheet" href="https://s.kontur.ru/common-v2/fonts/LabGrotesque/LabGrotesque.css" />
        <style nonce="my-super-nonce">
          html,
          body {
            font-family: 'Lab Grotesque', 'Helvetica Neue', Roboto, Arial, sans-serif;
            font-size: 14px;
            margin: 0;
            background: white;
            color: rgba(0, 0, 0, 0.87);
            padding: 0 !important;
            height: 100%;
          }
          input {
            caret-color: transparent;
          }
        </style>
        <div id="root" />
      `);
      createRoot(root.getElementById('root')).render(children);
    }
  }, [children]);

  return (
    <iframe name="foobar" ref={iframeRef} src="about:blank" title="foobar" width={width} height={height} id={id} />
  );
};
