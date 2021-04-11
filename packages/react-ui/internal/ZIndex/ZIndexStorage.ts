import { globalThat } from '../../lib/SSRSafe';

export type LayerComponentName = keyof typeof componentPriorities;

const componentPriorities = {
  Toast: 10000,
  Sidepage: 9,
  Modal: 9,
  Sticky: 7,
  DropdownContainer: 5,
  Popup: 3,
  Loader: 1,
  ModalHeader: 1,
  ModalFooter: 1,
  ModalCross: 2,
  ModalBody: 0,
};
const priorityStep = 1000;

const getZIndexes = (): number[] => globalThat.__RetailUiZIndexes || (globalThat.__RetailUiZIndexes = [0]);
const getIndexPriority = (zIndex: number) => Math.trunc(zIndex / priorityStep);
const getMaxAllowedValue = (priority: number): number => (priority + 1) * priorityStep - 1;

export const upperBorder = getMaxAllowedValue(Math.max(...Object.values(componentPriorities)));

export function incrementZIndex(priority: number | LayerComponentName, delta: number): number {
  if (typeof priority === 'string') {
    priority = componentPriorities[priority];
  }

  const maxAllowedValue = getMaxAllowedValue(priority);
  const zIndexes = getZIndexes();

  let prevIndexId = zIndexes.length - 1;
  while (zIndexes[prevIndexId] > maxAllowedValue && prevIndexId > 0) {
    prevIndexId--;
  }

  const zIndex =
    getIndexPriority(zIndexes[prevIndexId]) === priority
      ? Math.min(zIndexes[prevIndexId] + delta, maxAllowedValue)
      : priority * priorityStep;

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
