import {Decorator} from '@storybook/react';
import React from "react";
import {LangCodes, LocaleContext} from '../../../lib/locale';
import {defaultLangCode} from "../../../lib/locale/constants";

export const toolbarItems: { [key: string]: LangCodes } = {
  ru: LangCodes.ru_RU,
  en: LangCodes.en_GB,
};

export const LocaleDecorator: Decorator = (Story, context) => {
  console.log(context, context.globals)
  const { locale } = context.globals;
  const storybookLocale = toolbarItems[locale] || defaultLangCode;

    return (
      <LocaleContext.Provider value={{ langCode: storybookLocale }}>
        <Story />
      </LocaleContext.Provider>
    );
}
