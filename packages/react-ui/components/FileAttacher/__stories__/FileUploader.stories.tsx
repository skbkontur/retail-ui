import React from 'react';
import { FileAttacher } from '../FileAttacher';

export default {
  title: 'FileUploader'
};

export const SingleFileUploader = () => (
  <FileAttacher />
);

export const MultipleFileUploader = () => (
  <FileAttacher multiple />
);
