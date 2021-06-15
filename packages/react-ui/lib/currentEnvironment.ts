const env: NodeJS.ProcessEnv = (typeof process === 'object' && process && process.env) || {};
const { enableReactTesting, NODE_ENV } = env;

const isReactTesting = enableReactTesting != null ? Boolean(enableReactTesting) : false;
export const isTestEnv: boolean = NODE_ENV === 'test' || isReactTesting;
export const isProductionEnv: boolean = NODE_ENV === 'production';
export const isDevelopmentEnv: boolean = NODE_ENV === 'development';
