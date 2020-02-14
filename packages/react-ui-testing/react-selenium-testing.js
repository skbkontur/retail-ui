let customAcceptAttribute = prevResult => prevResult;
let attributeWhiteList = null;

// Inlined from ReactTypeOfSideEffect
const PerformedWork = 1;

if (typeof ReactSeleniumTesting !== 'undefined') {
  if (
    ReactSeleniumTesting &&
    ReactSeleniumTesting.acceptAttribute &&
    typeof ReactSeleniumTesting.acceptAttribute === 'function'
  ) {
    customAcceptAttribute = ReactSeleniumTesting.acceptAttribute;
  }

  if (
    ReactSeleniumTesting &&
    ReactSeleniumTesting.attributeWhiteList &&
    typeof ReactSeleniumTesting.attributeWhiteList === 'object'
  ) {
    attributeWhiteList = ReactSeleniumTesting.attributeWhiteList;
  }
}

function extendStaticObject(base, overrides) {
  const oldBase = Object.assign({}, base);
  for (const overrideKey of Object.keys(overrides)) {
    base[overrideKey] = overrides[overrideKey](oldBase);
  }
}

function injectReactDevToolsHook(injectModule, injectFiberHanlers) {
  if (!global.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    global.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
      inject: () => {},
      supportsFiber: true,
      onCommitFiberRoot: () => {},
    };
  }
  const oldInject = global.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject;
  global.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = x => {
    const ReactMount = x.Mount;
    if (oldInject) {
      var id = oldInject.call(global.__REACT_DEVTOOLS_GLOBAL_HOOK__, x);
    }
    injectModule(x);
    // Return id for React Dev Tools
    return id;
  };
  injectFiberHanlers(global.__REACT_DEVTOOLS_GLOBAL_HOOK__);
}

if (process.env.enableReactTesting) {
  global.ReactTesting = {
    addRenderContainer: () => {},
    removeRenderContainer: () => {},
  };
  injectReactDevToolsHook(exposeReactInternalsIntoDomHook, injectFiberHanlers);
}

// ====================================================
// ==================== COMMON =========================
// ====================================================

function appendToSet(attrContainer, name, value) {
  if (value === null) return;
  const attributeStringValue = attrContainer[name];
  const set = (attributeStringValue || '').split(' ').filter(x => x !== '');
  if (!set.includes(value)) {
    attrContainer[name] = (attributeStringValue ? attributeStringValue + ' ' : '') + value;
  }
}

function acceptProp(componentName, propName, propValue) {
  let result =
    !propName.startsWith('$$') &&
    !propName.startsWith('on') &&
    propName !== 'children' &&
    propName !== 'data-tid' &&
    typeof propValue !== 'function';
  if (!result) {
    return false;
  }
  if (attributeWhiteList != null) {
    if (attributeWhiteList[propName] == null) {
      result = false;
    } else {
      if (
        !attributeWhiteList[propName].every(componentNamePattern => acceptPattern(componentNamePattern, componentName))
      ) {
        result = false;
      }
    }
  }
  if (customAcceptAttribute != null) {
    result = customAcceptAttribute(result, componentName, propName);
  }
  return result;
}

function acceptPattern(pattern, value) {
  if (pattern == null) {
    return false;
  }
  if (typeof pattern === 'string') {
    return value === pattern;
  }
  if (typeof pattern.test === 'function') {
    return pattern.test(value);
  }
  return false;
}

function stringifySafe(value) {
  if (typeof value === 'string') {
    return value;
  }
  if (value === undefined || value === null) {
    return '';
  }
  try {
    return JSON.stringify(value);
  } catch (e) {
    try {
      if (Array.isArray(value) && value.length > 0 && Array.isArray(value[0])) {
        return JSON.stringify(value.map(x => x[0]));
      }
    } catch (e) {
      return '';
    }
    return '';
  }
}

// ====================================================
// ==================== FIBER =========================
// ====================================================

const ReactWorkTypes = {
  FunctionComponent: 'FunctionComponent',
  ClassComponent: 'ClassComponent',
  HostPortal: 'HostPortal',
  HostComponent: 'HostComponent',
  Fragment: 'Fragment',
  ContextConsumer: 'ContextConsumer',
  ContextProvider: 'ContextProvider',
};

