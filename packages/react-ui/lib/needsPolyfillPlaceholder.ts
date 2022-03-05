import { canUseDOM, isIE11 } from './client';

const needsPolyfillPlaceholderInternal = () => {
  if (canUseDOM) {
    const supportsPlaceholder = 'placeholder' in document.createElement('input');
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
