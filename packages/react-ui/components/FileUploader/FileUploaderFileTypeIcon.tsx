import React from 'react';

import { type SizeProp } from '../../lib/types/props.js';
import { useTheme } from '../../lib/theming/useTheme.js';

import type { FileUploaderIconType, FileUploaderView } from './fileUtils.js';
import { ArchiveIcon as RowViewArchiveIcon } from './icons/row/ArchiveIcon.js';
import { FolderIcon as RowViewFolderIcon } from './icons/row/FolderIcon.js';
import { MarkupIcon as RowViewMarkupIcon } from './icons/row/MarkupIcon.js';
import { PdfIcon as RowViewPdfIcon } from './icons/row/PdfIcon.js';
import { PictureIcon as RowViewPictureIcon } from './icons/row/PictureIcon.js';
import { PresentationIcon as RowViewPresentationIcon } from './icons/row/PresentationIcon.js';
import { TableIcon as RowViewTableIcon } from './icons/row/TableIcon.js';
import { TextIcon as RowViewTextIcon } from './icons/row/TextIcon.js';
import { DocTextIcon as RowViewDocTextIcon } from './icons/row/DocTextIcon.js';
import { ArchiveIcon as TileViewArchiveIcon } from './icons/tile/ArchiveIcon.js';
import { FolderIcon as TileViewFolderIcon } from './icons/tile/FolderIcon.js';
import { MarkupIcon as TileViewMarkupIcon } from './icons/tile/MarkupIcon.js';
import { PdfIcon as TileViewPdfIcon } from './icons/tile/PdfIcon.js';
import { PictureIcon as TileViewPictureIcon } from './icons/tile/PictureIcon.js';
import { PresentationIcon as TileViewPresentationIcon } from './icons/tile/PresentationIcon.js';
import { TableIcon as TileViewTableIcon } from './icons/tile/TableIcon.js';
import { TextIcon as TileViewTextIcon } from './icons/tile/TextIcon.js';
import { DocTextIcon as TileViewDocTextIcon } from './icons/tile/DocTextIcon.js';
import { ValidationErrorIcon as RowValidationErrorIcon } from './icons/row/ValidationErrorIcon.js';
import { ValidationWarningIcon as RowValidationWarningIcon } from './icons/row/ValidationWarningIcon.js';
import { ValidationErrorIcon as TileValidationErrorIcon } from './icons/tile/ValidationErrorIcon.js';
import { ValidationWarningIcon as TileValidationWarningIcon } from './icons/tile/ValidationWarningIcon.js';

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
