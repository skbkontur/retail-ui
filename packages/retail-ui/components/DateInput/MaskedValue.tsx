import * as React from 'react';

import styles from './DateInput.less';
import { maskChar } from './DateInputHelpers/maskChar';

interface MaskedValueProps {
  value: string | null;
  length: number;
}

export const MaskedValue = ({ value, length }: MaskedValueProps) => {
  if (!value) {
    return <Mask length={length} />;
  }
  const left = value.toString();
  const right = <Mask length={length - left.length} />;
  return (
    <span>
      {left}
      {right}
    </span>
  );
};

const Mask = ({ length }: { length: number }) =>
  length ? (
    <span className={styles.mask}>{maskChar.repeat(length)}</span>
  ) : (
    <span />
  );
