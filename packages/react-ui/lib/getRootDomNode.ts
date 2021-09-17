// import { findDOMNode } from 'react-dom';

import React from 'react';

import { Nullable } from '../typings/utility-types';

export const getRootDomNode = (instance: Nullable<React.ReactNode>) => {
  if (instance instanceof HTMLElement) {
    return instance;
  }

  const domNode = (instance as any)?.getRootDomNode?.();
  // ?? findDOMNode(instance);
  if (domNode) {
    return domNode;
  }
  return null;
};
