import { MetrikaVariables } from './metrikaTypes';
import { Fiber } from './typings';
import * as components from './components';

let prevProps: any;

export function isReactUI(fiber: Fiber): boolean {
  return !!fiber.type && fiber.type.__REACT_UI__ !== undefined;
}

export function getComponentName(fiber: Fiber): string {
  return fiber.type.__REACT_UI__;
}

export function _call(fiber: Fiber): MetrikaVariables | null {
  const componentName = getComponentName(fiber);
  if (components.hasOwnProperty(componentName)) {
    return (components as any)[componentName](fiber.memoizedProps);
  }
  return null;
}

export function commitFiberNode(fiber: Fiber): void {
  if (isReactUI(fiber) && fiber.memoizedProps !== prevProps) {
    console.log('_call(fiber)', _call(fiber));
    prevProps = fiber.memoizedProps;
  }
}
