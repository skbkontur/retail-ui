import * as React from 'react';
import { LocaleContextConsumer, LocaleContextProps } from "./LocaleContext";
import { LocaleHelper } from "./LocaleHelper";
import { LocaleControls } from "./types";

export function locale<C>(componentName: keyof LocaleControls, localeHelper: LocaleHelper<C>) {
  return<T extends { new(...args: any[]): React.Component }>(constructor: T) => {
    return class extends constructor {
      public componentName: keyof LocaleControls = componentName;
      public localeHelper: LocaleHelper<C> = localeHelper;

      public _localeContext: LocaleContextProps = {};

      public render() {
        return (
          <LocaleContextConsumer>
            {localeContext => {
              this._localeContext = localeContext;
              return super.render();
            }}
          </LocaleContextConsumer>
        );
      }
    }
  }
}


export function getLocale(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    // tslint:disable-next-line
    get: function () {
      const langCode = this._localeContext.langCode;
      const localeFromContext = this._localeContext.locale && this._localeContext.locale[this.componentName];
      return Object.assign({}, this.localeHelper.get(langCode), localeFromContext);
    },
    set: value => value
  });
}
