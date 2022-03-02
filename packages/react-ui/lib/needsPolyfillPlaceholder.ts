import { canUseDOM, isIE11 } from './client';

export const supportsPlaceholder = 'placeholder' in document.createElement('input');

const needsPolyfillPlaceholderInternal = () => {
  if (canUseDOM) {
    if (!supportsPlaceholder || isIE11) {
      return true;
    }
  }

  return false;
};

/**
 * Определяет поддерживает ли браузер аттрибут `placeholder` для тега `input`
 *
 * Равен true, если браузеру нужен полифил для placeholder. Иначе - false
 */
export const needsPolyfillPlaceholder = needsPolyfillPlaceholderInternal();
