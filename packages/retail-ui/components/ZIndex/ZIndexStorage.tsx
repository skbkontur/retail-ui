export type LayerComponentName =
  | 'Loader'
  | 'Modal'
  | 'ModalHeader'
  | 'ModalFooter'
  | 'DropdownContainer'
  | 'Popup'
  | 'Sidepage';

export default class ZIndexStorage {
  public static incrementZIndex = (priority: number | LayerComponentName, delta: number): number => {
    if (delta <= 0) {
      throw new Error();
    }

    if (typeof priority === 'string') {
      priority = ZIndexStorage.componentPriorities[priority];
    }

    const maxAllowedValue = (priority + 1) * ZIndexStorage.priorityStep - 1;
    const zIndexes = ZIndexStorage.getZIndexes();

    let prevIndexId = zIndexes.length - 1;
    while (zIndexes[prevIndexId] >= maxAllowedValue && prevIndexId >= 0) {
      prevIndexId--;
    }

    const zIndex =
      ZIndexStorage.getIndexPriority(zIndexes[prevIndexId]) === priority
        ? Math.min(zIndexes[prevIndexId] + delta, maxAllowedValue)
        : priority * ZIndexStorage.priorityStep;

    zIndexes.push(zIndex);
    zIndexes.sort((a, b) => a - b);
    return zIndex;
  };

  public static removeZIndex = (zIndex: number): void => {
    const zIndexes = ZIndexStorage.getZIndexes();
    const i = zIndexes.indexOf(zIndex);
    zIndexes.splice(i, 1);
  };

  public static get upperBorder(): number {
    return (Math.max.apply(null, Object.values(ZIndexStorage.componentPriorities)) + 1) * ZIndexStorage.priorityStep;
  }

  private static componentPriorities = {
    Sidepage: 9,
    Modal: 9,
    ModalHeader: 7,
    ModalFooter: 7,
    DropdownContainer: 5,
    Popup: 3,
    Loader: 1,
  };

  private static priorityStep = 1000;
  private static getIndexPriority = (zIndex: number) => Math.trunc(zIndex / ZIndexStorage.priorityStep);

  private static getZIndexes = (): number[] => {
    return window.__RetailUiZIndexes || (window.__RetailUiZIndexes = [0]);
  };
}
