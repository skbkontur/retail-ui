import React, { useContext } from 'react';

import { useStyles } from '../../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { FileUploaderFileStatus } from '../fileUtils.js';
import { LoadingIcon } from '../../icons2022/LoadingIcon.js';
import type { SizeProp } from '../../../lib/types/props.js';

import { DeleteIcon } from './DeleteIcon.js';
import { ErrorIcon } from './ErrorIcon.js';
import { OkIcon } from './OkIcon.js';
import { getJsStyles } from './FileUploaderFile.styles.js';

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
  const jsStyles = useStyles(getJsStyles);
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
