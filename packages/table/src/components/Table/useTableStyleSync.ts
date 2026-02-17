import { useCallback, useRef, type ForwardedRef, type MutableRefObject } from 'react';
import { globalObject } from '@skbkontur/global-object';

const TABLE_STYLE_MARKER_ATTR = 'data-skbkontur-table';
const TABLE_STYLE_SELECTOR = `style[${TABLE_STYLE_MARKER_ATTR}]`;
const TABLE_STYLE_COPIED_ATTR = 'data-skbkontur-table-copied';
const CSP_NONCE_META_SELECTOR = 'meta[property="csp-nonce"]';

function getValidNonce(nonce: string | null | undefined): string | undefined {
  if (!nonce || nonce === 'undefined' || nonce === 'null') {
    return undefined;
  }
  return nonce;
}

function resolveNonce(targetDocument: Document, sourceStyles: HTMLStyleElement[]): string | undefined {
  const sourceNonce = sourceStyles.map((style) => getValidNonce(style.nonce)).find(Boolean);
  if (sourceNonce) {
    return sourceNonce;
  }

  const targetMetaNonce = getValidNonce(
    (targetDocument.querySelector(CSP_NONCE_META_SELECTOR) as HTMLMetaElement | null)?.content
  );
  if (targetMetaNonce) {
    return targetMetaNonce;
  }

  return getValidNonce(
    (globalObject.document?.querySelector(CSP_NONCE_META_SELECTOR) as HTMLMetaElement | null)?.content
  );
}

function collectSourceStyles(targetDocument: Document, tableClassName: string): HTMLStyleElement[] {
  const docs: Document[] = [targetDocument];
  if (globalObject.document && globalObject.document !== targetDocument) {
    docs.push(globalObject.document);
  }
  const sourceStyles: HTMLStyleElement[] = [];
  const seen = new Set<HTMLStyleElement>();

  docs.forEach((doc) => {
    doc.querySelectorAll('style').forEach((styleElement) => {
      const style = styleElement as HTMLStyleElement;
      if (seen.has(style)) {
        return;
      }

      const cssText = style.textContent ?? '';
      const isTableStyle = style.matches(TABLE_STYLE_SELECTOR) || cssText.includes(tableClassName);
      if (isTableStyle) {
        seen.add(style);
        sourceStyles.push(style);
      }
    });
  });

  return sourceStyles;
}

function ensureStylesInDocument(targetDocument: Document, tableClassName: string): void {
  if (!targetDocument?.head) {
    return;
  }

  if (targetDocument.querySelector(`style[${TABLE_STYLE_COPIED_ATTR}="${tableClassName}"]`)) {
    return;
  }

  const sourceStyles = collectSourceStyles(targetDocument, tableClassName);
  if (sourceStyles.length === 0) {
    return;
  }

  const combinedCssText = sourceStyles.map((style) => style.textContent ?? '').join('\n');
  if (combinedCssText) {
    const combinedStyle = targetDocument.createElement('style');
    combinedStyle.setAttribute(TABLE_STYLE_MARKER_ATTR, '');
    combinedStyle.setAttribute(TABLE_STYLE_COPIED_ATTR, tableClassName);
    const nonce = resolveNonce(targetDocument, sourceStyles);
    if (nonce) {
      combinedStyle.nonce = nonce;
    }
    combinedStyle.appendChild(targetDocument.createTextNode(combinedCssText));
    targetDocument.head.appendChild(combinedStyle);
  }
}

function ensureStylesInShadowRoot(shadowRoot: ShadowRoot, ownerDocument: Document, tableClassName: string): void {
  if (shadowRoot.querySelector(`style[${TABLE_STYLE_COPIED_ATTR}="${tableClassName}"]`)) {
    return;
  }

  const sourceStyles = collectSourceStyles(ownerDocument, tableClassName);
  if (sourceStyles.length === 0) {
    return;
  }

  const combinedCssText = sourceStyles.map((style) => style.textContent ?? '').join('\n');
  if (combinedCssText) {
    const combinedStyle = ownerDocument.createElement('style');
    combinedStyle.setAttribute(TABLE_STYLE_MARKER_ATTR, '');
    combinedStyle.setAttribute(TABLE_STYLE_COPIED_ATTR, tableClassName);
    const nonce = resolveNonce(ownerDocument, sourceStyles);
    if (nonce) {
      combinedStyle.nonce = nonce;
    }
    combinedStyle.appendChild(ownerDocument.createTextNode(combinedCssText));
    shadowRoot.appendChild(combinedStyle);
  }
}

function isShadowRootNode(node: Node): node is ShadowRoot {
  return node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && 'host' in node;
}

function isElementNode(node: Node): node is Element {
  return node.nodeType === Node.ELEMENT_NODE;
}

function ensureStylesForNode(node: HTMLTableElement, tableClassName: string): void {
  if (globalObject.document && node.ownerDocument !== globalObject.document) {
    ensureStylesInDocument(node.ownerDocument, tableClassName);
  }

  const rootNode = node.getRootNode();
  if (isShadowRootNode(rootNode)) {
    ensureStylesInShadowRoot(rootNode, node.ownerDocument, tableClassName);
  }
}

function setupStyleSync(node: HTMLTableElement, tableClassName: string): () => void {
  const observers: MutationObserver[] = [];
  const observedRoots = new Set<Node>();

  const observeRoot = (root: Document | ShadowRoot) => {
    if (observedRoots.has(root)) {
      return;
    }
    observedRoots.add(root);

    const observer = new MutationObserver((records) => {
      ensureStylesForNode(node, tableClassName);

      records.forEach((record) => {
        record.addedNodes.forEach((addedNode) => {
          if (!isElementNode(addedNode)) {
            return;
          }
          if (addedNode.shadowRoot) {
            observeRoot(addedNode.shadowRoot);
          }
          addedNode.querySelectorAll('*').forEach((descendant) => {
            if (descendant.shadowRoot) {
              observeRoot(descendant.shadowRoot);
            }
          });
        });
      });
    });

    observer.observe(root, { childList: true, subtree: true });
    observers.push(observer);
  };

  const scanDocument = (doc: Document | undefined) => {
    if (!doc) {
      return;
    }

    observeRoot(doc);
    doc.querySelectorAll('*').forEach((element) => {
      if (element.shadowRoot) {
        observeRoot(element.shadowRoot);
      }
      if (element.tagName === 'IFRAME') {
        const iframeElement = element as HTMLIFrameElement;
        if (iframeElement.contentDocument) {
          scanDocument(iframeElement.contentDocument);
        }
      }
    });
  };

  scanDocument(node.ownerDocument);
  scanDocument(globalObject.document);
  ensureStylesForNode(node, tableClassName);

  return () => {
    observers.forEach((observer) => observer.disconnect());
  };
}

export function useTableStyleSync(ref: ForwardedRef<HTMLTableElement>, tableClassName: string) {
  const cleanupStyleSyncRef = useRef<(() => void) | null>(null);

  return useCallback(
    (node: HTMLTableElement | null) => {
      cleanupStyleSyncRef.current?.();
      cleanupStyleSyncRef.current = null;

      if (node) {
        cleanupStyleSyncRef.current = setupStyleSync(node, tableClassName);
      }

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as MutableRefObject<HTMLTableElement | null>).current = node;
      }
    },
    [ref, tableClassName]
  );
}
