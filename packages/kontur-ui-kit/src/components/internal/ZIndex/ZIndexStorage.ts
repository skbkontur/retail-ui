declare const global: {
  __RetailUiZIndexes: number[];
};

export default class ZIndexStorage {
  public static incrementZIndex = (delta: number): number => {
    if (delta <= 0) {
      throw new Error();
    }
    const zIndexes = ZIndexStorage.getZIndexes();
    const top = zIndexes[zIndexes.length - 1];
    const zIndex = top + delta;
    zIndexes.push(zIndex);
    return zIndex;
  };

  public static removeZIndex = (zIndex: number): void => {
    const zIndexes = ZIndexStorage.getZIndexes();
    const i = zIndexes.indexOf(zIndex);
    zIndexes.splice(i, 1);
  };

  private static getZIndexes = (): number[] => {
    return global.__RetailUiZIndexes || (global.__RetailUiZIndexes = [0]);
  };
}
