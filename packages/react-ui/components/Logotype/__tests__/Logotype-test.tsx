import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import { LangCodes, LocaleProvider } from '../../LocaleProvider';
import { defaultLangCode } from '../../LocaleProvider/constants';
import { LogotypeLocaleHelper } from '../locale';
import { Logotype } from '../Logotype';

describe('Logotype', () => {
  describe('Locale', () => {
    let wrapper: ReactWrapper;
    const getActual = () => ({
      actualPrefix: wrapper
        .find('span')
        .at(1)
        .text(),
      actualSuffix: wrapper
        .find('span')
        .at(3)
        .text(),
    });

    it('render without LocaleProvider', () => {
      wrapper = mount(<Logotype />);
      const { prefix, suffix } = LogotypeLocaleHelper.get(defaultLangCode);

      const { actualPrefix, actualSuffix } = getActual();
      expect(prefix).toBe(actualPrefix);
      expect(suffix).toBe(actualSuffix);
    });

    it('render default locale', () => {
      wrapper = mount(
        <LocaleProvider>
          <Logotype />
        </LocaleProvider>,
      );
      const { prefix, suffix } = LogotypeLocaleHelper.get(defaultLangCode);

      const { actualPrefix, actualSuffix } = getActual();
      expect(prefix).toBe(actualPrefix);
      expect(suffix).toBe(actualSuffix);
    });

    it('render correct locale when set langCode', () => {
      wrapper = mount(
        <LocaleProvider langCode={LangCodes.en_GB}>
          <Logotype />
        </LocaleProvider>,
      );
      const { prefix, suffix } = LogotypeLocaleHelper.get(LangCodes.en_GB);

      const { actualPrefix, actualSuffix } = getActual();
      expect(prefix).toBe(actualPrefix);
      expect(suffix).toBe(actualSuffix);
    });

    it('render custom locale', () => {
      const customPrefix = 'custom prefix';
      wrapper = mount(
        <LocaleProvider
          locale={{
            Logotype: { prefix: customPrefix },
          }}
        >
          <Logotype />
        </LocaleProvider>,
      );

      const actualPrefix = wrapper
        .find('span')
        .at(1)
        .text();
      expect(customPrefix).toBe(actualPrefix);
    });

    it('updates when langCode changes', () => {
      wrapper = mount(
        <LocaleProvider>
          <Logotype />
        </LocaleProvider>,
      );
      const { prefix, suffix } = LogotypeLocaleHelper.get(LangCodes.en_GB);

      wrapper.setProps({ langCode: LangCodes.en_GB });

      const { actualPrefix, actualSuffix } = getActual();
      expect(prefix).toBe(actualPrefix);
      expect(suffix).toBe(actualSuffix);
    });
  });
});
