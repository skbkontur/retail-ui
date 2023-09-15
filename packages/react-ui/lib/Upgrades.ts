import warning from 'warning';
import { Window } from '@skbkontur/global-object/lib';

let specificityLevel = 0;
let canModifySpecificityLevel = true;

let specificityClassName = 'react-ui';
let canModifySpecificityClassName = true;

// eslint-disable-next-line no-undef
let _window = typeof window !== 'undefined' ? window : undefined;
let canModifyWindow = true;

//TODO Delete Upgrade in major release if it still doesn't work (https://tech.skbkontur.ru/react-ui/#/Migration)
export const Upgrade = {
  getSpecificityLevel() {
    canModifySpecificityLevel = false;
    return specificityLevel;
  },
  setSpecificityLevel(level: number) {
    warning(
      false,
      "setSpecificityLevel doesn't work. For more information please visit https://tech.skbkontur.ru/react-ui/#/Migration",
    );
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
  getWindow() {
    canModifyWindow = false;
    return _window;
  },
  setWindow(win: Window & typeof globalThis) {
    if (canModifyWindow) {
      _window = win;
    } else {
      warning(false, `window уже использован и не может быть переопределен`);
    }
  },
};
