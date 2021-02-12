import React, { useContext } from 'react';
import { UploadFile } from '../UploadFile/UploadFile';
import { ReadFileItem } from '../ReadFileItem/ReadFileItem';
import { UploadFilesContext } from '../UploadFilesContext';

export const UploadFileList = () => {
  // FIXME @mozalov: возможно избыточный компонент
  // FIXME @mozalov: возможно стоит избавиться от ReadFileItem
  const {files} = useContext(UploadFilesContext);

  return (
    <div>
      {files.map((file) => <ReadFileItem key={file.id}>
        <UploadFile file={file} showSize />
      </ReadFileItem>)}
    </div>
  );
};

UploadFileList.displayName = "UploadFileList";
