import { Button, Gapped, Group, Input, Toggle } from '@skbkontur/react-ui';
import { createValidator, text, ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import type { ValidationBehaviour, ValidationInfo } from '@skbkontur/react-ui-validations';
import { isNonNullable } from '@skbkontur/react-ui/lib/utils';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';
import type { Nullable } from '../../../typings/Types.js';

const meta: Meta = {
  title: 'CreateValidator',
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleFlatObject: Story = () => {
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
  const [isSent, setIsSent] = React.useState(false);
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');

  async function handleSubmit(): Promise<void> {
    setIsSent(Boolean(await container.current?.validate()));
  }

  const validation = validate({ email, name });
  return (
    <ValidationContainer ref={container}>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Имя</div>
          <ValidationWrapper validationInfo={validation.getNode((x) => x.name).get()}>
            <Input placeholder={'Любое'} value={name} onValueChange={setName} />
          </ValidationWrapper>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>E-mail</div>
          <ValidationWrapper validationInfo={validation.getNode((x) => x.email).get()}>
            <Input placeholder={'xxx@xxx.xx'} value={email} onValueChange={setEmail} />
          </ValidationWrapper>
        </div>

        <div style={{ marginTop: 12, paddingLeft: 172 }}>
          <Button use="accent" onClick={handleSubmit}>
            Отправить
          </Button>
          {isSent && <span style={{ marginLeft: 12 }}>Форма отправлена</span>}
        </div>
      </div>
    </ValidationContainer>
  );
};
ExampleFlatObject.storyName = 'Плоский объект';

export const ExampleNestedObject: Story = () => {
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
  const [isSent, setIsSent] = React.useState(false);
  const [contactInfo, setContactInfo] = React.useState<Nullable<Partial<ContactInfo>>>(null);

  const fullName = contactInfo?.fullName;

  function handleFullNameChange(value: Partial<FullName>): void {
    handleChange({ ...(fullName ? { fullName } : {}), ...value });
  }

  function handleChange(value: Partial<ContactInfo>): void {
    setContactInfo((prevState) => ({ ...prevState, ...value }));
  }

  async function handleSubmit(): Promise<void> {
    setIsSent(Boolean(await container.current?.validate()));
  }

  const validationInfo = validate((contactInfo ?? {}) as ContactInfo);
  return (
    <ValidationContainer ref={container}>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Имя</div>
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.fullName.name).get()}>
            <Input
              placeholder={'Любое'}
              value={fullName?.name}
              onValueChange={(name) => handleFullNameChange({ name })}
            />
          </ValidationWrapper>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Фамилия</div>
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.fullName.surname).get()}>
            <Input
              placeholder={'Любая'}
              value={fullName?.surname}
              onValueChange={(surname) => handleFullNameChange({ surname })}
            />
          </ValidationWrapper>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>E-mail</div>
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.email).get()}>
            <Input
              placeholder={'xxx@xxx.xx'}
              value={contactInfo?.email}
              onValueChange={(email) => handleChange({ email })}
            />
          </ValidationWrapper>
        </div>

        <div style={{ marginTop: 12, paddingLeft: 172 }}>
          <Button use="accent" onClick={handleSubmit}>
            Отправить
          </Button>
          {isSent && <span style={{ marginLeft: 12 }}>Форма отправлена</span>}
        </div>
      </div>
    </ValidationContainer>
  );
};
ExampleNestedObject.storyName = 'Вложенный объект';

