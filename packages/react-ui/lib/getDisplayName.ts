import React from 'react';

export function getDisplayName<P>(RC: React.ComponentType<P> | React.FunctionComponent<P>): string {
  return RC.displayName || RC.name || 'Anonymous';
}
