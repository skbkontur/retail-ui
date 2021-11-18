import React, { useContext } from 'react';

import { FileUploaderControlContext } from '../FileUploaderControlContext';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { jsStyles } from './FileUploaderFileList.styles';
import { FileUploaderFile } from '../FileUploaderFile/FileUploaderFile';

export const FileUploaderFileList = () => {
  const { files } = useContext(FileUploaderControlContext);
  const theme = useContext(ThemeContext);

  return (
    <div data-tid="FileUploader__fileList">
      {files.map((file) => (
        <div key={file.id} className={jsStyles.fileWrapper(theme)}>
          <FileUploaderFile file={file} showSize />
        </div>
      ))}
    </div>
  );
};

FileUploaderFileList.displayName = 'FileUploaderFileList';
