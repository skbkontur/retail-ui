import React from 'react';
import { FileAttacherBase, IFileAttacherBaseProps, FileError } from '../../internal/FileAttacherBase';
import {
  IUploadFilesProviderProps,
  withUploadFilesProvider,
} from '../../internal/FileAttacherBase/UploadFilesProvider';
import { useValidationSetter } from '../../internal/FileAttacherBase/FileAttacherBaseHooks';


export interface IFileAttacherProps extends IFileAttacherBaseProps, IUploadFilesProviderProps {
  fileError?: FileError[];
}

export const FileAttacher = withUploadFilesProvider((props: IFileAttacherProps) => {
  const {fileError} = props;

  useValidationSetter(fileError);

  return (
      <FileAttacherBase {...props} />
  );
});
