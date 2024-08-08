import { globalObject } from '@skbkontur/global-object';

export type Priority = number | LayerComponentName;
const calculatePriority = (priority: Priority) => {
  if (typeof priority === 'string') {
    return componentPriorities[priority];
  }

  return priority;
};

export type LayerComponentName = keyof typeof componentPriorities;

export interface GlobalWithRetailUiZIndexes {
  __RetailUiZIndexes?: number[];
}

export const componentPriorities = {
  MobilePopup: 9000,
  Toast: 10000,
  GlobalLoader: 10,
  Sidepage: 9,
  Modal: 9,
  Sticky: 7,
  PopupMenu: 5,
  Popup: 3,
};
const priorityStep = 1000;
const globalWithRetailUiZIndexes = globalObject as GlobalWithRetailUiZIndexes;
const getZIndexes = (): number[] =>
  globalWithRetailUiZIndexes.__RetailUiZIndexes || (globalWithRetailUiZIndexes.__RetailUiZIndexes = [0]);
const getIndexPriority = (zIndex: number) => Math.trunc(zIndex / priorityStep);
const getMaxAllowedValue = (priority: number): number => (priority + 1) * priorityStep - 1;

export const upperBorder = getMaxAllowedValue(Math.max(...Object.values(componentPriorities)));

export function incrementZIndex(priority: Priority, delta: number): number {
  const calculatedPriority = calculatePriority(priority);

  const maxAllowedValue = getMaxAllowedValue(calculatedPriority);
  const zIndexes = getZIndexes();

  let prevIndexId = zIndexes.length - 1;
  while (zIndexes[prevIndexId] > maxAllowedValue && prevIndexId > 0) {
    prevIndexId--;
  }

  const zIndex =
    getIndexPriority(zIndexes[prevIndexId]) === calculatedPriority
      ? Math.min(zIndexes[prevIndexId] + delta, maxAllowedValue)
      : calculatedPriority * priorityStep;

  zIndexes.push(zIndex);
  zIndexes.sort((a, b) => a - b);
  return zIndex;
}

export function removeZIndex(zIndex: number): void {
  const zIndexes = getZIndexes();
  const i = zIndexes.indexOf(zIndex);

  if (i !== -1) {
    zIndexes.splice(i, 1);
  }
}
