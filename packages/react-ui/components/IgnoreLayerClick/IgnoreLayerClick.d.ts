import * as React from 'react';

export interface IgnoreLayerClickProps {
  children: React.ReactNode;
  active: boolean;
}

export default class IgnoreLayerClick extends React.Component<
  IgnoreLayerClickProps
> {}
