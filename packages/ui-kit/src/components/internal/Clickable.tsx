import React from 'react';
// @ts-ignore: noUnusedLocals StyledComponentClass
import { StyledComponentClass } from 'styled-components';
import styled from '../../lib/styled-components';

export type ClickableProps = React.AnchorHTMLAttributes<HTMLElement> &
  React.ButtonHTMLAttributes<HTMLElement> & {
    component?: React.ComponentType<ClickableProps>;
    clickableRef?: (node: HTMLElement | null) => void;
  };

class ClickableView extends React.Component<ClickableProps> {
  public render() {
    const { component, clickableRef, ...rest } = this.props;
    let Component;
    if (component) {
      Component = component;
    } else {
      Component = rest.href ? 'a' : 'button';
    }
    return <Component {...rest} ref={clickableRef} />;
  }
}

const Clickable = styled(ClickableView)`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-decoration: none;
  cursor: pointer;
  font: inherit;
  color: inherit;
`;

export default Clickable;
