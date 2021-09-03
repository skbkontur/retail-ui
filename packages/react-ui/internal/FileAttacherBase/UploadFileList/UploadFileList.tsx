import React, { useContext } from 'react';
import { UploadFile } from '../UploadFile/UploadFile';
import { UploadFilesContext } from '../UploadFilesContext';
import { jsStyles } from './UploadFileList.styles';

export const UploadFileList = () => {
  const {files} = useContext(UploadFilesContext);

  return (
    <div>
      {files.map((file) => (
        <div key={file.id} className={jsStyles.fileWrapper()}>
          <UploadFile file={file} showSize />
        </div>
      ))}
    </div>
  );
};

UploadFileList.displayName = "UploadFileList";
