import React from 'react';
import { createPropsGetter } from '@skbkontur/react-ui/lib/createPropsGetter';

import { Nullable } from '../typings/Types';

import { isTestEnv } from './utils/utils';
import { ValidationContextWrapper } from './ValidationContextWrapper';

export interface ScrollOffset {
  top?: number;
  bottom?: number;
}

export interface ValidationContainerProps {
  children?: React.ReactNode;
  onValidationUpdated?: (isValid?: Nullable<boolean>) => void;
  scrollOffset?: number | ScrollOffset;
  disableSmoothScroll?: boolean;
}

type DefaultProps = Required<Pick<ValidationContainerProps, 'disableSmoothScroll'>>;

export class ValidationContainer extends React.Component<ValidationContainerProps> {
  public static __KONTUR_REACT_UI__ = 'ValidationContainer';

  public static defaultProps: DefaultProps = {
    disableSmoothScroll: isTestEnv,
  };

  private getProps = createPropsGetter(ValidationContainer.defaultProps);

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

  private childContext: ValidationContextWrapper | null = null;

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
      <ValidationContextWrapper
        ref={this.refChildContext}
        scrollOffset={this.props.scrollOffset}
        disableSmoothScroll={this.getProps().disableSmoothScroll}
        onValidationUpdated={this.props.onValidationUpdated}
      >
        {this.props.children}
      </ValidationContextWrapper>
    );
  }

  private refChildContext = (el: ValidationContextWrapper | null) => (this.childContext = el);
}
