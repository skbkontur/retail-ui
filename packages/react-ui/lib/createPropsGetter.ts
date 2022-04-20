import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createPropsGetter<DP extends unknown>(defaultProps: DP) {
  return function <P, T extends React.Component<P>>(this: T): DP & P {
    return this.props as any;
  };
}
