import { mount, ReactWrapper } from 'enzyme';
import React, { RefAttributes } from 'react';
import { act } from 'react-dom/test-utils';

import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { FileUploaderLocaleHelper } from '../locale';
import { FileUploader, FileUploaderProps, FileUploaderRef } from '../FileUploader';
import { delay } from '../../../lib/utils';
import { FileUploaderAttachedFile } from '../../../internal/FileUploaderControl/fileUtils';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { DEFAULT_THEME } from '../../../lib/theming/themes/DefaultTheme';

const renderComponent = (localeProviderValue = {}, props: FileUploaderProps = {}) =>
  mount(
    <LocaleContext.Provider value={localeProviderValue}>
      <ThemeContext.Provider value={DEFAULT_THEME}>
        <FileUploader {...props} />
      </ThemeContext.Provider>
      ,
    </LocaleContext.Provider>,
  );

const getBaseButtonLinkText = (wrapper: ReactWrapper<typeof FileUploader>): string => {
  return wrapper.find(`[data-tid='FileUploader__link']`).text();
};

const getBaseButtonContent = (wrapper: ReactWrapper<typeof FileUploader>): string => {
  return wrapper.find(`[data-tid='FileUploader__content']`).text().replace(/\s/g, ' ');
};

const getFilesList = (wrapper: ReactWrapper<typeof FileUploader>) => {
  return wrapper.find(`[data-tid='FileUploader__fileList']`);
};

const addFiles = async (component: ReactWrapper<typeof FileUploader>, files: File[]) => {
  await act(async () => {
    component.find('input').simulate('change', { target: { files } });
    // ждем отрисовки файлов
    await delay(100);
    component.update();
  });
};

const removeFile = async (component: ReactWrapper<typeof FileUploader>) => {
  await act(async () => {
    component.find(`[data-tid='FileUploader__fileIcon']`).simulate('click');
  });
};

const getFile = () => new Blob(['fileContents'], { type: 'text/plain' }) as File;

