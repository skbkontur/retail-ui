import type React from 'react';

// Access the element's ref
export function getElementRef(element: React.ReactElement) {
  return element.props && typeof element.props === 'object' && 'ref' in element.props
    ? element.props.ref
    : (element as any).ref;
}
