import React from 'react';

import { defaultLangCode } from './constants';
import { LocaleContext } from './LocaleContext';
import { LocaleHelper } from './LocaleHelper';
import { LangCodes, LocaleControls } from './types';

type ControlNamesType = keyof LocaleControls | Array<keyof LocaleControls>;

export const getLocaleFromContext = (controlNames: ControlNamesType, locale: LocaleControls | undefined) => {
  if (typeof controlNames === 'string' || typeof controlNames === 'number') {
    return locale?.[controlNames];
  }

  return controlNames.reduce((prev, controlName) => {
    return { ...prev, ...locale?.[controlName] };
  }, {});
};

export function locale<C>(controlNames: ControlNamesType, localeHelpers: LocaleHelper<C>) {
  return <T extends new (...args: any[]) => React.Component>(constructor: T) => {
    const LocaleDecorator = class extends constructor {
      public static contextType = LocaleContext;
      public context!: React.ContextType<typeof LocaleContext>;
      public controlName: ControlNamesType = controlNames;
      public localeHelper: LocaleHelper<C> = localeHelpers;

      public get locale(): C {
        const localeFromContext = getLocaleFromContext(controlNames, this.context.locale);

        return { ...this.localeHelper.get(this.context.langCode), ...localeFromContext };
      }

      public set locale(l: C) {
        // TODO альтернативная транспиляция декораторов ломает тесты
      }

      public get langCode(): LangCodes {
        return this.context.langCode ?? defaultLangCode;
      }
    };

    const nameDescriptor = Object.getOwnPropertyDescriptor(LocaleDecorator, 'name');
    if (!nameDescriptor || nameDescriptor.configurable) {
      Object.defineProperty(LocaleDecorator, 'name', { value: constructor.name });
    }

    return LocaleDecorator;
  };
}
