import React, { useContext } from 'react';

import { UploadFile } from '../UploadFile/UploadFile';
import { FileUploaderControlContext } from '../FileUploaderControlContext';
import { ThemeContext } from '../../..';

import { jsStyles } from './UploadFileList.styles';

export const UploadFileList = () => {
  const { files } = useContext(FileUploaderControlContext);
  const theme = useContext(ThemeContext);

  return (
    <div data-tid="UploadFileList">
      {files.map((file) => (
        <div key={file.id} className={jsStyles.fileWrapper(theme)}>
          <UploadFile file={file} showSize />
        </div>
      ))}
    </div>
  );
};

UploadFileList.displayName = 'UploadFileList';
