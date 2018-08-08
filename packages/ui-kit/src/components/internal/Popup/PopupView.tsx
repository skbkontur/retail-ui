import React from 'react';
import styled from '../../../lib/styled-components';
import ZIndex, { ZIndexProps } from '../ZIndex';
import { prop, ifProp } from 'styled-tools';
import { Transition } from '../../Transition';

export type Direction = 'top' | 'bottom' | 'left' | 'right';
export type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited' | 'unmounted';

export interface PopupViewProps {
  transitionState?: TransitionState;
  direction?: Direction;
  hasShadow?: boolean;
  backgroundColor?: React.CSSProperties['backgroundColor'];
}

class PopupView extends React.Component<PopupViewProps & ZIndexProps> {
  public render() {
    const {
      children,
      transitionState,
      direction,
      hasShadow,
      backgroundColor,
      ...rest
    } = this.props;

    return <ZIndex {...rest}>{children}</ZIndex>;
  }
}

export const PopupStyledView = styled(PopupView)`
  min-width: ${prop('minWidth', '100px')};
  max-width: ${prop('maxWidth', '500px')};
  width: 100%;
  border-radius: 2px;
  background: ${prop('backgroundColor', '#fff')}
    ${ifProp(
      'hasShadow',
      `
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
    -webkit-filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  `
    )};
`;

export const PopupTransition = styled(Transition)`
  position: absolute;
`;
