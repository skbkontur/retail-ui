import React from 'react';

import type { FileUploaderView } from '../../internal/FileUploaderControl/fileUtils.js';
import type { SizeProp } from '../../lib/types/props.js';

import { UploadIcon as TileUploadIcon } from './icons/TileUploadIcon.js';
import { UploadIcon as RowUploadIcon } from './icons/RowUploadIcon.js';

interface UploadIconProps {
  size: SizeProp;
  view?: FileUploaderView;
}

export const UploadIcon = (props: UploadIconProps): React.JSX.Element => {
  const { size, view = 'row' } = props;

  return view === 'row' ? <RowUploadIcon size={size} /> : <TileUploadIcon size={size} />;
};
