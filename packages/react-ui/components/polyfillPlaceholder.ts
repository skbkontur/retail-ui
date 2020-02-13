let polyfilled = false;

if (typeof window !== 'undefined' && window.document && window.document.createElement) {
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
