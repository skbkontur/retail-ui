import React from 'react';
import { FileUploader, RequestFunction } from '../FileUploader';
import { IReadFile } from '../../../lib/fileUtils';

export default {
  title: 'FileUploader'
};

const request: RequestFunction = (file: IReadFile, onSuccess, onError) => {};

export const SingleFileUploader = () => (
  <FileUploader request={request} />
);

export const MultipleFileUploader = () => (
  <FileUploader multiple request={request} />
);
