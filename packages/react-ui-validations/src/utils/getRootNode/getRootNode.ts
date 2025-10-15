import type React from 'react';

import type { Nullable } from '../../../typings/Types';
import { isElement } from '../utils';

export interface InstanceWithRootNode {
  getRootNode: () => Nullable<HTMLElement>;
}

const isInstanceWithRootNode = (instance: unknown): instance is InstanceWithRootNode => {
  return Boolean(instance) && Object.prototype.hasOwnProperty.call(instance, 'getRootNode');
};

/**
 * Temporary duplicates @skbkontur/react-ui/lib/rootNode/getRootNode.ts
 * */

export const getRootNode = (instance: Nullable<React.ReactInstance>): Nullable<Element> => {
  /**
   * Options of what instance can be:
   *  1. null or undefined
   *  2. DOM Element
   *  3. class Component instance (object)
   *  4. literally anything, returned from useImperativeHandle
   */

  if (!instance) {
    // instance can be `null` if component was unmounted
    // also checking undefined for convenient usage
    return null;
  }

  if (isElement(instance)) {
    // instance can be an Element already if its coming
    // from Refs of intrinsic elements (<div />, <button />, etc.)
    return instance;
  }

  let rootNode;

  if (isInstanceWithRootNode(instance)) {
    rootNode = instance.getRootNode();
  }

  if (rootNode !== undefined) {
    // the getter exists and has returned something, it should be what we are looking for
    // probably its an Element or null (which is also OK, e.g. Popup/Tooltip/Hint before opening)
    return rootNode;
  }

  // the findDOMNode can also return Text, but we are only interested in Elements, so just filter it
  return isElement(rootNode) ? rootNode : null;
};
