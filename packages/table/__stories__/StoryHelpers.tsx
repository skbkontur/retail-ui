import React from 'react';
import { createRoot, type Root as ReactDomRoot } from 'react-dom/client';

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
  const hostRef = React.useRef<HTMLDivElement>(null);
  const reactRootRef = React.useRef<ReactDomRoot | null>(null);

  React.useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const shadow = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    let mountNode = shadow.querySelector<HTMLElement>('[data-table-story-root]');
    if (!mountNode) {
      mountNode = document.createElement('div');
      mountNode.setAttribute('data-table-story-root', '');
      shadow.appendChild(mountNode);
    }

    reactRootRef.current ??= createRoot(mountNode);
    reactRootRef.current.render(children);

    return () => {
      reactRootRef.current?.unmount();
      reactRootRef.current = null;
    };
  }, [children]);

  return <div ref={hostRef} />;
};

export const IframeRenderer = ({ children, extraHTML = '', width = 780, height = 230, id = '' }: any) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const reactRootRef = React.useRef<ReactDomRoot | null>(null);

  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) {
      return;
    }

    const doc = iframe.contentWindow?.document ?? iframe.contentDocument;
    if (!doc) {
      return;
    }

    doc.open();
    doc.write(`
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
    doc.close();

    const mountNode = doc.getElementById('root');
    if (!mountNode) {
      return;
    }

    reactRootRef.current?.unmount();
    reactRootRef.current = createRoot(mountNode);
    reactRootRef.current.render(children);

    return () => {
      reactRootRef.current?.unmount();
      reactRootRef.current = null;
    };
  }, [children, extraHTML]);

  return <iframe ref={iframeRef} src="" frameBorder={0} title="x" width={width} height={height} id={id} />;
};

export const DelayedAttachmentRenderer = ({ children }: any) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const reactRootRef = React.useRef<ReactDomRoot | null>(null);

  React.useEffect(() => {
    const nestedDiv = document.createElement('div');
    reactRootRef.current = createRoot(nestedDiv);
    reactRootRef.current.render(children);

    const timeoutId = window.setTimeout(() => {
      rootRef.current?.appendChild(nestedDiv);
    });

    return () => {
      window.clearTimeout(timeoutId);
      reactRootRef.current?.unmount();
      reactRootRef.current = null;
    };
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
