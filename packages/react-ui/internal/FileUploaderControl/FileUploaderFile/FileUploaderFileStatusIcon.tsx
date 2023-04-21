import React, { useContext } from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { isTheme2022 } from '../../../lib/theming/ThemeHelpers';
import { DeleteIcon, ErrorIcon, OkIcon } from '../../icons/16px';
import { FileUploaderFileStatus } from '../fileUtils';
import { FileUploaderSize } from '../../../components/FileUploader';
import { LoadingIcon } from '../../icons2022/LoadingIcon';

import { DeleteIcon as DeleteIcon2022 } from './DeleteIcon';
import { ErrorIcon as ErrorIcon2022 } from './ErrorIcon';
import { OkIcon as OkIcon2022 } from './OkIcon';
import { jsStyles } from './FileUploaderFile.styles';

interface FileUploaderFileStatusIconProps {
  hovered: boolean;
  focusedByTab: boolean;
  isInvalid: boolean;
  status: FileUploaderFileStatus;
  size: FileUploaderSize;
}

export const FileUploaderFileStatusIcon: React.FunctionComponent<FileUploaderFileStatusIconProps> = ({
  hovered,
  focusedByTab,
  isInvalid,
  status,
  size,
}) => {
  const theme = useContext(ThemeContext);

  let IconDelete = <DeleteIcon className={jsStyles.deleteIcon(theme)} />;
  let IconError = <ErrorIcon />;
  let IconOk = <OkIcon color={theme.fileUploaderIconColor} />;

  if (isTheme2022(theme)) {
    IconDelete = <DeleteIcon2022 size={size} className={jsStyles.deleteIcon(theme)} />;
    IconError = <ErrorIcon2022 size={size} />;
    IconOk = <OkIcon2022 size={size} color={theme.fileUploaderIconColor} />;
  }

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
