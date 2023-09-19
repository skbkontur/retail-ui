export const isBrowser = typeof window !== 'undefined';
export const canUseDOM = Boolean(isBrowser && document && document.createElement);

// NOTE Some checks are used from https://github.com/arasatasaygin/is.js
const platform = ((isBrowser && navigator && navigator.platform) || '').toLowerCase();
const userAgent = ((isBrowser && navigator && navigator.userAgent) || '').toLowerCase();
const vendor = ((isBrowser && navigator && navigator.vendor) || '').toLowerCase();

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
  'ontouchstart' in document.documentElement;

export const isIOS = /(ip[ao]d|iphone)/gi.test(userAgent);
