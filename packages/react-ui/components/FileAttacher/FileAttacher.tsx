import React from 'react';
import { FileAttacherBase, FileAttacherBaseProps, FileError } from '../../internal/FileAttacherBase';
import {
  UploadFilesProvider,
  withUploadFilesProvider,
} from '../../internal/FileAttacherBase/UploadFilesProvider';
import { useValidationSetter } from '../../internal/FileAttacherBase/FileAttacherBaseHooks';


export interface FileAttacherProps extends FileAttacherBaseProps {
  fileError?: FileError[];
}

export const FileAttacher = withUploadFilesProvider((props: FileAttacherProps) => {
  const {fileError} = props;

  useValidationSetter(fileError);

  return (
      <FileAttacherBase {...props} />
  );
});
