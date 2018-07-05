import * as React from 'react';
// @ts-ignore: noUnusedLocals StyledComponentClass
import { StyledComponentClass } from 'styled-components';
import styled, { isTruthyProp } from '../../../lib/styled-components';

export interface InternalMenuWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  hasShadow?: boolean;
  ref?: (element: HTMLDivElement) => void;
}

export class InternalMenuWrapper extends React.Component<InternalMenuWrapperProps> {
  private node: HTMLDivElement | null = null;

  public render() {
    const { children, hasShadow, ...rest } = this.props;
    return (
      <div ref={element => (this.node = element)} {...rest}>
        {children}
      </div>
    );
  }

  public focus = () => {
    if (this.node && this.node.focus) {
      this.node.focus();
    }
  };
}

export const InternalMenuStyledWrapper = styled(InternalMenuWrapper)`
  background: ${({ theme }) => theme.internalMenu.background};
  overflow: auto;
  padding: 5px 0;
  outline: none;

  ${isTruthyProp('hasShadow')`
    border: 1px solid #d5d5d5;
    box-shadow: ${({ theme }) => theme.internalMenu['box-shadow']};
  `};
`;
