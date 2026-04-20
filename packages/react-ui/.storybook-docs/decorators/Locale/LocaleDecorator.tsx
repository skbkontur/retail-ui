import type { Decorator } from '@storybook/react';
import React from 'react';

import { defaultLangCode } from '../../../lib/locale/constants.js';
import { LangCodes, LocaleContext } from '../../../lib/locale/index.js';

export const toolbarItems: { [key: string]: LangCodes } = {
  ru: LangCodes.ru_RU,
  en: LangCodes.en_GB,
};

const supportedLocaleControls = [
  'Autocomplete',
  'Calendar',
  'DateInput',
  'DatePicker',
  'FileUploader',
  'Modal',
  'Paging',
  'PasswordInput',
  'Select',
  'SidePage',
  'Toast',
  'Token',
  'TokenInput',
];
const hideLocaleBtnInUnsupportedControls = (activeControl: string) => {
  const localeBtn = document.querySelector('button[title="React UI Locale"]');
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
