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
