import React from 'react';

import { ArrowShapeDRadiusUpLeftIcon16Light } from '../../internal/icons2022/ArrowShapeDRadiusUpLeftIcon/ArrowShapeDRadiusUpLeftIcon16Light.js';
import { ArrowShapeDRadiusUpLeftIcon20Light } from '../../internal/icons2022/ArrowShapeDRadiusUpLeftIcon/ArrowShapeDRadiusUpLeftIcon20Light.js';
import { ArrowShapeDRadiusUpLeftIcon24Regular } from '../../internal/icons2022/ArrowShapeDRadiusUpLeftIcon/ArrowShapeDRadiusUpLeftIcon24Regular.js';
import { iconSizer } from '../../internal/icons2022/iconSizer.js';

export const UndoIcon = iconSizer(
  {
    small: () => <ArrowShapeDRadiusUpLeftIcon16Light />,
    medium: () => <ArrowShapeDRadiusUpLeftIcon20Light />,
    large: () => <ArrowShapeDRadiusUpLeftIcon24Regular />,
  },
  'UndoIcon',
);
