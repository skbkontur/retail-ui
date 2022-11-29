import { ArrowARightIcon16Light } from './ArrowARightIcon16Light';
import { ArrowARightIcon20Light } from './ArrowARightIcon20Light';
import { ArrowARightIcon24Regular } from './ArrowARightIcon24Regular';
import { iconSizer } from './iconSizer';

export const ArrowARightIcon = iconSizer(
  {
    small: ArrowARightIcon16Light,
    medium: ArrowARightIcon20Light,
    large: ArrowARightIcon24Regular,
  },
  'ArrowARightIcon',
);
