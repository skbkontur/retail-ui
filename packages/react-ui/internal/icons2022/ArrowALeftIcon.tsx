import { ArrowALeftIcon16Light } from './ArrowALeftIcon16Light';
import { ArrowALeftIcon20Light } from './ArrowALeftIcon20Light';
import { ArrowALeftIcon24Regular } from './ArrowALeftIcon24Regular';
import { iconSizer } from './iconSizer';

export const ArrowALeftIcon = iconSizer(
  {
    small: ArrowALeftIcon16Light,
    medium: ArrowALeftIcon20Light,
    large: ArrowALeftIcon24Regular,
  },
  'ArrowALeftIcon',
);
