import React from 'react';

import FocusLockUI, { type LockProps } from './Lock.js';
import FocusTrap from './Trap.js';

const FocusLockCombination = React.forwardRef(function FocusLockUICombination(props: Omit<LockProps, 'sideCar'>, ref) {
  // @ts-expect-error ref
  return <FocusLockUI sideCar={FocusTrap} ref={ref} {...props} />;
});

export default FocusLockCombination;
