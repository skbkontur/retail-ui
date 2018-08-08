import * as React from 'react';
import { Transition } from 'react-transition-group';
import styled, { css } from '../../lib/styled-components';
import { switchProp, prop } from 'styled-tools';
import { TransitionProps } from 'react-transition-group/Transition';

export type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited' | 'unmounted';
export type Direction = 'top' | 'bottom' | 'left' | 'right';

const unmountedStyles = css`
  opacity: 0.01;
  transition: opacity 0.15s ease-out;
`;

const TransitionContent = styled<{ state: TransitionState; direction: Direction }, 'div'>('div')`
  ${switchProp('state', {
    entering: css`
      opacity: 0.01;
      transform: ${switchProp(prop('direction', ''), {
        top: 'translateY(10px)',
        bottom: 'translateY(-10px)',
        left: 'translateX(10px)',
        right: 'translateX(-10px)'
      })};
    `,
    entered: css`
      transition: transform 0.18s cubic-bezier(0.22, 0.61, 0.36, 1),
        opacity 0.18s cubic-bezier(0.22, 0.61, 0.36, 1);
      opacity: 1;
      transform: translate(0, 0);
    `,
    exiting: css`
      opacity: 1;
    `,
    exited: unmountedStyles,
    unmounted: unmountedStyles
  })};
`;

export interface TransitionWrapperProps extends TransitionProps {
  direction: Direction;
}

export const TransitionWrapper: React.SFC<TransitionWrapperProps> = ({
  direction,
  children,
  style,
  className,
  ...rest
}) => (
  <Transition {...rest}>
    {(state: TransitionState) => (
      <TransitionContent direction={direction} state={state} style={style} className={className}>
        {children}
      </TransitionContent>
    )}
  </Transition>
);
