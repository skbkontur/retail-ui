/* eslint-disable react/no-find-dom-node */
import { findDOMNode } from 'react-dom';
import React from 'react';
import warning from 'warning';

import { Nullable } from '../../../typings/Types';
import { isHTMLElement, isNode, canUseDOM } from '../utils';

interface InstanceWithRootNode {
  getRootNode: () => Nullable<HTMLElement>;
}

const isInstanceWithRootNode = (instance: unknown): instance is InstanceWithRootNode => {
  return Boolean(instance) && Object.prototype.hasOwnProperty.call(instance, 'getRootNode');
};

/**
 * Temporary duplicates @skbkontur/react-ui/lib/rootNode/getRootNode.ts
 * */

export const getRootNode = (instance: Nullable<React.ReactInstance>): Nullable<HTMLElement> => {
  if (!canUseDOM || !instance) {
    // instance can be `null` if component was unmounted
    // also checking undefined for convinient usage
    return null;
  }

  if (isHTMLElement(instance)) {
    // instance can be a HTMLElement already if comming
    // from Refs of intrinsic elements (<div />, <button />, etc.)
    return instance;
  }

  let rootNode;

  if (isInstanceWithRootNode(instance)) {
    // it happened to be that native Node interface also has
    // the "getRootNode" method, but we can ignore it here
    // because we'd already checked the instance on being an HTMLElement
    // which is a subclass of Node, so, just fixing types here
    if (!isNode(instance)) {
      rootNode = instance.getRootNode();
    }
  }

  if (rootNode !== undefined) {
    // at this point, it is rather HTMLElement (what we are looking for)
    // or null (which is also OK, e.g. Popup/Tooltip/Hint before opening), so, just return it
    return rootNode;
  }

  // using findDOMNode can throw exception and crash app if use useImperativeHandle hook
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

  // the findDOMNode can also return Text, but we are only intrested in HTMLElements, so just filter it
  return isHTMLElement(rootNode) ? rootNode : null;
};
