import React, { useContext } from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { FileUploaderFileStatus } from '../fileUtils';
import { LoadingIcon } from '../../icons2022/LoadingIcon';
import type { SizeProp } from '../../../lib/types/props';

import { DeleteIcon } from './DeleteIcon';
import { ErrorIcon } from './ErrorIcon';
import { OkIcon } from './OkIcon';
import { jsStyles } from './FileUploaderFile.styles';

interface FileUploaderFileStatusIconProps {
  hovered: boolean;
  focusedByTab: boolean;
  isInvalid: boolean;
  status: FileUploaderFileStatus;
  size: SizeProp;
}

export const FileUploaderFileStatusIcon: React.FunctionComponent<FileUploaderFileStatusIconProps> = ({
  hovered,
  focusedByTab,
  isInvalid,
  status,
  size,
}) => {
  const theme = useContext(ThemeContext);

  const IconDelete = <DeleteIcon size={size} className={jsStyles.deleteIcon(theme)} />;
  const IconError = <ErrorIcon size={size} />;
  const IconOk = <OkIcon size={size} color={theme.fileUploaderIconColor} />;

  if (hovered || focusedByTab) {
    return IconDelete;
  }

  if (isInvalid) {
    return IconError;
  }

  switch (status) {
    case FileUploaderFileStatus.Loading:
      return <LoadingIcon size={size} />;
    case FileUploaderFileStatus.Uploaded:
      return IconOk;
    default:
      return IconDelete;
  }
};
