import React from 'react';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Toggle } from '@skbkontur/react-ui/components/Toggle';

import { ValidationContainer, ValidationWrapper, createValidator } from '../../../../src';
import { Form } from '../../../Common/Form';

interface Data {
  onlyDigits: boolean;
  value: string;
}

const validate = createValidator<Data>((b, root) => {
  b.prop(
    (x) => x.value,
    (b) => {
      b.invalid((x) => root.onlyDigits && !/^\d*$/.test(x), 'Только цифры');
    },
  );
});

interface LostfocusValidationDemoState {
  data: Data;
}

export default class LostfocusValidationDemo extends React.Component {
  public state: LostfocusValidationDemoState = {
    data: {
      onlyDigits: false,
      value: '',
    },
  };

  public render() {
    const v = validate(this.state.data);
    return (
      <ValidationContainer>
        <Form>
          <Form.Line title="Только цифры">
            <Toggle
              checked={this.state.data.onlyDigits}
              onValueChange={(onlyDigits) => this.handleChange({ onlyDigits })}
            />
          </Form.Line>
          <Form.Line title="Значение">
            <ValidationWrapper validationInfo={v.getNode((x) => x.value).get()}>
              <Input
                placeholder={
                  this.state.data.onlyDigits ? 'Только цифры' : 'Любые символы'
                }
                value={this.state.data.value}
                onValueChange={(value) => this.handleChange({ value })}
              />
            </ValidationWrapper>
          </Form.Line>
        </Form>
      </ValidationContainer>
    );
  }

  private handleChange = (data: Partial<Data>) => {
    this.setState({ data: { ...this.state.data, ...data } });
  };
}
