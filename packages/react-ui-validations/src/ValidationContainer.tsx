import * as React from 'react';
import { Nullable } from '../typings/Types';
import ValidationContext from './ValidationContext';

export interface ValidationContainerProps {
  children?: React.ReactNode;
  onValidationUpdated?: (isValid?: Nullable<boolean>) => void;
  scrollOffset?: number;
}

export default class ValidationContainer extends React.Component<ValidationContainerProps> {
  private childContext: ValidationContext | null = null;
  public async submit(withoutFocus: boolean = false): Promise<void> {
    if (this.childContext) {
      await this.childContext.validate(withoutFocus);
    }
  }

  public validate(withoutFocus: boolean = false): Promise<boolean> | void {
    if (this.childContext) {
      return this.childContext.validate(withoutFocus);
    }
  }

  public render() {
    return (
      <ValidationContext
        ref={this.refChildContext}
        verticalOffset={this.props.scrollOffset || 50}
        onValidationUpdated={this.props.onValidationUpdated}
      >
        {this.props.children}
      </ValidationContext>
    );
  }

  private refChildContext = (el: ValidationContext | null) => (this.childContext = el);
}
