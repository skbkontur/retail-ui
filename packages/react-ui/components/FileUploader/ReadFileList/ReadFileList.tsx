import React from 'react';
import { IFileWithBase64 } from '../fileUtils';
import { ReadFileItem } from '../ReadFileItem/ReadFileItem';

interface FileListProps {
  files: IFileWithBase64[];
}

export const ReadFileList = (props: FileListProps) => {
  const {files} = props;

  return (
    <div>
      {files.map(file => <ReadFileItem key={file.base64 as string} file={file} />)}
    </div>
  );
};

ReadFileList.displayName = "ReadFileList";
