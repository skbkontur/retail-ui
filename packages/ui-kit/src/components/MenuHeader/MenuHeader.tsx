import * as React from 'react';
import styled, { isTruthyProp } from '../../lib/styled-components';

export interface MenuHeaderProps {
  _enableIconPadding?: boolean;
}

/**
 * Заголовок в меню.
 */
export default class MenuHeader extends React.Component<MenuHeaderProps> {
  private Component = styled.div`
    color: #a0a0a0;
    cursor: default;
    font-size: 12px;
    padding: 6px 18px 7px 8px;
    white-space: nowrap;

    ${isTruthyProp('enableIconPadding')`
      & {
        padding-left: 36px;
      }
    `};
  `;

  public render() {
    return <this.Component>{this.props.children}</this.Component>;
  }
}
