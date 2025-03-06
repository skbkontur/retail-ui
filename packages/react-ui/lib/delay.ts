import { globalObject } from '@skbkontur/global-object';

export const delay = (ms: number) => new Promise((resolve) => globalObject.setTimeout(resolve, ms));
