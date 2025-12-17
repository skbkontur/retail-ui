import React from 'react';

import type { FileUploaderView } from '../../internal/FileUploaderControl/fileUtils';
import type { SizeProp } from '../../lib/types/props';

import { UploadIcon as TileUploadIcon } from './icons/TileUploadIcon';
import { UploadIcon as RowUploadIcon } from './icons/RowUploadIcon';

interface UploadIconProps {
  size: SizeProp;
  view?: FileUploaderView;
}

export const UploadIcon = (props: UploadIconProps) => {
  const { size, view = 'row' } = props;

  return view === 'row' ? <RowUploadIcon size={size} /> : <TileUploadIcon size={size} />;
};
