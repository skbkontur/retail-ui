import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';

import { createValidator, ValidationContainer, ValidationWrapper } from '../../../../src';
import { Form } from '../../../Common/Form';

export default {
  title: 'Validator/Arrays',
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

  const container = React.useRef<ValidationContainer>(null);
  const [contacts, setContacts] = React.useState<ContactInfo[]>([
    { name: '', email: '' },
    { name: '', email: '' },
    { name: '', email: '' },
  ]);

  function handleItemChange(item: Partial<ContactInfo>, index: number): void {
    setContacts((prevState) => prevState.map((x, i) => (i === index ? { ...x, ...item } : x)));
  }

  async function handleSubmit() {
    if (await container.current?.validate()) {
      alert('success');
    }
  }

  const validation = validate(contacts);
  return (
    <ValidationContainer ref={container}>
      <Form>
        {contacts.map((contact, i) => {
          const v = validation.getNodeByIndex(i);
          return (
            <React.Fragment key={i}>
              <Form.Line title={'Контакт'}>{`#${i}`}</Form.Line>

              <Form.Line title={'Имя'}>
                <ValidationWrapper validationInfo={v.getNode((x) => x.name).get()}>
                  <Input
                    placeholder={'Любое'}
                    value={contact.name}
                    onValueChange={(name) => handleItemChange({ name }, i)}
                  />
                </ValidationWrapper>
              </Form.Line>

              <Form.Line title={'E-mail'}>
                <ValidationWrapper validationInfo={v.getNode((x) => x.email).get()}>
                  <Input
                    placeholder={'xxx@xxx.xx'}
                    value={contact.email}
                    onValueChange={(email) => handleItemChange({ email }, i)}
                  />
                </ValidationWrapper>
              </Form.Line>
            </React.Fragment>
          );
        })}

        <Form.ActionsBar>
          <Button use={'primary'} onClick={handleSubmit}>
            Submit
          </Button>
        </Form.ActionsBar>
      </Form>
    </ValidationContainer>
  );
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

  const container = React.useRef<ValidationContainer>(null);
  const [emails, setEmails] = React.useState<string[]>(['', '', '']);

  function handleEmailChange(email: string, index: number): void {
    setEmails((prevState) => prevState.map((x, i) => (i === index ? email : x)));
  }

  async function handleSubmit() {
    if (await container.current?.validate()) {
      alert('success');
    }
  }

  const validationInfo = validate(emails);
  return (
    <ValidationContainer ref={container}>
      <Form>
        {emails.map((email, i) => (
          <Form.Line title={`E-mail #${i}`} key={i}>
            <ValidationWrapper validationInfo={validationInfo.getNodeByIndex(i).get()}>
              <Input placeholder={'xxx@xxx.xx'} value={email} onValueChange={(value) => handleEmailChange(value, i)} />
            </ValidationWrapper>
          </Form.Line>
        ))}

        <Form.ActionsBar>
          <Button use={'primary'} onClick={handleSubmit}>
            Submit
          </Button>
        </Form.ActionsBar>
      </Form>
    </ValidationContainer>
  );
};
