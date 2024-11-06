import React, { useContext } from 'react';

import { FileUploaderControlContext } from '../FileUploaderControlContext';
import { FileUploaderFile } from '../FileUploaderFile/FileUploaderFile';
import { FileUploaderAttachedFile } from '../fileUtils';
import { EmotionContext } from '../../../lib/theming/Emotion';
import { useFileUploaderSize } from '../hooks/useFileUploaderSize';
import { SizeProp } from '../../../lib/types/props';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { getStyles } from './FileUploaderFileList.styles';

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
  const emotion = useContext(EmotionContext);
  const styles = getStyles(emotion);

  const fileWrapperClass = useFileUploaderSize(size, {
    small: styles.fileWrapperSmall(theme),
    medium: styles.fileWrapperMedium(theme),
    large: styles.fileWrapperLarge(theme),
  });

  return (
    <div data-tid={FileUploaderFileDataTids.fileList}>
      {files.map((file) => (
        <div key={file.id} className={emotion.cx(styles.fileWrapper(), fileWrapperClass)}>
          <div className={styles.file()}>
            {renderFile(file, <FileUploaderFile file={file} showSize multiple size={size} onRemove={onRemove} />)}
          </div>
        </div>
      ))}
    </div>
  );
};

FileUploaderFileList.__KONTUR_REACT_UI__ = 'FileUploaderFileList';
FileUploaderFileList.displayName = 'FileUploaderFileList';
