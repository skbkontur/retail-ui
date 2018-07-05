// @ts-ignore: noUnusedLocals React
import React from 'react';
// @ts-ignore: noUnusedLocals StyledComponentClass
import { StyledComponentClass } from 'styled-components';
import styled from '../../lib/styled-components';

export const SelectCaptionInner = styled.div`
  position: relative;
  width: 100%;
  margin: 0 -6px;
  padding-right: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SelectArrowWrapper = styled.span`
  bottom: 0;
  position: absolute;
  right: 1px;
  top: 0;
`;

export const SelectArrow = styled.span`
  display: inline-block;
  margin: 0 0 3px 16px;
  color: inherit;
  border: 4px solid transparent;
  border-bottom-width: 0;
  border-top-color: inherit;
  opacity: 0.7;
`;

export const SelectPlaceholder = styled.span`
  color: inherit;
  opacity: 0.7;
`;

export const SelectCaptionWrapper = styled.span`
  display: inline-block;

  & > * {
    width: 100%;
    text-align: left;
  }
`;
