import React from 'react';
import { FileAttacher } from '../FileAttacher';

export default {
  title: 'FileAttacher'
};

export const SingleFileAttacher = () => (
  <FileAttacher />
);

export const MultipleFileAttacher = () => (
  <FileAttacher multiple />
);

export const FileAttacherWithErrorControl = () => (
  <FileAttacher controlError={'Выберите файл'} />
);
