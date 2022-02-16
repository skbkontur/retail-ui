import React from 'react';
import { DatePicker } from '@skbkontur/react-ui/components/DatePicker';
import { Input } from '@skbkontur/react-ui/components/Input';

import { RenderErrorMessage, ValidationInfo, ValidationWrapper } from '../../../../src';
import { Nullable } from '../../../../typings/Types';

interface ValidationProps<TValue> {
  required?: boolean;
  email?: boolean;
  validations?: Array<(value: Nullable<TValue>) => Nullable<ValidationInfo>>;
  renderErrorMessage?: RenderErrorMessage;
}

interface PreparedProps<TProps> {
  validationWrapperProps: {
    validationInfo: Nullable<ValidationInfo>;
    renderMessage: Nullable<RenderErrorMessage>;
  };
  controlProps: TProps;
}

type WrappedProps<TValue, TProps extends { value?: TValue }> = TProps & ValidationProps<TValue>;

function prepareProps<TValue, TProps extends { value?: any }>(
  props: WrappedProps<TValue, TProps>,
): PreparedProps<TProps> {
  const { required, email, validations = [], renderErrorMessage, ...rest } = props;
  const value = props.value;

  const conditions = validations.map((x) => () => x(value));
  if (required) {
    conditions.push(() => {
      if (!value) {
        return { type: 'submit', message: 'Поле необходимо заполнить' };
      }
      return undefined;
    });
  }

  if (email) {
    conditions.push(() => {
      if (typeof value !== 'string' || !value.includes('@')) {
        return { message: 'Почта указана неверно' };
      }
      return undefined;
    });
  }

  const validationInfo = conditions.reduce((result, validation) => {
    const validationResult = validation();
    if (validationResult) {
      return { ...validationResult, ...(result as any) };
    }
    return result;
  }, undefined);

  return {
    validationWrapperProps: {
      validationInfo,
      renderMessage: renderErrorMessage,
    },
    controlProps: rest as any,
  };
}

type ExtractProps<TComponentOrTProps> = TComponentOrTProps extends React.ComponentType<infer P>
  ? P extends { value?: any }
    ? P
    : never
  : never;

type ExtractValue<TComponent> = ExtractProps<TComponent> extends { value?: null | infer TValue } ? TValue : never;

function wrapControl<TComponent extends React.ComponentType<ExtractProps<TComponent>>>(
  controlType: TComponent,
): React.ComponentType<
  WrappedProps<
    ExtractValue<TComponent>,
    JSX.LibraryManagedAttributes<TComponent, { value?: ExtractValue<TComponent> } & ExtractProps<TComponent>>
  >
> {
  return (props) => {
    const { controlProps, validationWrapperProps } = prepareProps(props);
    const control = React.createElement(controlType, controlProps) as React.ReactElement<any>;
    return React.createElement(ValidationWrapper, validationWrapperProps, control);
  };
}

const WrappedInput = wrapControl(Input);
const WrappedDatePicker = wrapControl(DatePicker);

export { WrappedInput as Input };
export { WrappedDatePicker as DatePicker };

export function lessThanDate(value: Date): (value: Nullable<string>) => Nullable<ValidationInfo> {
  return (actualValue) => {
    const actual = parseDate(actualValue);
    if (actual && !(actual < value)) {
      return { message: 'Значение должно быть меньше чем ' + value.toString() };
    }
    return undefined;
  };
}

function parseDate(value: Nullable<string>): Nullable<Date> {
  if (!value) {
    return null;
  }
  const match = /(\d{2}).(\d{2})\.(\d{4})/.exec(value);
  if (!match) {
    return null;
  }
  const [, dd, mm, yyyy] = match;
  return new Date(`${yyyy}.${mm}.${dd}`);
}
