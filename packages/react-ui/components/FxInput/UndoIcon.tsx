/* eslint-disable react/display-name */
import React from 'react';

import { iconSizer } from '../../internal/icons2022/iconSizer';
import { ArrowShapeDRadiusUpLeftIcon16Light } from '../../internal/icons2022/ArrowShapeDRadiusUpLeftIcon16Light';
import { ArrowShapeDRadiusUpLeftIcon24Regular } from '../../internal/icons2022/ArrowShapeDRadiusUpLeftIcon24Regular';
import { ArrowShapeDRadiusUpLeftIcon20Light } from '../../internal/icons2022/ArrowShapeDRadiusUpLeftIcon20Light';

export const UndoIcon = iconSizer(
  {
    small: () => <ArrowShapeDRadiusUpLeftIcon16Light />,
    medium: () => <ArrowShapeDRadiusUpLeftIcon20Light />,
    large: () => <ArrowShapeDRadiusUpLeftIcon24Regular />,
  },
  'UndoIcon',
);