const WorkTagsByReactVersion = {
  ['<16.5']: {
    [ReactWorkTypes.FunctionComponent]: 1,
    [ReactWorkTypes.ClassComponent]: 2,
    [ReactWorkTypes.HostPortal]: 4,
    [ReactWorkTypes.HostComponent]: 5,
    [ReactWorkTypes.Fragment]: 10,
    [ReactWorkTypes.ContextConsumer]: 12,
    [ReactWorkTypes.ContextProvider]: 13,
  },
  ['>=16.5 <16.6']: {
    [ReactWorkTypes.FunctionComponent]: 0,
    [ReactWorkTypes.ClassComponent]: 2,
    [ReactWorkTypes.HostPortal]: 6,
    [ReactWorkTypes.HostComponent]: 7,
    [ReactWorkTypes.Fragment]: 9,
    [ReactWorkTypes.ContextConsumer]: 11,
    [ReactWorkTypes.ContextProvider]: 12,
  },
  ['>=16.6']: {
    [ReactWorkTypes.FunctionComponent]: 0,
    [ReactWorkTypes.ClassComponent]: 1,
    [ReactWorkTypes.HostPortal]: 4,
    [ReactWorkTypes.HostComponent]: 5,
    [ReactWorkTypes.Fragment]: 7,
    [ReactWorkTypes.ContextConsumer]: 9,
    [ReactWorkTypes.ContextProvider]: 10,
  },
};

function isFiberNodeOfType(node, type) {
  if (!node) return false;
  const reactVersion = node.hasOwnProperty('elementType')
    ? '>=16.6'
    : node.hasOwnProperty('firstContextDependency')
    ? '>=16.5 <16.6'
    : '<16.5';
  const ReactWorkTags = WorkTagsByReactVersion[reactVersion];
  const tag = ReactWorkTags ? ReactWorkTags[type] : null;
  return node.tag === tag;
}
function injectFiberHanlers(hook) {
  extendStaticObject(hook, {
    onCommitFiberRoot: base => (...args) => {
      handleCommitFiberRoot(...args);
      if (base.onCommitFiberRoot) {
        base.onCommitFiberRoot(...args);
      }
    },
  });
}

function handleCommitFiberRoot(rendererID, root) {
  const current = root.current;
  const alternate = current.alternate;
  if (alternate) {
    const wasMounted = alternate.memoizedState != null && alternate.memoizedState.element != null;
    const isMounted = current.memoizedState != null && current.memoizedState.element != null;
    if (!wasMounted && isMounted) {
      handleMountFiber(current);
    } else if (wasMounted && isMounted) {
      handleUpdateFiber(current, alternate);
    } else if (wasMounted && !isMounted) {
      // Skip unmounting
    }
  } else {
    handleMountFiber(current);
  }
}

function handleUpdateFiber(nextFiber, prevFiber) {
  let hasChildOrderChanged = false;
  if (nextFiber.child !== prevFiber.child) {
    let nextChild = nextFiber.child;
    let prevChildAtSameIndex = prevFiber.child;
    while (nextChild) {
      if (nextChild.alternate) {
        const prevChild = nextChild.alternate;
        handleUpdateFiber(nextChild, prevChild);
        if (!hasChildOrderChanged && prevChild !== prevChildAtSameIndex) {
          hasChildOrderChanged = true;
        }
      } else {
        handleMountFiber(nextChild);
        if (!hasChildOrderChanged) {
          hasChildOrderChanged = true;
        }
      }
      nextChild = nextChild.sibling;
      if (!hasChildOrderChanged && prevChildAtSameIndex != null) {
        prevChildAtSameIndex = prevChildAtSameIndex.sibling;
      }
    }
    if (!hasChildOrderChanged && prevChildAtSameIndex != null) {
      hasChildOrderChanged = true;
    }
  }
  updateIfNecessaryFiberNode(nextFiber, hasChildOrderChanged);
}

