import React, { useContext } from 'react';

import type { FileUploaderView } from '../../internal/FileUploaderControl/fileUtils';
import type { SizeProp } from '../../lib/types/props';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers';

import { UploadIcon as TileUploadIcon } from './icons/TileUploadIcon';
import { UploadIcon as RowUploadIcon } from './icons/RowUploadIcon';
import { UploadIcon as DefaultUploadIcon } from './icons/UploadIcon';

interface UploadIconProps {
  size: SizeProp;
  view?: FileUploaderView;
}

export const UploadIcon = (props: UploadIconProps) => {
  const theme = useContext(ThemeContext);
  const versionGTE5_5 = isThemeGTE(theme, '5.5');

  const { size, view = 'row' } = props;
  if (versionGTE5_5) {
    return view === 'row' ? <RowUploadIcon size={size} /> : <TileUploadIcon size={size} />;
  }

  return <DefaultUploadIcon size={size} />;
};
