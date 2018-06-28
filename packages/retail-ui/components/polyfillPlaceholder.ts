
let polyfillPlaceholder = false;

if (
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
) {
  const sAgent = window.navigator.userAgent;

  if (
    !('placeholder' in document.createElement('input')) ||
    !!navigator.userAgent.match(/Trident\/7\./) ||
    sAgent.indexOf('MSIE') > 0
  ) {
    polyfillPlaceholder = true;
  }
}

export default polyfillPlaceholder;
