import React from 'react';
import { ClickableProps } from '../internal/Clickable';
import { LinkView } from './LinkView';

export type LinkUse = 'default' | 'success' | 'danger' | 'grayed';

export type LinkProps = ClickableProps & {
  use?: LinkUse;
  linkRef?: (node: HTMLElement | null) => void;
};

class Link extends React.Component<LinkProps> {
  private innerNode: HTMLElement | null = null;

  public focus() {
    if (this.innerNode) {
      this.innerNode.focus();
    }
  }

  public blur() {
    if (this.innerNode) {
      this.innerNode.blur();
    }
  }

  public render() {
    const { linkRef, ...rest } = this.props;
    return <LinkView {...rest} tabIndex={rest.disabled ? -1 : 0} clickableRef={this.refLink} />;
  }

  private refLink = (node: HTMLElement | null) => {
    this.innerNode = node;
    if (this.props.linkRef) {
      this.props.linkRef(node);
    }
  };
}

export default Link;
