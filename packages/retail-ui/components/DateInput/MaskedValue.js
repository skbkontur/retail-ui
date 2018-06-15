
import * as React from 'react';

import styles from './DateInput.less';
import { maskChar } from './DateInputHelpers/maskChar';

type Props = {
  value: string | null,
  length: number,
  selected?: boolean
};

export const MaskedValue = ({ value, length, selected }: Props) => {
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

const Mask = ({ length }) =>
  length ? (
    <span className={styles.mask}>{maskChar.repeat(length)}</span>
  ) : (
    <span />
  );
