import React from 'react';
import { Input } from '@skbkontur/react-ui/components/Input';

import { ValidationContainer, ValidationWrapper, ValidationInfo } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

export default class ImmediateValidationDemo extends React.Component {
  public state = {
    value: '',
  };

  public render() {
    return (
      <ValidationContainer>
        <Form>
          <Form.Line title="Номер">
            <ValidationWrapper validationInfo={this.validate(this.state.value)}>
              <Input
                placeholder={'Только цифры'}
                value={this.state.value}
                onValueChange={(value) => this.setState({ value })}
              />
            </ValidationWrapper>
          </Form.Line>
        </Form>
      </ValidationContainer>
    );
  }

  private validate = (value: string): Nullable<ValidationInfo> => {
    return !/^\d*$/.test(value) ? { message: 'Только цифры', type: 'immediate' } : null;
  };
}
