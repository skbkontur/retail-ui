import { canUseDOM } from './client';

let polyfilled = false;

if (canUseDOM) {
  const sAgent = window.navigator.userAgent;

  if (
    !('placeholder' in document.createElement('input')) ||
    !!/Trident\/7\./.exec(navigator.userAgent) ||
    sAgent.indexOf('MSIE') > 0
  ) {
    polyfilled = true;
  }
}

export const polyfillPlaceholder = polyfilled;
