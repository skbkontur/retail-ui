const compareVersions = (ver1: string, ver2: string, comparator: (a: number, b: number) => boolean) => {
  if (!ver1 || !ver2) {
    return false;
  }

  const [arr1, arr2] = [ver1, ver2].map((version) => version.split('_').map(Number));
  const maxArrLength = Math.max(arr1.length, arr2.length);

  for (let i = 0; i < maxArrLength; i++) {
    const item1 = arr1[i] || 0;
    const item2 = arr2[i] || 0;

    if ([item1, item2].find(Number.isNaN)) {
      return false;
    }

    if (item1 === item2) {
      continue;
    } else {
      return comparator(item1, item2);
    }
  }
  return comparator(1, 1);
};

export const isVersionEQ = (ver1: string, ver2: string) => compareVersions(ver1, ver2, (a, b) => a === b);
export const isVersionGT = (ver1: string, ver2: string) => compareVersions(ver1, ver2, (a, b) => a > b);
export const isVersionGTE = (ver1: string, ver2: string) => compareVersions(ver1, ver2, (a, b) => a >= b);
