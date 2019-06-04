import * as React from 'react';
import Button from 'retail-ui/components/Button';
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

export default class SubmitValidationDemo extends React.Component<{}, State> {
  public state: State = {
    value: '',
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    return (
      <ValidationContainer ref={this.refContainer}>
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

          <Form.ActionsBar>
            <Button use={'primary'} onClick={this.handleSubmit}>Submit</Button>
          </Form.ActionsBar>
        </Form>
      </ValidationContainer>
    );
  }

  private validate = (value: string): Nullable<ValidationInfo> => {
    return !/^\d*$/.test(value) ? { message: 'Только цифры', type: 'submit' } : null;
  };

  private handleSubmit = async (): Promise<void> => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    await this.container.submit();
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
}
