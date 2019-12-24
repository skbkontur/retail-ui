import * as React from 'react';

export function isBody(child: React.ReactChild): child is React.ReactElement<{}> {
  return React.isValidElement(child) && child.type.hasOwnProperty('__MODAL_BODY__');
}
