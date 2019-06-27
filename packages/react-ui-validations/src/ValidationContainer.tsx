import * as React from 'react';
import ValidationContext from './ValidationContext';

export interface ScrollOffset {
  top?: number;
  bottom?: number;
}

export interface ValidationContainerProps {
  children?: React.ReactNode;
  onValidationUpdated?: (isValid: boolean) => void;
  scrollOffset?: number | ScrollOffset;
}

export default class ValidationContainer extends React.Component<ValidationContainerProps> {
  public static propTypes = {
    scrollOffset(props: ValidationContainerProps, propName: keyof ValidationContainerProps, componentName: string) {
      const { scrollOffset } = props;
      if (typeof scrollOffset === 'number') {
        return new Error(
          `[${componentName}]: scrollOffset as a number type has been deprecated, now use object { top?: number; bottom?: number; }`,
        );
      }
    },
  };

  private childContext: ValidationContext | null = null;

  public async submit(withoutFocus: boolean = false): Promise<void> {
    if (!this.childContext) {
      throw new Error('childContext is not defined');
    }
    await this.childContext.validate(withoutFocus);
  }

  public validate(withoutFocus: boolean = false): Promise<boolean> {
    if (!this.childContext) {
      throw new Error('childContext is not defined');
    }
    return this.childContext.validate(withoutFocus);
  }

  public render() {
    return (
      <ValidationContext
        ref={this.refChildContext}
        scrollOffset={this.props.scrollOffset}
        onValidationUpdated={this.props.onValidationUpdated}
      >
        {this.props.children}
      </ValidationContext>
    );
  }

  private refChildContext = (el: ValidationContext | null) => (this.childContext = el);
}
