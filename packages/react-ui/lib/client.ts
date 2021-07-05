export const isBrowser = typeof window !== 'undefined';
export const canUseDOM = isBrowser && window.document && window.document.createElement;

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

enum BreakpointsKeys {
  sm = 'sm',
}

const breakpoints: {
  [key in keyof typeof BreakpointsKeys]: number;
} = {
  [BreakpointsKeys.sm]: 600,
};

const getBreakpointsMediaQueryString = () => {
  const breakpointsMQS: {
    [key: string]: string;
  } = { sm: '' };

  Object.keys(breakpoints).forEach(breakpointKey => {
    const breakpointKeyTyped = breakpointKey as keyof typeof BreakpointsKeys;
    // @ts-ignore
    breakpointsMQS[breakpointKeyTyped] = `(max-width: ${breakpoints[breakpointKey]}px)`;
  });

  return breakpointsMQS as { [key in keyof typeof BreakpointsKeys]: string };
};

export const breakpointsMQS = getBreakpointsMediaQueryString();

const getEmotionMQS = () => {
  const emotionBreakpointsMQS: {
    [key: string]: string;
  } = { sm: '' };
  Object.keys(breakpointsMQS).forEach(breakpointKey => {
    // @ts-ignore
    emotionBreakpointsMQS[breakpointKey] = `@media ${breakpointsMQS[breakpointKey]}`;
  });

  return emotionBreakpointsMQS as { [key in keyof typeof BreakpointsKeys]: string };
};

export const emotionMQS = getEmotionMQS();
