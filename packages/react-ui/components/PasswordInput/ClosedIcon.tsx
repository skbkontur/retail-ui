import React from 'react';

import { EyeClosedIcon16Light } from '../../internal/icons2022/EyeClosedIcon/EyeClosedIcon16Light.js';
import { EyeClosedIcon20Light } from '../../internal/icons2022/EyeClosedIcon/EyeClosedIcon20Light.js';
import { EyeClosedIcon24Regular } from '../../internal/icons2022/EyeClosedIcon/EyeClosedIcon24Regular.js';
import { iconSizer } from '../../internal/icons2022/iconSizer.js';

export const ClosedIcon = iconSizer(
  {
    small: () => <EyeClosedIcon16Light />,
    medium: () => <EyeClosedIcon20Light />,
    large: () => <EyeClosedIcon24Regular />,
  },
  'ClosedIcon',
);
