import * as React from 'react';

export interface RenderLayerProps {
  children?: React.ReactNode;
  onClickOutside?: (e: Event) => any;
  onFocusOutside?: (e: Event) => any;
  active?: boolean;
  innerRef?: void;
}

export default class RenderLayer extends React.Component<RenderLayerProps> {}
