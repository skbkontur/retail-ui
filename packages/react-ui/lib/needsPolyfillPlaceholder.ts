import { globalThat } from './globalThat';
import { isIE11 } from './client';

const needsPolyfillPlaceholderInternal = () => {
  if (globalThat.document) {
    const supportsPlaceholder = 'placeholder' in globalThat.document.createElement('input');
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
