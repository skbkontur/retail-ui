import type { Ref } from 'react';
import React from 'react';

/**
 * Получает ссылку на элемент, учитывая разные версии React
 */
export function getElementRef(element: React.ReactElement): Ref<unknown> {
  if (Number(React.version) >= 19 && element.props && typeof element.props === 'object' && 'ref' in element.props) {
    return element.props.ref as Ref<unknown>;
  }
  return (element as any).ref;
}
