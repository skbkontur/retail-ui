import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { FileUploaderLocaleHelper } from '../locale';
import { Link } from '../../../components/Link';
import { FileUploader, IFileUploaderProps } from '../FileUploader';
import { FileReaderMock } from '../../__mocks__/FileReaderMock';
import { delay } from '../../../lib/utils';
import { IUploadFile } from '../../../lib/fileUtils';

const renderComponent = (localeProviderValue = {}, props: IFileUploaderProps = {}) =>
  mount(
    <LocaleContext.Provider value={localeProviderValue}>
      <FileUploader {...props} />
    </LocaleContext.Provider>,
  );

const getBaseButtonText = (wrapper: ReactWrapper): string => {
  return wrapper.find(Link).text();
};

const addFiles = async (component: ReactWrapper, files: File[]) => {
  await act(async () => {
    component.find('input').simulate('change', {target: {files}});
  });
  // ждем отрисовки файлов
  await delay(100);
  component.update();
};

const removeFile = async (component: ReactWrapper) => {
  await act(async () => {
    component.find(`[data-tid='Icon']`).simulate('click');
  });
};

describe('FileUploader', () => {
  describe('Locale', () => {

    it('render without LocaleProvider', () => {
      const wrapper = mount(<FileUploader />);
      const expectedText = FileUploaderLocaleHelper.get(defaultLangCode).chooseFile;

      expect(getBaseButtonText(wrapper)).toBe(expectedText);
    });

    it('render default locale', () => {
      const wrapper = renderComponent();
      const expectedText = FileUploaderLocaleHelper.get(defaultLangCode).chooseFile;

      expect(getBaseButtonText(wrapper)).toBe(expectedText);
    });

    it('render correct locale when set langCode', () => {
      const wrapper = renderComponent({ langCode: LangCodes.en_GB });
      const expectedText = FileUploaderLocaleHelper.get(LangCodes.en_GB).chooseFile;

      expect(getBaseButtonText(wrapper)).toBe(expectedText);
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

      expect(getBaseButtonText(wrapper)).toBe(customText);
    });

    it('updates when langCode changes', () => {
      const wrapper = renderComponent();
      const expectedText = FileUploaderLocaleHelper.get(LangCodes.en_GB).chooseFile;

      wrapper.setProps({ value: { langCode: LangCodes.en_GB } });

      expect(getBaseButtonText(wrapper)).toBe(expectedText);
    });
  });

  describe('Handlers', () => {
    const render = (props: IFileUploaderProps = {}) => mount(<FileUploader {...props} />);
    let file: File;

    const readFile = {
      fileInBase64: expect.any(String),
      id: expect.any(String),
      originalFile: {name: ""},
      status: "Attached",
      validationResult: {isValid: true, message: undefined}
    };

    const errorReadFile = {...readFile, fileInBase64: null};

    beforeEach(() => {
      file = new Blob(['fileContents'], {type : 'text/plain'}) as File;
    });
    describe('onReadError', () => {
      it('should handle onReadError, when has error in file reading', async () => {
        FileReaderMock.errorMock();

        const onReadError = jest.fn();
        const component = render({onReadError});

        await addFiles(component, [file]);

        expect(onReadError).toHaveBeenCalledTimes(1);
        expect(onReadError).toHaveBeenCalledWith([errorReadFile]);

        FileReaderMock.resetMock();
      });

      it('shouldn"t handle onReadError, when file"s reading is correct', async () => {
        const onReadError = jest.fn();
        const component = render({onReadError});

        await addFiles(component, [file]);

        expect(onReadError).toHaveBeenCalledTimes(0);
      });
    });

    describe('onSelect', () => {
      it('should handle onSelect, when select file', async () => {
        const onSelect = jest.fn();
        const component = render({onSelect});

        await addFiles(component, [file]);

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith([readFile]);
      });

      it('shouldn handle onSelect, when all files aren"t valid', async () => {
        const onSelect = jest.fn();
        const component = render({onSelect, getFileValidationText: () => Promise.resolve('validation error'), multiple: true});

        await addFiles(component, [file, file]);

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith([readFile, readFile]);
      });

      it('shouldn"t handle onSelect, when has problem with file reading', async () => {
        FileReaderMock.errorMock();

        const onSelect = jest.fn();
        const component = render({onSelect});

        await addFiles(component, [file]);

        expect(onSelect).toHaveBeenCalledTimes(0);

        FileReaderMock.resetMock();
      });
    });

    describe('onRemove', () => {
      it('should handle onRemove, when click delete button', async () => {
        const onRemove = jest.fn();
        const component = render({onRemove, multiple: true});

        await addFiles(component, [file]);
        await removeFile(component);

        expect(onRemove).toHaveBeenCalledTimes(1);
      });

      it('should handle onRemove, when reselect file in single control', async () => {
        const onRemove = jest.fn();
        const component = render({onRemove});

        await addFiles(component, [file]);
        await addFiles(component, [file]);

        expect(onRemove).toHaveBeenCalledTimes(1);
      });
    });

    describe('onValueChange', () => {
      it('should handle onValueChange with current files when select files', async () => {
        const onValueChange = jest.fn();
        const component = render({onValueChange});

        await addFiles(component, [file]);

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith([readFile]);
      });

      it('should handle onValueChange with empty array when remove last file', async () => {
        const onValueChange = jest.fn();
        const component = render({onValueChange});

        await addFiles(component, [file]);

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith([readFile]);

        await removeFile(component);

        expect(onValueChange).toHaveBeenCalledTimes(2);
        expect(onValueChange).toHaveBeenCalledWith([]);
      });
    });

    describe('request, onRequestSuccess, onRequestError', () => {
      let request: (file: IUploadFile) => Promise<void>;
      let onRequestSuccess: () => void;
      let onRequestError: () => void;
      let component: ReactWrapper;

      beforeEach(() => {
        request = jest.fn(() => Promise.resolve());
        onRequestSuccess = jest.fn();
        onRequestError = jest.fn();
        component = render({request, onRequestSuccess, onRequestError});
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
        const getFileValidationText = () => {
          count++;
          const result = count % 2 === 0 ? null : "Ошибка";
          return Promise.resolve(result);
        };
        component = render({request, onRequestSuccess, onRequestError, getFileValidationText, multiple: true});

        await addFiles(component, [file, file]);

        expect(request).toHaveBeenCalledTimes(1);
        expect(request).toHaveBeenCalledWith(readFile);
        expect(onRequestSuccess).toHaveBeenCalledTimes(1);
        expect(onRequestSuccess).toHaveBeenCalledWith(expect.any(String));
        expect(onRequestError).toHaveBeenCalledTimes(0);
      });

      it('shouldn"t handle request after selection of invalid file', async () => {
        component = render({request, onRequestSuccess, onRequestError, getFileValidationText: () => Promise.resolve("ERROR")});

        await addFiles(component, [file]);

        expect(request).toHaveBeenCalledTimes(0);
        expect(onRequestSuccess).toHaveBeenCalledTimes(0);
        expect(onRequestError).toHaveBeenCalledTimes(0);
      });

      it('should handle request and onRequestError after file selection and throw error on upload file', async () => {
        request = jest.fn(() => Promise.reject());
        component = render({request, onRequestSuccess, onRequestError});

        await addFiles(component, [file]);

        expect(request).toHaveBeenCalledTimes(1);
        expect(onRequestSuccess).toHaveBeenCalledTimes(0);
        expect(onRequestError).toHaveBeenCalledTimes(1);
        expect(onRequestError).toHaveBeenCalledWith(expect.any(String));
      });
    });

    describe('getFileValidationText', () => {
      it('should handle getFileValidationText for every files', async () => {
        const request = jest.fn(() => Promise.resolve());
        const getFileValidationText = jest.fn(() => Promise.resolve(null));
        const component = render({request, getFileValidationText, multiple: true});

        await addFiles(component, [file, file]);

        expect(getFileValidationText).toHaveBeenCalledTimes(2);
        expect(request).toHaveBeenCalledTimes(2);
      });

      it('should handle getFileValidationText before request', async () => {
        let count = 1;
        let requestOrder = 0;
        let validationOrder = 0;
        const increment = () => count++;

        const request = jest.fn(() => {
          requestOrder = increment();
          return Promise.resolve();
        });
        const getFileValidationText = jest.fn(() => {
          validationOrder = increment();
          return Promise.resolve(null);
        });
        const component = render({request, getFileValidationText});

        await addFiles(component, [file]);

        expect(getFileValidationText).toHaveBeenCalledTimes(1);
        expect(request).toHaveBeenCalledTimes(1);
        expect(validationOrder).toBeLessThan(requestOrder);
      });
    });

    it('should handle one request, getFileValidationText, onSelect, onValueChange for single control, if try add several files', async () => {
      const request = jest.fn();
      const getFileValidationText = jest.fn();
      const onSelect = jest.fn();
      const onValueChange = jest.fn();
      const component = render({request, getFileValidationText, onSelect, onValueChange});

      await addFiles(component, [file, file, file]);

      expect(request).toHaveBeenCalledTimes(1);
      expect(getFileValidationText).toHaveBeenCalledTimes(1);
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onValueChange).toHaveBeenCalledTimes(1);
    });

  });
});
