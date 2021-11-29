import warning from 'warning';

let specificityLevel = 0;
let canModifySpecificityLevel = true;

let specificityClassName = 'react-ui';
let canModifySpecificityClassName = true;

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
  getSpecificityClassName() {
    canModifySpecificityClassName = false;
    return specificityClassName;
  },
  setSpecificityClassName(className: string) {
    if (canModifySpecificityClassName) {
      specificityClassName = className;
    } else {
      warning(false, `specificityClassName=${specificityClassName} уже использован`);
    }
  },
};
