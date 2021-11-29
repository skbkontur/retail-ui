import React from 'react';

import { ReactUIComponentWithRef } from './forwardRefAndName';

export function getDisplayName<P>(
  RC: React.ComponentType<P> | React.FunctionComponent<P> | ReactUIComponentWithRef<any, P>,
): string {
  return RC.displayName || RC.name || 'Anonymous';
}
