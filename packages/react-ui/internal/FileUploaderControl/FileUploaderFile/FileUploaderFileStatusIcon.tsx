import React, { useContext } from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { isTheme2022 } from '../../../lib/theming/ThemeHelpers';
import { DeleteIcon, ErrorIcon, OkIcon } from '../../icons/16px';
import { FileUploaderFileStatus } from '../fileUtils';
import { Spinner } from '../../../components/Spinner';
import { XIcon16Regular } from '../../icons2022/XIcon16Regular';
import { CheckAIcon16Regular } from '../../icons2022/CheckAIcon16Regular';
import { MinusCircleIcon16Regular } from '../../icons2022/MinusCircleIcon16Regular';

import { jsStyles } from './FileUploaderFile.styles';

interface FileUploaderFileStatusIconProps {
  hovered: boolean;
  focusedByTab: boolean;
  isInvalid: boolean;
  status: FileUploaderFileStatus;
}

export const FileUploaderFileStatusIcon: React.FunctionComponent<FileUploaderFileStatusIconProps> = ({
  hovered,
  focusedByTab,
  isInvalid,
  status,
}) => {
  const theme = useContext(ThemeContext);

  let IconDelete = <DeleteIcon className={jsStyles.deleteIcon(theme)} />;
  let IconError = <ErrorIcon />;
  let IconOk = <OkIcon color={theme.fileUploaderIconColor} />;

  if (isTheme2022(theme)) {
    IconDelete = <XIcon16Regular disableCompensation={false} className={jsStyles.deleteIcon(theme)} />;
    IconError = <MinusCircleIcon16Regular disableCompensation={false} />;
    IconOk = <CheckAIcon16Regular disableCompensation={false} color={theme.fileUploaderIconColor} />;
  }

  if (hovered || focusedByTab) {
    return IconDelete;
  }

  if (isInvalid) {
    return IconError;
  }

  switch (status) {
    case FileUploaderFileStatus.Loading:
      return <Spinner type="mini" dimmed caption="" />;
    case FileUploaderFileStatus.Uploaded:
      return IconOk;
    default:
      return IconDelete;
  }
};
