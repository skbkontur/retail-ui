import React from 'react';

/**
 * Получает ссылку на элемент, учитывая разные версии React
 */
export function getElementRef(element: React.ReactElement) {
  if (
    parseInt(React.version, 10) >= 19 &&
    element.props &&
    typeof element.props === 'object' &&
    'ref' in element.props
  ) {
    return element.props.ref;
  }
  return (element as any).ref;
}
