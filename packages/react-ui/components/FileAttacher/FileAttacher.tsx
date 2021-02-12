import React from 'react';
import { FileAttacherBase, FileAttacherBaseProps } from '../../internal/FileAttacherBase';
import {
  withUploadFilesProvider,
} from '../../internal/FileAttacherBase/UploadFilesProvider';


export interface FileAttacherProps extends FileAttacherBaseProps {
}

export const FileAttacher = withUploadFilesProvider((props: FileAttacherProps) => {
  return (
      <FileAttacherBase {...props} />
  );
});
