import { iconSizer } from './iconSizer';
import { MathFunctionIcon16Light } from './MathFunctionIcon16Light';
import { MathFunctionIcon20Light } from './MathFunctionIcon20Light';
import { MathFunctionIcon24Regular } from './MathFunctionIcon24Regular';

export const MathFunctionIcon = iconSizer(
  {
    small: MathFunctionIcon16Light,
    medium: MathFunctionIcon20Light,
    large: MathFunctionIcon24Regular,
  },
  'MathFunctionIcon',
);
