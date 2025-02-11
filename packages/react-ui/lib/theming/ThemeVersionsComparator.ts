import warning from 'warning';

const versionToNumbers = (version: string, delimiter: string): number[] => {
  return version.split(delimiter).map((i) => (/^\d+$/.test(i) ? Number(i) : Number.NaN));
};

const compareVersions = (
  ver1: string,
  ver2: string,
  comparator: (a: number, b: number) => boolean,
  delimiter: string = '_',
): boolean => {
  const arr1 = versionToNumbers(ver1, delimiter);
  const arr2 = versionToNumbers(ver2, delimiter);
  const maxArrLength = Math.max(arr1.length, arr2.length);

  for (let i = 0; i < maxArrLength; i++) {
    const item1 = arr1[i] ?? 0;
    const item2 = arr2[i] ?? 0;

    if (Number.isNaN(item1) || Number.isNaN(item2)) {
      warning(
        true,
        `[ThemeVersionsComparator]: unsupported version format. Only numbers and "${delimiter}" are allowed in ${ver1} and ${ver2}.`,
      );
      break;
    }

    if (item1 !== item2 || i === maxArrLength - 1) {
      return comparator(item1, item2);
    }
  }

  return false;
};

export const isVersionEQ = (ver1: string, ver2: string) => compareVersions(ver1, ver2, (a, b) => a === b);
export const isVersionGT = (ver1: string, ver2: string) => compareVersions(ver1, ver2, (a, b) => a > b);
export const isVersionGTE = (ver1: string, ver2: string) => compareVersions(ver1, ver2, (a, b) => a >= b);
