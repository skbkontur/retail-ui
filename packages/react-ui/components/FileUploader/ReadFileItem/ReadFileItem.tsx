import React, { useMemo } from 'react';
import { IFileWithBase64 } from '../fileUtils';
import { jsStyles } from './ReadFileItem.styles';
import DeleteIcon from '@skbkontur/react-icons/Delete';
import { formatBytes } from '../../../lib/utils';

interface FileItemProps {
  file: IFileWithBase64;
}

export const ReadFileItem = (props: FileItemProps) => {
  const {file} = props;
  const {name, size} = file;

  const formattedSize = useMemo(() => formatBytes(size, 1), [size]);

  return (
    <div className={jsStyles.root()}>
      <span className={jsStyles.name()}>{name}</span>
      <span className={jsStyles.size()}>{formattedSize}</span>
      <div className={jsStyles.icon()}>
        <DeleteIcon color="#808080" />
      </div>
    </div>
  );
};

ReadFileItem.displayName = "ReadFileItem";
