import React, { useContext } from 'react';

import { useResponsiveLayout } from '../../../../components/ResponsiveLayout';
import { ThemeContext } from '../../../../lib/theming/ThemeContext';
import { isThemeGTE } from '../../../../lib/theming/ThemeHelpers';
import { FileUploaderFileStatus } from '../../fileUtils';
import { LoadingIcon } from '../../../icons2022/LoadingIcon';
import type { SizeProp } from '../../../../lib/types/props';
import { jsTileStyles, jsRowStyles } from '../FileUploaderFile.styles';

import { DeleteIcon } from './DeleteIcon';
import { ErrorIcon } from './ErrorIcon';

// import { ActionIcon } from './ActionIcon';
interface FileUploaderFileStatusIconProps {
  hovered: boolean;
  isTileView?: boolean;
  disabled?: boolean;
  focusedByTab: boolean;
  isInvalid: boolean;
  status: FileUploaderFileStatus;
  size: SizeProp;
  hasValidation?: boolean;
}

export const FileUploaderFileStatusIcon: React.FunctionComponent<FileUploaderFileStatusIconProps> = ({
  hovered,
  isTileView,
  disabled,
  focusedByTab,
  isInvalid,
  status,
  size,
  hasValidation,
}) => {
  const { isMobile } = useResponsiveLayout();
  const theme = useContext(ThemeContext);
  const versionGTE5_5 = isThemeGTE(theme, '5.5');

  const iconClassNames = isTileView ? jsTileStyles.iconColor(theme) : jsRowStyles.iconColor(theme);
  const IconDelete = <DeleteIcon size={size} className={iconClassNames} />;
  // const IconAction = <ActionIcon size={size} className={iconClassNames} />;
  const IconError = <ErrorIcon size={size} />;

  if (versionGTE5_5) {
    if (status === FileUploaderFileStatus.Loading) {
      return hovered || isTileView ? IconDelete : <LoadingIcon size={size} />;
    }
    if (disabled || (!isMobile && !hovered && !focusedByTab)) {
      return null;
    }
    if (isInvalid || hasValidation) {
      return IconDelete;
    }
  } else {
    if (hovered || focusedByTab) {
      return IconDelete;
    }
    if (isInvalid) {
      return IconError;
    }
  }

  switch (status) {
    case FileUploaderFileStatus.Loading:
      return <LoadingIcon size={size} />;
    // TODO - IF-2270 - добавить логику для действий по наведению и клику, пока только удаление
    default:
      return IconDelete;
  }
};
