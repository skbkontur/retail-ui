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

const validate = createValidator<ContactInfo[]>((b) => {
  b.array(
    (x) => x,
    (b) => {
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
    },
  );
});

interface ObjectArrayDemoState {
  contacts: ContactInfo[];
}

export default class ObjectArrayDemo extends React.Component {
  public state: ObjectArrayDemoState = {
    contacts: [
      { name: '', email: '' },
      { name: '', email: '' },
      { name: '', email: '' },
    ],
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    const validation = validate(this.state.contacts);
    return (
      <ValidationContainer ref={this.refContainer}>
        <Form>
          {this.state.contacts.map((contact, i) => {
            const v = validation.getNodeByIndex(i);
            return (
              <React.Fragment key={i}>
                <Form.Line title={'Контакт'}>{`#${i}`}</Form.Line>

                <Form.Line title={'Имя'}>
                  <ValidationWrapper validationInfo={v.getNode((x) => x.name).get()}>
                    <Input
                      placeholder={'Любое'}
                      value={contact.name}
                      onValueChange={(name) => this.handleItemChange({ name }, i)}
                    />
                  </ValidationWrapper>
                </Form.Line>

                <Form.Line title={'E-mail'}>
                  <ValidationWrapper validationInfo={v.getNode((x) => x.email).get()}>
                    <Input
                      placeholder={'xxx@xxx.xx'}
                      value={contact.email}
                      onValueChange={(email) => this.handleItemChange({ email }, i)}
                    />
                  </ValidationWrapper>
                </Form.Line>
              </React.Fragment>
            );
          })}

          <Form.ActionsBar>
            <Button use={'primary'} onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form.ActionsBar>
        </Form>
      </ValidationContainer>
    );
  }

  private handleItemChange = (item: Partial<ContactInfo>, index: number): void => {
    this.setState({
      contacts: this.state.contacts.map((x, i) => (i === index ? { ...x, ...item } : x)),
    });
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
