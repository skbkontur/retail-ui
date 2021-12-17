import { findDOMNode } from 'react-dom';
import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { isHTMLElement } from '../SSRSafe';
import { canUseDOM } from '../client';
import { isFunction } from '../utils';

export const getRootNode = (instance: Nullable<React.ReactInstance>): Nullable<HTMLElement> => {
  if (!canUseDOM) return null;
  if (isHTMLElement(instance) || instance === null) {
    return instance;
  }

  const instanceAsAny = instance as any;
  if (instanceAsAny && isFunction(instanceAsAny.getRootNode)) {
    return instanceAsAny.getRootNode();
  }

  const node = findDOMNode(instance);
  return node instanceof HTMLElement ? node : null;
};
