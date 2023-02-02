// eslint-disable-next-line no-var
declare var REACT_UI_TEST: unknown;

const isProcessEnvDefined = typeof process !== 'undefined' && typeof process.env !== 'undefined';

const isReactUITestEnv = () => {
  // usefull when process doesn't exist (webpack5/vite/etc)
  const isReactUITestDefined = typeof REACT_UI_TEST !== 'undefined';

  if (isReactUITestDefined && Boolean(REACT_UI_TEST)) {
    return true;
  }

  if (isProcessEnvDefined) {
    switch (true) {
      case Boolean(process.env.REACT_UI_TEST): // when NODE_ENV is not usable (e.g., already used for dev/prod)
      case Boolean(process.env.REACT_APP_REACT_UI_TEST): // for usage with CRA
      case Boolean(process.env.STORYBOOK_REACT_UI_TEST): // for usage with storybook
      case Boolean(process.env.enableReactTesting): // deprecated, legacy variable
        return true;
    }
  }

  return false;
};

const isNodeTestEnv = isProcessEnvDefined && process.env.NODE_ENV === 'test';
const isNodeProductionEnv = isProcessEnvDefined && process.env.NODE_ENV === 'production';
const isNodeDevelopmentEnv = isProcessEnvDefined && process.env.NODE_ENV === 'development';

export const isTestEnv: boolean = isNodeTestEnv || isReactUITestEnv();
export const isProductionEnv: boolean = isNodeProductionEnv;
export const isDevelopmentEnv: boolean = isNodeDevelopmentEnv;
