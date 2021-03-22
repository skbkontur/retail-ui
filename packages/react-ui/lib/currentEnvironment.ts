const enableReactTesting = process?.env?.enableReactTesting != null ? Boolean(process.env.enableReactTesting) : false;
export const isTestEnv: boolean = process.env.NODE_ENV === 'test' || enableReactTesting;
export const isProductionEnv: boolean = process.env.NODE_ENV === 'production';
export const isDevelopmentEnv: boolean = process.env.NODE_ENV === 'development';
