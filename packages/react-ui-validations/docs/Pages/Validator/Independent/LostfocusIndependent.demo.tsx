import React from 'react';
import { Input } from '@skbkontur/react-ui/components/Input';

import {
  ValidationContainer,
  ValidationWrapper,
  ValidationInfo,
  text,
} from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

interface LostfocusDependentErrorValidationDemoState {
  name: string;
  lastname: string;
}
export default class LostfocusDependentErrorValidationDemo extends React.Component {
  public state: LostfocusDependentErrorValidationDemoState = {
    name: '',
    lastname: '',
  };

  private validate = (value: string): Nullable<ValidationInfo> => {
    if (!value) {
      return { message: 'Не должно быть пустым', type: 'lostfocus', independent: true };
    }

    return null;
  };

  public render() {
    return (
      <ValidationContainer>
        <Form>
          <Form.Line title="Имя">
            <ValidationWrapper
              validationInfo={this.validate(this.state.name)}
              renderMessage={text('right')}
            >
              <Input
                placeholder={'Иван'}
                value={this.state.name}
                onValueChange={(name) => this.setState({ name })}
              />
            </ValidationWrapper>
          </Form.Line>
          <Form.Line title="Фамилия">
            <ValidationWrapper
              validationInfo={this.validate(this.state.lastname)}
              renderMessage={text('right')}
            >
              <Input
                placeholder={'Иванов'}
                value={this.state.lastname}
                onValueChange={(lastname) => this.setState({ lastname })}
              />
            </ValidationWrapper>
          </Form.Line>
        </Form>
      </ValidationContainer>
    );
  }
}
