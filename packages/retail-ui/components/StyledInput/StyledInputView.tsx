// @ts-ignore: noUnusedLocals React
import * as React from 'react';
// @ts-ignore: noUnusedLocals StyledComponentClass
import { ThemeProps } from 'styled-components';
import styled, { isTruthyProp } from '../../lib/styled-components';
import { Override } from '../../lib/types';
import { DefaultThemeType } from '../../themes';
import { InputState } from '../../themes/input';

export type Sizes = 'large' | 'medium' | 'small';
type ViewProps = ThemeProps<DefaultThemeType> & {
  size?: Sizes;
  disabled?: boolean;
  warning?: boolean;
  error?: boolean;
  borderless?: boolean;
};
type SizeTheme = DefaultThemeType['input'][Sizes];

const sizeTheme = ({ theme, size = 'small' }: ViewProps) => theme.input[size];
const sizeProp = <K extends keyof SizeTheme>(prop: K) => (props: ViewProps) => sizeTheme(props)[prop];

const stateProp = (prop: string, state: InputState = 'default') => ({ theme }: ViewProps) => {
  return theme.input[state][prop] || '';
};

const InputIcon = styled.div`
  box-sizing: border-box;
  display: inline-block;
  position: absolute;
  width: ${({ theme }) => theme.input.iconWidth};
  top: 0;
  bottom: 0;
  height: 20px;
  margin: auto;
  color: #a9a9a9;
  cursor: text;
  z-index: 2;
`;

export const InputLeftIcon = styled(InputIcon)`
  left: 0;
  padding-left: ${({ theme }) => theme.input.padding};
`;

export const InputRightIcon = styled(InputIcon)`
  right: 0;
  padding-right: ${({ theme }) => theme.input.padding};
`;

export const InputWrapper = styled.span`
  display: inline-block;
  position: relative;
`;

export type InputProps = Override<
  React.InputHTMLAttributes<HTMLInputElement>,
  {
    hasLeftIcon?: boolean;
    hasRightIcon?: boolean;
    error?: boolean;
    warning?: boolean;
    borderless?: boolean;
    size?: Sizes;
    refInput?: (element: HTMLInputElement) => void;
  }
>;

const InputView: React.SFC<InputProps> = ({
  hasLeftIcon,
  hasRightIcon,
  error,
  warning,
  borderless,
  size,
  refInput,
  ...rest
}) => <input ref={refInput} {...rest} />;

export const InputStyledView = styled(InputView)`
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
  margin: 0; // For Safari.
  font-family: inherit;
  outline: none;
  white-space: nowrap;
  text-overflow: clip;
  transition: background-color 0.15s ease-in;
  -webkit-appearance: none;
  font-size: ${sizeProp('fontSize')};
  line-height: ${sizeProp('lineHeight')};
  padding-top: ${sizeProp('paddingTop')};
  padding-bottom: ${sizeProp('paddingBottom')};
  padding-left: ${props => (props.hasLeftIcon ? props.theme.input.iconWidth : props.theme.input.padding)};
  padding-right: ${props => (props.hasRightIcon ? props.theme.input.iconWidth : props.theme.input.padding)};
  border: ${stateProp('border')};
  border-top-color: ${stateProp('border-top-color')};
  box-shadow: ${stateProp('box-shadow')};
  background: ${stateProp('background')};
  color: ${stateProp('color')};

  &:before {
    content: '\a0';
  }

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-width: 2px;
    border: ${stateProp('border', 'focus')};
    box-shadow: ${stateProp('box-shadow', 'focus')};
    z-index: 2;

    &::placeholder {
      color: #bbb;
    }
  }

  ${isTruthyProp('error')`
    border: ${stateProp('border', 'error')};
    box-shadow: ${stateProp('box-shadow', 'error')};
    background: ${stateProp('background', 'error')};
  `}

  ${isTruthyProp('warning')`
    border: ${stateProp('border', 'warning')};
    box-shadow: ${stateProp('box-shadow', 'warning')};
    background: ${stateProp('background', 'warning')};
  `}

  ${isTruthyProp('disabled')`
    border: ${stateProp('border', 'disabled')};
    box-shadow: ${stateProp('box-shadow', 'disabled')};
    background: ${stateProp('background', 'disabled')};
    color: ${stateProp('color', 'disabled')};
    & ~ ${InputLeftIcon}, & ~ ${InputRightIcon} {
      cursor: default;
    }
  `}

  ${isTruthyProp('borderless')`
    border-color: transparent;
    box-shadow: none;
  `}
`;
