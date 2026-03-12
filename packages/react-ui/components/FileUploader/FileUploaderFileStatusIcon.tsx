import React, { useContext } from 'react';

import { useStyles } from '../../lib/renderEnvironment/index.js';
import { useResponsiveLayout } from '../ResponsiveLayout/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { LoadingIcon } from '../../internal/icons2022/LoadingIcon.js';
import type { SizeProp } from '../../lib/types/props.js';

import { FileUploaderFileStatus } from './fileUtils.js';
import { getJsRowStyles, getJsTileStyles } from './FileUploaderFile.styles.js';
import { DeleteIcon } from './icons/DeleteIcon.js';

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
  const iconDelete = <DeleteIcon size={size} className={iconClassNames} />;

  if (status === FileUploaderFileStatus.Loading) {
    return hovered || isTileView ? iconDelete : <LoadingIcon size={size} />;
  }
  if (disabled || (!isMobile && !hovered && !focusedByTab)) {
    return null;
  }
  if (isInvalid || hasValidation) {
    return iconDelete;
  }
  // TODO - IF-2270 - добавить логику для действий по наведению и клику, пока только удаление
  return iconDelete;
};
