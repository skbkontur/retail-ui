import * as React from 'react';
import Input from 'retail-ui/components/Input';
import { ValidationContainer, ValidationWrapperV1 } from '../../../../src';
import Form from '../../../Common/Form';

interface State {
  value: string;
}

export default class ConditionalValidationDemo extends React.Component<{}, State> {
  public state: State = {
    value: '',
  };

  public render() {
    const { value } = this.state;

    const validationInfo = !/^\d*$/.test(value) ? { message: 'Только цифры' } : null;

    return (
      <ValidationContainer>
        <Form>
          <Form.Line title="Номер">
            <ValidationWrapperV1 validationInfo={validationInfo}>
              <Input
                placeholder={'Только цифры'}
                value={value}
                onChange={(_, v) => this.setState({ value: v })}
              />
            </ValidationWrapperV1>
          </Form.Line>
        </Form>
      </ValidationContainer>
    );
  }
}
