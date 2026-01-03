import React from 'react';

import { iconSizer } from '../../../icons2022/iconSizer.js';
import { UiMenuDotsThreeVIcon16Light } from '../../../icons2022/UiMenuDotsThreeVIcon/UiMenuDotsThreeVIcon16Light.js';
import { UiMenuDotsThreeVIcon20Light } from '../../../icons2022/UiMenuDotsThreeVIcon/UiMenuDotsThreeVIcon20Light.js';
import { UiMenuDotsThreeVIcon24Regular } from '../../../icons2022/UiMenuDotsThreeVIcon/UiMenuDotsThreeVIcon24Regular.js';

export const ActionIcon = iconSizer(
  {
    small: () => <UiMenuDotsThreeVIcon16Light />,
    medium: () => <UiMenuDotsThreeVIcon20Light />,
    large: () => <UiMenuDotsThreeVIcon24Regular />,
  },
  'ActionIcon',
);
