import { findDOMNode } from 'react-dom';
// import React from 'react';
import warning from 'warning';

// import { Nullable } from '../typings/utility-types';

export const getRootDomNode = (instance: any) => {
  if (instance instanceof HTMLElement) {
    return instance;
  }

  const domNode = (instance as any)?.getRootDomNode?.() ?? findDOMNode(instance);
  if (domNode) {
    return domNode;
  }

  warning(true, 'Please, add public method getRootDomNode for your component');
  return null;
};
