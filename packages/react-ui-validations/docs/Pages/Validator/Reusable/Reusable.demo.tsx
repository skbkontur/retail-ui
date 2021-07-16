import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';

import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';
import {
  ValidationContainer,
  ValidationWrapper,
  createValidator,
  ValidationBuilder,
  ValidationRule,
} from '../../../../src';

interface State {
  email: string;
}

const isValidEmail = (value: string): boolean => {
  return /^[a-z]+@[a-z]+\.[a-z]+$/.test(value);
};

const emailRequired = (b: ValidationBuilder<unknown, string>): void => {
  b.invalid((x) => !x, 'Укажите email', 'submit');
};

const emailFormat = (b: ValidationBuilder<unknown, string>): void => {
  b.invalid((x) => !isValidEmail(x), 'Неверный формат email');
};

const validateEmail: ValidationRule<unknown, string> = (b) => {
  emailRequired(b);
  emailFormat(b);
};

const validate = createValidator<string>(validateEmail);

export default class ReusableDemo extends React.Component<{}, State> {
  public state: State = {
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
    if (!this.container) {
      throw new Error('invalid state');
    }
    if (await this.container.validate()) {
      alert('success');
    }
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
}
