import * as React from 'react';
import Input from 'retail-ui/components/Input';
import DatePicker from 'retail-ui/components/DatePicker';
import { ValidationInfo, ValidationWrapperV1, RenderErrorMessage } from 'src/index';
import { Nullable } from 'typings/Types';

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
type ExtractValue<TProps> = TProps extends { value?: infer TValue } ? TValue : never;

function prepareProps<TValue, TProps extends { value?: any }>(
  props: WrappedProps<TValue, TProps>,
): PreparedProps<TProps> {
  const { required, email, validations = [], renderErrorMessage, ...rest } = props;
  const value = props.value;

  const conditions = validations.map(x => () => x(value));
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

function parseDate(value: Nullable<string>): Nullable<Date> {
  if (!value) {
    return null;
  }
  const match = /(\d{2}).(\d{2})\.(\d{4})/.exec(value);
  if (!match) {
    return null;
  }
  const [_, dd, mm, yyyy] = match;
  return new Date(`${yyyy}.${mm}.${dd}`);
}

export function lessThanDate(value: Date): ((value: Nullable<string>) => Nullable<ValidationInfo>) {
  return actualValue => {
    const actual = parseDate(actualValue);
    if (actual && !(actual < value)) {
      return { message: 'Значение должно быть меньше чем ' + value.toString() };
    }
    return undefined;
  };
}

function wrapControl<TProps extends { value?: any }>(
  controlType: React.ComponentType<TProps>,
): React.SFC<WrappedProps<ExtractValue<TProps>, TProps>> {
  return props => {
    const { controlProps, validationWrapperProps } = prepareProps(props);
    const control = React.createElement(controlType, controlProps) as React.ReactElement<any>;
    return React.createElement(ValidationWrapperV1, { ...validationWrapperProps, children: control });
  };
}

const WrappedInput = wrapControl(Input);
export { WrappedInput as Input };

const WrappedDatePicker = wrapControl(DatePicker);
export { WrappedDatePicker as DatePicker };
