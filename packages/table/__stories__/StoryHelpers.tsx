import React from 'react';
import ReactDOM from 'react-dom';

export const Root = (props: any) => <div style={{ display: 'inline-block', padding: 10 }} {...props} />;

export const Grid = ({ col = 1, row = 1, gap = '10px', children, id = 'grid' }: any) => {
  const className = 'grid-' + Math.random().toString().slice(3, -1);

  return (
    <Root id={id}>
      <style>{`
        .${className} {
          display: grid;
          grid-template-columns: repeat(${col}, min-content);
          grid-template-rows: repeat(${row}, min-content);
          grid-column-gap: ${gap};
          grid-row-gap: ${gap};
        }
      `}</style>
      <div className={className}>{children}</div>
    </Root>
  );
};

export const ShadowDOMRenderer = ({ children }: any) => {
  const shadowRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (shadowRef.current) {
      shadowRef.current.attachShadow({ mode: 'open' });
      const root = shadowRef.current.shadowRoot;
      ReactDOM.render(children, root);
    }
  }, [children]);

  return <div ref={shadowRef} />;
};

export const IframeRenderer = ({ children, extraHTML = '', width = 780, height = 230, id = '' }: any) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if (iframeRef.current) {
      const contentWindow: any = iframeRef.current.contentWindow;
      const root = contentWindow.document ?? contentWindow.contentDocument;
      root.write(`
        ${extraHTML}
        <link nonce="my-super-nonce" rel="stylesheet" href="https://s.kontur.ru/common-v2/fonts/LabGrotesque/LabGrotesque.css" />
        <style nonce="my-super-nonce">
          body {
            font-family: 'Lab Grotesque', 'Helvetica Neue', Roboto, Arial, sans-serif;
            font-size: 14px;
            margin: 0;
            background: white;
            color: rgba(0, 0, 0, 0.87);
            padding: 10px !important;
            overflow: hidden;
          }
        </style>
        <div id="root" />
      `);

      ReactDOM.render(children, root.getElementById('root'));
    }
  }, [children, extraHTML]);

  return <iframe ref={iframeRef} src="" frameBorder={0} title="x" width={width} height={height} id={id} />;
};

export const DelayedAttachmentRenderer = ({ children }: any) => {
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const nestedDiv = document.createElement('div');
    ReactDOM.render(children, nestedDiv);
    setTimeout(() => {
      rootRef.current?.appendChild(nestedDiv);
    });
  }, [children]);

  return <div ref={rootRef} />;
};

export const CSPRenderer = ({ children, extraHTML }: any) => {
  const cspHeader = `
    <meta property="csp-nonce" content="my-super-nonce" />
    <meta nonce="my-super-nonce" http-equiv="Content-Security-Policy" content="
      script-src 'self';
      style-src 'nonce-my-super-nonce' https://s.kontur.ru;
      style-src-elem 'nonce-my-super-nonce' https://s.kontur.ru;
      frame-src 'self';
      font-src https://s.kontur.ru;
      default-src 'none';
    " />
  `;

  return <IframeRenderer extraHTML={extraHTML || cspHeader}>{children}</IframeRenderer>;
};
