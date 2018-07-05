// @ts-ignore: noUnusedLocals React
import React from 'react';
// @ts-ignore: noUnusedLocals StyledComponentClass
import { StyledComponentClass } from 'styled-components';
import styled, { css } from '../../lib/styled-components';

export type GappedAlign = 'baseline' | 'center' | 'flex-start' | 'flex-end';

export interface GappedProps {
  gap?: number;
  vertical?: boolean;

  align?: GappedAlign;
}

const Gapped = styled.div.attrs<GappedProps>({ gap: 10, align: 'baseline' })`
  ${props =>
    props.vertical
      ? css`
          display: flex;
          flex-direction: column;
          align-items: ${props.align};
          & > *:not(:first-child) {
            margin-top: ${props.gap}px;
          }
        `
      : css`
          display: flex;
          align-items: ${props.align};
          & > *:not(:first-child) {
            margin-left: ${props.gap}px;
          }
        `};
`;

export default Gapped;
