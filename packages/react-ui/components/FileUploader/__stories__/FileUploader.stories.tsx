import React from 'react';
import { FileUploader, RequestFunction } from '../FileUploader';
import { IReadFile } from '../../../lib/fileUtils';

export default {
  title: 'FileUploader',
  decorators: [
    (storyFn: () => JSX.Element) => (
      <div style={{ padding: '10px' }}>{storyFn()}</div>
    ),
  ],
};

const successRequest: RequestFunction = (file: IReadFile, onSuccess, onError) => {
  setTimeout(() => {
    onSuccess();
  }, 2000)
};

export const SingleFileUploader = () => (
  <FileUploader request={successRequest} />
);

export const MultipleFileUploader = () => (
  <FileUploader multiple request={successRequest} />
);

const loadingRequest: RequestFunction = (file: IReadFile, onSuccess, onError) => {};

export const MultipleFileUploaderWithLoading = () => (
  <FileUploader multiple request={loadingRequest} />
);

const errorRequest: RequestFunction = (file: IReadFile, onSuccess, onError) => {
  setTimeout(() => {
    onError(new Error());
  }, 2000)
};

export const MultipleFileUploaderWithError = () => (
  <FileUploader multiple request={errorRequest} />
);
