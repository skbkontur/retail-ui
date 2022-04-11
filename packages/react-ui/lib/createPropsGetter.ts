import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createPropsGetter<DP extends {}>(defaultProps: DP) {
  return function <P, T extends React.Component<P>>(this: T): DP & P {
    // The function will be removed in near future.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.props as any;
  };
}
