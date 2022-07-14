const env: NodeJS.ProcessEnv = (typeof process === 'object' && process && process.env) || {};
const { enableReactTesting, NODE_ENV, REACT_UI_TEST, REACT_APP_REACT_UI_TEST, STORYBOOK_REACT_UI_TEST } = env;

const isReactUITestEnv =
  Boolean(REACT_UI_TEST) || // for cases when NODE_ENV is not usable (dev/prod)
  Boolean(REACT_APP_REACT_UI_TEST) || // for usage with CRA
  Boolean(STORYBOOK_REACT_UI_TEST) || // for usage with storybook
  Boolean(enableReactTesting); // deprecated, legacy variable

export const isTestEnv = NODE_ENV === 'test' || isReactUITestEnv;

export const isBrowser = typeof window !== 'undefined';

export const canUseDOM = isBrowser && window.document && window.document.createElement;

export function isHTMLElement(el: unknown): el is HTMLElement {
  if (isBrowser) {
    return el instanceof HTMLElement;
  }

  return false;
}

export function isNode(node: unknown): node is Node {
  if (isBrowser) {
    return node instanceof Node;
  }

  return false;
}
