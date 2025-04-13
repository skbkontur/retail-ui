import React from 'react';
import ReactDOM from 'react-dom';
import { setWindow } from '@skbkontur/global-object';

export const IframeRenderer = ({ children, extraHTML = '', width = 150, height = 70, id = '' }: any) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  //@ts-expect-error
  window._setWindow = setWindow;
  React.useEffect(() => {
    if (iframeRef.current) {
      const contentWindow: any = iframeRef.current.contentWindow;
      const root = contentWindow.document ?? contentWindow.contentDocument;
      root.write(`
        ${extraHTML}
        <script>
          window.parent._setWindow(window);
        </script>
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
            overflow: hidden;
            height: 100%;
          }
        </style>
        <div id="root" />
      `);
      ReactDOM.render(children, root.getElementById('root'));
    }
  }, [children]);

  return (
    <iframe name="foobar" ref={iframeRef} src="about:blank" title="foobar" width={width} height={height} id={id} />
  );
};
