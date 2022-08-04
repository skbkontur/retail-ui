import React, { useContext, useMemo } from 'react';

import { FileUploaderControlContext } from '../FileUploaderControlContext';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { FileUploaderFile } from '../FileUploaderFile/FileUploaderFile';
import { FileUploaderAttachedFile } from '../fileUtils';
import { FileUploaderSize } from '../../../components/FileUploader';
import { cx } from '../../../lib/theming/Emotion';

import { jsStyles } from './FileUploaderFileList.styles';

interface FileUploaderFileListProps {
  renderFile: (file: FileUploaderAttachedFile, fileNode: React.ReactElement) => React.ReactNode;
  size: FileUploaderSize;
}

export const FileUploaderFileDataTids = {
  fileList: 'FileUploader__fileList',
} as const;

export const FileUploaderFileList = (props: FileUploaderFileListProps) => {
  const { renderFile, size } = props;
  const { files } = useContext(FileUploaderControlContext);
  const theme = useContext(ThemeContext);

  const fileWrapperClass = useMemo(() => {
    switch (size) {
      case 'large':
        return jsStyles.fileWrapperLarge(theme);
      case 'medium':
        return jsStyles.fileWrapperMedium(theme);
      case 'small':
        return jsStyles.fileWrapperSmall(theme);
      default:
        return jsStyles.fileWrapperSmall(theme);
    }
  }, [size]);

  return (
    <div data-tid={FileUploaderFileDataTids.fileList}>
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
