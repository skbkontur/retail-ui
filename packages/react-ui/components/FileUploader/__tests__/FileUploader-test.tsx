import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { FileUploaderLocaleHelper } from '../locale';
import { Link } from '../../../components/Link';
import { withFileUploaderControlProvider } from '../../../internal/FileUploaderControl/FileUploaderControlProvider';
import { FileUploader } from '../FileUploader';
import { _IFileUploaderProps } from '../_FileUploader';

const WrappedFileUploader = withFileUploaderControlProvider(FileUploader);

const render = (localeProviderValue = {}, props: _IFileUploaderProps = {}) =>
  mount(
    <LocaleContext.Provider value={localeProviderValue}>
      <WrappedFileUploader {...props} />
    </LocaleContext.Provider>,
  );

const getBaseButtonText = (wrapper: ReactWrapper): string => {
  return wrapper.find(Link).text();
};

// FIXME @mozalov: тесты

describe('FileUploader', () => {
  describe('Locale', () => {
    it('render without LocaleProvider', () => {
      const wrapper = mount(<WrappedFileUploader />);
      const expectedText = FileUploaderLocaleHelper.get(defaultLangCode).chooseFile;

      expect(getBaseButtonText(wrapper)).toBe(expectedText);
    });

    it('render default locale', () => {
      const wrapper = render();
      const expectedText = FileUploaderLocaleHelper.get(defaultLangCode).chooseFile;

      expect(getBaseButtonText(wrapper)).toBe(expectedText);
    });

    it('render correct locale when set langCode', () => {
      const wrapper = render({ langCode: LangCodes.en_GB });
      const expectedText = FileUploaderLocaleHelper.get(LangCodes.en_GB).chooseFile;

      expect(getBaseButtonText(wrapper)).toBe(expectedText);
    });

    it('render custom locale', () => {
      const customText = 'custom text';
      const wrapper = render({
        locale: {
          FileUploader: {
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
      const expectedText = FileUploaderLocaleHelper.get(LangCodes.en_GB).chooseFile;

      wrapper.setProps({ value: { langCode: LangCodes.en_GB } });

      expect(getBaseButtonText(wrapper)).toBe(expectedText);
    });
  });
});
