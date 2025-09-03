import { globalObject } from '@skbkontur/global-object';

const needsPolyfillPlaceholderInternal = () => {
  if (globalObject.document) {
    const supportsPlaceholder = 'placeholder' in globalObject.document.createElement('input');
    if (!supportsPlaceholder) {
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
