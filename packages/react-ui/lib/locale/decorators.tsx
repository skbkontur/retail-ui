// A mixin class must have a constructor with a single rest parameter of type 'any[]'.
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { defaultLangCode } from './constants';
import { LocaleContext } from './LocaleContext';
import { LocaleHelper } from './LocaleHelper';
import { LangCodes, LocaleControls } from './types';

export function locale<C>(controlName: keyof LocaleControls, localeHelper: LocaleHelper<C>) {
  return <T extends new (...args: any[]) => React.Component>(constructor: T) => {
    const LocaleDecorator = class extends constructor {
      public static contextType = LocaleContext;
      public context!: React.ContextType<typeof LocaleContext>;
      public controlName: keyof LocaleControls = controlName;
      public localeHelper: LocaleHelper<C> = localeHelper;

      public get locale(): C {
        const localeFromContext = this.context.locale?.[this.controlName];
        return Object.assign({}, this.localeHelper.get(this.context.langCode), localeFromContext);
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
