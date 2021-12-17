import { findDOMNode } from 'react-dom';
import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { isHTMLElement } from '../SSRSafe';
import { canUseDOM } from '../client';

export const getRootNode = (instance: Nullable<React.ReactInstance>): Nullable<HTMLElement> => {
  if (isHTMLElement(instance) || instance === null) {
    return instance;
  }

  const instanceAsAny = instance as any;
  if (instanceAsAny && instanceAsAny.getRootNode && typeof instanceAsAny.getRootNode === 'function') {
    return instanceAsAny.getRootNode();
  }
  const node = canUseDOM && findDOMNode(instance);
  return node instanceof HTMLElement ? node : null;
};
