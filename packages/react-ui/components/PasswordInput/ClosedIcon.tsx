import React from 'react';

import { iconSizer } from '../../internal/icons2022/iconSizer';
import { EyeClosedIcon16Light } from '../../internal/icons2022/EyeClosedIcon/EyeClosedIcon16Light';
import { EyeClosedIcon20Light } from '../../internal/icons2022/EyeClosedIcon/EyeClosedIcon20Light';
import { EyeClosedIcon24Regular } from '../../internal/icons2022/EyeClosedIcon/EyeClosedIcon24Regular';

export const ClosedIcon = iconSizer(
  {
    small: () => <EyeClosedIcon16Light />,
    medium: () => <EyeClosedIcon20Light />,
    large: () => <EyeClosedIcon24Regular />,
  },
  'ClosedIcon',
);
