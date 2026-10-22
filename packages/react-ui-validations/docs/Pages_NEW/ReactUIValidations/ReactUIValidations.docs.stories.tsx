import { Button } from '@skbkontur/react-ui/components/Button/Button';
import { Gapped } from '@skbkontur/react-ui/components/Gapped/Gapped';
import { Input } from '@skbkontur/react-ui/components/Input/Input';
import { MaskedInput } from '@skbkontur/react-ui/components/MaskedInput/MaskedInput';
import React from 'react';

import { ValidationContainer, ValidationWrapper, createValidator, text } from '../../../index.js';
import type { ValidationInfo } from '../../../index.js';
import type { Meta, Story } from '../../../typings/stories.js';
import type { Nullable } from '../../../typings/Types.js';

const meta: Meta = {
  title: 'React UI Validations',
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleSimple: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [email, setEmail] = React.useState('');
  const [isSent, setIsSent] = React.useState(false);

  function validateEmail(value: string): Nullable<ValidationInfo> {
    if (!value) {
      return { message: 'Укажите почту', type: 'submit' };
    }
    if (!value.includes('@')) {
      return { message: 'Неверный формат почты' };
    }
    return null;
  }

  async function handleSubmit() {
    setIsSent(Boolean(await container.current?.validate()));
  }

  return (
    <ValidationContainer ref={container}>
      <Gapped style={{ marginBottom: 8 }}>
        <ValidationWrapper validationInfo={validateEmail(email)} renderMessage={text('bottom')}>
          <Input
            placeholder="name@example.ru"
            value={email}
            onValueChange={(value) => {
              setEmail(value);
              setIsSent(false);
            }}
          />
        </ValidationWrapper>
        <Button use="outline" onClick={handleSubmit}>
          Подписаться
        </Button>
        {isSent && <>Выполнено</>}
      </Gapped>
    </ValidationContainer>
  );
};
ExampleSimple.storyName = 'Простой пример';

