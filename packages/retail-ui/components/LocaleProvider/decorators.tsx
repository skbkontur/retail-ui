import * as React from 'react';
import { defaultLangCode } from './constants';
import { LocaleConsumer, LocaleProviderProps } from './LocaleProvider';
import { LocaleHelper } from './LocaleHelper';
import { LangCodes, LocaleControls } from './types';
import isEqual from 'lodash.isequal'

interface LocaleInstance {
  updateLocaleContext?: () => void;
}

export function locale<C>(controlName: keyof LocaleControls, localeHelper: LocaleHelper<C>) {
  return <T extends { new (...args: any[]): React.Component & LocaleInstance }>(constructor: T) => {
    const LocaleDecorator = class extends constructor {
      public controlName: keyof LocaleControls = controlName;
      public localeHelper: LocaleHelper<C> = localeHelper;

      public _localeContext: LocaleProviderProps = {};

      public render() {
        return (
          <LocaleConsumer>
            {localeContext => {
              const prev = this._localeContext;
              this._localeContext = localeContext;
              if (!isEqual({}, prev) && !isEqual(prev, localeContext) && this.updateLocaleContext) {
                setTimeout(() => this.updateLocaleContext && this.updateLocaleContext(), 0);
              }
              return super.render();
            }}
          </LocaleConsumer>
        );
      }

      public get locale(): C {
        const langCode = this._localeContext.langCode;
        const localeFromContext = this._localeContext.locale && this._localeContext.locale[this.controlName];
        return Object.assign({}, this.localeHelper.get(langCode), localeFromContext);
      }

      public get langCode(): LangCodes {
        return this._localeContext.langCode || defaultLangCode;
      }
    };
    Object.defineProperty(LocaleDecorator, 'name', { value: constructor.name });
    return LocaleDecorator;
  };
}