export const ExamplePrimitiveType: Story = () => {
  const validate = createValidator<string>((b) => {
    b.invalid((x) => !x, 'Укажите email', 'submit');
    b.invalid((x) => !x.includes('@'), 'Неверный формат email');
  });

  const container = React.useRef<ValidationContainer>(null);
  const [isSent, setIsSent] = React.useState(false);
  const [email, setEmail] = React.useState<string>('');

  async function handleSubmit(): Promise<void> {
    setIsSent(Boolean(await container.current?.validate()));
  }

  const validation = validate(email);
  return (
    <ValidationContainer ref={container}>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>E-mail</div>
          <ValidationWrapper validationInfo={validation.get()}>
            <Input placeholder={'xxx@xxx.xx'} value={email} onValueChange={setEmail} />
          </ValidationWrapper>
        </div>

        <div style={{ marginTop: 12, paddingLeft: 172 }}>
          <Button use="accent" onClick={handleSubmit}>
            Отправить
          </Button>
          {isSent && <span style={{ marginLeft: 12 }}>Форма отправлена</span>}
        </div>
      </div>
    </ValidationContainer>
  );
};
ExamplePrimitiveType.storyName = 'Примитивное значение';

export const ExampleObjectArray: Story = () => {
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
  const [isSent, setIsSent] = React.useState(false);
  const [contacts, setContacts] = React.useState<ContactInfo[]>([
    { name: '', email: '' },
    { name: '', email: '' },
    { name: '', email: '' },
  ]);

  function handleItemChange(item: Partial<ContactInfo>, index: number): void {
    setContacts((prevState) => prevState.map((x, i) => (i === index ? { ...x, ...item } : x)));
  }

  async function handleSubmit() {
    setIsSent(Boolean(await container.current?.validate()));
  }

  const validation = validate(contacts);
  return (
    <ValidationContainer ref={container}>
      <div>
        {contacts.map((contact, i) => {
          const v = validation.getNodeByIndex(i);
          return (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 160, textAlign: 'right' }}>Контакт</div>
                {`#${i}`}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 160, textAlign: 'right' }}>Имя</div>
                <ValidationWrapper validationInfo={v.getNode((x) => x.name).get()}>
                  <Input
                    placeholder={'Любое'}
                    value={contact.name}
                    onValueChange={(name) => handleItemChange({ name }, i)}
                  />
                </ValidationWrapper>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 160, textAlign: 'right' }}>E-mail</div>
                <ValidationWrapper validationInfo={v.getNode((x) => x.email).get()}>
                  <Input
                    placeholder={'xxx@xxx.xx'}
                    value={contact.email}
                    onValueChange={(email) => handleItemChange({ email }, i)}
                  />
                </ValidationWrapper>
              </div>
            </React.Fragment>
          );
        })}

        <div style={{ marginTop: 12, paddingLeft: 172 }}>
          <Button use="accent" onClick={handleSubmit}>
            Отправить
          </Button>
          {isSent && <span style={{ marginLeft: 12 }}>Форма отправлена</span>}
        </div>
      </div>
    </ValidationContainer>
  );
};
ExampleObjectArray.storyName = 'Массив объектов';

export const ExamplePrimitiveTypeArray: Story = () => {
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
  const [isSent, setIsSent] = React.useState(false);
  const [emails, setEmails] = React.useState<string[]>(['', '', '']);

  function handleEmailChange(email: string, index: number): void {
    setEmails((prevState) => prevState.map((x, i) => (i === index ? email : x)));
  }

  async function handleSubmit() {
    setIsSent(Boolean(await container.current?.validate()));
  }

  const validationInfo = validate(emails);
  return (
    <ValidationContainer ref={container}>
      <div>
        {emails.map((email, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 160, textAlign: 'right' }}>{`E-mail #${i}`}</div>
            <ValidationWrapper validationInfo={validationInfo.getNodeByIndex(i).get()}>
              <Input placeholder={'xxx@xxx.xx'} value={email} onValueChange={(value) => handleEmailChange(value, i)} />
            </ValidationWrapper>
          </div>
        ))}

        <div style={{ marginTop: 12, paddingLeft: 172 }}>
          <Button use="accent" onClick={handleSubmit}>
            Отправить
          </Button>
          {isSent && <span style={{ marginLeft: 12 }}>Форма отправлена</span>}
        </div>
      </div>
    </ValidationContainer>
  );
};
ExamplePrimitiveTypeArray.storyName = 'Массив значений';

