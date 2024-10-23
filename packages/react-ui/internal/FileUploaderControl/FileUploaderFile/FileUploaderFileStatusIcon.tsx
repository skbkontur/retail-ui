import React, { useContext } from 'react';

import { FileUploaderFileStatus } from '../fileUtils';
import { LoadingIcon } from '../../icons2022/LoadingIcon';
import { SizeProp } from '../../../lib/types/props';
import { EmotionContext } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { DeleteIcon } from './DeleteIcon';
import { ErrorIcon } from './ErrorIcon';
import { OkIcon } from './OkIcon';
import { getStyles } from './FileUploaderFile.styles';

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
  const emotion = useContext(EmotionContext);
  const styles = getStyles(emotion);

  const IconDelete = <DeleteIcon size={size} className={styles.deleteIcon(theme)} />;
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
