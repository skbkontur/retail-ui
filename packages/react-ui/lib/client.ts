import { globalObject } from '@skbkontur/global-object';

// NOTE Some checks are used from https://github.com/arasatasaygin/is.js
const platform = (globalObject.navigator?.platform || '').toLowerCase();
const userAgent = (globalObject.navigator?.userAgent || '').toLowerCase();
const vendor = (globalObject.navigator?.vendor || '').toLowerCase();

export const isMac = platform.includes('mac');
export const isWindows = platform.includes('win');

export const isSafari = /version\/(\d+).+?safari/.test(userAgent);
export const isFirefox = /(?:firefox|fxios)\/(\d+)/.test(userAgent);
export const isOpera = /(?:^opera.+?version|opr)\/(\d+)/.test(userAgent);
export const isChrome = vendor.includes('google inc') && /(?:chrome|crios)\/(\d+)/.test(userAgent) && !isOpera;
export const isEdge = userAgent.includes('edge/');
export const isIE11 = userAgent.includes('trident/');

export const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) &&
  globalObject.document &&
  'ontouchstart' in globalObject.document.documentElement;

export const isIOS = /(ip[ao]d|iphone)/gi.test(userAgent);
