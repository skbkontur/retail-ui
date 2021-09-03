import React from 'react';
import { FileUploader, RequestFunction } from '../FileUploader';
import { IUploadFile } from '../../../lib/fileUtils';

export default {
  title: 'FileUploader',
  decorators: [
    (storyFn: () => JSX.Element) => (
      <div style={{ padding: '10px' }}>{storyFn()}</div>
    ),
  ],
};


const loadingRequest: RequestFunction = () => {};

const successRequest: RequestFunction = (file: IUploadFile, onSuccess, onError) => {
  setTimeout(() => {
    onSuccess();
  }, 2000)
};

const errorRequest: RequestFunction = (file: IUploadFile, onSuccess, onError) => {
  setTimeout(() => {
    onError(new Error());
  }, 2000)
};

export const SingleFileUploader = () => (
  <FileUploader request={successRequest} />
);

export const SingleFileUploaderWithFileError = () => (
  <FileUploader request={successRequest} fileValidation={() => Promise.resolve("Формат файла неверный")} />
);

export const MultipleFileUploader = () => (
  <FileUploader multiple request={successRequest} />
);

export const MultipleFileUploaderWithLoading = () => (
  <FileUploader multiple request={loadingRequest} />
);

export const MultipleFileUploaderWithErrorRequest = () => (
  <FileUploader multiple request={errorRequest} />
);

export const MultipleFileUploaderWithControlError = () => (
  <FileUploader multiple controlError={"Файлов должно быть меньше 2"} request={loadingRequest} />
);

export const MultipleFileUploaderWithFileError = () => (
  <FileUploader multiple request={successRequest} fileValidation={() => Promise.resolve("Формат файла неверный")} />
);

export const FileUploaderDisabled = () => (
  <FileUploader request={successRequest} disabled />
);

