import React from 'react';

import { FileUploader } from '../FileUploader';

export default {
  title: 'FileUploader',
  decorators: [(storyFn: () => JSX.Element) => <div style={{ padding: '10px' }}>{storyFn()}</div>],
};

// FIXME @mozalov: написать скришотные тесты на разные вариации
// FIXME @mozalov: почитать как можно протестить методы фокус и блюр

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

export const SingleAsyncFileUploader = () => <FileUploader request={successRequest} />;

export const SingleAsyncFileUploaderWithFileError = () => (
  <FileUploader request={successRequest} getFileValidationText={() => Promise.resolve('Формат файла неверный')} />
);

export const MultipleAsyncFileUploader = () => <FileUploader multiple request={successRequest} />;

export const MultipleAsyncFileUploaderWithLoading = () => <FileUploader multiple request={loadingRequest} />;

export const MultipleAsyncFileUploaderWithErrorRequest = () => <FileUploader multiple request={errorRequest} />;

export const MultipleAsyncFileUploaderWithFileError = () => (
  <FileUploader
    multiple
    request={successRequest}
    getFileValidationText={() => Promise.resolve('Формат файла неверный')}
  />
);

export const AsyncFileUploaderDisabled = () => <FileUploader request={successRequest} disabled />;

// sync control stories
export const SingleFileUploader = () => <FileUploader />;

export const MultipleFileUploader = () => <FileUploader multiple />;

export const FileUploaderWithError = () => <FileUploader error />;

export const FileUploaderWithWarning = () => <FileUploader warning />;

export const SingleFileUploaderWith100PercentsWidth = () => <FileUploader width={"100%"} />;

export const MultipleFileUploaderWithCustomWidth = () => <FileUploader width={550} multiple />;
