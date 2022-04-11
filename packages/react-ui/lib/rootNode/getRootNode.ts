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

  // Intended behavior.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instanceAsAny = instance as any;
  let node;
  if (instanceAsAny && isFunction(instanceAsAny.getRootNode)) {
    node = instanceAsAny.getRootNode();
  }

  if (node !== undefined) {
    return node;
  }

  node = findDOMNode(instance);
  return node instanceof HTMLElement ? node : null;
};
