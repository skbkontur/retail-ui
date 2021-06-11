const env: NodeJS.ProcessEnv = (typeof process === 'object' && process && process.env) || {};

export const isTestEnv = env.NODE_ENV === 'test';

export const isBrowser = typeof window !== 'undefined';
