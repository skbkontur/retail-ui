import { isSafari, isFirefox } from './utils';

export const hasFocusOnButtonClick = !isSafari() && !isFirefox();
export const hasFocusOnLinkClick = !isSafari();

export default {
  hasFocusOnButtonClick,
  hasFocusOnLinkClick,
};
