import * as React from 'react';
import Input from 'retail-ui/components/Input';
import {
  ValidationContainer,
  ValidationWrapperV1,
  ValidationInfo,
} from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import Form from '../../../Common/Form';

interface State {
  value: string;
}

export default class ImmediateValidationDemo extends React.Component<{}, State> {
  public state: State = {
    value: '',
  };

  public render() {
    return (
      <ValidationContainer>
        <Form>
          <Form.Line title="Номер">
            <ValidationWrapperV1 validationInfo={this.validate(this.state.value)}>
              <Input
                placeholder={'Только цифры'}
                value={this.state.value}
                onChange={(_, value) => this.setState({ value })}
              />
            </ValidationWrapperV1>
          </Form.Line>
        </Form>
      </ValidationContainer>
    );
  }

  private validate = (value: string): Nullable<ValidationInfo> => {
    return !/^\d*$/.test(value) ? { message: 'Только цифры', type: 'immediate' } : null;
  };
}
