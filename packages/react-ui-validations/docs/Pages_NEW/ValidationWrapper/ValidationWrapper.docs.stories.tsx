import { Button, Checkbox, ComboBox, DatePicker, Gapped, Input, Select } from '@skbkontur/react-ui';
import { ValidationContainer, ValidationWrapper, text } from '@skbkontur/react-ui-validations';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'ValidationWrapper',
  component: ValidationWrapper,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <ValidationContainer>
      <ValidationWrapper validationInfo={value && !value.includes('@') ? { message: 'Неверный формат почты' } : null}>
        <Input placeholder="Почта в формате name@mail.ru" width={300} value={value} onValueChange={setValue} />
      </ValidationWrapper>
    </ValidationContainer>
  );
};
ExampleBasic.storyName = 'Базовый пример';

/** `ValidationWrapper` работает с любым контролом React UI: подсвечивает его и показывает сообщение. */
export const ExampleControls: Story = () => {
  const cities = ['Екатеринбург', 'Москва', 'Новосибирск'];
  const [tariff, setTariff] = React.useState<string | null>(null);
  const [city, setCity] = React.useState<string | null>(null);
  const [date, setDate] = React.useState('');
  const [confirmed, setConfirmed] = React.useState(false);

  return (
    <ValidationContainer>
      <Gapped vertical gap={16}>
        <ValidationWrapper validationInfo={tariff ? null : { message: 'Выберите тариф', type: 'immediate' }}>
          <Select<string | null, string>
            items={['Базовый', 'Расширенный']}
            placeholder="Тариф"
            value={tariff}
            onValueChange={setTariff}
          />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={city ? null : { message: 'Выберите город', type: 'immediate' }}>
          <ComboBox<string>
            placeholder="Город"
            value={city}
            onValueChange={setCity}
            getItems={async (query) => cities.filter((x) => x.toLocaleUpperCase().includes(query.toLocaleUpperCase()))}
            valueToString={(x) => x}
            itemToId={(x) => x}
            renderItem={(x) => x}
            renderValue={(x) => x}
          />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={date ? null : { message: 'Укажите дату', type: 'immediate' }}>
          <DatePicker value={date} onValueChange={setDate} />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={confirmed ? null : { message: 'Примите условия', type: 'immediate' }}>
          <Checkbox checked={confirmed} onValueChange={setConfirmed}>
            Принимаю условия
          </Checkbox>
        </ValidationWrapper>
      </Gapped>
    </ValidationContainer>
  );
};
ExampleControls.storyName = 'Разные контролы';

/** Проп `validationInfo` задаёт, когда показать ошибку (`type`), ошибка это или предупреждение (`level`) и текст сообщения (`message`). */
export const ExampleValidationInfo: Story = () => {
  const container = React.useRef<ValidationContainer>(null);
  const [name, setName] = React.useState('');
  const [comment, setComment] = React.useState('');

  return (
    <ValidationContainer ref={container}>
      <Gapped vertical>
        <ValidationWrapper validationInfo={name ? null : { message: 'Укажите имя', type: 'submit' }}>
          <Input placeholder="Имя — ошибка при отправке" width={280} value={name} onValueChange={setName} />
        </ValidationWrapper>
        <ValidationWrapper
          validationInfo={comment ? null : { message: 'Комментарий поможет нам', type: 'submit', level: 'warning' }}
        >
          <Input placeholder="Комментарий — предупреждение" width={280} value={comment} onValueChange={setComment} />
        </ValidationWrapper>
        <Button use="accent" onClick={() => container.current?.submit()}>
          Отправить
        </Button>
      </Gapped>
    </ValidationContainer>
  );
};
ExampleValidationInfo.storyName = 'validationInfo';

/** Проп `renderMessage` задаёт, как показать сообщение. Здесь — текстом под полем. */
export const ExampleRenderMessage: Story = () => {
  const [email, setEmail] = React.useState('ivanov.kontur.ru');

  return (
    <ValidationContainer>
      <div style={{ paddingBottom: 24 }}>
        <ValidationWrapper
          validationInfo={email.includes('@') ? null : { message: 'Неверный формат почты', type: 'immediate' }}
          renderMessage={text('bottom')}
        >
          <Input placeholder="Почта" value={email} onValueChange={setEmail} />
        </ValidationWrapper>
      </div>
    </ValidationContainer>
  );
};
ExampleRenderMessage.storyName = 'renderMessage';
