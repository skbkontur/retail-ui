import React from 'react';

import { Nullable } from '../typings/Types';

import { isTestEnv } from './utils';
import { ValidationContext } from './ValidationContext';

export interface ScrollOffset {
  top?: number;
  bottom?: number;
}

export interface ValidationContainerProps {
  children?: React.ReactNode;
  onValidationUpdated?: (isValid?: Nullable<boolean>) => void;
  scrollOffset?: number | ScrollOffset;
  disableSmoothScroll: boolean;
}

export class ValidationContainer extends React.Component<ValidationContainerProps> {
  public static __KONTUR_REACT_UI__ = 'ValidationContainer';

  public static defaultProps = {
    disableSmoothScroll: isTestEnv,
  };

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

  public async submit(withoutFocus = false): Promise<void> {
    if (!this.childContext) {
      throw new Error('childContext is not defined');
    }
    await this.childContext.validate(withoutFocus);
  }

  public validate(withoutFocus = false): Promise<boolean> {
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
        disableSmoothScroll={this.props.disableSmoothScroll}
        onValidationUpdated={this.props.onValidationUpdated}
      >
        {this.props.children}
      </ValidationContext>
    );
  }

  private refChildContext = (el: ValidationContext | null) => (this.childContext = el);
}
