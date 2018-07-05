// @ts-ignore: noUnusedLocals React
import React from 'react';
// @ts-ignore: noUnusedLocals StyledComponentClass
import { StyledComponentClass, ThemeProps } from 'styled-components';
import { isTruthyProp } from '../../lib/styled-components';
import { DefaultThemeType } from '../../themes/default';
import { ControlState } from '../../themes/utils';
import { ButtonUse } from '../Button/Button';
import Clickable from '../internal/Clickable';
import { FocusVisible } from '../internal/focus-visible-selector';
import { LinkUse } from './Link';

const useTheme = ({ theme, use = 'default' }: { theme: DefaultThemeType; use?: LinkUse }) =>
  theme.link[use];

const useProp = <K extends keyof DefaultThemeType['link'][LinkUse]>(
  prop: K,
  state?: ControlState
) => (props: ThemeProps<DefaultThemeType> & { use?: ButtonUse }) => {
  if (useTheme(props)) {
    if (state) {
      return useTheme(props)[state][prop];
    }

    return useTheme(props).default[prop];
  }

  return;
};

const hoverTextDecoration = ({ theme }: { theme: DefaultThemeType }) =>
  theme.link.hoverTextDecoration;

export const LinkView = Clickable.extend`
  outline: none;
  text-decoration: none;
  color: ${props => useProp('color')};

  &:hover {
    color: ${props => useProp('color', 'hover')};
  }

  ${FocusVisible} {
    color: ${props => useProp('color', 'focus')};
  }

  &:active {
    color: ${props => useProp('color', 'active')};
  }

  &:hover,
  ${FocusVisible} {
    text-decoration: ${hoverTextDecoration};
  }

  ${isTruthyProp('disabled')`
    color: ${useProp('color', 'disabled')};
    pointer-events: none;
  `};
`;