export const ExampleArrayDuplicates: Story = () => {
  const getDuplicatesFor = (items: string[], index: number): number[] => {
    return items
      .map((x, i) => (x === items[index] && i !== index ? i : null))
      .filter((x) => isNonNullable(x)) as number[];
  };

  const validate = createValidator<string[]>((b, a) => {
    b.array(
      (x) => x,
      (b, v, i) => {
        b.invalid((x) => !x, 'Укажите значение', 'submit');
        b.invalid((x) => !/^\d+$/.test(x), 'Только цифры');
        const d = getDuplicatesFor(a, i);
        b.invalid(() => !!d.length, 'Дубль со строками ' + d.map((x) => x + 1).join(', '));
      },
    );
  });

  const container = React.useRef<ValidationContainer>(null);
  const [isSent, setIsSent] = React.useState(false);
  const [values, setValues] = React.useState<string[]>(['']);
  const validation = validate(values);

  function handleChange(value: string, index: number): void {
    setValues((values) => values.map((x, i) => (i === index ? value : x)));
  }

  function handleAdd(): void {
    setValues((values) => [...values, '']);
  }

  function handleRemove(index: number): void {
    setValues((values) => {
      const filtered = values.filter((x, i) => i !== index);
      return filtered.length ? filtered : [''];
    });
  }

  async function handleSubmit() {
    setIsSent(Boolean(await container.current?.validate()));
  }

  return (
    <ValidationContainer ref={container}>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}></div>
          <Button onClick={handleAdd}>
            <b>+</b> Добавить
          </Button>
        </div>

        {values.map((value, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 160, textAlign: 'right' }}>{`Значение #${i + 1}`}</div>
            <Group>
              <Button onClick={() => handleRemove(i)}>
                <b>x</b>
              </Button>
              <ValidationWrapper validationInfo={validation.getNodeByIndex(i).get()} renderMessage={text()}>
                <Input placeholder={'Только цифры'} value={value} onValueChange={(v) => handleChange(v, i)} />
              </ValidationWrapper>
            </Group>
          </div>
        ))}

        <div style={{ marginTop: 12, paddingLeft: 172 }}>
          <Button use="accent" onClick={handleSubmit}>
            Отправить
          </Button>
          {isSent && <span style={{ marginLeft: 12 }}>Форма отправлена</span>}
        </div>
      </div>
    </ValidationContainer>
  );
};
ExampleArrayDuplicates.storyName = 'Проверка дублей';

export const ExampleDependent: Story = () => {
  interface Data {
    onlyDigits: boolean;
    value: string;
  }

  const validate = createValidator<Data>((b, root) => {
    b.prop(
      (x) => x.value,
      (b) => {
        b.invalid((x) => root.onlyDigits && !/^\d*$/.test(x), 'Только цифры');
      },
    );
  });

  const [value, setValue] = React.useState<string>('');
  const [onlyDigits, setOnlyDigits] = React.useState<boolean>(false);

  const validationInfo = validate({ value, onlyDigits });
  return (
    <ValidationContainer>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Только цифры</div>
          <Toggle checked={onlyDigits} onValueChange={setOnlyDigits} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Значение</div>
          <ValidationWrapper validationInfo={validationInfo.getNode((x) => x.value).get()}>
            <Input placeholder={onlyDigits ? 'Только цифры' : 'Любые символы'} value={value} onValueChange={setValue} />
          </ValidationWrapper>
        </div>
      </div>
    </ValidationContainer>
  );
};
ExampleDependent.storyName = 'Зависимые правила';

