import { findDOMNode } from 'react-dom';
import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { isHTMLElement } from '../SSRSafe';

export const getRootNode = (instance: Nullable<React.ReactInstance>): Nullable<HTMLElement> => {
  if (isHTMLElement(instance) || instance === null) {
    return instance;
  }

  // eslint-disable-next-line react/no-find-dom-node
  const domNode = (instance as any)?.getRootNode?.() || findDOMNode(instance);
  if (domNode) {
    return domNode;
  }
  return null;
};
