import React from 'react';

export function createPropsGetter<DP extends {}>(defaultProps: DP) {
  return function <P, T extends React.Component<P>>(this: T): T['props'] & DP {
    return this.props as T['props'] & DP;
  };
}
