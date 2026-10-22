import { Button, Checkbox, Gapped, Input, Switcher, Tabs } from '@skbkontur/react-ui';
import { FocusMode, ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import type { ValidateArgumentType, ValidationInfo } from '@skbkontur/react-ui-validations';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'ValidationContainer',
  component: ValidationContainer,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [name, setName] = React.useState('');
  const [isSent, setIsSent] = React.useState(false);

  async function handleSubmit() {
    setIsSent(Boolean(await container.current?.validate()));
  }

  return (
    <ValidationContainer ref={container}>
      <Gapped vertical>
        <ValidationWrapper validationInfo={name ? null : { message: 'Укажите имя', type: 'submit' }}>
          <Input placeholder="Имя" value={name} onValueChange={setName} />
        </ValidationWrapper>
        <Gapped verticalAlign="middle">
          <Button use="accent" onClick={handleSubmit}>
            Отправить
          </Button>
          {isSent && 'Форма отправлена'}
        </Gapped>
      </Gapped>
    </ValidationContainer>
  );
};
ExampleBasic.storyName = 'Базовый пример';

/** Колбэк `onValidationUpdated` вызывается, когда в форме появляется или пропадает видимая ошибка. */
export const ExampleOnValidationUpdated: Story = () => {
  const [email, setEmail] = React.useState('');
  const [site, setSite] = React.useState('');
  const [isValid, setIsValid] = React.useState<boolean | null | undefined>(true);

  function validate(value: string, check: (value: string) => boolean, message: string): ValidationInfo | null {
    return value && !check(value) ? { message } : null;
  }

  return (
    <ValidationContainer onValidationUpdated={setIsValid}>
      <Gapped vertical>
        <ValidationWrapper validationInfo={validate(email, (x) => x.includes('@'), 'Неверный формат почты')}>
          <Input placeholder="Почта" value={email} onValueChange={setEmail} />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={validate(site, (x) => x.startsWith('http'), 'Адрес начинается с http')}>
          <Input placeholder="Сайт" value={site} onValueChange={setSite} />
        </ValidationWrapper>
        {isValid ? 'Ошибок нет' : 'В форме есть ошибки'}
      </Gapped>
    </ValidationContainer>
  );
};
ExampleOnValidationUpdated.storyName = 'Отслеживание валидности';

/** Метод `submit` показывает все ошибки, прокручивает страницу к первой из них и ставит на неё фокус. Аргумент `focusMode` задаёт, что получит фокус. */
export const ExampleSubmitFocusMode: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [mode, setMode] = React.useState('Errors');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const settings: Record<string, ValidateArgumentType> = {
    Errors: { focusMode: FocusMode.Errors },
    ErrorsAndWarnings: { focusMode: FocusMode.ErrorsAndWarnings },
    None: { focusMode: FocusMode.None },
  };

  return (
    <ValidationContainer ref={container}>
      <Gapped vertical gap={16}>
        <Switcher value={mode} onValueChange={setMode} items={Object.keys(settings)} />
        <ValidationWrapper
          validationInfo={email ? null : { message: 'Лучше указать почту', type: 'submit', level: 'warning' }}
        >
          <Input placeholder="Почта — предупреждение" value={email} onValueChange={setEmail} />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={phone ? null : { message: 'Укажите телефон', type: 'submit' }}>
          <Input placeholder="Телефон — ошибка" value={phone} onValueChange={setPhone} />
        </ValidationWrapper>
        <Button use="accent" onClick={() => container.current?.submit(settings[mode] as boolean)}>
          Отправить
        </Button>
      </Gapped>
    </ValidationContainer>
  );
};
ExampleSubmitFocusMode.storyName = 'Фокус после отправки';

/** Метод `validate` работает как `submit` и возвращает `true`, если в форме нет ошибок. Предупреждения форму невалидной не делают. */
export const ExampleValidate: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [name, setName] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [result, setResult] = React.useState<boolean | null>(null);

  async function handleSubmit() {
    setResult(Boolean(await container.current?.validate()));
  }

  return (
    <ValidationContainer ref={container}>
      <Gapped vertical>
        <ValidationWrapper validationInfo={name ? null : { message: 'Укажите имя', type: 'submit' }}>
          <Input placeholder="Имя — ошибка" value={name} onValueChange={setName} />
        </ValidationWrapper>
        <ValidationWrapper
          validationInfo={comment ? null : { message: 'Комментарий поможет нам', type: 'submit', level: 'warning' }}
        >
          <Input placeholder="Комментарий — предупреждение" value={comment} onValueChange={setComment} />
        </ValidationWrapper>
        <Gapped verticalAlign="middle">
          <Button use="accent" onClick={handleSubmit}>
            Отправить
          </Button>
          {result !== null && `validate() → ${result}`}
        </Gapped>
      </Gapped>
    </ValidationContainer>
  );
};
ExampleValidate.storyName = 'Проверка перед отправкой';

