import React from 'react';
import { UploadFileControl, IUploadFileControlProps, IUploadFileError } from '../../internal/FileAttacherBase';
import {
  IUploadFilesProviderProps,
  withUploadFilesProvider,
} from '../../internal/FileAttacherBase/UploadFileControlProvider';
import { useValidationSetter } from '../../internal/FileAttacherBase/UploadFileControlHooks';


export interface IFileAttacherProps extends IUploadFileControlProps, IUploadFilesProviderProps {
  fileError?: IUploadFileError[];
}

export const FileAttacher = withUploadFilesProvider((props: IFileAttacherProps) => {
  const {fileError} = props;

  useValidationSetter(fileError);

  return (
      <UploadFileControl {...props} />
  );
});
