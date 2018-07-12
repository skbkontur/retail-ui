import * as React from 'react';
// @ts-ignore: noUnusedLocals StyledComponentClass
import { StyledComponentClass } from 'styled-components';
import styled, { css } from '../../lib/styled-components';

export const ScrollContainerWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export interface ScrollContainerScroll extends React.HTMLProps<HTMLDivElement> {
  invert?: boolean;
  hover?: boolean;
}

const ScrollContainerScroll: React.SFC<ScrollContainerScroll> = ({ invert, hover, ...rest }) => (
  <div {...rest} />
);

export const ScrollContainerStyledScroll = styled(ScrollContainerScroll)`
  position: absolute;
  right: 2px;
  transition: width 0.2s;
  width: ${({ hover }) => (hover ? '10px' : '4px')};
  z-index: 200;

  &:after {
    background: #b7b7b7;
    border-radius: 5px;
    bottom: 1px;
    content: '';
    display: block;
    left: 0;
    position: absolute;
    right: 0;
    top: 1px;
  }

  ${({ invert }) =>
    invert &&
    css`
      &:after {
        background: #ccc;
        background: rgba(255, 255, 255, 0.5);
      }
    `};
`;

export const ScrollContainerInner = styled.div`
  margin-bottom: -1px;
  max-height: 100%;
  // IE sometimes enabled scroll: http://codepen.io/anon/pen/RRrLNX
  padding-bottom: 1px;
  overflow-y: scroll;
`;
