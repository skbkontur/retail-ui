import React, { useContext } from 'react';

import { useStyles } from '../../../../lib/renderEnvironment';
import { useResponsiveLayout } from '../../../../components/ResponsiveLayout';
import { ThemeContext } from '../../../../lib/theming/ThemeContext';
import { FileUploaderFileStatus } from '../../fileUtils';
import { LoadingIcon } from '../../../icons2022/LoadingIcon';
import type { SizeProp } from '../../../../lib/types/props';
import { getJsRowStyles, getJsTileStyles } from '../FileUploaderFile.styles';

import { DeleteIcon } from './DeleteIcon';

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
  const jsTileStyles = useStyles(getJsTileStyles);
  const jsRowStyles = useStyles(getJsRowStyles);

  const iconClassNames = isTileView ? jsTileStyles.iconColor(theme) : jsRowStyles.iconColor(theme);
  const IconDelete = <DeleteIcon size={size} className={iconClassNames} />;
  // const IconAction = <ActionIcon size={size} className={iconClassNames} />;

  if (status === FileUploaderFileStatus.Loading) {
    return hovered || isTileView ? IconDelete : <LoadingIcon size={size} />;
  }
  if (disabled || (!isMobile && !hovered && !focusedByTab)) {
    return null;
  }
  if (isInvalid || hasValidation) {
    return IconDelete;
  }

  // TODO - IF-2270 - добавить логику для действий по наведению и клику, пока только удаление
  return IconDelete;
};