describe('FileUploader', () => {
  describe('Locale', () => {
    it('render without LocaleProvider', () => {
      const wrapper = mount(<FileUploader />);
      const expectedText = FileUploaderLocaleHelper.get(defaultLangCode).chooseFile;

      expect(getBaseButtonLinkText(wrapper)).toBe(expectedText);
    });

    it('render default locale', () => {
      const wrapper = renderComponent();
      const expectedText = FileUploaderLocaleHelper.get(defaultLangCode).chooseFile;

      expect(getBaseButtonLinkText(wrapper)).toBe(expectedText);
    });

    it('render correct locale when set langCode', () => {
      const wrapper = renderComponent({ langCode: LangCodes.en_GB });
      const expectedText = FileUploaderLocaleHelper.get(LangCodes.en_GB).chooseFile;

      expect(getBaseButtonLinkText(wrapper)).toBe(expectedText);
    });

    it('render custom locale', () => {
      const customText = 'custom text';
      const wrapper = renderComponent({
        locale: {
          FileUploader: {
            chooseFile: customText,
            requestErrorText: customText,
            choosedFile: customText,
            orDragHere: customText,
          },
        },
      });

      expect(getBaseButtonLinkText(wrapper)).toBe(customText);
    });

    it('updates when langCode changes', () => {
      const wrapper = renderComponent();
      const expectedText = FileUploaderLocaleHelper.get(LangCodes.en_GB).chooseFile;

      wrapper.setProps({ value: { langCode: LangCodes.en_GB } });

      expect(getBaseButtonLinkText(wrapper)).toBe(expectedText);
    });
  });

  describe('Handlers', () => {
    const render = (props: FileUploaderProps & RefAttributes<FileUploaderRef> = {}) =>
      mount<typeof FileUploader>(<FileUploader {...props} />);
    let file: File;

    const readFile = {
      id: expect.any(String),
      originalFile: expect.any(Blob),
      status: 'Attached',
      validationResult: { isValid: true, message: undefined },
    };

    beforeEach(() => {
      file = getFile();
    });

    describe('onAttach', () => {
      it('should handle onAttach, when select file', async () => {
        const onAttach = jest.fn();
        const component = render({ onAttach });

        await addFiles(component, [file]);

        expect(onAttach).toHaveBeenCalledTimes(1);
        expect(onAttach).toHaveBeenCalledWith([readFile]);
      });

      it('should handle onAttach, when all files aren"t valid', async () => {
        const onAttach = jest.fn();
        const component = render({
          onAttach,
          validateBeforeUpload: () => Promise.resolve('validation error'),
          multiple: true,
        });

        await addFiles(component, [file, file]);

        expect(onAttach).toHaveBeenCalledTimes(1);
        expect(onAttach).toHaveBeenCalledWith([readFile, readFile]);
      });

      it('should handle onAttach by one, when add files by one', async () => {
        const onAttach = jest.fn();
        const component = render({ onAttach });

        await addFiles(component, [file]);

        expect(onAttach).toHaveBeenCalledTimes(1);
        expect(onAttach).toHaveBeenCalledWith([readFile]);

        await addFiles(component, [file]);

        expect(onAttach).toHaveBeenCalledTimes(2);
        expect(onAttach).toHaveBeenCalledWith([readFile]);
      });
    });

    describe('onRemove', () => {
      it('should handle onRemove, when click delete button', async () => {
        const onRemove = jest.fn();
        const component = render({ onRemove, multiple: true });

        await addFiles(component, [file]);
        await removeFile(component);

        expect(onRemove).toHaveBeenCalledTimes(1);
      });

      it('should handle onRemove, when reselect file in single control', async () => {
        const onRemove = jest.fn();
        const component = render({ onRemove });

        await addFiles(component, [file]);
        await addFiles(component, [file]);

        expect(onRemove).toHaveBeenCalledTimes(1);
      });
    });

    describe('onValueChange', () => {
      it('should handle onValueChange with current files when select files', async () => {
        const onValueChange = jest.fn();
        const component = render({ onValueChange });

        await addFiles(component, [file]);

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith([readFile]);
      });

      it('should handle onValueChange with empty array when remove last file', async () => {
        const onValueChange = jest.fn();
        const component = render({ onValueChange });

        await addFiles(component, [file]);

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith([readFile]);

        await removeFile(component);

        expect(onValueChange).toHaveBeenCalledTimes(2);
        expect(onValueChange).toHaveBeenCalledWith([]);
      });

      it('should handle onValueChange with all attached files for multiple control', async () => {
        const onValueChange = jest.fn();
        const component = render({ onValueChange, multiple: true });

        await addFiles(component, [file]);

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith([readFile]);

        await addFiles(component, [file]);

        expect(onValueChange).toHaveBeenCalledTimes(2);
        expect(onValueChange).toHaveBeenCalledWith([readFile, readFile]);
      });

      it('should handle onValueChange 2 times after second add for single control', async () => {
        const onValueChange = jest.fn();
        const onRemove = jest.fn();
        const component = render({ onValueChange, onRemove });

        await addFiles(component, [file]);

        expect(onRemove).toHaveBeenCalledTimes(0);
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith([readFile]);

        await addFiles(component, [file]);

        expect(onRemove).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledTimes(2);
        expect(onValueChange).toHaveBeenCalledWith([readFile]);
      });

      it('should handle onValueChange after status changing', async () => {
        const onValueChange = jest.fn();
        const request = jest.fn(() => Promise.resolve());
        const component = render({ onValueChange, request });

        await addFiles(component, [file]);

        expect(onValueChange).toHaveBeenCalledTimes(2);
      });

      it('should handle onValueChange after file validation changing', async () => {
        const onValueChange = jest.fn();
        const validateBeforeUpload = () => Promise.resolve('validation error');
        const component = render({ onValueChange, validateBeforeUpload });

        await addFiles(component, [file]);

        expect(onValueChange).toHaveBeenCalledTimes(2);
      });

      it('should handle onValueChange after reset', async () => {
        const onValueChange = jest.fn();
        const ref = React.createRef<FileUploaderRef>();
        const component = render({ onValueChange, ref });

        await addFiles(component, [file]);

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith([readFile]);

        ref.current?.reset();
        await delay(100);

        expect(onValueChange).toHaveBeenCalledTimes(2);
        expect(onValueChange).toHaveBeenCalledWith([]);
      });
    });

    describe('request, onRequestSuccess, onRequestError', () => {
      let request: (file: FileUploaderAttachedFile) => Promise<void>;
      let onRequestSuccess: () => void;
      let onRequestError: () => void;
      let component: ReactWrapper<typeof FileUploader>;

      beforeEach(() => {
        request = jest.fn(() => Promise.resolve());
        onRequestSuccess = jest.fn();
        onRequestError = jest.fn();
        component = render({ request, onRequestSuccess, onRequestError });
      });

      it('should handle request and onRequestSuccess after selection of valid file', async () => {
        await addFiles(component, [file]);

        expect(request).toHaveBeenCalledTimes(1);
        expect(request).toHaveBeenCalledWith(readFile);
        expect(onRequestSuccess).toHaveBeenCalledTimes(1);
        expect(onRequestSuccess).toHaveBeenCalledWith(expect.any(String));
        expect(onRequestError).toHaveBeenCalledTimes(0);
      });

      it('should handle one request for one valid and one invalid files', async () => {
        let count = 0;
        const validateBeforeUpload = () => {
          count++;
          const result = count % 2 === 0 ? null : 'Ошибка';
          return Promise.resolve(result);
        };
        component = render({ request, onRequestSuccess, onRequestError, validateBeforeUpload, multiple: true });

        await addFiles(component, [file, file]);

        expect(request).toHaveBeenCalledTimes(1);
        expect(request).toHaveBeenCalledWith(readFile);
        expect(onRequestSuccess).toHaveBeenCalledTimes(1);
        expect(onRequestSuccess).toHaveBeenCalledWith(expect.any(String));
        expect(onRequestError).toHaveBeenCalledTimes(0);
      });

      it('shouldn"t handle request after selection of invalid file', async () => {
        component = render({
          request,
          onRequestSuccess,
          onRequestError,
          validateBeforeUpload: () => Promise.resolve('ERROR'),
        });

        await addFiles(component, [file]);

        expect(request).toHaveBeenCalledTimes(0);
        expect(onRequestSuccess).toHaveBeenCalledTimes(0);
        expect(onRequestError).toHaveBeenCalledTimes(0);
      });

      it('should handle request and onRequestError after file selection and throw error on upload file', async () => {
        request = jest.fn(() => Promise.reject());
        component = render({ request, onRequestSuccess, onRequestError });

        await addFiles(component, [file]);

        expect(request).toHaveBeenCalledTimes(1);
        expect(onRequestSuccess).toHaveBeenCalledTimes(0);
        expect(onRequestError).toHaveBeenCalledTimes(1);
        expect(onRequestError).toHaveBeenCalledWith(expect.any(String));
      });
    });

    describe('validateBeforeUpload', () => {
      it('should handle validateBeforeUpload for every files', async () => {
        const request = jest.fn(() => Promise.resolve());
        const validateBeforeUpload = jest.fn(() => Promise.resolve(null));
        const component = render({ request, validateBeforeUpload, multiple: true });

        await addFiles(component, [file, file]);

        expect(validateBeforeUpload).toHaveBeenCalledTimes(2);
        expect(request).toHaveBeenCalledTimes(2);
      });

      it('should handle validateBeforeUpload before request', async () => {
        let count = 1;
        let requestOrder = 0;
        let validationOrder = 0;
        const increment = () => count++;

        const request = jest.fn(() => {
          requestOrder = increment();
          return Promise.resolve();
        });
        const validateBeforeUpload = jest.fn(() => {
          validationOrder = increment();
          return Promise.resolve(null);
        });
        const component = render({ request, validateBeforeUpload });

        await addFiles(component, [file]);

        expect(validateBeforeUpload).toHaveBeenCalledTimes(1);
        expect(request).toHaveBeenCalledTimes(1);
        expect(validationOrder).toBeLessThan(requestOrder);
      });
    });

    it('should handle one request, validateBeforeUpload, onAttach, onValueChange for single control, if try add several files', async () => {
      const request = jest.fn();
      const validateBeforeUpload = jest.fn();
      const onAttach = jest.fn();
      const onValueChange = jest.fn();
      const component = render({ request, validateBeforeUpload, onAttach, onValueChange });

      await addFiles(component, [file, file, file]);

      expect(request).toHaveBeenCalledTimes(1);
      expect(validateBeforeUpload).toHaveBeenCalledTimes(1);

      expect(onAttach).toHaveBeenCalledTimes(1);
      expect(onAttach).toHaveBeenCalledWith([readFile]);

      expect(onValueChange).toHaveBeenCalledTimes(3);
      expect(onValueChange).toHaveBeenCalledWith([readFile]);
    });
  });

  describe('hideFiles', () => {
    const expectation = async (wrapper: ReactWrapper<typeof FileUploader>) => {
      const locale = FileUploaderLocaleHelper.get(defaultLangCode);
      const { chooseFile, orDragHere } = locale;
      const expectedText = `${chooseFile} ${orDragHere} `;

      expect(getBaseButtonContent(wrapper)).toBe(expectedText);

      await addFiles(wrapper, [getFile(), getFile()]);

      expect(getFilesList(wrapper).length).toBe(0);
      expect(getBaseButtonContent(wrapper)).toBe(expectedText);
    };

    it('shouldn"t render files for multiple control', async () => {
      const wrapper = mount(<FileUploader multiple hideFiles />);
      await expectation(wrapper);
    });

    it('shouldn"t render file for single control', async () => {
      const wrapper = mount(<FileUploader hideFiles />);
      await expectation(wrapper);
    });
  });

  describe('renderFile', () => {
    it('should render custom file item control', async () => {
      const wrapper = mount(<FileUploader multiple renderFile={() => 'Custom file item'} />);

      await addFiles(wrapper, [getFile()]);

      expect(getFilesList(wrapper).text()).toBe('Custom file item');
    });
  });
});
