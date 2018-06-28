function isSafari(): boolean {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

function isFirefox(): boolean {
  return /firefox/i.test(navigator.userAgent);
}

export const hasFocusOnButtonClick = !isSafari() && !isFirefox();
export const hasFocusOnLinkClick = !isSafari();

export default {
  hasFocusOnButtonClick,
  hasFocusOnLinkClick
};
