import React from 'react';
import { FileAttacherBase, FileAttacherBaseProps } from '../../internal/FileAttacherBase';
import {
  withReadFileListProvider,
} from '../../internal/FileAttacherBase/ReadFileList/ReadFileListProvider';


export interface FileAttacherProps extends FileAttacherBaseProps {
}

export const FileAttacher = withReadFileListProvider((props: FileAttacherProps) => {
  return (
      <FileAttacherBase {...props} />
  );
});