export const ExampleBasic: Story = () => {
  interface Organization {
    name: string;
    inn: string;
    kpp: string;
    email: string;
    phone: string;
  }

  const nameRequiredMessage = (
    <>
      Название организации нужно
      <br />
      для выставления документов
      <br />
      контрагентам и отчетности
    </>
  );

  const kppRequiredMessage = (
    <>
      Указан ИНН юридического
      <br />
      лица из 10 цифр, поэтому
      <br />
      должен быть заполнен КПП
    </>
  );

  const phoneFormatMessage = (
    <>
      Укажите телефон в формате
      <br />
      +7 900 123-45-67
    </>
  );

  const isValidUlInn = (value: string): boolean => {
    if (!/^([0-9][1-9]|[1-9][0-9])[0-9]{8}$/.test(value)) {
      return false;
    }

    const digits = value.split('').map(Number);

    const weights = [2, 4, 10, 3, 5, 9, 4, 6, 8];
    let sum = 0;
    for (let i = 0; i < 9; ++i) {
      sum += weights[i] * digits[i];
    }
    return sum !== 0 && (sum % 11) % 10 === digits[9];
  };

  const isValidIpInn = (value: string): boolean => {
    if (!/^([0-9][1-9]|[1-9][0-9])[0-9]{10}$/.test(value)) {
      return false;
    }

    const digits = value.split('').map(Number);

    const weights1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
    let sum1 = 0;
    for (let i = 0; i < 10; ++i) {
      sum1 += weights1[i] * digits[i];
    }
    if ((sum1 % 11) % 10 !== digits[10]) {
      return false;
    }

    const weights2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
    let sum2 = 0;
    for (let i = 0; i < 11; ++i) {
      sum2 += weights2[i] * digits[i];
    }
    return sum2 !== 0 && (sum2 % 11) % 10 === digits[11];
  };

  const isValidKpp = (value: string): boolean => {
    const kppRegExp = /^([0-9][1-9]|[1-9][0-9])([0-9]{2})([0-9A-Z]{2})([0-9]{3})$/;
    return kppRegExp.test(value);
  };

  const isValidEmail = (value: string): boolean => {
    return value.includes('@');
  };

  const isValidPhone = (value: string): boolean => {
    return /^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$/.test(value);
  };

  const isValidInn = (value: string): boolean => {
    switch (value.length) {
      case 10:
        return isValidUlInn(value);
      case 12:
        return isValidIpInn(value);
      default:
        throw new Error('ИНН должен состоять из 10 или 12 цифр');
    }
  };

  const validate = createValidator<Organization>((b, organization) => {
    b.prop(
      (x) => x.name,
      (b) => {
        b.invalid((x) => !x, nameRequiredMessage, 'submit');
      },
    );
    const isKppRequired = isValidUlInn(organization.inn);
    const isKppRequiredError = isKppRequired && !organization.kpp;
    b.prop(
      (x) => x.inn,
      (b) => {
        b.invalid((x) => !x, 'Укажите ИНН', 'submit');
        b.invalid((x) => x.length !== 10 && x.length !== 12, 'ИНН должен состоять из 10 или 12 цифр');
        b.invalid((x) => !isValidInn(x), 'Неверный ИНН');
        b.invalid(() => isKppRequiredError, kppRequiredMessage, 'submit');
      },
    );
    b.prop(
      (x) => x.kpp,
      (b) => {
        b.invalid(() => isKppRequiredError, kppRequiredMessage, 'submit');
        b.invalid((x) => isKppRequired && !isValidKpp(x), 'Неверный КПП');
      },
    );
    b.prop(
      (x) => x.email,
      (b) => {
        b.invalid((x) => !!x && !isValidEmail(x), 'Неверный адрес почты');
      },
    );
    b.prop(
      (x) => x.phone,
      (b) => {
        b.invalid((x) => !!x && !isValidPhone(x), phoneFormatMessage);
      },
    );
  });

  const container = React.useRef<ValidationContainer>(null);
  // Состояние как в примере из Гайдов: название пропущено, ИНН из 10 цифр без КПП, почта и телефон с ошибкой
  const [organization, setOrganization] = React.useState<Organization>({
    name: '',
    inn: '6663003127',
    kpp: '',
    email: 'info.kontur.ru',
    phone: '+7 912 345',
  });

  function handleChange(organization: Partial<Organization>): void {
    setOrganization((prevState) => ({ ...prevState, ...organization }));
  }

  async function handleSubmit(): Promise<void> {
    if (await container.current?.validate()) {
      alert('success');
    }
  }

  const validationInfo = validate(organization);
  return (
    <ValidationContainer ref={container}>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Название организации</div>
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.name).get()}>
            <Input value={organization.name} onValueChange={(value) => handleChange({ name: value })} />
          </ValidationWrapper>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>ИНН</div>
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.inn).get()}>
            <Input value={organization.inn} onValueChange={(value) => handleChange({ inn: value })} />
          </ValidationWrapper>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>КПП</div>
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.kpp).get()}>
            <Input value={organization.kpp} onValueChange={(value) => handleChange({ kpp: value })} />
          </ValidationWrapper>
        </div>

        <div style={{ height: 20 }} />

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Электронная почта</div>
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.email).get()}>
            <Input value={organization.email} onValueChange={(value) => handleChange({ email: value })} />
          </ValidationWrapper>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Телефон</div>
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.phone).get()}>
            <MaskedInput
              mask={'+7 999 999-99-99'}
              value={organization.phone}
              onValueChange={(value) => handleChange({ phone: value })}
            />
          </ValidationWrapper>
        </div>

        <div style={{ marginTop: 12, paddingLeft: 172 }}>
          <Button use="accent" onClick={handleSubmit}>
            Отправить
          </Button>
        </div>
      </div>
    </ValidationContainer>
  );
};
ExampleBasic.storyName = 'Форма организации';
