import React from 'react';
import warning from 'warning';

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
  scrollOffset?: ScrollOffset;
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

  private childContext: ValidationContextWrapper | null = null;

  public async submit(withoutFocus?: boolean): Promise<void>;
  public async submit(validationSettings?: ValidationSettings): Promise<void>;

  public async submit(
    withoutFocusOrValidationSettings: ValidateArgumentType = { focusMode: FocusMode.Errors },
  ): Promise<void> {
    if (this.childContext) {
      await this.childContext.validate(withoutFocusOrValidationSettings);
    }
    warning(false, 'childContext is not defined');
  }

  public async validate(withoutFocus?: boolean): Promise<boolean>;
  public async validate(validationSettings?: ValidationSettings): Promise<boolean>;

  public validate(
    withoutFocusOrValidationSettings: ValidateArgumentType = { focusMode: FocusMode.Errors },
  ): Promise<boolean> {
    if (!this.childContext) {
      warning(false, 'childContext is not defined');
      return Promise.resolve(false);
    }
    return this.childContext.validate(withoutFocusOrValidationSettings);
  }

  public render(): React.JSX.Element {
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
