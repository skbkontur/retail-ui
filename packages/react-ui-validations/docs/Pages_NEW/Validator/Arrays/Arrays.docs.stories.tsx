import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';

import { createValidator, ValidationContainer, ValidationWrapper } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

export default {
  title: 'Описание валидаций/Валидация массивов',
  parameters: { creevey: { skip: true } },
} as Meta;

export const ObjectArray: Story = () => {
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
            b.invalid((x) => !x.includes('@'), 'Неверный формат email');
          },
        );
      },
    );
  });

  interface ObjectArrayDemoState {
    contacts: ContactInfo[];
  }
  class ObjectArrayDemo extends React.Component {
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

  return <ObjectArrayDemo />;
};

export const PrimitiveTypeArray: Story = () => {
  const validate = createValidator<string[]>((b) => {
    b.array(
      (x) => x,
      (b) => {
        b.invalid((x) => !x, 'Укажите email', 'submit');
        b.invalid((x) => !x.includes('@'), 'Неверный формат email');
      },
    );
  });

  class PrimitiveTypeArrayDemo extends React.Component {
    public state = {
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

  return <PrimitiveTypeArrayDemo />;
};
