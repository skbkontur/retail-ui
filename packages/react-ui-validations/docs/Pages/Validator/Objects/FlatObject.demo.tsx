import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';

import { createValidator, ValidationContainer, ValidationWrapper } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

interface ContactInfo {
  name: string;
  email: string;
}

const validate = createValidator<ContactInfo>((b) => {
  b.prop(
    (x) => x.name,
    (b) => {
      b.invalid((x) => !x, 'Укажите имя', 'submit');
    },
  );
  b.prop(
    (x) => x.email,
    (b) => {
      b.invalid((x) => !x, 'Укажите email', 'submit');
      b.invalid((x) => !/^[a-z]+@[a-z]+\.[a-z]+$/.test(x), 'Неверный формат email');
    },
  );
});

interface FlatObjectDemoState {
  contactInfo: ContactInfo;
}
export default class FlatObjectDemo extends React.Component {
  public state: FlatObjectDemoState = {
    contactInfo: {
      name: '',
      email: '',
    },
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    const { contactInfo } = this.state;
    const validation = validate(contactInfo);
    return (
      <ValidationContainer ref={this.refContainer}>
        <Form>
          <Form.Line title="Имя">
            <ValidationWrapper validationInfo={validation.getNode((x) => x.name).get()}>
              <Input
                placeholder={'Любое'}
                value={contactInfo.name}
                onValueChange={(name) => this.handleChange({ name })}
              />
            </ValidationWrapper>
          </Form.Line>

          <Form.Line title="E-mail">
            <ValidationWrapper validationInfo={validation.getNode((x) => x.email).get()}>
              <Input
                placeholder={'xxx@xxx.xx'}
                value={contactInfo.email}
                onValueChange={(email) => this.handleChange({ email })}
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

  private handleChange = (value: Partial<ContactInfo>): void => {
    this.setState({ contactInfo: { ...this.state.contactInfo, ...value } });
  };

  private handleSubmit = async (): Promise<void> => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    if (await this.container.validate()) {
      alert('success');
    }
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
}
