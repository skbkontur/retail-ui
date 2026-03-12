import React from 'react';

import type { SizeProp } from '../../../lib/types/props.js';
import type { FileUploaderView } from '../fileUtils.js';

import { UploadIcon as TileUploadIcon } from './tile/TileUploadIcon.js';
import { UploadIcon as RowUploadIcon } from './row/RowUploadIcon.js';

interface UploadIconProps {
  size: SizeProp;
  view?: FileUploaderView;
}

export const UploadIcon = (props: UploadIconProps): React.JSX.Element => {
  const { size, view = 'row' } = props;

  return view === 'row' ? <RowUploadIcon size={size} /> : <TileUploadIcon size={size} />;
};
