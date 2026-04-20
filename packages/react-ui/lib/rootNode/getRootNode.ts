import type React from 'react';

import type { Nullable } from '../../typings/utility-types.js';
import { isElement } from '../utils.js';
import { isInstanceWithRootNode } from './rootNodeDecorator.js';

/**
 * Extracts component's root Element (HTMLElement/SVGElement) out of it's instance
 * following the "StrictMode support convention" (@see README.md#strictmode, #2518).
 *
 * Replaces findDOMNode but falls back to it if "convention" is not respected.
 *
 * @param instance Component's instance provided by React.Ref or `this` inside class-components.
 * @returns Component's root `Element` or null
 */

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
