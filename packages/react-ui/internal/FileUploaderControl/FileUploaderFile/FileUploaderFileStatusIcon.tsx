import React, { useContext } from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { isTheme2022 } from '../../../lib/theming/ThemeHelpers';
import { CheckAIcon, MinusCircle, XIcon } from '../../icons/16px/Icons2022';
import { DeleteIcon, ErrorIcon, OkIcon } from '../../icons/16px';
import { FileUploaderFileStatus } from '../fileUtils';
import { Spinner } from '../../../components/Spinner';

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
    IconDelete = <XIcon disableCompensation={false} className={jsStyles.deleteIcon(theme)} />;
    IconError = <MinusCircle disableCompensation={false} />;
    IconOk = <CheckAIcon disableCompensation={false} color={theme.fileUploaderIconColor} />;
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