/** Проп `scrollOffset` задаёт отступ при прокрутке к первой ошибке, например, чтобы её не перекрыла липкая шапка. */
export const ExampleScrollOffset: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [value, setValue] = React.useState('');

  return (
    <ValidationContainer ref={container} scrollOffset={{ top: 100 }}>
      <Gapped vertical>
        <ValidationWrapper validationInfo={value ? null : { message: 'Заполните поле', type: 'submit' }}>
          <Input placeholder="Обязательное поле" value={value} onValueChange={setValue} />
        </ValidationWrapper>
        <div
          style={{
            height: 1000,
            background: 'repeating-linear-gradient(-45deg, #eee, #eee 20px, #fff 20px, #fff 40px)',
          }}
        />
        <Button use="accent" onClick={() => container.current?.submit()}>
          Отправить
        </Button>
      </Gapped>
    </ValidationContainer>
  );
};
ExampleScrollOffset.storyName = 'Отступ при прокрутке';

/** Контейнер учитывает только отрисованные `ValidationWrapper`: скрытое поле не влияет на результат `validate`. */
export const ExampleDynamicFields: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [hasPhone, setHasPhone] = React.useState(true);
  const [phone, setPhone] = React.useState('');
  const [result, setResult] = React.useState<boolean | null>(null);

  async function handleSubmit() {
    setResult(Boolean(await container.current?.validate()));
  }

  return (
    <ValidationContainer ref={container}>
      <Gapped vertical>
        <Checkbox checked={hasPhone} onValueChange={setHasPhone}>
          Указать телефон
        </Checkbox>
        {hasPhone && (
          <ValidationWrapper validationInfo={phone ? null : { message: 'Укажите телефон', type: 'submit' }}>
            <Input placeholder="Телефон" value={phone} onValueChange={setPhone} />
          </ValidationWrapper>
        )}
        <Gapped verticalAlign="middle">
          <Button use="accent" onClick={handleSubmit}>
            Отправить
          </Button>
          {result !== null && `validate() → ${result}`}
        </Gapped>
      </Gapped>
    </ValidationContainer>
  );
};
ExampleDynamicFields.storyName = 'Скрытые поля';

/** `submit(true)` показывает все ошибки без перевода фокуса. Пригодится при открытии черновика, в котором уже есть ошибки. */
export const ExampleSubmitWithoutFocus: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  // черновик, который пользователь уже заполнял
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('ivanov.kontur.ru');

  React.useEffect(() => {
    container.current?.submit(true);
  }, []);

  return (
    <ValidationContainer ref={container}>
      <Gapped vertical>
        <ValidationWrapper validationInfo={name ? null : { message: 'Укажите имя', type: 'submit' }}>
          <Input placeholder="Имя" value={name} onValueChange={setName} />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={email.includes('@') ? null : { message: 'Неверный формат почты' }}>
          <Input placeholder="Почта" value={email} onValueChange={setEmail} />
        </ValidationWrapper>
      </Gapped>
    </ValidationContainer>
  );
};
ExampleSubmitWithoutFocus.storyName = 'Показ ошибок без фокуса';

/** Ошибка поля сохраняется после перемонтирования: например, после переключения вкладок в уже проверенной форме. */
export const ExampleRemount: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [tab, setTab] = React.useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');

  return (
    <ValidationContainer ref={container}>
      <Gapped vertical gap={16}>
        <Tabs value={tab} onValueChange={setTab}>
          <Tabs.Tab id="phone">Телефон</Tabs.Tab>
          <Tabs.Tab id="email">Почта</Tabs.Tab>
        </Tabs>
        {tab === 'phone' && (
          <ValidationWrapper validationInfo={phone ? null : { message: 'Укажите телефон', type: 'submit' }}>
            <Input placeholder="Телефон" value={phone} onValueChange={setPhone} />
          </ValidationWrapper>
        )}
        {tab === 'email' && (
          <ValidationWrapper validationInfo={email ? null : { message: 'Укажите почту', type: 'submit' }}>
            <Input placeholder="Почта" value={email} onValueChange={setEmail} />
          </ValidationWrapper>
        )}
        <Button use="accent" onClick={() => container.current?.submit()}>
          Отправить
        </Button>
      </Gapped>
    </ValidationContainer>
  );
};
ExampleRemount.storyName = 'Перемонтирование полей';
