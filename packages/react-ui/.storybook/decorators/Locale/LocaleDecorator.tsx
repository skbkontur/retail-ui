import { Decorator } from '@storybook/react';
import React from 'react';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { defaultLangCode } from '../../../lib/locale/constants';

export const toolbarItems: { [key: string]: LangCodes } = {
  ru: LangCodes.ru_RU,
  en: LangCodes.en_GB,
};

const supportedLocaleControls = [
  'Loader',
  'Spinner',
  'Calendar',
  'DateInput',
  'DatePicker',
  'Autocomplete',
  'Paging',
  'FileUploader',
];
const hideLocaleBtnInUnsupportedControls = (activeControl: string) => {
  const localeBtn = window.parent.document.querySelector('button[title="React UI Locale"]');
  const localeBtnWrapper = localeBtn?.closest('div');
  if (localeBtnWrapper) {
    localeBtnWrapper.style.display = supportedLocaleControls.includes(activeControl) ? 'inline-block' : 'none';
  }
};

export const LocaleDecorator: Decorator = (Story, context) => {
  const { locale } = context.globals;
  const activeControl = context.title.split('/')[1];
  const storybookLocale = toolbarItems[locale] || defaultLangCode;
  hideLocaleBtnInUnsupportedControls(activeControl);

  return (
    <LocaleContext.Provider value={{ langCode: storybookLocale }}>
      <Story />
    </LocaleContext.Provider>
  );
};
