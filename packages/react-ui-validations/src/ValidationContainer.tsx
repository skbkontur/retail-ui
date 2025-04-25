import React from 'react';

import type { Nullable } from '../typings/Types';

import { createPropsGetter } from './utils/createPropsGetter';
import { isTestEnv } from './utils/utils';
import { ValidationContextWrapper } from './ValidationContextWrapper';
import { FocusMode } from './FocusMode';

export interface ScrollOffset {
  top?: number;
  bottom?: number;
}

export interface ValidationSettings {
  focusMode: FocusMode;
}

export type ValidateArgumentType = boolean | ValidationSettings;

export interface ValidationContainerProps {
  'data-tid'?: string;
  children?: React.ReactNode;
  onValidationUpdated?: (isValid?: Nullable<boolean>) => void;
  scrollOffset?: number | ScrollOffset;
  disableSmoothScroll?: boolean;
}

type DefaultProps = Required<Pick<ValidationContainerProps, 'disableSmoothScroll'>>;

export class ValidationContainer extends React.Component<ValidationContainerProps> {
  public static __KONTUR_REACT_UI__ = 'ValidationContainer';
  public static displayName = 'ValidationContainer';

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

  public async submit(withoutFocus?: boolean): Promise<void>;
  public async submit(validationSettings?: ValidationSettings): Promise<void>;

  public async submit(
    withoutFocusOrValidationSettings: ValidateArgumentType = { focusMode: FocusMode.Errors },
  ): Promise<void> {
    if (!this.childContext) {
      throw new Error('childContext is not defined');
    }
    await this.childContext.validate(withoutFocusOrValidationSettings);
  }

  public async validate(withoutFocus?: boolean): Promise<boolean>;
  public async validate(validationSettings?: ValidationSettings): Promise<boolean>;

  public validate(
    withoutFocusOrValidationSettings: ValidateArgumentType = { focusMode: FocusMode.Errors },
  ): Promise<boolean> {
    if (!this.childContext) {
      throw new Error('childContext is not defined');
    }
    return this.childContext.validate(withoutFocusOrValidationSettings);
  }

  public render() {
    return (
      <ValidationContextWrapper
        data-tid={this.props['data-tid']}
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
