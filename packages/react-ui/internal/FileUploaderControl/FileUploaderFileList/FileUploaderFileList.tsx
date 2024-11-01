import React, { useContext } from 'react';

import { FileUploaderControlContext } from '../FileUploaderControlContext';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { FileUploaderFile } from '../FileUploaderFile/FileUploaderFile';
import type { FileUploaderAttachedFile } from '../fileUtils';
import { cx } from '../../../lib/theming/Emotion';
import { useFileUploaderSize } from '../hooks/useFileUploaderSize';
import type { SizeProp } from '../../../lib/types/props';

import { jsStyles } from './FileUploaderFileList.styles';

interface FileUploaderFileListProps {
  renderFile: (file: FileUploaderAttachedFile, fileNode: React.ReactElement) => React.ReactNode;
  size: SizeProp;
  onRemove(fileId: string): void;
}

export const FileUploaderFileDataTids = {
  fileList: 'FileUploader__fileList',
} as const;

export const FileUploaderFileList = (props: FileUploaderFileListProps) => {
  const { renderFile, size, onRemove } = props;
  const { files } = useContext(FileUploaderControlContext);
  const theme = useContext(ThemeContext);

  const fileWrapperClass = useFileUploaderSize(size, {
    small: jsStyles.fileWrapperSmall(theme),
    medium: jsStyles.fileWrapperMedium(theme),
    large: jsStyles.fileWrapperLarge(theme),
  });

  return (
    <div data-tid={FileUploaderFileDataTids.fileList}>
      {files.map((file) => (
        <div key={file.id} className={cx(jsStyles.fileWrapper(), fileWrapperClass)}>
          <div className={jsStyles.file()}>
            {renderFile(file, <FileUploaderFile file={file} showSize multiple size={size} onRemove={onRemove} />)}
          </div>
        </div>
      ))}
    </div>
  );
};

FileUploaderFileList.__KONTUR_REACT_UI__ = 'FileUploaderFileList';
FileUploaderFileList.displayName = 'FileUploaderFileList';
