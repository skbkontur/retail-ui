import React from 'react';

import type { FileUploaderIconType, FileUploaderView } from '../../fileUtils.js';
import { type SizeProp } from '../../../../lib/types/props.js';
import { useTheme } from '../../../../lib/theming/useTheme.js';

import { ArchiveIcon as RowViewArchiveIcon } from './row/ArchiveIcon.js';
import { FolderIcon as RowViewFolderIcon } from './row/FolderIcon.js';
import { MarkupIcon as RowViewMarkupIcon } from './row/MarkupIcon.js';
import { PdfIcon as RowViewPdfIcon } from './row/PdfIcon.js';
import { PictureIcon as RowViewPictureIcon } from './row/PictureIcon.js';
import { PresentationIcon as RowViewPresentationIcon } from './row/PresentationIcon.js';
import { TableIcon as RowViewTableIcon } from './row/TableIcon.js';
import { TextIcon as RowViewTextIcon } from './row/TextIcon.js';
import { DocTextIcon as RowViewDocTextIcon } from './row/DocTextIcon.js';
import { ArchiveIcon as TileViewArchiveIcon } from './tile/ArchiveIcon.js';
import { FolderIcon as TileViewFolderIcon } from './tile/FolderIcon.js';
import { MarkupIcon as TileViewMarkupIcon } from './tile/MarkupIcon.js';
import { PdfIcon as TileViewPdfIcon } from './tile/PdfIcon.js';
import { PictureIcon as TileViewPictureIcon } from './tile/PictureIcon.js';
import { PresentationIcon as TileViewPresentationIcon } from './tile/PresentationIcon.js';
import { TableIcon as TileViewTableIcon } from './tile/TableIcon.js';
import { TextIcon as TileViewTextIcon } from './tile/TextIcon.js';
import { DocTextIcon as TileViewDocTextIcon } from './tile/DocTextIcon.js';
import { ValidationErrorIcon as RowValidationErrorIcon } from './row/ValidationErrorIcon.js';
import { ValidationWarningIcon as RowValidationWarningIcon } from './row/ValidationWarningIcon.js';
import { ValidationErrorIcon as TileValidationErrorIcon } from './tile/ValidationErrorIcon.js';
import { ValidationWarningIcon as TileValidationWarningIcon } from './tile/ValidationWarningIcon.js';

interface FileUploaderFileTypeIconProps {
  size: SizeProp;
  type: FileUploaderIconType;
  view?: FileUploaderView;
}

export const FileUploaderFileTypeIcon: React.FunctionComponent<FileUploaderFileTypeIconProps> = ({
  size,
  type,
  view = 'row',
}) => {
  const theme = useTheme();
  const isTileView = view === 'tile';

  if (isTileView) {
    switch (type) {
      case 'error':
        return <TileValidationErrorIcon size={size} color={theme.fileUploaderFileTypeErrorIconColor} />;
      case 'warning':
        return <TileValidationWarningIcon size={size} color={theme.fileUploaderFileTypeWarningIconColor} />;
      case 'pdf':
        return <TileViewPdfIcon size={size} color={theme.fileUploaderFileTypePdfIconColor} />;
      case 'code':
        return <TileViewMarkupIcon size={size} color={theme.fileUploaderFileTypeCodeIconColor} />;
      case 'picture':
        return <TileViewPictureIcon size={size} color={theme.fileUploaderFileTypePictureIconColor} />;
      case 'presentation':
        return <TileViewPresentationIcon size={size} color={theme.fileUploaderFileTypePresentationIconColor} />;
      case 'table':
        return <TileViewTableIcon size={size} color={theme.fileUploaderFileTypeTableIconColor} />;
      case 'text':
        return <TileViewTextIcon size={size} color={theme.fileUploaderFileTypeTextIconColor} />;
      case 'archive':
        return <TileViewArchiveIcon size={size} color={theme.fileUploaderFileTypeArchiveIconColor} />;
      case 'folder':
        return <TileViewFolderIcon size={size} color={theme.fileUploaderFileTypeFolderIconColor} />;
      default:
        return <TileViewDocTextIcon size={size} color={theme.fileUploaderFileTypeUnknownIconColor} />;
    }
  }
  switch (type) {
    case 'error':
      return <RowValidationErrorIcon size={size} color={theme.fileUploaderFileTypeErrorIconColor} />;
    case 'warning':
      return <RowValidationWarningIcon size={size} color={theme.fileUploaderFileTypeWarningIconColor} />;
    case 'pdf':
      return <RowViewPdfIcon size={size} color={theme.fileUploaderFileTypePdfIconColor} />;
    case 'code':
      return <RowViewMarkupIcon size={size} color={theme.fileUploaderFileTypeCodeIconColor} />;
    case 'picture':
      return <RowViewPictureIcon size={size} color={theme.fileUploaderFileTypePictureIconColor} />;
    case 'presentation':
      return <RowViewPresentationIcon size={size} color={theme.fileUploaderFileTypePresentationIconColor} />;
    case 'table':
      return <RowViewTableIcon size={size} color={theme.fileUploaderFileTypeTableIconColor} />;
    case 'text':
      return <RowViewTextIcon size={size} color={theme.fileUploaderFileTypeTextIconColor} />;
    case 'archive':
      return <RowViewArchiveIcon size={size} color={theme.fileUploaderFileTypeArchiveIconColor} />;
    case 'folder':
      return <RowViewFolderIcon size={size} color={theme.fileUploaderFileTypeFolderIconColor} />;
    default:
      return <RowViewDocTextIcon size={size} color={theme.fileUploaderFileTypeUnknownIconColor} />;
  }
};
