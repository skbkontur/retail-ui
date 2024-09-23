import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { FileUploaderLocaleHelper } from '../locale';
import { FileUploader, FileUploaderDataTids, FileUploaderProps, FileUploaderRef } from '../FileUploader';
import { delay } from '../../../lib/utils';
import { FileUploaderAttachedFile } from '../../../internal/FileUploaderControl/fileUtils';
import { FileUploaderFileDataTids } from '../../../internal/FileUploaderControl/FileUploaderFile/FileUploaderFile';
import { FileUploaderFileDataTids as FileUploaderFileListDataTids } from '../../../internal/FileUploaderControl/FileUploaderFileList/FileUploaderFileList';

const renderComponent = (localeProviderValue = {}, props: FileUploaderProps = {}) =>
  render(
    <LocaleContext.Provider value={localeProviderValue}>
      <FileUploader {...props} />
    </LocaleContext.Provider>,
  );

const getBaseButtonContent = (): string | undefined => {
  const content = screen.getByTestId(FileUploaderDataTids.content).textContent?.replace(/\s/g, ' ');
  return content;
};

const getFilesList = () => {
  return screen.queryByTestId(FileUploaderFileListDataTids.fileList);
};

const addFiles = async (files: File[]) => {
  await act(async () => {
    const input = screen.getByTestId(FileUploaderDataTids.input);
    if (input !== null) {
      fireEvent.change(input, { target: { files } });
    }
    // ждем отрисовки файлов
    await delay(100);
  });
};

const removeFile = async (filename?: string) => {
  await act(async () => {
    if (filename) {
      const element = screen
        .getByText(filename)
        .closest(`[data-tid="${FileUploaderFileDataTids.file}"]`) as HTMLElement;
      const removeIcon = within(element).getByTestId(FileUploaderFileDataTids.fileIcon);
      await userEvent.click(removeIcon);
    } else {
      await userEvent.click(screen.getByTestId(FileUploaderFileDataTids.fileIcon));
    }
  });
};

const getFile = () => new Blob(['fileContents'], { type: 'text/plain' }) as File;

function createFile(filename: string, content = 'content'): File {
  return new File([content], filename, { type: 'text/plain' });
}

