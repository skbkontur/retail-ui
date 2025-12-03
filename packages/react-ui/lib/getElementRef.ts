import React from 'react';

// Access the element's ref
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
