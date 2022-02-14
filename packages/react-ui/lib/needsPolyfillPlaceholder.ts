import { canUseDOM, isIE11 } from './client';

/**
 * Определяет поддерживает ли браузер аттрибут `placeholder` для тега `input`
 *
 * @returns {Boolean} - возвращает true, если браузеру нужен полифил для placeholder. Иначе - false
 */

export const needsPolyfillPlaceholder = () => {
  if (canUseDOM) {
    const supportsPlaceholder = 'placeholder' in document.createElement('input');

    if (!supportsPlaceholder || isIE11) {
      return true;
    }
  }

  return false;
};
