import * as React from 'react';
import styled from '../../lib/styled-components';
import { prop } from 'styled-tools';
import Input, { InputProps } from '../Input';
import Popup, { PopupProps } from '../internal/Popup';

export const ComboboxWrapper = styled<{ width: React.CSSProperties['width'] }, 'div'>('div')`
  position: relative;
  display: inline-block;
  width: ${prop('width', 'auto')};
`;

export const ComboboxInput = styled<{ inputRef: (element: HTMLInputElement) => void } & InputProps>(
  ({ inputRef, ...rest }) => <Input innerRef={inputRef} {...rest} />
)`
  width: 100%;
`;

export interface ComboboxPopupProps extends PopupProps {
  width?: React.CSSProperties['width'];
}

export const ComboboxPopup = styled<ComboboxPopupProps>(({ width, ...rest }) => (
  <Popup {...rest} />
))`
  width: ${prop('width', '')};
`;

export const ComboboxArrow = styled.span`
  display: inline-block;
  margin-bottom: 2px;
  border: 4px solid transparent;
  border-top-color: #aaa;
  border-bottom-width: 0;
  z-index: 2;
  pointer-events: none;
`;
