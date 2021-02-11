import React from 'react';
import { FileAttacherBase } from '../FileAttacherBase';

export default {
  title: 'FileUploader'
};

export const SingleFileUploader = () => (
  <FileAttacherBase />
);

export const MultipleFileUploader = () => (
  <FileAttacherBase multiple />
);
