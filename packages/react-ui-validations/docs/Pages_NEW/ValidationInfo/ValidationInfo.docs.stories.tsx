import { Button, Gapped, Input, Link } from '@skbkontur/react-ui';
import { ValidationContainer, ValidationWrapper, tooltip } from '@skbkontur/react-ui-validations';
import type { ValidationInfo } from '@skbkontur/react-ui-validations';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'ValidationInfo',
  parameters: { creevey: { skip: true } },
};

export default meta;

/** `type: 'immediate'` — ошибка видна, как только значение стало невалидным. */
export const ExampleImmediate: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <ValidationContainer>
      <ValidationWrapper validationInfo={/^\d*$/.test(value) ? null : { message: 'Только цифры', type: 'immediate' }}>
        <Input placeholder="Только цифры" value={value} onValueChange={setValue} />
      </ValidationWrapper>
    </ValidationContainer>
  );
};
ExampleImmediate.storyName = 'immediate';

/** `type: 'lostfocus'` — ошибка появляется, когда пользователь ушёл с поля. */
export const ExampleLostfocus: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <ValidationContainer>
      <ValidationWrapper validationInfo={/^\d*$/.test(value) ? null : { message: 'Только цифры', type: 'lostfocus' }}>
        <Input placeholder="Только цифры" value={value} onValueChange={setValue} />
      </ValidationWrapper>
    </ValidationContainer>
  );
};
ExampleLostfocus.storyName = 'lostfocus';

/** `type: 'submit'` — ошибка появляется после отправки формы. */
export const ExampleSubmit: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [value, setValue] = React.useState('');

  return (
    <ValidationContainer ref={container}>
      <Gapped>
        {/* Справа от поля стоит кнопка, поэтому тултип показываем сверху, чтобы он её не перекрывал */}
        <ValidationWrapper
          validationInfo={value ? null : { message: 'Укажите имя', type: 'submit' }}
          renderMessage={tooltip('top left')}
        >
          <Input placeholder="Имя" value={value} onValueChange={setValue} />
        </ValidationWrapper>
        <Button use="accent" onClick={() => container.current?.submit()}>
          Отправить
        </Button>
      </Gapped>
    </ValidationContainer>
  );
};
ExampleSubmit.storyName = 'submit';

/** `level` задаёт уровень: ошибка (`error`) или предупреждение (`warning`). */
export const ExampleLevel: Story = () => {
  return (
    <ValidationContainer>
      <Gapped vertical>
        <ValidationWrapper validationInfo={{ message: 'Ошибка', type: 'immediate', level: 'error' }}>
          <Input value="level: 'error'" />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={{ message: 'Предупреждение', type: 'immediate', level: 'warning' }}>
          <Input value="level: 'warning'" />
        </ValidationWrapper>
      </Gapped>
    </ValidationContainer>
  );
};
ExampleLevel.storyName = 'Уровень';

/** `message` — это `ReactNode`: в сообщение можно добавить ссылку или форматирование. */
export const ExampleMessage: Story = () => {
  const [value, setValue] = React.useState('123');

  const validationInfo: ValidationInfo | null =
    value.length === 10 || value.length === 12
      ? null
      : {
          type: 'immediate',
          message: (
            <>
              ИНН состоит из 10 или 12 цифр.{' '}
              <Link href="https://www.nalog.gov.ru/rn77/service/inn/" target="_blank">
                Узнать свой ИНН
              </Link>
            </>
          ),
        };

  return (
    <ValidationContainer>
      <ValidationWrapper validationInfo={validationInfo}>
        <Input placeholder="ИНН" value={value} onValueChange={setValue} />
      </ValidationWrapper>
    </ValidationContainer>
  );
};
ExampleMessage.storyName = 'Сообщение';

/** `independent: true` — поле проверяется только при потере собственного фокуса. */
export const ExampleIndependent: Story = () => {
  const [dependent, setDependent] = React.useState('');
  const [independent, setIndependent] = React.useState('');

  return (
    <ValidationContainer>
      <Gapped vertical>
        <ValidationWrapper
          validationInfo={dependent && !dependent.includes('@') ? { message: 'Неверный формат почты' } : null}
        >
          <Input placeholder="Почта — зависимое" value={dependent} onValueChange={setDependent} />
        </ValidationWrapper>
        <ValidationWrapper
          validationInfo={
            independent && !independent.includes('@') ? { message: 'Неверный формат почты', independent: true } : null
          }
        >
          <Input placeholder="Почта — независимое" value={independent} onValueChange={setIndependent} />
        </ValidationWrapper>
      </Gapped>
    </ValidationContainer>
  );
};
ExampleIndependent.storyName = 'Независимая валидация';
