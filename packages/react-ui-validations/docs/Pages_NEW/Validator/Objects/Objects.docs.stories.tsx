import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';

import { createValidator, ValidationContainer, ValidationWrapper } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

export default {
  title: 'Validator/Objects',
  parameters: { creevey: { skip: true } },
} as Meta;

export const FlatObject: Story = () => {
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
        b.invalid((x) => !x.includes('@'), 'Неверный формат email');
      },
    );
  });

  const container = React.useRef<ValidationContainer>(null);
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');

  async function handleSubmit(): Promise<void> {
    if (await container.current?.validate()) {
      alert('success');
    }
  }

  const validation = validate({ email, name });
  return (
    <ValidationContainer ref={container}>
      <Form>
        <Form.Line title="Имя">
          <ValidationWrapper validationInfo={validation.getNode((x) => x.name).get()}>
            <Input placeholder={'Любое'} value={name} onValueChange={setName} />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="E-mail">
          <ValidationWrapper validationInfo={validation.getNode((x) => x.email).get()}>
            <Input placeholder={'xxx@xxx.xx'} value={email} onValueChange={setEmail} />
          </ValidationWrapper>
        </Form.Line>

        <Form.ActionsBar>
          <Button use={'primary'} onClick={handleSubmit}>
            Submit
          </Button>
        </Form.ActionsBar>
      </Form>
    </ValidationContainer>
  );
};

export const NestedObject: Story = () => {
  interface FullName {
    surname: string;
    name: string;
  }

  interface ContactInfo {
    fullName: FullName;
    email: string;
  }

  const validate = createValidator<ContactInfo>((b) => {
    b.prop(
      (x) => x.fullName,
      (b) => {
        b.prop(
          (x) => x.name,
          (b) => {
            b.invalid((x) => !x, 'Укажите имя', 'submit');
          },
        );
        b.prop(
          (x) => x.surname,
          (b) => {
            b.invalid((x) => !x, 'Укажите фамилию', 'submit');
          },
        );
      },
    );
    b.prop(
      (x) => x.email,
      (b) => {
        b.invalid((x) => !x, 'Укажите email', 'submit');
        b.invalid((x) => !x.includes('@'), 'Неверный формат email');
      },
    );
  });

  const container = React.useRef<ValidationContainer>(null);
  const [contactInfo, setContactInfo] = React.useState<Nullable<Partial<ContactInfo>>>(null);

  const fullName = contactInfo?.fullName;

  function handleFullNameChange(value: Partial<FullName>): void {
    handleChange({ fullName: { ...fullName!, ...value } });
  }

  function handleChange(value: Partial<ContactInfo>): void {
    setContactInfo((prevState) => ({ ...prevState, ...value }));
  }

  async function handleSubmit(): Promise<void> {
    if (await container.current?.validate()) {
      alert('success');
    }
  }

  const validationInfo = validate((contactInfo ?? {}) as ContactInfo);
  return (
    <ValidationContainer ref={container}>
      <Form>
        <Form.Line title="Имя">
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.fullName.name).get()}>
            <Input
              placeholder={'Любое'}
              value={fullName?.name}
              onValueChange={(name) => handleFullNameChange({ name })}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="Фамилия">
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.fullName.surname).get()}>
            <Input
              placeholder={'Любая'}
              value={fullName?.surname}
              onValueChange={(surname) => handleFullNameChange({ surname })}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.Line title="E-mail">
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.email).get()}>
            <Input
              placeholder={'xxx@xxx.xx'}
              value={contactInfo?.email}
              onValueChange={(email) => handleChange({ email })}
            />
          </ValidationWrapper>
        </Form.Line>

        <Form.ActionsBar>
          <Button use={'primary'} onClick={handleSubmit}>
            Submit
          </Button>
        </Form.ActionsBar>
      </Form>
    </ValidationContainer>
  );
};

export const PrimitiveType: Story = () => {
  const validate = createValidator<string>((b) => {
    b.invalid((x) => !x, 'Укажите email', 'submit');
    b.invalid((x) => !x.includes('@'), 'Неверный формат email');
  });

  const container = React.useRef<ValidationContainer>(null);
  const [email, setEmail] = React.useState<string>('');

  async function handleSubmit(): Promise<void> {
    if (await container.current?.validate()) {
      alert('success');
    }
  }

  const validation = validate(email);
  return (
    <ValidationContainer ref={container}>
      <Form>
        <Form.Line title="E-mail">
          <ValidationWrapper validationInfo={validation.get()}>
            <Input placeholder={'xxx@xxx.xx'} value={email} onValueChange={setEmail} />
          </ValidationWrapper>
        </Form.Line>

        <Form.ActionsBar>
          <Button use={'primary'} onClick={handleSubmit}>
            Submit
          </Button>
        </Form.ActionsBar>
      </Form>
    </ValidationContainer>
  );
};
