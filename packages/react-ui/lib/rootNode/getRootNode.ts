import { findDOMNode } from 'react-dom';
import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { isHTMLElement } from '../SSRSafe';
import { canUseDOM } from '../client';

export const getRootNode = (instance: Nullable<React.ReactInstance>): Nullable<HTMLElement> => {
  if (isHTMLElement(instance) || instance === null) {
    return instance;
  }

  const domNode = (instance as any)?.getRootNode?.();
  if (domNode !== undefined) {
    return domNode;
  }
  const node = canUseDOM && findDOMNode(instance);
  return node instanceof HTMLElement ? node : null;
};
