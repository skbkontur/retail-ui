import * as React from 'react';
// @ts-ignore: noUnusedLocals StyledComponentClass
import { StyledComponentClass, ThemeProps } from 'styled-components';
import styled from '../../lib/styled-components';

/**
 * Разделитель в меню.
 */
export default class MenuSeparator extends React.Component {
  private Component = styled.div`
    border-top: 1px solid #e6e6e6;
    margin: 5px 0;
  `;

  public render() {
    return <this.Component />;
  }
}
