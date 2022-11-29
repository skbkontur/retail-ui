import { iconSizer } from './iconSizer';
import { ArrowShapeDRadiusUpLeftIcon16Light } from './ArrowShapeDRadiusUpLeftIcon16Light';
import { ArrowShapeDRadiusUpLeftIcon24Regular } from './ArrowShapeDRadiusUpLeftIcon24Regular';
import { ArrowShapeDRadiusUpLeftIcon20Light } from './ArrowShapeDRadiusUpLeftIcon20Light';

export const ArrowShapeDRadiusUpLeftIcon = iconSizer(
  {
    small: ArrowShapeDRadiusUpLeftIcon16Light,
    medium: ArrowShapeDRadiusUpLeftIcon20Light,
    large: ArrowShapeDRadiusUpLeftIcon24Regular,
  },
  'ArrowShapeDRadiusUpLeftIcon',
);
