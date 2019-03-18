import * as React from 'react';
import { LocaleConsumer, LocaleProviderProps } from './LocaleProvider';
import { LocaleHelper } from './LocaleHelper';
import { LocaleControls } from './types';

export function locale<C>(controlName: keyof LocaleControls, localeHelper: LocaleHelper<C>) {
  return <T extends { new (...args: any[]): React.Component }>(constructor: T) => {
    const LocaleDecorator = class extends constructor {
      public controlName: keyof LocaleControls = controlName;
      public localeHelper: LocaleHelper<C> = localeHelper;

      public _localeContext: LocaleProviderProps = {};

      public render() {
        return (
          <LocaleConsumer>
            {localeContext => {
              this._localeContext = localeContext;
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
    };
    Object.defineProperty(LocaleDecorator, 'name', { value: constructor.name });
    return LocaleDecorator;
  };
}
