import React from 'react';
import { IFileWithBase64 } from '../fileUtils';
import { ReadFile } from '../ReadFile/ReadFile';
import { ReadFileItem } from '../ReadFileItem/ReadFileItem';

interface FileListProps {
  files: IFileWithBase64[];
  onDelete: (index: number) => void;
}

export const ReadFileList = (props: FileListProps) => {
  const {files, onDelete} = props;

  return (
    <div>
      {files.map((file, index) => <ReadFileItem key={file.base64 as string}>
        <ReadFile file={file} index={index} onDelete={onDelete} showSize />
      </ReadFileItem>)}
    </div>
  );
};

ReadFileList.displayName = "ReadFileList";
