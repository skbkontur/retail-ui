// eslint-disable-next-line no-var
declare var REACT_UI_TEST: unknown;

const isReactUITestDefined = typeof REACT_UI_TEST !== 'undefined';
const isProcessEnvDefined = typeof process !== 'undefined' && typeof process.env !== 'undefined';

const isReactUITestEnv =
  (isReactUITestDefined && Boolean(REACT_UI_TEST)) || // when process is not defined (webpack5/vite/etc)
  (isProcessEnvDefined &&
    (Boolean(process.env.REACT_UI_TEST) || // when NODE_ENV is not usable (already used for dev/prod)
      Boolean(process.env.REACT_APP_REACT_UI_TEST) || // for usage with CRA
      Boolean(process.env.STORYBOOK_REACT_UI_TEST) || // for usage with storybook
      Boolean(process.env.enableReactTesting))); // deprecated, legacy variable

const isNodeTestEnv = isProcessEnvDefined && process.env.NODE_ENV === 'test';
const isNodeProductionEnv = isProcessEnvDefined && process.env.NODE_ENV === 'production';
const isNodeDevelopmentEnv = isProcessEnvDefined && process.env.NODE_ENV === 'development';

export const isTestEnv: boolean = isNodeTestEnv || isReactUITestEnv;
export const isProductionEnv: boolean = isNodeProductionEnv;
export const isDevelopmentEnv: boolean = isNodeDevelopmentEnv;
