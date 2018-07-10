import React from 'react';
// @ts-ignore: noUnusedLocals StyledComponentClass
import { StyledComponentClass } from 'styled-components';
import styled, { css, isTruthyProp } from '../../../lib/styled-components';
import ZIndex, { ZIndexProps } from '../ZIndex';

export type Direction = 'top' | 'bottom' | 'left' | 'right';
export type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited' | 'unmounted';

export interface PopupViewProps {
  transitionState?: TransitionState;
  direction: Direction;
  hasShadow?: boolean;
}

class PopupView extends React.Component<PopupViewProps & ZIndexProps> {
  public render() {
    const { children, transitionState, direction, hasShadow, ...rest } = this.props;

    return <ZIndex {...rest}>{children}</ZIndex>;
  }
}

export const PopupStyledView = styled(PopupView)`
  position: absolute;
  min-width: 100px;
  max-width: 500px;
  background: #fff;
  border-radius: 2px;

  ${isTruthyProp('hasShadow')`
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
    -webkit-filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  `} ${({ transitionState, direction }) => {
    switch (transitionState) {
      case 'entering':
        return css`
          opacity: 0.01;
          transform: ${getEnteringTransform(direction)};
        `;

      case 'entered':
        return css`
          transition: transform 0.18s cubic-bezier(0.22, 0.61, 0.36, 1),
            opacity 0.18s cubic-bezier(0.22, 0.61, 0.36, 1);
          opacity: 1;
          transform: translate(0, 0);
        `;

      case 'exiting':
        return css`
          opacity: 1;
        `;

      case 'unmounted':
      case 'exited':
        return css`
          opacity: 0.01;
          transition: opacity 0.15s ease-out;
        `;
    }
  }};
`;

const getEnteringTransform = (direction: Direction): string => {
  switch (direction) {
    case 'top':
      return 'translateY(10px);';

    case 'bottom':
      return 'translateY(-10px);';

    case 'left':
      return 'translateX(10px);';

    case 'right':
      return 'translateX(-10px);';

    default:
      return '';
  }
};
