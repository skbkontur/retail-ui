import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';

import { ValidationContainer, ValidationWrapper, ValidationInfo } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

export default class SubmitValidationDemo extends React.Component {
  public state = {
    value: '',
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    return (
      <ValidationContainer ref={this.refContainer}>
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

          <Form.ActionsBar>
            <Button use={'primary'} onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form.ActionsBar>
        </Form>
      </ValidationContainer>
    );
  }

  private validate = (value: string): Nullable<ValidationInfo> => {
    return !/^\d*$/.test(value) ? { message: 'Только цифры', type: 'submit' } : null;
  };

  private handleSubmit = async (): Promise<void> => {
    await this.container?.submit();
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
}
