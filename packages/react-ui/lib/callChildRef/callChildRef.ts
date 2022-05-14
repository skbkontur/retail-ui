import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { hasOwnProperty } from '../utils';

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
  if (hasOwnProperty(componentRef, 'current')) {
    // @ts-ignore
    componentRef.current = instance;
  }
};
