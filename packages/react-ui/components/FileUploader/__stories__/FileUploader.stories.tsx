import React from 'react';

import { FileUploader } from '../FileUploader';

export default {
  title: 'FileUploader',
  decorators: [(storyFn: () => JSX.Element) => <div style={{ padding: '10px' }}>{storyFn()}</div>],
};

const loadingRequest = () => Promise.resolve();

const successRequest = () =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

const errorRequest = () =>
  new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      reject();
    }, 2000);
  });

export const SingleFileUploader = () => <FileUploader request={successRequest} />;

export const SingleFileUploaderWithFileError = () => (
  <FileUploader request={successRequest} getFileValidationText={() => Promise.resolve('Формат файла неверный')} />
);

export const MultipleFileUploader = () => <FileUploader multiple request={successRequest} />;

export const MultipleFileUploaderWithLoading = () => <FileUploader multiple request={loadingRequest} />;

export const MultipleFileUploaderWithErrorRequest = () => <FileUploader multiple request={errorRequest} />;

export const MultipleFileUploaderWithControlError = () => (
  <FileUploader multiple controlError={'Файлов должно быть меньше 2'} request={loadingRequest} />
);

export const MultipleFileUploaderWithFileError = () => (
  <FileUploader
    multiple
    request={successRequest}
    getFileValidationText={() => Promise.resolve('Формат файла неверный')}
  />
);

export const FileUploaderDisabled = () => <FileUploader request={successRequest} disabled />;
