// @ts-ignore: noUnusedLocals React
import React from 'react';
// @ts-ignore: noUnusedLocals StyledComponentClass
import { StyledComponentClass, ThemeProps } from 'styled-components';
import { CheckboxProps } from '.';
import styled, { css } from '../../lib/styled-components';
import { DefaultThemeType, getDefaultTheme } from '../../themes/default';
import { CheckboxState, CheckboxType } from '../../themes/default/checkbox';
import { FocusVisible } from '../internal/focus-visible-selector';
import IconOk from './IconOk';

export type ViewProps = ThemeProps<DefaultThemeType> & CheckboxProps;

const boxTheme = ({ theme }: ViewProps) => theme.checkbox.box;

const boxProp = (prop: keyof DefaultThemeType['checkbox']['box']) => (props: ViewProps) =>
  boxTheme(props)[prop];

const stateProp = (
  prop: string,
  state: CheckboxState = 'default',
  type: CheckboxType = 'unchecked'
) => ({ theme = getDefaultTheme() }: ViewProps) => {
  return theme.checkbox[type][state][prop] || '';
};

const getIconMargin = (props: ViewProps) => {
  const ICON_SIZE = 20;
  const boxSize = parseInt(boxProp('size')(props), 10);
  const baseNumber = (ICON_SIZE - boxSize) / 2;
  return css`
    margin-top: ${-baseNumber - 2}px;
    margin-left: ${-baseNumber}px;
  `;
};

export const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: baseline;
`;

export const CheckboxBox = styled.div`
  width: ${boxProp('size')};
  height: ${boxProp('size')};
  line-height: ${boxProp('size')};

  color: ${stateProp('color')};
  background: ${stateProp('background')};
  box-shadow: ${stateProp('box-shadow')};
  border: ${stateProp('border')};
  border-radius: ${boxProp('borderRadius')};
`;

export const CheckboxCaption = styled.span`
  margin-left: 10px;
`;

export const CheckboxIcon = styled(IconOk)`
  opacity: 0;
  flex-shrink: 0;
  vertical-align: middle;

  ${getIconMargin};

  fill: ${stateProp('color')};

  transform: scale(0.8);
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease-out;
`;

export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;

  &:hover + ${CheckboxBox} {
    color: ${stateProp('color', 'hover')};
    background: ${stateProp('background', 'hover')};
    box-shadow: ${stateProp('box-shadow', 'hover')};
    border: ${stateProp('border', 'hover')};
  }

  &:active + ${CheckboxBox} {
    color: ${stateProp('color', 'active')};
    background: ${stateProp('background', 'active')};
    box-shadow: ${stateProp('box-shadow', 'active')};
    border: ${stateProp('border', 'active')};
  }

  ${FocusVisible} {
    & + ${CheckboxBox} {
      box-shadow: ${stateProp('box-shadow', 'focus')};
    }
  }

  ${CheckboxBox} {
    background: ${stateProp('background')};
    box-shadow: ${stateProp('box-shadow')};
  }

  &:checked + ${CheckboxBox} {
    background: ${stateProp('background', 'default', 'checked')};
    box-shadow: ${stateProp('box-shadow', 'default', 'checked')};
  }

  &:checked + ${CheckboxBox} > ${CheckboxIcon} {
    opacity: 1;
    transform: scale(1);
    fill: ${stateProp('color', 'default', 'checked')};
  }

  &:disabled + ${CheckboxBox} {
    background: ${stateProp('background', 'disabled')};
    box-shadow: ${stateProp('box-shadow', 'disabled')};
    pointer-events: none;

    & > ${CheckboxIcon} {
      fill: ${props => stateProp('color', 'disabled')};
    }

    & + ${CheckboxCaption} {
      color: ${props => stateProp('color', 'disabled')};
    }
  }

  &:checked:disabled ${CheckboxBox} > ${CheckboxIcon} {
    background: ${stateProp('background', 'disabled', 'checked')};
    box-shadow: ${stateProp('box-shadow', 'disabled', 'checked')};

    & > ${CheckboxIcon} {
      fill: ${props => stateProp('color', 'disabled', 'checked')};
    }
  }
`;
