import React from 'react';

import { ReactUIComponentWithRef } from './forwardRefAndName';

export function getDisplayName<T, P>(
  RC: React.ComponentType<P> | React.FunctionComponent<P> | ReactUIComponentWithRef<T, P>,
): string {
  return RC.displayName || RC.name || 'Anonymous';
}
