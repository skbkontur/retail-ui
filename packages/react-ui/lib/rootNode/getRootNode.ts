/* eslint-disable react/no-find-dom-node */
import { findDOMNode } from 'react-dom';
import React from 'react';
import warning from 'warning';

import { Nullable } from '../../typings/utility-types';
import { isElement, isNode } from '../SSRSafe';
import { canUseDOM } from '../client';

import { isInstanceWithRootNode } from './rootNodeDecorator';

/**
 * Extracts component's root Element(HTMLElement/SVGElement) out of it's instance
 * following the "StrictMode support convention" (@see README.md#strictmode, #2518).
 *
 * Replaces findDOMNode but falls back to it if "convention" is not respected.
 *
 * @param instance Component's instance provided by React.Ref or `this` inside class-components.
 * @returns Component's root HTMLElement or null
 */

export const getRootNode = (instance: Nullable<React.ReactInstance>): Nullable<Element> => {
  if (!canUseDOM || !instance) {
    // instance can be `null` if component was unmounted
    // also checking undefined for convenient usage
    return null;
  }

  if (isElement(instance)) {
    // instance can be a Element already if coming
    // from Refs of intrinsic elements (<div />, <button />, etc.)
    return instance;
  }

  let rootNode;

  if (isInstanceWithRootNode(instance)) {
    // it happened to be that native Node interface also has
    // the "getRootNode" method, but we can ignore it here
    // because we'd already checked the instance on being an Element
    // which is a subclass of Node, so, just fixing types here
    if (!isNode(instance)) {
      rootNode = instance.getRootNode();
    }
  }

  if (rootNode !== undefined) {
    // at this point, it is rather Element (what we are looking for)
    // or null (which is also OK, e.g. Popup/Tooltip/Hint before opening), so, just return it
    return rootNode;
  }

  try {
    // node is undefined, which means that the instance's root node getter doesn't exists or returns the undefined
    // anyway, it tell us that the convention is not respected (by the component itself or its children),
    // so, we have to fall back to the deprecated findDOMNode, which always works but breaks StrictMode
    rootNode = findDOMNode(instance);
  } catch (e) {
    warning(
      false,
      '[getRootNode]: using findDOMNode threw an exception' +
        '\n' +
        'See https://github.com/skbkontur/retail-ui/blob/master/packages/react-ui/README.md#strictmode' +
        '\n\n' +
        e.message,
    );
    return null;
  }

  // the findDOMNode can also return Text, but we are only interested in Elements, so just filter it
  return isElement(rootNode) ? rootNode : null;
};
