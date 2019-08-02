import { commitFiberNode, isReactUI } from './telemtryInput';
import { Fiber, FiberRoot, Hook, ReactRenderer } from './typings';

let customAcceptAttribute = (prevResult: boolean, ...args: any[]): boolean => prevResult;
let attributeWhiteList: { [key: string]: Array<string | RegExp> } | null = null;

const Index = {
  attributeWhiteList: {
    error: [/.*/],
    warning: [/.*/],
    disabled: [/.*/],
    disablePortal: ['ComboBoxRenderer'],
    checked: [/.*/],
    items: ['RadioGroup'],
    value: [/.*/],
    customProp1: ['SomeComponent'],
    customProp2: [/^.+SomeComponent.+$/],
    activePage: ['Paging'],
    pagesCount: ['Paging'],
  },
  acceptAttribute: (prevAcceptResult: boolean, componentName?: string, propName?: string): boolean => {
    if (componentName === 'Select' && propName === 'items') {
      return true;
    }
    return prevAcceptResult;
  },
};

const ReactTypeOfWork = {
  IndeterminateComponent: 0,
  FunctionalComponent: 1,
  ClassComponent: 2,
  HostRoot: 3,
  HostPortal: 4,
  HostComponent: 5,
  HostText: 6,
  CoroutineComponent: 7,
  CoroutineHandlerPhase: 8,
  YieldComponent: 9,
  Fragment: 10,
};

// Inlined from ReactTypeOfSideEffect
const PerformedWork: number = 1;

// Сохраняем отдельно ссылки на свойства объекта, который доступен глобально...
// WHY: Зачем?
if (typeof Index !== 'undefined') {
  if (Index && Index.acceptAttribute && typeof Index.acceptAttribute === 'function') {
    customAcceptAttribute = Index.acceptAttribute;
  }

  if (Index && Index.attributeWhiteList && typeof Index.attributeWhiteList === 'object') {
    attributeWhiteList = Index.attributeWhiteList;
  }
}

// FIXME: Мапинг объекта
function extendStaticObject(base: any, overrides: any) {
  const oldBase = Object.assign({}, base);
  for (const overrideKey of Object.keys(overrides)) {
    base[overrideKey] = overrides[overrideKey](oldBase);
  }
}

function injectReactDevToolsHook(injectModule: any, ifh: any = injectFiberHanlers) {
  let hook: Hook = global.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!hook) {
    hook = {
      inject: () => {
        // empty
      },
      supportsFiber: true,
      onCommitFiberRoot: () => {
        // empty
      },
    };
  }

  // Сохраняем предыдущий метод inject объекта Hook
  const oldInject = hook.inject;
  hook.inject = (x: any) => {
    const ReactMount = x.Mount;
    let id: any;
    if (oldInject) {
      id = oldInject.call(hook, x);
    }
    injectModule(x);
    // Return id for React Dev Tools
    return id;
  };
  ifh(hook);
}

console.log('process.env.enableReactTesting', process.env.enableReactTesting);

// if (process.env.enableReactTesting) {
global.ReactTesting = {
  addRenderContainer: () => {
    // empty
  },
  removeRenderContainer: () => {
    // empty
  },
};
injectReactDevToolsHook(exposeReactInternalsIntoDomHook, injectFiberHanlers);
// }

// ====================================================
// ==================== COMMON =========================
// ====================================================

function appendToSet(attrContainer: any, name: string, value: any) {
  if (value === null) {
    return;
  }
  const attributeStringValue: string = attrContainer[name];
  const set: any[] = (attributeStringValue || '').split(' ').filter(x => x !== '');
  if (!set.includes(value)) {
    attrContainer[name] = (attributeStringValue ? attributeStringValue + ' ' : '') + value;
  }
}

