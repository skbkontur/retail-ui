import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Toggle } from '@skbkontur/react-ui/components/Toggle';

import { ValidationContainer, ValidationWrapper, createValidator } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

export default {
  title: 'Validator/MissingNodes',
  parameters: { creevey: { skip: true } },
} as Meta;

export const MissingObjectNode: Story = () => {
  interface ContactInfo {
    name: string;
    email: string;
  }

  interface Data {
    contact: Nullable<Partial<ContactInfo>>;
  }

  const validate = createValidator<Data>((b) => {
    b.prop(
      (x) => x.contact,
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
  const [contact, setContact] = React.useState<Nullable<Partial<ContactInfo>>>(null);

  function handleContactChange(value: Partial<ContactInfo>): void {
    if (!contact) {
      throw new Error('invalid state');
    }
    handleChange({ ...contact, ...value });
  }

  function handleChange(value: Partial<ContactInfo> | null): void {
    setContact((prevState) => ({ ...prevState, ...value }));
  }

  async function handleSubmit(): Promise<void> {
    if (await container.current?.validate()) {
      alert('success');
    }
  }

  const v = validate({ contact }).getNode((x) => x.contact);
  return (
    <ValidationContainer ref={container}>
      <Form>
        <Form.Line title="Валидации">JSON</Form.Line>

        <Form.Line title="Имя">{JSON.stringify(v.getNode((x) => x.name).get())}</Form.Line>

        <Form.Line title="E-mail">{JSON.stringify(v.getNode((x) => x.email).get())}</Form.Line>

        <Form.LineBreak />

        <Form.Line title="Указать контакты">
          <Toggle
            checked={!!contact}
            onValueChange={(checked) => handleChange(checked ? { name: '', email: '' } : null)}
          />
        </Form.Line>

        {contact && (
          <>
            <Form.Line title="Имя">
              <ValidationWrapper validationInfo={v.getNode((x) => x.name).get()}>
                <Input
                  placeholder={'Любое'}
                  value={contact.name}
                  onValueChange={(name) => handleContactChange({ name })}
                />
              </ValidationWrapper>
            </Form.Line>

            <Form.Line title="E-mail">
              <ValidationWrapper validationInfo={v.getNode((x) => x.email).get()}>
                <Input
                  placeholder={'xxx@xxx.xx'}
                  value={contact.email}
                  onValueChange={(email) => handleContactChange({ email })}
                />
              </ValidationWrapper>
            </Form.Line>
          </>
        )}

        <Form.ActionsBar>
          <Button use={'primary'} onClick={handleSubmit}>
            Submit
          </Button>
        </Form.ActionsBar>
      </Form>
    </ValidationContainer>
  );
};

export const MissingUiNode: Story = () => {
  interface ContactInfo {
    name: string;
    email: string;
  }

  interface Data {
    withContact: boolean;
    contact: ContactInfo;
  }

  const validate = createValidator<Data>((b) => {
    b.prop(
      (x) => x.contact,
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
  const [withContact, setWithContact] = React.useState<boolean>(false);
  const [contact, setContact] = React.useState<{
    name: string;
    email: string;
  }>({
    name: '',
    email: '',
  });

  function handleContactChange(value: Partial<ContactInfo>): void {
    setContact((prevState) => ({ ...prevState, ...value }));
  }

  async function handleSubmit(): Promise<void> {
    if (await container.current?.validate()) {
      alert('success');
    }
  }

  const v = validate({ contact, withContact }).getNode((x) => x.contact);
  return (
    <ValidationContainer ref={container}>
      <Form>
        <Form.Line title="Валидации">JSON</Form.Line>

        <Form.Line title="Имя">{JSON.stringify(v.getNode((x) => x.name).get())}</Form.Line>

        <Form.Line title="E-mail">{JSON.stringify(v.getNode((x) => x.email).get())}</Form.Line>

        <Form.LineBreak />

        <Form.Line title="Указать контакты">
          <Toggle checked={withContact} onValueChange={setWithContact} />
        </Form.Line>

        {withContact && (
          <>
            <Form.Line title="Имя">
              <ValidationWrapper validationInfo={v.getNode((x) => x.name).get()}>
                <Input
                  placeholder={'Любое'}
                  value={contact.name}
                  onValueChange={(name) => handleContactChange({ name })}
                />
              </ValidationWrapper>
            </Form.Line>

            <Form.Line title="E-mail">
              <ValidationWrapper validationInfo={v.getNode((x) => x.email).get()}>
                <Input
                  placeholder={'xxx@xxx.xx'}
                  value={contact.email}
                  onValueChange={(email) => handleContactChange({ email })}
                />
              </ValidationWrapper>
            </Form.Line>
          </>
        )}

        <Form.ActionsBar>
          <Button use={'primary'} onClick={handleSubmit}>
            Submit
          </Button>
        </Form.ActionsBar>
      </Form>
    </ValidationContainer>
  );
};
