import { findDOMNode } from 'react-dom';
import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { isHTMLElement, isNode } from '../SSRSafe';
import { canUseDOM } from '../client';

import { isInstanceWithRootNode } from './rootNodeDecorator';

export const getRootNode = (instance: Nullable<React.ReactInstance>): Nullable<HTMLElement> => {
  if (!canUseDOM || !instance) {
    return null;
  }

  if (isHTMLElement(instance)) {
    return instance;
  }

  let rootNode;

  if (isInstanceWithRootNode(instance)) {
    if (!isNode(instance)) {
      rootNode = instance.getRootNode();
    }
  }

  if (rootNode !== undefined) {
    return rootNode;
  }

  rootNode = findDOMNode(instance);

  return isHTMLElement(rootNode) ? rootNode : null;
};
