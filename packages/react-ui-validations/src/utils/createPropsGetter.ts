import React from 'react';

export type DefaultizedProps<P, DP> = P & DP;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createPropsGetter<DP extends unknown>(defaultProps: DP) {
  return function <P, T extends React.Component<P>>(this: T) {
    return this.props as DefaultizedProps<T['props'], DP>;
  };
}
