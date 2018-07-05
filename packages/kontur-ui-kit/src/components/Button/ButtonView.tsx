// @ts-ignore: noUnusedLocals React
import React from 'react';
// @ts-ignore: noUnusedLocals StyledComponentClass
import { StyledComponentClass, ThemeProps } from 'styled-components';
import styled, { isTruthyProp } from '../../lib/styled-components';

import { DefaultThemeType } from '../../themes/default';

import { ControlState } from '../../themes/utils';
import Clickable from '../internal/Clickable';
import { FocusVisible } from '../internal/focus-visible-selector';
import { ButtonSize, ButtonUse } from './Button';

export type ViewProps = ThemeProps<DefaultThemeType> & { use?: ButtonUse; size?: ButtonSize };
export type ButtonTheme = DefaultThemeType['button'];
export type UseTheme = DefaultThemeType['button'][ButtonUse];
export type SizeTheme = DefaultThemeType['button'][ButtonSize];

const useTheme = ({ theme, use = 'default' }: ViewProps) => theme.button[use];
const useProp = <K extends keyof UseTheme>(prop: K, state?: ControlState) => (props: ViewProps) => {
  if (useTheme(props)) {
    if (state) {
      return useTheme(props)[state][prop];
    }
    return useTheme(props).default[prop];
  }

  return;
};

const sizeTheme = ({ theme, size = 'small' }: ViewProps) => theme.button[size];
const sizeProp = <K extends keyof SizeTheme>(prop: K) => (props: ViewProps) =>
  sizeTheme(props)[prop];

export const Caption = styled.span`
  display: flex;
  width: 100%;
`;

export const ButtonView = Clickable.extend`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  background: ${useProp('background')};
  color: ${useProp('color')};
  box-shadow: ${useProp('box-shadow')};
  border: ${useProp('border')};
  height: ${sizeProp('height')};
  padding-left: ${sizeProp('paddingHorizontal')};
  padding-right: ${sizeProp('paddingHorizontal')};
  font-size: ${sizeProp('fontSize')};
  border-radius: ${sizeProp('borderRadius')};

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  &:hover {
    background: ${useProp('background', 'hover')};
    box-shadow: ${useProp('box-shadow', 'hover')};
    border: ${useProp('border', 'hover')};
    color: ${useProp('color', 'hover')};
  }

  &:active {
    ${Caption} {
      transform: translateY(1px);
    }
    background: ${useProp('background', 'active')};
    color: ${useProp('color', 'active')};
    box-shadow: ${useProp('box-shadow', 'active')};
    border: ${useProp('border', 'active')};
  }

  ${FocusVisible} {
    box-shadow: ${useProp('box-shadow', 'focus')};
    border: ${useProp('border', 'focus')};
    color: ${useProp('color', 'focus')};
  }

  ${isTruthyProp('disabled')`
    color: ${useProp('color', 'disabled')};
    background: ${useProp('background', 'disabled')};
    box-shadow: ${useProp('box-shadow', 'disabled')};
    border: ${useProp('border', 'disabled')};
    pointer-events: none;
  `};
`;
