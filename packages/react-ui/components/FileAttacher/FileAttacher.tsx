import React from 'react';
import { IUploadFileControlProps, IUploadFileError, UploadFileControl } from '../../internal/UploadFileControl';
import {
  IUploadFilesProviderProps,
  withUploadFilesProvider,
} from '../../internal/UploadFileControl/UploadFileControlProvider';
import { useValidationSetter } from '../../internal/UploadFileControl/UploadFileControlHooks';

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
