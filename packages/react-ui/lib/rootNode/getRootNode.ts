// import { findDOMNode } from 'react-dom';

import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { isHTMLElement } from '../SSRSafe';

export const getRootNode = (instance: Nullable<React.ReactNode>) => {
  if (isHTMLElement(instance)) {
    return instance;
  }

  const domNode = (instance as any)?.getRootNode?.();
  // ?? findDOMNode(instance);
  if (domNode) {
    return domNode;
  }
  return null;
};
