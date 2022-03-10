/**
 * Checking process.env variables safely (process may not exist)
 * and the way Storybook@6.4+ allows to use them (it replaces the whole expression during the build,
 * e.g. "process.env.STORYBOOK_REACT_UI_TEST" => "'true'", while process.env is being empty)
 *
 * @see https://github.com/storybookjs/storybook/issues/17336
 * @see https://github.com/storybookjs/storybook/pull/17174
 */

let REACT_UI_TEST;
let STORYBOOK_REACT_UI_TEST;
let REACT_APP_REACT_UI_TEST;
let enableReactTesting;
let NODE_ENV;

try {
  REACT_UI_TEST = process.env.REACT_UI_TEST;
} catch (e) {
  /* noop */
}
try {
  STORYBOOK_REACT_UI_TEST = process.env.STORYBOOK_REACT_UI_TEST;
} catch (e) {
  /* noop */
}
try {
  REACT_APP_REACT_UI_TEST = process.env.REACT_APP_REACT_UI_TEST;
} catch (e) {
  /* noop */
}
try {
  enableReactTesting = process.env.enableReactTesting;
} catch (e) {
  /* noop */
}
try {
  NODE_ENV = process.env.NODE_ENV;
} catch (e) {
  /* noop */
}

const isReactUITestEnv =
  Boolean(REACT_UI_TEST) || // for cases when NODE_ENV is not usable (dev/prod)
  Boolean(REACT_APP_REACT_UI_TEST) || // for usage with CRA
  Boolean(STORYBOOK_REACT_UI_TEST) || // for usage with storybook
  Boolean(enableReactTesting); // deprecated, legacy variable

export const isTestEnv: boolean = NODE_ENV === 'test' || isReactUITestEnv;
export const isProductionEnv: boolean = NODE_ENV === 'production';
export const isDevelopmentEnv: boolean = NODE_ENV === 'development';
