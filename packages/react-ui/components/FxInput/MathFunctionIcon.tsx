import React from 'react';

import { iconSizer } from '../../internal/icons2022/iconSizer.js';
import { MathFunctionIcon16Light } from '../../internal/icons2022/MathFunctionIcon/MathFunctionIcon16Light.js';
import { MathFunctionIcon20Light } from '../../internal/icons2022/MathFunctionIcon/MathFunctionIcon20Light.js';
import { MathFunctionIcon24Regular } from '../../internal/icons2022/MathFunctionIcon/MathFunctionIcon24Regular.js';

export const MathFunctionIcon = iconSizer(
  {
    small: () => <MathFunctionIcon16Light />,
    medium: () => <MathFunctionIcon20Light />,
    large: () => <MathFunctionIcon24Regular />,
  },
  'MathFunctionIcon',
);