export const ExampleIndependent: Story = () => {
  const [name, setName] = React.useState<string>('');
  const [lastname, setLastname] = React.useState<string>('');

  function validate(value: string): Nullable<ValidationInfo> {
    if (value && value.length < 2) {
      return { message: 'Минимум 2 символа', type: 'lostfocus', independent: true };
    }

    return null;
  }

  return (
    <ValidationContainer>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Имя</div>
          <ValidationWrapper validationInfo={validate(name)} renderMessage={text('right')}>
            <Input placeholder={'Иван'} value={name} onValueChange={setName} />
          </ValidationWrapper>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Фамилия</div>
          <ValidationWrapper validationInfo={validate(lastname)} renderMessage={text('right')}>
            <Input placeholder={'Иванов'} value={lastname} onValueChange={setLastname} />
          </ValidationWrapper>
        </div>
      </div>
    </ValidationContainer>
  );
};
ExampleIndependent.storyName = 'Независимые правила';

export const ExampleMixture: Story = () => {
  interface DependsType {
    immediate: string;
    lostfocus: string;
    submit: string;
  }

  const container = React.useRef<ValidationContainer>(null);
  const [dependents, setDependents] = React.useState<DependsType>({ immediate: '', lostfocus: '', submit: '' });
  const [independents, setIndependents] = React.useState<DependsType>({ immediate: '', lostfocus: '', submit: '' });
  const [reset, setReset] = React.useState<number>(1);

  function validate(v: string, type: ValidationBehaviour, independent = false): Nullable<ValidationInfo> {
    if (v && v.length < 2) {
      return { message: 'Минимум 2 символа', type, independent };
    }
    return null;
  }

  function handleChangeDependents(value: Partial<DependsType>) {
    setDependents((prevState) => ({ ...prevState, ...value }));
  }

  function handleChangeIndependents(value: Partial<DependsType>): void {
    setIndependents((prevState) => ({ ...prevState, ...value }));
  }

  const handleSubmit = () => container.current?.validate();

  const handleReset = () => setReset(Math.random());

  return (
    <ValidationContainer key={reset} ref={container}>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}></div>
          <code>immediate</code>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Зависимая</div>
          <ValidationWrapper renderMessage={text('right')} validationInfo={validate(dependents.immediate, 'immediate')}>
            <Input
              placeholder="Минимум 2 символа"
              value={dependents.immediate}
              onValueChange={(value) => handleChangeDependents({ immediate: value })}
            />
          </ValidationWrapper>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Независимая</div>
          <ValidationWrapper
            renderMessage={text('right')}
            validationInfo={validate(independents.immediate, 'immediate', true)}
          >
            <Input
              placeholder="Минимум 2 символа"
              value={independents.immediate}
              onValueChange={(value) => handleChangeIndependents({ immediate: value })}
            />
          </ValidationWrapper>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}></div>
          <code>lostfocus</code>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Зависимая</div>
          <ValidationWrapper renderMessage={text('right')} validationInfo={validate(dependents.lostfocus, 'lostfocus')}>
            <Input
              placeholder="Минимум 2 символа"
              value={dependents.lostfocus}
              onValueChange={(value) => handleChangeDependents({ lostfocus: value })}
            />
          </ValidationWrapper>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Независимая</div>
          <ValidationWrapper
            renderMessage={text('right')}
            validationInfo={validate(independents.lostfocus, 'lostfocus', true)}
          >
            <Input
              placeholder="Минимум 2 символа"
              value={independents.lostfocus}
              onValueChange={(value) => handleChangeIndependents({ lostfocus: value })}
            />
          </ValidationWrapper>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}></div>
          <code>submit</code>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Зависимая</div>
          <ValidationWrapper renderMessage={text('right')} validationInfo={validate(dependents.submit, 'submit')}>
            <Input
              placeholder="Минимум 2 символа"
              value={dependents.submit}
              onValueChange={(value) => handleChangeDependents({ submit: value })}
            />
          </ValidationWrapper>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Независимая</div>
          <ValidationWrapper
            renderMessage={text('right')}
            validationInfo={validate(independents.submit, 'submit', true)}
          >
            <Input
              placeholder="Минимум 2 символа"
              value={independents.submit}
              onValueChange={(value) => handleChangeIndependents({ submit: value })}
            />
          </ValidationWrapper>
        </div>

        <br />

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}></div>
          <Gapped>
            <Button use="accent" onClick={handleSubmit}>
              Отправить
            </Button>
            <Button use="pay" onClick={handleReset}>
              Очистить
            </Button>
          </Gapped>
        </div>
      </div>
    </ValidationContainer>
  );
};
ExampleMixture.storyName = 'Зависимые и независимые правила';

