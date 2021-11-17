import React, { useContext } from 'react';

import { UploadFileItem } from '../UploadFileItem/UploadFileItem';
import { FileUploaderControlContext } from '../FileUploaderControlContext';
import { ThemeContext } from '../../..';

import { jsStyles } from './UploadFileList.styles';

export const UploadFileList = () => {
  const { files } = useContext(FileUploaderControlContext);
  const theme = useContext(ThemeContext);

  return (
    <div data-tid="FileUploader__uploadFileList">
      {files.map((file) => (
        <div key={file.id} className={jsStyles.fileWrapper(theme)}>
          <UploadFileItem file={file} showSize />
        </div>
      ))}
    </div>
  );
};

UploadFileList.displayName = 'UploadFileList';
