import React from 'react';

import { iconSizer } from '../../icons2022/iconSizer.js';
import { MinusCircleIcon16Light } from '../../icons2022/MinusCircleIcon/MinusCircleIcon16Light.js';
import { MinusCircleIcon20Light } from '../../icons2022/MinusCircleIcon/MinusCircleIcon20Light.js';
import { MinusCircleIcon24Regular } from '../../icons2022/MinusCircleIcon/MinusCircleIcon24Regular.js';

export const ErrorIcon = iconSizer(
  {
    small: () => <MinusCircleIcon16Light />,
    medium: () => <MinusCircleIcon20Light />,
    large: () => <MinusCircleIcon24Regular />,
  },
  'ErrorIcon',
);
