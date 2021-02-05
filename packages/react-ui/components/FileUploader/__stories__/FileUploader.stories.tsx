import React from 'react';
import { FileUploader } from '../FileUploader';

export default {
  title: 'FileUploader'
};

export const SingleFileUploader = () => (
  <FileUploader />
);

export const MultipleFileUploader = () => (
  <FileUploader multiple />
);
