import type { ReactElement, Ref } from 'react';

import { REACT_MAJOR_VERSION } from './react-is.js';

/**
 * Получает ссылку на элемент, учитывая разные версии React
 */
export function getElementRef(element: ReactElement): Ref<unknown> {
  if (REACT_MAJOR_VERSION >= 19 && element.props && typeof element.props === 'object' && 'ref' in element.props) {
    return element.props.ref as Ref<unknown>;
  }
  return (element as any).ref;
}