function acceptProp(componentName: string, propName: string, propValue: any) {
  let result: any =
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
        !attributeWhiteList[propName].every((componentNamePattern: any) =>
          acceptPattern(componentNamePattern, componentName),
        )
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

function acceptPattern(pattern: any, value: any) {
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

function stringifySafe(value: any) {
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

// Создаём прокси для onCommitFiberRoot, перехватывая все вызовы
function injectFiberHanlers(hook: any) {
  extendStaticObject(hook, {
    onCommitFiberRoot: (base: any) => (...args: any[]) => {
      handleCommitFiberRoot(args[0], args[1]);
      if (base.onCommitFiberRoot) {
        base.onCommitFiberRoot(...args);
      }
    },
  });
}

// Перехватчик всех изменений в DOM
function handleCommitFiberRoot(rendererID: string, root: FiberRoot) {
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

// FIXME: Вникнуть как работает!
function handleUpdateFiber(nextFiber: Fiber, prevFiber: Fiber) {
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

// FIXME: Вникнуть как работает!
// TODO: Скорее всего надо доставать ClassComponent именно отсюда
function handleMountFiber(fiber: Fiber) {
  let node = fiber;
  // console.log('handleMountFiber');
  // wat(node);
  outer: while (true) {
    if (node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    mountFiberNode(node);
    if (node === fiber) {
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
      if (node === fiber) {
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

function mountFiberNode(node: Fiber) {
  // syncDomNodeWithFiberNode(node);
  // wat(node);
  commitFiberNode(node);
}

function updateIfNecessaryFiberNode(node: Fiber, hasChildOrderChanged: boolean) {
  if (!hasChildOrderChanged && !hasDataChanged(node.alternate, node)) {
    return;
  }
  // syncDomNodeWithFiberNode(node);
  // wat(node);
  commitFiberNode(node);
}

let prevProps: any;
function wat(node: Fiber): void {
  if (Boolean(node.type && node.type.__REACT_UI__)) {
    if (node.memoizedProps !== prevProps && isReactUI(node)) {
      // console.log('new props: ', node.memoizedProps, prevProps, node);
      console.log('require 1', require('./components/Button/Button'));
      console.log('require 2', require('./components/Button/Button'));
      console.log('telemetry', getFiberComponentName(node));
      // console.log('telemetry', Button(node.memoizedProps));
    }
    prevProps = node.memoizedProps;
  }
  // console.log(
  //   'wat',
  //   typeof node.type === 'string' ? node.type : node.type.name,
  //   Boolean(node.elementType.__REACT_UI__),
  //   node,
  // );
}

// FIXME: Вникнуть как работает!
function syncDomNodeWithFiberNode(node: Fiber) {
  const attrs: any = {};
  const visitedNodes: any[] = [];
  if (node.tag === 4 && node.sibling) {
    const domElement = findDomElementByFiberNode(node.sibling);
    const targetDomElement = findDomElementByFiberNode(node.sibling.return);
    fillAttrsForDomElementByFiberNodeRecursive(attrs, node.sibling, visitedNodes, domElement);
    fillAttrsForDomElementByFiberNodeRecursive(attrs, node.sibling.return, visitedNodes, targetDomElement);
    if (domElement != null) {
      if (typeof domElement.setAttribute === 'function') {
        // tslint:disable-next-line:forin
        for (const attrName in attrs) {
          domElement.setAttribute(attrName, attrs[attrName]);
        }
      }
    }
  } else {
    const domElement = findDomElementByFiberNode(node);
    fillAttrsForDomElementByFiberNodeRecursive(attrs, node, visitedNodes, domElement);
    if (domElement != null) {
      if (typeof domElement.setAttribute === 'function') {
        // tslint:disable-next-line:forin
        for (const attrName1 in attrs) {
          domElement.setAttribute(attrName1, attrs[attrName1]);
        }
      }
    }
  }
}

// Проверям, изменены ли данные
function hasDataChanged(prevFiber: Fiber | null, nextFiber: Fiber) {
  if (prevFiber === null) {
    return false;
  }
  if (prevFiber.tag === ReactTypeOfWork.ClassComponent) {
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

// FIXME: Вникнуть как работает!
function findDomElementByFiberNode(node: any /* Fiber | Element | ...*/): HTMLElement | null {
  let result = null;
  if (typeof node.setAttribute === 'function') {
    return node;
  }
  if (result == null && node._node) {
    result = findDomElementByFiberNode(node._node);
  }
  if (result == null && node.stateNode) {
    result = findDomElementByFiberNode(node.stateNode);
  }
  if (result == null && node.child) {
    result = findDomElementByFiberNode(node.child);
  }
  return result;
}

// Рекурсивно заполняем свойства Элемента
function fillAttrsForDomElementByFiberNodeRecursive(
  attrContainer: object,
  node: Fiber | null,
  visitedNodes: Fiber[],
  domElement?: HTMLElement | null,
) {
  if (node == null || visitedNodes.includes(node)) {
    return;
  }
  visitedNodes.push(node);
  fillAttrsForDomElementByFiberNode(attrContainer, node);
  if (node.tag === 1 || node.tag === 2 || node.tag === 12 || node.tag === 13 || node.tag === 10) {
    fillAttrsForDomElementByFiberNodeRecursive(attrContainer, node.child, visitedNodes);
  } else if (node.tag === 5) {
    // I dont know what does it mean
  } else if (node.tag === 4) {
    // I dont know what does it mean
  }
  if (node.return) {
    const parentDomElement = findDomElementByFiberNode(node.return);
    if (parentDomElement === domElement) {
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

// Заполняем новые поля для DOM элемента
function fillAttrsForDomElementByFiberNode(attrContainer: any, node: any) {
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
    //  Empty
  }
}

// Получить название React-компонента
function getFiberComponentName(node: Fiber) {
  if (node.type) {
    return node.type.name;
  }
}

// ====================================================
// =============== REACT (<16.0.0) ====================
// ====================================================

// FIXME: Вникнуть как работает!
function exposeReactInternalsIntoDomHook({ Mount, Reconciler }: ReactRenderer) {
  const ReactMount = Mount;
  if (Reconciler == null) {
    return;
  }
  extendStaticObject(Reconciler, {
    receiveComponent: (base: any) => (instance: any, nextElement: any, transaction: any, context: any) => {
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

    mountComponent: (base: any) => (
      instance: any,
      tr: any,
      host: any,
      hostParent: any,
      hostContainerInfo: any,
      context: any,
      ...rest: any[]
    ) => {
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

// Создает HTMLElement
function createDomFromString(s: string): ChildNode {
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

function getTargetNode(instance: any, ReactMount: any) {
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

function getComponentName(instance: any) {
  if (!instance._currentElement || !instance._currentElement.type) {
    return null;
  }
  return instance._currentElement.type.name;
}

function updateDomElement(domElement: any, instance: any, isMounting: boolean) {
  if (!domElement || typeof domElement.setAttribute !== 'function') {
    return;
  }
  const attrs = fillPropsForDomElementRecursive({}, instance);
  // tslint:disable-next-line:forin
  for (const attrName in attrs) {
    domElement.setAttribute(attrName, attrs[attrName]);
  }
}

function fillPropsForDomElementRecursive(attrContainer: any, instance: any) {
  attrContainer = fillPropsForDomElement(attrContainer, instance);
  const ownerInstance = instance._currentElement && instance._currentElement._owner;
  if (ownerInstance) {
    if (sameHostNodes(ownerInstance, instance)) {
      attrContainer = fillPropsForDomElementRecursive(attrContainer, ownerInstance);
    }
  }
  return attrContainer;
}

function fillPropsForDomElement(attrContainer: any, instance: any) {
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

function sameHostNodes(instance1: any, instance2: any): boolean {
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

function getDomHostNode(instance: any): any {
  if (instance._hostNode) {
    return instance._hostNode;
  }
  if (instance._renderedComponent) {
    return getDomHostNode(instance._renderedComponent);
  }
  return null;
}
