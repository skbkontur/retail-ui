/* eslint-disable react/no-find-dom-node */
import { findDOMNode } from 'react-dom';
import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { isHTMLElement, isNode } from '../SSRSafe';
import { canUseDOM } from '../client';

import { isInstanceWithRootNode } from './rootNodeDecorator';

export const getRootNode = (instance: Nullable<React.ReactInstance>): Nullable<HTMLElement> => {
  if (!canUseDOM) return null;
  if (isHTMLElement(instance) || instance === null) {
    return instance;
  }

  let rootNode;

  // it happened to be that native Node interface also has
  // the "getRootNode" method, but we dont expect it here
  if (isInstanceWithRootNode(instance) && !isNode(instance)) {
    rootNode = instance.getRootNode();
  }

  if (rootNode !== undefined) {
    return rootNode;
  }

  rootNode = findDOMNode(instance);
  return isHTMLElement(rootNode) ? rootNode : null;
};
