import React, { useState, useLayoutEffect, forwardRef, createContext, useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { renderToString } from 'react-dom/server';

function handleError({
  error,
  styleSheets,
  root,
}: {
  error: Error;
  styleSheets: CSSStyleSheet[];
  root: { adoptedStyleSheets: CSSStyleSheet[] } | null;
}) {
  switch (error.name) {
    case 'NotSupportedError':
      styleSheets.length > 0 && root && (root.adoptedStyleSheets = styleSheets);
      break;
    default:
      throw error;
  }
}

function useEnsuredForwardedRef(forwardedRef: any) {
  const ensuredRef = useRef(forwardedRef && forwardedRef.current);

  useEffect(() => {
    if (!forwardedRef) {
      return;
    }
    forwardedRef.current = ensuredRef.current;
  }, [forwardedRef]);

  return ensuredRef;
}

function Template({
  children = '',
  ...attrs
}: {
  children: string | ReactNode;
  shadowroot: ReactNode;
  shadowrootmode: 'open' | 'closed';
}) {
  const dangerouslySetInnerHTML = {
    __html: typeof children === 'string' ? children : renderToString(children as unknown as JSX.Element),
  };
  return <template {...attrs} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />;
}

function ShadowContent({ root, children = null }: { root: Element; children?: ReactNode }) {
  return createPortal(children, root);
}

function create(options: {
  tag: any; // todo type
  render: ({ root, ssr, children }: { root: any; ssr?: boolean; children: ReactNode }) => ReactNode;
  target?: Record<any, any>;
  id?: string;
}) {
  const ShadowRoot = forwardRef(
    (
      {
        mode = 'open',
        delegatesFocus = false,
        styleSheets = [],
        ssr = false,
        children,
        ...props
      }: {
        mode: 'open' | 'closed';
        delegatesFocus?: boolean;
        styleSheets?: CSSStyleSheet[];
        ssr?: boolean;
        children?: ReactNode;
      },
      ref,
    ) => {
      const node = useEnsuredForwardedRef(ref);
      const [root, setRoot] = useState<any>(null);
      const key = `node_${mode}${delegatesFocus}`;

      useLayoutEffect(() => {
        if (node.current) {
          try {
            typeof ref === 'function' && ref(node.current);

            if (ssr) {
              const root = node.current.shadowRoot;
              setRoot(root);
              return;
            }

            const root = node.current.attachShadow({
              mode,
              delegatesFocus,
            });
            styleSheets.length > 0 && (root.adoptedStyleSheets = styleSheets);
            setRoot(root);
          } catch (error) {
            handleError({ error, styleSheets, root });
          }
        }
      }, [ref, node, styleSheets]);

      return (
        <>
          <options.tag key={key} ref={node} {...props}>
            {(root || ssr) && (
              <ShadowDomContext.Provider value={root}>
                {ssr ? (
                  <Template shadowroot={mode} shadowrootmode={mode}>
                    {options.render({
                      root,
                      ssr,
                      children,
                    })}
                  </Template>
                ) : (
                  <ShadowContent root={root}>
                    {options.render({
                      root,
                      ssr,
                      children,
                    })}
                  </ShadowContent>
                )}
              </ShadowDomContext.Provider>
            )}
          </options.tag>
        </>
      );
    },
  );

  return ShadowRoot;
}

const tags = new Map();

const decamelize = (string: string | symbol, separator: string) =>
  string
    .toString()
    .split(/(?=[A-Z])/)
    .join(separator)
    .toLowerCase();

const ShadowDomContext = createContext(null);

/*
example use:

import shadowRoot from '../../lib/shadowDom/reactShadow';

props:  mode: 'open' | 'closed';
        delegatesFocus?: boolean;
        styleSheets?: CSSStyleSheet[];
        ssr?: boolean;
        children?: ReactNode;

<shadowRoot.div>
    <Button>Click</Button>
</shadowRoot.div>
 */
export function createProxy(
  target = {} as any,
  id = 'core',
  render = ({ children }: { children: ReactNode }) => children,
) {
  return new Proxy(target, {
    get: function get(_, name) {
      const tag = decamelize(name, '-');
      const key = `${id}-${tag}`;

      if (!tags.has(key)) {
        tags.set(key, create({ tag, render }));
      }
      return tags.get(key);
    },
  });
}

export default createProxy();
