import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';

import { ValidationContainer, ValidationWrapper, createValidator } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

interface PrimitiveTypeDemoState {
  email: string;
}

const validate = createValidator<string>((b) => {
  b.invalid((x) => !x, 'Укажите email', 'submit');
  b.invalid((x) => !x.includes('@'), 'Неверный формат email');
});

export default class PrimitiveTypeDemo extends React.Component {
  public state: PrimitiveTypeDemoState = {
    email: '',
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    const validation = validate(this.state.email);
    return (
      <ValidationContainer ref={this.refContainer}>
        <Form>
          <Form.Line title="E-mail">
            <ValidationWrapper validationInfo={validation.get()}>
              <Input
                placeholder={'xxx@xxx.xx'}
                value={this.state.email}
                onValueChange={(email) => this.setState({ email })}
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

  public handleSubmit = async (): Promise<void> => {
    if (await this.container?.validate()) {
      alert('success');
    }
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
}
