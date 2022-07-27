import React from 'react';

export type DefaultizedProps<P, DP> = P & DP;

export function createPropsGetter<DP extends {}>(defaultProps: DP) {
  return function <P, T extends React.Component<P>>(this: T) {
    return this.props as DefaultizedProps<T['props'], DP>;
  };
}
