import * as React from 'react';

export function RootContainer(props: { children?: React.ReactNode; rt_portalID: number }) {
  return React.Children.only(props.children);
}
