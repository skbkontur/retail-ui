import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { FileAttacherProps } from '../../../components/FileAttacher/FileAttacher';
import { FileAttacherBaseLocaleHelper } from '../locale';
import { Link } from '../../../components/Link';
import { FileAttacherBase } from '../FileAttacherBase';
import { withUploadFilesProvider } from '../UploadFilesProvider';

const WrappedFileAttacherBase = withUploadFilesProvider(FileAttacherBase);

const render = (localeProviderValue = {}, props: FileAttacherProps = {}) => mount(
  <LocaleContext.Provider value={localeProviderValue}>
    <WrappedFileAttacherBase {...props} />
  </LocaleContext.Provider>
);

const getBaseButtonText = (wrapper: ReactWrapper): string => {
  return wrapper.find(Link).text();
};

describe('FileAttacherBase', () => {
  describe('Locale', () => {
    it('render without LocaleProvider', () => {
      const wrapper = mount(<WrappedFileAttacherBase />);
      const expectedText = FileAttacherBaseLocaleHelper.get(defaultLangCode).chooseFile;

      expect(getBaseButtonText(wrapper)).toBe(expectedText);
    });

    it('render default locale', () => {
      const wrapper = render();
      const expectedText = FileAttacherBaseLocaleHelper.get(defaultLangCode).chooseFile;

      expect(getBaseButtonText(wrapper)).toBe(expectedText);
    });

    it('render correct locale when set langCode', () => {
      const wrapper = render({ langCode: LangCodes.en_GB });
      const expectedText = FileAttacherBaseLocaleHelper.get(LangCodes.en_GB).chooseFile;

      expect(getBaseButtonText(wrapper)).toBe(expectedText);
    });

    it('render custom locale', () => {
      const customText = 'custom text';
      const wrapper = render({
        locale: {
          FileAttacherBase: {
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
      const expectedText = FileAttacherBaseLocaleHelper.get(LangCodes.en_GB).chooseFile;

      wrapper.setProps({ value: { langCode: LangCodes.en_GB } });

      expect(getBaseButtonText(wrapper)).toBe(expectedText);
    });
  });
});
