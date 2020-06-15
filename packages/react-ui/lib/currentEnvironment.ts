export const isTestEnv: boolean = process.env.NODE_ENV === 'test' || Boolean(process.env.enableReactTesting);
export const isProductionEnv: boolean = process.env.NODE_ENV === 'production';
export const isDevelopmentEnv: boolean = process.env.NODE_ENV === 'development';