describe('FileUploader', () => {
  const originalDT = global.DataTransfer;
  const originalFiles = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'files');

  beforeAll(() => {
    //@ts-ignore
    global.DataTransfer = class DataTransfer {
      constructor() {
        //@ts-ignore
        this.items = new Set();
        //@ts-ignore
        this.files = this.items;
      }
    };
  });

  beforeEach(() =>
    Object.defineProperty(HTMLInputElement.prototype, 'files', {
      writable: true,
      value: [],
    }),
  );

  afterAll(() => {
    global.DataTransfer = originalDT;
    Object.defineProperty(HTMLInputElement.prototype, 'files', originalFiles as DataTransfer['files']);
  });

  describe('Locale', () => {
    it('render without LocaleProvider', () => {
      render(<FileUploader />);
      const expectedText = FileUploaderLocaleHelper.get(defaultLangCode).chooseFile;

      expect(screen.getByTestId(FileUploaderDataTids.link)).toHaveTextContent(expectedText);
    });

    it('render default locale', () => {
      renderComponent();
      const expectedText = FileUploaderLocaleHelper.get(defaultLangCode).chooseFile;

      expect(screen.getByTestId(FileUploaderDataTids.link)).toHaveTextContent(expectedText);
    });

    it('render correct locale when set langCode', () => {
      renderComponent({ langCode: LangCodes.en_GB });
      const expectedText = FileUploaderLocaleHelper.get(LangCodes.en_GB).chooseFile;

      expect(screen.getByTestId(FileUploaderDataTids.link)).toHaveTextContent(expectedText);
    });

    it('render custom locale', () => {
      const customText = 'custom text';
      renderComponent({
        locale: {
          FileUploader: {
            chooseFile: customText,
            requestErrorText: customText,
            choosedFile: customText,
            orDragHere: customText,
          },
        },
      });

      expect(screen.getByTestId(FileUploaderDataTids.link)).toHaveTextContent(customText);
    });

    it('updates when langCode changes', () => {
      const expectedText = FileUploaderLocaleHelper.get(LangCodes.en_GB).chooseFile;

      const { rerender } = render(
        <LocaleContext.Provider value={{}}>
          <FileUploader />
        </LocaleContext.Provider>,
      );

      rerender(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <FileUploader />
        </LocaleContext.Provider>,
      );

      expect(screen.getByTestId(FileUploaderDataTids.link)).toHaveTextContent(expectedText);
    });
  });

  describe('Handlers', () => {
    const renderComp = (props: FileUploaderProps) => render(<FileUploader {...props} />);
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

    describe('onFocus', () => {
      it('should handle onFocus, when element focuses by tab', async () => {
        const onFocus = jest.fn();
        renderComp({ onFocus });

        await userEvent.tab();
        const input = screen.getByTestId(FileUploaderDataTids.input);
        expect(input).toHaveFocus();
        expect(onFocus).toHaveBeenCalledTimes(1);
      });

      it('should not handle focus if element is disabled', async () => {
        const onFocus = jest.fn();
        renderComp({ onFocus, disabled: true });

        await userEvent.tab();
        const input = screen.getByTestId(FileUploaderDataTids.input);

        expect(input).not.toHaveFocus();
        expect(onFocus).not.toHaveBeenCalled();
      });
    });

    describe('onBlur', () => {
      it('should handle onFocus, when element focuses by tab', async () => {
        const onBlur = jest.fn();
        renderComp({ onBlur });

        await userEvent.tab();
        const input = screen.getByTestId(FileUploaderDataTids.input);
        expect(input).toHaveFocus();
        if (input !== null) {
          fireEvent.blur(input);
        }
        expect(onBlur).toHaveBeenCalledTimes(1);
      });
    });

    describe('onAttach', () => {
      it('should handle onAttach, when select file', async () => {
        const onAttach = jest.fn();
        renderComp({ onAttach });

        await addFiles([file]);

        expect(onAttach).toHaveBeenCalledTimes(1);
        expect(onAttach).toHaveBeenCalledWith([readFile]);
      });

      it('should handle onAttach, when all files aren"t valid', async () => {
        const onAttach = jest.fn();
        renderComp({
          onAttach,
          validateBeforeUpload: () => Promise.resolve('validation error'),
          multiple: true,
        });

        await addFiles([file, file]);

        expect(onAttach).toHaveBeenCalledTimes(1);
        expect(onAttach).toHaveBeenCalledWith([readFile, readFile]);
      });

      it('should handle onAttach by one, when add files by one', async () => {
        const onAttach = jest.fn();
        renderComp({ onAttach });

        await addFiles([file]);

        expect(onAttach).toHaveBeenCalledTimes(1);
        expect(onAttach).toHaveBeenCalledWith([readFile]);

        await addFiles([file]);

        expect(onAttach).toHaveBeenCalledTimes(2);
        expect(onAttach).toHaveBeenCalledWith([readFile]);
      });
    });

    describe('onRemove', () => {
      it('should handle onRemove, when click delete button', async () => {
        const onRemove = jest.fn();
        renderComp({ onRemove, multiple: true });

        await addFiles([file]);
        await removeFile();

        expect(onRemove).toHaveBeenCalledTimes(1);
      });

      it('should handle onRemove, when reselect file in single control', async () => {
        const onRemove = jest.fn();
        renderComp({ onRemove });

        await addFiles([file]);
        await addFiles([file]);

        expect(onRemove).toHaveBeenCalledTimes(1);
      });
    });

    describe('onValueChange', () => {
      it('should handle onValueChange with current files when select files', async () => {
        const onValueChange = jest.fn();
        renderComp({ onValueChange });

        await addFiles([file]);

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith([readFile]);
      });

      it('should handle onValueChange with empty array when remove last file', async () => {
        const onValueChange = jest.fn();
        renderComp({ onValueChange });

        await addFiles([file]);

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith([readFile]);

        await removeFile();

        expect(onValueChange).toHaveBeenCalledTimes(2);
        expect(onValueChange).toHaveBeenCalledWith([]);
      });

      it('should handle onValueChange with all attached files for multiple control', async () => {
        const onValueChange = jest.fn();
        renderComp({ onValueChange, multiple: true });

        await addFiles([file]);

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith([readFile]);

        await addFiles([file]);

        expect(onValueChange).toHaveBeenCalledTimes(2);
        expect(onValueChange).toHaveBeenCalledWith([readFile, readFile]);
      });

      it('should handle onValueChange 2 times after second add for single control', async () => {
        const onValueChange = jest.fn();
        const onRemove = jest.fn();
        renderComp({ onValueChange, onRemove });

        await addFiles([file]);

        expect(onRemove).toHaveBeenCalledTimes(0);
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith([readFile]);

        await addFiles([file]);

        expect(onRemove).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledTimes(2);
        expect(onValueChange).toHaveBeenCalledWith([readFile]);
      });

      it('should handle onValueChange after status changing', async () => {
        const onValueChange = jest.fn();
        const request = jest.fn(() => Promise.resolve());
        renderComp({ onValueChange, request });

        await addFiles([file]);

        expect(onValueChange).toHaveBeenCalledTimes(2);
      });

      it('should handle onValueChange after file validation changing', async () => {
        const onValueChange = jest.fn();
        const validateBeforeUpload = () => Promise.resolve('validation error');
        renderComp({ onValueChange, validateBeforeUpload });

        await addFiles([file]);

        expect(onValueChange).toHaveBeenCalledTimes(2);
      });

      it('should handle onValueChange after reset', async () => {
        const onValueChange = jest.fn();
        const ref = React.createRef<FileUploaderRef>();
        render(<FileUploader onValueChange={onValueChange} ref={ref} />);

        await addFiles([file]);

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

      beforeEach(() => {
        request = jest.fn(() => Promise.resolve());
        onRequestSuccess = jest.fn();
        onRequestError = jest.fn();
      });

      it('should handle request and onRequestSuccess after selection of valid file', async () => {
        renderComp({ request, onRequestSuccess, onRequestError });

        await addFiles([file]);

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
        renderComp({
          request,
          onRequestSuccess,
          onRequestError,
          validateBeforeUpload,
          multiple: true,
        });

        await addFiles([file, file]);

        expect(request).toHaveBeenCalledTimes(1);
        expect(request).toHaveBeenCalledWith(readFile);
        expect(onRequestSuccess).toHaveBeenCalledTimes(1);
        expect(onRequestSuccess).toHaveBeenCalledWith(expect.any(String));
        expect(onRequestError).toHaveBeenCalledTimes(0);
      });

      it('shouldn"t handle request after selection of invalid file', async () => {
        renderComp({
          request,
          onRequestSuccess,
          onRequestError,
          validateBeforeUpload: () => Promise.resolve('ERROR'),
        });

        await addFiles([file]);

        expect(request).toHaveBeenCalledTimes(0);
        expect(onRequestSuccess).toHaveBeenCalledTimes(0);
        expect(onRequestError).toHaveBeenCalledTimes(0);
      });

      it('should handle request and onRequestError after file selection and throw error on upload file', async () => {
        request = jest.fn(() => Promise.reject());
        renderComp({ request, onRequestSuccess, onRequestError });

        await addFiles([file]);

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
        renderComp({ request, validateBeforeUpload, multiple: true });

        await addFiles([file, file]);

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
        renderComp({ request, validateBeforeUpload });

        await addFiles([file]);

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
      renderComp({ request, validateBeforeUpload, onAttach, onValueChange });

      await addFiles([file, file, file]);

      expect(request).toHaveBeenCalledTimes(1);
      expect(validateBeforeUpload).toHaveBeenCalledTimes(1);

      expect(onAttach).toHaveBeenCalledTimes(1);
      expect(onAttach).toHaveBeenCalledWith([readFile]);

      expect(onValueChange).toHaveBeenCalledTimes(3);
      expect(onValueChange).toHaveBeenCalledWith([readFile]);
    });
  });

  describe('hideFiles', () => {
    const expectation = async () => {
      const locale = FileUploaderLocaleHelper.get(defaultLangCode);
      const { chooseFile, orDragHere } = locale;
      const expectedText = `${chooseFile} ${orDragHere} `;

      expect(getBaseButtonContent()).toBe(expectedText);

      await addFiles([getFile(), getFile()]);

      expect(getFilesList()).not.toBeInTheDocument();
      expect(getBaseButtonContent()).toBe(expectedText);
    };

    it('shouldn"t render files for multiple control', async () => {
      render(<FileUploader multiple hideFiles />);
      await expectation();
    });

    it('shouldn"t render file for single control', async () => {
      render(<FileUploader hideFiles />);
      await expectation();
    });
  });

  describe('renderFile', () => {
    it('should render custom file item control', async () => {
      render(<FileUploader multiple renderFile={() => 'Custom file item'} />);

      await addFiles([getFile()]);

      expect(getFilesList()).toHaveTextContent('Custom file item');
    });
  });

  describe('rootNode', () => {
    it('getRootNode is defined', () => {
      const ref = React.createRef<FileUploaderRef>();
      render(<FileUploader ref={ref} />);

      expect(ref.current?.getRootNode).toBeDefined();
    });

    it('getRootNode returns correct node', () => {
      const ref = React.createRef<FileUploaderRef>();
      render(<FileUploader ref={ref} />);

      const rootNode = ref.current?.getRootNode?.();
      expect(rootNode).toBeInTheDocument();
      expect(rootNode).toBe(screen.getByTestId(FileUploaderDataTids.root));
    });
  });

  describe('initialFiles', () => {
    describe('single mode', () => {
      it('should remove file', async () => {
        render(<FileUploader multiple={false} initialFiles={[createFile('test.txt')]} />);
        expect(screen.getByText('test.txt')).toBeInTheDocument();
        await removeFile('test.txt');
        expect(screen.queryByText('test.txt')).not.toBeInTheDocument();
        screen.debug();
      });

      it('should render one initialFile when many files', () => {
        render(<FileUploader multiple={false} initialFiles={[createFile('test.txt'), createFile('test2.txt')]} />);

        expect(screen.getByText('test.txt')).toBeInTheDocument();
        expect(screen.queryByText('test2.txt')).not.toBeInTheDocument();
      });
    });

    describe('multiple mode', () => {
      it('should remove multiple files', async () => {
        render(<FileUploader multiple initialFiles={[createFile('test.txt'), createFile('test2.txt')]} />);

        expect(screen.getByText('test.txt')).toBeInTheDocument();
        expect(screen.getByText('test2.txt')).toBeInTheDocument();

        await removeFile('test.txt');
        expect(screen.queryByText('test.txt')).not.toBeInTheDocument();
        expect(screen.getByText('test2.txt')).toBeInTheDocument();

        await removeFile('test2.txt');
        expect(screen.queryByText('test.txt')).not.toBeInTheDocument();
      });
    });
  });
});
