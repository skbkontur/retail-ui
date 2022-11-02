import React, { useContext } from 'react';

import { FileUploaderControlContext } from '../FileUploaderControlContext';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { FileUploaderFile } from '../FileUploaderFile/FileUploaderFile';
import { FileUploaderAttachedFile } from '../fileUtils';
import { FileUploaderSize } from '../../../components/FileUploader';
import { cx } from '../../../lib/theming/Emotion';
import { useFileUploaderSize } from '../hooks/useFileUploaderSize';

import { jsStyles } from './FileUploaderFileList.styles';

interface FileUploaderFileListProps {
  renderFile: (file: FileUploaderAttachedFile, fileNode: React.ReactElement) => React.ReactNode;
  size: FileUploaderSize;
}

export const FileUploaderFileList = (props: FileUploaderFileListProps) => {
  const { renderFile, size } = props;
  const { files } = useContext(FileUploaderControlContext);
  const theme = useContext(ThemeContext);

  const fileWrapperClass = useFileUploaderSize(size, {
    small: jsStyles.fileWrapperSmall(theme),
    medium: jsStyles.fileWrapperMedium(theme),
    large: jsStyles.fileWrapperLarge(theme),
  });

  return (
    <div data-tid="FileUploader__fileList">
      {files.map((file) => (
        <div key={file.id} className={cx(jsStyles.fileWrapper(theme), fileWrapperClass)}>
          <div className={jsStyles.file()}>
            {renderFile(file, <FileUploaderFile file={file} showSize multiple size={size} />)}
          </div>
        </div>
      ))}
    </div>
  );
};

FileUploaderFileList.displayName = 'FileUploaderFileList';
