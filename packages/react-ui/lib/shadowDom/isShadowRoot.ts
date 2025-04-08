export const isShadowRoot = (root: unknown): root is ShadowRoot => Boolean((root as ShadowRoot)?.host?.shadowRoot);
