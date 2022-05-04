import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';

import { ValidationContainer, ValidationWrapper, createValidator } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

const validate = createValidator<string[]>((b) => {
  b.array(
    (x) => x,
    (b) => {
      b.invalid((x) => !x, 'Укажите email', 'submit');
      b.invalid((x) => !/^[a-z]+@[a-z]+\.[a-z]+$/.test(x), 'Неверный формат email');
    },
  );
});

interface PrimitiveTypeArrayDemoState {
  emails: string[];
}

export default class PrimitiveTypeArrayDemo extends React.Component {
  public state: PrimitiveTypeArrayDemoState = {
    emails: ['', '', ''],
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    const validation = validate(this.state.emails);
    return (
      <ValidationContainer ref={this.refContainer}>
        <Form>
          {this.state.emails.map((email, i) => (
            <Form.Line title={`E-mail #${i}`} key={i}>
              <ValidationWrapper validationInfo={validation.getNodeByIndex(i).get()}>
                <Input
                  placeholder={'xxx@xxx.xx'}
                  value={email}
                  onValueChange={(value) => this.handleEmailChange(value, i)}
                />
              </ValidationWrapper>
            </Form.Line>
          ))}

          <Form.ActionsBar>
            <Button use={'primary'} onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form.ActionsBar>
        </Form>
      </ValidationContainer>
    );
  }

  private handleEmailChange = (email: string, index: number): void => {
    const emails = this.state.emails.map((x, i) => (i === index ? email : x));
    this.setState({ emails });
  };

  private handleSubmit = async () => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    if (await this.container.validate()) {
      alert('success');
    }
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
}
