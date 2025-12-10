import React from 'react';

import { iconSizer } from '../../internal/icons2022/iconSizer.js';
import { UiMenuDotsThreeVIcon16Light } from '../../internal/icons2022/UiMenuDotsThreeVIcon/UiMenuDotsThreeVIcon16Light.js';
import { UiMenuDotsThreeVIcon20Regular } from '../../internal/icons2022/UiMenuDotsThreeVIcon/UiMenuDotsThreeVIcon20Regular.js';
import { UiMenuDotsThreeVIcon24Regular } from '../../internal/icons2022/UiMenuDotsThreeVIcon/UiMenuDotsThreeVIcon24Regular.js';

export const KebabIcon = iconSizer(
  {
    small: () => <UiMenuDotsThreeVIcon16Light />,
    medium: () => <UiMenuDotsThreeVIcon20Regular />,
    large: () => <UiMenuDotsThreeVIcon24Regular />,
  },
  'KebabIcon',
);