function handleMountFiber(fiber) {
  let node = fiber;
  outer: while (true) {
    if (node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    mountFiberNode(node);
    if (node == fiber) {
      return;
    }
    if (node.sibling) {
      node.sibling.return = node.return;
      node = node.sibling;
      continue;
    }
    while (node.return) {
      node = node.return;
      mountFiberNode(node);
      if (node == fiber) {
        return;
      }
      if (node.sibling) {
        node.sibling.return = node.return;
        node = node.sibling;
        continue outer;
      }
    }
    return;
  }
}

function mountFiberNode(node) {
  syncDomNodeWithFiberNode(node);
}

function updateIfNecessaryFiberNode(node, hasChildOrderChanged) {
  if (!hasChildOrderChanged && !hasDataChanged(node.alternate, node)) {
    return;
  }
  syncDomNodeWithFiberNode(node);
}

function syncDomNodeWithFiberNode(node) {
  const attrs = {};
  const visitedNodes = [];
  if (isFiberNodeOfType(node, ReactWorkTypes.HostPortal) && node.sibling) {
    const domElement = findDomElementByFiberNode(node.sibling);
    const targetDomElement = findDomElementByFiberNode(node.sibling.return);
    fillAttrsForDomElementByFiberNodeRecursive(attrs, node.sibling, visitedNodes, domElement);
    fillAttrsForDomElementByFiberNodeRecursive(attrs, node.sibling.return, visitedNodes, targetDomElement);
    if (domElement != null) {
      if (typeof domElement.setAttribute === 'function') {
        for (var attrName in attrs) {
          domElement.setAttribute(attrName, attrs[attrName]);
        }
      }
    }
  } else {
    const domElement = findDomElementByFiberNode(node);
    fillAttrsForDomElementByFiberNodeRecursive(attrs, node, visitedNodes, domElement);
    if (domElement != null) {
      if (typeof domElement.setAttribute === 'function') {
        for (var attrName in attrs) {
          domElement.setAttribute(attrName, attrs[attrName]);
        }
      }
    }
  }
}

function hasDataChanged(prevFiber, nextFiber) {
  if (isFiberNodeOfType(prevFiber, ReactWorkTypes.ClassComponent)) {
    if ((nextFiber.effectTag & PerformedWork) !== PerformedWork) {
      return false;
    }
    if (prevFiber.stateNode.context !== nextFiber.stateNode.context) {
      return true;
    }
    if (nextFiber.updateQueue != null && nextFiber.updateQueue.hasForceUpdate) {
      return true;
    }
  }
  return (
    prevFiber.memoizedProps !== nextFiber.memoizedProps ||
    prevFiber.memoizedState !== nextFiber.memoizedState ||
    prevFiber.ref !== nextFiber.ref ||
    prevFiber._debugSource !== nextFiber._debugSource
  );
}

function findDomElementByFiberNode(node) {
  let result = null;
  if (typeof node.setAttribute === 'function') {
    return node;
  }
  if (result == null && node.stateNode) {
    result = findDomElementByFiberNode(node.stateNode);
  }
  if (result == null && node.child) {
    result = findDomElementByFiberNode(node.child);
  }
  return result;
}

function fillAttrsForDomElementByFiberNodeRecursive(attrContainer, node, visitedNodes, domElement) {
  if (node == null || visitedNodes.includes(node)) {
    return;
  }
  visitedNodes.push(node);
  fillAttrsForDomElementByFiberNode(attrContainer, node);
  if (
    isFiberNodeOfType(node, ReactWorkTypes.FunctionComponent) ||
    isFiberNodeOfType(node, ReactWorkTypes.ClassComponent) ||
    isFiberNodeOfType(node, ReactWorkTypes.ContextConsumer) ||
    isFiberNodeOfType(node, ReactWorkTypes.ContextProvider) ||
    isFiberNodeOfType(node, ReactWorkTypes.Fragment)
  ) {
    fillAttrsForDomElementByFiberNodeRecursive(attrContainer, node.child, visitedNodes);
  } else if (isFiberNodeOfType(node, ReactWorkTypes.HostComponent)) {
    // I dont know what does it mean
  } else if (isFiberNodeOfType(node, ReactWorkTypes.HostPortal)) {
    // I dont know what does it mean
  } else {
  }
  if (node.return) {
    const parentDomElement = findDomElementByFiberNode(node.return);
    if (parentDomElement == domElement) {
      fillAttrsForDomElementByFiberNodeRecursive(attrContainer, node.return, visitedNodes, domElement);
    }
  }
  if (node && node.memoizedProps && node.key === 'portal-ref') {
    if (node.return) {
      const parentDomElement = findDomElementByFiberNode(node.return);
      fillAttrsForDomElementByFiberNodeRecursive(attrContainer, node.return, visitedNodes, parentDomElement);
    }
  }
}

function fillAttrsForDomElementByFiberNode(attrContainer, node) {
  const instanceProps = node.memoizedProps;
  const componentName = getFiberComponentName(node);
  if (componentName) {
    appendToSet(attrContainer, 'data-comp-name', componentName);
  }
  if (instanceProps != null) {
    if (instanceProps['data-tid']) {
      appendToSet(attrContainer, 'data-tid', instanceProps['data-tid']);
    }
    for (const prop in instanceProps) {
      if (acceptProp(componentName, prop, instanceProps[prop])) {
        attrContainer[`data-prop-${prop}`] = stringifySafe(instanceProps[prop]);
      }
    }
  } else {
  }
}

function getFiberComponentName(node) {
  if (node.type) {
    return node.type.name;
  }
}

// ====================================================
// =============== REACT (<16.0.0) ====================
// ====================================================

function exposeReactInternalsIntoDomHook({ Mount, Reconciler }) {
  const ReactMount = Mount;
  if (Reconciler == null) {
    return;
  }
  extendStaticObject(Reconciler, {
    receiveComponent: base => (instance, nextElement, transaction, context) => {
      base.receiveComponent(instance, nextElement, transaction, context);

      const prevElement = instance._currentElement;
      if (nextElement === prevElement && context === instance._context) {
        return;
      }

      if (instance._currentElement && instance._currentElement.type) {
        const domElement = getTargetNode(instance, ReactMount);
        updateDomElement(domElement, instance, false);
      }
    },

    mountComponent: base => (instance, tr, host, hostParent, hostContainerInfo, context, ...rest) => {
      const result = base.mountComponent(instance, tr, host, hostParent, hostContainerInfo, context, ...rest);
      if (typeof result === 'string') {
        // React 0.14.*
        const resultDomElement = createDomFromString(result);
        if (!resultDomElement) {
          return result;
        }
        updateDomElement(resultDomElement, instance, true);
        return resultDomElement.outerHTML;
      } else if (result.node) {
        // React 15.*
        updateDomElement(result.node, instance, true);
      }
      return result;
    },
  });
}

function createDomFromString(s) {
  let rootDomElement;
  if (s.startsWith('<tbody') || s.startsWith('<tfoot') || s.startsWith('<thead')) {
    rootDomElement = document.createElement('table');
  } else if (s.startsWith('<th') || s.startsWith('<td')) {
    rootDomElement = document.createElement('tr');
  } else if (s.startsWith('<tr')) {
    rootDomElement = document.createElement('thead');
  } else {
    rootDomElement = document.createElement('div');
  }
  rootDomElement.innerHTML = s;
  return rootDomElement.childNodes[0];
}

function getTargetNode(instance, ReactMount) {
  let result = getDomHostNode(instance);
  if (!result && typeof instance._rootNodeID === 'string') {
    try {
      result = ReactMount.getNode(instance._rootNodeID);
    } catch (e) {
      return null;
    }
  }
  return result;
}

function getComponentName(instance) {
  if (!instance._currentElement || !instance._currentElement.type) {
    return null;
  }
  return instance._currentElement.type.name;
}

function updateDomElement(domElement, instance, isMounting) {
  if (!domElement || typeof domElement.setAttribute !== 'function') {
    return;
  }
  const attrs = fillPropsForDomElementRecursive({}, instance);
  for (const attrName in attrs) {
    domElement.setAttribute(attrName, attrs[attrName]);
  }
}

function fillPropsForDomElementRecursive(attrContainer, instance) {
  attrContainer = fillPropsForDomElement(attrContainer, instance);
  const ownerInstance = instance._currentElement && instance._currentElement._owner;
  if (ownerInstance) {
    if (sameHostNodes(ownerInstance, instance)) {
      attrContainer = fillPropsForDomElementRecursive(attrContainer, ownerInstance);
    }
  }
  return attrContainer;
}

function fillPropsForDomElement(attrContainer, instance) {
  const componentName = getComponentName(instance);
  if (componentName) {
    appendToSet(attrContainer, 'data-comp-name', componentName);
  }
  const key = instance._currentElement && instance._currentElement.key;
  if (key) {
    appendToSet(attrContainer, 'data-key', key);
  }
  const instanceProps = instance._currentElement && instance._currentElement.props;
  if (instanceProps) {
    if (instanceProps['data-tid']) {
      appendToSet(attrContainer, 'data-tid', instanceProps['data-tid']);
    }
    for (const prop in instanceProps) {
      if (acceptProp(componentName, prop, instanceProps[prop])) {
        attrContainer[`data-prop-${prop}`] = stringifySafe(instanceProps[prop]);
      }
    }
  }
  return attrContainer;
}

function sameHostNodes(instance1, instance2) {
  if (typeof instance1._rootNodeID === 'string' || typeof instance2._rootNodeID === 'string') {
    // React 0.14.*
    const nodeId1 = instance1._rootNodeID;
    const nodeId2 = instance2._rootNodeID;
    if (nodeId1 !== null && nodeId2 !== null) {
      return nodeId1 === nodeId2;
    }
  }

  const node1 = getDomHostNode(instance1);
  const node2 = getDomHostNode(instance2);
  return node1 !== null && node2 !== null && node1 === node2;
}

function getDomHostNode(instance) {
  if (instance._hostNode) {
    return instance._hostNode;
  }
  if (instance._renderedComponent) {
    return getDomHostNode(instance._renderedComponent);
  }
  return null;
}
