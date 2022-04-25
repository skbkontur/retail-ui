import { Nullable } from '../../typings/Types';

const env: NodeJS.ProcessEnv = (typeof process === 'object' && process && process.env) || {};
const { enableReactTesting, NODE_ENV, REACT_UI_TEST, REACT_APP_REACT_UI_TEST, STORYBOOK_REACT_UI_TEST } = env;

const isReactUITestEnv =
  Boolean(REACT_UI_TEST) || // for cases when NODE_ENV is not usable (dev/prod)
  Boolean(REACT_APP_REACT_UI_TEST) || // for usage with CRA
  Boolean(STORYBOOK_REACT_UI_TEST) || // for usage with storybook
  Boolean(enableReactTesting); // deprecated, legacy variable

export const isTestEnv = NODE_ENV === 'test' || isReactUITestEnv;

export const isBrowser = typeof window !== 'undefined';

export function isObject(x: unknown): x is object {
  return (typeof x === 'object' && x !== null && !Array.isArray(x)) || typeof x === 'function';
}

export const hasOwnProperty = (object: Nullable<object>, propertyName: string): boolean => {
  return Boolean(object) && Object.prototype.hasOwnProperty.call(object, propertyName);
};
