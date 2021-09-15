import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { IFileAttacherProps } from '../../../components/FileAttacher/FileAttacher';
import { UploadFileControlLocaleHelper } from '../locale';
import { Link } from '../../../components/Link';
import { UploadFileControl } from '../UploadFileControl';
import { withUploadFilesProvider } from '../UploadFileControlProvider';

const WrappedUploadFileControl = withUploadFilesProvider(UploadFileControl);

const render = (localeProviderValue = {}, props: IFileAttacherProps = {}) => mount(
  <LocaleContext.Provider value={localeProviderValue}>
    <WrappedUploadFileControl {...props} />
  </LocaleContext.Provider>
);

const getBaseButtonText = (wrapper: ReactWrapper): string => {
  return wrapper.find(Link).text();
};

describe('UploadFileControl', () => {
  describe('Locale', () => {
    it('render without LocaleProvider', () => {
      const wrapper = mount(<WrappedUploadFileControl />);
      const expectedText = UploadFileControlLocaleHelper.get(defaultLangCode).chooseFile;

      expect(getBaseButtonText(wrapper)).toBe(expectedText);
    });

    it('render default locale', () => {
      const wrapper = render();
      const expectedText = UploadFileControlLocaleHelper.get(defaultLangCode).chooseFile;

      expect(getBaseButtonText(wrapper)).toBe(expectedText);
    });

    it('render correct locale when set langCode', () => {
      const wrapper = render({ langCode: LangCodes.en_GB });
      const expectedText = UploadFileControlLocaleHelper.get(LangCodes.en_GB).chooseFile;

      expect(getBaseButtonText(wrapper)).toBe(expectedText);
    });

    it('render custom locale', () => {
      const customText = 'custom text';
      const wrapper = render({
        locale: {
          UploadFileControl: {
            chooseFile: customText,
            requestErrorText: customText,
            choosedFile: customText,
            orDragHere: customText,
          },
        },
      });

      expect(getBaseButtonText(wrapper)).toBe(customText);
    });

    it('updates when langCode changes', () => {
      const wrapper = render();
      const expectedText = UploadFileControlLocaleHelper.get(LangCodes.en_GB).chooseFile;

      wrapper.setProps({ value: { langCode: LangCodes.en_GB } });

      expect(getBaseButtonText(wrapper)).toBe(expectedText);
    });
  });
});
