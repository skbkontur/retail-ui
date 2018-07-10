import React from 'react';
import { ClickableProps } from '../internal/Clickable';
import { ButtonView, Caption } from './ButtonView';

export type ButtonUse = 'default' | 'success' | 'primary' | 'danger' | 'pay';
export type ButtonSize = 'large' | 'medium' | 'small';

export type ButtonProps = ClickableProps & {
  use?: ButtonUse;
  buttonRef?: (node: HTMLElement | null) => void;
  size?: ButtonSize;
};

class Button extends React.Component<ButtonProps> {
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
    const { buttonRef, children, ...rest } = this.props;
    return (
      <ButtonView {...rest} tabIndex={rest.disabled ? -1 : 0} clickableRef={this.refButton}>
        <Caption>{children}</Caption>
      </ButtonView>
    );
  }

  private refButton = (node: HTMLElement | null) => {
    this.innerNode = node;
    if (this.props.buttonRef) {
      this.props.buttonRef(node);
    }
  };
}

export default Button;
