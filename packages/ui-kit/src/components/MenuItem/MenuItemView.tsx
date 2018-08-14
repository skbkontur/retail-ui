import * as React from 'react';
// @ts-ignore: noUnusedLocals StyledComponentClass
import { StyledComponentClass } from 'styled-components';
import styled, { css, isTruthyProp } from '../../lib/styled-components';
import { DefaultThemeType } from '../../themes/default';
import { MenuItemThemeState } from '../../themes/default/menuItem';
import Clickable from '../internal/Clickable';
import { MenuItemState } from './MenuItem';
import { ifProp } from 'styled-tools';

export interface MenuItemContainerProps
  extends React.HTMLAttributes<HTMLSpanElement | HTMLAnchorElement> {
  state?: MenuItemState;
  disabled?: boolean;
  hover?: boolean;
  loose?: boolean;
  alkoLink?: boolean;
  withIcon?: boolean;
  select?: boolean;
}

const stateProp = (prop: string, state: MenuItemThemeState = 'default') => ({
  theme
}: {
  theme: DefaultThemeType;
}) => {
  return theme.menuItem[state][prop] || '';
};

const MenuItemContainer: React.SFC<MenuItemContainerProps> = ({
  disabled,
  children,
  select,
  hover,
  loose,
  alkoLink,
  withIcon,
  ...rest
}) => {
  return (
    <Clickable tabIndex={-1} {...rest}>
      {children}
    </Clickable>
  );
};

const commonStyles = css`
  padding: 6px 18px 7px 8px;
  white-space: nowrap;

  ${ifProp('withIcon')`
    padding-left: 36px;
  `};
`;

export const MenuSeparator = styled.div`
  border-top: 1px solid #e6e6e6;
  margin: 5px 0;
`;

export const MenuStaticItem = styled.div`
  ${commonStyles};
`;

export const MenuHeaderItem = styled(MenuStaticItem)`
  color: #a0a0a0;
  cursor: default;
  font-size: 12px;
`;

export const MenuItemStyledContainer = styled(MenuItemContainer)`
  ${commonStyles};

  position: relative;
  background: ${stateProp('background')};
  color: ${stateProp('color')};
  cursor: pointer;
  display: block;
  line-height: 18px;
  outline: none;
  text-decoration: none;
  text-align: left;
  width: 100%;

  ${isTruthyProp('disabled')`
    background: ${stateProp('background', 'disabled')};
    color: ${stateProp('color', 'disabled')};
    cursor: default;
  `}

  ${isTruthyProp('hover')`
    background: ${stateProp('background', 'hover')};
    color: ${stateProp('color', 'hover')};
  `}

  ${isTruthyProp('loose')`
    padding-left: 15px;
  `}

  ${isTruthyProp('alkoLink')`
    color: #3072c4;
  `}

  ${isTruthyProp('withIcon')`
    padding-left: 36px;
  `}

  ${isTruthyProp('select')`
    background: ${stateProp('background', 'selected')};
    color: ${stateProp('color', 'selected')};
  `}
`;

export const MenuItemIcon = styled.div`
  display: inline-block;
  position: absolute;
  left: 15px;
  top: 5px;
`;

export interface MenuItemCoommentProps {
  hover?: boolean;
}

const MenuItemComment: React.SFC<MenuItemCoommentProps> = ({ hover, children, ...rest }) => (
  <div {...rest}>{children}</div>
);

export const MenuItemStyledComment = styled(MenuItemComment)`
  white-space: normal;

  ${({ hover }) =>
    hover
      ? css`
          color: #a0a0a0;
        `
      : css`
          color: #fff;
          opacity: 0.6;
        `};
`;
