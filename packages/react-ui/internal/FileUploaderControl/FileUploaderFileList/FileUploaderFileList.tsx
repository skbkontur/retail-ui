import React, { useContext } from 'react';

import { useEmotion, useStyles } from '../../../lib/renderEnvironment/index.js';
import { FileUploaderControlContext } from '../FileUploaderControlContext.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { FileUploaderFile } from '../FileUploaderFile/FileUploaderFile.js';
import type { FileUploaderAttachedFile } from '../fileUtils.js';
import { useFileUploaderSize } from '../hooks/useFileUploaderSize.js';
import type { SizeProp } from '../../../lib/types/props.js';

import { getJsStyles } from './FileUploaderFileList.styles.js';

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
  const { cx } = useEmotion();
  const jsStyles = useStyles(getJsStyles);
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
