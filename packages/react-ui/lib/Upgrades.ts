import warning from 'warning';

let specificityLevel = 0;
let canModifySpecificityLevel = true;

let specificityClassName = 'react-ui';
let canModifySpecificityClassName = true;

//TODO Delete Upgrade in major release if it still doesn't work (https://tech.skbkontur.ru/react-ui/#/Migration)
export const Upgrade = {
  getSpecificityLevel() {
    warning(
      false,
      "getSpecificityLevel doesn't work. For more information please visit https://tech.skbkontur.ru/react-ui/#/Migration",
    );
    canModifySpecificityLevel = false;
    return specificityLevel;
  },
  setSpecificityLevel(level: number) {
    warning(
      true,
      "setSpecificityLevel doesn't work. For more information please visit https://tech.skbkontur.ru/react-ui/#/Migration",
    );
    if (canModifySpecificityLevel) {
      specificityLevel = level;
    } else {
      warning(false, `specificityLevel=${specificityLevel} уже использован`);
    }
  },
  getSpecificityClassName() {
    warning(
      false,
      "getSpecificityClassName doesn't work. For more information please visit https://tech.skbkontur.ru/react-ui/#/Migration",
    );
    canModifySpecificityClassName = false;
    return specificityClassName;
  },
  setSpecificityClassName(className: string) {
    warning(
      false,
      "setSpecificityClassName doesn't work. For more information please visit https://tech.skbkontur.ru/react-ui/#/Migration",
    );
    if (canModifySpecificityClassName) {
      specificityClassName = className;
    } else {
      warning(false, `specificityClassName=${specificityClassName} уже использован`);
    }
  },
};
