import React from 'react';

import { ArrowCRightIcon16Light } from '../../internal/icons2022/ArrowCRightIcon/ArrowCRightIcon16Light';
import { ArrowCRightIcon20Light } from '../../internal/icons2022/ArrowCRightIcon/ArrowCRightIcon20Light';
import { ArrowCRightIcon24Regular } from '../../internal/icons2022/ArrowCRightIcon/ArrowCRightIcon24Regular';
import { iconSizer } from '../../internal/icons2022/iconSizer';

export const ForwardIcon = iconSizer(
  {
    small: () => <ArrowCRightIcon16Light />,
    medium: () => <ArrowCRightIcon20Light />,
    large: () => <ArrowCRightIcon24Regular />,
  },
  'ForwardIcon',
);
