import warning from 'warning';

let specificityLevel = 0;
let canModifySpecificityLevel = true;

let reactUiPrefix = 'react-ui';

export const Upgrade = {
  getSpecificityLevel() {
    canModifySpecificityLevel = false;
    return specificityLevel;
  },
  setSpecificityLevel(level: number) {
    if (canModifySpecificityLevel) {
      specificityLevel = level;
    } else {
      warning(false, `specificityLevel=${specificityLevel} уже использован`);
    }
  },
  getUiPrefix() {
    return reactUiPrefix;
  },
  setUiPrefix(prefix: string) {
    reactUiPrefix = prefix;
  },
};
