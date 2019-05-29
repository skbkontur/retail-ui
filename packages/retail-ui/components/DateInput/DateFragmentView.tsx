import * as React from 'react';
import { CHAR_MASK } from '../../lib/date/constants';
import InternalDateValidator from '../../lib/date/InternalDateValidator';
import { InternalDateComponentType, InternalDateFragment } from '../../lib/date/types';
import styles from './DateInput.less';
import { removeAllSelections } from './helpers/SelectionHelpers';

interface DateFragmentViewProps extends InternalDateFragment {
  selected: InternalDateComponentType | null;
  inputMode: boolean;
  onChange: (type: InternalDateComponentType) => (event: React.MouseEvent<HTMLElement>) => void;
}

export const DateFragmentView: React.FunctionComponent<DateFragmentViewProps> = ({
  type,
  value,
  length,
  valueWithPad,
  inputMode,
  selected,
  onChange,
}) => {
  value = value === null || (selected === type && inputMode) ? value : valueWithPad || value;
  if (InternalDateValidator.testParseToNumber(value)) {
    length = Math.max(length - value!.toString().length, 0);
  }
  return (
    <span onMouseUp={onChange(type)} onMouseDown={removeAllSelections}>
      {value}
      <span className={styles.mask}>{CHAR_MASK.repeat(length)}</span>
    </span>
  );
};
