type InjectOptions = {
  styleId?: string;
  useStrictCSP?: boolean;
  attributes?: Record<string, string>;
};

type RuntimeGlobalObject = {
  document?: Document;
  addStyle?: (styleId: string, cssText: string) => void;
};

export function injectTableCssAtRuntime(cssCode: string, options: InjectOptions): void {
  try {
    const globalObject: RuntimeGlobalObject | undefined =
      (typeof window === 'object' && window) ||
      (typeof globalThis === 'object' && globalThis) ||
      (typeof global === 'object' && global) ||
      undefined;

    const globalDocument = globalObject?.document;
    if (!globalDocument) {
      return;
    }

    const styleKey = options.styleId ?? 'skbkontur-table';

    if (typeof globalObject?.addStyle === 'function') {
      globalObject.addStyle(styleKey, cssCode);
      return;
    }

    const elementStyle = globalDocument.createElement('style');
    if (options.styleId) {
      elementStyle.id = options.styleId;
    }

    if (options.useStrictCSP) {
      const rawNonce = globalDocument.head.querySelector('meta[property=csp-nonce]')?.content;
      const metaNonce = !rawNonce || rawNonce === 'undefined' || rawNonce === 'null' ? undefined : rawNonce;
      if (metaNonce) {
        elementStyle.nonce = metaNonce;
      }
    }

    Object.entries(options.attributes ?? {}).forEach(([name, value]) => {
      elementStyle.setAttribute(name, value);
    });

    elementStyle.setAttribute('data-skbkontur-table', '');
    elementStyle.appendChild(globalDocument.createTextNode(cssCode));
    globalDocument.head.appendChild(elementStyle);
  } catch (e) {
    console.error('vite-plugin-css-injected-by-js', e);
  }
}
