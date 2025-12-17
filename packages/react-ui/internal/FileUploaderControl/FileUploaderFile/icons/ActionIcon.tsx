import React from 'react';

import { iconSizer } from '../../../icons2022/iconSizer';
import { UiMenuDotsThreeVIcon16Light } from '../../../icons2022/UiMenuDotsThreeVIcon/UiMenuDotsThreeVIcon16Light';
import { UiMenuDotsThreeVIcon20Light } from '../../../icons2022/UiMenuDotsThreeVIcon/UiMenuDotsThreeVIcon20Light';
import { UiMenuDotsThreeVIcon24Regular } from '../../../icons2022/UiMenuDotsThreeVIcon/UiMenuDotsThreeVIcon24Regular';

export const ActionIcon = iconSizer(
  {
    small: () => <UiMenuDotsThreeVIcon16Light />,
    medium: () => <UiMenuDotsThreeVIcon20Light />,
    large: () => <UiMenuDotsThreeVIcon24Regular />,
  },
  'ActionIcon',
);
