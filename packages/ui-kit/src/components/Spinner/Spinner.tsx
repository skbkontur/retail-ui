import * as React from 'react';
import styled, { keyframes } from '../../lib/styled-components';

export interface SpinnerProps {
  size?: number;
}

const offsetAnimation = keyframes`
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -37;
  }
`;

const lengthAnimation = keyframes`
  0% {
    stroke-dasharray: 10, 27;
  }

  50% {
    stroke-dasharray: 30, 7;
  }

  100% {
    stroke-dasharray: 10, 27;
  }
`;

const rotateAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const StyledContainer = styled.svg`
  fill: none;
  position: relative;
  stroke-dasharray: 10, 27;
  stroke-dashoffset: -37;
  stroke-width: 1.5px;
  top: 3px;
  stroke: #9b9b9b;

  animation: ${offsetAnimation} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
    ${lengthAnimation} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite,
    ${rotateAnimation} 2s linear infinite;

  & circle {
    fill: none;
    stroke-linecap: round;
  }
`;

const Spinner: React.SFC<SpinnerProps> = ({ size = 16 }) => (
  <StyledContainer width={size} height={size}>
    <circle cx={size / 2} cy={size / 2} r={size * 0.375} strokeWidth={1.5} />
  </StyledContainer>
);

export default Spinner;
