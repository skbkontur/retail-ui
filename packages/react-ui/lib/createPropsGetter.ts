import React from 'react';

/**
 * @deprecated
 */
export function createPropsGetter<DP extends {}>(defaultProps: DP) {
  return function <P, T extends React.Component<P>>(this: T): DP & P {
    return this.props as any;
  };
}
