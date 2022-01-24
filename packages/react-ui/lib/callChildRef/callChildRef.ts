import React from 'react';

import { Nullable } from '../../typings/utility-types';

export const callChildRef = (
  componentRef: React.RefCallback<any> | React.RefObject<any>,
  instance: Nullable<React.ReactInstance>,
) => {
  if (!componentRef) {
    return;
  }
  if (typeof componentRef === 'function') {
    componentRef(instance);
  }
  if (Object.prototype.hasOwnProperty.call(componentRef, 'current')) {
    // @ts-ignore
    componentRef.current = instance;
  }
};