export const ExampleMissingObjectNode: Story = () => {
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
  const [isSent, setIsSent] = React.useState(false);
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
    setIsSent(Boolean(await container.current?.validate()));
  }

  const v = validate({ contact }).getNode((x) => x.contact);
  return (
    <ValidationContainer ref={container}>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Валидации</div>JSON
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Имя</div>
          {JSON.stringify(v.getNode((x) => x.name).get())}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>E-mail</div>
          {JSON.stringify(v.getNode((x) => x.email).get())}
        </div>

        <div style={{ height: 20 }} />

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Указать контакты</div>
          <Toggle
            checked={!!contact}
            onValueChange={(checked) => handleChange(checked ? { name: '', email: '' } : null)}
          />
        </div>

        {contact && (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 160, textAlign: 'right' }}>Имя</div>
              <ValidationWrapper validationInfo={v.getNode((x) => x.name).get()}>
                <Input
                  placeholder={'Любое'}
                  value={contact.name}
                  onValueChange={(name) => handleContactChange({ name })}
                />
              </ValidationWrapper>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 160, textAlign: 'right' }}>E-mail</div>
              <ValidationWrapper validationInfo={v.getNode((x) => x.email).get()}>
                <Input
                  placeholder={'xxx@xxx.xx'}
                  value={contact.email}
                  onValueChange={(email) => handleContactChange({ email })}
                />
              </ValidationWrapper>
            </div>
          </>
        )}

        <div style={{ marginTop: 12, paddingLeft: 172 }}>
          <Button use="accent" onClick={handleSubmit}>
            Отправить
          </Button>
          {isSent && <span style={{ marginLeft: 12 }}>Форма отправлена</span>}
        </div>
      </div>
    </ValidationContainer>
  );
};
ExampleMissingObjectNode.storyName = 'null в модели';

export const ExampleMissingUiNode: Story = () => {
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
  const [isSent, setIsSent] = React.useState(false);
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
    setIsSent(Boolean(await container.current?.validate()));
  }

  const v = validate({ contact, withContact }).getNode((x) => x.contact);
  return (
    <ValidationContainer ref={container}>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Валидации</div>JSON
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Имя</div>
          {JSON.stringify(v.getNode((x) => x.name).get())}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>E-mail</div>
          {JSON.stringify(v.getNode((x) => x.email).get())}
        </div>

        <div style={{ height: 20 }} />

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 160, textAlign: 'right' }}>Указать контакты</div>
          <Toggle checked={withContact} onValueChange={setWithContact} />
        </div>

        {withContact && (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 160, textAlign: 'right' }}>Имя</div>
              <ValidationWrapper validationInfo={v.getNode((x) => x.name).get()}>
                <Input
                  placeholder={'Любое'}
                  value={contact.name}
                  onValueChange={(name) => handleContactChange({ name })}
                />
              </ValidationWrapper>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 160, textAlign: 'right' }}>E-mail</div>
              <ValidationWrapper validationInfo={v.getNode((x) => x.email).get()}>
                <Input
                  placeholder={'xxx@xxx.xx'}
                  value={contact.email}
                  onValueChange={(email) => handleContactChange({ email })}
                />
              </ValidationWrapper>
            </div>
          </>
        )}

        <div style={{ marginTop: 12, paddingLeft: 172 }}>
          <Button use="accent" onClick={handleSubmit}>
            Отправить
          </Button>
          {isSent && <span style={{ marginLeft: 12 }}>Форма отправлена</span>}
        </div>
      </div>
    </ValidationContainer>
  );
};
ExampleMissingUiNode.storyName = 'Поле не отрисовано';
