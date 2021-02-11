import React from 'react';
import { IReadFile } from '../../../lib/fileUtils';
import { ReadFile } from '../ReadFile/ReadFile';
import { ReadFileItem } from '../ReadFileItem/ReadFileItem';

interface FileListProps {
  files: IReadFile[];
  onDelete: (index: number) => void;
}

export const ReadFileList = (props: FileListProps) => {
  const {files, onDelete} = props;

  // FIXME @mozalov: возможно избыточный компонент
  // FIXME @mozalov: возможно стоит избавиться от ReadFileItem

  return (
    <div>
      {files.map((file, index) => <ReadFileItem key={file.base64 as string}>
        <ReadFile file={file} index={index} onDelete={onDelete} showSize />
      </ReadFileItem>)}
    </div>
  );
};

ReadFileList.displayName = "ReadFileList";
