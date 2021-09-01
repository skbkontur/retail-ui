import React, { useContext } from 'react';
import { UploadFile } from '../UploadFile/UploadFile';
import { UploadFilesContext } from '../UploadFilesContext';

export const UploadFileList = () => {
  const {files} = useContext(UploadFilesContext);

  return (
    <div>
      {files.map((file) => (
          <UploadFile key={file.id} file={file} showSize />
      ))}
    </div>
  );
};

UploadFileList.displayName = "UploadFileList";
